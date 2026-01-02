#!/usr/bin/env node

const chalk = require('chalk');

/**
 * Convert GitHub raw URL to jsDelivr CDN URL
 * @param {string} url - GitHub raw URL
 * @param {string} newExt - Optional new file extension (e.g., 'webp')
 * @returns {string} - jsDelivr CDN URL
 */
function convertToCdnUrl(url, newExt = null) {
  // Pattern: https://raw.githubusercontent.com/USER/REPO/refs/heads/BRANCH/PATH
  // Replace with: https://cdn.jsdelivr.net/gh/USER/REPO@BRANCH/PATH
  
  const rawPattern = /^https?:\/\/raw\.githubusercontent\.com\/([^\/]+)\/([^\/]+)\/refs\/heads\/([^\/]+)\/(.+)$/;
  const match = url.match(rawPattern);
  
  if (!match) {
    console.log(chalk.yellow(`⚠️  URL không đúng định dạng GitHub raw: ${url}`));
    return url;
  }
  
  const [, user, repo, branch, path] = match;
  
  let finalPath = path;
  
  // Replace file extension if specified
  if (newExt) {
    finalPath = path.replace(/\.[^.]+$/, `.${newExt}`);
  }
  
  const cdnUrl = `https://cdn.jsdelivr.net/gh/${user}/${repo}@${branch}/${finalPath}`;
  return cdnUrl;
}

/**
 * Process single URL or batch of URLs
 */
function processUrls(urls, newExt = null) {
  console.log(chalk.cyan.bold('\n🔄 Chuyển đổi URL GitHub → jsDelivr CDN\n'));
  
  const results = [];
  
  urls.forEach((url, index) => {
    const originalUrl = url.trim();
    if (!originalUrl) return;
    
    const cdnUrl = convertToCdnUrl(originalUrl, newExt);
    
    if (cdnUrl !== originalUrl) {
      console.log(chalk.green(`✅ [${index + 1}] Đã chuyển đổi:`));
      console.log(chalk.gray(`   FROM: ${originalUrl}`));
      console.log(chalk.cyan(`   TO:   ${cdnUrl}`));
      console.log('');
    }
    
    results.push(cdnUrl);
  });
  
  return results;
}

// CLI Usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(chalk.cyan.bold('\n📘 Cách sử dụng:\n'));
    console.log('  node convert-cdn-url.js <url1> [url2] [url3] ...');
    console.log('  node convert-cdn-url.js --ext webp <url1> [url2] ...\n');
    console.log(chalk.yellow('Ví dụ:'));
    console.log('  node convert-cdn-url.js "https://raw.githubusercontent.com/danhsakai/vidian/refs/heads/main/Cover/image.jpg"');
    console.log('  node convert-cdn-url.js --ext webp "https://raw.githubusercontent.com/danhsakai/vidian/refs/heads/main/Cover/image.jpg"\n');
    console.log(chalk.gray('Options:'));
    console.log('  --ext <extension>  Thay đổi phần mở rộng file (vd: webp, png, jpg)\n');
    process.exit(0);
  }
  
  let newExt = null;
  let urls = args;
  
  // Check for --ext option
  const extIndex = args.indexOf('--ext');
  if (extIndex !== -1 && args[extIndex + 1]) {
    newExt = args[extIndex + 1];
    urls = args.filter((arg, i) => i !== extIndex && i !== extIndex + 1);
  }
  
  const results = processUrls(urls, newExt);
  
  console.log(chalk.green.bold(`\n✨ Hoàn thành! Đã chuyển đổi ${results.length} URL\n`));
}

// Export for use in other scripts
module.exports = { convertToCdnUrl, processUrls };
