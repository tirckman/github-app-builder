// 上下文感知：根据当前页面提供相关建议
export type PageContext = 
  | 'home' 
  | 'select-type' 
  | 'browse-templates' 
  | 'customize' 
  | 'deploy' 
  | 'unknown';

export function getPageContext(pathname: string): PageContext {
  if (pathname === '/') return 'home';
  if (pathname === '/select-type') return 'select-type';
  if (pathname === '/browse-templates') return 'browse-templates';
  if (pathname === '/customize') return 'customize';
  if (pathname === '/deploy') return 'deploy';
  return 'unknown';
}

export function getContextualQuestions(context: PageContext): string[] {
  switch (context) {
    case 'home':
      return [
        '如何开始创建应用？',
        '需要准备什么？',
        '整个过程需要多长时间？',
      ];
    
    case 'select-type':
      return [
        '如何选择应用类型？',
        '不同类型的区别是什么？',
        '选择后可以修改吗？',
      ];
    
    case 'browse-templates':
      return [
        '如何选择模板？',
        '如何预览模板效果？',
        '评分高的模板有什么优势？',
      ];
    
    case 'customize':
      return [
        '如何定制颜色？',
        '如何添加功能组件？',
        '如何查看实时预览？',
      ];
    
    case 'deploy':
      return [
        '如何部署应用？',
        '部署需要多长时间？',
        '部署失败怎么办？',
      ];
    
    default:
      return [
        '博客需要什么功能？',
        '如何部署到服务器？',
        '费用是多少？',
      ];
  }
}

export function getContextualHint(context: PageContext): string {
  switch (context) {
    case 'home':
      return '💡 从选择应用类型开始，我们会为你推荐最佳模板';
    case 'select-type':
      return '💡 根据你的需求选择应用类型，选择后可以浏览相关模板';
    case 'browse-templates':
      return '💡 点击"快速预览"查看模板效果，选择最适合的模板';
    case 'customize':
      return '💡 调整颜色和功能，右侧实时预览效果';
    case 'deploy':
      return '💡 按照步骤完成部署，约3分钟即可上线';
    default:
      return '💡 随时问我，我会为你解答疑问';
  }
}

