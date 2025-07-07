<script setup lang="ts">
import { useCheckoutForm, usePaymentHandler, useCartStore, useI18n, swal, watch } from '#imports';
import { ref } from 'vue';
import { type Order } from '@breezingin/breezing-shared';
import { useHead, useRouter } from '#imports';

const { t, d, n } = useI18n({
	messages: {
		en: {
			'loading': 'Loading...',
			'cart': 'Cart',
			'fillInformation': 'Information',
			'shipping': 'Shipping',
			'payment': 'Payment',
			'processing': 'Processing...',
			'next': 'Next',
			'paymentSuccessful': 'Thank you!',
			'orderSuccessful': 'Thank you!',
			'orderSentToEmail': 'Your order confirmation has been sent to your email',
			'orderCode': 'Order Code',
			'purchaseDate': 'Purchase date',
			'totalAmount': 'Total Amount',
			'downloadReceipt': 'Download receipt',
			'backToHome': 'Continue shopping',
			'orderSummary': 'Order Summary',
			'emptyCart': 'Your cart is empty',
			'back': 'Back',
			'total': 'Total',
			'subtotal': 'Subtotal',
			'name': 'Name',
			'email': 'Email',
			'phone': 'Phone',
			'checkout': 'Checkout',
			'noPaymentMethodAvailable': 'No payment method available',
			'orderCancelled': 'Cancel order',
			'orderCancelledMessage': 'Are you sure you want to cancel your order?',
			'product': 'Product',
			'quantity': 'Quantity',
			'price': 'Price',
			'remove': 'Remove',
			'shippingAddress': 'Shipping Address',
			'fullName': 'Full Name',
			'street': 'Street',
			'ward': 'Ward',
			'district': 'District',
			'province': 'Province',
			'postalCode': 'Postal Code',
			'country': 'Country',
			'shippingMethod': 'Shipping Method',
			'standardShipping': 'Standard Shipping',
			'expressShipping': 'Express Shipping',
			'shippingFee': 'Shipping',
			'shippingDiscount': 'Shipping Discount',
			'discount': 'Discount',
			'sameAsBilling': 'Same as billing address',
			'contactInformation': 'Contact Information',
			'continueToShipping': 'Continue to shipping',
			'continueToPayment': 'Continue to payment',
			'placeOrder': 'Place order',
			'items': 'items',
			'returnToCart': 'Return',
			'returnToInformation': 'Return to information',
			'returnToShipping': 'Return to shipping',
			'fieldIsRequired': 'This field is required',
			'paymentFailed': 'Payment failed',
			'checkingOut': 'Checking out...',
			'createReservationFailed': 'Create reservation failed',
			'gift': 'Gift',
			'applied': 'Applied'
		},
		vi: {
			'loading': 'Đang tải...',
			'cart': 'Giỏ hàng',
			'fillInformation': 'Thông tin',
			'shipping': 'Vận chuyển',
			'payment': 'Thanh toán',
			'processing': 'Đang xử lý...',
			'next': 'Tiếp theo',
			'paymentSuccessful': 'Cảm ơn bạn!',
			'orderSuccessful': 'Cảm ơn bạn!',
			'orderSentToEmail': 'Xác nhận đơn hàng đã được gửi đến email của bạn',
			'orderCode': 'Mã đơn hàng',
			'purchaseDate': 'Ngày mua',
			'totalAmount': 'Tổng số tiền',
			'downloadReceipt': 'Tải hóa đơn',
			'backToHome': 'Tiếp tục mua sắm',
			'orderSummary': 'Tóm tắt đơn hàng',
			'emptyCart': 'Giỏ hàng của bạn đang trống',
			'back': 'Quay lại',
			'total': 'Tổng cộng',
			'subtotal': 'Tạm tính',
			'name': 'Tên',
			'email': 'Email',
			'phone': 'Số điện thoại',
			'checkout': 'Thanh toán',
			'noPaymentMethodAvailable': 'Không có phương thức thanh toán nào khả dụng',
			'orderCancelled': 'Hủy đơn hàng',
			'orderCancelledMessage': 'Bạn có chắc chắn muốn hủy đơn hàng này?',
			'product': 'Sản phẩm',
			'quantity': 'Số lượng',
			'price': 'Giá',
			'remove': 'Xóa',
			'shippingAddress': 'Địa chỉ giao hàng',
			'fullName': 'Họ và tên',
			'street': 'Địa chỉ dòng 1',
			'ward': 'Phường/Xã',
			'district': 'Quận/Huyện',
			'province': 'Tỉnh/Thành phố',
			'postalCode': 'Mã bưu điện',
			'country': 'Quốc gia',
			'shippingMethod': 'Phương thức vận chuyển',
			'standardShipping': 'Vận chuyển tiêu chuẩn',
			'expressShipping': 'Vận chuyển nhanh',
			'shippingFee': 'Phí vận chuyển',
			'shippingDiscount': 'Giảm giá vận chuyển',
			'discount': 'Giảm giá',
			'contactInformation': 'Thông tin liên hệ',
			'continueToShipping': 'Tiếp tục đến vận chuyển',
			'continueToPayment': 'Tiếp tục đến thanh toán',
			'placeOrder': 'Đặt hàng',
			'items': 'sản phẩm',
			'returnToCart': 'Quay lại',
			'returnToInformation': 'Quay lại thông tin',
			'returnToShipping': 'Quay lại vận chuyển',
			'fieldIsRequired': 'Trường này là bắt buộc',
			'paymentFailed': 'Thanh toán thất bại',
			'checkingOut': 'Đang xử lý...',
			'createReservationFailed': 'Có lỗi trong quá trình xử lý',
			'gift': 'Quà tặng',
			'applied': 'Đã áp dụng'
		}
	}
});

const props = defineProps({
	formID: {
		type: String,
		required: false
	},
	backgroundImage: {
		type: String,
	}
});

// Use the updated composable
const {
	step,
	form,
	order,
	formModel,
	formModelErrors,
	firstLoading,
	submitLoading,
	reservation,
	orderSummary,
	createReservation,
	finalizeReservation,
	loadData
} = useCheckoutForm(props.formID || '');

const router = useRouter();
const cartStore = useCartStore();



const countryOptions = ref([
	{ value: 'VN', text: 'Vietnam' },
	{ value: 'US', text: 'United States' },
	{ value: 'GB', text: 'United Kingdom' },
	{ value: 'CA', text: 'Canada' },
	{ value: 'AU', text: 'Australia' },
	{ value: 'NZ', text: 'New Zealand' },
	{ value: 'SG', text: 'Singapore' },
	{ value: 'MY', text: 'Malaysia' },
	{ value: 'PH', text: 'Philippines' },
	{ value: 'ID', text: 'Indonesia' },
	{ value: 'TH', text: 'Thailand' },
	{ value: 'HK', text: 'Hong Kong' },
	{ value: 'TW', text: 'Taiwan' },
	{ value: 'CN', text: 'China' },
	{ value: 'JP', text: 'Japan' },
	{ value: 'KR', text: 'South Korea' },
	{ value: 'DE', text: 'Germany' },
]);

const {
	initializePayment,
	selectedPaymentMethodSettingID,
	selectedPaymentHandlerInstance,
	selectedPaymentMethodSetting,
	paymentMethodSettingOptions,
	selectedPaymentHandlerComponent,
} = usePaymentHandler(order);

function onPaymentSuccess(updatedOrder: Order) {
	order.value = updatedOrder;
	step.value = 'success';
}

function onPaymentError(error: any) {
	swal.fire({
		icon: 'error',
		title: t('paymentFailed'),
		confirmButtonColor: '#FFC469',
		text: error.message,
	});
}

watch(step, (newStep) => {
	if (newStep === 'payment') {
		initializePayment();
	}
});

function back() {
	if (step.value === 'payment') {
		swal.fire({
			title: t('orderCancelled'),
			text: t('orderCancelledMessage'),
			icon: 'warning',
			confirmButtonColor: '#FFC469',
			showCancelButton: true,
			confirmButtonText: t('returnToCart'),
			cancelButtonText: t('back'),
		}).then(async (result) => {
			if (result.isConfirmed) {
				router.replace('/');	
			}
		});
	} else if (step.value === 'fill-info') {
		if (window.history.length > 1) {
			window.history.back();
		} else {
			router.replace('/');
		}
	} else if (step.value === 'success') {
		router.replace('/');
	}
}

function continueShopping() {
	window.location.href = '/';
}

// Handle form submission
async function handleContinueToPayment() {
	try {
		await finalizeReservation();
	} catch (error) {
		console.error('Failed to finalize reservation:', error);
	}
}

useHead({
	bodyAttrs: {
		class: 'bg-dark'
	}
});
</script>

<template>
	<main class="w-checkout-form">
		<div class="w-checkout-form__bg-image" :style="{ backgroundImage: `url(${props.backgroundImage})` }"></div>
		<div class="container mb-3">
			<!-- Checkout Stepper -->
			<header class="w-stepper mb-4">
				<h1 class="w-stepper__title">{{ t('checkout') }}</h1>
			</header>


			<!-- Loading State -->
			<div v-if="firstLoading" class="w-loading">
				<div class="spinner-border" role="status">
					<span class="visually-hidden">{{ t('loading') }}</span>
				</div>
			</div>

			<div v-else class="w-checkout-content">
				<nav v-if="step === 'fill-info'" class="w-navigation mb-2">
					<button class="w-navigation__back-btn btn btn-link text-decoration-none text-white ps-0"
						@click="back">
						<span class="material-symbols-outlined">arrow_back</span>
						<span class="w-navigation__back-text">{{ t('back') }}</span>
					</button>
				</nav>

				<!-- Main Content Layout -->
				<div class="row g-4">
					<!-- Form Steps Column -->
					<div class="col-12 col-lg-8">
						<!-- Step 1: Information -->
						<section v-if="step === 'fill-info'" class="w-step w-step--information">
							<div class="w-card">
								<header class="w-card__header">
									<h2 class="w-card__title">{{ t('contactInformation') }}</h2>
								</header>

								<div class="w-card__body">
									<div class="w-contact-form">
										<div class="mb-3">
											<form-input :label="t('name')" v-model="formModel.name"
												:error="formModelErrors['name']" />
										</div>
										<div class="mb-3">
											<form-input :label="t('email')" v-model="formModel.email"
												:error="formModelErrors['email']" type="email" />
										</div>
										<div class="mb-3">
											<form-input :label="t('phone')" v-model="formModel.phone"
												:error="formModelErrors['phone']" />
										</div>
									</div>
								</div>
							</div>

							<div v-if="form?.checkoutSetting?.shippingAddressRequired" class="w-card mt-3">
								<header class="w-card__header">
									<h2 class="w-card__title">{{ t('shippingAddress') }}</h2>
								</header>

								<div class="w-card__body">
									<div class="w-address-form">
										<div class="mb-3">
											<form-input :label="t('shippingAddress.address')"
												v-model="formModel.shippingAddress.addressLine1"
												:error="formModelErrors['shippingAddress.addressLine1']" />
										</div>
										<div class="row mb-3">
											<form-input :label="t('shippingAddress.city')"
												v-model="formModel.shippingAddress.city"
												:error="formModelErrors['shippingAddress.city']" />
										</div>
										<div class="row mb-3">
											<form-input :label="t('shippingAddress.district')"
												v-model="formModel.shippingAddress.district"
												:error="formModelErrors['shippingAddress.district']" />
										</div>
										<div class="row mb-3">
											<form-select :label="t('shippingAddress.country')"
												v-model="formModel.shippingAddress.country" :options="countryOptions"
												:error="formModelErrors['shippingAddress.country']" />
										</div>
										<div class="row">
											<form-input :label="t('shippingAddress.postalCode')"
												v-model="formModel.shippingAddress.postalCode"
												:error="formModelErrors['shippingAddress.postalCode']" />
										</div>
									</div>
								</div>
							</div>
						</section>

						<!-- Step 2: Payment -->
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

						<!-- Step 3: Success -->
						<section v-if="step === 'success'" class="w-step w-step--success">
							<div class="w-card">
								<div class="w-card__body">
									<div class="w-success-message">
										<div class="w-success-message__icon">
											<span class="material-symbols-outlined w-success-message__icon-symbol">
												check_circle
											</span>
										</div>

										<h2 class="w-success-message__title">
											{{ order?.totalPrice ? t('paymentSuccessful') : t('orderSuccessful') }}
										</h2>

										<div class="w-success-message__content">
											<p class="w-success-message__text">
												{{ t('orderSentToEmail') }}<br>
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
														<span class="w-order-summary__value">
															{{ d(order.createTime * 1000) }}
														</span>
													</div>

													<div class="w-order-summary__row">
														<span class="w-order-summary__label">{{ t('totalAmount')
														}}</span>
														<span class="w-order-summary__value">
															{{ n(order.totalPrice ?? 0, 'currency' +
																reservation?.currency) }}
														</span>
													</div>
												</div>
											</div>

											<div class="w-success-message__actions">
												<button class="btn btn-primary rounded-pill" @click="continueShopping">
													{{ t('backToHome') }}
												</button>
											</div>
										</div>
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
										<div v-for="item in orderSummary.items" :key="item.id"
											class="w-order-summary-widget__item">
											<div class="w-order-summary-widget__item-image">
												<!-- Use placeholder image since we don't have images in the order summary -->
												<div class="w-order-summary-widget__item-placeholder">
													<span class="material-symbols-outlined">
														{{ item.type === 'ticket' ? 'confirmation_number' :
															'inventory_2' }}
													</span>
												</div>
												<span class="w-order-summary-widget__item-qty">{{ item.quantity
												}}</span>
											</div>
											<div class="w-order-summary-widget__item-details">
												{{ item.name }}
											</div>
											<div class="w-order-summary-widget__item-price">
												<span v-if="item.isGift">
													<span>{{ t('gift') }}</span>
												</span>
												<span v-else>
													{{ n(item.totalPrice ?? 0, 'currency' + reservation?.currency) }}
												</span>
											</div>
										</div>
									</div>

									<!-- Empty State -->
									<div v-else class="w-order-summary-widget__empty">
										<p class="text-center text-desc mb-0">{{ t('emptyCart') }}</p>
									</div>

									<template v-if="reservation?.appliedPromotions?.length">
										<div class="w-order-summary-widget__divider"></div>
										<div class="w-order-summary-widget__promotions">
											<div v-for="promotion in reservation?.appliedPromotions" :key="promotion.id"
												class="w-order-summary-widget__promotion">
												<span>{{ promotion.name }}</span>
												<span>{{ t('applied') }}</span>
											</div>
										</div>
									</template>

									<!-- Show pricing breakdown if we have items -->
									<template v-if="orderSummary.items.length > 0">
										<div class="w-order-summary-widget__divider"></div>

										<!-- Calculate subtotal from items -->
										<div class="w-order-summary-widget__row">
											<span>{{ t('subtotal') }}</span>
											<span>{{ n(orderSummary.subtotalPrice, 'currency' + reservation?.currency)
											}}</span>
										</div>

										<!-- Shipping fee -->
										<div v-if="orderSummary.shippingFee > 0" class="w-order-summary-widget__row">
											<span>{{ t('shippingFee') }}</span>
											<span>{{ n(orderSummary.shippingFee, 'currency' + reservation?.currency)
											}}</span>
										</div>

										<!-- Shipping discount -->
										<div v-if="orderSummary.shippingDiscount > 0"
											class="w-order-summary-widget__row">
											<span>{{ t('shippingDiscount') }}</span>
											<span class="text-success">-{{ n(orderSummary.shippingDiscount, 'currency' +
												reservation?.currency) }}</span>
										</div>

										<!-- Total discount -->
										<div v-if="orderSummary.discount > 0" class="w-order-summary-widget__row">
											<span>{{ t('discount') }}</span>
											<span class="text-success">-{{ n(orderSummary.discount, 'currency' +
												reservation?.currency) }}</span>
										</div>

										<div class="w-order-summary-widget__divider"></div>

										<!-- Total -->
										<div class="w-order-summary-widget__total">
											<span class="w-order-summary-widget__total-label">{{ t('total') }}</span>
											<span class="w-order-summary-widget__total-amount">
												{{ n(orderSummary.totalPrice ?? 0, 'currency' + reservation?.currency)
												}}
												<small v-if="order && order.isConverted">({{ n(order.convertedTotalPrice
													?? 0, 'currency' +
												order.convertedCurrency) }}</small>
											</span>
										</div>
									</template>


									<!-- Action Buttons -->
									<div v-if="step === 'fill-info'" class="w-order-summary-widget__actions">
										<button
											class="w-order-summary-widget__submit-btn btn btn-primary rounded-pill w-100"
											@click="handleContinueToPayment"
											:disabled="submitLoading || orderSummary.items.length === 0">
											{{ submitLoading ? t('checkingOut') : t('continueToPayment') }}
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
.w-checkout-form {
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
	margin-bottom: 1.5rem;

	&__header {
		padding: 16px 24px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.20);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__title {
		font-size: 14px;
		font-weight: 400;
		margin-bottom: 0;
		color: var(--text-color-title);
		text-transform: uppercase;
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
		text-transform: uppercase;
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

// Payment Section Component
.w-payment-section {
	&__empty {
		padding: 2rem;
		text-align: center;
		color: var(--text-color-desc);
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
		background: #4CAF50;
		color: white;
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

	&__actions {
		margin-top: 2rem;
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
		align-items: center;
		gap: 12px;
		margin-bottom: 1rem;

		&:last-child {
			margin-bottom: 0;
		}

		&-image {
			position: relative;
			width: 50px;
			height: 50px;
			border-radius: 6px;
			flex-shrink: 0;
		}

		&-placeholder {
			width: 100%;
			height: 100%;
			background: rgba(255, 255, 255, 0.1);
			border-radius: 6px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: var(--text-color-desc);

			.material-symbols-outlined {
				font-size: 20px;
			}
		}

		&-qty {
			position: absolute;
			top: -8px;
			right: -8px;
			background: var(--bs-primary);
			color: var(--bs-dark);
			border-radius: 50%;
			width: 20px;
			height: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 11px;
			font-weight: 600;
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
			font-size: 14px;
		}
	}

	&__empty {
		margin-bottom: 1.5rem;
		padding: 2rem 0;
		text-align: center;
	}

	&__row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.5rem;
		font-size: 14px;

		.text-success {
			color: #28a745 !important;
		}
	}

	&__divider {
		margin: 1.25rem 0;
		border-top: 1px solid var(--bs-border-color);
	}

	&__promotions {
		display: flex;
		flex-direction: column;
		gap: 12px;
		align-items: center;
	}

	&__promotion {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		align-items: top;
	}



	&__total {
		text-transform: uppercase;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 16px;
		font-weight: 500;

		&-label {
			font-weight: 600;
		}

		&-amount {
			font-weight: 700;
			color: var(--text-color-title);
		}
	}

	&__actions {
		margin-top: 20px;
		border-top: 1px solid rgba(255, 255, 255, 0.20);
		padding-top: 20px;
	}

}

// Mobile responsiveness
@media (max-width: 991px) {
	.w-stepper__nav {
		display: none !important;
	}

	.w-order-summary-widget__item {
		&-image {
			width: 40px;
			height: 40px;
		}

		&-details {
			font-size: 13px;
		}

		&-price {
			font-size: 13px;
		}
	}
}
</style>