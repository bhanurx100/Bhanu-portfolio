export interface GitHubRepo {
  nameWithOwner: string;
  name: string;
  url: string;
  description: string | null;
  homepageUrl: string | null;
  isPrivate: boolean;
  pushedAt: string;
  createdAt: string;
}

export interface GitHubPagesInfo {
  enabled: boolean;
  url: string | null;
  status: 'active' | 'inactive' | 'error' | null;
}

export interface DeploymentStatus {
  url: string;
  accessible: boolean;
  statusCode: number | null;
  responseTime: number | null;
  error: string | null;
}

export interface RepoReport {
  repo: GitHubRepo;
  githubPages: GitHubPagesInfo;
  homepageDeployment: DeploymentStatus | null;
  otherDeployments: DeploymentStatus[];
  checkedAt: string;
}

export interface FullReport {
  username: string;
  totalRepos: number;
  publicRepos: number;
  privateRepos: number;
  reposWithDeployments: number;
  generatedAt: string;
  repositories: RepoReport[];
}
