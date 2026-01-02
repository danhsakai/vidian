# 📸 Image Toolkit - Compress & CDN URL Converter

Batch compress images to WebP format with watermark and convert GitHub URLs to jsDelivr CDN URLs.

## ✨ Features

**Image Compression:**
- ✅ Convert JPG/PNG to WebP (30-50% smaller)
- ✅ Add watermark "Từ Tỉnh" automatically
- ✅ Backup original files
- ✅ High quality compression (80%)
- ✅ Fast processing with Sharp
- ✅ No API key needed
- ✅ Offline processing

**URL Conversion:**
- ✅ Convert GitHub raw URLs to jsDelivr CDN URLs
- ✅ Support batch conversion (multiple URLs)
- ✅ Auto-change file extension (jpg → webp)
- ✅ Fast CDN delivery worldwide

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Compress images with watermark
```bash
npm run compress
```

### 3. Compress without watermark
```bash
npm run compress:no-watermark
```

### 4. Convert GitHub URLs to CDN URLs
```bash
# Single URL
node convert-cdn-url.js "https://raw.githubusercontent.com/danhsakai/vidian/refs/heads/main/Cover/image.jpg"

# With extension change (jpg → webp)
node convert-cdn-url.js --ext webp "https://raw.githubusercontent.com/danhsakai/vidian/refs/heads/main/Cover/image.jpg"

# Multiple URLs
node convert-cdn-url.js --ext webp "URL1" "URL2" "URL3"
```

## 📋 What it does

1. **Backup** original images to `Cover-backup/`
2. **Add watermark** "Từ Tỉnh" (bottom-right, white, 50% opacity)
3. **Convert** to WebP format
4. **Compress** with 80% quality
5. **Save** to `Cover/` folder

## ⚙️ Configuration

Edit `compress-images.js` to customize:

```javascript
const CONFIG = {
  inputFolder: './Cover',
  backupFolder: './Cover-backup',
  
  quality: {
    webp: 80    // 1-100 (higher = better quality)
  },
  
  watermark: {
    text: 'Từ Tỉnh',
    fontSize: 48,
    fontColor: 'rgba(255, 255, 255, 0.5)',
    position: 'bottom-right',  // bottom-right, bottom-left, top-right, top-left, center
    padding: 20
  }
};
```

## 📊 Expected Results

For a 150KB JPG image:
- **Original:** 150.00 KB (JPG)
- **Compressed:** 60-80 KB (WebP)
- **Saved:** 40-50%
- **Watermark:** "Từ Tỉnh" added

## 🎨 Watermark Positions

Change `position` in CONFIG:
- `bottom-right` (default)
- `bottom-left`
- `top-right`
- `top-left`
- `center`

## 📝 Notes

- Original files are backed up to `Cover-backup/`
- Output files are WebP format
- Original JPG files remain in `Cover/` (you can delete manually)
- Watermark uses system fonts (Arial/Helvetica)
- jsDelivr CDN provides free, fast global delivery
- CDN URLs cache automatically for better performance

## 🌐 URL Conversion Examples

**Input (GitHub Raw):**
```
https://raw.githubusercontent.com/danhsakai/vidian/refs/heads/main/Cover/86f9311ab74f7f7e540e955791452828.jpg
```

**Output (jsDelivr CDN):**
```
https://cdn.jsdelivr.net/gh/danhsakai/vidian@main/Cover/86f9311ab74f7f7e540e955791452828.jpg
```

**With extension change:**
```bash
node convert-cdn-url.js --ext webp "https://raw.githubusercontent.com/..."
# Output: https://cdn.jsdelivr.net/gh/danhsakai/vidian@main/Cover/image.webp
```

## 🔄 Complete Workflow

1. **Compress images** with watermark:
   ```bash
   npm run compress
   ```

2. **Upload to GitHub**:
   ```bash
   git add Cover/*.webp
   git commit -m "Add compressed images"
   git push
   ```

3. **Convert URLs** to CDN format:
   ```bash
   node convert-cdn-url.js --ext webp "https://raw.githubusercontent.com/danhsakai/vidian/refs/heads/main/Cover/image.jpg"
   ```

4. **Use CDN URL** in your HTML:
   ```html
   <img src="https://cdn.jsdelivr.net/gh/danhsakai/vidian@main/Cover/image.webp" alt="Image">
   ```

## 🔧 Troubleshooting

**Error: Sharp installation failed**
```bash
npm install --platform=linux --arch=x64 sharp
```

**Watermark not showing**
- Check font is available on system
- Adjust `fontSize` and `fontColor` in CONFIG

## 📦 Dependencies

- [Sharp](https://sharp.pixelplumbing.com/) - High performance image processing
- [Chalk](https://github.com/chalk/chalk) - Terminal styling

## 📄 License

MIT
