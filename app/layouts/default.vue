<script setup lang="ts">
const siteName = useRuntimeConfig().public.websiteName;

// A signed-in editor sees the 40px admin navbar at the top of every page.
// Move the site down by its height, so the bar covers nothing. The session
// is read in the browser only, so wait for the mount: a class that differs
// from the server HTML on the first render is dropped on hydration.
const { loggedIn } = usePlutoCmsSession();
const mounted = useMounted();
const offset = computed(() => mounted.value && loggedIn.value);
</script>

<template>
  <div
    :class="offset ? 'pt-(--ui-header-height)' : ''"
    class="bg-default text-default flex min-h-dvh flex-col"
  >
    <header class="border-default border-b">
      <UContainer class="flex h-16 items-center justify-between">
        <NuxtLink to="/" class="text-highlighted text-lg font-semibold">
          {{ siteName }}
        </NuxtLink>

        <UColorModeButton />
      </UContainer>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-default text-muted border-t py-8 text-sm">
      <UContainer>
        Made with Pluto CMS. Posts are Markdown files in GitHub.
      </UContainer>
    </footer>
  </div>
</template>
