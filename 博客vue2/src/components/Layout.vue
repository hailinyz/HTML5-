<template>
  <div class="layout">
    <!-- 流星雨背景 - 仅暗夜模式显示 -->
    <StarryBackground v-if="isDarkMode" />
    
    <!-- 页头 -->
    <el-header class="header" :class="{ 'header-scrolled': isScrolled }">
      <div class="header-content">
        <div class="logo" @click="$router.push('/')">
          <span class="logo-text">海林小盆友个人博客</span>
        </div>

        <!-- 桌面导航 -->
        <el-menu
          :default-active="activeMenu"
          mode="horizontal"
          :ellipsis="false"
          class="desktop-menu"
          @select="handleMenuSelect"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/articles">文章</el-menu-item>
          <el-menu-item index="/videos">视频</el-menu-item>
          <el-menu-item index="/about">关于</el-menu-item>
          <el-menu-item index="/contact">联系</el-menu-item>
        </el-menu>

        <div class="header-actions">
          <ThemeSwitch class="theme-switch-btn" />
          <el-icon class="action-icon" @click="searchDialogVisible = true"><Search /></el-icon>
          <el-icon class="action-icon mobile-menu-icon" @click="drawerVisible = true">
            <Menu />
          </el-icon>
        </div>
      </div>
    </el-header>

    <!-- 搜索对话框 -->
    <el-dialog
      v-model="searchDialogVisible"
      title="搜索"
      width="90%"
      :style="{ maxWidth: '600px' }"
      center
    >
      <el-input
        v-model="searchKeyword"
        placeholder="请输入搜索关键词..."
        size="large"
        clearable
        @keyup.enter="handleSearch"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      
      <div v-if="searchResults.length > 0" class="search-results">
        <h3>搜索结果（{{ searchResults.length }}）</h3>
        <div
          v-for="result in searchResults"
          :key="result.id"
          class="search-result-item"
          @click="goToResult(result)"
        >
          <h4>{{ result.title }}</h4>
          <p>{{ result.description }}</p>
          <el-tag size="small">{{ result.type }}</el-tag>
        </div>
      </div>
      
      <div v-else-if="searchKeyword && hasSearched" class="no-results">
        <el-empty description="没有找到相关内容" />
      </div>

      <template #footer>
        <el-button @click="searchDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </template>
    </el-dialog>

    <!-- 移动端抽屉菜单 -->
    <el-drawer v-model="drawerVisible" direction="rtl" size="70%">
      <template #header>
        <div class="drawer-header">
          <div class="logo-icon">H</div>
          <span>海林小迷弟</span>
        </div>
      </template>
      <el-menu :default-active="activeMenu" @select="handleMobileMenuSelect">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/articles">文章</el-menu-item>
        <el-menu-item index="/videos">视频</el-menu-item>
        <el-menu-item index="/about">关于</el-menu-item>
        <el-menu-item index="/contact">联系</el-menu-item>
      </el-menu>
    </el-drawer>

    <!-- 主要内容区 -->
    <el-main class="main-content">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </el-main>

    <!-- 页脚 -->
    <el-footer class="footer">
      <div class="footer-content">
        <p>©2020 - 2025 By 海林小迷弟</p>
        <p>海林小迷弟Studio</p>
      </div>
    </el-footer>

    <!-- 全局音乐播放器按钮 -->
    <div class="button-box">
      <div class="touch left" @click="handlePrevSong"></div>
      <div class="touch middle" @click="toggleMusic"></div>
      <div class="touch right" @click="handleNextSong"></div>
      
      <!-- 上一曲按钮 -->
      <div class="button btn-prev">
        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path d="M256 128v768l-128-128V256l128-128z m512 128L384 512l384 256V256z" fill="#ffffff"></path>
        </svg>
        <div class="music-note note-1">♪</div>
      </div>
      
      <!-- 播放/暂停按钮 -->
      <div class="button btn-play">
        <svg v-if="!isMusicPlaying" class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path d="M256 128l512 384-512 384V128z" fill="#ffffff"></path>
        </svg>
        <svg v-else class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path d="M256 128h192v768H256V128z m320 0h192v768H576V128z" fill="#ffffff"></path>
        </svg>
        <div class="music-wave" v-if="isMusicPlaying">
          <span class="wave-bar"></span>
          <span class="wave-bar"></span>
          <span class="wave-bar"></span>
        </div>
        <div class="music-note note-2">♫</div>
      </div>
      
      <!-- 下一曲按钮 -->
      <div class="button btn-next">
        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path d="M768 128v768l128-128V256l-128-128z m-512 128l384 256-384 256V256z" fill="#ffffff"></path>
        </svg>
        <div class="music-note note-3">♪</div>
      </div>
    </div>

    <!-- 全局音频播放器（隐藏） -->
    <audio 
      ref="globalAudioPlayer"
      @play="onAudioPlay"
      @pause="onAudioPause"
      @ended="onAudioEnded"
    ></audio>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Search, Menu, VideoPlay, VideoPause } from '@element-plus/icons-vue'
import ThemeSwitch from './ThemeSwitch.vue'
import StarryBackground from './StarryBackground.vue'
import { 
  isMusicPlaying, 
  currentSong, 
  songs,
  currentSongIndex,
  setMusicPlayer,
  playNext,
  playPrev
} from '../stores/musicStore'

const router = useRouter()
const route = useRoute()

const isScrolled = ref(false)
const drawerVisible = ref(false)
const searchDialogVisible = ref(false)
const searchKeyword = ref('')
const isDarkMode = ref(false)

// 监听暗夜模式变化
const checkDarkMode = () => {
  const hasDarkMode = document.documentElement.classList.contains('dark-mode')
  isDarkMode.value = hasDarkMode
  console.log('Dark mode:', hasDarkMode)
}

// 使用 MutationObserver 监听 class 变化
const observer = new MutationObserver(checkDarkMode)
const searchResults = ref([])
const hasSearched = ref(false)
const globalAudioPlayer = ref(null)

const activeMenu = computed(() => route.path)

// 模拟搜索数据
const allContent = [
  { id: 1, title: '计算机是如何工作的', description: '深入探讨计算机的工作原理...', type: '文章', path: '/articles' },
  { id: 2, title: 'HailinMusicPlayer 开发日志', description: '记录音乐播放器的开发过程...', type: '文章', path: '/articles' },
  { id: 3, title: '响应式网页设计实践', description: '分享响应式设计的最佳实践...', type: '文章', path: '/articles' },
  { id: 4, title: 'HTML5 入门教程', description: '从零开始学习HTML5网页开发', type: '视频', path: '/videos' },
  { id: 5, title: 'CSS3 动画效果', description: '学习如何制作炫酷的CSS3动画', type: '视频', path: '/videos' },
  { id: 6, title: '关于海林小迷弟', description: '个人简介和技术栈介绍', type: '页面', path: '/about' },
  { id: 7, title: 'Vue.js 开发技巧', description: 'Vue3组合式API最佳实践', type: '文章', path: '/articles' },
  { id: 8, title: 'JavaScript 进阶', description: '深入理解JavaScript核心概念', type: '文章', path: '/articles' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const handleMenuSelect = (index) => {
  router.push(index)
}

const handleMobileMenuSelect = (index) => {
  router.push(index)
  drawerVisible.value = false
}

const handleSearch = () => {
  if (!searchKeyword.value.trim()) {
    ElMessage.warning('请输入搜索关键词')
    return
  }

  hasSearched.value = true
  const keyword = searchKeyword.value.toLowerCase()
  
  searchResults.value = allContent.filter(item => 
    item.title.toLowerCase().includes(keyword) || 
    item.description.toLowerCase().includes(keyword)
  )

  if (searchResults.value.length > 0) {
    ElMessage.success(`找到 ${searchResults.value.length} 条相关内容`)
  } else {
    ElMessage.info('没有找到相关内容')
  }
}

const goToResult = (result) => {
  searchDialogVisible.value = false
  router.push(result.path)
  searchKeyword.value = ''
  searchResults.value = []
  hasSearched.value = false
}

const toggleMusic = () => {
  if (!globalAudioPlayer.value) return
  
  if (globalAudioPlayer.value.paused) {
    globalAudioPlayer.value.play()
  } else {
    globalAudioPlayer.value.pause()
  }
}

const onAudioPlay = () => {
  isMusicPlaying.value = true
}

const onAudioPause = () => {
  isMusicPlaying.value = false
}

const onAudioEnded = () => {
  // 播放下一首
  currentSongIndex.value = (currentSongIndex.value + 1) % songs.value.length
  loadSong(currentSongIndex.value)
  globalAudioPlayer.value.play()
}

const loadSong = (index) => {
  if (!globalAudioPlayer.value) return
  currentSongIndex.value = index
  globalAudioPlayer.value.src = songs.value[index].src
}

const handlePrevSong = () => {
  playPrev()
}

const handleNextSong = () => {
  playNext()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // 注册全局音频播放器
  if (globalAudioPlayer.value) {
    setMusicPlayer(globalAudioPlayer.value)
    loadSong(0) // 加载第一首歌
  }
  
  // 初始检查暗夜模式
  checkDarkMode()
  
  // 监听 dark-mode class 变化
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  observer.disconnect()
})
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* 页头样式 */
.header {
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  height: 60px;
  padding: 0;
}

.header-scrolled {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.desktop-menu {
  flex: 1;
  border: none;
  margin: 0 40px;
}

.desktop-menu :deep(.el-menu-item) {
  font-size: 16px;
  transition: all 0.3s ease;
}

.desktop-menu :deep(.el-menu-item:hover) {
  background: transparent;
  color: #667eea;
}

.desktop-menu :deep(.el-menu-item.is-active) {
  color: #667eea;
  border-bottom-color: #667eea;
}

.header-actions {
  display: flex;
  gap: 15px;
  align-items: center;
}

.theme-switch-btn {
  transform: scale(0.8);
}

.action-icon {
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-icon:hover {
  color: #667eea;
  transform: scale(1.2);
}

.mobile-menu-icon {
  display: none;
}

.drawer-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
}

/* 主要内容区 */
.main-content {
  flex: 1;
  padding: 30px 20px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

/* 页脚样式 */
.footer {
  background: #dbdbdf;
  color: rgb(19, 17, 17);
  text-align: center;
  padding: 30px 0;
  height: auto;
}

.footer-content p {
  margin: 5px 0;
  font-size: 14px;
}

/* 搜索对话框样式 */
.search-results {
  margin-top: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.search-results h3 {
  font-size: 16px;
  color: #666;
  margin-bottom: 15px;
}

.search-result-item {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-result-item:hover {
  border-color: #667eea;
  background: #f8f9ff;
  transform: translateX(5px);
}

.search-result-item h4 {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}

.search-result-item p {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  line-height: 1.5;
}

.no-results {
  padding: 40px 0;
  text-align: center;
}

/* 全局音乐播放器按钮 */
.button-box {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 12rem;
  height: 5rem;
  display: flex;
  z-index: 999;
}

.button-box .button {
  width: 3.5rem;
  height: 3.5rem;
  position: absolute;
  left: 50%;
  top: 50%;
  cursor: pointer;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  opacity: 0.9;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(255, 255, 255, 0.2);
  overflow: visible;
}

.button-box .button .icon {
  width: 24px;
  height: 24px;
  opacity: 0.9;
  transition: 0.25s;
  z-index: 2;
}

/* 音符装饰 */
.button-box .button .music-note {
  position: absolute;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: bold;
  pointer-events: none;
  animation: float 2s ease-in-out infinite;
}

.button-box .button .note-1 {
  top: -8px;
  right: -8px;
  animation-delay: 0s;
}

.button-box .button .note-2 {
  bottom: -8px;
  left: -8px;
  animation-delay: 0.5s;
}

.button-box .button .note-3 {
  top: -8px;
  left: -8px;
  animation-delay: 1s;
}

/* 音乐波浪动画 */
.music-wave {
  position: absolute;
  display: flex;
  gap: 3px;
  align-items: flex-end;
  height: 20px;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.wave-bar {
  width: 3px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  animation: wave 0.8s ease-in-out infinite;
}

.wave-bar:nth-child(1) {
  animation-delay: 0s;
}

.wave-bar:nth-child(2) {
  animation-delay: 0.2s;
}

.wave-bar:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes wave {
  0%, 100% {
    height: 8px;
  }
  50% {
    height: 16px;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-5px);
    opacity: 1;
  }
}

.button-box .button.btn-prev {
  transform: translate(-50%, -50%);
  z-index: 30;
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
}

.button-box .button.btn-play {
  transform: translate(-50%, -50%);
  z-index: 40;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.button-box .button.btn-next {
  transform: translate(-50%, -50%);
  z-index: 50;
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.button-box .button.btn-next .icon {
  animation: spin 3s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.button-box .touch {
  position: relative;
  z-index: 60;
  height: 100%;
  flex: 1;
  cursor: pointer;
}

/* 悬停整个容器时，三个按钮展开 */
.button-box:hover .button.btn-prev {
  transform: translate(-200%, -50%);
}

.button-box:hover .button.btn-play {
  transform: translate(-50%, -50%);
}

.button-box:hover .button.btn-next {
  transform: translate(100%, -50%);
}

/* 悬停具体按钮时的效果 */
.button-box .touch.left:hover ~ .button.btn-prev {
  transform: translate(-200%, -50%) scale(1.15);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.3);
}

.button-box .touch.left:hover ~ .button.btn-prev .icon {
  width: 26px;
  opacity: 1;
}

.button-box .touch.left:active ~ .button.btn-prev {
  transform: translate(-200%, -50%) scale(0.95);
}

.button-box .touch.middle:hover ~ .button.btn-play {
  transform: translate(-50%, -50%) scale(1.2);
  box-shadow: 0 6px 20px rgba(79, 172, 254, 0.7), inset 0 0 15px rgba(255, 255, 255, 0.3);
}

.button-box .touch.middle:hover ~ .button.btn-play .icon {
  width: 28px;
  opacity: 1;
}

.button-box .touch.middle:active ~ .button.btn-play {
  transform: translate(-50%, -50%) scale(0.95);
}

.button-box .touch.right:hover ~ .button.btn-next {
  transform: translate(100%, -50%) scale(1.15);
  box-shadow: 0 6px 20px rgba(67, 233, 123, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.3);
}

.button-box .touch.right:hover ~ .button.btn-next .icon {
  width: 26px;
  opacity: 1;
  animation: spin 1.5s linear infinite;
}

.button-box .touch.right:active ~ .button.btn-next {
  transform: translate(100%, -50%) scale(0.95);
}

/* 响应式设计 - 768px以下 */
@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }

  .mobile-menu-icon {
    display: block;
  }

  .main-content {
    padding: 20px 15px;
  }

  .button-box {
    transform: scale(0.8);
    bottom: 20px;
    right: 10px;
  }
}
</style>
