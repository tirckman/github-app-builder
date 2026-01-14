// GitHub API工具函数

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
}

export async function createGitHubRepo(
  token: string,
  repoName: string,
  description?: string
) {
  const response = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: repoName,
      description: description || 'Created with GitHub App Builder',
      private: false,
      auto_init: true,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create repository');
  }

  return await response.json();
}

export async function getGitHubUser(token: string): Promise<GitHubUser> {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  return await response.json();
}

export async function checkRepoExists(token: string, repoName: string): Promise<boolean> {
  try {
    const user = await getGitHubUser(token);
    const response = await fetch(`https://api.github.com/repos/${user.login}/${repoName}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    return response.ok;
  } catch {
    return false;
  }
}

