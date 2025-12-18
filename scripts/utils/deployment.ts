import https from 'https';
import http from 'http';
import type { DeploymentStatus } from '../types';

export async function checkUrlAccessibility(url: string): Promise<DeploymentStatus> {
  const startTime = Date.now();

  return new Promise((resolve) => {
    try {
      const urlObj = new URL(url);
      const protocol = urlObj.protocol === 'https:' ? https : http;

      const request = protocol.request(
        url,
        { method: 'HEAD', timeout: 10000 },
        (res) => {
          const responseTime = Date.now() - startTime;
          resolve({
            url,
            accessible: res.statusCode! >= 200 && res.statusCode! < 400,
            statusCode: res.statusCode!,
            responseTime,
            error: null,
          });
        }
      );

      request.on('error', (error) => {
        resolve({
          url,
          accessible: false,
          statusCode: null,
          responseTime: null,
          error: error.message,
        });
      });

      request.on('timeout', () => {
        request.destroy();
        resolve({
          url,
          accessible: false,
          statusCode: null,
          responseTime: null,
          error: 'Request timeout (10s)',
        });
      });

      request.end();
    } catch (error: any) {
      resolve({
        url,
        accessible: false,
        statusCode: null,
        responseTime: null,
        error: error.message,
      });
    }
  });
}

export async function checkMultipleUrls(
  urls: string[],
  concurrency: number = 5
): Promise<DeploymentStatus[]> {
  if (urls.length === 0) {
    return [];
  }

  const results: DeploymentStatus[] = [];

  for (let i = 0; i < urls.length; i += concurrency) {
    const batch = urls.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map(url => checkUrlAccessibility(url))
    );
    results.push(...batchResults);

    // Wait 1 second between batches to be respectful
    if (i + concurrency < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
}
