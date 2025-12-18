import {
  checkGhCliInstalled,
  checkGhCliAuthenticated,
  fetchAllRepos,
  checkGitHubPages,
} from './utils/github';
import { checkMultipleUrls } from './utils/deployment';
import { generateJsonReport, generateMarkdownReport, printSummary } from './utils/output';
import type { RepoReport, FullReport } from './types';

const USERNAME = 'gaurav0909-max';

async function main() {
  console.log('🚀 GitHub Repository Deployment Checker\n');

  // Step 1: Validate prerequisites
  console.log('📋 Checking prerequisites...');
  if (!(await checkGhCliInstalled())) {
    console.error('❌ GitHub CLI (gh) is not installed.');
    console.error('   Install it from: https://cli.github.com/');
    process.exit(1);
  }

  if (!(await checkGhCliAuthenticated())) {
    console.error('❌ GitHub CLI is not authenticated.');
    console.error('   Run: gh auth login');
    process.exit(1);
  }
  console.log('✅ Prerequisites met\n');

  // Step 2: Fetch all repositories
  console.log(`📦 Fetching repositories for ${USERNAME}...`);
  const repos = await fetchAllRepos(USERNAME);
  console.log(`✅ Found ${repos.length} repositories\n`);

  if (repos.length === 0) {
    console.log('No repositories found. Exiting.');
    process.exit(0);
  }

  // Step 3: Check each repository
  console.log('🔍 Checking deployments...');
  const repoReports: RepoReport[] = [];

  for (let i = 0; i < repos.length; i++) {
    const repo = repos[i];
    console.log(`   [${i + 1}/${repos.length}] ${repo.nameWithOwner}`);

    // Check GitHub Pages
    const githubPages = await checkGitHubPages(repo.nameWithOwner);

    // Collect URLs to check
    const urlsToCheck: string[] = [];
    if (repo.homepageUrl) urlsToCheck.push(repo.homepageUrl);
    if (githubPages.url) urlsToCheck.push(githubPages.url);

    // Check URL accessibility
    const deploymentStatuses = await checkMultipleUrls(urlsToCheck, 2);

    // Update GitHub Pages status
    if (githubPages.url) {
      const pagesStatus = deploymentStatuses.find(d => d.url === githubPages.url);
      githubPages.status = pagesStatus?.accessible ? 'active' : 'inactive';
    }

    repoReports.push({
      repo,
      githubPages,
      homepageDeployment: repo.homepageUrl
        ? deploymentStatuses.find(d => d.url === repo.homepageUrl) || null
        : null,
      otherDeployments: [],
      checkedAt: new Date().toISOString(),
    });
  }

  // Step 4: Generate report
  console.log('\n📊 Generating reports...');
  const fullReport: FullReport = {
    username: USERNAME,
    totalRepos: repos.length,
    publicRepos: repos.filter(r => !r.isPrivate).length,
    privateRepos: repos.filter(r => r.isPrivate).length,
    reposWithDeployments: repoReports.filter(
      r => r.homepageDeployment?.accessible || r.githubPages.status === 'active'
    ).length,
    generatedAt: new Date().toISOString(),
    repositories: repoReports,
  };

  // Save outputs
  await generateJsonReport(fullReport);
  await generateMarkdownReport(fullReport);

  // Print summary
  printSummary(fullReport);

  console.log('\n✅ Done! Reports saved to:');
  console.log('   - output/repos-report.json');
  console.log('   - output/repos-report.md\n');
}

main().catch(error => {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
});
