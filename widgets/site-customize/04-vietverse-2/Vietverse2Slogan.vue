<script setup lang="ts">
interface SloganItem {
  text: string
  link: string
  title: string
}

interface Props {
  items: SloganItem[]
}

const props = defineProps<Props>()

</script>

<template>
  <div class="bz-block is-padding-top-large is-padding-bottom-large bz-block-html-content vietverse-2-block-link-large" id="vietverse-2-block-link-large">
    <div class="container">
      <div class="bz-html-content">
        <div class="vietverse-2-link-large-box">
          <ul>
            <li v-for="(item, index) in items" :key="index">
              <div class="vietverse-2-link-large-item">
                <a :href="item.link" :title="item.title">{{ item.text }}</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--end container-->
  </div>
</template>

<style lang="css" scoped>
/*---------- block-link-large css ----------*/
.vietverse-2-link-large-box > ul {
  list-style: none;
  margin: 0 -12px;
  padding: 0;
  display: flex;
  flex-direction: row;
}
.vietverse-2-link-large-box > ul > li {
  width: 50%;
  padding-left: 12px;
  padding-right: 12px;
}

.vietverse-2-link-large-item > a {
  color: #fff;
  text-decoration: none;
  display: block;
  text-align: center;
  font-weight: 700;
  font-family: var(--font-title);
  font-size: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

@media (min-width: 768px) {
  .vietverse-2-link-large-item > a {
    font-size: 1.75rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}
@media (min-width: 992px) {
  .vietverse-2-link-large-item > a {
    font-size: 2.25rem;
  }
}
@media (min-width: 1200px) {
  .vietverse-2-link-large-item > a {
    font-size: 3rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
}
/*---------- end block-link-large css ----------*/
</style>