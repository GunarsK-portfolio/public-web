<template>
  <n-space
    id="skills"
    vertical
    :size="32"
    style="padding: 80px 20px; max-width: 900px; margin: 0 auto"
  >
    <h2 style="font-size: 36px; font-weight: 700; margin: 0">Skills & Technologies</h2>

    <n-divider />

    <div v-for="category in skillCategories" :key="category.name">
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
import { ref } from 'vue'
import { NSpace, NDivider, NTag } from 'naive-ui'

const skillCategories = ref([
  {
    name: 'Frontend',
    type: 'info',
    skills: ['Vue 3', 'React', 'TypeScript', 'JavaScript', 'Naive UI', 'HTML/CSS', 'Vite', 'Pinia'],
  },
  {
    name: 'Backend',
    type: 'success',
    skills: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'REST APIs', 'GraphQL', 'JWT'],
  },
  {
    name: 'DevOps & Tools',
    type: 'warning',
    skills: ['Docker', 'AWS', 'RabbitMQ', 'Git', 'GitHub Actions', 'Linux', 'Nginx', 'Traefik'],
  },
  {
    name: 'Practices',
    type: 'default',
    skills: ['Microservices', 'CI/CD', 'Agile', 'Code Review', 'Testing', 'Documentation'],
  },
])
</script>
