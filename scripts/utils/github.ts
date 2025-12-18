import { exec } from 'child_process';
import { promisify } from 'util';
import type { GitHubRepo, GitHubPagesInfo } from '../types';

const execAsync = promisify(exec);

// GitHub CLI path - try to find it in common locations
const GH_CLI_PATHS = [
  'gh', // In PATH
  'C:\\Program Files\\GitHub CLI\\gh.exe', // Default Windows install
  'C:\\Program Files (x86)\\GitHub CLI\\gh.exe', // 32-bit Windows
];

async function getGhCommand(): Promise<string> {
  for (const path of GH_CLI_PATHS) {
    try {
      await execAsync(`"${path}" --version`);
      return path;
    } catch {
      continue;
    }
  }
  return 'gh'; // Fallback to 'gh' in PATH
}

let ghCommand: string | null = null;

export async function checkGhCliInstalled(): Promise<boolean> {
  try {
    if (!ghCommand) {
      ghCommand = await getGhCommand();
    }
    const { stdout } = await execAsync(`"${ghCommand}" --version`);
    return stdout.includes('gh version');
  } catch {
    return false;
  }
}

export async function checkGhCliAuthenticated(): Promise<boolean> {
  try {
    if (!ghCommand) {
      ghCommand = await getGhCommand();
    }
    await execAsync(`"${ghCommand}" auth status`);
    return true;
  } catch {
    return false;
  }
}

export async function fetchAllRepos(username: string): Promise<GitHubRepo[]> {
  try {
    if (!ghCommand) {
      ghCommand = await getGhCommand();
    }
    const { stdout } = await execAsync(
      `"${ghCommand}" repo list ${username} --limit 1000 --json nameWithOwner,name,url,homepageUrl,description,isPrivate,pushedAt,createdAt`
    );
    const repos = JSON.parse(stdout);
    return repos;
  } catch (error: any) {
    if (error.message.includes('rate limit')) {
      throw new Error('GitHub API rate limit exceeded. Please wait and try again later.');
    }
    throw new Error(`Failed to fetch repositories: ${error.message}`);
  }
}

export async function checkGitHubPages(repoFullName: string): Promise<GitHubPagesInfo> {
  try {
    if (!ghCommand) {
      ghCommand = await getGhCommand();
    }
    const { stdout } = await execAsync(
      `"${ghCommand}" api repos/${repoFullName}/pages --jq "{html_url: .html_url, status: .status}"`
    );
    const data = JSON.parse(stdout);
    return {
      enabled: true,
      url: data.html_url,
      status: null, // Will be checked by deployment checker
    };
  } catch (error: any) {
    // 404 means Pages not enabled
    if (error.message.includes('404') || error.message.includes('Not Found')) {
      return { enabled: false, url: null, status: null };
    }
    // Other errors
    return { enabled: false, url: null, status: 'error' };
  }
}
