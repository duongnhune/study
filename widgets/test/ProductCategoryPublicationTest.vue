<script setup lang="ts">
import { useProductCategoryStore, storeToRefs } from '#imports';

const productCategoryStore = useProductCategoryStore();
const { productCategory, productCategoryPublication } = storeToRefs(productCategoryStore);

</script>
<template>
	<div class="bz-block is-padding-top is-padding-bottom-large bz-block-owl-slider-link vietverse-block-solution"
		id="vietverse-block-solution">
		<div class="container">
			<div class="bz-box">
				<h1>Hero</h1>
				<div class="bz-box__title">
					Product Category Publication Test
				</div>
				<div class="bz-box__content">
					<div class="bz-owl-slider">
						<h1>
							{{ productCategoryPublication?.props['title'] }}
						</h1>
						<h5>
							{{ productCategoryPublication?.props['description'] }}
						</h5>
						<!-- {{ description }} -->
						<!--end owl-carousel-->
					</div>
					<!--end bz-owl-slider-->
				</div>
				<!--end bz-box__content-->
			</div>
			<!--end bz-box-->
		</div>
		<!--end container-->
	</div>
</template>