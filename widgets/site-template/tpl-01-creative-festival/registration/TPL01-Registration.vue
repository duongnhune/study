<script setup lang="ts">
import { useTicketRegistrationForm, usePaymentHandler, useI18n } from '#build/imports';
import { watch, computed } from 'vue';
import { type Order } from '@breezingin/breezing-shared';

const { t, d, n } = useI18n({
	messages: {
		en: {
			'loading': 'Loading...',
			'selectTickets': 'Select Tickets',
			'processing': 'Processing...',
			'next': 'Next',
			'ticketInformation': 'Ticket Information',
			'paymentSuccessful': 'Payment Successful',
			'registrationSuccessful': 'Registration Successful',
			'ticketsSentToEmail': 'Tickets have been sent to your email.',
			'orderCode': 'Order Code',
			'purchaseDate': 'Purchase Date',
			'totalAmount': 'Total Amount',
			'downloadTicket': 'Download Ticket',
			'backToHome': 'Back to Home',
			'orderSummary': 'Order Summary',
			'noTicketsSelected': 'No tickets selected',
			'attendee': 'Attendee',
			'copyFromAbove': 'Copy from above',
			'back': 'Back',
			'payment': 'Payment',
			'total': 'Total',
			'name': 'Name',
			'email': 'Email',
			'phone': 'Phone',
			'registration': 'Registration',
			"noPaymentMethodAvailable": "No payment method available",
			'checkout': 'Checkout',
			'fillInformation': 'Fill Information',
			'subtotal': 'Subtotal',
			'fee': 'Fee',
			'discountCode': 'Discount code',
			'apply': 'Apply',
			'selectTicket': 'Select ticket',
			'orderCancelled': 'Order Cancelled',
			'orderCancelledMessage': "We're sorry, but your order has been cancelled. Please try again.",
			'tryAgain': 'Try Again'
		},
		vi: {
			'loading': 'Đang tải...',
			'selectTickets': 'Chọn vé',
			'processing': 'Đang xử lý...',
			'next': 'Tiếp theo',
			'ticketInformation': 'Thông tin vé',
			'paymentSuccessful': 'Thanh toán thành công',
			'registrationSuccessful': 'Đăng ký thành công',
			'ticketsSentToEmail': 'Vé đã được gửi đến email của bạn.',
			'orderCode': 'Mã đơn hàng',
			'purchaseDate': 'Ngày mua',
			'totalAmount': 'Tổng số tiền',
			'downloadTicket': 'Tải vé',
			'backToHome': 'Quay về trang chủ',
			'orderSummary': 'Tóm tắt đơn hàng',
			'noTicketsSelected': 'Không có vé nào được chọn',
			'attendee': 'Người tham dự',
			'copyFromAbove': 'Sao chép từ trên',
			'back': 'Quay lại',
			'payment': 'Thanh toán',
			'total': 'Tổng cộng',
			'name': 'Tên',
			'email': 'Email',
			'phone': 'Số điện thoại',
			'registration': 'Đăng ký',
			"noPaymentMethodAvailable": "Không có phương thức thanh toán nào khả dụng",
			'checkout': 'Thanh toán',
			'fillInformation': 'Điền thông tin',
			'subtotal': 'Tạm tính',
			'fee': 'Phí',
			'discountCode': 'Mã giảm giá',
			'apply': 'Áp dụng',
			'selectTicket': 'Chọn vé',
			'orderCancelled': 'Đơn hàng đã hủy',
			'orderCancelledMessage': 'Chúng tôi rất tiếc, nhưng đơn hàng của bạn đã bị hủy. Vui lòng thử lại.',
			'tryAgain': 'Thử lại'
		}
	}
});

const props = defineProps({
	formID: {
		type: String,
		required: true
	},
	backgroundImage: {
		type: String,
		default: ''
	}
});

const {
	step,
	form,
	event,
	formModel,
	formModelErrors,
	ticketCategories,
	ticketQuantityMap,
	firstLoading,
	submitLoading,
	order,
	orderSummary,
	createReservation,
	finalizeReservation,
	increaseTicketQuantity,
	decreaseTicketQuantity,
	resetForm
} = useTicketRegistrationForm(props.formID);

const stepperSteps = computed(() => [
	{
		id: 'select-ticket',
		number: 1,
		label: t('selectTicket'),
		isActive: step.value === 'select-ticket',
		isCompleted: step.value !== 'select-ticket',
		showDivider: true
	},
	{
		id: 'fill-info',
		number: 2,
		label: t('fillInformation'),
		isActive: step.value === 'fill-info',
		isCompleted: step.value === 'payment' || step.value === 'success',
		showDivider: true
	},
	{
		id: 'payment',
		number: 3,
		label: t('checkout'),
		isActive: step.value === 'payment' || step.value === 'success',
		isCompleted: step.value === 'success',
		showDivider: false
	}
]);

const isNextButtonDisabled = computed(() => {
	if (step.value === 'select-ticket') {
		return !orderSummary.value.items.length || submitLoading.value;
	}
	return submitLoading.value;
});

function onPaymentSuccess(updatedOrder: Order) {
	order.value = updatedOrder;
	step.value = 'success';
}

function onPaymentError(error: any) {
	console.error("Payment error", error);
	if (error?.type === 'cancel' || error?.message?.toLowerCase().includes('cancel')) {
		onPaymentCancel();
	}
}

function onPaymentCancel() {
	step.value = 'cancel';
}

async function handleCreateReservation() {
	try {
		await createReservation();
	} catch (error: any) {
		console.error('Create reservation error:', error);
	}
}

async function handleFinalizeReservation() {
	try {
		await finalizeReservation();
	} catch (error: any) {
		console.error('Finalize reservation error:', error);
	}
}

function copyContactInfo(ticket: any) {
	if (formModel) {
		ticket.name = formModel.name;
		ticket.email = formModel.email;
		ticket.phone = formModel.phone;
	}
}

watch(step, (newStep) => {
	if (newStep === 'payment') {
		initializePayment();
	}
	if (newStep === 'cancel') {
		console.log('Order has been cancelled');
	}
});

const {
	initializePayment,
	selectedPaymentMethodSettingID,
	selectedPaymentHandlerInstance,
	selectedPaymentMethodSetting,
	paymentMethodSettingOptions,
	selectedPaymentHandlerComponent,
} = usePaymentHandler(order);

</script>

<template>
	<div class="w-form">
		<!-- Stepper -->
		<div class="w-stepper mb-4" :style="{ backgroundImage: `url(${props.backgroundImage})` }">
			<div class="w-stepper__title">{{ t('registration') }}</div>
			<div class="w-stepper__container d-none d-lg-flex">
				<div v-for="step in stepperSteps" :key="step.id" class="w-stepper__step" :class="{
					'w-stepper__step--active': step.isActive,
					'w-stepper__step--completed': step.isCompleted
				}">
					<div class="w-stepper__inline">
						<div class="w-stepper__icon-wrapper">
							<div class="w-stepper__circle">{{ step.number }}</div>
						</div>
						<div class="w-stepper__label-wrapper">
							<span class="w-stepper__label">{{ step.label }}</span>
						</div>
						<div class="w-stepper__divider" v-if="step.showDivider"></div>
					</div>
				</div>
			</div>
		</div>

		<!-- Main Container -->
		<div class="w-main-container">
			<!-- Loading State -->
			<div v-if="firstLoading" class="w-loading">
				<div class="spinner-border" role="status">
					<span class="visually-hidden">{{ t('loading') }}</span>
				</div>
			</div>

			<div v-else class="w-content-wrapper">
				<!-- Back Navigation -->
				<div v-if="step !== 'select-ticket' && step !== 'cancel'" class="w-navigation">
					<button class="w-back-btn" @click="resetForm">
						<span class="material-symbols-outlined">arrow_back</span>
						<span>{{ t('back') }}</span>
					</button>
				</div>

				<!-- Main Content Grid -->
				<div class="w-grid">
					<!-- Left Column - Form Steps -->
					<div class="w-grid__left">
						<!-- Step 1: Select Tickets -->
						<div v-if="step === 'select-ticket'" class="w-select-tickets">
							<div class="w-select-tickets__header">
								<h2 class="w-select-tickets__title">{{ t('selectTickets') }}</h2>
							</div>
							<div class="w-select-tickets__content">
								<div class="w-ticket-item" v-for="category in ticketCategories" :key="category.id"
									:class="{ 'w-ticket-item--selected': (ticketQuantityMap[category.id] || 0) > 0 }">
									<div class="w-ticket-item__info">
										<div class="w-ticket-item__name">{{ category.name }}</div>
										<div class="w-ticket-item__price-row">
											<div class="w-ticket-item__price">
												{{ n(category.price || 0, 'currency' + (event?.currency ||
													'VND')).replace(/[^\d.,]/g, '') }}
											</div>
											<div class="w-ticket-item__currency">{{ event?.currency || 'VNĐ' }}</div>
										</div>
										<div class="w-ticket-item__description">
											{{ category.description || '' }}
										</div>
									</div>
									<div class="w-ticket-item__quantity">
										<div class="w-quantity-selector">
											<button class="w-quantity-selector__btn"
												@click="decreaseTicketQuantity(category.id)"
												:disabled="(ticketQuantityMap[category.id] || 0) <= 0">
												<span class="material-symbols-outlined">remove</span>
											</button>
											<div class="w-quantity-selector__value">
												{{ ticketQuantityMap[category.id] || 0 }}
											</div>
											<button class="w-quantity-selector__btn"
												@click="increaseTicketQuantity(category.id)">
												<span class="material-symbols-outlined">add</span>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- Step 2: Fill Information -->
						<div v-if="step === 'fill-info'">
							<div class="w-card">
								<div class="w-card__header">
									<h2 class="w-card__title">{{ t('ticketInformation') }}</h2>
								</div>
								<div class="w-card__content">
									<!-- Main Contact Information -->
									<div class="mb-3">
										<form-input :label="t('name')" v-model="formModel.name"
											:error="formModelErrors['name']" />
									</div>
									<div class="mb-3">
										<form-input :label="t('email')" v-model="formModel.email"
											:error="formModelErrors['email']" />
									</div>

									<!-- Custom Fields for Main Contact -->
									<template v-if="!form?.ticketRegistrationSetting?.ticketFieldEnabled">
										<div v-for="field in form?.formFields" :key="field.id" class="mb-3">
											<form-custom-field v-model="formModel.customFields[field.key]"
												:field="field" :error="formModelErrors[`customFields.${field.key}`]" />
										</div>
									</template>
								</div>
							</div>

							<!-- Individual Attendee Information -->
							<template v-if="form?.ticketRegistrationSetting?.ticketFieldEnabled">
								<div v-for="(ticket, index) in formModel.reservationTickets" :key="ticket.id"
									class="w-card">
									<div class="w-card__header w-attendee-header">
										<h3 class="w-card__title w-attendee-header__title">
											{{ t('attendee') }} {{ index + 1 }} -
											{{ticketCategories.find(c => c.id === ticket.ticketCategoryID)?.name}}
										</h3>
										<button
											class="btn btn-link text-decoration-none p-0 w-attendee-header__copy-btn"
											@click="copyContactInfo(ticket)">
											<span class="material-symbols-outlined">content_copy</span>
											{{ t('copyFromAbove') }}
										</button>
									</div>
									<div class="w-card__content pb-0">
										<div class="mb-3">
											<form-input :label="t('name')" v-model="ticket.name"
												:error="formModelErrors[`reservationTickets[${index}].name`]" />
										</div>
										<div class="mb-3">
											<form-input :label="t('email')" v-model="ticket.email"
												:error="formModelErrors[`reservationTickets[${index}].email`]" />
										</div>

										<!-- Custom Fields for Individual Attendees -->
										<template v-if="form?.formFields?.length">
											<div v-for="field in form?.formFields" :key="field.id" class="mb-3">
												<form-custom-field v-model="ticket.customFields[field.key]"
													:field="field"
													:error="formModelErrors[`reservationTickets[${index}].customFields.${field.key}`]" />
											</div>
										</template>
									</div>
								</div>
							</template>
						</div>

						<!-- Step 3: Payment -->
						<div class="w-card" v-if="step === 'payment'">
							<div class="w-card__header">
								<h2 class="w-card__title">{{ t('payment') }}</h2>
							</div>
							<div class="w-card__content p-0">
								<div class="w-payment">
									<div v-if="!paymentMethodSettingOptions.length" class="text-center py-4">
										{{ t('noPaymentMethodAvailable') }}
									</div>
									<template v-else>
										<div class="w-payment__method">
											<form-radio-group v-model="selectedPaymentMethodSettingID"
												:options="paymentMethodSettingOptions" />
										</div>
										<div class="w-payment__divider"></div>
										<div class="w-payment__processor"
											v-if="selectedPaymentHandlerComponent && selectedPaymentMethodSetting">
											<component ref="selectedPaymentHandlerInstance"
												:is="selectedPaymentHandlerComponent" :order="order"
												:payment-method-setting="selectedPaymentMethodSetting"
												@success="onPaymentSuccess" @error="onPaymentError"
												@cancel="onPaymentCancel" />
										</div>
									</template>
								</div>
							</div>
						</div>

						<!-- Step 4: Success -->
						<div v-if="step === 'success'" class="w-card">
							<div class="w-card__content w-success">
								<div class="w-success__icon">
									<svg width="32" height="32" viewBox="0 0 32 32" fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<g filter="url(#filter0_d_13035_27557)">
											<path
												d="M2 15C2 7.26801 8.26801 1 16 1C23.732 1 30 7.26801 30 15C30 22.732 23.732 29 16 29C8.26801 29 2 22.732 2 15Z"
												fill="#16B36A" />
											<path d="M21.3307 11L13.9974 18.3333L10.6641 15" stroke="white"
												stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
										</g>
										<defs>
											<filter id="filter0_d_13035_27557" x="0" y="0" width="32" height="32"
												filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
												<feFlood flood-opacity="0" result="BackgroundImageFix" />
												<feColorMatrix in="SourceAlpha" type="matrix"
													values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
													result="hardAlpha" />
												<feOffset dy="1" />
												<feGaussianBlur stdDeviation="1" />
												<feComposite in2="hardAlpha" operator="out" />
												<feColorMatrix type="matrix"
													values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
												<feBlend mode="normal" in2="BackgroundImageFix"
													result="effect1_dropShadow_13035_27557" />
												<feBlend mode="normal" in="SourceGraphic"
													in2="effect1_dropShadow_13035_27557" result="shape" />
											</filter>
										</defs>
									</svg>
								</div>
								<h2 class="w-success__title">
									{{ order?.totalPrice ? t('paymentSuccessful') : t('registrationSuccessful') }}
								</h2>
								<p class="w-success__message">
									{{ t('ticketsSentToEmail') }}<br>
									<strong>{{ formModel.email }}</strong>
								</p>

								<div class="w-order-details" v-if="order">
									<div class="w-order-details__row">
										<div class="w-order-details__label">{{ t('orderCode') }}</div>
										<div class="w-order-details__value">{{ order?.code }}</div>
									</div>
									<div class="w-order-details__row">
										<div class="w-order-details__label">{{ t('purchaseDate') }}</div>
										<div class="w-order-details__value">{{ d(order.createTime * 1000) }}</div>
									</div>
									<div class="w-order-details__row">
										<div class="w-order-details__label">{{ t('totalAmount') }}</div>
										<div class="w-order-details__value">
											{{ n(order.totalPrice, 'currency' + order.currency) }}
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- Step 5: Cancel -->
						<div v-if="step === 'cancel'" class="w-card">
							<div class="w-card__content w-cancel">
								<div class="w-cancel__icon">
									<svg width="32" height="32" viewBox="0 0 32 32" fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<g filter="url(#filter0_d_cancel)">
											<path
												d="M2 15C2 7.26801 8.26801 1 16 1C23.732 1 30 7.26801 30 15C30 22.732 23.732 29 16 29C8.26801 29 2 22.732 2 15Z"
												fill="#DC2626" />
											<path d="M11 11L21 21M21 11L11 21" stroke="white" stroke-width="1.5"
												stroke-linecap="round" stroke-linejoin="round" />
										</g>
										<defs>
											<filter id="filter0_d_cancel" x="0" y="0" width="32" height="32"
												filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
												<feFlood flood-opacity="0" result="BackgroundImageFix" />
												<feColorMatrix in="SourceAlpha" type="matrix"
													values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
													result="hardAlpha" />
												<feOffset dy="1" />
												<feGaussianBlur stdDeviation="1" />
												<feComposite in2="hardAlpha" operator="out" />
												<feColorMatrix type="matrix"
													values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
												<feBlend mode="normal" in2="BackgroundImageFix"
													result="effect1_dropShadow_cancel" />
												<feBlend mode="normal" in="SourceGraphic"
													in2="effect1_dropShadow_cancel" result="shape" />
											</filter>
										</defs>
									</svg>
								</div>
								<h2 class="w-cancel__title">
									{{ t('orderCancelled') }}
								</h2>
								<p class="w-cancel__message">
									{{ t('orderCancelledMessage') }}
								</p>
								<div class="w-cancel__actions">
									<button class="w-cancel__btn" @click="resetForm">
										{{ t('tryAgain') }}
									</button>
								</div>
							</div>
						</div>
					</div>

					<!-- Right Column - Order Summary -->
					<div class="w-grid__right">
						<div class="w-order-summary">
							<div class="w-order-summary__header">
								<h2 class="w-order-summary__title">{{ t('orderSummary') }}</h2>
							</div>
							<div class="w-order-summary__content">
								<!-- Order Items -->
								<template v-if="orderSummary.items.length > 0">
									<div class="w-order-summary__item" v-for="item in orderSummary.items"
										:key="item.ticketCategoryID">
										<div class="w-order-summary__item-row">
											<div class="w-order-summary__item-name">{{ item.quantity }} x {{
												item.ticketCategoryName }}</div>
											<div class="w-order-summary__item-price">
												{{ n(item.totalPrice || 0, 'currency' + (event?.currency || 'VND')) }}
											</div>
										</div>
									</div>
								</template>
								<div v-else class="w-order-summary__empty">
									{{ t('noTicketsSelected') }}
								</div>

								<template v-if="orderSummary.items.length > 0">
									<div class="w-order-summary__divider"></div>
									<!-- Total -->
									<div class="w-order-summary__total">
										<div class="w-order-summary__total-label">{{ t('total') }}</div>
										<div class="w-order-summary__total-amount">
											<span class="w-order-summary__currency">{{ event?.currency || 'VND'
											}}</span>
											<span class="w-order-summary__amount">{{ n(orderSummary.totalPrice,
												'currency' + (event?.currency || 'VND')).replace(/[^\d.,]/g, '')
											}}</span>
											<template v-if="order && order.isConverted">
												<br>
												<span class="w-order-summary__converted">
													~ {{ n(order.convertedTotalPrice, 'currency' +
														order.convertedCurrency) }}
												</span>
											</template>
										</div>
									</div>
								</template>
							</div>
							<!-- Actions -->
							<div class="w-order-summary__actions"
								v-if="step === 'select-ticket' || step === 'fill-info'">
								<template v-if="step === 'select-ticket'">
									<button class="w-order-summary__btn" @click="handleCreateReservation"
										:disabled="isNextButtonDisabled">
										{{ submitLoading ? t('processing') : t('next') }}
									</button>
								</template>
								<template v-if="step === 'fill-info'">
									<button class="w-order-summary__btn" @click="handleFinalizeReservation"
										:disabled="isNextButtonDisabled">
										{{ submitLoading ? t('processing') : t('next') }}
									</button>
								</template>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
// =================================================================
// MAIN FORM COMPONENT
// =================================================================
.w-form {
	position: relative;
	background-color: #F3F4F6;

}

// =================================================================
// STEPPER COMPONENT
// =================================================================
.w-stepper {
	position: relative;
	text-align: center;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	margin-bottom: 16px;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 0;
	}

	&__title {
		position: relative;
		z-index: 1;
		padding: 24px 0 16px;
		font-size: 36px;
		font-weight: 600;
		line-height: 1.222;
		letter-spacing: -2%;
		color: #ffffff;
	}

	&__container {
		position: relative;
		z-index: 1;
		padding: 16px 240px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
		width: 100%;
		margin: 0 auto;
	}

	&__step {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 8px;

		&--active,
		&--completed {
			.w-stepper__circle {
				background: var(--bs-primary, #fe5b00);
				border-color: var(--bs-primary, #fe5b00);
				color: white;
				box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
			}
		}

		&--active {
			.w-stepper__label {
				color: #ffffff;
				font-weight: 600;
			}
		}
	}

	&__inline {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	&__icon-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 5px;
	}

	&__circle {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		border: 1px solid #e5e7eb;
		background: #f3f4f6;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: 500;
		line-height: 1.333;
		letter-spacing: -1%;
		color: #1f2937;
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
	}

	&__label-wrapper {
		display: flex;
		flex-direction: column;
	}

	&__label {
		font-size: 16px;
		font-weight: 600;
		line-height: 1.5;
		letter-spacing: -1%;
		color: #ffffff;
		white-space: nowrap;
	}

	&__divider {
		width: 67px;
		height: 1px;
		background: #9ca3af;
	}
}

// =================================================================
// LAYOUT COMPONENTS
// =================================================================
.w-main-container {
	padding: 0 15rem;
}

.w-content-wrapper {
	position: relative;
	padding: 1rem 0 4rem 0;
	z-index: 2;
}

.w-grid {
	display: flex;
	gap: 40px;

	&__left {
		flex: 1;
		max-width: 100%;
	}

	&__right {
		width: 317px;
		flex-shrink: 0;
	}
}

// =================================================================
// LOADING COMPONENT
// =================================================================
.w-loading {
	text-align: center;
	padding: 3rem 1.25rem;
	color: white;

	.spinner-border {
		color: #fe5b00;
	}
}

// =================================================================
// NAVIGATION COMPONENT
// =================================================================
.w-navigation {
	margin-bottom: 12px;
}

.w-back-btn {
	display: flex;
	align-items: center;
	gap: 8px;
	background: none;
	border: none;
	color: #6B7280;
	font-size: 15px;
	font-weight: 600;
	line-height: 1.467;
	letter-spacing: -1%;
	padding: 10px 0;
	cursor: pointer;
	transition: color 0.2s ease;

	&:hover {
		color: #374151;
	}

	.material-symbols-outlined {
		font-size: 14px;
	}
}

// =================================================================
// CARD COMPONENT
// =================================================================
.w-card {
	border: 1px solid #E5E7EB;
	border-radius: 8px;
	backdrop-filter: blur(15px);
	margin-bottom: 1.5rem;

	&__header {
		padding: 12px 16px 12px 24px;
		border-bottom: 1px solid #E5E7EB;
		background: #000000;
		border-radius: 8px 8px 0px 0px;
	}

	&__title {
		font-size: 14px;
		font-weight: 600;
		line-height: 1.429;
		color: #ffffff;
		letter-spacing: -1%;
		margin: 0;
	}

	&__content {
		background-color: #ffffff;
		padding: 24px;
		border-radius: 0.5rem;
		color: #1F2937;
	}
}

// =================================================================
// TICKET SELECTION COMPONENT
// =================================================================
.w-select-tickets {
	border: 1px solid #E5E7EB;
	border-radius: 8px;
	background: white;
	overflow: hidden;

	&__header {
		padding: 12px 16px 12px 24px;
		background: #000000;
		border-bottom: 1px solid #E5E7EB;
	}

	&__title {
		font-size: 14px;
		font-weight: 600;
		line-height: 1.429;
		letter-spacing: -1%;
		color: #ffffff;
		margin: 0;
	}

	&__content {
		background: white;
	}
}

.w-ticket-item {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: 24px;
	border-bottom: 1px solid #E5E7EB;
	background: white;
	position: relative;

	&:last-child {
		border-bottom: none;
	}

	&--selected {
		background: #FFEED3;

		.w-ticket-item__name {
			color: var(--bs-primary, #fe5b00);
		}
	}

	&__info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding-right: 120px;
	}

	&__name {
		font-size: 14px;
		font-weight: 600;
		line-height: 1.429;
		letter-spacing: -1%;
		color: #1f2937;
		text-transform: uppercase;
	}

	&__price-row {
		display: flex;
		align-items: center;
		gap: 4px;
		margin: 4px 0;
	}

	&__price {
		font-size: 20px;
		font-weight: 600;
		line-height: 1.4;
		letter-spacing: -2%;
		color: #1f2937;
	}

	&__currency {
		font-size: 12px;
		font-weight: 500;
		line-height: 1.333;
		letter-spacing: -1%;
		color: #1f2937;
	}

	&__description {
		font-size: 14px;
		font-weight: 500;
		line-height: 1.429;
		text-transform: uppercase;
		letter-spacing: -1%;
		color: #1f2937;
	}

	&__quantity {
		position: absolute;
		right: 24px;
		top: 24px;
	}
}

// =================================================================
// QUANTITY SELECTOR COMPONENT
// =================================================================
.w-quantity-selector {
	display: flex;
	align-items: center;
	background: white;
	border: 1px solid #E5E7EB;
	border-radius: 8px;
	padding: 10px 12px;
	box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
	gap: 0;

	&__btn {
		width: 24px;
		height: 24px;
		border: 1px solid #E5E7EB;
		border-radius: 8px;
		background: white;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
		cursor: pointer;
		transition: background 0.2s ease;

		&:hover:not(:disabled) {
			background: #f9fafb;
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		.material-symbols-outlined {
			font-size: 16px;
			color: #1f2937;
		}
	}

	&__value {
		width: 40px;
		text-align: center;
		font-size: 15px;
		font-weight: 500;
		line-height: 1.467;
		letter-spacing: -1%;
		color: #1f2937;
		background: transparent;
		border: none;
		padding: 0;
		margin: 0 8px;
	}
}

// =================================================================
// ATTENDEE COMPONENT
// =================================================================
.w-attendee-header {
	display: flex;
	align-items: center;
	justify-content: space-between;

	&__title {
		flex-grow: 1;
	}

	&__copy-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border: 1px solid #E5E7EB;
		border-radius: 6px;
		padding: 0.5rem 1rem;
		color: #6c757d;
		font-size: 0.875rem;

		&:hover {
			background: #f8f9fa;
			border-color: var(--bs-primary, #fe5b00);
			color: var(--bs-primary, #fe5b00);
		}
	}
}

// =================================================================
// PAYMENT COMPONENT
// =================================================================
.w-payment {
	&__method {
		padding: 1.25rem 1.5rem;
	}

	&__divider {
		border-bottom: 1px solid rgba(255, 255, 255, 0.20);
	}

	&__processor {
		padding: 1.25rem 1.5rem;
	}
}

// =================================================================
// SUCCESS COMPONENT
// =================================================================
.w-success {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	padding: 16px 8px;

	&__icon {
		margin-top: 36px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		border: 1px solid var(--bs-white);
		color: var(--bs-white);
		margin-bottom: 1.5rem;

		svg {
			width: 4rem;
			height: 4rem;
		}

		&-symbol {
			font-size: 2.25rem;
		}
	}

	&__title {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: #16B36A;
	}

	&__message {
		font-size: 1rem;
		color: var(--text-color-desc);
		margin-bottom: 2rem;
		line-height: 1.6;
	}
}

// =================================================================
// ORDER DETAILS COMPONENT
// =================================================================
.w-order-details {
	min-width: 300px;
	max-width: 600px;
	border: 1px solid var(--bs-border-color);
	border-radius: 0.5rem;
	padding: 1.25rem 1.5rem;
	margin-bottom: 2rem;
	background: #f8f9fa;

	&__row {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 0;
		border-bottom: 1px solid #dee2e6;

		&:last-child {
			border-bottom: none;
		}
	}

	&__label {
		font-weight: 500;
		color: #6c757d;
	}

	&__value {
		font-weight: 600;
		text-align: right;
		color: #1a1a1a;
	}
}

// =================================================================
// ORDER SUMMARY COMPONENT
// =================================================================
.w-order-summary {
	border: 1px solid #E5E7EB;
	border-radius: 8px;
	background: white;
	overflow: hidden;
	position: sticky;
	top: 20px;

	&__content {
		padding: 1.25rem 1.5rem;
	}

	&__header {
		padding: 12px 16px 12px 24px;
		background: #000000;
		border-bottom: 1px solid #E5E7EB;
	}

	&__title {
		font-size: 14px;
		font-weight: 600;
		line-height: 1.429;
		letter-spacing: -1%;
		color: #ffffff;
		margin: 0;
	}

	&__item {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 24px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	&__item-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 16px;
	}

	&__item-name {
		font-size: 14px;
		font-weight: 400;
		line-height: 1.429;
		letter-spacing: -1%;
		color: #6B7280;
		flex: 1;
	}

	&__item-price {
		font-size: 14px;
		font-weight: 600;
		line-height: 1.429;
		letter-spacing: -1%;
		color: #1f2937;
		text-align: right;
	}

	&__empty {
		text-align: center;
		padding: 2rem;
		color: #6c757d;
		font-style: italic;
	}

	&__divider {
		height: 1px;
		background: #E5E7EB;
		width: 100%;
		margin: 20px 0;
	}

	&__total {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
	}

	&__total-label {
		font-size: 16px;
		font-weight: 600;
		line-height: 1.5;
		letter-spacing: -1%;
		color: #1f2937;
	}

	&__total-amount {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	&__currency {
		font-size: 12px;
		font-weight: 500;
		line-height: 1.333;
		letter-spacing: -1%;
		color: #6b7280;
	}

	&__amount {
		font-size: 16px;
		font-weight: 600;
		line-height: 1.5;
		letter-spacing: -1%;
		color: #1f2937;
	}

	&__converted {
		font-size: 12px;
		font-weight: 500;
		line-height: 1.333;
		letter-spacing: -1%;
		color: #6b7280;
	}

	&__actions {
		border-top: 1px solid #E5E7EB;
		padding: 1.25rem;
	}

	&__btn {
		width: 100%;
		background: var(--bs-primary, #FE5B00);
		border: none;
		border-radius: 999px;
		color: white;
		font-size: 15px;
		font-weight: 600;
		line-height: 1.467;
		letter-spacing: -1%;
		padding: 14px 20px;
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
		cursor: pointer;
		transition: all 0.2s ease;

		&:hover:not(:disabled) {
			background: #e55a2b;
			transform: translateY(-1px);
			box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
		}

		&:disabled {
			background: #d1d5db;
			color: #9ca3af;
			cursor: not-allowed;
			transform: none;
			box-shadow: none;
		}
	}
}

// =================================================================
// FORM ELEMENTS STYLING
// =================================================================
:deep(.form-check-label) {
	font-size: 20px;
	margin-bottom: 4px;
}

:deep(.form-label) {
	font-size: 0.875rem;
	font-weight: 600;
	line-height: 1.25rem;
	letter-spacing: -0.00875rem;
	color: #1F2937;
}

// =================================================================
// RESPONSIVE DESIGN
// =================================================================
@media (max-width: 1200px) {
	.w-main-container {
		padding: 0 40px 64px;
	}

	.w-grid {
		flex-direction: column;
		gap: 24px;

		&__right {
			width: 100%;
			order: -1;
		}
	}
}

@media (max-width: 768px) {
	.w-stepper {
		&__container {
			gap: 16px;
			padding: 16px 20px;
		}

		&__label {
			display: none;
		}

		&__divider {
			display: none;
		}

		&__inline {
			gap: 0;
		}
	}

	.w-main-container {
		padding: 0 16px 32px;
	}

	.w-grid {
		gap: 16px;
	}

	.w-ticket-item {
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;

		&__info {
			padding-right: 0;
		}

		&__quantity {
			position: static;
			align-self: flex-end;
		}
	}

	.w-attendee-header {
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;

		&__copy-btn {
			align-self: flex-start;
		}
	}

	.w-order-summary {
		position: static;

		&__content {
			padding: 1rem 1.25rem;
		}
	}
}

@media (max-width: 480px) {
	.w-stepper {
		&__title {
			font-size: 28px;
		}

		&__circle {
			width: 24px;
			height: 24px;
			font-size: 11px;
		}
	}
}

// =================================================================
// CANCEL COMPONENT
// =================================================================
.w-cancel {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	padding: 16px 8px;

	&__icon {
		margin-top: 36px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		border: 1px solid var(--bs-white);
		color: var(--bs-white);
		margin-bottom: 1.5rem;

		svg {
			width: 4rem;
			height: 4rem;
		}

		&-symbol {
			font-size: 2.25rem;
		}
	}

	&__title {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: #DC2626;
	}

	&__message {
		font-size: 1rem;
		color: var(--text-color-desc);
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	&__actions {
		margin-top: 1rem;
	}

	&__btn {
		background: var(--bs-primary, #FE5B00);
		border: none;
		border-radius: 999px;
		color: white;
		font-size: 15px;
		font-weight: 600;
		line-height: 1.467;
		letter-spacing: -1%;
		padding: 14px 24px;
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
		cursor: pointer;
		transition: all 0.2s ease;

		&:hover:not(:disabled) {
			background: #e55a2b;
			transform: translateY(-1px);
			box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
		}

		&:disabled {
			background: #d1d5db;
			color: #9ca3af;
			cursor: not-allowed;
			transform: none;
			box-shadow: none;
		}
	}
}
</style>
