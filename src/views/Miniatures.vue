<template>
  <n-space vertical size="large" class="section-wrapper">
    <n-button text @click="goBack">
      <template #icon>
        <n-icon><ArrowBackOutline /></n-icon>
      </template>
      Back to Home
    </n-button>

    <n-page-header title="Miniature Painting" subtitle="My painting projects organized by theme">
    </n-page-header>

    <n-space v-if="loading" justify="center" role="status" aria-live="polite">
      <n-spin size="large" aria-label="Loading miniature themes" />
    </n-space>

    <transition-group name="fade-up" tag="div">
      <div v-if="!loading" class="themes-wrapper">
        <n-grid :x-gap="24" :y-gap="24" cols="1 512:2 768:3">
          <n-grid-item v-for="theme in themes" :key="theme.id">
            <n-card
              hoverable
              class="card-hoverable theme-card"
              tabindex="0"
              role="link"
              :aria-label="`View ${theme.name} miniatures`"
              @click="$router.push(`/miniatures/themes/${theme.id}`)"
              @keydown.enter="$router.push(`/miniatures/themes/${theme.id}`)"
            >
              <template #cover>
                <img
                  :src="theme.coverImageFile?.url"
                  :alt="theme.name"
                  class="image-card-cover"
                  loading="lazy"
                  width="400"
                  height="200"
                />
              </template>
              <n-space vertical :size="8" align="center">
                <n-text strong class="theme-name">{{ theme.name }}</n-text>
                <n-text v-if="theme.description" depth="3" class="theme-description">
                  {{ theme.description }}
                </n-text>
              </n-space>
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>
    </transition-group>
  </n-space>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  NSpace,
  NSpin,
  NPageHeader,
  NButton,
  NIcon,
  NCard,
  NText,
  NGrid,
  NGridItem,
} from 'naive-ui'
import { ArrowBackOutline } from '@vicons/ionicons5'
import api from '../services/api'
import { useErrorHandler } from '../composables/useErrorHandler'
import { createDataLoader } from '../utils/crudHelpers'

const router = useRouter()
const { handleError } = useErrorHandler()
const loading = ref(true)
const themes = ref([])

// Safe navigation - go to home if no history
const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

const loadThemes = createDataLoader({
  loading,
  data: themes,
  service: api.getMiniatureThemes,
  entityName: 'miniature themes',
  handleError,
})

onMounted(() => {
  loadThemes()
})
</script>

<style scoped>
.theme-name {
  font-size: 18px;
}

.theme-description {
  font-size: 14px;
  text-align: center;
}
</style>
