import { useSiteStore } from '#imports';
import type { SitePublication } from '@breezingin/breezing-shared';
import { ref } from 'vue';

type FetchPublicationsParams = {
  entityType: string;
  [key: string]: string;
};

interface ListResponse<T> {
  itemCount: number;
  page: number;
  pageCount: number;
  items: T[];
}

export function useSitePublication<T>() {
  const siteStore = useSiteStore();
  const { $api } = useNuxtApp();
  const items = ref<SitePublication<T>[]>([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchPublications({ entityType, status = 'published', ...params }: FetchPublicationsParams) {
    loading.value = true;
    error.value = null;
    try {
      const siteScopedID = siteStore.site?.scopedID;
      if (!siteScopedID) throw new Error('Missing siteScopedID');
      const searchParams = new URLSearchParams({
        siteScopedID,
        entityType,
        status,
        ...params
      });
      const data = await $api<ListResponse<SitePublication<T>>>(`/site-publication?${searchParams.toString()}`);
      items.value = data.items || [];
    } catch (e) {
      error.value = e as any;
    } finally {
      loading.value = false;
    }
  }

  return { items, loading, error, fetchPublications };
}
