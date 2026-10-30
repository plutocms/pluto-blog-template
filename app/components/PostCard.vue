<script setup lang="ts">
const props = defineProps<{
  to: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  createdAt?: string;
  cover?: PlutoPublicMedia | null;
}>();

const { t, d } = usePlutoSiteI18n();

const date = computed(() => {
  const value = props.publishedAt || props.createdAt;
  return value ? d(new Date(value), { dateStyle: "medium" }) : "";
});
</script>

<template>
  <NuxtLink
    :to="to"
    class="group bg-default ring-default hover:ring-primary/50 flex flex-col overflow-hidden rounded-xl ring transition-shadow hover:shadow-lg"
  >
    <div v-if="cover" class="bg-elevated aspect-video overflow-hidden">
      <PlutoImage
        :media="cover"
        sizes="xs:100vw sm:50vw lg:400px"
        class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    <div class="flex flex-1 flex-col gap-3 p-6">
      <time v-if="date" class="text-muted text-sm">{{ date }}</time>

      <h2
        class="font-display text-highlighted group-hover:text-primary text-xl font-semibold text-balance transition-colors"
      >
        {{ title }}
      </h2>

      <p v-if="excerpt" class="text-toned line-clamp-3 text-pretty">
        {{ excerpt }}
      </p>

      <span
        class="text-primary mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium"
      >
        {{ t("site.home.read") }}
        <UIcon
          name="i-lucide-arrow-right"
          class="size-4 transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </div>
  </NuxtLink>
</template>
