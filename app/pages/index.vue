<script setup lang="ts">
const siteName = useRuntimeConfig().public.websiteName;
const route = useRoute();
const router = useRouter();

const tagline = "Notes, stories and updates.";

useSeoMeta({ title: siteName, description: tagline });

// The search is in the URL (`?q=`), so a search result can be shared.
const q = computed(() => String(route.query.q ?? "").trim());
const search = ref(q.value);
watchDebounced(
  search,
  (value) =>
    router.replace({
      query: { q: value.trim() || undefined, page: undefined },
    }),
  { debounce: 300 },
);

// The page comes from `?page=` of the URL.
const { posts, page, pages, error } = await usePosts({ limit: 10, search: q });

function pageQuery(value: number) {
  return { ...route.query, page: value > 1 ? String(value) : undefined };
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-6 pb-16">
    <section class="pt-6 pb-10">
      <h1
        class="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-white"
      >
        {{ siteName }}
      </h1>
      <p class="mt-3 text-lg text-zinc-500">{{ tagline }}</p>

      <label class="relative mt-8 block">
        <span class="sr-only">Search posts</span>
        <Icon
          name="lucide:search"
          class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400"
        />
        <input
          v-model="search"
          type="search"
          placeholder="Search posts"
          class="w-full rounded-lg border border-zinc-200 bg-transparent py-2 ps-9 pe-3 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:focus:border-zinc-600"
        >
      </label>
    </section>

    <p v-if="error" class="text-red-600 dark:text-red-400">
      Could not load the posts: {{ error.statusText || error.message }}
    </p>

    <p v-else-if="!posts.length && q">
      No posts match “{{ q }}”.
      <button
        type="button"
        class="underline underline-offset-4"
        @click="search = ''"
      >
        Clear the search
      </button>
    </p>

    <p v-else-if="!posts.length">
      No posts yet.
      <NuxtLink to="/admin" class="underline underline-offset-4">
        Open the admin
      </NuxtLink>
      and write the first one.
    </p>

    <template v-else>
      <ul
        class="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800"
      >
        <li v-for="post in posts" :key="post.id">
          <PostListItem :post="post" />
        </li>
      </ul>

      <nav
        v-if="pages > 1"
        aria-label="Pages"
        class="mt-8 flex items-center justify-between text-sm"
      >
        <NuxtLink
          v-if="page > 1"
          :to="{ query: pageQuery(page - 1) }"
          class="inline-flex items-center gap-1.5 hover:text-zinc-950 dark:hover:text-white"
        >
          <Icon name="lucide:arrow-left" class="size-4" />
          Newer posts
        </NuxtLink>
        <span v-else />

        <span class="text-zinc-500">Page {{ page }} of {{ pages }}</span>

        <NuxtLink
          v-if="page < pages"
          :to="{ query: pageQuery(page + 1) }"
          class="inline-flex items-center gap-1.5 hover:text-zinc-950 dark:hover:text-white"
        >
          Older posts
          <Icon name="lucide:arrow-right" class="size-4" />
        </NuxtLink>
        <span v-else />
      </nav>
    </template>
  </div>
</template>
