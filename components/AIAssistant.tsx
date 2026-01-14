'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { MessageCircle, X, Send, Bot, User, Copy, Check, ExternalLink } from 'lucide-react';
import { getAnswer } from '@/lib/aiKnowledge';
import { getContextualQuestions, getContextualHint, getPageContext } from '@/lib/contextAware';
import { parseMessage } from '@/lib/messageParser';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function AIAssistant() {
  const pathname = usePathname();
  const router = useRouter();
  const context = getPageContext(pathname || '');
  const contextualQuestions = getContextualQuestions(context);
  const contextualHint = getContextualHint(context);
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const askQuestion = (question: string) => {
    setInput('');
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // 模拟AI思考时间
    setTimeout(() => {
      const answer = getAnswer(question);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: answer,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    askQuestion(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopyMessage = async (messageId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleQuickAction = (action: string, value?: string) => {
    switch (action) {
      case 'go-to-select':
        router.push('/select-type');
        break;
      case 'go-to-templates':
        router.push('/browse-templates');
        break;
      case 'go-to-customize':
        router.push('/customize');
        break;
      case 'go-to-deploy':
        router.push('/deploy');
        break;
      default:
        break;
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* 悬浮按钮 */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 z-40 flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 聊天窗口 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
          >
            {/* 头部 */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    AI 助手
                  </div>
                  <div className="text-xs text-white/80 mt-0.5">
                    {contextualHint}
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 消息列表 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
              {/* 预设问题（上下文感知） */}
              {messages.length === 0 && (
                <div className="space-y-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    相关问题：
                  </div>
                  {contextualQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => askQuestion(question)}
                      className="block w-full text-left p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all text-sm"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* 对话消息 */}
              {messages.map((msg) => {
                const parsedContent = msg.role === 'assistant' ? parseMessage(msg.content) : null;
                
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[75%] ${msg.role === 'user' ? '' : 'group'}`}>
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        {parsedContent ? (
                          <div className="space-y-2">
                            {parsedContent.map((part, idx) => {
                              if (part.type === 'code') {
                                return (
                                  <div key={idx} className="relative">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {part.language}
                                      </span>
                                      <button
                                        onClick={() => handleCopyMessage(`${msg.id}-${idx}`, part.content)}
                                        className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                      >
                                        {copiedMessageId === `${msg.id}-${idx}` ? (
                                          <Check className="w-3 h-3 text-green-500" />
                                        ) : (
                                          <Copy className="w-3 h-3" />
                                        )}
                                      </button>
                                    </div>
                                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                                      <code>{part.content}</code>
                                    </pre>
                                  </div>
                                );
                              }
                              if (part.type === 'link') {
                                return (
                                  <a
                                    key={idx}
                                    href={part.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1"
                                  >
                                    {part.content}
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                );
                              }
                              return (
                                <div key={idx} className="whitespace-pre-wrap text-sm leading-relaxed">
                                  {part.content}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">
                            {msg.content}
                          </div>
                        )}
                      </div>
                      
                      {/* 快捷操作按钮（仅助手消息） */}
                      {msg.role === 'assistant' && (
                        <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleCopyMessage(msg.id, msg.content)}
                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded flex items-center gap-1"
                            title="复制消息"
                          >
                            {copiedMessageId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-green-500" />
                                <span>已复制</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>复制</span>
                              </>
                            )}
                          </button>
                          {/* 根据内容检测快捷操作 */}
                          {msg.content.includes('选择类型') && (
                            <button
                              onClick={() => handleQuickAction('go-to-select')}
                              className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded flex items-center gap-1"
                            >
                              前往选择类型
                            </button>
                          )}
                          {msg.content.includes('浏览模板') && (
                            <button
                              onClick={() => handleQuickAction('go-to-templates')}
                              className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded flex items-center gap-1"
                            >
                              前往浏览模板
                            </button>
                          )}
                          {msg.content.includes('定制') && (
                            <button
                              onClick={() => handleQuickAction('go-to-customize')}
                              className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded flex items-center gap-1"
                            >
                              前往定制化
                            </button>
                          )}
                          {msg.content.includes('部署') && (
                            <button
                              onClick={() => handleQuickAction('go-to-deploy')}
                              className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded flex items-center gap-1"
                            >
                              前往部署
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* 打字指示器 */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* 输入框 */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="输入你的问题..."
                  disabled={isTyping}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

