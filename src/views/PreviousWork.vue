<template>
  <n-space vertical size="large" class="section-wrapper">
    <n-button text @click="$router.push('/')">
      <template #icon>
        <n-icon><ArrowBackOutline /></n-icon>
      </template>
      Back to Home
    </n-button>

    <n-page-header
      title="Previous Work Experience"
      subtitle="Professional projects from my career (NDA-protected)"
    ></n-page-header>

    <n-alert type="info" title="Confidentiality Notice">
      Due to NDAs and proprietary nature of previous work, I cannot share source code or specific
      business details. However, I can discuss the technical challenges, architecture decisions, and
      technologies used.
    </n-alert>

    <n-space v-if="loading" justify="center">
      <n-spin size="large" />
    </n-space>

    <transition-group name="fade-up" tag="div">
      <div v-if="!loading" class="project-wrapper">
        <n-card
          v-for="project in projects"
          :key="project.id"
          :title="project.title"
          hoverable
          class="project-card"
        >
          <template #header-extra>
            <n-space>
              <n-tag :bordered="false" type="info">{{ project.period }}</n-tag>
              <n-tag :bordered="false" type="success">{{ project.role }}</n-tag>
            </n-space>
          </template>

          <n-space vertical size="medium" class="project-content">
            <div>
              <n-text strong>Company:</n-text>
              <n-text> {{ project.company }}</n-text>
            </div>

            <div>
              <n-text strong>Industry:</n-text>
              <n-text> {{ project.industry }}</n-text>
            </div>

            <n-divider />

            <div>
              <n-text strong class="section-title">Project Overview:</n-text>
              <n-text>{{ project.description }}</n-text>
            </div>

            <n-divider />

            <div>
              <n-text strong class="section-title">Key Responsibilities:</n-text>
              <n-list>
                <n-list-item v-for="(resp, index) in project.responsibilities" :key="index">
                  <template #prefix>
                    <n-icon><CheckmarkOutline /></n-icon>
                  </template>
                  {{ resp }}
                </n-list-item>
              </n-list>
            </div>

            <n-divider />

            <div>
              <n-text strong class="section-title">Technical Achievements:</n-text>
              <n-list>
                <n-list-item v-for="(achievement, index) in project.achievements" :key="index">
                  <template #prefix>
                    <n-icon color="#18a058"><TrophyOutline /></n-icon>
                  </template>
                  {{ achievement }}
                </n-list-item>
              </n-list>
            </div>

            <n-divider />

            <div>
              <n-text strong class="section-title">Tech Stack:</n-text>
              <n-space>
                <n-tag
                  v-for="tech in project.technologies"
                  :key="tech"
                  :bordered="false"
                  :type="getTagType(tech)"
                >
                  {{ tech }}
                </n-tag>
              </n-space>
            </div>

            <n-divider v-if="project.teamSize || project.methodology" />

            <n-grid v-if="project.teamSize || project.methodology" :cols="2" :x-gap="16">
              <n-grid-item v-if="project.teamSize">
                <div>
                  <n-text strong>Team Size:</n-text>
                  <n-text> {{ project.teamSize }}</n-text>
                </div>
              </n-grid-item>
              <n-grid-item v-if="project.methodology">
                <div>
                  <n-text strong>Methodology:</n-text>
                  <n-text> {{ project.methodology }}</n-text>
                </div>
              </n-grid-item>
            </n-grid>
          </n-space>
        </n-card>
      </div>
    </transition-group>
  </n-space>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  NSpace,
  NSpin,
  NPageHeader,
  NButton,
  NIcon,
  NAlert,
  NCard,
  NTag,
  NText,
  NDivider,
  NList,
  NListItem,
  NGrid,
  NGridItem,
} from 'naive-ui'
import { ArrowBackOutline, CheckmarkOutline, TrophyOutline } from '@vicons/ionicons5'

const loading = ref(true)

const projects = ref([
  {
    id: 1,
    title: 'Enterprise Financial Management System',
    company: 'FinTech Corp',
    industry: 'Financial Services',
    role: 'Senior Backend Developer',
    period: '2022 - 2024',
    description:
      'Built a scalable financial management platform handling millions of transactions daily for enterprise clients. The system provided real-time reporting, automated reconciliation, and compliance monitoring.',
    responsibilities: [
      'Designed and implemented core transaction processing engine',
      'Developed RESTful APIs consumed by web and mobile applications',
      'Optimized database queries reducing response times by 60%',
      'Implemented data encryption and security compliance (PCI-DSS)',
      'Mentored junior developers and conducted code reviews',
    ],
    achievements: [
      'Reduced system latency from 2s to 300ms through caching and query optimization',
      'Implemented automated testing achieving 85% code coverage',
      'Successfully migrated 500K+ users with zero downtime',
      'Designed fault-tolerant architecture with 99.9% uptime',
    ],
    technologies: [
      'Go',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Kubernetes',
      'AWS',
      'RabbitMQ',
      'gRPC',
      'Prometheus',
      'Grafana',
    ],
    teamSize: '12 developers',
    methodology: 'Agile/Scrum',
  },
  {
    id: 2,
    title: 'IoT Device Management Platform',
    company: 'SmartHome Inc',
    industry: 'IoT / Smart Home',
    role: 'Full-Stack Developer',
    period: '2020 - 2022',
    description:
      'Developed a cloud platform for managing and monitoring IoT devices in smart homes. System handled device provisioning, real-time telemetry, firmware updates, and user dashboards.',
    responsibilities: [
      'Built backend services for device communication using MQTT protocol',
      'Developed real-time dashboard with WebSocket connections',
      'Implemented device firmware update mechanism (OTA)',
      'Created admin panel for customer support and device management',
      'Integrated third-party services (weather APIs, voice assistants)',
    ],
    achievements: [
      'Scaled system to support 100K+ concurrent device connections',
      'Reduced firmware update failures from 15% to <1%',
      'Built automated device provisioning reducing manual work by 80%',
      'Implemented analytics pipeline processing 50M+ events daily',
    ],
    technologies: [
      'Node.js',
      'Express',
      'MongoDB',
      'MQTT',
      'WebSocket',
      'React',
      'Docker',
      'AWS IoT Core',
      'DynamoDB',
      'Lambda',
    ],
    teamSize: '8 developers',
    methodology: 'Agile/Kanban',
  },
  {
    id: 3,
    title: 'E-Commerce Platform Modernization',
    company: 'RetailMart',
    industry: 'E-Commerce / Retail',
    role: 'Backend Developer',
    period: '2018 - 2020',
    description:
      'Led backend modernization effort to migrate monolithic e-commerce platform to microservices architecture. Focused on improving scalability, maintainability, and deployment speed.',
    responsibilities: [
      'Decomposed monolith into microservices (order, inventory, payment)',
      'Implemented event-driven architecture using message queues',
      'Built CI/CD pipelines for automated testing and deployment',
      'Migrated legacy database schema to new normalized structure',
      'Documented APIs using OpenAPI/Swagger specification',
    ],
    achievements: [
      'Reduced deployment time from 2 hours to 15 minutes',
      'Improved order processing throughput by 3x',
      'Achieved independent service deployment reducing coupling',
      'Implemented comprehensive monitoring and alerting',
    ],
    technologies: [
      'Python',
      'Django',
      'Flask',
      'PostgreSQL',
      'RabbitMQ',
      'Docker',
      'Jenkins',
      'Celery',
      'Redis',
      'Elasticsearch',
    ],
    teamSize: '15 developers',
    methodology: 'Agile/Scrum',
  },
])

const getTagType = (tech) => {
  const backends = ['Go', 'Node.js', 'Python', 'Django', 'Flask', 'Express']
  const databases = ['PostgreSQL', 'MongoDB', 'Redis', 'DynamoDB', 'Elasticsearch']
  const devops = ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'AWS IoT Core', 'Lambda']

  if (backends.includes(tech)) return 'success'
  if (databases.includes(tech)) return 'warning'
  if (devops.includes(tech)) return 'info'
  return 'default'
}

onMounted(async () => {
  loading.value = false
})
</script>

<style scoped>
.project-card {
  margin-bottom: 24px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.project-content .section-title {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}
</style>
