<template>
  <n-space
    id="projects"
    vertical
    :size="32"
    style="padding: 80px 20px; max-width: 900px; margin: 0 auto"
  >
    <h2 style="font-size: 36px; font-weight: 700; margin: 0">Portfolio Projects</h2>

    <n-divider />

    <n-grid :cols="1" :y-gap="24">
      <n-grid-item>
        <n-card hoverable>
          <n-space vertical :size="16">
            <n-space justify="space-between" align="center">
              <h3 style="font-size: 24px; font-weight: 600; margin: 0">
                Portfolio Microservices Platform
              </h3>
              <n-space :size="8">
                <n-button text type="primary" tag="a" href="#" target="_blank"> GitHub </n-button>
              </n-space>
            </n-space>

            <n-text>
              A full-stack portfolio application demonstrating microservices architecture, message
              queues, and modern DevOps practices.
            </n-text>

            <n-space :size="8" style="flex-wrap: wrap">
              <n-tag type="info" size="small">Vue 3</n-tag>
              <n-tag type="success" size="small">Go</n-tag>
              <n-tag type="warning" size="small">RabbitMQ</n-tag>
              <n-tag type="error" size="small">Docker</n-tag>
              <n-tag type="info" size="small">PostgreSQL</n-tag>
              <n-tag type="success" size="small">AWS</n-tag>
            </n-space>

            <n-button type="primary" @click="$router.push('/project')"> View Details → </n-button>
          </n-space>
        </n-card>
      </n-grid-item>

      <n-grid-item>
        <n-card hoverable>
          <n-space vertical :size="16">
            <h3 style="font-size: 24px; font-weight: 600; margin: 0">Previous Work Experience</h3>

            <n-text>
              Highlights and learnings from closed-source enterprise projects in medical imaging,
              real-time systems, and web applications.
            </n-text>

            <n-space :size="8" style="flex-wrap: wrap">
              <n-tag type="default" size="small">React</n-tag>
              <n-tag type="default" size="small">C++</n-tag>
              <n-tag type="default" size="small">Python</n-tag>
              <n-tag type="default" size="small">Real-time Systems</n-tag>
            </n-space>

            <n-button @click="$router.push('/previous-work')">Read More →</n-button>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>
  </n-space>
</template>

<script setup>
import { NSpace, NDivider, NGrid, NGridItem, NCard, NText, NTag, NButton } from 'naive-ui'
</script>
