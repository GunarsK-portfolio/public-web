<template>
  <div class="home-page">
    <section class="home-section">
      <HeroSection />
    </section>
    <section class="home-section home-section-alt">
      <ResumeSection />
    </section>
    <section class="home-section">
      <SkillsSection />
    </section>
    <section class="home-section home-section-alt">
      <ProjectsSection />
    </section>
    <section class="home-section">
      <MiniaturesSection />
    </section>
    <section class="home-section home-section-alt">
      <ContactSection />
    </section>
  </div>
</template>

<script setup>
import HeroSection from '../components/home/HeroSection.vue'
import ResumeSection from '../components/home/ResumeSection.vue'
import SkillsSection from '../components/home/SkillsSection.vue'
import ProjectsSection from '../components/home/ProjectsSection.vue'
import MiniaturesSection from '../components/home/MiniaturesSection.vue'
import ContactSection from '../components/home/ContactSection.vue'
</script>

<style scoped>
.home-page {
  width: 100%;
}

.home-section {
  width: 100%;
  position: relative;
}

.home-section-alt {
  background-color: rgba(0, 0, 0, 0.02);
}

/* Dark mode support */
html.dark .home-section-alt {
  background-color: rgba(255, 255, 255, 0.02);
}
</style>
