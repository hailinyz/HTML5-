import { ref, computed } from 'vue'

// 全局音乐播放器状态
export const musicPlayer = ref(null)
export const isMusicPlaying = ref(false)
export const currentSongIndex = ref(0)

// 歌曲列表
export const songs = ref([
  {
    title: "晴天",
    src: "https://tc.hailin.ip-ddns.com/file/OSS/1760617688256_晴天_-_周杰伦.mp3"
  },
  {
    title: "七里香",
    src: "https://tc.hailin.ip-ddns.com/file/OSS/1760621490165_七里香_-_周杰伦.mp3"
  },
  {
    title: "青花瓷",
    src: "https://tc.hailin.ip-ddns.com/file/OSS/1760621488982_青花瓷_-_周杰伦.mp3"
  },
  {
    title: "花海",
    src: "https://tc.hailin.ip-ddns.com/file/OSS/1760621494002_花海_-_周杰伦.mp3"
  },
  {
    title: "反方向的钟",
    src: "https://tc.hailin.ip-ddns.com/file/OSS/1760621494322_反方向的钟_-_周杰伦.mp3"
  },
  {
    title: "珊瑚海",
    src: "https://tc.hailin.ip-ddns.com/file/OSS/1760621508629_珊瑚海_-_周杰伦_梁心颐.mp3"
  },
  {
    title: "说了再见",
    src: "https://tc.hailin.ip-ddns.com/file/OSS/1760621508332_说了再见_-_周杰伦.mp3"
  },
  {
    title: "爱在西元前",
    src: "https://tc.hailin.ip-ddns.com/file/OSS/1760621491387_爱在西元前_-_周杰伦.mp3"
  },
  {
    title: "红尘客栈",
    src: "https://tc.hailin.ip-ddns.com/file/OSS/1760621494516_红尘客栈_-_周杰伦.mp3"
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
