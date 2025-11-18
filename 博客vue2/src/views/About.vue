<template>
  <div class="about-page">
    <h1 class="page-title">关于海林小迷弟</h1>

    <div class="about-content">
      <el-card class="about-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon><User /></el-icon>
            <span>个人简介</span>
          </div>
        </template>
        <p>大家好，我是海林小迷弟，一名热爱编程和创作的开发者。我专注于前端开发、JAVA开发以及各类工具软件的制作。</p>
      </el-card>

      <el-card class="about-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon><Monitor /></el-icon>
            <span>技术栈</span>
          </div>
        </template>
        <div class="tech-list">
          <el-tag
            v-for="tech in techStack"
            :key="tech"
            type="primary"
            effect="dark"
            size="large"
            class="tech-tag"
          >
            {{ tech }}
          </el-tag>
        </div>
      </el-card>

      <el-card class="about-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon><TrophyBase /></el-icon>
            <span>项目经历</span>
          </div>
        </template>
        <el-timeline>
          <el-timeline-item
            v-for="project in projects"
            :key="project.id"
            :timestamp="project.date"
            placement="top"
          >
            <el-card>
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>

      <el-card class="about-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon><Star /></el-icon>
            <span>兴趣爱好</span>
          </div>
        </template>
        <p>除了编程，我还喜欢音乐、阅读和旅行。我相信生活明明，万物可爱。</p>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { User, Monitor, TrophyBase, Star } from '@element-plus/icons-vue'

const techStack = ref([
  'HTML5',
  'CSS3',
  'JavaScript',
  'Vue.js',
  'Java',
  'Python',
  'Git'
])

const projects = ref([
  {
    id: 1,
    title: 'HailinMusicPlayer',
    description: '一款基于Java开发的音乐播放器，支持多种音频格式，具有美观的界面和丰富的功能。',
    date: '2025-09'
  },
  {
    id: 2,
    title: '海林影院网站',
    description: '在线视频播放平台，提供高清视频播放和管理功能。',
    date: '2025-08'
  },
  {
    id: 3,
    title: '个人博客系统',
    description: '采用响应式设计的个人博客网站，记录技术学习和生活点滴。',
    date: '2025-11'
  }
])
</script>

<style scoped>
.about-page {
  max-width: 900px;
  margin: 0 auto;
  animation: fadeIn 0.6s ease;
}

.page-title {
  font-size: 36px;
  margin-bottom: 30px;
  text-align: center;
  color: #333;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.about-card {
  border-radius: 15px;
  animation: fadeIn 0.6s ease;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: bold;
}

.about-card p {
  font-size: 16px;
  line-height: 1.8;
  color: #666;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.tech-tag {
  cursor: pointer;
  transition: all 0.3s ease;
}

.tech-tag:hover {
  transform: scale(1.1);
}

.el-timeline :deep(.el-timeline-item__wrapper) {
  padding-left: 30px;
}

.el-timeline :deep(.el-card) {
  border-radius: 10px;
}

.el-timeline h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #667eea;
}

.el-timeline p {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 28px;
  }
}
</style>
