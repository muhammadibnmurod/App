<template>
  <el-dropdown trigger="click">
    <button
      class="w-9 h-9 flex items-center justify-center p-2 rounded-full text-white bg-gradient-to-b from-[#2176F6] to-[#024DBD] border border-surface-30">
      <IconProfile class="w-5 h-5" />
    </button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logOut">
          <div class="flex items-center gap-2">
            <IconArrowLeft class="w-4 h-4" />
            <span class="text-sm">Chiqish</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { IconArrowLeft } from '#components';

const { clearTokens } = useAuth()
const router = useRouter()

function logOut() {
  clearTokens()
  router.push('/auth')
}
</script>
