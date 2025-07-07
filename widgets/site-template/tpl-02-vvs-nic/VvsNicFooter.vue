<script setup lang="ts">
interface Contact { label: string; value: string }
interface Location { address: string }
interface Props {
  contacts?: Contact[]
  locations?: Location[]
  copyright?: string
}
defineProps<Props>()
</script>

<template>
  <div class="bz-footer">
    <div class="container">
      <div class="bz-row mb-3 mb-lg-5 vvs-nic-footer-top" data-gutter="1" data-gutter-md="2" data-gutter-lg="3">
        <div class="bz-col" data-col="12">
          <div class="bz-block bz-block-html-content">
            <div class="bz-html-content">
              <h2>Get in touch with us</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="bz-row vvs-nic-footer-main" data-gutter="1" data-gutter-md="2" data-gutter-lg="3">
        <div class="bz-col" data-col="12" data-col-lg="3">
          <div class="bz-block bz-block-logo">
            <div class="bz-logo">
              <a href="#">
                <img class="bz-logo__primary" src="https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/logo-nic.png" alt="logo" />
                <img class="bz-logo__secondary" src="https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/logo-nic-white.svg" alt="logo" />
              </a>
            </div>
          </div>
          <div class="bz-block bz-block-html-content">
            <div class="bz-html-content">
              <p>NIC là đơn vị trực thuộc Bộ Kế hoạch và Đầu tư được thành lập theo Quyết định số 1269/QĐ-TTg ngày 02/10/2019 của Thủ tướng Chính phủ</p>
            </div>
          </div>
        </div>
        <div class="bz-col" data-col="12" data-col-lg="2">
          <div class="bz-block bz-block-html-content">
            <div class="bz-html-content">
              <h3>Contact</h3>
              <p v-for="(c, idx) in contacts" :key="idx">
                <span class="material-symbols-outlined text-size-medium me-1">{{ c.label }}</span> {{ c.value }}
              </p>
            </div>
          </div>
        </div>
        <div class="bz-col" data-col="12" data-col-lg="7">
          <div class="bz-block bz-block-html-content">
            <div class="bz-html-content">
              <h3>Location</h3>
              <p v-for="(l, idx) in locations" :key="idx">
                <span class="material-symbols-outlined text-size-medium me-1">location_on</span> {{ l.address }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="bz-row mt-3 mt-lg-5 vvs-nic-footer-bottom" data-gutter="1" data-gutter-md="2" data-gutter-lg="3">
        <div class="bz-col" data-col="12">
          <div class="bz-block bz-block-html-content">
            <div class="bz-html-content">
              <p>
                {{ copyright }}
                Powered by
                <a href="https://breezing.in" target="_blank" rel="noopener noreferrer"><i class="icon-breezing-white"></i></a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bz-footer {
  background: #070a4f;
  color: #fff;
  padding: 48px 0 24px 0;
}
.vvs-nic-footer-top h2 {
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 24px;
}
.vvs-nic-footer-main h3 {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 12px;
}
.bz-html-content p,
.bz-html-content a {
  color: #fff;
  font-size: 1rem;
}
.bz-logo__primary,
.bz-logo__secondary {
  height: 40px;
  margin-bottom: 12px;
}
.bz-html-content a {
  text-decoration: underline;
}
.vvs-nic-footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.15);
  margin-top: 32px;
  padding-top: 16px;
  font-size: 0.95rem;
}
.icon-breezing-white {
  display: inline-block;
  width: 80px;
  height: 20px;
  background: url("../../../images/logo-breezing-white.svg") no-repeat center/contain;
  vertical-align: middle;
}
.bz-copyright {
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
}
.bz-copyright .icon-breezing {
  margin-left: 5px;
}
</style>