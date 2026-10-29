<script setup lang="ts">
const siteName = useRuntimeConfig().public.websiteName;
const { t } = usePlutoSiteI18n();
const route = useRoute();
const router = useRouter();

useSeoMeta({ title: siteName, description: () => t("site.home.tagline") });

interface PostSummary {
  id: string;
  title: string;
  excerpt?: string;
  createdAt?: string;
  publishedAt?: string;
}

const PAGE_SIZE = 9;

const q = computed(() => String(route.query.q ?? "").trim());
const page = computed({
  get: () => Math.max(1, Number(route.query.page) || 1),
  set: (value: number) =>
    router.replace({
      query: { ...route.query, page: value > 1 ? String(value) : undefined },
    }),
});

const search = ref(q.value);
watchDebounced(
  search,
  (value) =>
    router.replace({
      query: { q: value.trim() || undefined, page: undefined },
    }),
  { debounce: 300 },
);

const { data, error } = await usePlutoPublicList<PostSummary>("post", () => ({
  limit: PAGE_SIZE,
  offset: (page.value - 1) * PAGE_SIZE,
  sort: "-publishedAt",
  ...(q.value ? { search: q.value } : {}),
}));

const posts = computed(() => data.value?.data ?? []);
const total = computed(() => data.value?.meta.total ?? 0);
</script>

<template>
  <div>
    <section class="pluto-sky border-default border-b">
      <UContainer class="flex flex-col items-start gap-5 py-16 sm:py-24">
        <span
          class="bg-primary/10 text-primary ring-primary/25 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ring"
        >
          <UIcon name="i-lucide-feather" class="size-4" />
          {{ t("site.home.chip") }}
        </span>

        <h1
          class="text-highlighted text-5xl font-semibold tracking-tight text-balance sm:text-6xl"
        >
          {{ siteName }}
        </h1>

        <p class="text-muted max-w-xl text-lg text-pretty sm:text-xl">
          {{ t("site.home.tagline") }}
        </p>

        <UInput
          v-model="search"
          :placeholder="t('site.home.search')"
          :aria-label="t('site.home.search')"
          icon="i-lucide-search"
          size="lg"
          class="mt-2 w-full max-w-md"
        />
      </UContainer>
    </section>

    <UContainer class="py-12 sm:py-16">
      <UAlert
        v-if="error"
        :title="t('site.home.loadFailed')"
        :description="error.statusMessage || error.message"
        color="error"
        variant="subtle"
        icon="i-lucide-circle-alert"
      />

      <UEmpty
        v-else-if="!posts.length && q"
        :title="t('site.home.noResults', { query: q })"
        :actions="[
          {
            label: t('site.home.clearSearch'),
            color: 'neutral',
            variant: 'outline',
            onClick: () => (search = ''),
          },
        ]"
        icon="i-lucide-search-x"
        variant="naked"
      />

      <UEmpty
        v-else-if="!posts.length"
        :title="t('site.home.empty')"
        :description="t('site.home.emptyHint')"
        icon="i-lucide-feather"
        variant="naked"
      />

      <template v-else>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PostCard
            v-for="post in posts"
            :key="post.id"
            :to="`/posts/${post.id}`"
            :title="post.title"
            :excerpt="post.excerpt"
            :published-at="post.publishedAt"
            :created-at="post.createdAt"
          />
        </div>

        <UPagination
          v-if="total > PAGE_SIZE"
          v-model:page="page"
          :total="total"
          :items-per-page="PAGE_SIZE"
          class="mt-12 flex justify-center"
        />
      </template>
    </UContainer>
  </div>
</template>
