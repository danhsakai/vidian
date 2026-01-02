const sharp = require('sharp');
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const chalk = require('chalk');

// ============================================
// CẤU HÌNH
// ============================================
const CONFIG = {
  inputFolder: './Cover',
  backupFolder: './Cover-backup',
  outputFolder: './Cover',  // Ghi đè hoặc tạo file mới
  
  // Cấu hình nén
  quality: {
    webp: 80     // 1-100, cao = chất lượng tốt nhưng nặng
  },
  
  // Watermark
  watermark: {
    enabled: !process.argv.includes('--no-watermark'),
    text: 'Từ Tỉnh',
    fontSize: 48,
    fontColor: 'rgba(255, 255, 255, 0.5)',  // Trắng, 50% opacity
    position: 'bottom-right',  // bottom-right, bottom-left, top-right, top-left, center
    padding: 20
  },
  
  // Format hỗ trợ (CHỈ xử lý file gốc, BỎ QUA .webp)
  supportedFormats: ['.jpg', '.jpeg', '.png'],
  
  // Options
  convertToWebP: true,
  createBackup: true,
  stripMetadata: true  // Xóa EXIF để nhẹ hơn
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Lấy kích thước file (KB)
async function getFileSizeKB(filePath) {
  const stats = await fs.stat(filePath);
  return (stats.size / 1024).toFixed(2);
}

// Tạo backup folder
async function createBackupFolder() {
  try {
    await fs.access(CONFIG.backupFolder);
  } catch {
    await fs.mkdir(CONFIG.backupFolder, { recursive: true });
    console.log(chalk.green('✅ Created backup folder:'), CONFIG.backupFolder);
  }
}

// Backup file gốc
async function backupFile(fileName) {
  const sourcePath = path.join(CONFIG.inputFolder, fileName);
  const backupPath = path.join(CONFIG.backupFolder, fileName);
  
  // Chỉ backup nếu chưa có trong backup folder
  try {
    await fs.access(backupPath);
    console.log(chalk.gray(`📁 Already backed up: ${fileName}`));
  } catch {
    await fs.copyFile(sourcePath, backupPath);
    console.log(chalk.gray(`📁 Backed up: ${fileName}`));
  }
}

// Kiểm tra file có phải ảnh gốc không (BỎ QUA .webp đã nén)
function isImageFile(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  
  // Bỏ qua file WebP (đã được nén rồi)
  if (ext === '.webp') {
    return false;
  }
  
  return CONFIG.supportedFormats.includes(ext);
}

// Format số với màu
function formatSize(kb) {
  return chalk.cyan(`${kb} KB`);
}

function formatPercent(percent) {
  if (percent > 50) return chalk.green(`${percent}%`);
  if (percent > 30) return chalk.yellow(`${percent}%`);
  return chalk.red(`${percent}%`);
}

// ============================================
// TẠO WATERMARK SVG
// ============================================

function createWatermarkSVG(text, width, height) {
  const { fontSize, fontColor, position, padding } = CONFIG.watermark;
  
  // Tính toán vị trí
  let x, y, anchor;
  
  switch(position) {
    case 'bottom-right':
      x = width - padding;
      y = height - padding;
      anchor = 'end';
      break;
    case 'bottom-left':
      x = padding;
      y = height - padding;
      anchor = 'start';
      break;
    case 'top-right':
      x = width - padding;
      y = padding + fontSize;
      anchor = 'end';
      break;
    case 'top-left':
      x = padding;
      y = padding + fontSize;
      anchor = 'start';
      break;
    case 'center':
      x = width / 2;
      y = height / 2;
      anchor = 'middle';
      break;
    default:
      x = width - padding;
      y = height - padding;
      anchor = 'end';
  }
  
  return Buffer.from(`
    <svg width="${width}" height="${height}">
      <style>
        .watermark {
          font-family: 'Arial', 'Helvetica', sans-serif;
          font-size: ${fontSize}px;
          font-weight: bold;
          fill: ${fontColor};
        }
      </style>
      <text
        x="${x}"
        y="${y}"
        text-anchor="${anchor}"
        class="watermark"
      >${text}</text>
    </svg>
  `);
}

// ============================================
// NÉN ẢNH VÀ THÊM WATERMARK
// ============================================

async function compressImage(fileName) {
  const inputPath = path.join(CONFIG.inputFolder, fileName);
  const ext = path.extname(fileName).toLowerCase();
  
  // Kiểm tra xem file WebP đã tồn tại chưa
  const outputFileName = fileName.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const outputPath = path.join(CONFIG.outputFolder, outputFileName);
  
  try {
    // Kiểm tra file WebP đã tồn tại chưa
    const webpExists = fsSync.existsSync(outputPath);
    if (webpExists) {
      console.log(chalk.yellow(`⏭️  Skipped (WebP already exists): ${fileName} → ${outputFileName}`));
      return {
        fileName: outputFileName,
        originalFileName: fileName,
        skipped: true
      };
    }
    
    // Lấy kích thước ban đầu
    const originalSize = parseFloat(await getFileSizeKB(inputPath));
    
    // Backup nếu cần
    if (CONFIG.createBackup) {
      await backupFile(fileName);
    }
    
    console.log(chalk.blue(`\n🔄 Processing: ${fileName}`));
    
    // Khởi tạo Sharp
    let sharpInstance = sharp(inputPath);
    
    // Lấy metadata
    const metadata = await sharpInstance.metadata();
    console.log(chalk.gray(`   Dimensions: ${metadata.width}x${metadata.height}`));
    console.log(chalk.gray(`   Format: ${metadata.format}`));
    
    // Thêm watermark nếu enabled
    if (CONFIG.watermark.enabled) {
      const watermarkSVG = createWatermarkSVG(
        CONFIG.watermark.text,
        metadata.width,
        metadata.height
      );
      
      sharpInstance = sharpInstance.composite([{
        input: watermarkSVG,
        top: 0,
        left: 0
      }]);
      
      console.log(chalk.gray(`   Watermark: "${CONFIG.watermark.text}" added`));
    }
    
    // Convert sang WebP
    await sharpInstance
      .webp({ 
        quality: CONFIG.quality.webp,
        effort: 6  // 0-6, cao = nén tốt hơn nhưng chậm hơn
      })
      .toFile(outputPath);
    
    const compressedSize = parseFloat(await getFileSizeKB(outputPath));
    const saved = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);
    
    console.log(chalk.green(`✅ Converted to WebP: ${outputFileName}`));
    console.log(`   Original: ${formatSize(originalSize)}`);
    console.log(`   Compressed: ${formatSize(compressedSize)}`);
    console.log(`   Saved: ${formatPercent(saved)}`);
    
    return {
      fileName: outputFileName,
      originalFileName: fileName,
      originalSize,
      compressedSize,
      savedPercent: parseFloat(saved),
      format: 'webp',
      hasWatermark: CONFIG.watermark.enabled
    };
    
  } catch (error) {
    console.error(chalk.red(`❌ Error: ${fileName}`), error.message);
    return null;
  }
}

// ============================================
// HÀM CHÍNH
// ============================================

async function main() {
  console.log(chalk.bold.cyan('\n🚀 Sharp Image Compressor with Watermark\n'));
  console.log(chalk.gray('='.repeat(60)));
  
  // Kiểm tra input folder
  try {
    await fs.access(CONFIG.inputFolder);
  } catch {
    console.error(chalk.red(`\n❌ Error: Folder "${CONFIG.inputFolder}" not found`));
    process.exit(1);
  }
  
  // Tạo backup folder
  if (CONFIG.createBackup) {
    await createBackupFolder();
  }
  
  // Hiển thị config
  console.log(chalk.gray('\n📋 Configuration:'));
  console.log(chalk.gray(`   Input folder: ${CONFIG.inputFolder}`));
  console.log(chalk.gray(`   Backup folder: ${CONFIG.backupFolder}`));
  console.log(chalk.gray(`   Output format: WebP`));
  console.log(chalk.gray(`   WebP quality: ${CONFIG.quality.webp}%`));
  console.log(chalk.gray(`   Watermark: ${CONFIG.watermark.enabled ? `"${CONFIG.watermark.text}"` : 'Disabled'}`));
  if (CONFIG.watermark.enabled) {
    console.log(chalk.gray(`   Watermark position: ${CONFIG.watermark.position}`));
  }
  
  // Lấy danh sách file
  const files = await fs.readdir(CONFIG.inputFolder);
  const imageFiles = files.filter(isImageFile);
  
  if (imageFiles.length === 0) {
    console.log(chalk.yellow('\n⚠️  No source images found (JPG/PNG)'));
    console.log(chalk.gray('   Note: WebP files are skipped to avoid re-compression'));
    process.exit(0);
  }
  
  console.log(chalk.gray(`\n📸 Found ${imageFiles.length} source image(s) to process`));
  console.log(chalk.gray('='.repeat(60)));
  
  // Nén từng ảnh
  const results = [];
  for (const file of imageFiles) {
    const result = await compressImage(file);
    if (result) results.push(result);
  }
  
  // Tổng kết
  console.log(chalk.gray('\n' + '='.repeat(60)));
  console.log(chalk.bold.cyan('\n📊 SUMMARY\n'));
  
  const successResults = results.filter(r => !r.skipped);
  const skippedResults = results.filter(r => r.skipped);
  
  console.log(chalk.white(`Total images found: ${results.length}`));
  console.log(chalk.green(`Successfully compressed: ${successResults.length}`));
  if (skippedResults.length > 0) {
    console.log(chalk.yellow(`Skipped (already exists): ${skippedResults.length}`));
  }
  
  if (successResults.length > 0) {
    const totalOriginal = successResults.reduce((sum, r) => sum + r.originalSize, 0);
    const totalCompressed = successResults.reduce((sum, r) => sum + r.compressedSize, 0);
    const totalSaved = totalOriginal - totalCompressed;
    const avgPercent = (totalSaved / totalOriginal * 100).toFixed(2);
    
    console.log(`\nTotal original size: ${formatSize(totalOriginal.toFixed(2))}`);
    console.log(`Total compressed size: ${formatSize(totalCompressed.toFixed(2))}`);
    console.log(`Total saved: ${formatSize(totalSaved.toFixed(2))} ${formatPercent(avgPercent)}`);
    
    console.log(chalk.gray('\n📁 Files created:'));
    successResults.forEach(r => {
      console.log(chalk.gray(`   ${r.originalFileName} → ${r.fileName}`));
    });
  }
  
  if (skippedResults.length > 0) {
    console.log(chalk.gray('\n⏭️  Files skipped (WebP already exists):'));
    skippedResults.forEach(r => {
      console.log(chalk.gray(`   ${r.originalFileName} (${r.fileName} exists)`));
    });
  }
  
  if (CONFIG.createBackup) {
    console.log(chalk.gray(`\n💾 Original files backed up to: ${CONFIG.backupFolder}`));
  }
  
  console.log(chalk.green('\n✅ Done!\n'));
  console.log(chalk.yellow('💡 Tips:'));
  console.log(chalk.gray('   - Use --no-watermark to disable watermark'));
  console.log(chalk.gray('   - Delete WebP files to re-compress with new settings'));
  console.log(chalk.gray('   - Example: npm run compress:no-watermark\n'));
}

// Chạy script
main().catch(error => {
  console.error(chalk.red('\n❌ Fatal error:'), error);
  process.exit(1);
});
