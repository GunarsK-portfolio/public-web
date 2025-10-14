<template>
  <n-space
    vertical
    align="center"
    :size="32"
    style="padding: 0 20px 80px; min-height: calc(100vh - 64px); justify-content: center"
  >
    <n-avatar
      round
      :size="150"
      src="/profile-photo.jpg"
      fallback-src="https://via.placeholder.com/150"
    />

    <n-space vertical align="center" :size="12">
      <h1 style="font-size: 48px; font-weight: 700; margin: 0">Your Name</h1>
      <h2 style="font-size: 24px; font-weight: 400; margin: 0; opacity: 0.8">
        Full Stack Developer
      </h2>
    </n-space>

    <n-text style="max-width: 600px; text-align: center; font-size: 18px; line-height: 1.6">
      Building scalable web applications with modern technologies. Passionate about clean code,
      microservices architecture, and painting miniatures.
    </n-text>

    <n-space :size="16">
      <n-button type="primary" size="large" @click="scrollTo('resume')"> Resume </n-button>
      <n-button size="large" @click="scrollTo('skills')"> Skills </n-button>
      <n-button size="large" @click="scrollTo('projects')"> Projects </n-button>
      <n-button size="large" @click="scrollTo('miniatures')"> Miniatures </n-button>
    </n-space>
  </n-space>
</template>

<script setup>
import { NSpace, NAvatar, NText, NButton } from 'naive-ui'

const scrollTo = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
