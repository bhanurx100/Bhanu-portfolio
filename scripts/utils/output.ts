import fs from 'fs/promises';
import path from 'path';
import type { FullReport } from '../types';

export async function generateJsonReport(report: FullReport): Promise<void> {
  const outputDir = path.join(process.cwd(), 'output');
  const outputPath = path.join(outputDir, 'repos-report.json');

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(report, null, 2), 'utf-8');
}

export async function generateMarkdownReport(report: FullReport): Promise<void> {
  const outputDir = path.join(process.cwd(), 'output');
  const outputPath = path.join(outputDir, 'repos-report.md');

  let markdown = `# GitHub Repository Deployment Report\n\n`;
  markdown += `**Username:** ${report.username}\n`;
  markdown += `**Total Repositories:** ${report.totalRepos} (${report.publicRepos} public, ${report.privateRepos} private)\n`;
  markdown += `**With Active Deployments:** ${report.reposWithDeployments}\n`;
  markdown += `**Generated:** ${new Date(report.generatedAt).toLocaleString()}\n\n`;
  markdown += `---\n\n`;

  // Separate repos into those with and without deployments
  const reposWithDeployments = report.repositories.filter(
    r => (r.homepageDeployment?.accessible) || (r.githubPages.status === 'active')
  );
  const reposWithoutDeployments = report.repositories.filter(
    r => !(r.homepageDeployment?.accessible) && r.githubPages.status !== 'active'
  );

  // Repos with active deployments
  if (reposWithDeployments.length > 0) {
    markdown += `## Repositories with Active Deployments\n\n`;
    reposWithDeployments.forEach((repoReport, index) => {
      markdown += `### ${index + 1}. ${repoReport.repo.name}\n`;
      markdown += `- **GitHub:** ${repoReport.repo.url}\n`;
      if (repoReport.repo.description) {
        markdown += `- **Description:** ${repoReport.repo.description}\n`;
      }
      if (repoReport.repo.isPrivate) {
        markdown += `- **Visibility:** Private\n`;
      }

      markdown += `- **Deployments:**\n`;

      if (repoReport.homepageDeployment) {
        const status = repoReport.homepageDeployment.accessible
          ? `✓ Active - ${repoReport.homepageDeployment.responseTime}ms`
          : `✗ Inactive`;
        markdown += `  - Homepage: ${repoReport.homepageDeployment.url} [${status}]\n`;
      }

      if (repoReport.githubPages.enabled) {
        const status = repoReport.githubPages.status === 'active'
          ? '✓ Active'
          : repoReport.githubPages.status === 'inactive'
          ? '✗ Inactive'
          : '⚠ Error checking';
        markdown += `  - GitHub Pages: ${repoReport.githubPages.url} [${status}]\n`;
      }

      markdown += `\n`;
    });
  }

  // Repos without deployments
  if (reposWithoutDeployments.length > 0) {
    markdown += `## Repositories without Deployments\n\n`;
    reposWithoutDeployments.forEach((repoReport, index) => {
      markdown += `### ${index + 1}. ${repoReport.repo.name}\n`;
      markdown += `- **GitHub:** ${repoReport.repo.url}\n`;
      if (repoReport.repo.description) {
        markdown += `- **Description:** ${repoReport.repo.description}\n`;
      }
      if (repoReport.repo.isPrivate) {
        markdown += `- **Visibility:** Private\n`;
      }

      // Show why there's no deployment
      const reasons: string[] = [];
      if (!repoReport.repo.homepageUrl) {
        reasons.push('No homepage URL set');
      } else if (repoReport.homepageDeployment && !repoReport.homepageDeployment.accessible) {
        reasons.push(`Homepage URL not accessible (${repoReport.homepageDeployment.error || 'Unknown error'})`);
      }
      if (!repoReport.githubPages.enabled) {
        reasons.push('GitHub Pages not enabled');
      } else if (repoReport.githubPages.status !== 'active') {
        reasons.push('GitHub Pages not accessible');
      }

      if (reasons.length > 0) {
        markdown += `- **Status:** ${reasons.join(', ')}\n`;
      }

      markdown += `\n`;
    });
  }

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(outputPath, markdown, 'utf-8');
}

export function printSummary(report: FullReport): void {
  console.log('\n' + '='.repeat(60));
  console.log('           GitHub Repository Deployment Report');
  console.log('='.repeat(60));
  console.log(`\nUsername: ${report.username}`);
  console.log(`Total Repositories: ${report.totalRepos}`);
  console.log(`├─ Public: ${report.publicRepos}`);
  console.log(`└─ Private: ${report.privateRepos}`);
  console.log(`\nDeployment Status:`);
  console.log(`├─ Active Deployments: ${report.reposWithDeployments} repositories`);

  const withPages = report.repositories.filter(r => r.githubPages.status === 'active').length;
  const withHomepage = report.repositories.filter(r => r.homepageDeployment?.accessible).length;

  console.log(`├─ GitHub Pages Active: ${withPages} repositories`);
  console.log(`└─ Homepage URLs Active: ${withHomepage} repositories`);
  console.log('='.repeat(60));
}
