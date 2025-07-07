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
  <div class="bz-footer">
    <div class="container">
      <div class="bz-row" data-gutter="1" data-gutter-md="2" data-gutter-lg="3">
        <div class="bz-col" data-col="12" data-col-lg="3">
          <div class="bz-block bz-block-logo">
            <div class="bz-logo">
              <a href="#">
                <img class="bz-logo__primary" :src="logoPrimary" alt="logo">
                <img class="bz-logo__secondary" :src="logoSecondary" alt="logo">
              </a>
            </div>
          </div>
          <div class="bz-block bz-block-copyright">
            <div class="bz-copyright">
              Powered by
              <a href="https://breezing.in" target="_blank" rel="noopener noreferrer">
                <i class="icon-breezing"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="bz-col" data-col="12" data-col-lg="3">
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
        <div class="bz-col" data-col="12" data-col-lg="6">
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
.bz-footer .bz-logo img.bz-logo__secondary {
  display: inline;
}
.bz-footer .bz-logo img.bz-logo__primary {
  display: none;
}
.bz-footer .bz-html-content {
  font-weight: 500;
  color: #fff;
  font-family: var(--font-title);
}
.bz-footer .bz-html-content h4 {
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 1.5rem;
}
.bz-footer .bz-copyright {
  color: #fff;
}
.bz-footer .bz-copyright .icon-breezing {
  background-image: url("../../../images/logo-breezing-white.svg");
}

@media (min-width: 992px) {
  .bz-footer .bz-logo img {
    height: 64px;
    max-height: 64px;
  }
}
/*---------- end footer css ----------*/
</style>