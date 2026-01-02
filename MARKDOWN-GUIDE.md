# Hướng dẫn viết file Markdown (.md)

## 📝 Cấu trúc cơ bản

```markdown
# Tiêu đề bài viết (H1 - chỉ 1 cái)

Đoạn giới thiệu ngắn gọn.

## Phần 1 (H2)

Nội dung phần 1...

### Tiểu mục 1.1 (H3)

Chi tiết...

## Phần 2 (H2)

Nội dung phần 2...
```

---

## 🖼️ Cách thêm hình ảnh

### ✅ KHUYẾN NGHỊ: Dùng Pattern (Siêu nhanh!)

**Tạo gallery 6 ảnh chỉ bằng 1 dòng:**
```markdown
![Triệu Tương Nhi](TrieuTuongNhi-{0-5}.webp)
```

**Pattern syntax:**
```markdown
![Alt text](TenFile-{SoStart-SoEnd}.ext)
```

**Ví dụ:**
```markdown
![Nhân vật](Character-{0-9}.webp)    → 10 ảnh (0 đến 9)
![Cảnh](Scene-{1-5}.png)              → 5 ảnh (1 đến 5)  
![Cover](Cover-{10-15}.jpg)           → 6 ảnh (10 đến 15)
```

### Cách thông thường

**Ảnh đơn:**
```markdown
![Mô tả ảnh](1000.webp)
```

**Gallery nhiều ảnh (viết liên tiếp):**
```markdown
![Ảnh 1](img-0.webp)
![Ảnh 2](img-1.webp)
![Ảnh 3](img-2.webp)
```

**Lưu ý:** 
- KHÔNG cần ghi đường dẫn đầy đủ
- CHỈ ghi tên file (VD: `image.webp`)
- Script tự động thêm CDN path

---

## 📋 Bảng

```markdown
| **Cột 1** | **Cột 2** | **Cột 3** |
| --------- | --------- | --------- |
| Dữ liệu 1 | Dữ liệu 2 | Dữ liệu 3 |
| Dữ liệu 4 | Dữ liệu 5 | Dữ liệu 6 |
```

---

## 💬 Trích dẫn

```markdown
> Đây là đoạn trích dẫn
> Có thể nhiều dòng
```

---

## 📌 Danh sách

**Không thứ tự:**
```markdown
- Item 1
- Item 2
- Item 3
```

**Có thứ tự:**
```markdown
1. Bước 1
2. Bước 2
3. Bước 3
```

---

## ✨ Format chữ

```markdown
**In đậm**
*In nghiêng*
***In đậm và nghiêng***
`Code inline`
[Tên link](url)
```

---

## 🎯 Ví dụ hoàn chỉnh

```markdown
# Thần Quốc Chi Thượng

Giới thiệu về tiểu thuyết...

## Thông tin cơ bản

**Tác giả:** Kiến Dị Tư Kiếm

**Thể loại:** Tiên hiệp cổ điển

## Nhân vật chính

### Nam chính - Ninh Trường Cửu

![Ninh Trường Cửu](NinhTruongCuu-{0-2}.webp)

Nhân vật chính của tiểu thuyết...

### Nữ chính - Triệu Tương Nhi

![Triệu Tương Nhi](TrieuTuongNhi-{0-5}.webp)

Nữ hoàng Triệu quốc...

## Cấp bậc tu vi

| **Cấp bậc**      | **Mô tả**           |
| ---------------- | ------------------- |
| Nhập Huyền Cảnh  | Cấp độ khởi đầu     |
| Thông Tiên Cảnh  | Cấp độ trung gian   |
```

---

## ⚡ Tips quan trọng

### 1. Đặt tên file ảnh có quy tắc

**Tốt:**
- `NhanVat-0.webp`, `NhanVat-1.webp`, `NhanVat-2.webp`
- `Character-0.png`, `Character-1.png`

**Không tốt:**
- `hinh1.webp`, `abc123.webp`, `photo.webp`

### 2. Tách ảnh đơn và gallery

Muốn ảnh đứng riêng? Thêm text trước/sau:

```markdown
Văn bản trước ảnh

![Ảnh đơn](single.webp)

Văn bản sau ảnh
```

### 3. Dùng pattern cho gallery lớn

Thay vì copy 20 dòng:
```markdown
![Character](char-{0-19}.webp)
```

---

## 🚀 Chạy convert

```bash
# Mặc định
npm run convert

# Custom file
node convert-md-to-html.js -i myfile.md -o output.html
```

---

## 📁 File của bạn nên đặt ở đâu?

```
vidian/
├── Raw/
│   ├── myfile.md          ← File Markdown của bạn
│   └── output.html        ← Kết quả sau khi convert
├── Cover/
│   ├── image1.webp        ← Các file ảnh
│   ├── image2.webp
│   └── ...
└── template-post.html     ← Template HTML
```

**Chỉ cần đặt file .md vào folder `Raw/` là được!**
