<script setup lang="ts">
import { useEventStore, storeToRefs } from '#imports';

const eventStore = useEventStore();
const { event, eventPublication } = storeToRefs(eventStore);

</script>
<template>
	<div class="bz-block is-padding-top is-padding-bottom-large bz-block-owl-slider-link vietverse-block-solution"
		id="vietverse-block-solution">
		<div class="container">
			<div class="bz-box">
				<h1>Hero</h1>
				<div class="bz-box__title">
					Event Publication Test
				</div>
				<div class="bz-box__content">
					<div class="bz-owl-slider">
						<h1>
							{{ eventPublication?.props['title'] }}
						</h1>
						<h5>
							{{ eventPublication?.props['description'] }}
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
