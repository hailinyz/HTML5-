import { ref, computed } from 'vue'

// 全局音乐播放器状态
export const musicPlayer = ref(null)
export const isMusicPlaying = ref(false)
export const currentSongIndex = ref(0)

// 歌曲列表
export const songs = ref([
  {
    title: "晴天",
    src: "https://javawebhl.oss-cn-beijing.aliyuncs.com/2025/%E6%99%B4%E5%A4%A9%20-%20%E5%91%A8%E6%9D%B0%E4%BC%A6.mp3"
  },
  {
    title: "七里香",
    src: "https://javawebhl.oss-cn-beijing.aliyuncs.com/2025/%E4%B8%83%E9%87%8C%E9%A6%99%20-%20%E5%91%A8%E6%9D%B0%E4%BC%A6.mp3"
  },
  {
    title: "青花瓷",
    src: "https://javawebhl.oss-cn-beijing.aliyuncs.com/2025/%E9%9D%92%E8%8A%B1%E7%93%B7%20-%20%E5%91%A8%E6%9D%B0%E4%BC%A6.mp3"
  },
  {
    title: "花海",
    src: "https://javawebhl.oss-cn-beijing.aliyuncs.com/2025/%E8%8A%B1%E6%B5%B7%20-%20%E5%91%A8%E6%9D%B0%E4%BC%A6.mp3"
  },
  {
    title: "反方向的钟",
    src: "https://javawebhl.oss-cn-beijing.aliyuncs.com/2025/%E5%8F%8D%E6%96%B9%E5%90%91%E7%9A%84%E9%92%9F%20-%20%E5%91%A8%E6%9D%B0%E4%BC%A6.mp3"
  },
  {
    title: "珊瑚海",
    src: "https://javawebhl.oss-cn-beijing.aliyuncs.com/2025/%E7%8F%8A%E7%91%9A%E6%B5%B7%20-%20%E5%91%A8%E6%9D%B0%E4%BC%A6_%E6%A2%81%E5%BF%83%E9%A2%90.mp3"
  },
  {
    title: "说了再见",
    src: "https://javawebhl.oss-cn-beijing.aliyuncs.com/2025/%E8%AF%B4%E4%BA%86%E5%86%8D%E8%A7%81%20-%20%E5%91%A8%E6%9D%B0%E4%BC%A6.mp3"
  },
  {
    title: "爱在西元前",
    src: "https://javawebhl.oss-cn-beijing.aliyuncs.com/2025/%E7%88%B1%E5%9C%A8%E8%A5%BF%E5%85%83%E5%89%8D%20-%20%E5%91%A8%E6%9D%B0%E4%BC%A6.mp3"
  },
  {
    title: "红尘客栈",
    src: "https://javawebhl.oss-cn-beijing.aliyuncs.com/2025/%E7%BA%A2%E5%B0%98%E5%AE%A2%E6%A0%88%20-%20%E5%91%A8%E6%9D%B0%E4%BC%A6.mp3"
  },
])

export const currentSong = computed(() => songs.value[currentSongIndex.value])

export function setMusicPlayer(player) {
  musicPlayer.value = player
}

export function toggleMusicPlay() {
  if (!musicPlayer.value) {
    console.warn('音乐播放器未初始化')
    return
  }
  
  if (musicPlayer.value.paused) {
    musicPlayer.value.play()
  } else {
    musicPlayer.value.pause()
  }
}

export function playNext() {
  if (!musicPlayer.value) return
  currentSongIndex.value = (currentSongIndex.value + 1) % songs.value.length
  musicPlayer.value.src = songs.value[currentSongIndex.value].src
  musicPlayer.value.play()
}

export function playPrev() {
  if (!musicPlayer.value) return
  currentSongIndex.value = (currentSongIndex.value - 1 + songs.value.length) % songs.value.length
  musicPlayer.value.src = songs.value[currentSongIndex.value].src
  musicPlayer.value.play()
}

export function playRandom() {
  if (!musicPlayer.value) return
  let randomIndex
  do {
    randomIndex = Math.floor(Math.random() * songs.value.length)
  } while (randomIndex === currentSongIndex.value && songs.value.length > 1)
  
  currentSongIndex.value = randomIndex
  musicPlayer.value.src = songs.value[randomIndex].src
  musicPlayer.value.play()
}
