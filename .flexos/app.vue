<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import url('~/assets/css/tokens.css');
@import url('~/assets/css/components.css');

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden;
}
</style>
