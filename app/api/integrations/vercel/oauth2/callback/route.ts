import { NextRequest, NextResponse } from 'next/server';

// Vercel OAuth回调处理
// 注意：我们使用VERCEL_TOKEN方式，不需要OAuth回调
// 这个路由只是为了处理Vercel可能的回调请求，避免404错误

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  
  // 如果Vercel尝试回调，重定向到部署页面
  // 因为我们使用Token方式，不需要OAuth流程
  const redirectUrl = new URL('/deploy', request.url);
  
  // 添加提示信息
  redirectUrl.searchParams.set('vercel_oauth', 'not_needed');
  redirectUrl.searchParams.set('message', '我们使用VERCEL_TOKEN方式，不需要OAuth授权。请确保已配置VERCEL_TOKEN环境变量。');
  
  return NextResponse.redirect(redirectUrl);
}

