# 📝 Vidian - Content Creation Toolkit

**Bộ công cụ tự động hóa để tạo bài viết chất lượng cao từ Markdown**

Vidian giúp bạn tạo các bài viết web chuyên nghiệp một cách nhanh chóng và hiệu quả bằng cách tự động hóa việc xử lý hình ảnh và chuyển đổi nội dung từ Markdown sang HTML.

---

## 🎯 Tính năng chính

### 1️⃣ **Nén & Watermark ảnh tự động**
- ✅ Nén ảnh JPG/PNG → WebP (giảm 60-80% dung lượng)
- ✅ Thêm watermark tùy chỉnh
- ✅ Tự động backup ảnh gốc
- ✅ Xóa metadata (EXIF) để bảo mật

### 2️⃣ **Chuyển đổi Markdown → HTML**
- ✅ Convert Markdown sang HTML với styling đẹp
- ✅ Tự động nhóm ảnh liên tiếp thành gallery
- ✅ **Pattern Expansion** - Tạo gallery siêu nhanh với syntax `{0-5}`
- ✅ Tự động thêm CDN path cho hình ảnh
- ✅ Responsive design cho mobile/tablet/desktop

### 3️⃣ **Workflow tối ưu**
- ✅ Hỗ trợ CLI với nhiều options
- ✅ Template HTML có sẵn
- ✅ CSS classes được định nghĩa rõ ràng
- ✅ Tài liệu hướng dẫn chi tiết

---

## 📦 Cài đặt

```bash
# Clone hoặc tải project về
cd vidian

# Cài đặt dependencies
npm install
```

**Dependencies:**
- `sharp` - Xử lý ảnh (nén, resize, watermark)
- `marked` - Parse Markdown sang HTML
- `chalk` - Hiển thị màu sắc trong terminal

---

## 🚀 Sử dụng nhanh

### Bước 1: Chuẩn bị ảnh

Đặt ảnh gốc (JPG/PNG) vào folder `Cover/`

```bash
# Nén ảnh + thêm watermark
npm run compress

# Hoặc nén không có watermark
npm run compress:no-watermark
```

### Bước 2: Viết nội dung

Tạo file Markdown trong folder `Raw/`:

```markdown
# Tiêu đề bài viết

Nội dung giới thiệu...

## Nhân vật chính

![Nhân vật](NhanVat-{0-5}.webp)

Mô tả nhân vật...
```

### Bước 3: Chuyển đổi sang HTML

```bash
# Convert file mặc định
npm run convert

# Convert file tùy chỉnh
node convert-md-to-html.js -i myfile.md -o output.html
```

### Bước 4: Sử dụng HTML

File HTML đầu ra đã có đầy đủ styling, copy nội dung trong `<article>` tag để đăng bài!

---

## 📁 Cấu trúc thư mục

```
vidian/
├── Cover/                    # Thư mục chứa ảnh đã nén (.webp)
│   ├── NhanVat-0.webp
│   ├── NhanVat-1.webp
│   └── ...
│
├── Cover-backup/             # Backup ảnh gốc (tự động tạo)
│   ├── image1.jpg
│   └── ...
│
├── Raw/                      # Thư mục chứa Markdown & HTML output
│   ├── myfile.md            # File Markdown của bạn
│   ├── myfile-new.html      # HTML sau khi convert
│   └── TEMPLATE-MARKDOWN.md # Template mẫu
│
├── compress-images.js        # Script nén ảnh
├── convert-md-to-html.js     # Script convert Markdown
├── template-post.html        # Template HTML với CSS
├── package.json
│
├── README.md                 # File này
├── GUIDE.md                  # Hướng dẫn chi tiết workflow
├── MARKDOWN-GUIDE.md         # Hướng dẫn viết Markdown
├── README-compress.md        # Hướng dẫn compress ảnh
└── README-convert.md         # Hướng dẫn convert Markdown
```

---

## 💡 Tính năng nổi bật

### 🖼️ Pattern Expansion cho Gallery

**Thay vì viết:**
```markdown
![Character](char-0.webp)
![Character](char-1.webp)
![Character](char-2.webp)
![Character](char-3.webp)
![Character](char-4.webp)
![Character](char-5.webp)
```

**Chỉ cần:**
```markdown
![Character](char-{0-5}.webp)
```

→ **Tiết kiệm 80% thời gian!**

### 🎨 Gallery tự động

Các ảnh liên tiếp được tự động nhóm thành gallery grid (Pinterest style):

```html
<div class="article__gallery-grid">
  <figure class="article__gallery-item">
    <img src="..." alt="..." />
  </figure>
  <!-- Responsive: 3 cột desktop, 2 cột tablet, 1 cột mobile -->
</div>
```

### 🔗 CDN Path tự động

Chỉ ghi tên file trong Markdown:
```markdown
![Alt](image.webp)
```

Tự động thêm CDN path:
```html
<img src="https://cdn.jsdelivr.net/gh/danhsakai/vidian@main/Cover/image.webp" />
```

---

## 📚 Tài liệu

| File | Mô tả |
|------|-------|
| **[GUIDE.md](./GUIDE.md)** | **Hướng dẫn chi tiết từ A-Z** |
| [MARKDOWN-GUIDE.md](./MARKDOWN-GUIDE.md) | Cách viết Markdown hiệu quả |
| [README-compress.md](./README-compress.md) | Chi tiết về nén ảnh |
| [README-convert.md](./README-convert.md) | Chi tiết về convert Markdown |

---

## 🛠️ Commands

### Nén ảnh

```bash
npm run compress                    # Nén + watermark
npm run compress:no-watermark       # Nén không watermark
```

### Convert Markdown

```bash
npm run convert                     # Convert file mặc định
npm run convert:help                # Xem help

# Custom options
node convert-md-to-html.js -i input.md -o output.html
node convert-md-to-html.js -i file.md -t custom-template.html
```

---

## ⚙️ Cấu hình

### Compress Images (`compress-images.js`)

```javascript
const CONFIG = {
  quality: {
    webp: 80          // 1-100, cao = chất lượng tốt
  },
  watermark: {
    text: 'Từ Tỉnh',
    fontSize: 48,
    fontColor: 'rgba(255, 255, 255, 0.5)',
    position: 'bottom-right'
  }
};
```

### Convert Markdown (`convert-md-to-html.js`)

CDN base URL (line ~140):
```javascript
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/danhsakai/vidian@main/Cover/';
```

---

## 🎬 Workflow hoàn chỉnh

```
1. Chuẩn bị ảnh gốc (JPG/PNG)
   ↓
2. npm run compress
   → Tạo file .webp đã nén + watermark
   ↓
3. Viết nội dung Markdown (.md)
   → Dùng pattern {0-5} cho gallery
   ↓
4. npm run convert
   → Tạo file HTML với styling đẹp
   ↓
5. Copy nội dung <article> để đăng bài
   ✅ XONG!
```

**Xem chi tiết trong [GUIDE.md](./GUIDE.md)**

---

## 📝 Ví dụ thực tế

**Input Markdown:**
```markdown
# Nhân vật Thần Quốc Chi Thượng

## Ninh Trường Cửu
![Ninh Trường Cửu](NinhTruongCuu-{0-2}.webp)

## Triệu Tương Nhi  
![Triệu Tương Nhi](TrieuTuongNhi-{0-5}.webp)
```

**Output HTML:**
- Ảnh Ninh Trường Cửu: Gallery 3 ảnh
- Ảnh Triệu Tương Nhi: Gallery 6 ảnh
- Tất cả responsive, có CDN path
- Styling đẹp, ready to publish!

---

## 🤝 Credits

**Author:** danhsakai  
**License:** MIT

---

## 📞 Hỗ trợ

Nếu gặp vấn đề:

1. Đọc [GUIDE.md](./GUIDE.md) - Hướng dẫn chi tiết
2. Kiểm tra [MARKDOWN-GUIDE.md](./MARKDOWN-GUIDE.md) - Cú pháp Markdown
3. Xem file test trong `Raw/` - Ví dụ mẫu

---

## 🎯 Tips

1. **Đặt tên file ảnh có quy tắc:** `NhanVat-0.webp`, `NhanVat-1.webp`...
2. **Dùng pattern cho gallery lớn:** `{0-20}` thay vì viết 21 dòng
3. **Backup trước khi compress:** Script tự động backup nhưng nên giữ bản gốc
4. **Test với file nhỏ trước:** Chạy test với 1-2 ảnh để kiểm tra cấu hình

---

**🚀 Bắt đầu ngay với [GUIDE.md](./GUIDE.md)!**
