<template>
  <div class="contact-page">
    <h1 class="page-title">联系我</h1>

    <el-row :gutter="40" class="contact-layout">
      <!-- 联系方式 -->
      <el-col :xs="24" :md="8">
        <el-card class="contact-info-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <el-icon><Message /></el-icon>
              <span>联系方式</span>
            </div>
          </template>
          <div class="cards">
            <div class="card red">
              <p class="tip">邮箱</p>
              <p class="second-text">hailin@example.com</p>
            </div>
            <div class="card blue">
              <p class="tip">微信</p>
              <p class="second-text">hailin_studio</p>
            </div>
            <div class="card green">
              <p class="tip">GitHub</p>
              <p class="second-text">github.com/hailin</p>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 留言表单 -->
      <el-col :xs="24" :md="16">
        <el-card class="contact-form-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <el-icon><Edit /></el-icon>
              <span>留言板</span>
            </div>
          </template>
          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            label-width="80px"
            label-position="top"
          >
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" placeholder="请输入您的姓名" />
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入您的邮箱" />
            </el-form-item>

            <el-form-item label="电话" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入您的电话（可选）" />
            </el-form-item>

            <el-form-item label="主题" prop="subject">
              <el-select v-model="form.subject" placeholder="请选择留言主题" style="width: 100%">
                <el-option label="合作咨询" value="cooperation" />
                <el-option label="技术交流" value="technical" />
                <el-option label="意见反馈" value="feedback" />
                <el-option label="其他" value="other" />
              </el-select>
            </el-form-item>

            <el-form-item label="留言内容" prop="message">
              <el-input
                v-model="form.message"
                type="textarea"
                :rows="6"
                placeholder="请输入留言内容"
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm" :loading="loading" size="large">
                发送留言
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Message, ChatDotRound, Link, Edit } from '@element-plus/icons-vue'

const formRef = ref()
const loading = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const validatePhone = (rule, value, callback) => {
  if (value && !/^1[3-9]\d{9}$/.test(value)) {
    callback(new Error('请输入有效的手机号码'))
  } else {
    callback()
  }
}

const rules = {
  name: [
    { required: true, message: '请输入您的姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '姓名长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入您的邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  phone: [
    { validator: validatePhone, trigger: 'blur' }
  ],
  subject: [
    { required: true, message: '请选择留言主题', trigger: 'change' }
  ],
  message: [
    { required: true, message: '请输入留言内容', trigger: 'blur' },
    { min: 10, max: 500, message: '留言内容长度在 10 到 500 个字符', trigger: 'blur' }
  ]
}

const submitForm = async () => {
  if (!formRef.value) return

  await formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      
      // 模拟提交
      setTimeout(() => {
        loading.value = false
        ElMessage.success('留言发送成功！我会尽快回复您。')
        formRef.value.resetFields()
      }, 1500)
    } else {
      ElMessage.error('请检查表单填写是否正确')
    }
  })
}
</script>

<style scoped>
.contact-page {
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

.contact-layout {
  max-width: 1000px;
  margin: 0 auto;
}

.contact-info-card,
.contact-form-card {
  border-radius: 20px;
  animation: fadeIn 0.6s ease;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: bold;
}

/* 联系方式卡片样式 - 和文章详情页最近发布一样 */
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

.el-form {
  margin-top: 10px;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 28px;
  }

  .contact-info-card {
    margin-bottom: 30px;
  }
}
</style>
