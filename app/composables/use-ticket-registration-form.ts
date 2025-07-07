import { type Order, type Form, type Reservation, type TicketCategory, OrderStatus, type Event } from '@breezingin/breezing-shared';
import { ref, computed, reactive, onMounted } from 'vue';
import _ from 'lodash';
import { useRoute } from 'vue-router';
import { usePageStore } from '~/stores/page';

type RegistrationStep = 'select-ticket' | 'fill-info' | 'payment' | 'success' | 'cancel';

type FormTicket = {
  id: string;
  name: string;
  email: string;
  phone: string;
  ticketCategoryID: string;
  customFields: Record<string, string>;
};

type FormModel = {
  id: string;
  eventID: string;
  formID: string;
  name: string;
  email: string;
  phone: string;
  reservationTickets: FormTicket[];
  customFields: Record<string, string>;
  refCode: string;
};

export function useTicketRegistrationForm(formID: string) {
  const { $api } = useNuxtApp();
  const route = useRoute();
  const pageStore = usePageStore();
  const siteStore = useSiteStore();
  const appStore = useAppStore();
  const { t } = useI18n();
  const router = useRouter();

  // State
  const step = ref<RegistrationStep>('select-ticket');
  const form = ref<Form | null>(null);
  const event = ref<Event | null>(null);
  const ticketCategories = ref<TicketCategory[]>([]);
  const reservation = ref<Reservation | null>(null);
  const order = ref<Order | null>(null);
  const firstLoading = ref(true);
  const submitLoading = ref(false);
  const formModelErrors = ref<Record<string, string>>({});

  // Form model
  const formModel = reactive<FormModel>({
    id: '',
    formID: formID,
    eventID: '',
    name: '',
    email: '',
    phone: '',
    reservationTickets: [],
    customFields: {},
    refCode: ''
  });

  // Computed
  const ticketQuantityMap = computed(() => {
    const map: Record<string, number> = {};
    formModel.reservationTickets.forEach(ticket => {
      map[ticket.ticketCategoryID] = (map[ticket.ticketCategoryID] || 0) + 1;
    });
    return map;
  });

  const orderSummary = computed(() => {
    const items = _.chain(formModel.reservationTickets)
      .groupBy('ticketCategoryID')
      .map((tickets, id) => {
        const category = ticketCategories.value.find(c => c.id === id);
        return {
          ticketCategoryID: id,
          ticketCategoryName: category?.name || '',
          quantity: tickets.length,
          totalPrice: (category?.price || 0) * tickets.length,
          displayPrice: category?.displayPrice || null
        };
      })
      .value();

    return {
      items,
      totalPrice: _.sumBy(items, 'totalPrice')
    };
  });

  async function loadData(): Promise<Form | null> {
    firstLoading.value = true;

    try {
      const formData = await $api<Form>(`/form/${formID}`);
      form.value = formData;

      const { eventIDParam, reservationIDParam } = pageStore.getTicketRegistrationData();
      let eventID;

      if (reservationIDParam) {
        const reservationData = await $api<Reservation>(`/reservation/${reservationIDParam}`);
        if (reservationData.formID !== formData.id) {
          throw new Error('Invalid reservation for this form');
        }

        formModel.id = reservationData.id;
        formModel.name = reservationData.name || '';
        formModel.email = reservationData.email || '';
        formModel.phone = reservationData.phone || '';
        formModel.refCode = reservationData.refCode || '';

        if (reservationData.reservationTickets) {
          formModel.reservationTickets = reservationData.reservationTickets.map(ticket => ({
            id: ticket.id,
            name: ticket.name || '',
            email: ticket.email || '',
            phone: ticket.phone || '',
            ticketCategoryID: ticket.ticketCategoryID,
            customFields: {}
          }));
        }


        const statusStepMap: Record<string, RegistrationStep> = {
          'hold': 'fill-info',
          'pending-payment': 'payment',
          'confirmed': 'success',
          'cancelled': 'cancel'
        };

        order.value = reservationData.order || null;
        step.value = statusStepMap[reservationData.status] || 'select-ticket';
        eventID = reservationData.eventID;

      } else if (eventIDParam && formData.ticketRegistrationSetting?.allowAllPublishedEvent) {

        const sitePublicationData = await $api<any>('/site-publication', {
          params: {
            siteScopedID: siteStore.getSite()?.scopedID,
            entityType: 'event',
            entityID: eventIDParam,
            status: 'published'
          }
        });

        if (!sitePublicationData.items || sitePublicationData.items.length === 0) {
          throw new Error('Event not published to this site');
        }
        eventID = eventIDParam;
      } else {
        eventID = formData.ticketRegistrationSetting?.eventID;
      }

      if (eventID && !isZeroObjectID(eventID)) {
        const eventData = await $api<{ event: Event, ticketCategories: TicketCategory[] }>('/event/' + eventID);
        ticketCategories.value = eventData.ticketCategories;
        event.value = eventData.event;
        formModel.eventID = eventID;
      } else {
        throw new Error('Missing or invalid event ID');
      }


      return formData;
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: t('somethingWentWrong'),
      });
      console.error(error);
    } finally {
      firstLoading.value = false;
    }
    return null;
  }

  function updateTicketQuantity(ticketCategoryID: string, quantity: number): FormTicket[] {
    const current = ticketQuantityMap.value[ticketCategoryID] || 0;

    if (quantity > current) {
      for (let i = 0; i < quantity - current; i++) {
        formModel.reservationTickets.push({
          id: '',
          name: '',
          email: '',
          phone: '',
          ticketCategoryID,
          customFields: {}
        });
      }
    } else if (quantity < current) {
      const toRemove = current - quantity;
      const filtered = formModel.reservationTickets.filter(
        ticket => ticket.ticketCategoryID !== ticketCategoryID
      );
      const keep = formModel.reservationTickets.filter(
        ticket => ticket.ticketCategoryID === ticketCategoryID
      ).slice(0, current - toRemove);

      formModel.reservationTickets = [...filtered, ...keep];
    }

    return formModel.reservationTickets;
  }

  function increaseTicketQuantity(ticketCategoryID: string, quantity: number = 1): void {
    const current = ticketQuantityMap.value[ticketCategoryID] || 0;
    updateTicketQuantity(ticketCategoryID, current + quantity);
  }

  function decreaseTicketQuantity(ticketCategoryID: string, quantity: number = 1): void {
    const current = ticketQuantityMap.value[ticketCategoryID] || 0;
    updateTicketQuantity(ticketCategoryID, Math.max(current - quantity, 0));
  }

  async function createReservation(): Promise<Reservation | null> {
    if (route.query.ref) {
      formModel.refCode = route.query.ref as string;
    }

    submitLoading.value = true;
    formModelErrors.value = {};

    try {
      const data = await $api<Reservation>('/form-ticket-registration', {
        method: 'POST',
        body: formModel
      });

      reservation.value = data;
      formModel.id = data.id || '';

      formModel.reservationTickets = data.reservationTickets?.map(ticket => ({
        id: ticket.id,
        name: formModel.name,
        email: formModel.email,
        phone: formModel.phone,
        ticketCategoryID: ticket.ticketCategoryID,
        customFields: {}
      })) || [];

      step.value = 'fill-info';
      return data;
    } catch (error: any) {
      formModelErrors.value = error.data?.details || {};
      return null;
    } finally {
      submitLoading.value = false;
    }
  }

  async function finalizeReservation(): Promise<Order | null> {
    submitLoading.value = true;
    formModelErrors.value = {};

    try {
      const data = await $api<any>('/form-ticket-registration/final', {
        method: 'PUT',
        body: formModel
      });

      order.value = data.order;
      reservation.value = data.reservation; 
      step.value = order.value?.status === OrderStatus.Confirmed ? 'success' : 'payment';

      router.replace({
        query: {
          ...router.currentRoute.value.query,
          reservationID: reservation.value?.id
        }
      });

      return data;
    } catch (error: any) {
      formModelErrors.value = error.data?.details || {};
      return null;
    } finally {
      submitLoading.value = false;
    }
  }

  function resetForm(): FormModel {
    formModel.id = '';
    formModel.name = '';
    formModel.email = '';
    formModel.phone = '';
    formModel.reservationTickets = [];
    formModel.customFields = {};
    formModel.refCode = '';
    formModelErrors.value = {};
    reservation.value = null;
    order.value = null;
    step.value = 'select-ticket';

    const query = router.currentRoute.value.query;
    delete query.reservationID;
    router.replace({ query: query });

    return formModel;
  }

  function initializePreview(): void {
    console.log('initializePreview');
  }

  onMounted(
    () => {
      if (appStore.getIsPreviewMode()) {
        initializePreview();
      } else {
        loadData();
      }
    }
  );

  return {
    step,
    form,
    event,
    order,
    formModel,
    formModelErrors,
    ticketCategories,
    firstLoading,
    submitLoading,
    reservation,

    ticketQuantityMap,
    orderSummary,

    createReservation,
    finalizeReservation,
    updateTicketQuantity,
    increaseTicketQuantity,
    decreaseTicketQuantity,
    resetForm,
    loadData
  };
}