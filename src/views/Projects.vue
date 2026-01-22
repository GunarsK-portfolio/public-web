<template>
  <n-space vertical :size="32" class="projects-page">
    <h1 class="page-title">All Projects</h1>

    <n-divider />

    <n-space v-if="loading" justify="center" role="status" aria-live="polite">
      <n-spin size="large" aria-label="Loading projects" />
    </n-space>

    <transition-group name="fade-up" tag="div">
      <div v-if="!loading" class="projects-grid-wrapper">
        <n-grid :x-gap="24" :y-gap="24" :cols="1">
          <n-grid-item v-for="project in sortedProjects" :key="project.id">
            <n-card hoverable class="card-hoverable">
              <n-space vertical :size="16">
                <n-space justify="space-between" align="center">
                  <n-space align="center" :size="12">
                    <h3 class="project-title">{{ project.title }}</h3>
                    <n-tag v-if="project.featured" type="warning" size="small">Featured</n-tag>
                  </n-space>
                  <n-space :size="8">
                    <n-button
                      v-if="project.githubUrl"
                      text
                      type="primary"
                      tag="a"
                      :href="project.githubUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </n-button>
                    <n-button
                      v-if="project.liveUrl"
                      text
                      type="success"
                      tag="a"
                      :href="project.liveUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </n-button>
                  </n-space>
                </n-space>

                <n-text class="project-description">{{ project.description }}</n-text>

                <n-space :size="8" class="project-tags">
                  <n-tag
                    v-for="tech in project.technologies"
                    :key="tech.skill"
                    :type="getTagType(tech.type)"
                    size="small"
                  >
                    {{ tech.skill }}
                  </n-tag>
                </n-space>

                <n-button
                  type="primary"
                  @click="$router.push({ name: 'ProjectDetail', params: { id: project.id } })"
                >
                  View Details
                </n-button>
              </n-space>
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>
    </transition-group>
  </n-space>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { NSpace, NDivider, NGrid, NGridItem, NCard, NText, NTag, NButton, NSpin } from 'naive-ui'
import api from '../services/api'
import { useErrorHandler } from '../composables/useErrorHandler'
import { useSeoMeta } from '../composables/useSeoMeta'
import { createDataLoader } from '../utils/crudHelpers'
import { getCategoryTagType } from '../constants/skills'

useSeoMeta({
  title: 'Projects',
  description:
    'Browse my portfolio of full-stack development projects including microservices, e-commerce, and SaaS applications.',
  path: '/projects',
})

const { handleError } = useErrorHandler()
const projects = ref([])
const loading = ref(true)

const sortedProjects = computed(() => {
  const featured = projects.value.filter((p) => p.featured)
  const nonFeatured = projects.value.filter((p) => !p.featured)

  const sortByDate = (a, b) => {
    const dateA = a.startDate || ''
    const dateB = b.startDate || ''
    return dateB.localeCompare(dateA)
  }

  return [...featured.sort(sortByDate), ...nonFeatured.sort(sortByDate)]
})

const getTagType = (categoryName) => getCategoryTagType(categoryName)

const loadProjects = createDataLoader({
  loading,
  data: projects,
  service: api.getProjects,
  entityName: 'projects',
  handleError,
})

onMounted(() => {
  loadProjects()
})
</script>

<style scoped>
.projects-page {
  padding: 48px 24px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
}

.project-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.project-description {
  font-size: 16px;
  line-height: 1.5;
}

.project-tags {
  flex-wrap: wrap;
}

@media (max-width: 480px) {
  .projects-page {
    padding: 32px 16px;
  }

  .page-title {
    font-size: 24px;
  }

  .project-title {
    font-size: 20px;
  }

  .project-description {
    font-size: 14px;
  }
}
</style>
