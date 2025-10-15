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
import { ref, onMounted } from 'vue'
import { NSpace, NDivider, NTag, NSpin } from 'naive-ui'
import api from '../services/api'
import { useErrorHandler } from '../composables/useErrorHandler'

const { handleError } = useErrorHandler()

const skillCategories = ref([])
const loading = ref(true)

const loadSkills = async () => {
  try {
    const response = await api.getSkills()
    // Transform API data to component format
    skillCategories.value = response.data.map((category) => ({
      name: category.name,
      type: category.type,
      skills: category.skills.map((skill) => skill.name),
    }))
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
