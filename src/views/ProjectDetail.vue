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

          <n-card v-if="project.longDescription" title="Overview">
            <n-space vertical :size="16">
              <div class="markdown-content" v-html="renderedDescription"></div>

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
import { ref, computed, onMounted } from 'vue'
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
import { renderMarkdown } from '../utils/markdown'
import { formatDate } from '../utils/date'

const route = useRoute()
const router = useRouter()
const { handleError } = useErrorHandler()
const project = ref(null)
const loading = ref(true)

// Render markdown long description
const renderedDescription = computed(() => {
  if (!project.value?.longDescription) return ''
  return renderMarkdown(project.value.longDescription)
})

// Safe navigation - go to home if no history
const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

const getTagType = (categoryName) => getCategoryTagType(categoryName)

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

.markdown-content {
  line-height: 1.7;
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4) {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: 600;
}

.markdown-content :deep(h1) {
  font-size: 1.5em;
}

.markdown-content :deep(h2) {
  font-size: 1.3em;
}

.markdown-content :deep(h3) {
  font-size: 1.15em;
}

.markdown-content :deep(p) {
  margin-bottom: 1em;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin-bottom: 1em;
  padding-left: 1.5em;
}

.markdown-content :deep(li) {
  margin-bottom: 0.25em;
}

.markdown-content :deep(code) {
  background-color: rgba(128, 128, 128, 0.15);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
}

.markdown-content :deep(pre) {
  background-color: rgba(128, 128, 128, 0.1);
  padding: 1em;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 1em;
}

.markdown-content :deep(pre code) {
  background: none;
  padding: 0;
}

.markdown-content :deep(a) {
  color: var(--n-text-color);
  text-decoration: underline;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid rgba(128, 128, 128, 0.3);
  padding-left: 1em;
  margin: 1em 0;
  color: var(--n-text-color-3);
}
</style>
