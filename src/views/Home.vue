<template>
  <div class="space-y-8">
    <div v-if="loading" class="flex justify-center">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else-if="profile" class="hero min-h-[400px] bg-base-200 rounded-lg">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">{{ profile.full_name }}</h1>
          <p class="text-xl py-2">{{ profile.title }}</p>
          <p class="py-6">{{ profile.bio }}</p>
          <div class="space-y-2">
            <p v-if="profile.location">📍 {{ profile.location }}</p>
            <p v-if="profile.email">📧 {{ profile.email }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <router-link to="/experience" class="card bg-base-200 hover:shadow-xl transition">
        <div class="card-body">
          <h2 class="card-title">Work Experience</h2>
          <p>View my professional journey and accomplishments</p>
        </div>
      </router-link>

      <router-link to="/miniatures" class="card bg-base-200 hover:shadow-xl transition">
        <div class="card-body">
          <h2 class="card-title">Miniature Painting</h2>
          <p>Explore my miniature painting projects</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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
