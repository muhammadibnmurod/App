<template>
  <template v-if="id">
    <RoleDetailView :id="id" />
  </template>
</template>

<script setup lang="ts">
  import RoleDetailView from '@/components/views/app/role-detail/RoleDetailView.vue';
const route = useRoute()

const { id }: any = route.params
</script>