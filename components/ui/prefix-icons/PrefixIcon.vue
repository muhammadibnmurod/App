<script setup lang="ts">
  type Props = {
    icon: object
  }

  defineProps<Props>()
</script>

<template>
    <component :is="icon" class="w-5 h-5 text-primary-color" />
</template>

<style scoped>

</style>