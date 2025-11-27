<template>
  <n-space vertical size="large" class="section-wrapper">
    <n-button text @click="goBack">
      <template #icon>
        <n-icon><ArrowBackOutline /></n-icon>
      </template>
      Back
    </n-button>

    <n-space v-if="loading" justify="center" role="status" aria-live="polite">
      <n-spin size="large" aria-label="Loading project details" />
    </n-space>

    <transition-group name="fade-up" tag="div">
      <div v-if="!loading" class="project-wrapper">
        <template v-if="project">
          <n-page-header :title="project.title" :subtitle="project.category">
            <template #extra>
              <n-space>
                <n-button
                  v-if="project.githubUrl"
                  tag="a"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <template #icon>
                    <n-icon><LogoGithub /></n-icon>
                  </template>
                  View on GitHub
                </n-button>
                <n-button
                  v-if="project.liveUrl"
                  type="primary"
                  tag="a"
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </n-button>
              </n-space>
            </template>
          </n-page-header>

          <div v-if="project.imageFile?.url" class="project-image-wrapper">
            <n-image
              :src="addSourceToFileUrl(project.imageFile.url)"
              :alt="project.title"
              class="image-cover-lg"
              width="1200"
              height="400"
            />
          </div>

          <n-card title="Overview">
            <n-space vertical :size="16">
              <n-text>{{ project.longDescription || project.description }}</n-text>

              <n-divider v-if="project.startDate" />

              <n-space v-if="project.startDate">
                <n-text depth="3">
                  <n-text strong>Timeline:</n-text>
                  {{ formatDate(project.startDate) }} -
                  {{ project.isOngoing ? 'Present' : formatDate(project.endDate) }}
                </n-text>
                <n-text v-if="project.teamSize" depth="3">
                  <n-text strong>Team Size:</n-text> {{ project.teamSize }}
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
                :key="tech.skill"
                :type="getTagType(tech.type)"
                size="large"
              >
                {{ tech.skill }}
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
      </div>
    </transition-group>
  </n-space>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  NSpace,
  NPageHeader,
  NButton,
  NIcon,
  NCard,
  NText,
  NDivider,
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
import { createItemLoader } from '../utils/crudHelpers'
import { getCategoryTagType } from '../constants/skills'
import { addSourceToFileUrl } from '../utils/fileUrl'

const route = useRoute()
const router = useRouter()
const { handleError } = useErrorHandler()
const project = ref(null)
const loading = ref(true)

// Safe navigation - go to home if no history
const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

const getTagType = (categoryName) => getCategoryTagType(categoryName)

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

const loadProject = createItemLoader({
  loading,
  data: project,
  service: api.getProjectById,
  entityName: 'project',
  handleError,
  getId: () => route.params.id,
})

onMounted(() => {
  loadProject()
})
</script>

<style scoped>
.loading-space {
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.project-image-wrapper {
  aspect-ratio: 3 / 1;
  overflow: hidden;
  border-radius: 8px;
}
</style>
