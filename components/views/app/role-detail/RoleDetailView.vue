<template>
    <h1>Hello World</h1>
    Muhammad
</template>


<script setup lang="ts">
    import { IconDownload } from '#components';
    import type { components } from '@/api/apiMethods.types';
    import { Check } from '@element-plus/icons-vue';

type PermissionGroupDto = components["schemas"]["PermissionGroupDto"];
type PermissionDto = components["schemas"]["PermissionDto"];

    interface LocalPermission extends PermissionDto {
        isActive: boolean
    }

    interface LocalPermissionGroup {
        key: PermissionGroupDto["key"];
    }
</script>