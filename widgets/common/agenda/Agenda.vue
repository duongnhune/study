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

interface Day {
  id: string;
  date: string;
}

interface Props {
  title?: string;
  eventDateRange?: string;
  backgroundColor?: string;
  days?: Day[];
  sessions?: Session[];
  speakers?: Speaker[];
  textColor?: string;
  activeColor?: string;
  activeTextColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Agenda",
  eventDateRange: "March 1 - March 3, 2023",
  backgroundColor: "#ffffff",
  days: () => [
    { id: "1", date: "2023-03-01" },
    { id: "2", date: "2023-03-02" },
    { id: "3", date: "2023-03-03" },
  ] as any,
  sessions: () => [
    {
      id: "s1",
      dayId: "1",
      startTime: "09:00 AM",
      endTime: "10:00 AM",
      title: "Opening Keynote",
      duration: "1h",
      speakerId: "sp1",
      description: "Kick-off the event with an inspiring opening keynote.",
    },
    {
      id: "s2",
      dayId: "1",
      startTime: "11:00 AM",
      endTime: "12:30 PM",
      title: "Panel Discussion",
      duration: "1h 30m",
      speakerId: "sp2",
      description: "Engage with experts on the latest industry trends.",
    },
    {
      id: "s3",
      dayId: "1",
      startTime: "02:00 PM",
      endTime: "03:00 PM",
      title: "Closing Session",
      duration: "1h",
      speakerId: "sp3",
      description: "Wrap up the event with concluding remarks and takeaways.",
    },
  ],
  speakers: () => [
    { id: "sp1", name: "John Doe", title: "CEO, TechCorp", image: "upload/template_1/agenda_speaker_avatar.png" },
    { id: "sp2", name: "Jane Smith", title: "CTO, Innovate Inc.", image: "upload/template_1/agenda_speaker_avatar.png" },
    { id: "sp3", name: "Sam Wilson", title: "VP, FutureTech", image: "upload/template_1/agenda_speaker_avatar.png" },
  ],
  textColor: "",
  activeColor: "",
  activeTextColor: "",
});

import { ref, computed, onMounted, watch } from 'vue';

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

const backgroundStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.backgroundColor) {
    style.backgroundColor = props.backgroundColor;
  }

  return style;
});

const customColor = computed(() => {
  return {
    '--w-text-color': props.textColor || 'var(--bs-black)',
    '--w-active-color': props.activeColor || 'var(--bs-primary)',
    '--w-active-text-color': props.activeTextColor || '#fff',
    '--w-background-color': props.backgroundColor || 'var(--bs-white)'
  };
});
</script>
<template>
  <div class="bz-block bz-block-agenda" :style="[backgroundStyle, customColor]">
    <div class="container py-5">
      <div class="bz-box" :class="{ 'is-center': true }">
        <div class="bz-box__title">
          <div class="bz-box__title__main">
            <div class="bz-box__title__name" :class="{ 'title-with-underline': true }">{{ title }}</div>
            <div class="bz-box__title__desc" v-if="eventDateRange">{{ eventDateRange }}</div>
          </div>
        </div>
        <div class="bz-box__content">
          <div class="bz-agenda">
            <div class="row">
              <!-- Days sidebar -->
              <div class="col-md-3">
                <div class="bz-agenda__days">
                  <div v-for="(day, index) in internalDays" :key="day.id" class="bz-agenda__day-item mb-3"
                    :class="{ 'bz-agenda__day-item--active': activeDayIndex === index }" @click="setActiveDay(index)">
                    <div class="bz-agenda__day-name fw-bold">{{ day.name }}</div>
                    <div class="bz-agenda__day-date">{{ day.date }}</div>
                  </div>
                </div>
              </div>

              <!-- Sessions in two columns -->
              <div class="col-md-9">
                <div class="bz-agenda__sessions">
                  <div class="bz-agenda__sessions-grid">
                    <div v-for="session in activeDaySessions" :key="session.id" class="bz-agenda__session-item mb-4">
                      <!-- Session time and title -->
                      <div class="bz-agenda__session-header d-flex align-items-start mb-3">
                        <div>
                          <div class="bz-agenda__session-time mb-1">
                            {{ session.startTime }} - {{ session.endTime }}
                            <span class="bz-agenda__session-duration ms-2 text-muted">{{ session.duration }}</span>
                          </div>
                        </div>
                      </div>

                      <div class="bz-agenda__session-details">
                        <h3 class="bz-agenda__session-title h5 mb-0">{{ session.title }}</h3>
                        <!-- Speaker info -->
                        <div v-if="getSpeaker(session.speakerId)"
                          class="bz-agenda__speaker d-flex align-items-center mb-3 ms-4 ps-2">
                          <div class="bz-agenda__speaker-image me-3" v-if="getSpeaker(session.speakerId)?.image">
                            <img :src="getSpeaker(session.speakerId)?.image" :alt="getSpeaker(session.speakerId)?.name"
                              class="rounded-circle" />
                          </div>
                          <div class="bz-agenda__speaker-info">
                            <div class="bz-agenda__speaker-name fw-bold">{{ getSpeaker(session.speakerId)?.name }}</div>
                            <div class="bz-agenda__speaker-title text-muted">{{ getSpeaker(session.speakerId)?.title }}
                            </div>
                          </div>
                        </div>

                        <!-- Session description -->
                        <div v-if="session.description" class="bz-agenda__session-description ms-4 ps-2">
                          <p>{{ session.description }}</p>
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bz-block-agenda {
  width: 100%;
}

.title-with-underline {
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: var(--w-active-color, #FE5B00);
  }

  .text-left & {
    &:after {
      left: 0;
      transform: none;
    }
  }
}

.bz-agenda {
  &__days {
    margin-top: 1.5rem;
  }

  &__day-item {
    padding: 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    border: 1px solid #e5e5e5;
    transition: all 0.3s ease;
    margin-bottom: 0.75rem;

    &:hover:not(&--active) {
      background-color: rgba(0, 0, 0, 0.05);
    }

    &--active {
      font-weight: 500;
      background-color: var(--w-active-color, #FF5B00);
      color: var(--w-active-text-color, #FFFFFF);
    }
  }

  &__day-name {
    font-size: 1.1rem;
  }

  &__day-date {
    font-size: 0.9rem;
    opacity: 0.9;
  }

  &__sessions {
    margin-top: 1.5rem;
  }

  &__session-header {
    gap: 10px;
    width: 100%;
  }

  &__sessions-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__session-item {
    display: flex;
    position: relative;
    gap: 10px;
    padding-left: 28px;
    padding-right: 15px;
    margin-bottom: 30px;

    &:before {
      content: '';
      position: absolute;
      top: 10px;
      left: 0;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: var(--w-active-color, #FE5B00);
      z-index: 1;
    }

    &:after {
      content: '';
      position: absolute;
      top: 18px;
      left: 8px;
      width: 1px;
      height: calc(100% - 18px);
      background-color: #e5e5e5;
      z-index: 0;
    }

    width: auto;
  }

  &__session-details {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  &__session-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  &__session-time {
    display: flex;
    width: 100%;
    flex-direction: column;
    max-width: 10rem;
    font-weight: 500;
    font-size: 1rem;
  }

  &__session-duration {
    font-size: 0.85rem;
  }

  &__session-title {
    font-weight: 600;
  }

  &__speaker-image {
    width: 40px;
    height: 40px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__speaker {
    margin-top: 1rem;
    margin-left: 0 !important;
    padding-left: 0 !important;
  }

  &__speaker-name {
    font-size: 0.95rem;
  }

  &__speaker-title {
    font-size: 0.85rem;
  }

  &__session-description {
    margin-left: 0 !important;
    padding-left: 0 !important;
    font-size: 0.95rem;
    color: #6B7280;
    line-height: 1.6;
  }

  @media (max-width: 767px) {
    &__days {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 1.5rem;
    }

    &__day-item {
      width: 100%;
      margin-right: 0;
      margin-bottom: 0.75rem;
    }
  }
}
</style>
