<script setup lang="ts">
interface Stat {
  icon: string;
  value: string;
  description: string;
}

interface Props {
  stats: Stat[];
}

defineProps<Props>();
</script>

<template>
  <div class="bz-block is-padding-top-small is-padding-bottom-small bg-primary bz-block-growup vvs-nic-block-growup"
    id="vvs-nic-block-growup">
    <div class="container">
      <div class="bz-box">
        <div class="bz-box__content">
          <div class="bz-growup-grid">
            <ul>
              <li v-for="(stat, index) in stats" :key="index">
                <div class="bz-grid">
                  <div class="bz-grid__img">
                    <figure><img :src="stat.icon" alt="icon"></figure>
                  </div>
                  <div class="bz-grid__content">
                    <div class="bz-grid__row">
                      <h3 class="bz-grid__title">{{ stat.value }}</h3>
                    </div>
                    <div class="bz-grid__row bz-grid__desc">{{ stat.description }}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--end bz-growup-grid-->
        </div>
        <!--end bz-box__content-->
      </div>
      <!--end bz-box-->
    </div>
    <!--end container-->
  </div>
</template>
