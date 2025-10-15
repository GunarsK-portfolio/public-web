<template>
  <n-space
    id="projects"
    vertical
    :size="32"
    style="padding: 80px 20px; max-width: 900px; margin: 0 auto"
  >
    <h2 style="font-size: 36px; font-weight: 700; margin: 0">Portfolio Projects</h2>

    <n-divider />

    <n-space v-if="loading" justify="center">
      <n-spin size="large" />
    </n-space>

    <n-grid v-else :cols="1" :y-gap="24">
      <n-grid-item v-for="project in featuredProjects" :key="project.id">
        <n-card hoverable>
          <n-space vertical :size="16">
            <n-space justify="space-between" align="center">
              <h3 style="font-size: 24px; font-weight: 600; margin: 0">
                {{ project.title }}
              </h3>
              <n-space :size="8">
                <n-button
                  v-if="project.github_url"
                  text
                  type="primary"
                  tag="a"
                  :href="project.github_url"
                  target="_blank"
                >
                  GitHub
                </n-button>
                <n-button
                  v-if="project.live_url"
                  text
                  type="success"
                  tag="a"
                  :href="project.live_url"
                  target="_blank"
                >
                  Live Demo
                </n-button>
              </n-space>
            </n-space>

            <n-text>{{ project.description }}</n-text>

            <n-space :size="8" style="flex-wrap: wrap">
              <n-tag
                v-for="tech in project.technologies"
                :key="tech.name"
                :type="tech.type"
                size="small"
              >
                {{ tech.name }}
              </n-tag>
            </n-space>

            <n-button v-if="project.link_to" @click="$router.push(project.link_to)">
              Read More →
            </n-button>
            <n-button v-else type="primary" @click="$router.push(`/projects/${project.id}`)">
              View Details →
            </n-button>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>
  </n-space>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { NSpace, NDivider, NGrid, NGridItem, NCard, NText, NTag, NButton, NSpin } from 'naive-ui'
import api from '../services/api'
import { useErrorHandler } from '../composables/useErrorHandler'

const { handleError } = useErrorHandler()
const projects = ref([])
const loading = ref(true)

// Only show featured projects on home page
const featuredProjects = computed(() => {
  return projects.value.filter((p) => p.featured)
})

const loadProjects = async () => {
  try {
    const response = await api.getProjects()
    projects.value = response.data
  } catch (error) {
    handleError(error, { retryFn: loadProjects })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProjects()
})
</script>
