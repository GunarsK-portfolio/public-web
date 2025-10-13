<template>
  <n-space vertical :size="24">
    <n-space v-if="loading" justify="center">
      <n-spin size="large" />
    </n-space>

    <n-card v-else-if="profile" size="large" style="min-height: 400px">
      <template #default>
        <div style="text-align: center; padding: 40px 0">
          <h1 style="font-size: 48px; font-weight: bold; margin-bottom: 8px">
            {{ profile.full_name }}
          </h1>
          <p style="font-size: 20px; margin: 8px 0">{{ profile.title }}</p>
          <p style="margin: 24px 0">{{ profile.bio }}</p>
          <n-space vertical :size="8" style="margin-top: 16px">
            <p v-if="profile.location">📍 {{ profile.location }}</p>
            <p v-if="profile.email">📧 {{ profile.email }}</p>
          </n-space>
        </div>
      </template>
    </n-card>

    <n-grid :cols="2" :x-gap="16" :y-gap="16" responsive="screen">
      <n-grid-item>
        <router-link to="/experience" style="text-decoration: none">
          <n-card hoverable>
            <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 8px">Work Experience</h2>
            <p>View my professional journey and accomplishments</p>
          </n-card>
        </router-link>
      </n-grid-item>

      <n-grid-item>
        <router-link to="/miniatures" style="text-decoration: none">
          <n-card hoverable>
            <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 8px">
              Miniature Painting
            </h2>
            <p>Explore my miniature painting projects</p>
          </n-card>
        </router-link>
      </n-grid-item>
    </n-grid>
  </n-space>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { NSpace, NSpin, NCard, NGrid, NGridItem } from 'naive-ui'
import api from '../services/api'

const profile = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await api.getProfile()
    profile.value = response.data
  } catch (error) {
    console.error('Failed to load profile:', error)
  } finally {
    loading.value = false
  }
})
</script>
