# [Tên bài viết]

Đoạn giới thiệu ngắn gọn về bài viết. Có thể viết nhiều đoạn văn bản ở đây.

## Thông tin cơ bản

**Tên tiếng Trung:** [Tên] - [Chữ Hán]

**Tác giả:** [Tên tác giả]

**Thể loại:** [Thể loại]

**Thời gian ra mắt:** [Ngày tháng năm]

## Ảnh cover đơn

Nếu muốn 1 ảnh đơn lẻ, viết như bình thường:

![Mô tả ảnh](1000.webp)

Văn bản tiếp theo sau ảnh.

## Gallery nhiều ảnh - Cách 1 (Viết từng dòng)

Nếu viết nhiều ảnh liên tiếp mà KHÔNG có văn bản xen giữa, chúng sẽ tự động thành gallery:

![Ảnh 1](NinhTruongCuu-0.webp)
![Ảnh 2](NinhTruongCuu-1.webp)
![Ảnh 3](NinhTruongCuu-2.webp)

## Gallery nhiều ảnh - Cách 2 (Dùng Pattern - KHUYẾN NGHỊ!)

**Cách này SIÊU NHANH!** Chỉ cần 1 dòng cho toàn bộ gallery:

![Triệu Tương Nhi](TrieuTuongNhi-{0-5}.webp)

Pattern này sẽ tự động tạo ra 6 ảnh:
- TrieuTuongNhi-0.webp
- TrieuTuongNhi-1.webp
- TrieuTuongNhi-2.webp
- TrieuTuongNhi-3.webp
- TrieuTuongNhi-4.webp
- TrieuTuongNhi-5.webp

## Bảng dữ liệu

| **Cột 1**          | **Cột 2**                    | **Cột 3**     |
| ------------------ | ---------------------------- | ------------- |
| Dữ liệu hàng 1     | Thông tin chi tiết           | Giá trị       |
| Dữ liệu hàng 2     | Thông tin khác               | Giá trị khác  |

## Trích dẫn

> Đây là đoạn trích dẫn hoặc quote quan trọng.
> Có thể viết nhiều dòng.

## Danh sách

### Danh sách không thứ tự

- Item 1
- Item 2
- Item 3

### Danh sách có thứ tự

1. Bước đầu tiên
2. Bước thứ hai
3. Bước thứ ba

## Heading level 3

### Heading level 4

Văn bản bình thường với **in đậm** và *in nghiêng*.

## Ví dụ thực tế - Bài viết về nhân vật

### Nam chính

![Ninh Trường Cửu](NinhTruongCuu-{0-2}.webp)

**Giới thiệu:** Nhân vật chính của tiểu thuyết...

### Nữ chính

![Triệu Tương Nhi](TrieuTuongNhi-{0-5}.webp)

**Giới thiệu:** Nữ hoàng Triệu quốc...

### Nhân vật phụ

![Lục Giá Giá](LucGiaGia-{0-3}.webp)

**Giới thiệu:** Sư tôn của nam chính...

![Dương Vũ](DuongVu-{0-6}.webp)

**Giới thiệu:** Nhân vật phụ khác...

## Tips quan trọng

### 1. Đặt tên file ảnh theo pattern

**Tốt:**
```
NhanVat-0.webp
NhanVat-1.webp
NhanVat-2.webp
```

**Không tốt:**
```
hinh1.webp
abc.webp
photo_2024.webp
```

### 2. Tách ảnh đơn và gallery

Nếu muốn ảnh đứng riêng, thêm text trước/sau:

```markdown
Văn bản trước

![Ảnh đơn](single.webp)

Văn bản sau
```

### 3. Sử dụng pattern cho gallery lớn

Thay vì copy-paste 10 dòng:
```markdown
![Alt](img-{0-9}.webp)
```

### 4. Không cần ghi CDN path

**Chỉ ghi tên file:**
```markdown
![Alt](image.webp)
```

**KHÔNG CẦN ghi:**
```markdown
![Alt](https://cdn.jsdelivr.net/gh/danhsakai/vidian@main/Cover/image.webp)
```

Script sẽ tự động thêm CDN path!

## Cấu trúc file Markdown nên có

```
# Tiêu đề chính (H1) - Chỉ nên có 1 cái

## Phần 1 (H2)
Nội dung...

### Tiểu mục 1.1 (H3)
Nội dung...

#### Chi tiết 1.1.1 (H4)
Nội dung...

## Phần 2 (H2)
Nội dung...
```

## Các lưu ý về Markdown syntax

- **In đậm:** `**text**` → **text**
- **In nghiêng:** `*text*` → *text*
- **Link:** `[Tên link](url)` → [Tên link](url)
- **Code inline:** `` `code` `` → `code`
- **Trích dẫn:** `> text`
- **Danh sách:** `- item` hoặc `1. item`
