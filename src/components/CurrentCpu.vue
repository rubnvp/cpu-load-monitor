<script setup lang="ts">
// Animated CPU load changes with animejs
import anime from 'animejs';
import { computed, ref, watch } from 'vue';

const props = defineProps({
  cpuLoad: Number,
});

const cpuPercentage = computed(() => Math.round((props.cpuLoad ?? 0) * 100))
const percentageCount = ref(0);

watch(cpuPercentage, (newValue) => {
  const counter = { n: percentageCount.value };
  anime({
    targets: counter,
    n: newValue,
    round: 1,
    duration: 500,
    easing: 'linear',
    update: () => {
      percentageCount.value = counter.n;
    }
  });
}, { immediate: true });

function formatToCpu(value: number): string {
  if (props.cpuLoad === undefined) return '-';
  return (value / 100).toFixed(2);
}
</script>

<template>
  <h2>{{ formatToCpu(percentageCount) }}</h2>
</template>