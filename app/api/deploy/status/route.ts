import { NextRequest, NextResponse } from 'next/server';

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

export async function GET(request: NextRequest) {
  if (!VERCEL_TOKEN) {
    return NextResponse.json(
      { error: 'Vercel token not configured' },
      { status: 500 }
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const deploymentId = searchParams.get('id');

    if (!deploymentId) {
      return NextResponse.json(
        { error: 'Deployment ID is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`https://api.vercel.com/v13/deployments/${deploymentId}`, {
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch deployment status');
    }

    const deployment = await response.json();

    // Vercel部署状态映射
    const stateMap: Record<string, string> = {
      'BUILDING': 'building',
      'READY': 'success',
      'ERROR': 'error',
      'CANCELED': 'error',
      'QUEUED': 'building',
    };

    const progressMap: Record<string, number> = {
      'BUILDING': 50,
      'READY': 100,
      'ERROR': 0,
      'CANCELED': 0,
      'QUEUED': 10,
    };

    return NextResponse.json({
      state: stateMap[deployment.readyState] || 'building',
      readyState: deployment.readyState,
      url: deployment.url || `https://${deployment.name}.vercel.app`,
      progress: progressMap[deployment.readyState] || 0,
    });
  } catch (error: any) {
    console.error('Deployment status error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch deployment status' },
      { status: 500 }
    );
  }
}

