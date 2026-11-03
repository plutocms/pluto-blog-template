<script setup lang="ts">
const siteName = useRuntimeConfig().public.websiteName;

useHead({
  titleTemplate: (title) =>
    title && title !== siteName ? `${title} - ${siteName}` : siteName,
});

// PlutoRoot moves the page down under the admin bar while it shows. The
// layout is then one screen less the bar, so a short page does not scroll.
const { visible: offset } = usePlutoAdminBar();
</script>

<template>
  <div
    :class="
      offset ? 'min-h-[calc(100dvh-var(--pluto-admin-bar-height))]' : 'min-h-dvh'
    "
    class="flex flex-col"
  >
    <SiteNavbar />

    <main class="flex-1">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>
