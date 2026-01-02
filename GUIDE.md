# 📖 GUIDE - Hướng dẫn chi tiết tạo bài viết chất lượng

**Tài liệu này hướng dẫn từng bước để tạo một bài viết web chất lượng cao từ đầu đến cuối.**

---

## 📋 Mục lục

1. [Tổng quan workflow](#-tổng-quan-workflow)
2. [Bước 1: Chuẩn bị môi trường](#-bước-1-chuẩn-bị-môi-trường)
3. [Bước 2: Xử lý hình ảnh](#-bước-2-xử-lý-hình-ảnh)
4. [Bước 3: Viết nội dung Markdown](#-bước-3-viết-nội-dung-markdown)
5. [Bước 4: Convert sang HTML](#-bước-4-convert-sang-html)
6. [Bước 5: Đăng bài](#-bước-5-đăng-bài)
7. [Tips & Tricks](#-tips--tricks)
8. [Xử lý lỗi thường gặp](#-xử-lý-lỗi-thường-gặp)

---

## 🎯 Tổng quan workflow

```
┌─────────────────────────────────────────────────────────┐
│                    WORKFLOW HOÀN CHỈNH                  │
└─────────────────────────────────────────────────────────┘

1. CẤU HÌNH BAN ĐẦU (1 lần duy nhất)
   📦 npm install
   ✏️  Cấu hình watermark (tùy chọn)
   
2. XỬ LÝ HÌNH ẢNH (mỗi khi có ảnh mới)
   📁 Đặt ảnh gốc vào Cover/
   🖼️  npm run compress
   ✅ Ảnh .webp đã nén + watermark
   
3. VIẾT NỘI DUNG (phần chính)
   ✍️  Viết file .md trong Raw/
   🎨 Dùng pattern {0-5} cho gallery
   
4. CHUYỂN ĐỔI (tự động)
   ⚙️  npm run convert
   📄 File HTML hoàn chỉnh
   
5. ĐĂNG BÀI
   📋 Copy nội dung <article>
   🌐 Paste vào website/CMS
   🎉 HOÀN THÀNH!
```

---

## 📦 Bước 1: Chuẩn bị môi trường

### 1.1. Cài đặt lần đầu

```bash
# Di chuyển vào thư mục project
cd vidian

# Cài đặt dependencies
npm install
```

**Kết quả:** Sẽ cài đặt 3 packages:
- `sharp@0.33.1` - Xử lý ảnh
- `marked@17.0.1` - Parse Markdown
- `chalk@4.1.2` - Màu sắc terminal

### 1.2. Kiểm tra cài đặt

```bash
# Xem version các packages
npm list

# Test compress script
npm run compress:help

# Test convert script  
npm run convert:help
```

### 1.3. Cấu hình watermark (tùy chọn)

Mở `compress-images.js` và chỉnh sửa:

```javascript
watermark: {
  enabled: true,
  text: 'Tên bạn',           // ← Đổi text watermark
  fontSize: 48,              // ← Kích thước chữ
  fontColor: 'rgba(255, 255, 255, 0.5)',  // ← Màu + độ trong suốt
  position: 'bottom-right',  // ← Vị trí (bottom-right/left, top-right/left, center)
  padding: 20                // ← Khoảng cách từ cạnh
}
```

### 1.4. Kiểm tra cấu trúc thư mục

```bash
tree -L 1 -d

# Nên thấy:
# Cover/          ← Ảnh đã nén
# Raw/            ← File Markdown & HTML
# Cover-backup/   ← Backup ảnh gốc (tự tạo khi compress)
```

---

## 🖼️ Bước 2: Xử lý hình ảnh

### 2.1. Chuẩn bị ảnh gốc

**✅ Làm:**
1. Đặt ảnh JPG/PNG vào folder `Cover/`
2. Đặt tên file có quy tắc:
   - `NhanVat-0.jpg`, `NhanVat-1.jpg`, `NhanVat-2.jpg`
   - `Character-0.png`, `Character-1.png`
   - Tên phải có số tăng dần để dùng pattern sau này

**❌ Tránh:**
- Tên file random: `abc123.jpg`, `photo.jpg`
- Có dấu cách: `anh dep.jpg` → Dùng `-` hoặc `_`
- Ký tự đặc biệt: `ảnh@#$.jpg`

### 2.2. Chạy nén ảnh

```bash
# Nén + thêm watermark
npm run compress
```

**Hoặc không watermark:**
```bash
npm run compress:no-watermark
```

### 2.3. Quá trình xử lý

Script sẽ:
1. ✅ Tạo backup ảnh gốc vào `Cover-backup/`
2. ✅ Nén JPG/PNG → WebP (chất lượng 80%)
3. ✅ Thêm watermark (nếu enabled)
4. ✅ Xóa metadata (EXIF) để bảo mật
5. ✅ Ghi đè file WebP vào `Cover/`

**Output ví dụ:**
```
🚀 Bắt đầu xử lý ảnh...
📁 Input: ./Cover
📁 Output: ./Cover
💾 Backup: ./Cover-backup

✅ NhanVat-0.jpg → NhanVat-0.webp
   📊 1250.5 KB → 285.3 KB (77.2% ↓)
   
✅ NhanVat-1.jpg → NhanVat-1.webp
   📊 1100.2 KB → 240.8 KB (78.1% ↓)
   
🎉 Hoàn thành: 15/15 ảnh
💾 Tiết kiệm: 12.5 MB
```

### 2.4. Kiểm tra kết quả

```bash
# Xem ảnh đã nén
ls -lh Cover/*.webp

# Xem backup
ls -lh Cover-backup/
```

**Lưu ý quan trọng:**
- ⚠️ File `.webp` cũ sẽ bị BỎ QUA (không xử lý lại)
- ⚠️ Chỉ xử lý `.jpg`, `.jpeg`, `.png`
- ✅ Backup tự động, an toàn

---

## ✍️ Bước 3: Viết nội dung Markdown

### 3.1. Tạo file Markdown

Tạo file mới trong `Raw/`:
```bash
touch Raw/my-article.md
```

Hoặc copy template:
```bash
cp Raw/TEMPLATE-MARKDOWN.md Raw/my-article.md
```

### 3.2. Cấu trúc bài viết chuẩn

```markdown
# Tiêu đề chính bài viết

Đoạn mở đầu giới thiệu ngắn gọn về chủ đề bài viết. 
Nên có 1-3 đoạn văn.

## Phần 1: Giới thiệu

Nội dung phần giới thiệu...

### Tiểu mục 1.1

Chi tiết về tiểu mục...

## Phần 2: Nội dung chính

### Với ảnh đơn

![Mô tả ảnh](image.webp)

Văn bản sau ảnh...

### Với gallery (Pattern - KHUYẾN NGHỊ)

![Nhân vật](Character-{0-5}.webp)

Mô tả nhân vật...

## Phần 3: Bảng dữ liệu

| **Cột 1** | **Cột 2** | **Cột 3** |
| --------- | --------- | --------- |
| Dữ liệu 1 | Dữ liệu 2 | Dữ liệu 3 |

## Phần 4: Trích dẫn

> Đây là đoạn trích dẫn quan trọng
> Có thể nhiều dòng

## Kết luận

Tóm tắt nội dung bài viết...
```

### 3.3. Sử dụng Pattern cho Gallery

**🎯 Đây là tính năng QUAN TRỌNG NHẤT!**

#### Ví dụ 1: Gallery 6 ảnh
```markdown
![Triệu Tương Nhi](TrieuTuongNhi-{0-5}.webp)
```
→ Tự động tạo:
- TrieuTuongNhi-0.webp
- TrieuTuongNhi-1.webp
- TrieuTuongNhi-2.webp
- TrieuTuongNhi-3.webp
- TrieuTuongNhi-4.webp
- TrieuTuongNhi-5.webp

#### Ví dụ 2: Gallery 10 ảnh
```markdown
![Nhân vật phụ](SideCharacter-{0-9}.webp)
```

#### Ví dụ 3: Bắt đầu từ số khác 0
```markdown
![Cảnh](Scene-{1-8}.webp)
```
→ Scene-1.webp đến Scene-8.webp

#### Ví dụ 4: Bài viết hoàn chỉnh
```markdown
# Nhân vật Thần Quốc Chi Thượng

## Nam chính - Ninh Trường Cửu

![Ninh Trường Cửu](NinhTruongCuu-{0-2}.webp)

Ninh Trường Cửu là nhân vật chính của tiểu thuyết, 
kiếp trước phi thăng thất bại, trọng sinh trở về 12 năm trước...

## Nữ chính - Triệu Tương Nhi

![Triệu Tương Nhi](TrieuTuongNhi-{0-5}.webp)

Triệu Tương Nhi là nữ hoàng Triệu quốc...

## Nhân vật phụ

### Lục Giá Giá

![Lục Giá Giá](LucGiaGia-{0-3}.webp)

Sư tôn của Ninh Trường Cửu...

### Dương Vũ

![Dương Vũ](DuongVu-{0-6}.webp)

Nhân vật quan trọng...
```

### 3.4. Các thành phần Markdown khác

#### Heading
```markdown
# H1 - Tiêu đề chính (chỉ 1 cái)
## H2 - Phần lớn
### H3 - Tiểu mục
#### H4 - Chi tiết
```

#### Format text
```markdown
**In đậm**
*In nghiêng*
***In đậm và nghiêng***
`Code inline`
```

#### Danh sách
```markdown
# Không thứ tự
- Item 1
- Item 2
  - Sub item
  
# Có thứ tự
1. Bước 1
2. Bước 2
3. Bước 3
```

#### Link
```markdown
[Tên link](https://url.com)
```

#### Trích dẫn
```markdown
> Đây là quote
> Nhiều dòng
```

### 3.5. Tips viết Markdown hiệu quả

1. **Cấu trúc rõ ràng:** H1 → H2 → H3, không nhảy cấp
2. **Đoạn văn ngắn:** 2-4 câu/đoạn, dễ đọc hơn
3. **Dùng pattern cho gallery:** Tiết kiệm thời gian
4. **Alt text có ý nghĩa:** Giúp SEO và accessibility
5. **Kiểm tra trước:** Đọc lại nội dung trước khi convert

---

## ⚙️ Bước 4: Convert sang HTML

### 4.1. Convert file mặc định

Nếu file của bạn tên là `Thần Quốc Chi Thượng.md`:
```bash
npm run convert
```

### 4.2. Convert file tùy chỉnh

```bash
node convert-md-to-html.js -i my-article.md -o my-article-output.html
```

**Options:**
- `-i, --input <file>` - File Markdown input
- `-o, --output <file>` - File HTML output (optional, tự động tạo)
- `-t, --template <file>` - Template HTML (mặc định: template-post.html)
- `-h, --help` - Xem help

### 4.3. Quá trình convert

Script sẽ:
1. ✅ Đọc file Markdown
2. ✅ Expand pattern `{0-5}` thành nhiều ảnh
3. ✅ Convert Markdown → HTML với marked
4. ✅ Nhóm ảnh liên tiếp thành gallery
5. ✅ Thêm CDN path cho ảnh
6. ✅ Merge vào template HTML
7. ✅ Ghi file output

**Output:**
```bash
✅ Conversion complete!
   Input:    /path/to/Raw/my-article.md
   Template: /path/to/template-post.html
   Output:   /path/to/Raw/my-article-new.html
```

### 4.4. Kiểm tra kết quả

```bash
# Xem file HTML
cat Raw/my-article-new.html

# Hoặc mở bằng browser
open Raw/my-article-new.html  # macOS
xdg-open Raw/my-article-new.html  # Linux
```

### 4.5. Cấu trúc HTML output

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* CSS cho article, gallery, responsive... */
  </style>
</head>
<body>
  <article class="article">
    <h1 class="article__title">Tiêu đề</h1>
    
    <p class="article__paragraph">Nội dung...</p>
    
    <!-- Ảnh đơn -->
    <figure class="article__image">
      <img src="https://cdn.jsdelivr.net/.../image.webp" alt="..." />
    </figure>
    
    <!-- Gallery -->
    <div class="article__gallery-grid">
      <figure class="article__gallery-item">
        <img src="..." alt="..." />
      </figure>
      <!-- More images... -->
    </div>
    
    <!-- Table, quote, list... -->
  </article>
</body>
</html>
```

---

## 🌐 Bước 5: Đăng bài

### 5.1. Lấy nội dung HTML

**Option 1: Copy toàn bộ file**
```bash
cat Raw/my-article-new.html
```

**Option 2: Chỉ copy nội dung trong `<article>`**

Mở file HTML, copy phần giữa:
```html
<article class="article">
  <!-- NỘI DUNG NÀY -->
</article>
```

### 5.2. Đăng lên Website/CMS

#### WordPress
1. Tạo Post/Page mới
2. Chuyển sang chế độ "Text" hoặc "HTML"
3. Paste nội dung
4. Preview & Publish

#### Custom CMS
1. Paste vào editor HTML
2. Hoặc paste vào field content
3. CSS đã có sẵn trong HTML

#### Static Website
1. Copy toàn bộ file HTML
2. Upload lên server
3. Link vào navigation

### 5.3. Kiểm tra trước khi publish

- [ ] Ảnh hiển thị đúng?
- [ ] Gallery responsive?
- [ ] Link hoạt động?
- [ ] Format text OK?
- [ ] Mobile view OK?

### 5.4. SEO Checklist (tùy chọn)

- [ ] Tiêu đề có keyword chính
- [ ] Alt text cho ảnh
- [ ] Meta description
- [ ] URL thân thiện
- [ ] Internal/external links

---

## 💡 Tips & Tricks

### 1. Tối ưu workflow

**Tạo alias trong terminal:**
```bash
# Thêm vào ~/.bashrc hoặc ~/.zshrc
alias vc='cd ~/vidian && npm run convert'
alias vi='cd ~/vidian && npm run compress'
```

**Script tự động:**
```bash
# File: auto-publish.sh
#!/bin/bash
cd ~/vidian
npm run compress
npm run convert
echo "✅ Done! Check Raw/ for output"
```

### 2. Đặt tên file hiệu quả

**Tốt:**
```
2024-01-thần-quốc-chi-thượng.md
nhân-vật-chính.md
review-tieu-thuyet.md
```

**Tránh:**
```
bai1.md
test.md
untitled.md
```

### 3. Reuse template

Tạo template riêng cho từng loại bài:
```
Raw/templates/
├── character-template.md    # Template nhân vật
├── review-template.md       # Template review
└── guide-template.md        # Template hướng dẫn
```

### 4. Backup định kỳ

```bash
# Backup toàn bộ project
tar -czf vidian-backup-$(date +%Y%m%d).tar.gz vidian/

# Hoặc dùng git
cd vidian
git init
git add .
git commit -m "Backup $(date)"
```

### 5. Version control

**Recommended:** Dùng Git để quản lý versions

```bash
git init
git add .
git commit -m "Initial commit"

# Sau mỗi lần edit
git add Raw/my-article.md
git commit -m "Update article content"
```

### 6. Xử lý ảnh lớn

Nếu có nhiều ảnh (>50):
```bash
# Compress từng folder
mkdir Cover/batch1 Cover/batch2
# Di chuyển ảnh vào batch
npm run compress
```

### 7. Custom CSS

Chỉnh CSS trong `template-post.html`:
```css
.article__image img {
  max-width: 600px;  /* Thay đổi max width */
  border-radius: 8px; /* Bo góc */
}

.article__gallery-grid {
  column-count: 4;  /* 4 cột thay vì 3 */
}
```

---

## 🔧 Xử lý lỗi thường gặp

### Lỗi 1: Module not found

```
Error: Cannot find module 'sharp'
```

**Giải pháp:**
```bash
npm install
```

### Lỗi 2: File not found

```
Error: Markdown file not found
```

**Giải pháp:**
- Kiểm tra tên file
- Đảm bảo file trong folder `Raw/`
- Dùng đường dẫn đầy đủ: `-i Raw/file.md`

### Lỗi 3: Pattern không hoạt động

Pattern `{0-5}` không tạo nhiều ảnh

**Nguyên nhân:** Syntax sai

**Đúng:**
```markdown
![Alt](file-{0-5}.webp)
```

**Sai:**
```markdown
![Alt](file-{0,5}.webp)   # Dùng dấu phẩy
![Alt](file-[0-5].webp)   # Dùng ngoặc vuông
![Alt](file-{0..5}.webp)  # Dùng hai dấu chấm
```

### Lỗi 4: Ảnh không hiển thị

```html
<img src="https://...Cover/image.webp" alt="">
```
Nhưng ảnh không load

**Giải pháp:**
1. Kiểm tra ảnh có trong folder `Cover/`
2. Tên file khớp chính xác (phân biệt hoa/thường)
3. Push code lên GitHub (CDN cần code trên GitHub)

### Lỗi 5: Gallery không responsive

**Giải pháp:**
- Đảm bảo CSS có trong template
- Kiểm tra class name đúng: `article__gallery-grid`
- Test trên nhiều kích thước màn hình

### Lỗi 6: Watermark không xuất hiện

```bash
npm run compress
# Nhưng không thấy watermark
```

**Giải pháp:**
1. Kiểm tra config:
```javascript
watermark: {
  enabled: true,  // Phải là true
}
```

2. Hoặc chạy với flag:
```bash
# Không dùng flag --no-watermark
npm run compress
```

### Lỗi 7: File .webp bị xử lý lại

Script xử lý cả file `.webp` cũ

**Giải pháp:**
- Script đã config BỎ QUA `.webp`
- Chỉ xử lý `.jpg`, `.jpeg`, `.png`
- Nếu vẫn lỗi, check `compress-images.js` line 31:
```javascript
supportedFormats: ['.jpg', '.jpeg', '.png'],
```

---

## 📊 Checklist hoàn chỉnh

### Lần đầu setup
- [ ] `npm install`
- [ ] Cấu hình watermark (nếu cần)
- [ ] Test compress với 1 ảnh
- [ ] Test convert với template

### Mỗi bài viết mới
- [ ] Chuẩn bị ảnh (đặt tên có quy tắc)
- [ ] `npm run compress`
- [ ] Kiểm tra ảnh .webp
- [ ] Viết Markdown
- [ ] Dùng pattern cho gallery
- [ ] `npm run convert`
- [ ] Kiểm tra HTML output
- [ ] Copy & paste lên website
- [ ] Preview trước khi publish
- [ ] Publish & share!

---

## 🎓 Ví dụ hoàn chỉnh từ A-Z

### Kịch bản: Viết bài về "Thần Quốc Chi Thượng"

**Bước 1: Chuẩn bị ảnh**
```bash
# Tải ảnh nhân vật về, đặt tên:
Cover/NinhTruongCuu-0.jpg
Cover/NinhTruongCuu-1.jpg
Cover/NinhTruongCuu-2.jpg
Cover/TrieuTuongNhi-0.jpg
Cover/TrieuTuongNhi-1.jpg
...
Cover/TrieuTuongNhi-5.jpg
```

**Bước 2: Nén ảnh**
```bash
npm run compress

# Output:
# ✅ NinhTruongCuu-0.webp (1.2MB → 280KB)
# ✅ NinhTruongCuu-1.webp (1.1MB → 250KB)
# ...
```

**Bước 3: Viết Markdown**
```markdown
# Thần Quốc Chi Thượng

Tiểu thuyết Thần Quốc Chi Thượng là một bộ tiểu thuyết 
mạng tiên hiệp cổ điển...

## Nhân vật chính

### Ninh Trường Cửu

![Ninh Trường Cửu](NinhTruongCuu-{0-2}.webp)

Ninh Trường Cửu là nhân vật chính...

### Triệu Tương Nhi

![Triệu Tương Nhi](TrieuTuongNhi-{0-5}.webp)

Triệu Tương Nhi là nữ hoàng...

## Cấp bậc tu vi

| **Cấp bậc** | **Mô tả** |
| ----------- | --------- |
| Nhập Huyền  | Khởi đầu  |
| Thông Tiên  | Tiến triển|
```

Lưu file: `Raw/than-quoc-chi-thuong.md`

**Bước 4: Convert**
```bash
node convert-md-to-html.js -i than-quoc-chi-thuong.md

# ✅ Conversion complete!
# Output: Raw/than-quoc-chi-thuong-new.html
```

**Bước 5: Kiểm tra & đăng**
```bash
# Mở file HTML
open Raw/than-quoc-chi-thuong-new.html

# Copy nội dung <article>
# Paste vào WordPress/CMS
# Publish!
```

**Kết quả:**
- ✅ 2 gallery (3 ảnh + 6 ảnh)
- ✅ Responsive trên mọi thiết bị
- ✅ Ảnh có watermark, đã nén
- ✅ CDN path tự động
- ✅ Styling đẹp, ready to publish!

**Thời gian:** ~15-20 phút cho toàn bộ workflow!

---

## 🚀 Kết luận

Bạn đã có đầy đủ kiến thức để:

1. ✅ Xử lý ảnh chuyên nghiệp (nén + watermark)
2. ✅ Viết nội dung Markdown hiệu quả (dùng pattern)
3. ✅ Convert tự động sang HTML
4. ✅ Đăng bài nhanh chóng

**Workflow này giúp bạn:**
- ⚡ Tiết kiệm 70-80% thời gian
- 🎨 Tạo bài viết chất lượng cao
- 📱 Responsive tự động
- 🔧 Dễ bảo trì và mở rộng

**Next steps:**
- Thực hành với bài viết đầu tiên
- Tùy chỉnh template cho phong cách riêng
- Chia sẻ với team để cùng sử dụng

**Happy writing! 🎉**

---

📞 **Need help?** Đọc lại các file:
- [README.md](./README.md) - Tổng quan
- [MARKDOWN-GUIDE.md](./MARKDOWN-GUIDE.md) - Viết Markdown
- [README-compress.md](./README-compress.md) - Chi tiết nén ảnh
- [README-convert.md](./README-convert.md) - Chi tiết convert
