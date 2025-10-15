<template>
  <n-space vertical :size="24">
    <h1 style="font-size: 36px; font-weight: bold">Miniature Painting Projects</h1>

    <n-space v-if="loading" justify="center">
      <n-spin size="large" />
    </n-space>

    <n-grid v-else :cols="3" :x-gap="24" :y-gap="24" responsive="screen">
      <n-grid-item v-for="project in miniatures" :key="project.id">
        <n-card hoverable>
          <template v-if="project.images && project.images[0]" #cover>
            <img
              :src="project.images[0].url"
              :alt="project.title"
              style="width: 100%; height: 200px; object-fit: cover"
            />
          </template>
          <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 8px">
            {{ project.title }}
          </h2>
          <p style="margin-bottom: 8px">{{ project.description }}</p>
          <p
            v-if="project.completed_date"
            style="font-size: 14px; opacity: 0.7; margin-bottom: 16px"
          >
            Completed: {{ project.completed_date }}
          </p>
          <div style="text-align: right">
            <router-link :to="`/miniatures/${project.id}`" style="text-decoration: none">
              <n-button type="primary" size="small">View Details</n-button>
            </router-link>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>
  </n-space>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { NSpace, NSpin, NGrid, NGridItem, NCard, NButton } from 'naive-ui'
import api from '../services/api'
import { useErrorHandler } from '../composables/useErrorHandler'

const { handleError } = useErrorHandler()

const miniatures = ref([])
const loading = ref(true)

const loadMiniatures = async () => {
  try {
    const response = await api.getMiniatures()
    miniatures.value = response.data
  } catch (error) {
    handleError(error, { retryFn: loadMiniatures })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadMiniatures()
})
</script>
