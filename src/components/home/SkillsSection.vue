<template>
  <n-space id="skills" vertical :size="32" class="hero-section-wrapper">
    <h2 class="hero-title">Skills & Technologies</h2>

    <n-divider />

    <n-space v-if="loading" justify="center">
      <n-spin size="large" />
    </n-space>

    <transition-group name="fade-up" tag="div">
      <div v-if="!loading">
        <div v-for="category in skillCategories" :key="category.name" class="skills-category">
          <h3 class="skills-category-title">{{ category.name }}</h3>
          <n-space :size="12" class="skills-tags">
            <n-tag
              v-for="skill in category.skills"
              :key="skill"
              :type="category.type"
              size="large"
              round
            >
              {{ skill }}
            </n-tag>
          </n-space>
        </div>
      </div>
    </transition-group>
  </n-space>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { NSpace, NDivider, NTag, NSpin } from 'naive-ui'
import api from '../../services/api'
import { useErrorHandler } from '../../composables/useErrorHandler'
import { getCategoryTagType, getCategoryOrder } from '../../constants/skills'

const { handleError } = useErrorHandler()

const skills = ref([])
const loading = ref(true)

// Group skills by category and sort by category order
const skillCategories = computed(() => {
  const categories = {}

  skills.value.forEach((skill) => {
    if (!categories[skill.type]) {
      categories[skill.type] = {
        name: skill.type,
        type: getCategoryTagType(skill.type),
        order: getCategoryOrder(skill.type),
        skills: [],
      }
    }
    categories[skill.type].skills.push(skill.skill)
  })

  // Sort categories by their order property
  return Object.values(categories).sort((a, b) => a.order - b.order)
})

const loadSkills = async () => {
  try {
    const response = await api.getSkills()
    skills.value = response.data
  } catch (error) {
    handleError(error, { retryFn: loadSkills })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadSkills()
})
</script>

<style scoped>
.skills-category {
  margin-bottom: 32px;
}

.skills-category-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
}

.skills-tags {
  flex-wrap: wrap;
}
</style>
