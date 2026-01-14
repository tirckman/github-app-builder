'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { getGitHubUser, getGitHubToken, isGitHubConnected } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { CheckCircle, ExternalLink, Loader2, Rocket, Github, ArrowRight, Copy, Share2, ChevronRight, Info } from 'lucide-react';
import Image from 'next/image';

export default function DeployPage() {
  const router = useRouter();
  const { selectedTemplate, deployStatus, setDeployStatus, setDeployUrl } = useAppStore();
  const [progress, setProgress] = useState(0);
  const [deployStep, setDeployStep] = useState(1); // 1: GitHub, 2: Repo, 3: Vercel, 4: Building, 5: Success
  const [config, setConfig] = useState({
    githubConnected: false,
    githubUsername: '',
    githubAvatar: '',
    repoName: '',
    repoUrl: '',
    vercelConnected: false,
    deployUrl: '',
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentId, setDeploymentId] = useState<string | null>(null);
  const [hasCheckedGitHub, setHasCheckedGitHub] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // 等待zustand persist完成hydration
  useEffect(() => {
    // 只在客户端执行
    if (typeof window === 'undefined') return;
    
    // 检查是否已经hydrated
    const checkHydrated = () => {
      try {
        // 尝试访问persist状态
        const state = useAppStore.getState();
        setIsHydrated(true);
      } catch {
        // 如果出错，等待一下再试
        setTimeout(checkHydrated, 100);
      }
    };
    
    // 立即检查一次
    checkHydrated();
  }, []);

  useEffect(() => {
    // 等待hydration完成
    if (!isHydrated) return;

    // 延迟检查，给状态恢复一些时间（从localStorage恢复）
    const checkTemplate = setTimeout(() => {
      // 再次从store获取最新状态（可能已经从localStorage恢复）
      const currentState = useAppStore.getState();
      const currentTemplate = currentState.selectedTemplate;
      
      // 检查是否有模板，如果没有则跳转到定制化页面
      if (!currentTemplate) {
        // 先检查是否有定制化配置，如果有则跳转到定制化页面，否则跳转到模板选择
        if (currentState.customization) {
          router.push('/customize');
        } else {
          router.push('/browse-templates');
        }
        return;
      }
    }, 500); // 增加延迟到500ms，确保localStorage已恢复

    return () => clearTimeout(checkTemplate);
  }, [selectedTemplate, router, isHydrated]);

  // 单独的useEffect处理GitHub OAuth回调
  useEffect(() => {
    // 等待hydration完成
    if (!isHydrated) return;
    
    if (!selectedTemplate) return; // 如果没有模板，不处理OAuth

    // 只在客户端执行（检查window对象）
    if (typeof window === 'undefined') return;

    // 检查URL参数，判断是否是OAuth回调
    const urlParams = new URLSearchParams(window.location.search);
    const isOAuthCallback = urlParams.get('github_connected') === 'true';
    const vercelOAuth = urlParams.get('vercel_oauth');
    
    // 如果是Vercel OAuth回调（不需要），显示提示并清理URL
    if (vercelOAuth === 'not_needed') {
      const message = urlParams.get('message');
      if (message) {
        alert(message);
      }
      // 清理URL参数
      window.history.replaceState({}, '', '/deploy');
    }
    
    // 如果是OAuth回调，清理URL参数
    if (isOAuthCallback) {
      window.history.replaceState({}, '', '/deploy');
    }

    // 只检查一次GitHub登录状态，避免循环
    if (hasCheckedGitHub && !isOAuthCallback) return;

    // 检查GitHub登录状态
    const checkGitHubStatus = () => {
      // OAuth回调后需要更长的延迟，确保cookie已经设置
      const delay = isOAuthCallback ? 1500 : 100;
      
      setTimeout(() => {
        // 多次尝试读取cookie，因为可能还没完全设置好
        let attempts = 0;
        const maxAttempts = 5; // 增加尝试次数
        
        const tryReadCookie = () => {
          attempts++;
          if (isGitHubConnected()) {
            const user = getGitHubUser();
            if (user) {
              console.log('GitHub connected:', user.login); // 调试日志
              setConfig(prev => ({
                ...prev,
                githubConnected: true,
                githubUsername: user.login,
                githubAvatar: user.avatar_url,
              }));
              // 如果已连接且还在第一步，自动进入下一步
              if (deployStep === 1) {
                setDeployStep(2);
              }
              setHasCheckedGitHub(true);
              return;
            }
          }
          
          // 如果还没读取到，且还有尝试次数，继续尝试
          if (attempts < maxAttempts && isOAuthCallback) {
            console.log(`尝试读取GitHub状态 (${attempts}/${maxAttempts})`); // 调试日志
            setTimeout(tryReadCookie, 400);
          } else {
            console.log('GitHub状态检查完成，未连接'); // 调试日志
            setHasCheckedGitHub(true);
          }
        };
        
        tryReadCookie();
      }, delay);
    };

    checkGitHubStatus();
  }, [selectedTemplate, deployStep, hasCheckedGitHub, isHydrated]);

  // 监听进度变化，当达到100%时更新部署状态
  useEffect(() => {
    if (progress >= 100 && deployStep === 4) {
      setDeployStatus('success');
      setDeployUrl(`https://${config.repoName || 'your-app'}.vercel.app`);
      setDeployStep(5);
    }
  }, [progress, deployStep, config.repoName, setDeployStatus, setDeployUrl]);

  const handleConnectGitHub = () => {
    // 跳转到GitHub OAuth授权
    window.location.href = '/api/auth/github?redirect=/deploy';
  };

  const handleCreateRepo = async () => {
    if (!config.repoName.trim()) {
      alert('请输入仓库名称');
      return;
    }

    // 验证仓库名称格式
    if (!/^[a-zA-Z0-9._-]+$/.test(config.repoName)) {
      alert('仓库名称只能包含字母、数字、点、连字符和下划线');
      return;
    }

    // 检查GitHub连接状态（使用github_user cookie，因为github_token是httpOnly）
    if (!isGitHubConnected()) {
      alert('请先连接GitHub账号');
      return;
    }

    try {
      setIsDeploying(true);
      // 不传递token，让API从httpOnly cookie中读取
      const response = await fetch('/api/github/create-repo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: config.repoName,
          // token从httpOnly cookie中读取，不需要传递
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '创建仓库失败');
      }

      setConfig(prev => ({
        ...prev,
        repoUrl: data.repo.html_url,
      }));
      setDeployStep(3);
    } catch (error: any) {
      alert(error.message || '创建仓库失败，请重试');
    } finally {
      setIsDeploying(false);
    }
  };

  const handleConnectVercel = async () => {
    if (!config.repoUrl) {
      alert('请先创建GitHub仓库');
      return;
    }

    try {
      setIsDeploying(true);
      setDeployStep(4);

      // 调用Vercel部署API
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repoUrl: config.repoUrl,
          repoName: config.repoName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error || '部署失败';
        
        // 如果是GitHub集成问题
        if (errorMessage.includes('GitHub integration') || errorMessage.includes('integration')) {
          const shouldInstall = confirm(
            '需要安装GitHub集成才能自动部署。\n\n' +
            '选项1：点击"确定"跳转到Vercel安装GitHub集成（推荐）\n' +
            '选项2：点击"取消"使用手动部署\n\n' +
            '安装完成后，重新尝试自动部署。'
          );
          
          if (shouldInstall) {
            // 提供手动安装指引
            const manualSteps = 
              'GitHub集成手动安装步骤：\n\n' +
              '方法1（推荐）：\n' +
              '1. 访问：https://vercel.com/new\n' +
              '2. 点击"Import Git Repository"\n' +
              '3. 如果没有GitHub选项，会提示安装\n' +
              '4. 按照提示安装GitHub集成\n\n' +
              '方法2：\n' +
              '1. 访问：https://vercel.com/account\n' +
              '2. 点击"Git"或"Integrations"\n' +
              '3. 找到GitHub，点击"Connect"\n\n' +
              '安装完成后，返回此页面重新尝试部署。';
            
            alert(manualSteps);
            
            // 尝试打开新建项目页面（通常会有安装提示）
            window.open('https://vercel.com/new', '_blank');
            return;
          } else if (config.repoUrl) {
            // 提供手动部署选项
            window.open(`https://vercel.com/new?import=${encodeURIComponent(config.repoUrl)}`, '_blank');
            alert('已打开Vercel导入页面。在Vercel中导入GitHub仓库后，你的应用就会自动部署！');
            return;
          }
        }
        
        // 如果是Vercel token未配置
        if (errorMessage.includes('Vercel token not configured') || data.requiresManualDeploy) {
          const shouldManualDeploy = confirm(
            'Vercel自动部署需要配置VERCEL_TOKEN环境变量。\n\n' +
            '选项1：配置VERCEL_TOKEN后重试（自动部署）\n' +
            '选项2：点击"确定"跳转到Vercel手动部署\n\n' +
            '点击"确定"跳转到Vercel，或点击"取消"稍后配置token。'
          );
          
          if (shouldManualDeploy && config.repoUrl) {
            window.open(`https://vercel.com/new?import=${encodeURIComponent(config.repoUrl)}`, '_blank');
            alert('已打开Vercel导入页面。在Vercel中导入GitHub仓库后，你的应用就会自动部署！\n\n仓库地址：' + config.repoUrl);
            return;
          }
        }
        
        throw new Error(errorMessage);
      }

      setDeploymentId(data.deploymentId);
      setConfig(prev => ({
        ...prev,
        vercelConnected: true,
        deployUrl: data.url,
      }));

      // 开始轮询部署状态
      startDeploymentStatusPolling(data.deploymentId);
    } catch (error: any) {
      alert(error.message || '部署失败，请重试');
      setDeployStep(3);
    } finally {
      setIsDeploying(false);
    }
  };

  const startDeploymentStatusPolling = (deploymentId: string) => {
    setDeployStatus('building');
    setProgress(10);

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/deploy/status?id=${deploymentId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || '获取部署状态失败');
        }

        // 更新进度
        setProgress(data.progress);

        if (data.state === 'success') {
          clearInterval(interval);
          setDeployStatus('success');
          setDeployUrl(data.url);
          setDeployStep(5);
        } else if (data.state === 'error') {
          clearInterval(interval);
          setDeployStatus('error');
          alert('部署失败，请检查错误信息');
        }
      } catch (error: any) {
        console.error('Polling error:', error);
        // 继续轮询，不中断
      }
    }, 3000); // 每3秒检查一次

    // 30秒后如果还没完成，停止轮询（避免无限轮询）
    setTimeout(() => {
      clearInterval(interval);
      if (deployStatus !== 'success') {
        // 可以设置一个超时状态
      }
    }, 300000); // 5分钟超时
  };

  const handleCopyLink = async () => {
    const url = useAppStore.getState().deployUrl || `https://${config.repoName || 'your-app'}.vercel.app`;
    try {
      await navigator.clipboard.writeText(url);
      alert('链接已复制到剪贴板！');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('复制失败，请手动复制链接');
    }
  };

  const handleStartOver = () => {
    router.push('/');
  };

  // 如果还没有选择模板，显示加载状态并跳转
  if (!selectedTemplate) {
    // 延迟跳转，避免闪烁
    useEffect(() => {
      const timer = setTimeout(() => {
        const { customization } = useAppStore.getState();
        if (customization) {
          router.push('/customize');
        } else {
          router.push('/browse-templates');
        }
      }, 100);
      return () => clearTimeout(timer);
    }, [router]);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">正在加载...</p>
        </div>
      </div>
    );
  }

  const deployUrl = useAppStore.getState().deployUrl || config.deployUrl || `https://${config.repoName || 'your-app'}.vercel.app`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {deployStep === 5 ? '部署成功！' : '🚀 一键部署'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {deployStep === 5
              ? '你的应用已经成功上线'
              : '按照步骤完成部署，3分钟即可上线'}
          </p>
        </motion.div>

        {/* Step 1: Connect GitHub */}
        {deployStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                授权GitHub
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              我们需要将代码推送到你的GitHub仓库
            </p>

            {!config.githubConnected ? (
              <>
                <button
                  onClick={handleConnectGitHub}
                  className="w-full px-6 py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
                >
                  <Github className="w-5 h-5" />
                  连接GitHub账号
                </button>

                <details className="mt-6">
                  <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    没有GitHub账号？点击查看注册教程
                  </summary>
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-sm space-y-2">
                    <p>1. 访问 github.com</p>
                    <p>2. 点击"Sign up"</p>
                    <p>3. 填写邮箱、密码</p>
                    <p>4. 验证邮箱</p>
                  </div>
                </details>
              </>
            ) : (
              <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
                <CheckCircle className="w-5 h-5" />
                <div className="flex items-center gap-2">
                  {config.githubAvatar && (
                    <Image
                      src={config.githubAvatar}
                      alt={config.githubUsername}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  )}
                  <span>已连接：@{config.githubUsername}</span>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 2: Create Repository */}
        {deployStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                创建代码仓库
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  仓库名称
                </label>
                <input
                  type="text"
                  placeholder="my-awesome-blog"
                  value={config.repoName}
                  onChange={(e) => setConfig({ ...config, repoName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  只能包含字母、数字、连字符
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <div className="flex gap-2">
                  <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-semibold mb-1 text-yellow-900 dark:text-yellow-100">
                      提示
                    </div>
                    <div className="text-yellow-800 dark:text-yellow-200">
                      仓库名称将成为你的网站地址的一部分：
                    </div>
                    <div className="font-mono text-xs mt-1 text-yellow-900 dark:text-yellow-100">
                      https://{config.repoName || 'your-repo'}.vercel.app
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCreateRepo}
                disabled={isDeploying}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeploying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    创建中...
                  </>
                ) : (
                  <>
                    创建仓库
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Connect Vercel */}
        {deployStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                部署到Vercel
              </h2>
            </div>

            <div className="space-y-4">
              {/* 自动部署选项 */}
              <div className="bg-white dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 p-8 text-center rounded-lg">
                <button
                  onClick={handleConnectVercel}
                  disabled={isDeploying}
                  className="px-8 py-4 bg-black dark:bg-white text-white dark:text-gray-900 rounded-lg text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                >
                  {isDeploying ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      部署中...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5" />
                      一键自动部署
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  {isDeploying 
                    ? '正在创建部署，请稍候...' 
                    : '自动部署到Vercel（需要配置VERCEL_TOKEN）'}
                </p>
              </div>

              {/* 手动部署选项 */}
              {config.repoUrl && (
                <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        或者手动部署
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        如果自动部署不可用，你可以手动在Vercel导入GitHub仓库：
                      </p>
                      <a
                        href={`https://vercel.com/new?import=${encodeURIComponent(config.repoUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:shadow-lg transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        在Vercel手动部署
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg text-sm space-y-2">
              <div className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Vercel是什么？
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Vercel是一个免费的网站托管平台，由Next.js团队开发。它提供：
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                <li>免费的HTTPS证书</li>
                <li>全球CDN加速</li>
                <li>每月100GB流量</li>
                <li>自动部署更新</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Step 4: Building */}
        {deployStep === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-8"
          >
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 px-6 py-4 rounded-lg">
                <Loader2 className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-spin" />
                <span className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  正在部署中...
                </span>
              </div>

              <div className="max-w-md mx-auto">
                <div className="space-y-3">
                  {[
                    { label: '推送代码到GitHub', done: true },
                    { label: '连接Vercel', done: true },
                    { label: '构建项目', done: progress > 60, progress: progress > 40 ? Math.min(progress, 80) : 0 },
                    { label: '部署到CDN', done: progress >= 100, progress: progress > 80 ? progress : 0 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {item.done ? (
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full" />
                      )}
                      <span
                        className={`flex-1 ${
                          item.done
                            ? 'text-gray-900 dark:text-gray-100'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.progress !== undefined && item.progress > 0 && !item.done && (
                        <div className="w-24 bg-gray-200 dark:bg-gray-700 h-2 rounded">
                          <div
                            className="bg-blue-500 h-2 rounded transition-all"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {progress}% 完成
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 5: Success */}
        {deployStep === 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-8"
          >
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="text-6xl"
              >
                🎉
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                部署成功！
              </h2>

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  你的网站地址：
                </div>
                <a
                  href={deployUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-mono text-purple-600 dark:text-purple-400 hover:underline flex items-center justify-center gap-2"
                >
                  {deployUrl}
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    应用名称
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {selectedTemplate.name}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    部署时间
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {new Date().toLocaleString('zh-CN')}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href={deployUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  <Rocket className="w-5 h-5" />
                  访问网站
                </a>
                <button
                  onClick={handleCopyLink}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  复制链接
                </button>
                <button
                  onClick={handleStartOver}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  创建新应用
                </button>
              </div>

              <div className="mt-8 text-left bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg">
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  🎓 接下来可以做什么？
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <span>1️⃣</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        绑定自定义域名
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        在Vercel控制台绑定你自己的域名
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span>2️⃣</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        编辑内容
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        在GitHub仓库中修改文件，自动重新部署
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span>3️⃣</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        添加更多功能
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        回到平台继续定制你的应用
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={5} />
      </div>
    </div>
  );
}
