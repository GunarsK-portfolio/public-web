<template>
  <n-space vertical size="large" style="padding: 24px; max-width: 1200px; margin: 0 auto">
    <n-button text @click="$router.push('/')">
      <template #icon>
        <n-icon><ArrowBackOutline /></n-icon>
      </template>
      Back to Home
    </n-button>

    <n-page-header
      title="Portfolio Microservices Platform"
      subtitle="Full-stack Go microservices with RabbitMQ"
    >
      <template #extra>
        <n-space>
          <n-button tag="a" href="https://github.com/yourusername/portfolio" target="_blank">
            <template #icon>
              <n-icon><LogoGithub /></n-icon>
            </template>
            View on GitHub
          </n-button>
        </n-space>
      </template>
    </n-page-header>

    <n-card title="Overview">
      <n-text>
        A production-ready microservices platform built with Go, demonstrating modern backend
        architecture patterns including async messaging, service discovery, API gateway, and
        containerized deployment.
      </n-text>
    </n-card>

    <n-card title="Architecture">
      <n-space vertical size="large">
        <n-text depth="3">
          The system consists of multiple independent services communicating via RabbitMQ message
          broker, fronted by an API gateway for external access.
        </n-text>

        <n-divider />

        <n-alert type="info" title="Architecture Diagram">
          <n-text depth="3">
            TODO: Add architecture diagram here (can be Mermaid.js or image)
          </n-text>
        </n-alert>

        <n-divider />

        <n-space vertical size="medium">
          <n-text strong style="font-size: 18px">Key Components</n-text>

          <n-collapse>
            <n-collapse-item title="API Gateway" name="1">
              <n-space vertical size="small">
                <n-text> <n-text strong>Technology:</n-text> Go with Gin framework </n-text>
                <n-text>
                  <n-text strong>Responsibilities:</n-text> Request routing, authentication, rate
                  limiting, response aggregation
                </n-text>
                <n-text> <n-text strong>Port:</n-text> 8080 </n-text>
              </n-space>
            </n-collapse-item>

            <n-collapse-item title="Auth Service" name="2">
              <n-space vertical size="small">
                <n-text> <n-text strong>Technology:</n-text> Go with JWT </n-text>
                <n-text>
                  <n-text strong>Responsibilities:</n-text> User authentication, token generation,
                  session management
                </n-text>
                <n-text> <n-text strong>Database:</n-text> PostgreSQL </n-text>
              </n-space>
            </n-collapse-item>

            <n-collapse-item title="Portfolio Service" name="3">
              <n-space vertical size="small">
                <n-text> <n-text strong>Technology:</n-text> Go with GORM </n-text>
                <n-text>
                  <n-text strong>Responsibilities:</n-text> Manage projects, experience,
                  certifications, skills
                </n-text>
                <n-text> <n-text strong>Database:</n-text> PostgreSQL </n-text>
              </n-space>
            </n-collapse-item>

            <n-collapse-item title="Miniatures Service" name="4">
              <n-space vertical size="small">
                <n-text> <n-text strong>Technology:</n-text> Go with image processing </n-text>
                <n-text>
                  <n-text strong>Responsibilities:</n-text> Manage miniature gallery, themes, image
                  uploads
                </n-text>
                <n-text> <n-text strong>Storage:</n-text> S3-compatible object storage </n-text>
              </n-space>
            </n-collapse-item>

            <n-collapse-item title="Contact Service" name="5">
              <n-space vertical size="small">
                <n-text> <n-text strong>Technology:</n-text> Go with RabbitMQ consumer </n-text>
                <n-text>
                  <n-text strong>Responsibilities:</n-text> Process contact form submissions, send
                  email notifications
                </n-text>
                <n-text> <n-text strong>Integration:</n-text> SMTP for email delivery </n-text>
              </n-space>
            </n-collapse-item>

            <n-collapse-item title="RabbitMQ Message Broker" name="6">
              <n-space vertical size="small">
                <n-text>
                  <n-text strong>Purpose:</n-text> Async communication between services
                </n-text>
                <n-text>
                  <n-text strong>Use Cases:</n-text> Contact form processing, event notifications,
                  cache invalidation
                </n-text>
                <n-text> <n-text strong>Patterns:</n-text> Pub/Sub, Work Queues </n-text>
              </n-space>
            </n-collapse-item>
          </n-collapse>
        </n-space>
      </n-space>
    </n-card>

    <n-card title="Tech Stack">
      <n-grid :x-gap="16" :y-gap="16" :cols="1" :m="2">
        <n-grid-item>
          <n-space vertical size="medium">
            <n-text strong>Backend</n-text>
            <n-space>
              <n-tag type="success">Go 1.21+</n-tag>
              <n-tag type="success">Gin</n-tag>
              <n-tag type="success">GORM</n-tag>
              <n-tag type="success">JWT</n-tag>
            </n-space>
          </n-space>
        </n-grid-item>

        <n-grid-item>
          <n-space vertical size="medium">
            <n-text strong>Frontend</n-text>
            <n-space>
              <n-tag type="info">Vue 3</n-tag>
              <n-tag type="info">Naive UI</n-tag>
              <n-tag type="info">Vite</n-tag>
            </n-space>
          </n-space>
        </n-grid-item>

        <n-grid-item>
          <n-space vertical size="medium">
            <n-text strong>Databases</n-text>
            <n-space>
              <n-tag type="warning">PostgreSQL</n-tag>
              <n-tag type="warning">Redis</n-tag>
            </n-space>
          </n-space>
        </n-grid-item>

        <n-grid-item>
          <n-space vertical size="medium">
            <n-text strong>Message Broker</n-text>
            <n-space>
              <n-tag type="error">RabbitMQ</n-tag>
            </n-space>
          </n-space>
        </n-grid-item>

        <n-grid-item>
          <n-space vertical size="medium">
            <n-text strong>DevOps</n-text>
            <n-space>
              <n-tag>Docker</n-tag>
              <n-tag>Docker Compose</n-tag>
              <n-tag>GitHub Actions</n-tag>
              <n-tag>AWS</n-tag>
            </n-space>
          </n-space>
        </n-grid-item>

        <n-grid-item>
          <n-space vertical size="medium">
            <n-text strong>Tools</n-text>
            <n-space>
              <n-tag>Make</n-tag>
              <n-tag>golangci-lint</n-tag>
              <n-tag>Swagger</n-tag>
            </n-space>
          </n-space>
        </n-grid-item>
      </n-grid>
    </n-card>

    <n-card title="Key Features">
      <n-list>
        <n-list-item>
          <template #prefix>
            <n-icon color="#18a058"><CheckmarkCircleOutline /></n-icon>
          </template>
          <n-text strong>Microservices Architecture</n-text> - Independent services with clear
          boundaries
        </n-list-item>
        <n-list-item>
          <template #prefix>
            <n-icon color="#18a058"><CheckmarkCircleOutline /></n-icon>
          </template>
          <n-text strong>Async Messaging</n-text> - RabbitMQ for decoupled communication
        </n-list-item>
        <n-list-item>
          <template #prefix>
            <n-icon color="#18a058"><CheckmarkCircleOutline /></n-icon>
          </template>
          <n-text strong>API Gateway Pattern</n-text> - Centralized entry point with auth
        </n-list-item>
        <n-list-item>
          <template #prefix>
            <n-icon color="#18a058"><CheckmarkCircleOutline /></n-icon>
          </template>
          <n-text strong>Docker Containerization</n-text> - All services containerized for
          portability
        </n-list-item>
        <n-list-item>
          <template #prefix>
            <n-icon color="#18a058"><CheckmarkCircleOutline /></n-icon>
          </template>
          <n-text strong>CI/CD Pipeline</n-text> - Automated testing and deployment
        </n-list-item>
        <n-list-item>
          <template #prefix>
            <n-icon color="#18a058"><CheckmarkCircleOutline /></n-icon>
          </template>
          <n-text strong>Database Migrations</n-text> - Version-controlled schema changes
        </n-list-item>
        <n-list-item>
          <template #prefix>
            <n-icon color="#18a058"><CheckmarkCircleOutline /></n-icon>
          </template>
          <n-text strong>Health Checks</n-text> - Service monitoring and readiness probes
        </n-list-item>
        <n-list-item>
          <template #prefix>
            <n-icon color="#18a058"><CheckmarkCircleOutline /></n-icon>
          </template>
          <n-text strong>Structured Logging</n-text> - Centralized logging with correlation IDs
        </n-list-item>
      </n-list>
    </n-card>

    <n-card title="Challenges & Solutions">
      <n-space vertical size="medium">
        <div>
          <n-text strong>Challenge:</n-text>
          <n-text> Service-to-service communication reliability</n-text>
          <br />
          <n-text depth="3">
            Solution: Implemented retry logic and circuit breakers for resilient communication
          </n-text>
        </div>

        <n-divider />

        <div>
          <n-text strong>Challenge:</n-text>
          <n-text> Message processing failures</n-text>
          <br />
          <n-text depth="3">
            Solution: Dead letter queues and idempotent message handlers for guaranteed processing
          </n-text>
        </div>

        <n-divider />

        <div>
          <n-text strong>Challenge:</n-text>
          <n-text> Database connection pooling across services</n-text>
          <br />
          <n-text depth="3">
            Solution: Configured GORM connection pools with appropriate limits and timeouts
          </n-text>
        </div>

        <n-divider />

        <div>
          <n-text strong>Challenge:</n-text>
          <n-text> Container orchestration in development</n-text>
          <br />
          <n-text depth="3">
            Solution: Docker Compose with health checks and dependency ordering
          </n-text>
        </div>
      </n-space>
    </n-card>
  </n-space>
</template>

<script setup>
import {
  NSpace,
  NPageHeader,
  NButton,
  NIcon,
  NCard,
  NText,
  NDivider,
  NAlert,
  NCollapse,
  NCollapseItem,
  NGrid,
  NGridItem,
  NTag,
  NList,
  NListItem,
} from 'naive-ui'
import { ArrowBackOutline, LogoGithub, CheckmarkCircleOutline } from '@vicons/ionicons5'
</script>
