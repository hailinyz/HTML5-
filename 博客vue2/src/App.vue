<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
#app {
  min-height: 100vh;
  background-color: #f5f5f5;
  transition: background-color 0.3s ease;
}

.dark-mode #app {
  background-color: transparent;
}
</style>
