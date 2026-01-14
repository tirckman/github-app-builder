// 消息内容解析工具：支持代码块和链接

export interface ParsedContent {
  type: 'text' | 'code' | 'link';
  content: string;
  language?: string; // 代码语言
  url?: string; // 链接地址
}

export function parseMessage(content: string): ParsedContent[] {
  const parts: ParsedContent[] = [];
  let currentIndex = 0;

  // 匹配代码块：```language\ncode\n```
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let codeMatch;
  
  while ((codeMatch = codeBlockRegex.exec(content)) !== null) {
    // 添加代码块前的文本
    if (codeMatch.index > currentIndex) {
      const textBefore = content.substring(currentIndex, codeMatch.index);
      if (textBefore.trim()) {
        parts.push(...parseLinks(textBefore));
      }
    }

    // 添加代码块
    parts.push({
      type: 'code',
      content: codeMatch[2].trim(),
      language: codeMatch[1] || 'text',
    });

    currentIndex = codeBlockRegex.lastIndex;
  }

  // 添加剩余文本
  if (currentIndex < content.length) {
    const remainingText = content.substring(currentIndex);
    if (remainingText.trim()) {
      parts.push(...parseLinks(remainingText));
    }
  }

  // 如果没有找到任何特殊格式，返回纯文本
  if (parts.length === 0) {
    parts.push(...parseLinks(content));
  }

  return parts;
}

// 解析链接
function parseLinks(text: string): ParsedContent[] {
  const parts: ParsedContent[] = [];
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  let lastIndex = 0;
  let match;

  while ((match = urlRegex.exec(text)) !== null) {
    // 添加链接前的文本
    if (match.index > lastIndex) {
      const textBefore = text.substring(lastIndex, match.index);
      if (textBefore.trim()) {
        parts.push({
          type: 'text',
          content: textBefore,
        });
      }
    }

    // 添加链接
    parts.push({
      type: 'link',
      content: match[0],
      url: match[0],
    });

    lastIndex = urlRegex.lastIndex;
  }

  // 添加剩余文本
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    if (remainingText.trim()) {
      parts.push({
        type: 'text',
        content: remainingText,
      });
    }
  }

  // 如果没有任何链接，返回原文本
  if (parts.length === 0) {
    parts.push({
      type: 'text',
      content: text,
    });
  }

  return parts;
}

