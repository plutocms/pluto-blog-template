<script setup lang="ts">
const props = defineProps<{
  title: string;
  excerpt?: string;
  html: string;
  publishedAt?: string;
  createdAt?: string;
}>();

const { t, d } = usePlutoSiteI18n();

const date = computed(() => {
  const value = props.publishedAt || props.createdAt;
  return value ? d(new Date(value), { dateStyle: "long" }) : "";
});

const WORDS_PER_MINUTE = 220;

const minutes = computed(() => {
  const words = props.html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
});
</script>

<template>
  <article>
    <header class="pluto-sky border-default border-b">
      <UContainer class="max-w-3xl py-12 sm:py-16">
        <ULink
          to="/"
          class="text-muted hover:text-primary mb-8 inline-flex items-center gap-1.5 text-sm"
        >
          <UIcon name="i-lucide-arrow-left" class="size-4" />
          {{ t("site.post.back") }}
        </ULink>

        <p class="text-muted mb-3 flex flex-wrap items-center gap-x-2 text-sm">
          <time v-if="date">{{ date }}</time>
          <span v-if="date" aria-hidden="true">·</span>
          <span>{{ t("site.post.readingTime", { minutes }) }}</span>
        </p>

        <h1
          class="text-highlighted text-4xl font-semibold text-balance sm:text-5xl"
        >
          {{ title }}
        </h1>

        <p
          v-if="excerpt"
          class="text-muted mt-5 text-lg text-pretty sm:text-xl"
        >
          {{ excerpt }}
        </p>
      </UContainer>
    </header>

    <UContainer class="max-w-3xl py-12">
      <PlutoMarkdown :html="html" tag="div" data-pluto-post-body />
    </UContainer>
  </article>
</template>
