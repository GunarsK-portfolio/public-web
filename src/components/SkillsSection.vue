<template>
  <n-space
    id="skills"
    vertical
    :size="32"
    style="padding: 80px 20px; max-width: 900px; margin: 0 auto"
  >
    <h2 style="font-size: 36px; font-weight: 700; margin: 0">Skills & Technologies</h2>

    <n-divider />

    <n-space v-if="loading" justify="center">
      <n-spin size="large" />
    </n-space>

    <div v-for="category in skillCategories" v-else :key="category.name">
      <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 16px">
        {{ category.name }}
      </h3>
      <n-space :size="12" style="margin-bottom: 32px">
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
    // Transform the data to match the component's expected format
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
