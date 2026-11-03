<script setup lang="ts">
const props = defineProps<{
  to: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  createdAt?: string;
  cover?: PlutoPublicMedia | null;
}>();

const date = computed(() => formatPostDate(props.publishedAt || props.createdAt));
</script>

<template>
  <NuxtLink :to="to" class="group flex items-start gap-5 py-6">
    <div class="min-w-0 flex-1">
      <time v-if="date" class="text-sm text-zinc-500">{{ date }}</time>
      <h2
        class="mt-1 text-lg font-semibold text-balance text-zinc-950 group-hover:underline group-hover:underline-offset-4 dark:text-white"
      >
        {{ title }}
      </h2>
      <p v-if="excerpt" class="mt-1.5 line-clamp-2 text-pretty">
        {{ excerpt }}
      </p>
    </div>

    <PlutoImage
      v-if="cover"
      :media="cover"
      sizes="96px"
      class="hidden size-24 shrink-0 rounded-lg object-cover sm:block"
    />
  </NuxtLink>
</template>
