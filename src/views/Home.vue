<template>
  <div class="home">
    <!-- 公告栏 -->
    <el-alert
      title="最新消息"
      type="info"
      :closable="false"
      class="announcement"
    >
      <template #default>
        Hailin正在制作超级好玩的大型3D游戏，已制作了好多了哦啦，预测8月7号发布，你会出现在游戏中吗？快来加入我们吧！
      </template>
    </el-alert>

    <!-- 横幅区域 -->
    <div class="hero-banner-section">
      <!-- 左侧轮播图 - 使用 Naive UI -->
      <div class="hero-carousel-wrapper">
        <n-carousel autoplay :interval="4000" show-arrow>
          <img
            v-for="(banner, index) in carouselImages"
            :key="index"
            class="carousel-img"
            :src="banner.src"
            :alt="banner.alt"
          />
        </n-carousel>
      </div>

      <!-- 右侧分类卡片 -->
      <div class="category-cards-wrapper">
        <div class="category-card card-blue">
          <h3>编程</h3>
          <p>Programming</p>
        </div>
        <div class="category-card card-orange">
          <h3>人生</h3>
          <p>Life</p>
        </div>
        <div class="category-card card-green">
          <h3>生活</h3>
          <p>Living</p>
        </div>
      </div>
    </div>

    <el-row :gutter="30" class="main-layout">
      <!-- 文章列表 -->
      <el-col :xs="24" :lg="16">
        <div class="articles-section">
          <!-- 标签筛选 -->
          <div class="tags-filter">
            <el-tag
              v-for="tag in tags"
              :key="tag"
              :type="activeTag === tag ? 'primary' : 'info'"
              :effect="activeTag === tag ? 'dark' : 'plain'"
              @click="activeTag = tag"
              class="tag-item"
            >
              {{ tag }}
            </el-tag>
          </div>

          <!-- 文章网格 -->
          <el-row :gutter="20" class="articles-grid">
            <el-col
              v-for="article in articles"
              :key="article.id"
              :xs="12"
              :sm="12"
              :md="12"
            >
              <el-card class="article-card" shadow="hover" @click="goToArticle(article.id)">
                <div class="article-image-wrapper">
                  <img :src="article.image" class="article-image" />
                </div>
                <div class="article-content">
                  <div class="article-badges">
                    <span class="badge">{{ article.badge1 }}</span>
                    <span class="badge">{{ article.badge2 }}</span>
                  </div>
                  <h3 class="article-title">{{ article.title }}</h3>
                  <div class="article-footer">
                    <div class="article-tags">
                      <span v-for="tag in article.tags" :key="tag" class="tag"># {{ tag }}</span>
                    </div>
                    <span class="article-date">{{ article.date }}</span>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>

          <!-- 分页 -->
          <el-pagination
            background
            class="pagination"
            layout="prev, pager, next"
            :total="50"
            :page-size="4"
          />
        </div>
      </el-col>

      <!-- 侧边栏 -->
      <el-col :xs="24" :lg="8">
        <div class="sidebar">
          <!-- 个人信息卡片 -->
          <div class="profile-card">
            <div class="profile-motto">吃饱了才有力气干活</div>
            <div class="profile-avatar-wrapper">
              <div class="profile-avatar">
                <img src="https://tc.hailin.ip-ddns.com/file/OSS/1759469067787_avatar.jpg" alt="头像" class="avatar-image" />
                <div class="avatar-badge">😜</div>
              </div>
            </div>
            <div class="profile-info">
              <h2 class="profile-name">海林小盆友</h2>
              <p class="profile-subtitle">小盆友</p>
            </div>
            <div class="profile-social">
              <a href="https://github.com" target="_blank" class="social-icon">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  <path d="M512 12.64c-282.752 0-512 229.216-512 512 0 226.208 146.72 418.144 350.144 485.824 25.6 4.736 35.008-11.104 35.008-24.64 0-12.192-0.48-52.544-0.704-95.328-142.464 30.976-172.512-60.416-172.512-60.416-23.296-59.168-56.832-74.912-56.832-74.912-46.464-31.776 3.52-31.136 3.52-31.136 51.392 3.616 78.464 52.768 78.464 52.768 45.664 78.272 119.776 55.648 148.992 42.56 4.576-33.088 17.856-55.68 32.512-68.48-113.728-12.928-233.28-56.864-233.28-253.024 0-55.904 20-101.568 52.768-137.44-5.312-12.896-22.848-64.96 4.96-135.488 0 0 43.008-13.76 140.832 52.48 40.832-11.36 84.64-17.024 128.16-17.248 43.488 0.192 87.328 5.888 128.256 17.248 97.728-66.24 140.64-52.48 140.64-52.48 27.872 70.528 10.336 122.592 5.024 135.488 32.832 35.84 52.704 81.536 52.704 137.44 0 196.64-119.776 239.936-233.792 252.64 18.368 15.904 34.72 47.04 34.72 94.816 0 68.512-0.608 123.648-0.608 140.512 0 13.632 9.216 29.6 35.168 24.576 203.328-67.776 349.856-259.616 349.856-485.76 0-282.784-229.248-512-512-512z" fill="currentColor"/>
                </svg>
              </a>
              <a href="mailto:your@email.com" class="social-icon">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  <path d="M874.666667 181.333333H149.333333c-46.933333 0-85.333333 38.4-85.333333 85.333334v490.666666c0 46.933333 38.4 85.333333 85.333333 85.333334h725.333334c46.933333 0 85.333333-38.4 85.333333-85.333334V266.666667c0-46.933333-38.4-85.333333-85.333333-85.333334z m0 170.666667L512 554.666667 149.333333 352V266.666667l362.666667 202.666666 362.666667-202.666666v85.333333z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- 翻转卡片 -->
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <img src="https://tc.hailin.ip-ddns.com/file/blog/1761988080402_背面.png" alt="正面图片" class="flip-image" />
              </div>
              <div class="flip-card-back">
                <img src="https://tc.hailin.ip-ddns.com/file/blog/1761988195463_正面.png" alt="背面图片" class="flip-image" />
              </div>
            </div>
          </div>

          <!-- 统计卡片 -->
          <el-card class="sidebar-card stats-card" shadow="hover">
            <div class="stat-item">
              <el-icon class="stat-icon"><Document /></el-icon>
              <span class="stat-label">博文数</span>
              <span class="stat-value">4</span>
            </div>
            <div class="stat-item">
              <el-icon class="stat-icon"><Reading /></el-icon>
              <span class="stat-label">笔记分类</span>
              <span class="stat-value">8</span>
            </div>
            <div class="stat-item">
              <el-icon class="stat-icon"><User /></el-icon>
              <span class="stat-label">总访客数</span>
              <span class="stat-value">2.6k</span>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NCarousel } from 'naive-ui'
import { User,  Document, Reading } from '@element-plus/icons-vue'

const router = useRouter()

// ========== 轮播图配置 ==========
// 在这里添加你的轮播图片，可以添加多张
const carouselImages = ref([
  {
    src: 'https://tc.hailin.ip-ddns.com/file/blog/1761987131084_html5.png',
    alt: '轮播图1'
  },
  {
    src: 'https://tc.hailin.ip-ddns.com/file/blog/1761987125357_vue_element.png', // 可以添加更多图片
    alt: '轮播图2'
  },
  {
    src: 'https://tc.hailin.ip-ddns.com/file/blog/1761987261564_N.png',
    alt: '轮播图3'
  }
])

// ========== 标签筛选 ==========
const activeTag = ref('全部')
const tags = ['全部', '前端开发', '大学生活', '更多']

// ========== 路由跳转 ==========
const goToArticle = (id) => {
  router.push(`/article/${id}`)
}

const articles = ref([
  {
    id: 1,
    title: '计算机是如何工作的',
    badge1: '大学生涯',
    badge2: '最新',
    tags: ['教程', 'JAVAEE'],
    date: '2025-9-17',
    image: 'https://tc.hailin.ip-ddns.com/file/blog/1758971733012_微信图片_20250917211804.jpg'
  },
  {
    id: 2,
    title: '独自闯，能闯万里！全新「海林影视」设计在线',
    badge1: '生活',
    badge2: '推荐',
    tags: ['设计', '品牌'],
    date: '2025-9-4',
    image: 'https://blogtc.hljs.qzz.io/%E7%AC%AC%E4%BA%94%E6%9C%9F%E5%B0%81%E9%9D%A2.jpg'
  },
  {
    id: 3,
    title: '第一期：HailinMusicPlayer 安装使用指南',
    badge1: '工具',
    badge2: '热门',
    tags: ['音乐', 'JAVA'],
    date: '2025-9-8',
    image: 'https://blogtc.hljs.qzz.io/%E5%B0%81%E9%9D%A2.jpg'
  },
  {
    id: 4,
    title: '第二期：海林影院网站使用指南',
    badge1: '工具',
    badge2: '教程',
    tags: ['视频', 'Web'],
    date: '2025-9-8',
    image: 'https://blogtc.hljs.qzz.io/%E7%AC%AC%E4%BA%8C%E6%9C%9F%E5%B0%81%E9%9D%A2.jpg'
  }
])
</script>

<style scoped>
.home {
  animation: fadeIn 0.6s ease;
}

/* 公告栏 */
.announcement {
  margin-bottom: 30px;
  border-radius: 10px;
  animation: slideDown 0.5s ease;
}

.announcement :deep(.el-alert__content) {
  font-size: 14px;
}

/* 横幅区域 */
.hero-banner-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

/* 轮播图容器 */
.hero-carousel-wrapper {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  height: 400px;
}

/* Naive UI 轮播图样式 */
.hero-carousel-wrapper :deep(.n-carousel) {
  height: 100%;
}

.carousel-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
}

/* 分类卡片 */
.category-cards-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.category-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  min-height: 120px;
}

.category-card:hover {
  transform: translateX(10px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.category-card h3 {
  font-size: 28px;
  margin-bottom: 5px;
  font-weight: bold;
}

.category-card p {
  font-size: 14px;
  opacity: 0.9;
}

/* 卡片颜色 */
.card-blue {
  background: linear-gradient(135deg, #348dff 0%, #54b5ff 100%);
}

.card-orange {
  background: linear-gradient(135deg, #ff6854 0%, #ffa06e 100%);
}

.card-green {
  background: linear-gradient(135deg, #18e7af 0%, #3deccf 100%);
}

.card-video {
  position: relative;
  overflow: hidden;
}

.card-video-player {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
}

.video-overlay h3 {
  font-size: 16px;
  margin: 0;
}

/* 主布局 */
.main-layout {
  margin-top: 30px;
}

/* 标签筛选 */
.tags-filter {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tag-item {
  cursor: pointer;
  transition: all 0.3s ease;
}

.tag-item:hover {
  transform: scale(1.05);
}

/* 文章网格 */
.articles-grid {
  margin-bottom: 30px;
}

.article-card {
  cursor: pointer;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 20px;
  height: 420px;
  display: flex;
  flex-direction: column;
}

.article-card :deep(.el-card__body) {
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.article-image-wrapper {
  width: 100%;
  height: 240px;
  overflow: hidden;
  flex-shrink: 0;
}

.article-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.article-card:hover .article-image {
  transform: scale(1.1);
}

.article-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.article-badges {
  display: flex;
  gap: 8px;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  background: #f0f0f0;
  color: #666;
  font-size: 12px;
  border-radius: 4px;
}

.article-title {
  font-size: 18px;
  color: #333;
  line-height: 1.5;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
  margin: 0;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.article-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex: 1;
}

.tag {
  font-size: 13px;
  color: #999;
}

.article-date {
  font-size: 13px;
  color: #999;
  white-space: nowrap;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

/* 侧边栏 */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar-card {
  border-radius: 15px;
  animation: fadeIn 0.6s ease;
}

.sidebar-card h3 {
  margin-bottom: 15px;
  color: #333;
}

/* 个人信息卡片 */
.profile-card {
  background: linear-gradient(135deg, #445cf0 0%, #4c63f0 100%);
  border-radius: 25px;
  padding: 25px 20px;
  text-align: center;
  color: white;
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
  animation: fadeIn 0.6s ease;
}

.profile-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.profile-motto {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  margin-bottom: 20px;
  display: inline-block;
  position: relative;
  z-index: 1;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.profile-avatar-wrapper {
  position: relative;
  z-index: 1;
  margin-bottom: 20px;
}

.profile-avatar {
  width: 140px;
  height: 140px;
  margin: 0 auto;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  position: relative;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-badge {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.profile-info {
  position: relative;
  z-index: 1;
  margin-bottom: 20px;
}

.profile-name {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 5px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-subtitle {
  font-size: 14px;
  opacity: 0.9;
}

.profile-social {
  display: flex;
  justify-content: center;
  gap: 15px;
  position: relative;
  z-index: 1;
}

.social-icon {
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.social-icon svg {
  width: 22px;
  height: 22px;
}

.social-icon:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

/* 统计卡片 */
.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 10px;
}

.stat-item:last-child {
  margin-bottom: 0;
}

.stat-icon {
  font-size: 24px;
  color: #667eea;
}

.stat-label {
  flex: 1;
  font-size: 14px;
  color: #666;
}

.stat-value {
  font-weight: bold;
  color: #667eea;
}

/* 翻转卡片 */
.flip-card {
  width: 100%;
  height: 250px;
  perspective: 1000px;
  border-radius: 20px;
  cursor: pointer;
}

.flip-card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.2s ease;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.flip-card-front {
  transform: rotateY(0deg);
}

.flip-card-back {
  transform: rotateY(180deg);
}

.flip-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}



/* 响应式设计 */
@media (max-width: 768px) {
  .hero-banner-section {
    grid-template-columns: 1fr;
  }

  .carousel-content {
    padding-left: 20px;
  }

  .carousel-content h2 {
    font-size: 32px;
  }

  .category-cards-wrapper {
    flex-direction: row;
    overflow-x: auto;
  }

  .category-card {
    min-width: 150px;
  }

  .sidebar {
    margin-top: 30px;
  }
}
</style>
