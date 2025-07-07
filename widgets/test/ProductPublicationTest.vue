<script setup lang="ts">
import { useProductStore, storeToRefs } from '#imports';

const productStore = useProductStore();
const { product, productPublication } = storeToRefs(productStore);

</script>
<template>
	<div class="bz-block is-padding-top is-padding-bottom-large bz-block-owl-slider-link vietverse-block-solution"
		id="vietverse-block-solution">
		<div class="container">
			<div class="bz-box">
				<h1>Hero</h1>
				<div class="bz-box__title">
					Product Publication Test
				</div>
				<div class="bz-box__content">
					<div class="bz-owl-slider">
						<h1>
							{{ productPublication?.props['title'] }}
						</h1>
						<h5>
							{{ productPublication?.props['description'] }}
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