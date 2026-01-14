import { NextRequest, NextResponse } from 'next/server';

const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/github/callback`;

export async function GET(request: NextRequest) {
  if (!GITHUB_CLIENT_ID) {
    return NextResponse.json(
      { error: 'GitHub Client ID not configured' },
      { status: 500 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const redirectTo = searchParams.get('redirect') || '/deploy';

  // 构建GitHub OAuth授权URL
  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.append('client_id', GITHUB_CLIENT_ID);
  githubAuthUrl.searchParams.append('redirect_uri', REDIRECT_URI);
  githubAuthUrl.searchParams.append('scope', 'repo,user');
  githubAuthUrl.searchParams.append('state', redirectTo);

  return NextResponse.redirect(githubAuthUrl.toString());
}

