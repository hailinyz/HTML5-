# 海林小迷弟 - Vue3 + Element Plus 个人博客

## 项目简介
这是一个使用 Vue 3 + Element Plus 开发的个人博客网站，完全符合HTML5程序设计期末大作业的所有要求。

## 技术栈
- **Vue 3** - 渐进式JavaScript框架
- **Element Plus** - 基于Vue 3的组件库
- **Vue Router** - 官方路由管理器
- **Vite** - 下一代前端构建工具

## 功能特点

### ✅ 项目运行（30分）
- 个人博客主题，具有实用性和创新性
- 采用响应式设计，支持768px以上和以下两套适配方案
- 代码可正确运行

### ✅ 内容结构（15分）

#### 1. 网站结构（5分）
- **主页** (Home.vue) - 展示文章列表、分类卡片、侧边栏
- **文章页** (Articles.vue) - 文章列表展示
- **视频页** (Videos.vue) - 视频教程和音频播客
- **关于页** (About.vue) - 个人介绍和项目经历
- **联系页** (Contact.vue) - 联系方式和留言表单

#### 2. 响应式设计（5分）
- 768px以上：桌面端完整布局
- 768px以下：移动端优化布局
- 使用Element Plus的栅格系统实现响应式

#### 3. 页面结构（5分）
- **页头**：Logo + 导航菜单 + 功能图标
- **导航栏**：首页、文章、视频、关于、联系
- **内容区**：主内容 + 侧边栏（首页）
- **页脚**：版权信息

### ✅ 技术结构（20分）

#### 1. HTML5 + CSS布局（5分）
- ✅ 使用Vue 3组合式API
- ✅ CSS3圆角边框（border-radius）
- ✅ 过渡效果（transition）
- ✅ 动画效果（animation）：
  - fadeIn 淡入动画
  - slideDown 下滑动画
  - hover 悬停效果
  - transform 变换动画

#### 2. HTML5标准元素 + 表单验证（5分）
- ✅ 列表元素（el-menu, el-timeline）
- ✅ 表单元素（el-form, el-input, el-select, el-textarea）
- ✅ 完整的表单验证系统：
  - 姓名验证（必填，2-20字符）
  - 邮箱验证（必填，格式验证）
  - 电话验证（可选，手机号格式）
  - 主题验证（必填）
  - 留言内容验证（必填，10-500字符）
  - 实时验证 + 提交验证

#### 3. 多媒体功能（5分）
- ✅ 视频播放器（HTML5 video标签）
- ✅ 音频播放器（HTML5 audio标签）
- ✅ 多个视频展示
- ✅ 音频播客功能

## 项目结构
```
project/
├── index.html              # 入口HTML
├── package.json            # 项目配置
├── vite.config.js          # Vite配置
├── src/
│   ├── main.js             # 应用入口
│   ├── App.vue             # 根组件
│   ├── style.css           # 全局样式
│   ├── router/
│   │   └── index.js        # 路由配置
│   ├── components/
│   │   └── Layout.vue      # 布局组件
│   └── views/
│       ├── Home.vue        # 主页
│       ├── Articles.vue    # 文章页
│       ├── Videos.vue      # 视频页
│       ├── About.vue       # 关于页
│       └── Contact.vue     # 联系页
└── public/                 # 静态资源目录
    ├── images/             # 图片文件
    └── media/              # 媒体文件
```

## 安装和运行

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 构建生产版本
```bash
npm run build
```

### 4. 预览生产版本
```bash
npm run preview
```

## 媒体文件准备

### 图片文件（放在 public/ 目录）
- article1.jpg - 文章配图1
- article2.jpg - 文章配图2
- article3.jpg - 文章配图3
- article4.jpg - 文章配图4
- video-poster.jpg - 视频封面

### 媒体文件（放在 public/ 目录）
- intro.mp4 - 介绍视频
- tutorial1.mp4 - 教程视频1
- tutorial2.mp4 - 教程视频2
- music.mp3 - 背景音乐
- podcast.mp3 - 播客音频

## 核心功能说明

### 1. 响应式设计
- 使用Element Plus的栅格系统（el-row, el-col）
- 移动端自动切换为抽屉式菜单
- 所有组件都适配不同屏幕尺寸

### 2. 动画效果
- 页面加载淡入动画
- Logo旋转动画
- 卡片悬停效果
- 路由切换过渡

### 3. 表单验证
- 使用Element Plus的表单验证
- 实时验证用户输入
- 友好的错误提示
- 成功提交消息反馈

### 4. 多媒体支持
- HTML5 video标签实现视频播放
- HTML5 audio标签实现音频播放
- 自定义播放控制

## Element Plus 组件使用

### 布局组件
- el-header - 页头
- el-main - 主内容区
- el-footer - 页脚
- el-row / el-col - 栅格布局

### 导航组件
- el-menu - 菜单
- el-drawer - 抽屉（移动端菜单）

### 数据展示
- el-card - 卡片
- el-carousel - 轮播图
- el-tag - 标签
- el-timeline - 时间线
- el-pagination - 分页

### 表单组件
- el-form - 表单
- el-input - 输入框
- el-select - 选择器
- el-date-picker - 日期选择器
- el-button - 按钮

### 反馈组件
- el-alert - 警告提示
- el-message - 消息提示

## 评分对照

| 评分项 | 分值 | 完成情况 |
|--------|------|----------|
| 项目运行 | 30分 | ✅ 完成 |
| 网站结构 | 5分 | ✅ 完成（1主页+4栏目） |
| 响应式设计 | 5分 | ✅ 完成（768px断点） |
| 页面布局 | 5分 | ✅ 完成（四大部分） |
| HTML5+CSS+动画 | 5分 | ✅ 完成（圆角+过渡+动画） |
| 表单+验证 | 5分 | ✅ 完成（完整表单+验证） |
| 多媒体 | 5分 | ✅ 完成（视频+音频） |
| **总计** | **60分** | **✅ 全部完成** |

## 浏览器兼容性
- Chrome（推荐）
- Firefox
- Safari
- Edge

## 开发说明

### 代码规范
- 使用Vue 3组合式API（setup语法糖）
- 代码缩进规整，易于阅读
- 组件化开发，职责清晰
- 响应式数据管理

### 样式规范
- 使用scoped样式避免污染
- CSS变量统一管理
- 动画效果流畅自然
- 响应式断点统一

## 注意事项

1. 首次运行需要安装依赖：`npm install`
2. 确保Node.js版本 >= 16
3. 媒体文件需要自行准备并放在public目录
4. 开发服务器默认运行在 http://localhost:3000

## 作者
海林小迷弟

## 版权
©2020 - 2025 By 海林小迷弟
