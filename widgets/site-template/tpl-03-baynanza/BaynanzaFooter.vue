<script setup lang="ts">
interface Props {
  logoPrimary: string
  logoSecondary: string
  phone: string
  email: string
  address: string
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="bz-footer bg-dark">
    <div class="container">
      <div class="bz-row" data-gutter="2" data-gutter-md="2" data-gutter-lg="3">
        <div class="bz-col mb-3 mb-lg-0" data-col="12" data-col-lg="3">
          <div class="bz-block bz-block-logo">
            <div class="bz-logo">
              <a href="#">
                <img class="bz-logo__primary" :src="logoPrimary" alt="logo">
                <img class="bz-logo__secondary" :src="logoSecondary" alt="logo">
              </a>
            </div>
          </div>
        </div>
        <div class="bz-col mb-3 mb-lg-0" data-col="12" data-col-lg="3">
          <div class="bz-block bz-block-html-content">
            <div class="bz-html-content">
              <h4>Contact</h4>
              <p>
                <span class="material-symbols-outlined text-size-medium me-2">call</span>
                {{ phone }}
              </p>
              <p>
                <span class="material-symbols-outlined text-size-medium me-2">mail</span>
                {{ email }}
              </p>
            </div>
          </div>
        </div>
        <div class="bz-col mb-3 mb-lg-0" data-col="12" data-col-lg="6">
          <div class="bz-block bz-block-html-content">
            <div class="bz-html-content">
              <h4>Location</h4>
              <p>
                <span class="material-symbols-outlined text-size-medium me-2">location_on</span>
                {{ address }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bz-block bz-block-line">
        <div class="bz-line bg-white"></div>
        <!--end bz-line-->
      </div>
      <!--end bz-block-->
      <div class="bz-block">
        <div class="container">
          <div class="bz-block bz-block-copyright">
            <div class="bz-copyright">Copyright ©2024 - All rights reserved. Powered by<a href="https://breezing.in" target="_blank" rel="noopener noreferrer"><i class="icon-breezing"></i></a></div>
            <!--end bz-copyright-->
          </div>
          <!--end bz-block-->
        </div>
        <!--end container-->
      </div>
  </div>
</template>

<style lang="css" scoped>
/*---------- block logo css ----------*/
.bz-logo img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 40px;
}

.bz-logo .bz-logo__secondary {
    display: none;
}

/*---------- end block logo css ----------*/
/*---------- block html content css ----------*/
.bz-html-content {
  line-height: 1.5;
  font-size: 14px;
}
.bz-html-content p {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 14px;
}

/*---------- end block html content css ----------*/
/*---------- footer css ----------*/
.bz-footer {
    padding-bottom: 0
}

.bz-footer .bz-block-line {
    margin-bottom: 0;
    margin-top: 24px
}

.bz-footer .bz-block:has(.bz-line) {
    margin-bottom: 0;
    margin-top: 24px
}

.bz-footer .bz-block-copyright {
    padding-top: 16px;
    padding-bottom: 16px
}

.bz-footer .bz-copyright {
    color: #fff
}

.bz-footer .bz-copyright .icon-breezing {
    background-image: url("../../../images/logo-breezing-white.svg")
}

@media (min-width: 768px) {
    .bz-footer .bz-block-line {
        margin-top: 32px
    }

    .bz-footer .bz-block:has(.bz-line) {
        margin-top: 32px
    }
}

@media (min-width: 992px) {
    .bz-footer .bz-block-line {
        margin-top: 40px
    }

    .bz-footer .bz-block:has(.bz-line) {
        margin-top: 40px
    }
}

@media (min-width: 1200px) {
    .bz-footer .bz-block-line {
        margin-top: 48px
    }

    .bz-footer .bz-block:has(.bz-line) {
        margin-top: 48px
    }
}
/*---------- end footer css ----------*/
/*---------- block line css ----------*/
.bz-line {
  height: 1px;
}

/*---------- end block line css ----------*/
</style>