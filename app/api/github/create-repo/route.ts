import { NextRequest, NextResponse } from 'next/server';
import { createGitHubRepo, getGitHubUser } from '@/lib/github';

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'Repository name is required' },
        { status: 400 }
      );
    }

    // 从httpOnly cookie中读取token
    const token = request.cookies.get('github_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'GitHub token not found. Please connect your GitHub account first.' },
        { status: 401 }
      );
    }

    // 验证仓库名称格式
    if (!/^[a-zA-Z0-9._-]+$/.test(name)) {
      return NextResponse.json(
        { error: 'Repository name can only contain letters, numbers, dots, hyphens, and underscores' },
        { status: 400 }
      );
    }

    // 获取用户信息
    const user = await getGitHubUser(token);

    // 创建仓库
    const repo = await createGitHubRepo(token, name);

    return NextResponse.json({
      success: true,
      repo: {
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        html_url: repo.html_url,
        clone_url: repo.clone_url,
        owner: {
          login: user.login,
          avatar_url: user.avatar_url,
        },
      },
    });
  } catch (error: any) {
    console.error('Create repo error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create repository' },
      { status: 500 }
    );
  }
}

