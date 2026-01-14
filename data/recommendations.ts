// 根据应用类型推荐的组件
export interface RecommendedComponent {
  id: string;
  name: string;
  description: string;
  category: 'essential' | 'recommended' | 'advanced';
  required: boolean; // 是否默认包含
}

export const componentRecommendations: Record<string, RecommendedComponent[]> = {
  blog: [
    {
      id: 'editor',
      name: '文章编辑器',
      description: 'Markdown支持，代码高亮，实时预览',
      category: 'essential',
      required: true,
    },
    {
      id: 'comments',
      name: '评论系统',
      description: '让读者参与讨论，支持回复和点赞',
      category: 'essential',
      required: true,
    },
    {
      id: 'categories',
      name: '分类标签',
      description: '组织文章结构，方便读者浏览',
      category: 'essential',
      required: true,
    },
    {
      id: 'rss',
      name: 'RSS订阅',
      description: '方便读者订阅你的博客',
      category: 'recommended',
      required: false,
    },
    {
      id: 'search',
      name: '搜索功能',
      description: '快速找到相关文章',
      category: 'recommended',
      required: false,
    },
    {
      id: 'analytics',
      name: '阅读统计',
      description: '了解文章热度和读者行为',
      category: 'recommended',
      required: false,
    },
    {
      id: 'seo',
      name: 'SEO优化',
      description: '提高搜索引擎排名',
      category: 'advanced',
      required: false,
    },
    {
      id: 'social-share',
      name: '社交分享',
      description: '一键分享到微信、微博等平台',
      category: 'advanced',
      required: false,
    },
    {
      id: 'email-notify',
      name: '邮件通知',
      description: '新文章发布时自动通知订阅者',
      category: 'advanced',
      required: false,
    },
  ],
  todo: [
    {
      id: 'task-list',
      name: '任务列表',
      description: '添加、删除、标记完成',
      category: 'essential',
      required: true,
    },
    {
      id: 'categories',
      name: '分类管理',
      description: '工作、生活、学习等分类',
      category: 'essential',
      required: true,
    },
    {
      id: 'priority',
      name: '优先级标记',
      description: '高、中、低优先级',
      category: 'recommended',
      required: false,
    },
    {
      id: 'due-date',
      name: '截止日期',
      description: '设置任务截止时间',
      category: 'recommended',
      required: false,
    },
    {
      id: 'reminder',
      name: '提醒功能',
      description: '到期前自动提醒',
      category: 'recommended',
      required: false,
    },
    {
      id: 'sync',
      name: '云端同步',
      description: '多设备同步数据',
      category: 'advanced',
      required: false,
    },
    {
      id: 'collaboration',
      name: '协作功能',
      description: '多人共享任务列表',
      category: 'advanced',
      required: false,
    },
  ],
  portfolio: [
    {
      id: 'project-showcase',
      name: '项目展示',
      description: '展示你的项目和作品',
      category: 'essential',
      required: true,
    },
    {
      id: 'about',
      name: '关于我',
      description: '个人介绍和技能展示',
      category: 'essential',
      required: true,
    },
    {
      id: 'contact',
      name: '联系表单',
      description: '让访客可以联系你',
      category: 'essential',
      required: true,
    },
    {
      id: 'resume',
      name: '简历下载',
      description: '提供PDF简历下载',
      category: 'recommended',
      required: false,
    },
    {
      id: 'blog',
      name: '博客模块',
      description: '分享技术文章和思考',
      category: 'recommended',
      required: false,
    },
    {
      id: 'testimonials',
      name: '客户评价',
      description: '展示客户或同事的评价',
      category: 'recommended',
      required: false,
    },
    {
      id: 'animations',
      name: '动画效果',
      description: '3D动画和交互效果',
      category: 'advanced',
      required: false,
    },
  ],
  ecommerce: [
    {
      id: 'product-catalog',
      name: '商品目录',
      description: '展示商品列表和详情',
      category: 'essential',
      required: true,
    },
    {
      id: 'shopping-cart',
      name: '购物车',
      description: '添加、管理购物车商品',
      category: 'essential',
      required: true,
    },
    {
      id: 'checkout',
      name: '结算系统',
      description: '订单确认和支付',
      category: 'essential',
      required: true,
    },
    {
      id: 'payment',
      name: '支付集成',
      description: '支持多种支付方式',
      category: 'essential',
      required: true,
    },
    {
      id: 'user-account',
      name: '用户账户',
      description: '注册、登录、订单管理',
      category: 'recommended',
      required: false,
    },
    {
      id: 'reviews',
      name: '商品评价',
      description: '用户评价和评分',
      category: 'recommended',
      required: false,
    },
    {
      id: 'inventory',
      name: '库存管理',
      description: '商品库存和补货提醒',
      category: 'advanced',
      required: false,
    },
  ],
  dashboard: [
    {
      id: 'charts',
      name: '数据图表',
      description: '可视化数据展示',
      category: 'essential',
      required: true,
    },
    {
      id: 'tables',
      name: '表格管理',
      description: '数据表格和筛选',
      category: 'essential',
      required: true,
    },
    {
      id: 'auth',
      name: '用户权限',
      description: '登录和权限管理',
      category: 'essential',
      required: true,
    },
    {
      id: 'notifications',
      name: '消息通知',
      description: '实时消息提醒',
      category: 'recommended',
      required: false,
    },
    {
      id: 'export',
      name: '数据导出',
      description: '导出Excel、PDF等格式',
      category: 'recommended',
      required: false,
    },
    {
      id: 'dark-mode',
      name: '暗色模式',
      description: '支持暗色主题切换',
      category: 'recommended',
      required: false,
    },
  ],
  landing: [
    {
      id: 'hero',
      name: '首屏展示',
      description: '吸引人的首屏设计',
      category: 'essential',
      required: true,
    },
    {
      id: 'features',
      name: '功能展示',
      description: '产品功能介绍',
      category: 'essential',
      required: true,
    },
    {
      id: 'cta',
      name: '行动号召',
      description: '引导用户注册或购买',
      category: 'essential',
      required: true,
    },
    {
      id: 'testimonials',
      name: '用户评价',
      description: '展示用户好评',
      category: 'recommended',
      required: false,
    },
    {
      id: 'pricing',
      name: '价格方案',
      description: '展示不同价格套餐',
      category: 'recommended',
      required: false,
    },
    {
      id: 'faq',
      name: '常见问题',
      description: '解答用户疑问',
      category: 'recommended',
      required: false,
    },
  ],
};

export function getRecommendationsByAppType(appTypeId: string): RecommendedComponent[] {
  return componentRecommendations[appTypeId] || [];
}

