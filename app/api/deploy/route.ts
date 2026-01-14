import { NextRequest, NextResponse } from 'next/server';

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID; // 可选，团队账号需要

export async function POST(request: NextRequest) {
  if (!VERCEL_TOKEN) {
    return NextResponse.json(
      { 
        error: 'Vercel token not configured',
        message: 'Vercel自动部署功能需要配置VERCEL_TOKEN环境变量。你可以：1) 在Vercel控制台配置token启用自动部署，或 2) 手动在Vercel导入GitHub仓库进行部署。',
        requiresManualDeploy: true
      },
      { status: 500 }
    );
  }

  try {
    const { repoUrl, repoName } = await request.json();

    if (!repoUrl || !repoName) {
      return NextResponse.json(
        { error: 'Repository URL and name are required' },
        { status: 400 }
      );
    }

    // 从GitHub URL提取所有者和仓库名
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      return NextResponse.json(
        { error: 'Invalid GitHub URL' },
        { status: 400 }
      );
    }

    const [_, owner, repo] = match;
    const repoFullName = `${owner}/${repo}`;

    // 首先创建或获取项目（Vercel需要先有项目才能部署）
    let projectId = repoName;
    
    // 检查项目是否存在
    const projectCheckUrl = `https://api.vercel.com/v9/projects/${projectId}${VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : ''}`;
    const projectResponse = await fetch(projectCheckUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
      },
    });

    // 如果项目不存在，创建项目
    if (projectResponse.status === 404) {
      const createProjectResponse = await fetch('https://api.vercel.com/v9/projects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${VERCEL_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: repoName,
          gitRepository: {
            type: 'github',
            repo: repoFullName,
          },
          framework: 'nextjs',
          ...(VERCEL_TEAM_ID && { teamId: VERCEL_TEAM_ID }),
        }),
      });

      if (!createProjectResponse.ok) {
        const error = await createProjectResponse.json();
        throw new Error(error.error?.message || 'Failed to create project. Make sure the GitHub repository is connected to Vercel.');
      }
    } else if (!projectResponse.ok) {
      const error = await projectResponse.json();
      throw new Error(error.error?.message || 'Failed to check project');
    }

    // 创建部署（使用项目名称）
    const deployResponse = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: repoName,
        project: projectId,
        gitSource: {
          type: 'github',
          repo: repoFullName,
          ref: 'main',
        },
        ...(VERCEL_TEAM_ID && { teamId: VERCEL_TEAM_ID }),
      }),
    });

    if (!deployResponse.ok) {
      const error = await deployResponse.json();
      throw new Error(error.error?.message || 'Deployment failed');
    }

    const deployment = await deployResponse.json();

    return NextResponse.json({
      success: true,
      deploymentId: deployment.id,
      url: deployment.url || `https://${deployment.name}.vercel.app`,
      inspectorUrl: deployment.inspectorUrl,
    });
  } catch (error: any) {
    console.error('Deployment error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Deployment failed' },
      { status: 500 }
    );
  }
}

