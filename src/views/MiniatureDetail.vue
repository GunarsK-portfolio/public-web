<template>
  <div class="space-y-6">
    <button @click="$router.back()" class="btn btn-ghost">← Back</button>

    <div v-if="loading" class="flex justify-center">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else-if="project">
      <h1 class="text-4xl font-bold mb-4">{{ project.title }}</h1>
      <p v-if="project.completed_date" class="text-sm opacity-70 mb-4">
        Completed: {{ project.completed_date }}
      </p>
      <p class="text-lg mb-8">{{ project.description }}</p>

      <div v-if="project.images && project.images.length" class="grid md:grid-cols-2 gap-4">
        <div v-for="image in project.images" :key="image.id" class="card bg-base-200">
          <figure>
            <img :src="image.url" :alt="image.title || project.title" class="w-full" />
          </figure>
          <div v-if="image.title || image.description" class="card-body">
            <h3 v-if="image.title" class="card-title">{{ image.title }}</h3>
            <p v-if="image.description">{{ image.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
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
