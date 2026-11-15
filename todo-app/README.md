# Ionic Todo · Ionic 8 + Angular 19

一个用于演示 **Ionic 8 + Angular 19（standalone 组件 + signals）** 的待办清单示例，包含列表页与详情页。

## 技术栈

| 项目 | 版本 |
| --- | --- |
| Node.js | 20.11.1 |
| Angular | 19.2.x（standalone API） |
| Ionic | 8.x（`@ionic/angular/standalone`） |
| 构建器 | `@angular-devkit/build-angular:application`（esbuild） |
| 语言 | TypeScript 5.7 + SCSS |

## 快速开始

```bash
# 1. 切换到 Node 20.11.1（nvm-windows）
nvm use 20.11.1
node -v   # v20.11.1

# 2. 安装依赖
npm install

# 3. 本地开发（默认 http://localhost:4200）
npm start

# 4. 生产构建（产物在 dist/todo-app/browser）
npm run build
```

## 功能

底部采用 **ion-tabs 双 Tab 布局**：

- **待办 Tab（/tabs/todos）**
  - 顶部进度卡片（已完成 / 总数 + 进度条）
  - 分段筛选：全部 / 待完成 / 已完成
  - 勾选完成、左滑删除、右下角 FAB 新建（弹窗表单）
  - 点击条目进入详情页（/tabs/todos/:id）
- **详情页 /tabs/todos/:id**
  - 展示并编辑标题、描述
  - 切换完成状态、查看创建 / 更新时间
  - 保存修改、删除待办（二次确认）
  - 路由参数通过 `withComponentInputBinding` 以 `input.required<string>()` 注入
- **组件 Tab（/tabs/components）**
  - 76 个 Ionic 8 组件按 6 大类整理（布局与容器 / 表单与输入 / 数据展示 / 浮层与反馈 / 导航 / 交互工具）
  - 顶部「实时预览」卡片：chip、badge、button、toggle、checkbox、segment、range、progress、spinner、skeleton、avatar、thumbnail 等真实渲染
  - **点击任意组件行弹出可交互演示**：真实运行该组件（可滑动、可拖拽、可触发弹窗）、
    部分组件支持属性调节（button 的 fill/size/color、input 的 fill/labelPlacement）、
    底部附代码片段可一键复制
  - 71 个组件为真实可操作演示，ion-app / ion-tabs / ion-nav / ion-router-outlet / ion-picker
    这 5 个结构性组件以结构说明 + 项目内真实用例呈现
  - ion-searchbar 按中英文名 / 说明过滤，搜索时自动展开全部分类
- 数据保存在 `localStorage`（`ionic-angular-todos-v1`），刷新不丢失

## 目录结构

```
src/
├── app/
│   ├── data/ionic-components.ts          # Ionic 组件清单数据（76 个 / 6 类）
│   ├── models/todo.model.ts              # Todo 数据模型与筛选类型
│   ├── services/todo.service.ts          # signal 状态 + localStorage 持久化
│   ├── pages/
│   │   ├── tabs/                         # 底部 Tab 容器（ion-tabs + tab-bar）
│   │   ├── todo-list/                    # 待办列表页
│   │   ├── todo-detail/                  # 待办详情页
│   │   └── ionic-components/             # Ionic 组件展示页 + 可交互演示弹窗
│   │       └── component-demo/           # 演示器：71 个真实实例 + 属性调节 + 代码片段
│   ├── app.component.ts                  # <ion-app> + <ion-router-outlet>
│   ├── app.config.ts                     # provideIonicAngular / provideRouter
│   └── app.routes.ts                     # /tabs 下 children：todos、todos/:id、components
├── theme/variables.scss                  # Ionic 主题变量（主色、深色模式）
├── styles.scss                           # 全局样式
└── index.html                            # viewport-fit=cover 等移动端 meta
```

## Ionic 接入要点

1. 依赖：`@ionic/angular@8` + `ionicons`，组件按需从 `@ionic/angular/standalone` 导入。
2. 启动：`app.config.ts` 中 `provideIonicAngular({ mode: 'ios' })`。
3. 根模板：`app.component.html` 使用 `<ion-app><ion-router-outlet /></ion-app>`。
4. 样式：Ionic 核心 CSS 在 `angular.json` 的 `styles` 中按顺序注入
   （core → normalize → structure → typography → dark.system → 主题变量 → 业务样式）。
5. 图标：使用 `addIcons({ ... })` 从 `ionicons/icons` 按需注册。

## 说明

- 桌面浏览器下以 iOS 模式渲染，移动端 WebView / Capacitor 中表现一致。
- 项目未集成 Capacitor，如需打包 Android / iOS，可执行
  `npm i @capacitor/core @capacitor/cli && npx cap init`。
