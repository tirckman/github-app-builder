// 客户端认证工具函数

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
}

export function getGitHubToken(): string | null {
  if (typeof window === 'undefined') return null;
  
  const cookies = document.cookie.split('; ');
  const tokenCookie = cookies.find(row => row.startsWith('github_token='));
  
  if (!tokenCookie) return null;
  
  return tokenCookie.split('=')[1];
}

export function getGitHubUser(): GitHubUser | null {
  if (typeof window === 'undefined') return null;
  
  const cookies = document.cookie.split('; ');
  const userCookie = cookies.find(row => row.startsWith('github_user='));
  
  if (!userCookie) return null;
  
  try {
    const userData = decodeURIComponent(userCookie.split('=')[1]);
    return JSON.parse(userData);
  } catch {
    return null;
  }
}

export function isGitHubConnected(): boolean {
  return getGitHubToken() !== null;
}

export function logoutGitHub() {
  if (typeof window === 'undefined') return;
  
  document.cookie = 'github_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'github_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

