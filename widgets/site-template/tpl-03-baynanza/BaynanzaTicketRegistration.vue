<script setup lang="ts">
import { useTicketRegistrationForm, usePaymentHandler, useI18n, swal, onMounted } from '#imports';
import { ref, watch } from 'vue';
import { type Order } from '@breezingin/breezing-shared';
import { useHead } from '#imports';

const { t, d, n } = useI18n({
	messages: {
		en: {
			'loading': 'Loading...',
			'selectTickets': 'Select Ticket',
			'processing': 'Processing...',
			'next': 'Next',
			'ticketInformation': 'Ticket information',
			'paymentSuccessful': 'Thank you!',
			'registrationSuccessful': 'Thank you!',
			'ticketsSentToEmail': 'Please check your email for special information to fulfill the experience',
			'orderCode': 'Order Code',
			'purchaseDate': 'Purchase date',
			'totalAmount': 'Total Amount',
			'downloadTicket': 'Download ticket',
			'backToHome': 'Back to home',
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
			'orderCancelled': "Your order has been cancelled",
			'orderCancelledMessage': "We're sorry, but your order has been cancelled. Please try again."
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
			'orderCancelled': 'Đơn hàng đã hủy',
			'orderCancelledMessage': "Chúng tôi rất tiếc, nhưng đơn hàng của bạn đã bị hủy. Vui lòng thử lại."
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

const errTxt = ref('');

function onPaymentSuccess(updatedOrder: Order) {
	order.value = updatedOrder;
	step.value = 'success';
}

function onPaymentError(error: any) {
	swal.fire({
		icon: 'error',
		title: t('paymentFailed'),
		text: error.message,
	});
}

watch(step, (newStep) => {
	if (newStep === 'payment') {
		initializePayment();
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

useHead({
	bodyAttrs: {
		class: 'bg-dark'
	}
})

</script>

<template>
	<main class="w-registration-form">
		<div class="w-registration-form__bg-image" :style="{ backgroundImage: `url(${props.backgroundImage})` }"></div>
		<div class="container mb-3">
			<!-- Registration Stepper -->
			<header class="w-stepper mb-4">
				<h1 class="w-stepper__title">{{ t('registration') }}</h1>

				<nav class="w-stepper__nav d-none d-lg-flex">
					<div class="w-stepper__step w-stepper__step--select-tickets" :class="{
						'w-stepper__step--active': step === 'select-ticket',
						'w-stepper__step--completed': step !== 'select-ticket'
					}">
						<div class="w-stepper__number">1</div>
						<span class="w-stepper__label text-nowrap">{{ t('selectTickets') }}</span>
						<div class="w-stepper__line"></div>
					</div>

					<div class="w-stepper__step w-stepper__step--ticket-info" :class="{
						'w-stepper__step--active': step === 'fill-info',
						'w-stepper__step--completed': step === 'payment' || step === 'success'
					}">
						<div class="w-stepper__number">2</div>
						<span class="w-stepper__label text-nowrap">{{ t('ticketInformation') }}</span>
						<div class="w-stepper__line"></div>
					</div>

					<div class="w-stepper__step w-stepper__step--payment" :class="{
						'w-stepper__step--active': step === 'payment' || step === 'success',
						'w-stepper__step--completed': step === 'success'
					}">
						<div class="w-stepper__number">3</div>
						<span class="w-stepper__label text-nowrap">{{ t('payment') }}</span>
					</div>
				</nav>
			</header>

			<!-- Loading State -->
			<div v-if="firstLoading" class="w-loading">
				<div class="spinner-border" role="status">
					<span class="visually-hidden">{{ t('loading') }}</span>
				</div>
			</div>

			<div v-else class="w-registration-content">
				<!-- Back Navigation -->
				<nav v-if="step !== 'select-ticket'" class="w-navigation mb-2">
					<button class="w-navigation__back-btn btn btn-link text-decoration-none text-white ps-0"
						@click="resetForm">
						<span class="material-symbols-outlined">arrow_back</span>
						<span class="w-navigation__back-text">{{ t('back') }}</span>
					</button>
				</nav>

				<!-- Main Content Layout -->
				<div class="row g-4">
					<!-- Form Steps Column -->
					<div class="col-12 col-lg-8">
						<!-- Step 1: Select Tickets -->
						<section v-if="step === 'select-ticket'" class="w-step w-step--select-tickets">
							<div class="w-card">
								<header class="w-card__header">
									<h2 class="w-card__title">{{ t('selectTickets') }}</h2>
								</header>

								<div class="w-card__body p-0">
									<div class="w-ticket-selection">
										<article v-for="category in ticketCategories" :key="category.id"
											class="w-ticket-item">
											<div class="w-ticket-item__info">
												<h3 class="w-ticket-item__name">{{ category.name }}</h3>
												<div class="w-ticket-item__price">
													<div class="d-flex align-items-center" v-if="category.displayPrice">
														{{ n(category.price || 0, 'currency' + event?.currency) }}
														&nbsp;
														<s class="text-desc text-size-normal">{{
															n(category.displayPrice, 'currency' + event?.currency)
														}}</s>
													</div>
													<template v-else>
														{{ n(category.price || 0, 'currency' + event?.currency) }}
													</template>
												</div>
												<p v-if="category.description" class="w-ticket-item__description">
													{{ category.description }}
												</p>
											</div>

											<div class="w-ticket-item__quantity">
												<div class="w-quantity-selector input-group">
													<button
														class="w-quantity-selector__btn w-quantity-selector__btn--decrease btn"
														@click="decreaseTicketQuantity(category.id)" type="button"
														aria-label="Decrease quantity">
														<span
															class="material-symbols-outlined w-quantity-selector__icon">remove</span>
													</button>

													<input type="text" class="w-quantity-selector__input form-control"
														:value="ticketQuantityMap[category.id] || 0" readonly
														:aria-label="`Quantity for ${category.name}`">

													<button
														class="w-quantity-selector__btn w-quantity-selector__btn--increase btn"
														@click="increaseTicketQuantity(category.id)" type="button"
														aria-label="Increase quantity">
														<span
															class="material-symbols-outlined w-quantity-selector__icon">add</span>
													</button>
												</div>
											</div>
										</article>
									</div>
								</div>
							</div>
						</section>

						<!-- Step 2: Fill Information -->
						<section v-if="step === 'fill-info'" class="w-step w-step--fill-info">
							<!-- Main Contact Information -->
							<div class="w-card">
								<header class="w-card__header">
									<h2 class="w-card__title">{{ t('ticketInformation') }}</h2>
								</header>

								<div class="w-card__body">
									<div class="w-contact-form">
										<div class="w-contact-form__field mb-3">
											<form-input :label="t('name')" v-model="formModel.name"
												:error="formModelErrors['name']" />
										</div>

										<div class="w-contact-form__field mb-3">
											<form-input :label="t('email')" v-model="formModel.email"
												:error="formModelErrors['email']" />
										</div>

										<!-- Custom Fields for General Registration -->
										<template v-if="!form?.ticketRegistrationSetting?.ticketFieldEnabled">
											<div v-for="field in form?.formFields" :key="field.id"
												class="w-contact-form__field mb-3">
												<form-custom-field v-model="formModel.customFields[field.key]"
													:field="field"
													:error="formModelErrors[`customFields.${field.key}`]" />
											</div>
										</template>
									</div>
								</div>
							</div>

							<!-- Individual Attendee Information -->
							<template v-if="form?.ticketRegistrationSetting?.ticketFieldEnabled">
								<article v-for="(ticket, index) in formModel.reservationTickets" :key="ticket.id"
									class="w-card w-attendee-card">
									<header class="w-card__header w-attendee-card__header">
										<h3 class="w-card__title w-attendee-card__title">
											{{ t('attendee') }} {{ index + 1 }} -
											{{ticketCategories.find(c => c.id === ticket.ticketCategoryID)?.name}}
										</h3>

										<button class="w-attendee-card__copy-btn btn btn-link text-decoration-none p-0"
											@click="ticket.name = formModel.name; ticket.email = formModel.email; ticket.phone = formModel.phone"
											type="button">
											<span class="material-symbols-outlined">content_copy</span>
											<span class="w-attendee-card__copy-text">{{ t('copyFromAbove') }}</span>
										</button>
									</header>

									<div class="w-card__body">
										<div class="w-attendee-form">
											<div class="w-attendee-form__field mb-3">
												<form-input :label="t('name')" v-model="ticket.name"
													:error="formModelErrors[`reservationTickets[${index}].name`]" />
											</div>

											<div class="w-attendee-form__field mb-3">
												<form-input :label="t('email')" v-model="ticket.email"
													:error="formModelErrors[`reservationTickets[${index}].email`]" />
											</div>

											<!-- Custom Fields for Individual Attendees -->
											<template v-if="form?.formFields?.length">
												<div v-for="field in form?.formFields" :key="field.id"
													class="w-attendee-form__field mb-3">
													<form-custom-field v-model="ticket.customFields[field.key]"
														:field="field"
														:error="formModelErrors[`reservationTickets[${index}].customFields.${field.key}`]" />
												</div>
											</template>
										</div>
									</div>
								</article>
							</template>
						</section>

						<!-- Step 3: Payment -->
						<section v-if="step === 'payment'" class="w-step w-step--payment">
							<div class="w-card">
								<header class="w-card__header">
									<h2 class="w-card__title">{{ t('payment') }}</h2>
								</header>

								<div class="w-card__body w-card__body--no-padding">
									<div class="w-payment-section">
										<!-- No Payment Methods Available -->
										<div v-if="!paymentMethodSettingOptions.length"
											class="w-payment-section__empty">
											<p class="text-center py-4 mb-0">{{ t('noPaymentMethodAvailable') }}</p>
										</div>

										<!-- Payment Methods Available -->
										<template v-else>
											<div class="w-payment-section__methods">
												<form-radio-group v-model="selectedPaymentMethodSettingID"
													:options="paymentMethodSettingOptions" />
											</div>

											<div class="w-payment-section__divider"></div>

											<div v-if="selectedPaymentHandlerComponent && selectedPaymentMethodSetting"
												class="w-payment-section__processor">
												<component ref="selectedPaymentHandlerInstance"
													:is="selectedPaymentHandlerComponent" :order="order"
													:payment-method-setting="selectedPaymentMethodSetting"
													@success="onPaymentSuccess" @error="onPaymentError" />
											</div>
										</template>
									</div>
								</div>
							</div>
						</section>

						<!-- Step 4: Success -->
						<section v-if="step === 'success'" class="w-step w-step--success">
							<div class="w-card">
								<div class="w-card__body">
									<div class="w-success-message">
										<div class="w-success-message__icon">
											<span
												class="material-symbols-outlined w-success-message__icon-symbol">email</span>
										</div>

										<h2 class="w-success-message__title">
											{{ order?.totalPrice ? t('paymentSuccessful') : t('registrationSuccessful')
											}}
										</h2>

										<div class="w-success-message__content">
											<p class="w-success-message__text">
												{{ t('ticketsSentToEmail') }}<br>
											</p>
											<div v-if="order" class="w-order-summary">
												<div class="w-order-summary__details">
													<div class="w-order-summary__row">
														<span class="w-order-summary__label">{{ t('orderCode') }}</span>
														<span class="w-order-summary__value">{{ order?.code }}</span>
													</div>

													<div class="w-order-summary__row">
														<span class="w-order-summary__label">{{ t('purchaseDate')
														}}</span>
														<span class="w-order-summary__value">{{ d(order.createTime *
															1000) }}</span>
													</div>

													<div class="w-order-summary__row">
														<span class="w-order-summary__label">{{ t('totalAmount')
														}}</span>
														<span class="w-order-summary__value">
															{{ n(order.totalPrice, 'currency' + order.currency) }}
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>

						<!-- Step 5: Order Cancelled -->
						<section v-if="step === 'cancel'" class="w-step w-step--cancelled">
							<div class="w-card">
								<div class="w-card__body">
									<div class="w-cancelled-message">
										<div class="w-cancelled-message__icon">
											<span
												class="material-symbols-outlined w-cancelled-message__icon-symbol">cancel</span>
										</div>

										<h2 class="w-cancelled-message__title">
											{{ t('orderCancelled') }}
										</h2>

										<p class="w-cancelled-message__text">
											{{ t('orderCancelledMessage') }}
										</p>
									</div>
								</div>
							</div>
						</section>
					</div>

					<!-- Order Summary Sidebar -->
					<aside class="col-12 col-lg-4">
						<div class="w-card w-order-sidebar">
							<header class="w-card__header">
								<h2 class="w-card__title">{{ t('orderSummary') }}</h2>
							</header>

							<div class="w-card__body">
								<div class="w-order-summary-widget">
									<!-- Order Items List -->
									<div v-if="orderSummary.items.length > 0" class="w-order-summary-widget__items">
										<div v-for="item in orderSummary.items" :key="item.ticketCategoryID"
											class="w-order-summary-widget__item">
											<div class="w-order-summary-widget__item-details">
												{{ item.ticketCategoryName }} x {{ item.quantity }}
											</div>
											<div class="w-order-summary-widget__item-price">
												<div class="d-flex align-items-center" v-if="item.displayPrice">
													{{ n(item.totalPrice || 0, 'currency' + event?.currency) }}
													&nbsp;
													<s class="text-desc text-size-normal">{{ n(item.displayPrice *
														item.quantity, 'currency'
													+ event?.currency) }}</s>
												</div>
												<template v-else>
													{{ n(item.totalPrice || 0, 'currency' + event?.currency) }}
												</template>
											</div>
										</div>
									</div>

									<!-- Empty State -->
									<div v-else class="w-order-summary-widget__empty">
										<p class="text-center text-desc mb-0">{{ t('noTicketsSelected') }}</p>
									</div>

									<div class="w-order-summary-widget__divider"></div>

									<!-- Total -->
									<div class="w-order-summary-widget__total">
										<span class="w-order-summary-widget__total-label">{{ t('total') }}</span>
										<span class="w-order-summary-widget__total-amount">
											{{ n(orderSummary.totalPrice, 'currency' + event?.currency) }}
											<small v-if="order && order.isConverted">
												({{ n(order.convertedTotalPrice, 'currency' + order?.convertedCurrency)
												}})
											</small>
										</span>
									</div>

									<!-- Action Buttons -->
									<div v-if="step === 'select-ticket' || step === 'fill-info'"
										class="w-order-summary-widget__actions">
										<button v-if="step === 'select-ticket'"
											class="w-order-summary-widget__submit-btn btn btn-primary rounded-pill w-100"
											@click="createReservation" :disabled="submitLoading">
											{{ submitLoading ? t('processing') : t('next') }}
										</button>

										<button v-if="step === 'fill-info'"
											class="w-order-summary-widget__submit-btn btn btn-primary rounded-pill w-100"
											@click="finalizeReservation" :disabled="submitLoading">
											{{ submitLoading ? t('processing') : t('next') }}
										</button>
									</div>
								</div>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</div>
	</main>
</template>

<style scoped lang="scss">
// Main Form Container
.w-registration-form {
	position: relative;
	padding-bottom: 50px;

	&__bg-image {
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		object-position: bottom;

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 20%;
			background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5));
		}

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 20%;
			background: linear-gradient(to top, transparent, rgba(0, 0, 0, 0.5));
		}
	}
}

// Loading Component
.w-loading {
	text-align: center;
	padding: 3rem 1.25rem;
}

// Navigation Component
.w-navigation {
	&__back-btn {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	&__back-text {
		margin-left: 0.25rem;
	}
}

// Card Component
.w-card {
	border: 1px solid rgba(255, 255, 255, 0.20);
	border-radius: 8px;
	background: radial-gradient(232.37% 123.33% at 92.67% 4.15%, rgba(255, 255, 255, 0.20) 0%, rgba(66, 66, 66, 0.02) 100%), rgba(0, 0, 0, 0.20);
	box-shadow: -5px 5px 10px 0px rgba(0, 0, 0, 0.25);
	backdrop-filter: blur(15px);

	&__header {
		padding: 16px 24px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.20);
	}

	&__title {
		font-size: 14px;
		font-weight: 400;
		margin-bottom: 0;
		color: var(--text-color-title);
	}

	&__body {
		padding: 24px;

		&--no-padding {
			padding: 0;
		}
	}
}

// Stepper Component
.w-stepper {
	text-align: center;
	margin-bottom: 16px;

	&__title {
		padding-top: 24px;
		padding-bottom: 16px;
		font-size: 36px;
		margin-bottom: 0;
	}

	&__nav {
		padding: 16px;
		display: flex;
		justify-content: center;
		gap: 20px;
		width: 100%;
		max-width: 700px;
		margin: 0 auto;
	}

	&__step {
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
		z-index: 1;
		gap: 8px;

		&--active,
		&--completed {
			.w-stepper__number {
				background: var(--bs-white);
				border: 2px solid var(--bs-white);
				color: var(--bs-black);
			}
		}
	}

	&__number {
		display: flex;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		align-items: center;
		justify-content: center;
		border: 1px solid #FFF;
		text-align: center;
		font-size: 12px;
		color: #FFF;
		font-style: normal;
		font-weight: 400;
	}

	&__label {
		color: var(--text-color-site);
		font-weight: 300;
		font-size: 16px;
	}

	&__line {
		width: 67px;
		height: 1px;
		background: #9CA3AF;

		.w-stepper__step:last-child & {
			display: none;
		}
	}
}

// Step Components
.w-step {
	&__title {
		margin-bottom: 1.5rem;
	}
}

// Ticket Selection Component
.w-ticket-selection {
	// Container styles handled by card
}

.w-ticket-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.5rem;
	border-bottom: 1px solid rgba(255, 255, 255, 0.20);

	&:last-child {
		border-bottom: none;
	}

	&__info {
		flex: 1;
	}

	&__name {
		font-size: 14px;
		color: var(--text-color-title);
		font-weight: 400;
		margin-bottom: 4px;
		text-transform: uppercase;
	}

	&__price {
		font-size: 20px;
		font-weight: 600;
	}

	&__description {
		margin-top: 4px;
		margin-bottom: 0;
		color: var(--text-color-desc);
	}

	&__quantity {
		// Positioning handled by flex parent
	}
}

// Quantity Selector Component
.w-quantity-selector {
	width: 7.5rem;

	&__input {
		text-align: center;
		font-weight: 500;
		border: 1px solid var(--bs-white);

		&:focus {
			border: 1px solid var(--bs-primary);
		}
	}

	&__btn {
		color: var(--bs-white);
		border: 1px solid var(--bs-border-color);
		padding: 6px 8px;

		&--decrease {
			// Specific styles for decrease button if needed
		}

		&--increase {
			// Specific styles for increase button if needed
		}
	}

	&__icon {
		font-size: 14px;
	}
}

// Contact Form Component
.w-contact-form {
	&__field {
		// Field spacing handled by utility classes
	}
}

// Attendee Card Component
.w-attendee-card {
	&__header {
		display: flex;
		align-items: center;
	}

	&__title {
		flex-grow: 1;
	}

	&__copy-btn {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	&__copy-text {
		margin-left: 0.25rem;
	}
}

// Attendee Form Component
.w-attendee-form {
	&__field {
		// Field spacing handled by utility classes
	}
}

// Payment Section Component
.w-payment-section {
	&__empty {
		// Empty state styles
	}

	&__methods {
		padding: 1.25rem 1.5rem;
	}

	&__divider {
		border-bottom: 1px solid rgba(255, 255, 255, 0.20);
	}

	&__processor {
		padding: 1.25rem 1.5rem;
	}
}

// Success Message Component
.w-success-message {
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
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		border: 1px solid var(--bs-white);
		color: var(--bs-white);
		margin-bottom: 1.5rem;

		&-symbol {
			font-size: 2.25rem;
		}
	}

	&__title {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	&__content {
		max-width: 400px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&__text {
		font-size: 1rem;
		color: var(--text-color-desc);
		margin-bottom: 2rem;
	}
}

// Cancelled Message Component
.w-cancelled-message {
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
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		border: 1px solid var(--bs-white);
		color: var(--bs-white);
		margin-bottom: 1.5rem;

		&-symbol {
			font-size: 2.25rem;
		}
	}

	&__title {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	&__text {
		font-size: 1rem;
		color: var(--text-color-desc);
		margin-bottom: 0;
	}
}

// Order Summary Component (for success page)
.w-order-summary {
	min-width: 300px;
	max-width: 600px;
	border: 1px solid var(--bs-border-color);
	border-radius: 0.5rem;
	padding: 1.25rem 1.5rem;
	margin-bottom: 2rem;

	&__details {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0;
	}

	&__row {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--bs-border-color);

		&:last-child {
			border-bottom: none;
		}
	}

	&__label {
		font-weight: 500;
		color: var(--text-color-desc);
	}

	&__value {
		font-weight: 400;
		text-align: right;
	}
}

// Order Summary Widget (sidebar)
.w-order-summary-widget {
	&__items {
		margin-bottom: 1.5rem;
	}

	&__item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.25rem;

		&:last-child {
			margin-bottom: 0;
		}

		&-details {
			font-size: 14px;
			flex: 1;
			text-transform: uppercase;
			font-weight: 400;
		}

		&-price {
			color: var(--text-color-title);
			font-weight: 600;
		}
	}

	&__empty {
		margin-bottom: 1.5rem;
	}

	&__divider {
		margin: 1.25rem 0;
		border-top: 1px solid var(--bs-border-color);
	}

	&__total {
		text-transform: uppercase;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 16px;
		font-weight: 500;

	}

	&__actions {
		margin-top: 20px;
		border-top: 1px solid rgba(255, 255, 255, 0.20);
		padding-top: 20px;
	}

}

// Deep selector for form elements
:deep(.form-check-label) {
	font-size: 20px;
	margin-bottom: 4px;
}
</style>