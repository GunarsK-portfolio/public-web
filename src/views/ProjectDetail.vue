<template>
  <n-space vertical size="large" style="padding: 24px; max-width: 1200px; margin: 0 auto">
    <n-button text @click="$router.push('/')">
      <template #icon>
        <n-icon><ArrowBackOutline /></n-icon>
      </template>
      Back to Home
    </n-button>

    <n-space v-if="loading" justify="center" style="min-height: 400px" align="center">
      <n-spin size="large" />
    </n-space>

    <n-alert v-else-if="error" type="error" title="Project Not Found">
      {{ error }}
    </n-alert>

    <template v-else-if="project">
      <n-page-header :title="project.title" :subtitle="project.category">
        <template #extra>
          <n-space>
            <n-button v-if="project.github_url" tag="a" :href="project.github_url" target="_blank">
              <template #icon>
                <n-icon><LogoGithub /></n-icon>
              </template>
              View on GitHub
            </n-button>
            <n-button
              v-if="project.live_url"
              type="primary"
              tag="a"
              :href="project.live_url"
              target="_blank"
            >
              Live Demo
            </n-button>
          </n-space>
        </template>
      </n-page-header>

      <n-image
        v-if="project.image_url"
        :src="project.image_url"
        :alt="project.title"
        style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px"
      />

      <n-card title="Overview">
        <n-space vertical :size="16">
          <n-text>{{ project.long_description || project.description }}</n-text>

          <n-divider v-if="project.start_date" />

          <n-space v-if="project.start_date">
            <n-text depth="3">
              <n-text strong>Timeline:</n-text>
              {{ formatDate(project.start_date) }} -
              {{ project.is_ongoing ? 'Present' : formatDate(project.end_date) }}
            </n-text>
            <n-text v-if="project.team_size" depth="3">
              <n-text strong>Team Size:</n-text> {{ project.team_size }}
            </n-text>
            <n-text v-if="project.role" depth="3">
              <n-text strong>Role:</n-text> {{ project.role }}
            </n-text>
          </n-space>
        </n-space>
      </n-card>

      <n-card v-if="project.technologies && project.technologies.length" title="Tech Stack">
        <n-space :size="12">
          <n-tag
            v-for="tech in project.technologies"
            :key="tech.name"
            :type="tech.type"
            size="large"
          >
            {{ tech.name }}
          </n-tag>
        </n-space>
      </n-card>

      <n-card v-if="project.features && project.features.length" title="Key Features">
        <n-list>
          <n-list-item v-for="(feature, index) in project.features" :key="index">
            <template #prefix>
              <n-icon color="#18a058"><CheckmarkCircleOutline /></n-icon>
            </template>
            {{ feature }}
          </n-list-item>
        </n-list>
      </n-card>

      <n-card v-if="project.challenges && project.challenges.length" title="Challenges">
        <n-list>
          <n-list-item v-for="(challenge, index) in project.challenges" :key="index">
            <template #prefix>
              <n-icon color="#d03050"><AlertCircleOutline /></n-icon>
            </template>
            {{ challenge }}
          </n-list-item>
        </n-list>
      </n-card>

      <n-card v-if="project.learnings && project.learnings.length" title="Key Learnings">
        <n-list>
          <n-list-item v-for="(learning, index) in project.learnings" :key="index">
            <template #prefix>
              <n-icon color="#2080f0"><BulbOutline /></n-icon>
            </template>
            {{ learning }}
          </n-list-item>
        </n-list>
      </n-card>
    </template>
  </n-space>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  NSpace,
  NPageHeader,
  NButton,
  NIcon,
  NCard,
  NText,
  NDivider,
  NAlert,
  NTag,
  NList,
  NListItem,
  NSpin,
  NImage,
} from 'naive-ui'
import {
  ArrowBackOutline,
  LogoGithub,
  CheckmarkCircleOutline,
  AlertCircleOutline,
  BulbOutline,
} from '@vicons/ionicons5'
import api from '../services/api'
import { useErrorHandler } from '../composables/useErrorHandler'

const route = useRoute()
const { handleError } = useErrorHandler()
const project = ref(null)
const loading = ref(true)
const error = ref(null)

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

const loadProject = async () => {
  try {
    const id = route.params.id
    const response = await api.getProjectById(id)
    project.value = response.data
  } catch (err) {
    handleError(err, { retryFn: loadProject })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProject()
})
</script>
