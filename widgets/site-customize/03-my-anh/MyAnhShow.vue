<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
    title: string;
    imageUrl: string;
    buttonText: string;
    buttonLink: string;
}

defineProps<Props>();
</script>

<template>
      <div class="bz-block is-padding-top is-padding-bottom bz-block-html-content myanh-block-show" id="myanh-block-show">
        <div class="container">
          <div class="bz-html-content">
            <div class="bz-box is-center">
              <div class="bz-box__title">
                <div class="bz-box__title__main">
                  <div class="bz-box__title__name">{{ title }}</div>
                </div>
              </div>
              <div class="bz-box__content">
                <div class="bz-show-list">
                  <ul>
                    <li>
                      <div class="bz-show-item">
                        <div class="bz-show-item__left">
                          <div class="bz-show-item__title">PHASE-THE-MOON</div>
                          <div class="bz-show-item__subtitle">Hanoi Rock City</div>
                        </div>
                        <div class="bz-show-item__right">
                          <div class="bz-show-item__time">7:00 PM. may 18. 2025</div>
                          <div class="bz-show-item__btn"><a class="btn btn-light text-uppercase rounded-pill" href="#" data-bs-toggle="modal" data-bs-target="#pre-order-information-modal">Buy ticket</a></div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="bz-show-item">
                        <div class="bz-show-item__left">
                          <div class="bz-show-item__title">PHASE-THE-MOON</div>
                          <div class="bz-show-item__subtitle">Hanoi Rock City</div>
                        </div>
                        <div class="bz-show-item__right">
                          <div class="bz-show-item__time">7:00 PM. may 18. 2025</div>
                          <div class="bz-show-item__btn"><a class="btn btn-light text-uppercase rounded-pill" href="#" data-bs-toggle="modal" data-bs-target="#pre-order-information-modal">Buy ticket</a></div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="bz-show-item">
                        <div class="bz-show-item__left">
                          <div class="bz-show-item__title">PHASE-THE-MOON</div>
                          <div class="bz-show-item__subtitle">Hanoi Rock City</div>
                        </div>
                        <div class="bz-show-item__right">
                          <div class="bz-show-item__time">7:00 PM. may 18. 2025</div>
                          <div class="bz-show-item__btn"><a class="btn btn-light text-uppercase rounded-pill" href="#" data-bs-toggle="modal" data-bs-target="#pre-order-information-modal">Buy ticket</a></div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="bz-show-item">
                        <div class="bz-show-item__left">
                          <div class="bz-show-item__title">PHASE-THE-MOON</div>
                          <div class="bz-show-item__subtitle">Hanoi Rock City</div>
                        </div>
                        <div class="bz-show-item__right">
                          <div class="bz-show-item__time">7:00 PM. may 18. 2025</div>
                          <div class="bz-show-item__btn"><a class="btn btn-light text-uppercase rounded-pill" href="#" data-bs-toggle="modal" data-bs-target="#pre-order-information-modal">Buy ticket</a></div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="bz-show-item">
                        <div class="bz-show-item__left">
                          <div class="bz-show-item__title">PHASE-THE-MOON</div>
                          <div class="bz-show-item__subtitle">Hanoi Rock City</div>
                        </div>
                        <div class="bz-show-item__right">
                          <div class="bz-show-item__time">7:00 PM. may 18. 2025</div>
                          <div class="bz-show-item__btn"><a class="btn btn-light text-uppercase rounded-pill" href="#" data-bs-toggle="modal" data-bs-target="#pre-order-information-modal">Buy ticket</a></div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <!--end bz-show-list-->
                <!-- Pre order information Modal-->
 
              </div>
              <!--end bz-box__content-->
            </div>
            <!--end bz-box-->
          </div>
          <!--end bz-html-content-->
        </div>
        <!--end container-->
      </div>
</template> 

<style scoped>
.bz-show-item .bz-show-item__left {
    margin-bottom: .75rem
}

.bz-show-item .bz-show-item__left:last-child {
    margin-bottom: 0
}

.bz-show-item .bz-show-item__title {
    font-size: 16px;
    text-transform: uppercase
}

.bz-show-item .bz-show-item__subtitle {
    font-size: 13px;
    color: var(--text-color-desc);
    text-transform: uppercase
}

.bz-show-item .bz-show-item__time {
    margin-bottom: .5rem;
    font-size: 14px
}

.bz-show-item .bz-show-item__time:last-child {
    margin-bottom: 0
}

.bz-show-item .btn {
    min-width: 150px
}

.bz-show-list>ul {
    list-style: none;
    margin: 0;
    padding: 0
}

.bz-show-list>ul>li {
    border-bottom: 1px solid #000;
    margin-bottom: 1.25rem;
    padding-bottom: 1.25rem
}

@media (min-width: 768px) {
    .bz-show-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between
    }

    .bz-show-item .bz-show-item__left {
        margin-bottom: 0
    }

    .bz-show-item .bz-show-item__right {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end
    }

    .bz-show-item .bz-show-item__right>* {
        margin-left: 1rem
    }

    .bz-show-item .bz-show-item__right>*:first-child {
        margin-left: 0
    }

    .bz-show-item .bz-show-item__time {
        margin-bottom: 0;
        font-size: 16px
    }

    .bz-show-list>ul>li {
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem
    }
}

@media (min-width: 992px) {
    .bz-show-item .bz-show-item__right>* {
        margin-left: 1.25rem
    }

    .bz-show-list>ul>li {
        margin-bottom: 1.75rem;
        padding-bottom: 1.75rem
    }
}

@media (min-width: 1200px) {
    .bz-show-item .bz-show-item__right>* {
        margin-left: 1.5rem
    }

    .bz-show-list>ul>li {
        margin-bottom: 2rem;
        padding-bottom: 2rem
    }
}
</style>