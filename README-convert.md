# Hướng dẫn sử dụng Convert Markdown to HTML

## Cài đặt

```bash
npm install
```

## Sử dụng cơ bản

### 1. Chạy với file mặc định
```bash
npm run convert
```

### 2. Chỉ định file input/output
```bash
node convert-md-to-html.js -i myfile.md -o output.html
```

### 3. Xem hướng dẫn
```bash
npm run convert:help
```

## Tính năng nổi bật

### 🖼️ Xử lý hình ảnh thông minh

#### Ảnh đơn lẻ
```markdown
![Alt text](image.webp)
```
→ Tạo ra:
```html
<figure class="article__image">
  <img src="https://cdn.jsdelivr.net/gh/danhsakai/vidian@main/Cover/image.webp" alt="Alt text" />
</figure>
```

#### Gallery tự động (nhiều ảnh liên tiếp)
```markdown
![Ảnh 1](img1.webp)
![Ảnh 2](img2.webp)
![Ảnh 3](img3.webp)
```
→ Tạo ra:
```html
<div class="article__gallery-grid">
  <figure class="article__gallery-item">
    <img src=".../img1.webp" alt="Ảnh 1" />
  </figure>
  <figure class="article__gallery-item">
    <img src=".../img2.webp" alt="Ảnh 2" />
  </figure>
  <figure class="article__gallery-item">
    <img src=".../img3.webp" alt="Ảnh 3" />
  </figure>
</div>
```

### ⚡ Pattern Expansion - Tạo gallery siêu nhanh!

Thay vì viết:
```markdown
![Triệu Tương Nhi](TrieuTuongNhi-0.webp)
![Triệu Tương Nhi](TrieuTuongNhi-1.webp)
![Triệu Tương Nhi](TrieuTuongNhi-2.webp)
![Triệu Tương Nhi](TrieuTuongNhi-3.webp)
![Triệu Tương Nhi](TrieuTuongNhi-4.webp)
![Triệu Tương Nhi](TrieuTuongNhi-5.webp)
```

Chỉ cần viết **1 dòng**:
```markdown
![Triệu Tương Nhi](TrieuTuongNhi-{0-5}.webp)
```

**Syntax pattern:**
```
![Alt text](prefix-{start-end}.ext)
```

**Ví dụ:**
- `![Nhân vật](Character-{0-9}.webp)` → Tạo 10 ảnh từ Character-0.webp đến Character-9.webp
- `![Cảnh](Scene-{1-5}.png)` → Tạo 5 ảnh từ Scene-1.png đến Scene-5.png
- `![Cover](Cover-{10-15}.jpg)` → Tạo 6 ảnh từ Cover-10.jpg đến Cover-15.jpg

### 🔗 CDN Path tự động

Tất cả hình ảnh tự động thêm CDN base URL:
```
https://cdn.jsdelivr.net/gh/danhsakai/vidian@main/Cover/
```

Bạn chỉ cần ghi tên file trong Markdown!

## Các options

```
-i, --input <file>      File Markdown input (mặc định: "Thần Quốc Chi Thượng.md")
-t, --template <file>   File HTML template (mặc định: "template-post.html")
-o, --output <file>     File HTML output (tự động tạo từ tên input)
-h, --help              Hiển thị trợ giúp
```

## Ví dụ thực tế

### Tạo bài viết với nhiều gallery
```markdown
# Nhân vật chính

## Ninh Trường Cửu

![Ninh Trường Cửu](NinhTruongCuu-{0-2}.webp)

## Triệu Tương Nhi

![Triệu Tương Nhi](TrieuTuongNhi-{0-5}.webp)

## Lục Giá Giá

![Lục Giá Giá](LucGiaGia-{0-3}.webp)
```

Chạy convert:
```bash
node convert-md-to-html.js -i nhan-vat.md -o nhan-vat-output.html
```

Kết quả: 3 gallery đẹp mắt với tổng cộng 11 hình ảnh, chỉ với 3 dòng code!

## Tips & Tricks

1. **Đặt tên file theo pattern**: Khi lưu ảnh, đặt tên theo dạng `TenNhanVat-0.webp`, `TenNhanVat-1.webp`... để dễ sử dụng pattern

2. **Ảnh đơn giữa gallery**: Nếu muốn 1 ảnh riêng biệt, thêm text hoặc heading giữa các ảnh:
   ```markdown
   ![Gallery 1](img-{0-2}.webp)
   
   Đây là mô tả
   
   ![Ảnh đơn](single.webp)
   ```

3. **Mix pattern và ảnh thường**: Có thể kết hợp cả hai:
   ```markdown
   ![Pattern](char-{0-3}.webp)
   ![Ảnh đặc biệt](special.webp)
   ![Pattern khác](bg-{1-5}.webp)
   ```

## CSS Classes được tạo

- `.article__image` - Ảnh đơn
- `.article__gallery-grid` - Container của gallery
- `.article__gallery-item` - Item trong gallery
- `.article__paragraph` - Đoạn văn
- `.article__heading--level2/3/4` - Các heading
- `.article__quote` - Blockquote
- `.article__table` - Bảng
- `.article__list` - Danh sách

Xem `template-post.html` để biết thêm chi tiết về styling.
