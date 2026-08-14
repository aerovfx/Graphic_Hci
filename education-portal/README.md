# Graphics & HCI Learning Hub

Website khóa học tĩnh đọc trực tiếp học liệu Markdown trong `courses/`. Portal gồm danh mục và trình đọc khóa học, khảo sát theo buổi, đánh giá đồng đẳng, chấm điểm giáo viên, bảng kết quả và xuất CSV/JSON.

## Chạy local

```bash
python3 scripts/build_course_catalog.py
python3 -m http.server 4173
```

Mở `http://127.0.0.1:4173/`. Không mở bằng `file://` vì trình duyệt có thể chặn việc tải Markdown và JSON.

## Cập nhật học liệu

Mỗi khóa học nằm ở `courses/<course-id>/` và cần có `INDEX.md`. Các nhóm nội dung được đọc theo cấu trúc `lessons/`, `presentations/`, `exercises/`, `code/` và `projects/`. Sau khi thêm hoặc sửa file, chạy lại:

```bash
python3 scripts/build_course_catalog.py
```

## Khảo sát và đánh giá

- Cổng lớp học: `tools/khao-sat/portal.html`
- Khảo sát: `tools/khao-sat/index.html`
- Đánh giá đồng đẳng: `tools/khao-sat/danh-gia.html`
- Kết quả: `tools/khao-sat/ket-qua.html`
- Chấm điểm giáo viên: `tools/khao-sat/admin.html`

Mặc định dữ liệu được lưu trong `localStorage` của trình duyệt. Dữ liệu trong repo chỉ là lớp và học viên demo. Có thể cấu hình Google Apps Script/Sheets tại `tools/khao-sat/ket-noi.html`; không commit URL riêng, token, dữ liệu thật hoặc bản xuất điểm vào kho mã nguồn.

## Triển khai GitHub Pages

Workflow `.github/workflows/jekyll-gh-pages.yml` build danh mục và triển khai site tĩnh. Bật GitHub Pages với nguồn “GitHub Actions” trong cài đặt repository.
