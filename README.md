<div align="center">

# Graphics & HCI Learning Hub

### Học thiết kế tương tác. Xây trải nghiệm. Chia sẻ phản hồi.

Kho học liệu thực hành dành cho **UI/UX Design**, **Unity & C#** và **Unreal Engine 5**,<br>
kết hợp trình đọc Markdown với đầy đủ công cụ vận hành lớp học.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Online-2ea44f?style=for-the-badge&logo=github)](https://aerovfx.github.io/Graphic_Hci/)
[![Courses](https://img.shields.io/badge/Courses-4-c9a7ff?style=for-the-badge)](https://aerovfx.github.io/Graphic_Hci/#courses)
[![Lessons](https://img.shields.io/badge/Lessons-40-ff6841?style=for-the-badge)](https://aerovfx.github.io/Graphic_Hci/#courses)
[![License](https://img.shields.io/badge/License-MIT-f4f4f0?style=for-the-badge)](education-portal/LICENSE)

### [Mở website khóa học →](https://aerovfx.github.io/Graphic_Hci/)

</div>

---

## Tổng quan

Graphics & HCI Learning Hub là website khóa học tĩnh được triển khai bằng GitHub Pages. Nội dung được quản lý bằng Markdown, tự động lập chỉ mục và hiển thị trong giao diện đọc bài responsive.

Portal hỗ trợ trọn vẹn vòng phản hồi của lớp học:

- Học viên đọc bài, presentation, bài tập, mã nguồn và yêu cầu đồ án.
- Học viên gửi khảo sát trải nghiệm theo từng buổi.
- Thành viên trong lớp đánh giá đồng đẳng theo rubric 1–5.
- Giáo viên chấm điểm, nhận xét và xuất kết quả CSV/JSON.
- Dữ liệu hoạt động offline-first và có thể kết nối Google Sheets.

## Lộ trình khóa học

| Khóa học | Thời lượng | Truy cập |
| --- | :---: | --- |
| UI/UX Design | 10 tuần | [Mở khóa học](https://aerovfx.github.io/Graphic_Hci/course.html?course=ui-ux-design-10weeks) |
| Unity 2D & C# | 10 tuần | [Mở khóa học](https://aerovfx.github.io/Graphic_Hci/course.html?course=unity-csharp-10weeks) |
| UE5 C++ Soulslike — Echoes of Terra | 10 tuần | [Mở khóa học](https://aerovfx.github.io/Graphic_Hci/course.html?course=unreal-engine-5-cpp-soulslike-10weeks) |
| Unreal Engine 5 RPG | 10 tuần | [Mở khóa học](https://aerovfx.github.io/Graphic_Hci/course.html?course=unreal-rpg-10weeks) |

Mỗi khóa học được tổ chức theo năm nhóm tài nguyên:

```text
Lesson → Presentation → Exercise → Code → Project
```

## Công cụ lớp học

| Công cụ | Chức năng | Mở nhanh |
| --- | --- | --- |
| Classroom Portal | Chọn khóa học, lớp, buổi và học viên | [Truy cập](https://aerovfx.github.io/Graphic_Hci/tools/khao-sat/portal.html) |
| Student Survey | Thu phản hồi trải nghiệm sau buổi học | [Truy cập](https://aerovfx.github.io/Graphic_Hci/tools/khao-sat/index.html) |
| Peer Assessment | Đánh giá đồng đẳng theo rubric | [Truy cập](https://aerovfx.github.io/Graphic_Hci/tools/khao-sat/danh-gia.html) |
| Teacher Grading | Chấm điểm, nhận xét và xuất dữ liệu | [Truy cập](https://aerovfx.github.io/Graphic_Hci/tools/khao-sat/admin.html) |
| Results Dashboard | Tổng hợp kết quả khảo sát và đánh giá | [Truy cập](https://aerovfx.github.io/Graphic_Hci/tools/khao-sat/ket-qua.html) |

## Cấu trúc repository

```text
Graphic_Hci/
├── 1_UI_UX_Design/          # Học liệu UI/UX gốc
├── 2_VR_AR_GameDev/         # Học liệu Unity và Unreal gốc
├── education-portal/        # Website, trình đọc và công cụ lớp học
│   ├── assets/              # CSS và JavaScript dùng chung
│   ├── courses/             # Catalog và nội dung được tạo từ Markdown
│   ├── scripts/             # Script build học liệu và static site
│   └── tools/khao-sat/      # Khảo sát, peer review và chấm điểm
└── .github/workflows/       # Tự động build và deploy GitHub Pages
```

## Chạy local

Yêu cầu: Python 3 và Node.js 22 trở lên.

```bash
cd education-portal
python3 scripts/build_course_materials.py
python3 scripts/build_course_catalog.py
npm run build
python3 -m http.server 4173 --directory dist
```

Sau đó mở [http://127.0.0.1:4173](http://127.0.0.1:4173). Không mở trực tiếp bằng `file://` vì trình duyệt có thể chặn việc tải Markdown và JSON.

## Cập nhật nội dung

1. Chỉnh sửa file Markdown trong thư mục khóa học gốc.
2. Chạy lại các script build học liệu và catalog.
3. Kiểm tra website bằng HTTP local.
4. Push thay đổi lên `main`; GitHub Actions sẽ tự động build và triển khai GitHub Pages.

Chi tiết kỹ thuật và cấu hình Google Sheets nằm trong [hướng dẫn của education portal](education-portal/README.md).

## Dữ liệu và quyền riêng tư

Dữ liệu khảo sát mặc định được lưu trong `localStorage` của trình duyệt. Không commit URL Google Apps Script riêng, token, dữ liệu học viên thật hoặc file xuất điểm vào repository.

---

<div align="center">

Built for learning, feedback and creative experimentation.

[Website](https://aerovfx.github.io/Graphic_Hci/) · [Course catalog](https://aerovfx.github.io/Graphic_Hci/#courses) · [Classroom](https://aerovfx.github.io/Graphic_Hci/tools/khao-sat/portal.html)

</div>
