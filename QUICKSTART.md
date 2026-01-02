# 🚀 QUICK START - Bắt đầu nhanh trong 5 phút

## 📦 Bước 1: Cài đặt (1 phút)

```bash
cd vidian
npm install
```

## 🖼️ Bước 2: Xử lý ảnh (2 phút)

```bash
# 1. Đặt ảnh JPG/PNG vào folder Cover/
#    Đặt tên: NhanVat-0.jpg, NhanVat-1.jpg, NhanVat-2.jpg...

# 2. Chạy compress
npm run compress

# Kết quả: File .webp đã nén + watermark trong Cover/
```

## ✍️ Bước 3: Viết nội dung (5-10 phút)

Tạo file `Raw/my-article.md`:

```markdown
# Tiêu đề bài viết

Nội dung giới thiệu...

## Phần 1

![Nhân vật chính](Character-{0-5}.webp)

Mô tả chi tiết...

## Phần 2

Nội dung khác...
```

**🎯 Trick quan trọng:** Dùng `{0-5}` để tạo 6 ảnh chỉ bằng 1 dòng!

## ⚙️ Bước 4: Convert (10 giây)

```bash
npm run convert
# Hoặc: node convert-md-to-html.js -i my-article.md
```

Kết quả: File HTML trong `Raw/my-article-new.html`

## 🌐 Bước 5: Đăng bài (1 phút)

1. Mở file HTML
2. Copy nội dung trong `<article>...</article>`
3. Paste vào WordPress/CMS
4. Publish!

---

## 🎯 Pattern Syntax - Tính năng SIÊU QUAN TRỌNG

### Cách cũ (tốn thời gian):
```markdown
![Alt](img-0.webp)
![Alt](img-1.webp)
![Alt](img-2.webp)
![Alt](img-3.webp)
![Alt](img-4.webp)
![Alt](img-5.webp)
```
→ 6 dòng, phải copy-paste nhiều lần

### Cách mới (siêu nhanh):
```markdown
![Alt](img-{0-5}.webp)
```
→ CHỈ 1 DÒNG, tự động tạo 6 ảnh!

### Syntax:
```
![Alt text](TenFile-{Start-End}.ext)
```

### Ví dụ:
```markdown
![Character](char-{0-9}.webp)      → 10 ảnh (0-9)
![Scene](scene-{1-5}.png)          → 5 ảnh (1-5)
![Cover](cover-{10-15}.jpg)        → 6 ảnh (10-15)
```

---

## 📋 Commands cần nhớ

```bash
# Nén ảnh
npm run compress                    # Có watermark
npm run compress:no-watermark       # Không watermark

# Convert Markdown
npm run convert                     # File mặc định
npm run convert:help                # Xem hướng dẫn

# Convert file cụ thể
node convert-md-to-html.js -i myfile.md -o output.html
```

---

## 💡 Tips quan trọng

1. **Đặt tên file ảnh có quy tắc:**
   - ✅ `Character-0.webp`, `Character-1.webp`
   - ❌ `abc123.webp`, `photo.webp`

2. **Chỉ ghi tên file trong Markdown:**
   - ✅ `![Alt](image.webp)`
   - ❌ Không cần ghi đường dẫn đầy đủ

3. **Dùng pattern cho gallery lớn:**
   - Gallery 20 ảnh → `{0-19}` thay vì 20 dòng

4. **Cấu trúc Markdown chuẩn:**
   ```markdown
   # H1 (1 cái)
   ## H2 (nhiều cái)
   ### H3 (tiểu mục)
   ```

---

## 📁 Cấu trúc thư mục

```
vidian/
├── Cover/              ← Ảnh đã nén (.webp)
├── Raw/                ← File .md và .html
├── compress-images.js  
├── convert-md-to-html.js
└── template-post.html
```

---

## 🔧 Xử lý lỗi nhanh

**Lỗi:** `Module not found`
```bash
npm install
```

**Lỗi:** `File not found`
- Kiểm tra file trong folder `Raw/`
- Dùng: `node convert-md-to-html.js -i Raw/file.md`

**Pattern không hoạt động:**
- ✅ Đúng: `{0-5}`
- ❌ Sai: `{0,5}` hoặc `[0-5]`

---

## 📚 Đọc thêm

- **[GUIDE.md](./GUIDE.md)** - Hướng dẫn chi tiết từng bước
- **[MARKDOWN-GUIDE.md](./MARKDOWN-GUIDE.md)** - Cú pháp Markdown
- **[README.md](./README.md)** - Tổng quan project

---

## ✅ Checklist

Mỗi bài viết:
- [ ] Ảnh đặt tên có quy tắc
- [ ] `npm run compress`
- [ ] Viết Markdown với pattern
- [ ] `npm run convert`
- [ ] Kiểm tra HTML
- [ ] Copy & publish!

---

**🎉 Bắt đầu ngay với [GUIDE.md](./GUIDE.md) để biết chi tiết!**
