<template>
  <canvas ref="canvasRef" class="starry-background"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animationId = null
let stars = []
let shootingStars = []

class Star {
  constructor(canvas) {
    this.canvas = canvas
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 2
    this.speedX = 0
    this.speedY = 0
    this.opacity = Math.random()
    this.twinkleSpeed = Math.random() * 0.02
  }

  update() {
    this.opacity += this.twinkleSpeed
    if (this.opacity > 1 || this.opacity < 0) {
      this.twinkleSpeed = -this.twinkleSpeed
    }
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = '#ffffff'
    ctx.shadowBlur = 5
    ctx.shadowColor = '#ffffff'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

class ShootingStar {
  constructor(canvas) {
    this.canvas = canvas
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = Math.random() * this.canvas.height * 0.5
    this.length = Math.random() * 100 + 80
    this.speed = Math.random() * 12 + 8
    this.size = Math.random() * 3 + 2
    this.opacity = 1
  }

  update() {
    this.x += this.speed
    this.y += this.speed * 0.5
    this.opacity -= 0.01

    if (this.opacity <= 0 || this.x > this.canvas.width || this.y > this.canvas.height) {
      this.reset()
    }
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.opacity
    
    const gradient = ctx.createLinearGradient(
      this.x, 
      this.y, 
      this.x - this.length, 
      this.y - this.length * 0.5
    )
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    ctx.strokeStyle = gradient
    ctx.lineWidth = this.size
    ctx.lineCap = 'round'
    
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x - this.length, this.y - this.length * 0.5)
    ctx.stroke()
    
    ctx.fillStyle = '#ffffff'
    ctx.shadowBlur = 10
    ctx.shadowColor = '#ffffff'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.restore()
  }
}

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) {
    console.log('Canvas not found')
    return
  }

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  console.log('Canvas initialized:', canvas.width, 'x', canvas.height)

  stars = []
  for (let i = 0; i < 200; i++) {
    stars.push(new Star(canvas))
  }

  shootingStars = []
  for (let i = 0; i < 5; i++) {
    shootingStars.push(new ShootingStar(canvas))
  }
  
  console.log('Stars created:', stars.length, 'Shooting stars:', shootingStars.length)
}

const animate = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  
  // 清除画布，使用半透明黑色创建拖尾效果
  ctx.fillStyle = 'rgba(13, 17, 23, 0.2)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 绘制星星
  stars.forEach(star => {
    star.update()
    star.draw(ctx)
  })

  // 绘制流星
  shootingStars.forEach(star => {
    star.update()
    star.draw(ctx)
  })

  animationId = requestAnimationFrame(animate)
}

const handleResize = () => {
  initCanvas()
}

onMounted(() => {
  initCanvas()
  animate()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.starry-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -999;
  background: #0d1117;
  pointer-events: none;
  display: block;
}
</style>
