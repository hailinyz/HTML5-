<template>
  <div class="article-detail">
    <el-row :gutter="30">
      <!-- 文章主体 -->
      <el-col :xs="24" :lg="16">
        <el-card class="detail-card" shadow="never">
          <!-- 文章头部 -->
          <div class="article-header">
            <el-tag size="large" type="primary">{{ article.category }}</el-tag>
            <h1 class="article-title">{{ article.title }}</h1>
            <div class="article-info">
              <span><el-icon><User /></el-icon> {{ article.author }}</span>
              <span><el-icon><Calendar /></el-icon> {{ article.date }}</span>
              <span><el-icon><View /></el-icon> {{ article.views }}</span>
            </div>
          </div>

          <!-- 文章封面 -->
          <div class="article-cover">
            <img :src="article.image" :alt="article.title" />
          </div>

          <!-- 文章内容 -->
          <div class="article-body" v-html="article.content"></div>

          <!-- 返回按钮 -->
          <div class="article-footer">
            <el-button type="primary" @click="goBack">
              <el-icon><ArrowLeft /></el-icon>
              返回首页
            </el-button>
          </div>
        </el-card>
      </el-col>

      <!-- 侧边栏 - 最近发布 -->
      <el-col :xs="24" :lg="8">
        <el-card class="recent-card" shadow="never">
          <template #header>
            <div class="recent-header">
              <el-icon><Clock /></el-icon>
              <span>最近发布</span>
            </div>
          </template>
          
          <div class="cards">
            <div 
              v-for="recentArticle in recentArticles" 
              :key="recentArticle.id"
              class="card"
              :class="recentArticle.colorClass"
              @click="goToArticle(recentArticle.id)"
            >
              <p class="tip">{{ recentArticle.category }}</p>
              <p class="second-text">{{ recentArticle.title }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { User, Calendar, View, ArrowLeft, Clock } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const article = ref({
  id: 1,
  title: '',
  category: '',
  author: '',
  date: '',
  views: '',
  image: '',
  content: ''
})

// 最近发布的文章
const recentArticles = ref([
  {
    id: 1,
    title: '计算机是如何工作的',
    category: '编程',
    colorClass: 'red'
  },
  {
    id: 2,
    title: '独自闯，能闯万里！',
    category: '生活',
    colorClass: 'blue'
  },
  {
    id: 3,
    title: 'HailinMusicPlayer 安装指南',
    category: '工具',
    colorClass: 'green'
  },
  {
    id: 4,
    title: '海林影院网站使用指南',
    category: '工具',
    colorClass: 'red'
  }
])

// 文章数据库
const articlesData = {
  1: {
    id: 1,
    title: '计算机是如何工作的',
    category: '编程',
    author: '海林',
    date: '2025-5-17',
    views: '1.2k',
    image: 'https://tc.hailin.ip-ddns.com/file/blog/1758971733012_微信图片_20250917211804.jpg',
    content: `
      <h2>引言</h2>
      <p>计算机是现代社会不可或缺的工具，但你真的了解它是如何工作的吗？本文将深入探讨计算机的工作原理。</p>
      
      <h2>计算机的基本组成</h2>
      <p>计算机主要由以下几个部分组成：</p>
      <ul>
        <li><strong>中央处理器（CPU）</strong>：计算机的大脑，负责执行指令和处理数据</li>
        <li><strong>内存（RAM）</strong>：临时存储正在使用的数据和程序</li>
        <li><strong>硬盘</strong>：永久存储数据和程序</li>
        <li><strong>主板</strong>：连接所有硬件组件的平台</li>
        <li><strong>输入输出设备</strong>：键盘、鼠标、显示器等</li>
      </ul>

      <h2>二进制系统</h2>
      <p>计算机使用二进制系统（0和1）来表示和处理所有信息。这是因为电子电路只有两种状态：开和关。</p>

      <h2>指令执行过程</h2>
      <p>CPU执行指令的基本步骤：</p>
      <ol>
        <li>从内存中读取指令（取指）</li>
        <li>解码指令，确定要执行的操作（译码）</li>
        <li>执行指令（执行）</li>
        <li>将结果写回内存（写回）</li>
      </ol>

      <h2>总结</h2>
      <p>理解计算机的工作原理有助于我们更好地使用和开发软件。从硬件到软件，从二进制到高级语言，每一层都在为我们提供更强大的计算能力。</p>
    `
  },
  2: {
    id: 2,
    title: '独自闯，能闯万里！全新「海林小迷弟」设计在线',
    category: '生活',
    author: '海林',
    date: '2025-9-4',
    views: '856',
    image: 'https://blogtc.hljs.qzz.io/%E7%AC%AC%E4%BA%94%E6%9C%9F%E5%B0%81%E9%9D%A2.jpg',
    content: `
      <h2>全新设计理念</h2>
      <p>经过数月的精心设计和开发，全新的「海林小迷弟」博客终于上线了！这次改版不仅仅是视觉上的升级，更是对用户体验的全面优化。</p>

      <h2>设计亮点</h2>
      <ul>
        <li><strong>响应式设计</strong>：完美适配各种设备，从手机到电脑都有最佳体验</li>
        <li><strong>现代化UI</strong>：采用Element Plus组件库，界面简洁美观</li>
        <li><strong>流畅动画</strong>：精心设计的过渡效果，让交互更加自然</li>
        <li><strong>深色模式</strong>：即将推出，保护你的眼睛</li>
      </ul>

      <h2>技术栈</h2>
      <p>本次改版采用了最新的前端技术：</p>
      <ul>
        <li>Vue 3 - 渐进式JavaScript框架</li>
        <li>Element Plus - 基于Vue 3的组件库</li>
        <li>Vite - 下一代前端构建工具</li>
      </ul>

      <h2>未来规划</h2>
      <p>我们将继续优化和完善博客功能，包括：</p>
      <ul>
        <li>评论系统</li>
        <li>文章搜索</li>
        <li>标签分类</li>
        <li>RSS订阅</li>
      </ul>

      <p>感谢大家一直以来的支持，让我们一起见证「海林小迷弟」的成长！</p>
    `
  },
  3: {
    id: 3,
    title: '第一期：HailinMusicPlayer 安装使用指南',
    category: '工具',
    author: '海林',
    date: '2025-9-8',
    views: '2.3k',
    image: 'https://blogtc.hljs.qzz.io/%E5%B0%81%E9%9D%A2.jpg',
    content: `
      <h2>HailinMusicPlayer 简介</h2>
      <p>HailinMusicPlayer 是一款基于Java开发的音乐播放器，支持多种音频格式，具有美观的界面和丰富的功能。</p>

      <h2>系统要求</h2>
      <ul>
        <li>操作系统：Windows 7/8/10/11, macOS 10.12+, Linux</li>
        <li>Java版本：JRE 8 或更高版本</li>
        <li>内存：至少 512MB RAM</li>
        <li>硬盘空间：至少 100MB 可用空间</li>
      </ul>

      <h2>安装步骤</h2>
      <h3>1. 下载安装包</h3>
      <p>访问官网下载最新版本的安装包。</p>

      <h3>2. 安装Java环境</h3>
      <p>如果你的电脑还没有安装Java，请先下载并安装JRE。</p>

      <h3>3. 运行安装程序</h3>
      <p>双击下载的安装包，按照提示完成安装。</p>

      <h2>基本使用</h2>
      <h3>添加音乐</h3>
      <p>点击"文件"菜单，选择"添加文件"或"添加文件夹"来导入音乐。</p>

      <h3>播放控制</h3>
      <ul>
        <li>播放/暂停：空格键</li>
        <li>上一曲：Ctrl + ←</li>
        <li>下一曲：Ctrl + →</li>
        <li>音量调节：↑ ↓</li>
      </ul>

      <h3>创建播放列表</h3>
      <p>右键点击音乐文件，选择"添加到播放列表"，可以创建和管理自己的播放列表。</p>

      <h2>常见问题</h2>
      <h3>Q: 为什么无法播放某些音频文件？</h3>
      <p>A: 请确保音频文件格式受支持（MP3, WAV, FLAC等），并且文件没有损坏。</p>

      <h3>Q: 如何更换皮肤？</h3>
      <p>A: 在"设置"菜单中选择"外观"，可以选择不同的主题皮肤。</p>

      <p>更多问题请访问官方论坛或联系技术支持。</p>
    `
  },
  4: {
    id: 4,
    title: '第二期：海林影院网站使用指南',
    category: '工具',
    author: '海林',
    date: '2025-9-8',
    views: '1.8k',
    image: 'https://blogtc.hljs.qzz.io/%E7%AC%AC%E4%BA%8C%E6%9C%9F%E5%B0%81%E9%9D%A2.jpg',
    content: `
      <h2>海林影院简介</h2>
      <p>海林影院是一个在线视频播放平台，提供高清视频播放和管理功能，让你随时随地享受影视娱乐。</p>

      <h2>主要功能</h2>
      <ul>
        <li><strong>高清播放</strong>：支持1080P、4K高清视频播放</li>
        <li><strong>智能推荐</strong>：根据观看历史推荐相关内容</li>
        <li><strong>收藏功能</strong>：收藏喜欢的视频，方便下次观看</li>
        <li><strong>播放历史</strong>：自动记录观看进度</li>
        <li><strong>弹幕互动</strong>：与其他观众实时互动</li>
      </ul>

      <h2>使用教程</h2>
      <h3>1. 注册账号</h3>
      <p>点击右上角"注册"按钮，填写邮箱和密码完成注册。</p>

      <h3>2. 浏览视频</h3>
      <p>在首页可以看到推荐视频，也可以通过分类或搜索找到想看的内容。</p>

      <h3>3. 播放视频</h3>
      <p>点击视频封面即可开始播放。播放器支持以下操作：</p>
      <ul>
        <li>空格键：播放/暂停</li>
        <li>← →：快退/快进10秒</li>
        <li>↑ ↓：调节音量</li>
        <li>F：全屏</li>
        <li>D：开启/关闭弹幕</li>
      </ul>

      <h3>4. 发送弹幕</h3>
      <p>在播放器下方的输入框中输入内容，点击"发送"即可发送弹幕。</p>

      <h2>会员特权</h2>
      <p>升级为会员可以享受以下特权：</p>
      <ul>
        <li>无广告观看</li>
        <li>提前观看最新剧集</li>
        <li>专属会员内容</li>
        <li>高清画质</li>
        <li>离线下载</li>
      </ul>

      <h2>技术支持</h2>
      <p>如遇到播放问题，请尝试以下解决方案：</p>
      <ol>
        <li>刷新页面</li>
        <li>清除浏览器缓存</li>
        <li>更换浏览器</li>
        <li>检查网络连接</li>
      </ol>

      <p>如问题仍未解决，请联系客服获取帮助。</p>
    `
  }
}

onMounted(() => {
  const articleId = parseInt(route.params.id)
  if (articlesData[articleId]) {
    article.value = articlesData[articleId]
  }
})

const goBack = () => {
  router.push('/')
}

const goToArticle = (id) => {
  router.push(`/article/${id}`)
  window.scrollTo(0, 0)
}
</script>

<style scoped>
.article-detail {
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.6s ease;
}

.detail-card {
  border-radius: 20px;
}

.article-header {
  text-align: center;
  padding: 30px 0;
  border-bottom: 1px solid #f0f0f0;
}

.article-title {
  font-size: 32px;
  margin: 20px 0;
  color: #333;
  line-height: 1.4;
}

.article-info {
  display: flex;
  justify-content: center;
  gap: 30px;
  font-size: 14px;
  color: #999;
}

.article-info span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.article-cover {
  margin: 30px 0;
  border-radius: 10px;
  overflow: hidden;
}

.article-cover img {
  width: 100%;
  height: auto;
  display: block;
}

.article-body {
  padding: 20px 0;
  font-size: 16px;
  line-height: 1.8;
  color: #333;
}

.article-body :deep(h2) {
  font-size: 24px;
  margin: 30px 0 15px;
  color: #333;
  border-left: 4px solid #667eea;
  padding-left: 15px;
}

.article-body :deep(h3) {
  font-size: 20px;
  margin: 25px 0 12px;
  color: #555;
}

.article-body :deep(p) {
  margin: 15px 0;
  text-indent: 2em;
}

.article-body :deep(ul),
.article-body :deep(ol) {
  margin: 15px 0;
  padding-left: 40px;
}

.article-body :deep(li) {
  margin: 8px 0;
}

.article-body :deep(strong) {
  color: #667eea;
  font-weight: 600;
}

.article-body :deep(code) {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  color: #e83e8c;
}

.article-footer {
  padding: 30px 0;
  text-align: center;
  border-top: 1px solid #f0f0f0;
}

/* 最近发布卡片样式 - From Uiverse.io by kamehame-ha */
.recent-card {
  border-radius: 20px;
  position: sticky;
  top: 80px;
}

.recent-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cards .red {
  background-color: #f43f5e;
}

.cards .blue {
  background-color: #3b82f6;
}

.cards .green {
  background-color: #22c55e;
}

.cards .card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 100px;
  width: 100%;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: 400ms;
}

.cards .card p.tip {
  font-size: 1em;
  font-weight: 700;
}

.cards .card p.second-text {
  font-size: 0.7em;
  margin-top: 5px;
}

.cards .card:hover {
  transform: scale(1.1, 1.1);
}

.cards:hover > .card:not(:hover) {
  filter: blur(10px);
  transform: scale(0.9, 0.9);
}

@media (max-width: 768px) {
  .article-title {
    font-size: 24px;
  }

  .article-info {
    flex-direction: column;
    gap: 10px;
  }

  .article-body {
    font-size: 15px;
  }

  .article-body :deep(h2) {
    font-size: 20px;
  }

  .article-body :deep(h3) {
    font-size: 18px;
  }

  .recent-card {
    margin-top: 30px;
    position: static;
  }
}
</style>
