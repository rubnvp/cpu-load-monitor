<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="header-wrapper">
      <h1>CPU Load Monitor</h1>
      <nav>
        <router-link to="/">Real Time Monitor</router-link>
        <!-- <router-link to="/">History</router-link> -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e0e0e0;
}
</style>
