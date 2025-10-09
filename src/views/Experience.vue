<template>
  <div class="space-y-6">
    <h1 class="text-4xl font-bold">Work Experience & Certifications</h1>

    <div v-if="loading" class="flex justify-center">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else>
      <h2 class="text-2xl font-semibold mb-4">Work Experience</h2>
      <div class="timeline timeline-vertical">
        <div v-for="exp in experience" :key="exp.id" class="timeline-item mb-6">
          <div class="card bg-base-200">
            <div class="card-body">
              <h3 class="card-title">{{ exp.position }}</h3>
              <p class="text-lg">{{ exp.company }}</p>
              <p class="text-sm opacity-70">
                {{ exp.start_date }} - {{ exp.is_current ? 'Present' : exp.end_date }}
              </p>
              <p class="mt-2">{{ exp.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-semibold mt-8 mb-4">Certifications</h2>
      <div class="grid md:grid-cols-2 gap-4">
        <div v-for="cert in certifications" :key="cert.id" class="card bg-base-200">
          <div class="card-body">
            <h3 class="card-title">{{ cert.name }}</h3>
            <p>{{ cert.issuer }}</p>
            <p class="text-sm opacity-70">Issued: {{ cert.issue_date }}</p>
            <a v-if="cert.credential_url" :href="cert.credential_url" target="_blank" class="link link-primary">
              View Credential
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const experience = ref([])
const certifications = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const [expResp, certResp] = await Promise.all([
      api.getExperience(),
      api.getCertifications()
    ])
    experience.value = expResp.data
    certifications.value = certResp.data
  } catch (error) {
    console.error('Failed to load data:', error)
  } finally {
    loading.value = false
  }
})
</script>
