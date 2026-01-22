<template>
  <n-space vertical align="center" justify="center" :size="32" class="error-page">
    <n-icon size="120" :color="themeVars.errorColor">
      <AlertCircleOutline />
    </n-icon>

    <n-space vertical align="center" :size="16">
      <h1 class="error-code" :style="{ color: themeVars.errorColor }">404</h1>
      <h2 class="error-title">Page Not Found</h2>
      <n-text class="error-message">
        The page you're looking for doesn't exist or has been moved.
      </n-text>
    </n-space>

    <n-space :size="16">
      <n-button type="primary" size="large" @click="$router.push('/')">
        <template #icon>
          <n-icon><HomeOutline /></n-icon>
        </template>
        Back to Home
      </n-button>
    </n-space>

    <n-divider class="divider" />

    <n-text depth="3" class="error-note">
      If you believe this is a mistake, please
      <n-button text type="primary" @click="$router.push('/contact')"> contact us </n-button>
    </n-text>
  </n-space>
</template>

<script setup>
import { NSpace, NIcon, NText, NButton, NDivider, useThemeVars } from 'naive-ui'
import { AlertCircleOutline, HomeOutline } from '@vicons/ionicons5'
import { useSeoMeta } from '../composables/useSeoMeta'

const themeVars = useThemeVars()

useSeoMeta({
  title: '404 - Page Not Found',
  description: "The page you're looking for doesn't exist or has been moved.",
})
</script>

<style scoped>
.error-page {
  min-height: calc(100vh - 64px);
  padding: 40px 20px;
}

.error-code {
  font-size: 72px;
  font-weight: 700;
  margin: 0;
  transition: color 0.3s;
}

.error-title {
  font-size: 32px;
  font-weight: 600;
  margin: 0;
}

.error-message {
  font-size: 18px;
  text-align: center;
  max-width: 500px;
  opacity: 0.8;
}

.divider {
  max-width: 400px;
}

.error-note {
  font-size: 14px;
}
</style>
