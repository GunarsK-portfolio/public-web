<template>
  <n-space vertical :size="24">
    <n-button text @click="$router.back()"> ← Back </n-button>

    <n-space v-if="loading" justify="center">
      <n-spin size="large" />
    </n-space>

    <n-space v-else-if="project" vertical :size="24">
      <div>
        <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 8px">{{ project.title }}</h1>
        <p v-if="project.completed_date" style="font-size: 14px; opacity: 0.7; margin-bottom: 16px">
          Completed: {{ project.completed_date }}
        </p>
        <p style="font-size: 16px; margin-bottom: 32px">{{ project.description }}</p>
      </div>

      <n-grid
        v-if="project.images && project.images.length"
        :cols="2"
        :x-gap="16"
        :y-gap="16"
        responsive="screen"
      >
        <n-grid-item v-for="image in project.images" :key="image.id">
          <n-card>
            <template #cover>
              <img
                :src="image.url"
                :alt="image.title || project.title"
                style="width: 100%; object-fit: cover"
              />
            </template>
            <template v-if="image.title || image.description">
              <h3 v-if="image.title" style="font-size: 18px; font-weight: bold; margin-bottom: 4px">
                {{ image.title }}
              </h3>
              <p v-if="image.description">{{ image.description }}</p>
            </template>
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-space>
  </n-space>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { NSpace, NSpin, NButton, NGrid, NGridItem, NCard } from 'naive-ui'
import api from '../services/api'

const route = useRoute()
const project = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await api.getMiniatureById(route.params.id)
    project.value = response.data
  } catch (error) {
    console.error('Failed to load project:', error)
  } finally {
    loading.value = false
  }
})
</script>
