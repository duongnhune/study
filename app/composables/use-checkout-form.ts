import { 
  type Order, 
  type Form, 
  type Reservation, 
  OrderStatus, 
  type AddressInfo, 
  EntityType, 
  type ReservationTicket,
  type ReservationProduct
} from '@breezingin/breezing-shared';
import { ref, computed, reactive, onMounted } from 'vue';
import _ from 'lodash';
import { useRoute } from 'vue-router';

type CheckoutStep = 'none' | 'fill-info' | 'payment' | 'success' | 'cancel';

interface CheckoutPayload {
  products?: Array<{
    productID: string;
    quantity: number;
    productVariantID?: string;
  }>;
  tickets?: Array<{
    ticketCategoryID: string;
    seatID?: string;
  }>;
  promotions?: string[];
}

type FormModel = {
  id: string;
  formID: string;
  name: string;
  email: string;
  phone: string;
  reservationTickets: ReservationTicket[];
  reservationProducts: ReservationProduct[];
  customFields: Record<string, string>;
  shippingAddress: AddressInfo;
  appliedPromotionIDs: string[];
};

type OrderSummaryItem = {
  type: 'ticket' | 'product';
  id: string;
  name: string;
  quantity: number;
  price: number;
  totalPrice: number;
  isGift: boolean;
};

type OrderSummary = {
  items: OrderSummaryItem[];
  subtotalPrice: number;
  totalPrice: number;
  shippingFee: number;
  shippingDiscount: number;
  discount: number;
};

export function useCheckoutForm(formID: string) {
  const { $api } = useNuxtApp();
  const route = useRoute();
  const pageStore = usePageStore();
  const appStore = useAppStore();
  const { t } = useI18n();
  const router = useRouter();

  // State
  const step = ref<CheckoutStep>('none');
  const form = ref<Form | null>(null);
  const reservation = ref<Reservation | null>(null);
  const order = ref<Order | null>(null);
  const firstLoading = ref(true);
  const submitLoading = ref(false);
  const formModelErrors = ref<Record<string, string>>({});

  // Form model
  const formModel = reactive<FormModel>({
    id: '',
    formID: formID,
    name: '',
    email: '',
    phone: '',
    reservationTickets: [],
    reservationProducts: [],
    customFields: {},
    shippingAddress: {
      fullName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      ward: '',
      district: '',
      province: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'VN',
    },
    appliedPromotionIDs: []
  });

  const getLockedPrice = (itemID: string, itemType: EntityType) => {
    return reservation.value?.lockedPrices?.find(
      price => price.itemID === itemID && price.itemType === itemType
    );
  };

  const calculateTicketItems = (): OrderSummaryItem[] => {
    return _.chain(reservation.value?.reservationTickets)
      .map(ticket => {
        const lockedPrice = getLockedPrice(ticket.ticketCategoryID, EntityType.TicketCategory);
        return {
          type: 'ticket' as const,
          id: ticket.isGift ? `${ticket.ticketCategoryID}-gift` : ticket.ticketCategoryID,
          name: ticket.name || 'Ticket',
          quantity: 1,
          price: ticket.isGift ? 0 : lockedPrice?.lockUnitPrice || 0,
          totalPrice: ticket.isGift ? 0 : (lockedPrice?.lockUnitPrice || 0),
          isGift: ticket.isGift
        };
      })
      .groupBy('id')
      .map((tickets, id) => ({
        type: 'ticket' as const,
        id,
        name: tickets[0]?.name || 'Ticket',
        quantity: tickets.length,
        price: tickets[0]?.price || 0,
        totalPrice: (tickets[0]?.price || 0) * tickets.length,
        isGift: tickets[0]?.isGift || false
      }))
      .value();
  };

  const calculateProductItems = (): OrderSummaryItem[] => {
    return _.chain(reservation.value?.reservationProducts)
      .map(product => {
        const lockedPrice = isZeroObjectID(product.productVariantID) 
          ? getLockedPrice(product.productID, EntityType.Product)
          : getLockedPrice(product.productVariantID || '', EntityType.ProductVariant);

        const itemId = !isZeroObjectID(product.productVariantID) 
          ? `${product.productID}-${product.productVariantID}` 
          : product.productID;

        return {
          type: 'product' as const,
          id: product.isGift ? `${itemId}-gift` : itemId,
          name: product.productName,
          quantity: product.quantity,
          price: product.isGift ? 0 : lockedPrice?.lockUnitPrice || 0,
          totalPrice: product.isGift ? 0 : (lockedPrice?.lockUnitPrice || 0) * product.quantity,
          isGift: product.isGift
        };
      })
      .groupBy('id')
      .map((products, id) => ({
        type: 'product' as const,
        id,
        name: products[0]?.name || '',
        quantity: _.sumBy(products, 'quantity'),
        price: products[0]?.price || 0,
        totalPrice: _.sumBy(products, 'totalPrice'),
        isGift: products[0]?.isGift || false
      }))
      .value();
  };

  // Computed
  const orderSummary = computed((): OrderSummary => {
    if (!reservation.value?.lockedPrices) {
      return {
        items: [],
        subtotalPrice: 0,
        totalPrice: 0,
        shippingFee: 0,
        shippingDiscount: 0,
        discount: 0
      };
    }

    const ticketItems = calculateTicketItems();
    const productItems = calculateProductItems();
    const items = [...ticketItems, ...productItems];

    return {
      items,
      subtotalPrice: _.sumBy(items, 'totalPrice'),
      totalPrice: reservation.value.lockedTotalPrice || 0,
      shippingFee: reservation.value.lockedShippingFee || 0,
      shippingDiscount: reservation.value.lockedShippingDiscount || 0,
      discount: reservation.value.lockedDiscount || 0
    };
  });

  async function createReservation(payload: CheckoutPayload): Promise<Reservation | null> {
    try {
      const requestBody = {
        formID: formID,
        reservationTickets: payload.tickets || [],
        reservationProducts: payload.products || [],
        appliedPromotionIDs: payload.promotions || []
      };

      const data = await $api<Reservation>('/form-checkout', {
        method: 'POST',
        body: requestBody
      });

      reservation.value = _.cloneDeep(data);
      Object.assign(formModel, {
        id: data.id,
        reservationTickets: data.reservationTickets,
        reservationProducts: data.reservationProducts,
        appliedPromotionIDs: data.appliedPromotionIDs,
      });

      step.value = 'fill-info';
      
      const newQuery = { ...route.query, reservationID: data.id } as any;
      delete newQuery.payload;

      router.replace({
        path: route.path,
        query: newQuery
      });

      return data;
    } catch (error: any) {
      swal.fire({
        icon: 'error',
        title: t('somethingWentWrong'),
      });
      console.error(error);
      return null;
    }
  }

  async function loadData(): Promise<Form | null> {
    firstLoading.value = true;

    try {
      const formData = await $api<Form>(`/form/${formID}`);
      form.value = formData;

      const { reservationIDParam, URIPayload } = pageStore.getCheckoutData();

      if (URIPayload) {
        try {
          await createReservation(URIPayload);
          return formData;
        } catch (error) {
          console.error('Invalid checkout payload:', error);
          step.value = 'none';
          return formData;
        }
      }

      // Check for existing reservation ID
      if (reservationIDParam) {
        await loadReservation(reservationIDParam, formData.id);
      } else {
        step.value = 'none';
      }

      return formData;
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: t('somethingWentWrong'),
      });
      console.error(error);
      step.value = 'none';
    } finally {
      firstLoading.value = false;
    }
    return null;
  }

  async function loadReservation(reservationID: string, formID: string): Promise<void> {
    try {
      const reservationData = await $api<Reservation>(`/reservation/${reservationID}`);
      
      if (reservationData.formID !== formID) {
        throw new Error('Invalid reservation for this form');
      }

      // Update form model with reservation data
      formModel.id = reservationData.id;
      formModel.name = reservationData.name || '';
      formModel.email = reservationData.email || '';
      formModel.phone = reservationData.phone || '';
      formModel.appliedPromotionIDs = reservationData.appliedPromotionIDs || [];
      formModel.reservationTickets = reservationData.reservationTickets || [];
      formModel.reservationProducts = reservationData.reservationProducts || [];

      if (reservationData.shippingAddress) {
        formModel.shippingAddress = reservationData.shippingAddress;
      }


      const statusStepMap: Record<string, CheckoutStep> = {
        'hold': 'fill-info',
        'pending-payment': 'payment',
        'confirmed': 'success',
        'cancelled': 'cancel'
      };

      console.log(reservation.value?.status)

      reservation.value = reservationData;
      console.log('reservation.value', reservation.value);
      order.value = reservationData.order || null;
      step.value = statusStepMap[reservationData.status] || 'fill-info';
    } catch (error) {
      console.error('Failed to load reservation:', error);
      step.value = 'none';
    }
  }

  async function finalizeReservation(): Promise<Order | null> {
    submitLoading.value = true;
    formModelErrors.value = {};

    try {
      const requestBody = {
        id: formModel.id,
        name: formModel.name,
        email: formModel.email,
        phone: formModel.phone,
        customFields: formModel.customFields,
        reservationTickets: formModel.reservationTickets,
        reservationProducts: formModel.reservationProducts,
        shippingAddress: formModel.shippingAddress
      };

      const data = await $api<any>('/form-checkout/final', {
        method: 'PUT',
        body: requestBody
      });

      order.value = data.order;
      reservation.value = data.reservation;
      step.value = order.value?.status === OrderStatus.Confirmed ? 'success' : 'payment';

      return data;
    } catch (error: any) {
      formModelErrors.value = error.data?.details || {};
      return null;
    } finally {
      submitLoading.value = false;
    }
  }

  function resetForm(): FormModel {
    // Reset form model
    Object.assign(formModel, {
      id: '',
      name: '',
      email: '',
      phone: '',
      reservationTickets: [],
      reservationProducts: [],
      customFields: {},
      shippingAddress: undefined,
      appliedPromotionIDs: []
    });

    // Reset state
    formModelErrors.value = {};
    reservation.value = null;
    order.value = null;
    step.value = 'none';

    // Clear URL parameters
    const query = { ...router.currentRoute.value.query };
    delete query.reservationID;
    delete query.payload;
    router.replace({ query });

    return formModel;
  }

  function initializePreview(): void {
    console.log('initializePreview');
  }

  onMounted(() => {
    if (appStore.getIsPreviewMode()) {
      initializePreview();
    } else {
      loadData();
    }
  });

  return {
    // State
    step,
    form,
    order,
    formModel,
    formModelErrors,
    firstLoading,
    submitLoading,
    reservation,

    // Computed
    orderSummary,

    // Methods
    loadReservation,
    createReservation,
    finalizeReservation,
    resetForm,
    loadData
  };
}