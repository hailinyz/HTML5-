<template>
  <div class="videos-page">
    <h1 class="page-title">视频教程</h1>

    <!-- 视频网格 -->
    <el-row :gutter="30" class="video-grid">
      <el-col
        v-for="video in videos"
        :key="video.id"
        :xs="24"
        :sm="24"
        :md="24"
      >
        <el-card class="video-card" shadow="hover">
          <div class="video-container">
            <!-- 视频播放器 -->
            <div class="video-player-wrapper">
              <video 
                :id="'video-' + video.id"
                :ref="el => videoRefs[video.id] = el"
                class="video-player"
                width="850"
                height="400"
                :src="video.src"
              >
                您的浏览器不支持video标签
              </video>
            </div>

            <!-- 视频信息和控制 -->
            <div class="video-controls-wrapper">
              <div class="video-info-header">
                <h3 class="video-title">{{ video.title }}</h3>
                <p class="video-description">{{ video.description }}</p>
                <div class="video-time-info" :id="'info-' + video.id">00:00 / 00:00</div>
              </div>

              <hr class="divider" />

              <!-- 控制按钮 -->
              <div class="video-controls">
                <button @click="togglePlay(video.id)">
                  {{ playingStates[video.id] ? '暂停' : '播放' }}
                </button>
                <button @click="goBack(video.id, -5)">快退5秒</button>
                <button @click="goBack(video.id, 5)">快进5秒</button>
                <button @click="setSpeed(video.id, 1)">正常速度</button>
                <button @click="setSpeed(video.id, 1.5)">1.5X速度</button>
                <button @click="setSpeed(video.id, 2)">2.0X速度</button>
                <button @click="adjustVolume(video.id, 0.1)">音量+</button>
                <button @click="adjustVolume(video.id, -0.1)">音量-</button>
                <button @click="toggleMute(video.id)">
                  {{ mutedStates[video.id] ? '声音' : '静音' }}
                </button>
              </div>

              <div class="video-meta">
                <span><el-icon><Clock /></el-icon> {{ video.duration }}</span>
                <span><el-icon><View /></el-icon> {{ video.views }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 音频播客部分 -->
    <div class="audio-section">
      <h2>音频播客</h2>
      <el-card class="music-player-card" shadow="hover">
        <div class="player">
          <!-- 当前播放歌曲信息 -->
          <div class="song-info">
            当前播放: <span class="current-song">{{ currentSong.title }}</span>
          </div>

          <!-- 进度条 -->
          <div class="progress-container">
            <div class="progress-bar-wrapper" @click="seekAudio">
              <div class="progress-bar-fill" :style="{ width: progressPercent + '%' }"></div>
            </div>
            <div class="time">
              <span>{{ currentTime }}</span>
              <span>{{ duration }}</span>
            </div>
          </div>

          <!-- 控制按钮 -->
          <div class="controls">
            <button class="btn-prev" @click="playPrev">上一首</button>
            <button class="btn-play" @click="toggleAudioPlay">{{ isPlaying ? '暂停' : '播放' }}</button>
            <button class="btn-next" @click="playNext">下一首</button>
            <button class="btn-random" @click="playRandom">随机播放</button>
          </div>


        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { Clock, View } from '@element-plus/icons-vue'
import { 
  isMusicPlaying, 
  currentSong, 
  songs,
  currentSongIndex,
  toggleMusicPlay,
  playNext,
  playPrev,
  playRandom,
  musicPlayer
} from '../stores/musicStore'

const videoRefs = reactive({})
const playingStates = reactive({})
const mutedStates = reactive({})

const videos = ref([
  {
    id: 1,
    title: '前端框架Vue3',
    description: '框架排行榜从夯到拉',
    duration: '5:30',
    views: '3.2k',
    src: 'https://javawebhl.oss-cn-beijing.aliyuncs.com/2025/fonted.mp4'
  },
  {
    id: 2,
    title: '如何用HTML+CSS+JS三剑客做网页',
    description: '从零开始学习HTML5网页开发',
    duration: '15:20',
    views: '5.6k',
    src: 'https://javawebhl.oss-cn-beijing.aliyuncs.com/2025/html.mp4'
  },
  {
    id: 3,
    title: '后端框架排行从夯到拉',
    description: 'Spring',
    duration: '12:45',
    views: '4.1k',
    src: 'https://javawebhl.oss-cn-beijing.aliyuncs.com/2025/spring.mp4'
  }
])

// 音乐播放器相关 - 使用全局状态
const currentTime = ref('0:00')
const duration = ref('0:00')
const progressPercent = ref(0)

// 时间格式化函数
const formatTime = (second) => {
  const fen = Math.floor(second / 60)
  const fenStr = fen >= 10 ? fen : '0' + fen
  const miao = Math.floor(second % 60)
  const miaoStr = miao >= 10 ? miao : '0' + miao
  return fenStr + ':' + miaoStr
}

// 播放/暂停控制
const togglePlay = (videoId) => {
  const video = videoRefs[videoId]
  if (!video) return

  if (video.paused) {
    video.play()
    playingStates[videoId] = true
  } else {
    video.pause()
    playingStates[videoId] = false
  }
}

// 快进/快退
const goBack = (videoId, val) => {
  const video = videoRefs[videoId]
  if (!video) return
  video.currentTime += val
}

// 设置播放速度
const setSpeed = (videoId, speed) => {
  const video = videoRefs[videoId]
  if (!video) return
  video.playbackRate = speed
}

// 调节音量
const adjustVolume = (videoId, val) => {
  const video = videoRefs[videoId]
  if (!video) return
  
  const volumeData = video.volume + val
  if (volumeData <= 1 && volumeData >= 0) {
    video.volume = volumeData
  }
}

// 静音控制
const toggleMute = (videoId) => {
  const video = videoRefs[videoId]
  if (!video) return
  
  video.muted = !video.muted
  mutedStates[videoId] = video.muted
}

// 更新时间显示
const updateTimeDisplay = (videoId) => {
  const video = videoRefs[videoId]
  const infoElement = document.getElementById('info-' + videoId)
  
  if (!video || !infoElement) return
  
  if (video.duration) {
    infoElement.innerHTML = formatTime(video.currentTime) + ' / ' + formatTime(video.duration)
  } else {
    infoElement.innerHTML = '00:00 / 00:00'
  }
}

// 音乐播放器方法 - 使用全局方法
const toggleAudioPlay = toggleMusicPlay

const updateProgress = () => {
  if (!musicPlayer.value) return
  
  const { currentTime: ct, duration: dur } = musicPlayer.value
  progressPercent.value = (ct / dur) * 100
  currentTime.value = formatTime(ct)
}

const onLoadedMetadata = () => {
  if (!musicPlayer.value) return
  duration.value = formatTime(musicPlayer.value.duration)
}

const seekAudio = (e) => {
  if (!musicPlayer.value) return
  
  const rect = e.currentTarget.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  musicPlayer.value.currentTime = percent * musicPlayer.value.duration
}

onMounted(() => {
  // 为每个视频添加时间更新监听
  videos.value.forEach(video => {
    const videoElement = videoRefs[video.id]
    if (videoElement) {
      playingStates[video.id] = false
      mutedStates[video.id] = false
      
      videoElement.ontimeupdate = () => {
        updateTimeDisplay(video.id)
      }
    }
  })
  
  // 监听全局音频播放器的时间更新
  if (musicPlayer.value) {
    musicPlayer.value.addEventListener('timeupdate', updateProgress)
    musicPlayer.value.addEventListener('loadedmetadata', onLoadedMetadata)
  }
})

onUnmounted(() => {
  // 清理事件监听
  if (musicPlayer.value) {
    musicPlayer.value.removeEventListener('timeupdate', updateProgress)
    musicPlayer.value.removeEventListener('loadedmetadata', onLoadedMetadata)
  }
})
</script>

<style scoped>
.videos-page {
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
}

.video-grid {
  margin-bottom: 50px;
}

.video-card {
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-bottom: 30px;
}

.video-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.video-container {
  display: flex;
  gap: 30px;
  padding: 20px;
}

.video-player-wrapper {
  flex-shrink: 0;
}

.video-player {
  width: 100%;
  max-width: 850px;
  height: 400px;
  background: #000;
  border-radius: 10px;
}

.video-controls-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.video-info-header {
  margin-bottom: 15px;
}

.video-title {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
  font-weight: bold;
}

.video-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  line-height: 1.6;
}

.video-time-info {
  font-size: 16px;
  color: #944bc8;
  font-weight: 600;
  margin: 10px 0;
}

.divider {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 15px 0;
}

.video-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.video-controls button {
  display: inline-block;
  outline: none;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font: 14px/100% Arial, Helvetica, sans-serif;
  padding: 0.5em 1.5em 0.55em;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  border-radius: 0.5em;
  background-color: #944bc8;
  color: white;
  border: none;
  transition: all 0.3s ease;
}

.video-controls button:hover {
  background-color: #7a3ba8;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(148, 75, 200, 0.3);
}

.video-controls button:active {
  transform: translateY(0);
}

.video-meta {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #999;
  margin-top: auto;
}

.video-meta span {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* 音乐播放器部分 */
.audio-section {
  margin-top: 50px;
}

.audio-section h2 {
  font-size: 28px;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
}

.music-player-card {
  border-radius: 20px;
  max-width: 700px;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.player {
  padding: 20px;
}

.song-info {
  text-align: center;
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
}

.current-song {
  font-weight: bold;
  color: #2196F3;
}

.progress-container {
  margin: 20px 0;
}

.progress-bar-wrapper {
  width: 100%;
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  transition: height 0.2s;
}

.progress-bar-wrapper:hover {
  height: 12px;
}

.progress-bar-fill {
  height: 100%;
  background-color: #19e8b9;
  transition: width 0.1s;
}

.time {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.controls button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  color: white;
  transition: all 0.3s;
  font-weight: 500;
}

.btn-play {
  background-color: #ff6955;
}

.btn-play:hover {
  background-color: #ff6955;
  transform: scale(1.05);
}

.btn-random {
  background-color: #18e7af;
}

.btn-random:hover {
  background-color: #18e7af;
  transform: scale(1.05);
}

.btn-prev,
.btn-next {
  background-color: #338eff;
}

.btn-prev:hover,
.btn-next:hover {
  background-color: #338eff;
  transform: scale(1.05);
}

@media (max-width: 1200px) {
  .video-container {
    flex-direction: column;
  }

  .video-player {
    max-width: 100%;
    height: auto;
    aspect-ratio: 16/9;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 28px;
  }

  .video-container {
    padding: 15px;
  }

  .video-title {
    font-size: 20px;
  }

  .video-controls {
    gap: 8px;
  }

  .video-controls button {
    font-size: 12px;
    padding: 0.4em 1em;
  }

  .video-player {
    height: auto;
  }

  .controls {
    gap: 10px;
  }

  .controls button {
    padding: 8px 15px;
    font-size: 14px;
  }
}
</style>
