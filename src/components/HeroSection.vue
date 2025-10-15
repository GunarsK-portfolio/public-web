<template>
  <n-space
    vertical
    align="center"
    :size="32"
    style="padding: 0 20px 80px; min-height: calc(100vh - 64px); justify-content: center"
  >
    <n-space v-if="loading" justify="center">
      <n-spin size="large" />
    </n-space>

    <template v-else>
      <n-avatar
        round
        :size="150"
        :src="profile.avatar_url"
        fallback-src="https://via.placeholder.com/150"
      />

      <n-space vertical align="center" :size="12">
        <h1 style="font-size: 48px; font-weight: 700; margin: 0">{{ profile.name }}</h1>
        <h2 style="font-size: 24px; font-weight: 400; margin: 0; opacity: 0.8">
          {{ profile.title }}
        </h2>
      </n-space>

      <n-text style="max-width: 600px; text-align: center; font-size: 18px; line-height: 1.6">
        {{ profile.tagline }}
      </n-text>

      <n-space :size="16">
        <n-button type="primary" size="large" @click="scrollTo('resume')"> Resume </n-button>
        <n-button size="large" @click="scrollTo('skills')"> Skills </n-button>
        <n-button size="large" @click="scrollTo('projects')"> Projects </n-button>
        <n-button size="large" @click="scrollTo('miniatures')"> Miniatures </n-button>
      </n-space>
    </template>
  </n-space>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { NSpace, NAvatar, NText, NButton, NSpin } from 'naive-ui'
import api from '../services/api'

const profile = ref({})
const loading = ref(true)

const loadProfile = async () => {
  try {
    const response = await api.getProfile()
    profile.value = response.data
  } catch (error) {
    console.error('Failed to load profile:', error)
  } finally {
    loading.value = false
  }
}

const scrollTo = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  loadProfile()
})
</script>
