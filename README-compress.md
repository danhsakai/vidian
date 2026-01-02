# 📸 Image Compressor - Sharp + Watermark

Batch compress images to WebP format with watermark using Sharp library.

## ✨ Features

- ✅ Convert JPG/PNG to WebP (30-50% smaller)
- ✅ Add watermark "Từ Tỉnh" automatically
- ✅ Backup original files
- ✅ High quality compression (80%)
- ✅ Fast processing with Sharp
- ✅ No API key needed
- ✅ Offline processing

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
