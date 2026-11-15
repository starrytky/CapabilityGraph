export interface IonicComponent {
  /** 组件标签名，如 ion-input */
  name: string;
  /** 中文名 */
  zh: string;
  /** 一句话说明 */
  desc: string;
  /** 是否已在本页的实时预览区演示 */
  demo?: boolean;
  /** 结构性组件（无独立可见 UI，演示以结构说明呈现） */
  structure?: boolean;
}

export interface IonicComponentGroup {
  key: string;
  title: string;
  icon: string;
  desc: string;
  items: IonicComponent[];
}

export const IONIC_COMPONENTS: IonicComponentGroup[] = [
  {
    key: 'layout',
    title: '布局与容器',
    icon: 'grid-outline',
    desc: '页面骨架、栅格、列表与侧边菜单',
    items: [
      { name: 'ion-app', zh: '应用根容器', desc: '包裹整个应用，承载全局样式与浮层', structure: true },
      { name: 'ion-header', zh: '页头', desc: '固定顶部的区域，通常放 toolbar' },
      { name: 'ion-toolbar', zh: '工具栏', desc: '标题、按钮、搜索栏的容器' },
      { name: 'ion-footer', zh: '页脚', desc: '固定底部的区域' },
      { name: 'ion-content', zh: '内容区', desc: '可滚动主体，支持 fullscreen 与 part="scroll"' },
      { name: 'ion-grid', zh: '栅格', desc: '12 列响应式布局容器' },
      { name: 'ion-row', zh: '栅格行', desc: '栅格中的一行' },
      { name: 'ion-col', zh: '栅格列', desc: '声明 size="6" 等断点宽度的列' },
      { name: 'ion-list', zh: '列表', desc: 'item 容器，lines 控制分隔线' },
      { name: 'ion-item', zh: '列表项', desc: '支持 slot 布局、detail 箭头、滑动容器' },
      { name: 'ion-item-divider', zh: '列表分组头', desc: '列表中的分组标题行' },
      { name: 'ion-item-group', zh: '列表分组', desc: '逻辑分组多个 item' },
      { name: 'ion-item-sliding', zh: '滑动列表项', desc: '左滑/右滑露出操作按钮' },
      { name: 'ion-item-options', zh: '滑动操作区', desc: '配合 sliding 使用，side 控制方向' },
      { name: 'ion-split-pane', zh: '分栏面板', desc: '大屏显示侧栏、小屏折叠为菜单' },
      { name: 'ion-menu', zh: '侧边菜单', desc: '抽屉式导航，contentId 指定主区域' },
      { name: 'ion-menu-button', zh: '菜单按钮', desc: '自动出现菜单开关的汉堡按钮' },
      { name: 'ion-menu-toggle', zh: '菜单开关', desc: '点击后关闭/切换菜单' },
      { name: 'ion-note', zh: '辅助说明', desc: '小号次要文字，常放表单错误提示' },
    ],
  },
  {
    key: 'form',
    title: '表单与输入',
    icon: 'create-outline',
    desc: '输入、选择、开关、滑块、日期与按钮',
    items: [
      { name: 'ion-input', zh: '输入框', desc: '支持 fill（outline/solid）与浮动标签', demo: true },
      { name: 'ion-textarea', zh: '多行文本', desc: 'autoGrow 自动增高' },
      { name: 'ion-searchbar', zh: '搜索栏', desc: '带清除/取消的搜索输入', demo: true },
      { name: 'ion-select', zh: '下拉选择', desc: '弹出选择面板，配合 ion-select-option' },
      { name: 'ion-select-option', zh: '选择项', desc: 'select 的选项' },
      { name: 'ion-checkbox', zh: '复选框', desc: '支持 indeterminate 半选状态', demo: true },
      { name: 'ion-radio', zh: '单选框', desc: '必须放在 radio-group 内' },
      { name: 'ion-radio-group', zh: '单选组', desc: '管理一组 radio 的互斥状态' },
      { name: 'ion-toggle', zh: '开关', desc: '布尔值切换', demo: true },
      { name: 'ion-range', zh: '滑块', desc: '支持双滑块范围选择', demo: true },
      { name: 'ion-datetime', zh: '日期时间', desc: '日历/滚轮选择器，可内联或弹窗' },
      { name: 'ion-datetime-button', zh: '日期按钮', desc: '点击唤起 datetime 弹窗' },
      { name: 'ion-segment', zh: '分段控件', desc: '同层级视图切换，本项目列表页在用', demo: true },
      { name: 'ion-segment-button', zh: '分段按钮', desc: 'segment 的单个选项' },
      { name: 'ion-button', zh: '按钮', desc: 'fill、expand、形状与图标槽位', demo: true },
      { name: 'ion-fab', zh: '悬浮按钮容器', desc: '固定定位，容纳主/次操作按钮' },
      { name: 'ion-fab-button', zh: '悬浮按钮', desc: '圆形主操作按钮' },
      { name: 'ion-fab-list', zh: '悬浮按钮组', desc: '展开的多个次级操作' },
      { name: 'ion-chip', zh: '标签片', desc: '轻量标签/筛选条件', demo: true },
    ],
  },
  {
    key: 'display',
    title: '数据展示',
    icon: 'images-outline',
    desc: '卡片、徽标、头像、骨架屏与进度',
    items: [
      { name: 'ion-card', zh: '卡片', desc: '内容分组容器' },
      { name: 'ion-card-header', zh: '卡片头部', desc: '配合 title/subtitle 使用' },
      { name: 'ion-card-content', zh: '卡片内容', desc: '卡片主体区域' },
      { name: 'ion-badge', zh: '徽标', desc: '数字/状态角标', demo: true },
      { name: 'ion-avatar', zh: '头像', desc: '圆形图片容器', demo: true },
      { name: 'ion-thumbnail', zh: '缩略图', desc: '方形小图容器', demo: true },
      { name: 'ion-icon', zh: '图标', desc: 'ionicons 图标，支持 addIcons 按需注册', demo: true },
      { name: 'ion-img', zh: '图片', desc: '懒加载图片组件' },
      { name: 'ion-label', zh: '标签', desc: 'item 内的标题/副标题文本' },
      { name: 'ion-text', zh: '文本', desc: 'color 语义着色文本', demo: true },
      { name: 'ion-skeleton-text', zh: '骨架屏', desc: '加载占位动画', demo: true },
      { name: 'ion-progress-bar', zh: '进度条', desc: '线性进度，支持 indeterminate', demo: true },
      { name: 'ion-spinner', zh: '加载动画', desc: '多种内置转圈样式', demo: true },
      { name: 'ion-accordion', zh: '折叠面板', desc: '配合 accordion-group 使用' },
      { name: 'ion-accordion-group', zh: '折叠组', desc: '管理多个 accordion 展开状态' },
      { name: 'ion-ripple-effect', zh: '水波纹', desc: '点击涟漪反馈' },
    ],
  },
  {
    key: 'overlay',
    title: '浮层与反馈',
    icon: 'layers-outline',
    desc: '弹窗、气泡、提示与动作面板',
    items: [
      { name: 'ion-modal', zh: '模态框', desc: '本项目新建待办使用，支持 sheet 断点' },
      { name: 'ion-popover', zh: '气泡弹层', desc: '锚定元素的浮层菜单' },
      { name: 'ion-alert', zh: '对话框', desc: '标题 + 文案 + 按钮组，适合二次确认' },
      { name: 'ion-action-sheet', zh: '动作面板', desc: '底部弹出的操作列表' },
      { name: 'ion-toast', zh: '轻提示', desc: '底部短暂提示，可带操作按钮' },
      { name: 'ion-loading', zh: '加载遮罩', desc: '阻塞式 loading 提示' },
      { name: 'ion-picker', zh: '滚轮选择', desc: '多列滚轮选择器', structure: true },
      { name: 'ion-backdrop', zh: '背景遮罩', desc: '自定义浮层的半透明背景' },
    ],
  },
  {
    key: 'navigation',
    title: '导航',
    icon: 'navigate-outline',
    desc: 'Tabs、路由出口与返回按钮',
    items: [
      { name: 'ion-tabs', zh: '标签页容器', desc: '底部 Tab 布局，内部含路由出口', structure: true },
      { name: 'ion-tab-bar', zh: '标签栏', desc: 'slot="bottom" 固定底部' },
      { name: 'ion-tab-button', zh: '标签按钮', desc: 'tab 属性对应子路由' },
      { name: 'ion-router-outlet', zh: '路由出口', desc: 'Ionic 版 router-outlet，保留页面栈', structure: true },
      { name: 'ion-nav', zh: '独立导航栈', desc: '非路由驱动的页面栈', structure: true },
      { name: 'ion-back-button', zh: '返回按钮', desc: '自动按页面栈回退，defaultHref 兜底' },
      { name: 'ion-breadcrumbs', zh: '面包屑', desc: '层级路径导航' },
      { name: 'ion-breadcrumb', zh: '面包屑项', desc: '单个路径节点' },
    ],
  },
  {
    key: 'utility',
    title: '交互工具',
    icon: 'construct-outline',
    desc: '下拉刷新、无限滚动与拖拽排序',
    items: [
      { name: 'ion-refresher', zh: '下拉刷新', desc: '配合 ion-refresher-content' },
      { name: 'ion-refresher-content', zh: '刷新内容', desc: '刷新过程中的提示区域' },
      { name: 'ion-infinite-scroll', zh: '无限滚动', desc: '触底加载更多' },
      { name: 'ion-infinite-scroll-content', zh: '无限滚动提示', desc: '底部加载提示' },
      { name: 'ion-reorder', zh: '拖拽手柄', desc: '放在 item 内用于排序' },
      { name: 'ion-reorder-group', zh: '拖拽组', desc: '包裹可排序列表' },
    ],
  },
];

export const IONIC_COMPONENT_TOTAL = IONIC_COMPONENTS.reduce(
  (sum, group) => sum + group.items.length,
  0,
);
