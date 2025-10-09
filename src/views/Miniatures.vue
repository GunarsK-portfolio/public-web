<template>
  <div class="space-y-6">
    <h1 class="text-4xl font-bold">Miniature Painting Projects</h1>

    <div v-if="loading" class="flex justify-center">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else class="grid md:grid-cols-3 gap-6">
      <div v-for="project in miniatures" :key="project.id" class="card bg-base-200 shadow-xl">
        <figure v-if="project.images && project.images[0]" class="px-10 pt-10">
          <img :src="project.images[0].url" :alt="project.title" class="rounded-xl" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ project.title }}</h2>
          <p>{{ project.description }}</p>
          <p v-if="project.completed_date" class="text-sm opacity-70">
            Completed: {{ project.completed_date }}
          </p>
          <div class="card-actions justify-end">
            <router-link :to="`/miniatures/${project.id}`" class="btn btn-primary btn-sm">
              View Details
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const miniatures = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await api.getMiniatures()
    miniatures.value = response.data
  } catch (error) {
    console.error('Failed to load miniatures:', error)
  } finally {
    loading.value = false
  }
})
</script>
