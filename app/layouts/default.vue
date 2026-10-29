<script setup lang="ts">
const siteName = useRuntimeConfig().public.websiteName;
const { t } = usePlutoSiteI18n();

// A signed-in editor sees the 40px admin bar at the top of every page. Move
// the site down by its height, so the bar covers nothing. The core rule is
// false on the server and in the first render, so it causes no hydration
// mismatch. The sticky header moves too (`.site-header` in tailwind.css).
const { visible: offset } = usePlutoAdminBar();
</script>

<template>
  <div
    :class="offset ? 'pt-(--pluto-admin-bar-height)' : ''"
    class="bg-default text-default flex min-h-dvh flex-col"
  >
    <header
      class="site-header border-default bg-default/75 sticky top-0 z-40 border-b backdrop-blur"
    >
      <UContainer class="flex h-16 items-center justify-between gap-4">
        <!-- Your logo: replace the planet with your own mark. -->
        <NuxtLink to="/" class="flex min-w-0 items-center gap-2.5">
          <PlutoLogo mark class="size-7 shrink-0" />
          <span
            class="font-display text-highlighted truncate text-xl font-semibold"
          >
            {{ siteName }}
          </span>
        </NuxtLink>

        <div class="flex items-center gap-1">
          <LanguageSwitch />
          <UColorModeButton color="neutral" variant="ghost" />
        </div>
      </UContainer>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-default border-t">
      <UContainer
        class="text-muted flex flex-col items-center justify-between gap-3 py-8 text-sm sm:flex-row"
      >
        <p>© {{ new Date().getFullYear() }} {{ siteName }}</p>

        <ULink
          to="https://pluto.vulmix.dev"
          target="_blank"
          class="hover:text-highlighted flex items-center gap-2"
        >
          <PlutoLogo mark class="size-4" />
          {{ t("site.footer.builtWith") }}
        </ULink>
      </UContainer>
    </footer>
  </div>
</template>
