<template>
  <div class="articles-page">
    <h1 class="page-title">技术文章</h1>

    <!-- 筛选按钮 -->
    <div class="filter-bar">
      <el-button
        v-for="filter in filters"
        :key="filter"
        :type="activeFilter === filter ? 'primary' : ''"
        @click="activeFilter = filter"
        round
      >
        {{ filter }}
      </el-button>
    </div>

    <!-- 文章列表 -->
    <div class="articles-list">
      <el-card
        v-for="article in articles"
        :key="article.id"
        class="article-item"
        shadow="hover"
        @click="goToArticle(article.id)"
      >
        <el-row :gutter="30">
          <el-col :xs="24" :sm="8">
            <img :src="article.image" class="article-image" />
          </el-col>
          <el-col :xs="24" :sm="16">
            <div class="article-info">
              <h2>{{ article.title }}</h2>
              <p class="article-excerpt">{{ article.excerpt }}</p>
              <div class="article-meta">
                <el-tag size="small">{{ article.category }}</el-tag>
                <span><el-icon><User /></el-icon> {{ article.author }}</span>
                <span><el-icon><Calendar /></el-icon> {{ article.date }}</span>
                <span><el-icon><View /></el-icon> {{ article.views }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <!-- 分页 -->
    <el-pagination
      class="pagination"
      layout="prev, pager, next"
      :total="100"
      :page-size="10"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { User, Calendar, View } from '@element-plus/icons-vue'

const router = useRouter()
const activeFilter = ref('全部')

const goToArticle = (id) => {
  router.push(`/article/${id}`)
}
const filters = ['全部', '前端开发', '后端开发', '工具使用']

const articles = ref([
  {
    id: 1,
    title: '计算机是如何工作的',
    excerpt: '深入探讨计算机的工作原理，从硬件到软件，从二进制到高级语言...',
    category: '编程',
    author: '海林',
    date: '2025-5-17',
    views: '1.2k',
    image: 'https://tc.hailin.ip-ddns.com/file/blog/1758971733012_微信图片_20250917211804.jpg'
  },
  {
    id: 2,
    title: 'HailinMusicPlayer 开发日志',
    excerpt: '记录音乐播放器的开发过程，包括技术选型、架构设计和实现细节...',
    category: '工具',
    author: '海林',
    date: '2025-9-8',
    views: '856',
    image: 'https://blogtc.hljs.qzz.io/%E7%AC%AC%E4%BA%8C%E6%9C%9F%E5%B0%81%E9%9D%A2.jpg'
  },
  {
    id: 3,
    title: '响应式网页设计实践',
    excerpt: '分享响应式设计的最佳实践，如何让网站在不同设备上都有良好体验...',
    category: '前端',
    author: '海林',
    date: '2025-10-15',
    views: '2.3k',
    image: 'https://tc.hailin.ip-ddns.com/file/blog/1761984532693_响应式.png'
  }
])
</script>

<style scoped>
.articles-page {
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.6s ease;
}

.page-title {
  font-size: 36px;
  margin-bottom: 40px;
  text-align: center;
  color: #333;
  font-weight: bold;
  animation: fadeIn 0.6s ease;
}

.filter-bar {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.article-item {
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
}

.article-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
  transition: transform 0.5s ease;
}

.article-item:hover .article-image {
  transform: scale(1.1);
}

.article-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.article-info h2 {
  font-size: 22px;
  margin-bottom: 15px;
  color: #333;
}

.article-excerpt {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.article-meta {
  display: flex;
  gap: 15px;
  font-size: 13px;
  color: #999;
  flex-wrap: wrap;
}

.article-meta span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 28px;
  }

  .article-image {
    height: 180px;
  }
}
</style>
