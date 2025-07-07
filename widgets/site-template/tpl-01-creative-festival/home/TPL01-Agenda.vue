<script setup lang="ts">
interface Day {
	id: string;
	name: string;
	date: string;
	isActive?: boolean;
}

interface Session {
	id: string;
	dayId: string;
	startTime: string;
	endTime: string;
	title: string;
	duration: string;
	speakerId: string;
	description: string;
}

interface Speaker {
	id: string;
	name: string;
	title: string;
	image: string;
}

interface Props {
	title?: string;
	eventDateRange?: string;
	days?: Day[];
	sessions?: Session[];
	speakers?: Speaker[];
}

import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps<Props>()

const internalDays = ref<Day[]>([]);
const activeDayIndex = ref(0);

onMounted(() => {
	initializeDays();
});

watch(() => props.days, () => {
	initializeDays();
}, { deep: true });

function initializeDays() {
	const days = props.days || [];
	internalDays.value = [...days];

	const activeIndex = days.findIndex(day => day.isActive);
	activeDayIndex.value = activeIndex >= 0 ? activeIndex : 0;
}

const setActiveDay = (index: number) => {
	activeDayIndex.value = index;
};

const activeDayId = computed(() => {
	if (internalDays.value.length === 0) return null;
	return internalDays.value[activeDayIndex.value]?.id;
});

const activeDaySessions = computed(() => {
	if (!activeDayId.value) return [];
	return (props.sessions || []).filter(session => session.dayId === activeDayId.value);
});

const getSpeaker = (speakerId: string) => {
	return (props.speakers || []).find(speaker => speaker.id === speakerId);
};

const leftColumnSessions = computed(() => {
	const sessions = activeDaySessions.value;
	const halfLength = Math.ceil(sessions.length / 2);
	return sessions.slice(0, halfLength);
});

const rightColumnSessions = computed(() => {
	const sessions = activeDaySessions.value;
	const halfLength = Math.ceil(sessions.length / 2);
	return sessions.slice(halfLength);
});
</script>

<template>
	<div class="w-agenda">
		<div class="w-agenda__container">

			<!-- Header Section -->
			<div class="w-agenda__header">
				<div class="w-agenda__title">{{ title }}</div>
				<div class="w-agenda__underline"></div>
				<div class="w-agenda__subtitle" v-if="eventDateRange">{{ eventDateRange }}</div>
			</div>

			<!-- Content Section -->
			<div class="w-agenda__content">

				<!-- Day Tabs -->
				<div class="w-agenda__days">
					<div v-for="(day, index) in internalDays" :key="day.id" class="w-agenda__day"
						:class="{ 'w-agenda__day--active': activeDayIndex === index }" @click="setActiveDay(index)">
						<div class="w-agenda__day-name">{{ day.name }}</div>
						<div class="w-agenda__day-date">{{ day.date }}</div>
					</div>
				</div>

				<!-- Sessions Grid -->
				<div class="w-agenda__sessions">

					<!-- Left Column -->
					<div class="w-agenda__column w-agenda__column--left">
						<div v-for="(session, index) in leftColumnSessions" :key="session.id" class="w-agenda__session"
							:class="{ 'w-agenda__session--last': index === leftColumnSessions.length - 1 }">
							<!-- Timeline Dot -->
							<div class="w-agenda__timeline">
								<div class="w-agenda__dot"></div>
								<div class="w-agenda__line"></div>
							</div>
							<!-- Session Content -->
							<div class="w-agenda__session-content">

								<div class="w-agenda__time-info">
									<div class="w-agenda__time">{{ session.startTime }} - {{ session.endTime }}
									</div>
									<div class="w-agenda__duration">{{ session.duration }}</div>
								</div>

								<div class="w-agenda__content-wrapper">
									<h3 class="w-agenda__session-title">{{ session.title }}</h3>
									<div class="w-agenda__details">
										<div v-if="getSpeaker(session.speakerId)" class="w-agenda__speaker">
											<div class="w-agenda__speaker-avatar"
												v-if="getSpeaker(session.speakerId)?.image">
												<img :src="getSpeaker(session.speakerId)?.image"
													:alt="getSpeaker(session.speakerId)?.name" />
											</div>
											<div class="w-agenda__speaker-info">
												<div class="w-agenda__speaker-name">{{
													getSpeaker(session.speakerId)?.name }}</div>
												<div class="w-agenda__speaker-title">{{
													getSpeaker(session.speakerId)?.title }}</div>
											</div>
										</div>
										<div v-if="session.description" class="w-agenda__description">
											{{ session.description }}
										</div>
									</div>
								</div>

							</div>
						</div>
					</div>

					<!-- Right Column -->
					<div class="w-agenda__column w-agenda__column--right">
						<div v-for="(session, index) in rightColumnSessions" :key="session.id" class="w-agenda__session"
							:class="{ 'w-agenda__session--last': index === rightColumnSessions.length - 1 }">
							<div class="w-agenda__timeline">
								<div class="w-agenda__dot"></div>
								<div class="w-agenda__line"></div>
							</div>

							<div class="w-agenda__session-content">

								<div class="w-agenda__time-info">
									<div class="w-agenda__time">{{ session.startTime }} - {{ session.endTime }}
									</div>
									<div class="w-agenda__duration">{{ session.duration }}</div>
								</div>

								<div class="w-agenda__content-wrapper">
									<h3 class="w-agenda__session-title">{{ session.title }}</h3>
									<div class="w-agenda__details">
										<div v-if="getSpeaker(session.speakerId)" class="w-agenda__speaker">
											<div class="w-agenda__speaker-avatar"
												v-if="getSpeaker(session.speakerId)?.image">
												<img :src="getSpeaker(session.speakerId)?.image"
													:alt="getSpeaker(session.speakerId)?.name" />
											</div>
											<div class="w-agenda__speaker-info">
												<div class="w-agenda__speaker-name">{{
													getSpeaker(session.speakerId)?.name }}</div>
												<div class="w-agenda__speaker-title">{{
													getSpeaker(session.speakerId)?.title }}</div>
											</div>
										</div>
										<div v-if="session.description" class="w-agenda__description">
											{{ session.description }}
										</div>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.w-agenda {
	background-color: var(--bs-light, #F3F4F6);
	padding: 3rem 1rem;
	width: 100%;

	&__container {
		margin: 0 auto;
		width: 100%;
		box-sizing: border-box;
		max-width: 100vw;
	}

	&__header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2.5rem;
	}

	&__title {
		font-weight: 700;
		font-size: 1.375rem;
		line-height: 1.222;
		letter-spacing: -0.02em;
		color: var(--text-color-title, #1F2937);
		text-align: center;
	}

	&__underline {
		width: 2rem;
		height: 0.1875rem;
		background-color: var(--bs-primary, #FE5B00);
		border-radius: 0.125rem;
	}

	&__subtitle {
		font-weight: 500;
		font-size: 1rem;
		line-height: 1.4;
		letter-spacing: -0.02em;
		color: var(--text-color-desc, #6B7280);
		text-align: center;
	}

	&__content {
		display: flex;
		gap: 2rem;
		align-items: flex-start;
	}

	&__days {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		flex-shrink: 0;
	}

	&__day {
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		background-color: rgba(255, 255, 255, 0.8);
		cursor: pointer;
		transition: all 0.3s ease;

		&:hover:not(&--active) {
			background-color: rgba(255, 255, 255, 0.9);
		}

		&--active {
			background-color: var(--bs-primary, #FE5B00);
			color: var(--bs-white);
		}
	}

	&__day-name {
		font-weight: 700;
		font-size: 1rem;
		line-height: 1.5;
		letter-spacing: -0.01em;
		margin-bottom: 2px;
	}

	&__day-date {
		font-weight: 400;
		font-size: 0.875rem;
		line-height: 1.429;
		letter-spacing: -0.01em;
		opacity: 0.9;
	}

	&__sessions {
		display: flex;
		gap: 1.5rem;
		flex: 1;
	}

	&__column {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	&__session {
		display: flex;
		gap: 0.5rem;
		position: relative;
	}

	&__timeline {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
		padding-top: 0.625rem;
	}

	&__dot {
		width: 0.5rem;
		height: 0.5rem;
		background-color: var(--bs-primary, #FE5B00);
		border-radius: 50%;
		flex-shrink: 0;
	}

	&__line {
		width: 1px;
		background-color: #D1D5DB;
		flex: 1;
		margin-top: 0.625rem;
		min-height: 3.125rem;
	}

	&__session-content {
		display: flex;
		flex: 1;
		gap: 0.5rem;
		padding-top: 0.125rem;
	}

	&__time-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex: 1;
	}

	&__time {
		font-weight: 500;
		font-size: 1.125rem;
		line-height: 1.444;
		letter-spacing: -0.01em;
		color: var(--text-color-title, #1F2937);
	}

	&__duration {
		font-weight: 400;
		font-size: 0.875rem;
		line-height: 1.429;
		letter-spacing: -0.01em;
		color: var(--text-color-desc, #6B7280);
		opacity: 0.7;
	}

	&__content-wrapper {
		display: flex;
		flex-direction: column;
		flex: 3;
	}

	&__session-title {
		font-weight: 600;
		font-size: 1.125rem;
		line-height: 1.444;
		letter-spacing: -0.01em;
		color: var(--text-color-title, #1F2937);
		margin: 0;
	}

	&__details {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	&__speaker {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	&__speaker-avatar {
		width: 2.625rem;
		height: 2.625rem;
		border-radius: 50%;
		overflow: hidden;
		flex-shrink: 0;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	&__speaker-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	&__speaker-name {
		font-weight: 600;
		font-size: 0.875rem;
		line-height: 1.429;
		letter-spacing: -0.01em;
		color: var(--text-color-title, #1F2937);
	}

	&__speaker-title {
		font-weight: 400;
		font-size: 0.75rem;
		line-height: 1.333;
		letter-spacing: -0.01em;
		color: var(--text-color-desc, #6B7280);
	}

	&__description {
		font-weight: 400;
		font-size: 1rem;
		line-height: 1.5;
		letter-spacing: -0.01em;
		color: var(--text-color-desc, #6B7280);
	}
}

/* Bootstrap 5 Responsive Breakpoints */
@media (max-width: 575.98px) {
	.w-agenda {
		&__title {
			font-size: 1.375rem;
		}

		&__subtitle {
			font-size: 1rem;
		}

		&__content {
			flex-direction: column;
			gap: 1rem;
		}

		&__description {
			font-size: 0.875rem;
		}

		&__days {
			flex-direction: row;
			gap: 0.5rem;
			overflow-x: auto;
			padding-bottom: 0.5rem;
		}

		&__day {
			padding: 0.5rem 0.75rem;
			flex-shrink: 0;
		}

		&__sessions {
			flex-direction: column;
			gap: 0.75rem;
		}
	}
}

@media (min-width: 576px) {
	.w-agenda {
		&__title {
			font-size: 1.5rem;
		}

		&__subtitle {
			font-size: 1rem;
		}

		&__content {
			flex-direction: column;
			gap: 1rem;
		}

		&__days {
			flex-direction: row;
			gap: 0.5rem;
			overflow-x: auto;
			padding-bottom: 0.5rem;
			min-width: 0;
		}

		&__sessions {
			flex-direction: column;
			gap: 0.75rem;
		}

	}
}

@media (min-width: 768px) {
	.w-agenda {
		padding: 5rem 4rem;

		&__header {
			gap: 0.75rem;
			margin-bottom: 2rem;
		}

		&__title {
			font-size: 2rem;
		}

		&__subtitle {
			font-size: 1.125rem;
		}

		&__content {
			flex-direction: row;
			gap: 1.5rem;
		}

		&__days {
			flex-direction: column;
			gap: 0.75rem;
			overflow-x: auto;
			padding-bottom: 0.5rem;
		}

		&__day {
			flex-shrink: 0;
		}

		&__sessions {
			flex-direction: row;
			gap: 1rem;
		}
	}
}

@media (min-width: 992px) {
	.w-agenda {
		&__title {
			font-size: 2.25rem;
		}

		&__subtitle {
			font-size: 1.25rem;
		}
	}
}

@media (min-width: 1200px) {
	.w-agenda {
		&__title {
			font-size: 2.25rem;
		}

		&__subtitle {
			font-size: 1.5rem;
		}
	}
}

@media (min-width: 1400px) {}
</style>
