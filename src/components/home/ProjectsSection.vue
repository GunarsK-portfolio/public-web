<template>
  <n-space id="projects" vertical :size="32" class="hero-section-wrapper">
    <h2 class="hero-title">Portfolio Projects</h2>

    <n-divider />

    <n-space v-if="loading" justify="center" role="status" aria-live="polite">
      <n-spin size="large" aria-label="Loading projects" />
    </n-space>

    <transition-group name="fade-up" tag="div">
      <div v-if="!loading" class="projects-grid-wrapper">
        <n-grid :x-gap="24" :y-gap="24" :cols="1">
          <n-grid-item v-for="project in featuredProjects" :key="project.id">
            <n-card hoverable class="card-hoverable">
              <n-space vertical :size="16">
                <n-space justify="space-between" align="center">
                  <h3 class="project-title">{{ project.title }}</h3>
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

                <n-button type="primary" @click="$router.push(`/projects/${project.id}`)">
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
import api from '../../services/api'
import { useErrorHandler } from '../../composables/useErrorHandler'
import { createDataLoader } from '../../utils/crudHelpers'
import { getCategoryTagType } from '../../constants/skills'

const { handleError } = useErrorHandler()
const projects = ref([])
const loading = ref(true)

const featuredProjects = computed(() => projects.value.filter((p) => p.featured))

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
  .project-title {
    font-size: 20px;
  }

  .project-description {
    font-size: 14px;
  }
}
</style>
