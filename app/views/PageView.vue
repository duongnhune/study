<script lang="ts" setup>
import { PageType, type Page } from '@breezingin/breezing-shared';
import Widget from '~/components/Widget.vue';
import { usePageStore } from '~/stores/page';

const route = useRoute();
const siteStore = useSiteStore();
const pageStore = usePageStore();

const page = computed(() => {
  return siteStore.pages.find(p => p.id === route.meta.pageID)
});

useHead({
  bodyAttrs: { class: page.value?.bodyClass || '' },
  style: [page.value?.styleBody || '']
});


async function initEventDetailPage() {
  const pathParts = route.path.split('/').filter(Boolean);
  const publicationSlug = pathParts[pathParts.length - 1];

  if (publicationSlug) {
    const { data } = await useAPI<any>('/site-publication', {
      query: {
        siteScopedID: siteStore.site?.scopedID,
        slug: publicationSlug,
        entityType: 'event'
      }
    });


    if (data.value && data.value.items?.length > 0) {
      const publication = {
        ...data.value.items[0],
        props: JSON.parse(data.value.items[0].props)
      };
      pageStore.setEventDetailData({
        event: publication.entity,
        eventPublication: publication
      });
    } 
  }
}

async function initProductDetailPage() {
  const pathParts = route.path.split('/').filter(Boolean);
  const publicationSlug = pathParts[pathParts.length - 1];

  if (publicationSlug) {
    const { data } = await useAPI<any>('/site-publication', {
      query: {
        siteScopedID: siteStore.site?.scopedID,
        slug: publicationSlug,
        entityType: 'product'
      }
    });

    if (data.value && data.value.items?.length > 0) {
      const publication = {
        ...data.value.items[0],
        props: JSON.parse(data.value.items[0].props)
      };

      pageStore.setProductDetailData({
        product: publication.entity,
        productPublication: publication
      });
    }
  }
}

async function initCheckoutPage() {
  const { reservationID, payload } = useRoute().query;
  try {
    pageStore.setCheckoutData({
      reservationIDParam: reservationID as string | null,
      URIPayload: payload ? JSON.parse(decodeURIComponent(payload as string)) : null
    })
  } catch (error) {
    Logger.error('failed to set checkout data', { error });
  }
}

async function initTicketRegistrationPage() {
  const { eventID, reservationID } = useRoute().query;
  pageStore.setTicketRegistrationData({
    eventIDParam: eventID as string | null,
    reservationIDParam: reservationID as string | null
  })
}

const initMapping: Record<string, any> = {
  [PageType.EventDetail]: initEventDetailPage,
  [PageType.ProductDetail]: initProductDetailPage,
  [PageType.TicketRegistration]: initTicketRegistrationPage,
  [PageType.Checkout]: initCheckoutPage,
}

if (page.value?.type && page.value.type in initMapping) {
  await initMapping[page.value.type]();
}

</script>
<template>
  <template v-if="page">
    <Widget v-if="page.headerScopedID" :scoped-i-d="page.headerScopedID" />
    <div class="bz-content">
      <template v-for="widgetID in page.widgetScopedIDs" :key="widgetID">
        <Widget :scoped-i-d="widgetID" />
      </template>
    </div>
    <Widget v-if="page.footerScopedID" :scoped-i-d="page.footerScopedID" />
  </template>
</template>
