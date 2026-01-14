import { NextRequest, NextResponse } from 'next/server';

// 测试环境变量的API路由（仅用于调试）
export async function GET(request: NextRequest) {
  // 检查环境变量
  const hasClientId = !!process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const hasClientSecret = !!process.env.GITHUB_CLIENT_SECRET;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  
  // 不返回敏感信息，只返回配置状态
  return NextResponse.json({
    status: 'ok',
    env_check: {
      hasClientId,
      hasClientSecret,
      hasAppUrl: !!appUrl,
      appUrl: appUrl || 'not set',
      // 不返回实际的Client ID和Secret
      clientIdLength: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID?.length || 0,
      nodeEnv: process.env.NODE_ENV,
    },
    message: hasClientId && hasClientSecret && appUrl 
      ? '所有环境变量已配置' 
      : '部分环境变量未配置',
  });
}

