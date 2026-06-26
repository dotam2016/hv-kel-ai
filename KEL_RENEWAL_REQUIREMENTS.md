# KEL Corporate Website Renewal - Requirements & Context

## 1. Bối cảnh dự án

Website renewal cho ケル株式会社 / KEL Corporation: https://www.kel.jp/

Mục tiêu hiện tại là tạo một HTML prototype cho trang chủ corporate site. Prototype này dùng để kiểm tra direction giao diện, cấu trúc section, animation, responsive và trải nghiệm điều hướng trước khi đi vào production code hoặc Figma chi tiết.

KEL là công ty sản xuất connector / harness / rack products. Website renewal cần thể hiện cảm giác hiện đại, công nghệ, hướng tới tương lai và phù hợp với lĩnh vực B2B manufacturing / electronic components.

Các hướng nội dung hữu ích từ phân tích trước:

- KEL cung cấp connector, harness, rack products.
- Sản phẩm được dùng trong các lĩnh vực như industrial equipment, medical/healthcare, automotive/EV, camera/video, infrastructure/railway, amusement.
- Trang chủ mới nên không chỉ là directory link mà cần có brand story rõ hơn.
- Direction tổng thể: `Corporate + Product Gateway + Brand Story`.
- Main message có thể xoay quanh việc KEL hỗ trợ xã hội và công nghiệp thông qua các kết nối không nhìn thấy bên trong thiết bị.

## 2. Yêu cầu chung

- Website responsive cho PC / Tablet / Mobile.
- Đáp ứng các yêu cầu cơ bản về accessibility/a11y.
- Tuân thủ HTML semantic.
- Cấu trúc HTML hỗ trợ SEO.
- Sử dụng Tailwind CSS bằng CDN.
- Sử dụng font `Noto Sans JP` bằng CDN.
- Font-weight cần tiết chế:
  - Body/text thường: 400.
  - Navigation/button: 500 hoặc 700 khi cần nhấn mạnh.
  - Heading chính: 700.
  - Không dùng font quá đậm ở mọi nơi.
- Nếu cần icon, dùng CDN icon nhẹ và load nhanh. Hiện sử dụng Lucide Icons CDN.
- Container chính: `1280px`.
- Các nội dung trong site có hiệu ứng fade khi xuất hiện bằng AOS.
- Có xử lý `prefers-reduced-motion` để giảm animation cho người dùng không muốn chuyển động.

## 3. Color system

```text
primary:   #0d80c0
secondary: #1E293B
tertiary:  #38BDF8
neutral:   #F8FAFC
```

## 4. CDN sử dụng

### Tailwind CSS

```html
<script src="https://cdn.tailwindcss.com"></script>
```

### Noto Sans JP

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet" />
```

### AOS

```html
<link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet" />
<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
```

### Swiper

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

### Lucide Icons

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
```

## 5. Tailwind config

Tailwind CDN được cấu hình trực tiếp trong `index.html`.

```js
window.tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans JP', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#0d80c0',
        secondary: '#1E293B',
        tertiary: '#38BDF8',
        neutral: '#F8FAFC',
      },
      maxWidth: {
        container: '1280px',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.08)',
      },
    },
  },
};
```

## 6. Cấu trúc file hiện tại

```text
kel-renewal/
├── index.html
├── KEL_RENEWAL_REQUIREMENTS.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── images/
        ├── hero-banner-01.svg
        ├── hero-banner-02.svg
        └── hero-banner-03.svg
```

## 7. HTML / SEO / A11y base

HTML hiện tại gồm:

- `<!doctype html>` và `lang="ja"`.
- Meta viewport, description, theme-color.
- Open Graph meta cơ bản.
- Header fixed.
- Skip link: `本文へスキップ`.
- Navigation desktop và mobile.
- Mobile menu button có `aria-controls`, `aria-expanded`, `aria-label`.
- Language dropdown button có `aria-controls`, `aria-expanded`, `aria-label`.
- `main id="main-content"`.
- Các section hiện tại:
  - Hero
  - Corporate Overview / Company
  - IR placeholder
  - Recruit placeholder
- Footer semantic.
- Các section có `aria-labelledby` hoặc `aria-label`.
- Các icon trang trí có `aria-hidden="true"`.
- Các ảnh hero hiện là decorative image nên `alt=""` và `aria-hidden="true"` nằm ở wrapper.

## 8. Header requirements

### 8.1 Desktop / PC

- Header cố định phía trên màn hình.
- Header có background trắng hơi trong và blur nhẹ.
- Khi user cuộn xuống, header ẩn lên phía trên.
- Khi user cuộn ngược lên, header xuất hiện lại.
- Hiệu ứng ẩn/hiện header có transition mượt.
- Header không bị ẩn khi mobile menu đang mở.
- Header có logo `KEL`.
- Desktop nav gồm:
  - 製品情報
  - 企業情報
  - 投資家情報
  - 採用情報
  - お問い合わせ
- Trên PC, hover vào nav đổi màu text sang primary `#0d80c0`.
- Nav hover có transition và underline animation nhẹ.
- Header có ô search `製品検索`.
- Header có language icon.

### 8.2 Mobile / Tablet

- Từ breakpoint nhỏ hơn hoặc bằng `1180px`, desktop nav ẩn và hiển thị hamburger.
- Khi click hamburger:
  - Mobile nav hiển thị dạng drawer.
  - Drawer có chiều cao `100vh / 100svh`.
  - Drawer đi từ trái vào, không phải dropdown từ trên xuống.
  - Có lớp dimmed che mờ nội dung bên dưới.
  - Body bị lock scroll khi menu mở.
  - Có nút đóng trong drawer.
  - Click dimmed, click link hoặc nhấn Escape sẽ đóng drawer.
- Drawer mobile có:
  - Logo KEL.
  - Search box.
  - Danh sách nav chính.
  - Danh sách language để thuận tiện thao tác trên mobile.

## 9. Language dropdown

Khi click `header-icon-button` / icon globe trên header, hiển thị dropdown ngôn ngữ.

Danh sách ngôn ngữ:

```text
Japanese
English
Deutsch
Korean
简体中文
繁体中文
```

Yêu cầu:

- Dropdown nằm dưới icon language.
- Có background trắng, border, border-radius và shadow nhẹ.
- Hover item đổi màu nền nhẹ và text sang primary.
- Có xử lý `aria-expanded`.
- Click ra ngoài hoặc nhấn Escape sẽ đóng dropdown.
- Link hiện để `href="#none"` vì chưa có URL thật.

## 10. Common button interaction

Yêu cầu mới: khi hover button, button không đổi background color.

Interaction hiện tại:

- Button giữ nguyên background gốc.
- Khi hover/focus-visible, có một vầng sáng/shine chạy chéo qua button.
- Button có thể translate nhẹ lên trên để tạo cảm giác clickable.
- Áp dụng cho:
  - `.hero-copy__button`
  - `.btn-primary`
  - `.btn-secondary`
  - `.newsletter-form button`
- Không dùng kiểu hover đổi background từ primary sang secondary nữa.

## 11. Hero section requirements

### 11.1 Layout / Slider

- Hero sử dụng Swiper slider.
- Slider áp dụng hiệu ứng fade.
- Mỗi slide full width và cao `100vh / 100svh`.
- Có `min-height` để tránh màn hình thấp làm layout bị vỡ.
- Khi chuyển slide, text của slide active animate từ dưới lên trên bằng opacity + translateY.
- Mỗi slide chỉ có 1 button link dẫn đến chi tiết bài viết.
- Link tạm thời dùng `href="#none"`.
- Slider có pagination ở phía dưới bên trái.
- Ở giữa phía dưới Hero có text `scroll` + icon mũi tên xuống.
- Text `scroll` + mũi tên có animation nhẹ lên/xuống để gợi ý user scroll xuống.

### 11.2 Text slide 1

Yêu cầu mới: bỏ bớt dòng `AI革命を支える技術。`, chỉ để title 1 dòng.

Text hiện tại:

```text
コネクタの先にある未来へ。
```

Không còn dòng title thứ 2 trong Hero slide 1.

### 11.3 Banner images

Đã tạo SVG banner images theo phong cách:

- hiện đại
- hướng tới tương lai
- công nghệ / data flow
- phù hợp với sản phẩm connector / rack / medical / industrial của KEL

Danh sách ảnh:

```text
assets/images/hero-banner-01.svg
assets/images/hero-banner-02.svg
assets/images/hero-banner-03.svg
```

Trong đó:

- `hero-banner-01.svg`: future connectivity / AI / data connector concept.
- `hero-banner-02.svg`: medical & healthcare connectivity concept, dựa trên ứng dụng medical/healthcare.
- `hero-banner-03.svg`: industrial automation / rack / backplane connectivity concept, dựa trên ứng dụng FA・設備機器 và rack products.

Ghi chú: 2 banner mới chính là `hero-banner-02.svg` và `hero-banner-03.svg`. Slide 1 cũng được chuyển sang SVG để đồng bộ visual.

## 12. Footer requirements

Footer dựng theo ảnh tham khảo số 2.

- Background footer màu xám nhạt.
- Footer main gồm 4 cột trên PC:
  1. Logo KEL, địa chỉ, số điện thoại, social/icon buttons.
  2. 製品について.
  3. 企業について.
  4. ニュースレター.
- Newsletter có input email và button `登録`.
- Footer bottom gồm copyright bên trái và các link bên phải:
  - Privacy Policy
  - Terms of Use
  - Sitemap
- Footer responsive:
  - Tablet chuyển thành 2 cột.
  - Mobile chuyển thành 1 cột.
  - Newsletter form mobile nhỏ chuyển thành input/button xếp dọc.

## 13. JavaScript hiện tại

File `assets/js/main.js` xử lý:

- Header hide/show theo hướng scroll.
- Thêm class `is-scrolled` cho header khi user đã cuộn xuống.
- Không ẩn header khi mobile menu đang mở.
- Mobile drawer menu từ trái vào.
- Dimmed overlay cho mobile menu.
- Lock body scroll khi menu mở.
- Đóng mobile menu khi click dimmed, click link, click close button hoặc nhấn Escape.
- Đóng mobile menu khi resize lên PC.
- Language dropdown open/close.
- Đóng language dropdown khi click outside hoặc nhấn Escape.
- Khởi tạo Swiper hero slider với `effect: 'fade'`.
- Khởi tạo pagination clickable cho Swiper.
- Khởi tạo AOS.
- Khởi tạo number count-up cho Corporate Overview bằng `initCounters()`.
- Khởi tạo Lucide icons.

## 14. Responsive notes

- Header desktop nav ẩn ở `max-width: 1180px`.
- Mobile menu dùng `width: min(86vw, 390px)` và `height: 100svh`.
- Hero trên mobile dùng overlay theo chiều dọc để text dễ đọc.
- Hero text trên mobile align về đầu section, không căn giữa quá thấp.
- Footer PC 4 cột, tablet 2 cột, mobile 1 cột.

## 15. Ghi chú triển khai tiếp theo

Sau khi hoàn thành header / hero / footer, các section tiếp theo cần build gồm:

- Product/Solutions cards.
- Product search UI.
- Khi tạo Product/Solutions thật, có thể thêm lại section `#products`. Hiện tại section products placeholder đã bị xóa theo yêu cầu, nên link `製品情報` trên header đang tạm để `href="#none"`.
- Application/Industry section.
- Strength/K-ELements section.
- Technology/Learn section.
- News tab UI.
- Recruit/IR/Contact CTA.
- Responsive chi tiết cho từng component.
- Kiểm tra lại spacing và font-weight theo design direction.


## 16. Corporate Overview section

### 16.1 Mục đích

Section này được thêm ngay sau Hero, thay cho section `Products` placeholder trước đó.

Mục tiêu của section:

- Giới thiệu nhanh KEL là công ty gì.
- Tạo cảm giác corporate nhưng vẫn hiện đại, kỹ thuật và đáng tin cậy.
- Cho người dùng thấy các số liệu doanh nghiệp quan trọng ngay sau first view.
- Dẫn mạch nội dung từ Hero "future connectivity" sang thông tin công ty thực tế.

Section `Products` placeholder cũ đã được xóa vì chưa có nội dung thật. Hero scroll cũng được đổi từ `#products` sang `#company`.

### 16.2 Nội dung hiển thị

Text/number hiện tại dựa trên ảnh tham khảo của user:

```text
Corporate Overview
工業用コネクタのリーディングカンパニー

ケルは創業以来、コネクタ・ハーネス・ラックの事業メーカーとして、高信頼性が求められる産業機器分野で独自の地位を築いてきました。

Founded: 1962
Revenue FY2025: 118 億円
Employees: 315 名
Tags: 産業機器 / 医療 / 車載 / 映像 / インフラ
```

Ghi chú: Các số liệu như `FY2025`, `118億円`, `315名` đang lấy theo ảnh section tham khảo. Khi làm bản production nên xác nhận lại số liệu chính thức với client hoặc tài liệu IR mới nhất.

### 16.3 Layout

PC layout:

- Phần heading chia 2 cột:
  - Cột trái: kicker `CORPORATE OVERVIEW` + title lớn.
  - Cột phải: đoạn mô tả ngắn, căn phải giống ảnh tham khảo.
- Phần card chia 2 cột:
  - Card trái nhỏ: Founded / 1962 / mô tả ngắn.
  - Card phải rộng màu xanh: Revenue, Employees, industry tags và graphic bánh răng/công nghệ.

Tablet/Mobile layout:

- Heading chuyển thành 1 cột.
- Lead text căn trái để dễ đọc.
- Card chuyển thành 1 cột.
- Card xanh đổi cấu trúc nội dung từ ngang sang dọc để không bị chật.
- Tags tự wrap theo chiều ngang.

### 16.4 Animation

Ý tưởng animation của section:

- Section dùng AOS `fade-up` cho title, lead và từng card.
- Các card có delay khác nhau để xuất hiện lần lượt.
- Đường line dọc cạnh title có animation `scaleY` từ trên xuống dưới.
- Các con số `1962`, `118`, `315` có count-up animation khi scroll đến section.
- Background gear trong card xanh xoay rất chậm để tạo cảm giác công nghệ/cơ khí nhưng không gây rối mắt.
- Có xử lý `prefers-reduced-motion`: nếu user giảm motion thì count-up hiển thị ngay giá trị cuối và animation bị giảm.

### 16.5 Code liên quan

HTML:

- Section id: `company`.
- Class chính: `.corporate-overview`.
- Card class: `.overview-card`, `.overview-card--founded`, `.overview-card--blue`.
- Counter sử dụng attribute: `data-count-target`.

CSS:

- Style section nằm trong block `/* Corporate overview */`.
- Responsive riêng cho `max-width: 900px` và `max-width: 640px`.
- Animation CSS: `overviewLine`, `gearRotate`.

JavaScript:

- Function `initCounters()` trong `assets/js/main.js`.
- Dùng `IntersectionObserver` để chỉ chạy counter khi number đi vào viewport.
- Nếu browser không hỗ trợ `IntersectionObserver`, counter chạy ngay.

## 17. Navigation note sau khi xóa Products placeholder

Vì section `#products` placeholder đã bị xóa, link `製品情報` trên desktop/mobile header hiện đang để `href="#none"` để tránh trỏ đến section không tồn tại.

Khi build section Product/Solutions thật ở bước sau, cần:

- đổi link `製品情報` từ `#none` về `#products`;
- đổi Hero scroll về `#products` nếu muốn quay lại flow Hero → Product;
- hoặc giữ Hero scroll về `#company` nếu muốn flow Hero → Corporate Overview.

## 18. Cập nhật mới: Corporate Overview fade + Product Solutions section

### 18.1 Corporate Overview

Theo yêu cầu mới, section `Corporate Overview` cần tiếp tục được áp dụng hiệu ứng fade rõ ràng cho các thành phần chính.

Hiện trạng đã áp dụng:

- Title block dùng `data-aos="fade-up"`.
- Lead text dùng `data-aos="fade-up"` và delay nhẹ.
- Card `Founded` và card `Revenue / Employees` dùng `data-aos="fade-up"` với delay khác nhau.
- Đường line dọc cạnh title có animation riêng `overviewLine`.
- Các số `1962`, `118`, `315` có count-up animation khi section đi vào viewport.
- Background gear trong card xanh xoay chậm để tạo cảm giác công nghệ/cơ khí.

### 18.2 Product Solutions section

Đã tạo section mới ngay sau `Corporate Overview`.

Section id:

```text
#products
```

Mục đích:

- Tái giới thiệu nhóm sản phẩm chính của KEL theo hướng hiện đại hơn.
- Đóng vai trò Product Gateway từ trang chủ đến product site / product list.
- Thể hiện các nhóm sản phẩm chính: Connector, Harness, Rack, Others.

Nội dung chính:

```text
製品ソリューション
製品一覧を見る

次世代の「繋ぐ」を形に
高密度・高速伝送を支える最先端のコネクタソリューションを一覧に。

Connector
フローティング、ハーフピッチ、極細同軸など高精度なコネクタ群。

Harness
カスタムハーネス設計・製造。お客様の要求に合わせた最適解を。

Rack
19インチラック、バックプレーン。堅牢なハウジングソリューション。

Others
ICソケット、テストソケット、周辺パーツなど広範なラインナップ。
```

### 18.3 Product Solutions layout

PC:

- Header gồm title bên trái và link `製品一覧を見る` bên phải.
- Main visual lớn phía trên, bo góc nhẹ, có copy box dạng glass/white overlay ở góc trái dưới.
- Bên dưới là 4 card theo hàng ngang:
  - Connector
  - Harness
  - Rack
  - Others

Tablet:

- Product card chuyển thành grid 2 cột.

Mobile:

- Product section header chuyển thành 1 cột.
- Product card chuyển thành 1 cột.
- Main visual tăng chiều cao để copy box không bị chật.

### 18.4 Product Solutions animation / interaction

- Section header dùng AOS `fade-up`.
- Main visual dùng AOS `fade-up`.
- Mỗi card item dùng AOS `fade-up` và delay khác nhau để xuất hiện lần lượt.
- Khi hover/focus card item:
  - Ảnh bên trong card scale lên `1.05`.
  - Title đổi sang màu primary.
  - Card vẫn giữ nền và cấu trúc ổn định, không làm layout bị nhảy.

### 18.5 Product image assets

Đã thêm các SVG image tự tạo trong thư mục `assets/images/`:

```text
product-solution-main.svg
product-connector.svg
product-harness.svg
product-rack.svg
product-others.svg
```

Các ảnh này chỉ là prototype visual theo hướng hiện đại/công nghệ, dùng để mô phỏng sản phẩm của KEL. Khi có ảnh thật từ client, có thể thay trực tiếp trong HTML.

### 18.6 Xóa section tạm

Theo yêu cầu mới, đã xóa hoàn toàn các section placeholder sau:

```text
IR placeholder
Recruit placeholder
```

Lý do:

- Đây chỉ là section tạm từ giai đoạn foundation.
- Hiện tại flow mới ưu tiên: Hero → Corporate Overview → Product Solutions → Footer.

### 18.7 Navigation sau cập nhật

- Link `製品情報` trên desktop/mobile header đã đổi về `#products`.
- Link `企業情報` giữ `#company`.
- Vì section tạm `#ir` và `#recruit` đã bị xóa, link `投資家情報` và `採用情報` trên header tạm thời dùng `href="#none"` cho đến khi tạo section/page thật.
- Footer vẫn giữ các nhóm link thông tin như hiện tại.

## 19. Cập nhật mới: Field of Activity / K-Elements / fade-up common

### 19.1 Common animation update

Theo yêu cầu mới, các hiệu ứng xuất hiện ở các section trước đã được thống nhất về dạng `fade-up` thay vì chỉ `fade`.

Áp dụng cho:

- `Corporate Overview`
- `Product Solutions`
- `Field of Activity`
- `KELの強み / K-Elements`
- Footer elements

Mục đích:

- Khi user scroll xuống, thành phần sẽ xuất hiện từ dưới lên nhẹ nhàng.
- Tạo cảm giác trang hiện đại, có chiều sâu và nhất quán hơn.
- Vẫn dùng thư viện AOS theo yêu cầu ban đầu.

Setting AOS hiện tại:

```js
AOS.init({
  duration: 780,
  easing: 'ease-out-cubic',
  once: true,
  offset: 90,
});
```

Có xử lý `prefers-reduced-motion` để giảm motion cho user không muốn animation.

### 19.2 Section mới: Field of Activity / 活躍するフィールド

Đã tạo section mới ngay sau `Product Solutions`.

Section id:

```text
#fields
```

Mục đích:

- Trình bày các lĩnh vực ứng dụng chính của sản phẩm KEL.
- Làm rõ việc công nghệ connector/harness/rack của KEL không chỉ nằm trong sản phẩm riêng lẻ mà đang hỗ trợ nhiều ngành công nghiệp tiên tiến.
- Tăng khả năng storytelling của homepage: từ “KEL là ai” → “KEL bán gì” → “KEL hoạt động trong lĩnh vực nào”.

Nội dung chính:

```text
GLOBAL APPLICATIONS
活躍するフィールド
ケルのテクノロジーは、あらゆる最先端領域で「繋ぐ」役割を果たしています。

FA・設備機器
インフラ・鉄道
カメラ・映像
医療・ヘルスケア
自動車 / EV
アミューズメント
```

### 19.3 Field of Activity visual direction

Theo yêu cầu, section này không dùng bố cục ảnh giống hero. Đã tạo một background SVG riêng:

```text
assets/images/activity-bg.svg
```

Hướng visual:

- Nền dark tech / futuristic.
- Có circuit board, blueprint line, chip, light node, network line.
- Có text lớn mờ `FIELD OF ACTIVITY` ở background để tạo cảm giác như ảnh tham khảo.
- Có overlay xanh đậm để text/card nổi bật và đồng nhất với primary color `#0d80c0`.

Lưu ý:

- Đây là prototype background tự tạo bằng SVG.
- Khi client cung cấp ảnh thật, có thể thay trực tiếp file `activity-bg.svg` hoặc đổi `src` trong HTML.

### 19.4 Field of Activity parallax

Đã bổ sung hiệu ứng parallax cho background khi user scroll.

Cách triển khai:

- HTML dùng attribute:

```html
<section data-parallax-section>
  <img data-parallax-bg />
</section>
```

- JS sẽ tính vị trí section theo viewport và thay đổi `transform` của ảnh nền.
- Background sẽ chuyển động chậm theo scroll để tạo cảm giác chiều sâu.
- Nếu user bật `prefers-reduced-motion: reduce`, hiệu ứng parallax sẽ không chạy.

### 19.5 Field of Activity card layout

PC:

- 6 card nằm trên 1 hàng.
- Mỗi card có icon, label, glassmorphism background.
- Hover card sẽ nổi lên nhẹ và đổi border/background theo màu xanh.

Tablet:

- Card chuyển thành 3 cột.

Mobile:

- Card chuyển thành 1 cột.
- Chiều cao card giảm để tránh section quá dài.

### 19.6 Section mới: KELの強み / K-Elements

Đã tạo section tiếp theo sau `Field of Activity`.

Section id:

```text
#strength
```

Mục đích:

- Trình bày 3 trụ cột thế mạnh của KEL theo nội dung đã phân tích từ website hiện tại.
- Giúp homepage thể hiện năng lực nội tại, không chỉ dừng ở sản phẩm và lĩnh vực ứng dụng.

Nội dung chính:

```text
KELの強み
K-Elements
「繋ぐ」その一瞬に、私たちの誇りと技術が詰まっています。最高品質を届けるための3つの柱。

R&D 技術開発
独自のシミュレーション技術と設計思想で、次世代のニーズを形にします。

Stable Production
国内自社工場による徹底した品質管理と、安定した供給体制。

Flexible Response
お客様の課題に寄り添い、カスタマイズから一貫したサポートを提供します。
```

### 19.7 K-Elements layout

PC:

- Nền xám nhạt giống ảnh tham khảo.
- Cột trái: title, mô tả, link concept movie.
- Cột phải: 3 card thế mạnh.
- Card có icon, điểm nhấn nhỏ ở góc trên, shadow nhẹ.

Tablet:

- Chuyển thành 1 cột: text ở trên, card ở dưới.
- Card hiển thị 2 cột nếu đủ rộng.

Mobile:

- Card chuyển thành 1 cột.
- Text và khoảng cách được giảm để dễ đọc.

### 19.8 K-Elements animation / interaction

- Cột text dùng `data-aos="fade-up"`.
- Mỗi card dùng `data-aos="fade-up"` với delay tăng dần.
- Card có hover nhẹ `translateY(-8px)` và shadow mạnh hơn.
- Link concept movie có hover dịch sang phải nhẹ.

### 19.9 Flow homepage sau cập nhật

Flow hiện tại của trang chủ:

```text
Header
Hero Slider
Corporate Overview
Product Solutions
Field of Activity
KELの強み / K-Elements
Footer
```

Các section tạm `IR` và `Recruit` vẫn đã được xóa theo yêu cầu trước đó.


## 19. Latest refinement update

### 19.1 Global Applications section

Recent feedback and implementation intent:

- Section `Global Applications / 活躍するフィールド` needed a **stronger parallax feeling** on the background image.
- Section height should be increased by approximately **25%** compared with the earlier version.
- The background image should not be a generic abstract tech composition. It should feel more specific to **KEL's actual product domain**.
- New background direction:
  - high-tech industrial atmosphere
  - visible PCB / circuit-board details
  - connector / harness / rack product motifs
  - dark blue + metallic palette
  - visually rich but still leaving enough readable space for white text overlay
- To satisfy this, a new custom background image asset was introduced based on KEL-related product references.
- Parallax motion was strengthened by increasing the background scale and vertical movement range.
- Overlay darkness was adjusted so the background details remain clearer while text is still readable.

### 19.2 Fade-up behavior adjustment

Feedback summary:

- The previous AOS animation felt closer to simple `fade` than `fade-up`.
- There was also a perception that elements became active too early when entering a section, making the reveal feel slightly abrupt.

Improvement approach:

- Strengthen the initial translate distance of `fade-up` so the vertical movement is more noticeable.
- Keep opacity transition, but also add clearer Y-axis movement.
- Delay activation slightly by adjusting the AOS trigger configuration so elements reveal **later** and feel more intentional during scroll.
- Maintain `prefers-reduced-motion` support.

Implementation notes:

- `fade-up` now starts from a larger downward offset.
- AOS `offset` was increased so animation triggers later in the viewport.
- Section components continue to use `data-aos="fade-up"` consistently.
- The goal is a smoother and more obvious reveal instead of a fade-only impression.


## 20. Latest Global Applications / Common refinement

### 20.1 Global Applications background handling

Cập nhật mới theo feedback:

- Không dùng thẻ `<img>` riêng cho background của section nữa.
- Background của section `Global Applications / 活躍するフィールド` được đưa vào CSS bằng `background-image`.
- Hiệu ứng parallax desktop dùng hướng CSS đơn giản:
  - `background-attachment: fixed`
  - `background-size: cover`
  - `background-position: center center`

Lưu ý kỹ thuật:

- Thuộc tính đúng để tạo kiểu fixed background là `background-attachment: fixed`, không phải `background-position: fixed`.
- Cách này có thể tạo cảm giác parallax đơn giản trên PC.
- Trên một số trình duyệt mobile, đặc biệt iOS Safari, `background-attachment: fixed` thường không ổn định hoặc bị bỏ qua. Vì vậy mobile được fallback về `background-attachment: scroll` để tránh giật/layout lỗi.

### 20.2 Global Applications visual / layout

- Đã thay background mới vào section.
- Xóa ghost text lớn `Field of Activity` theo yêu cầu.
- Tăng chiều cao section thêm khoảng 25% nữa để background có không gian hiển thị rộng hơn.
- Background đi theo hướng:
  - công nghiệp công nghệ cao
  - có chi tiết bảng mạch/PCB rõ hơn
  - liên tưởng tới connector, harness, rack
  - phù hợp với lĩnh vực sản phẩm của KEL
- Overlay vẫn được giữ để đảm bảo chữ trắng đọc được trên nền ảnh phức tạp.

### 20.3 Global Applications responsive cards

- PC: 6 item trên 1 hàng.
- Tablet: tự co lại theo grid hiện tại.
- Mobile nhỏ `<= 640px`: card ứng dụng đổi thành **2 item trên 1 hàng** thay vì 1 item trên 1 hàng.
- Card mobile được giảm chiều cao/icon một chút để 2 cột không quá chật.

### 20.4 Common fade-up refinement

Vấn đề trước đó:

- Fade-up nhìn giống fade thường.
- Khi vừa tới section, phần tử đã gần như hiện sẵn nên cảm giác chuyển động chưa rõ.

Cập nhật:

- Tăng khoảng dịch chuyển ban đầu từ dưới lên (`translateY`) để thấy rõ movement.
- Tăng AOS `offset` để trigger muộn hơn.
- Tăng nhẹ `duration` để chuyển động mượt hơn.
- Giữ consistent `data-aos="fade-up"` cho các thành phần section.


## 21. KELの強み slider update

### 21.1 Section target

Cập nhật section `KELの強み / K-Elements` từ layout card grid tĩnh thành slider.

Yêu cầu chính:

- 3 item strengths vẫn giữ nội dung hiện tại:
  - R&D 技術開発
  - Stable Production
  - Flexible Response
- Mỗi card trong slider có kích thước cố định:
  - width: `360px`
  - height: `370px`
- Dùng Swiper slider vì project đã có Swiper CDN cho Hero.
- Slider hiển thị pagination dạng chấm tròn ở phía dưới.
- Các chấm pagination có active state màu primary.

### 21.2 Responsive behavior

- Desktop / Tablet: slider dùng `slidesPerView: auto`, card giữ width `360px`, khoảng cách slide khoảng `28px - 32px`.
- Mobile: slider được làm dạng overflow/full-bleed để card có cảm giác chạy tràn qua màn bên trái như ảnh tham khảo.
- Trên mobile, slider wrapper có negative margin-left để không bị bó trong container `20px` mặc định.
- Section vẫn giữ `overflow: hidden` để tránh tạo horizontal scroll toàn trang.

### 21.3 A11y / interaction

- Swiper bật pagination clickable.
- Swiper bật keyboard control trong viewport.
- Card vẫn giữ hover nhẹ bằng `translateY` và shadow.
- Pagination được đặt trong DOM bằng `aria-label` để hỗ trợ ý nghĩa điều hướng slide.


## 21. K-Elements slider refinement

### 21.1 Mobile slide behavior

Feedback mới cho section `KELの強み / K-Elements`:

- Trên mobile, slide đầu tiên khi load cần cách mép trái màn hình `20px`.
- Khi user swipe sang slide tiếp theo, slide cũ phải có thể trượt sát tới mép trái màn hình, không bị cắt từ vị trí còn chừa `20px`.
- Khi đến slide cuối, vẫn cần giữ khoảng thở bên phải khoảng `20px`.
- Width item trên mobile đổi từ `360px` xuống `330px`.

Cách xử lý:

- Mobile slider được kéo ra full viewport bằng `width: 100vw` và `margin-left: -20px`, vì section container vẫn có padding `20px`.
- Swiper dùng `slidesOffsetBefore: 20` và `slidesOffsetAfter: 20` ở mobile.
- Từ breakpoint `641px` trở lên, offset này được reset về `0` để layout PC/tablet không bị lệch.

### 21.2 PC shadow handling

Vấn đề:

- Vì card nằm trong Swiper/slider area có overflow, box-shadow hai bên có cảm giác bị cắt cụt.

Cách xử lý:

- Tăng khoảng đệm trái/phải trong `.strength-section__slider-wrap` để card shadow có không gian hiển thị.
- Thêm pseudo layer `::before` và `::after` ở hai mép slider với gradient cùng màu nền section để tạo cảm giác shadow liền mạch hơn.
- Trên mobile ẩn hai pseudo layer này để không ảnh hưởng cảm giác slide tràn màn hình.


## 22. K-Elements slider refinement - shadow and mobile pagination

### 22.1 PC shadow refinement

Feedback:

- Right-side shadow/gradient around the K-Elements slider looked too hard, like a wall blocking the card shadow.

Update:

- The slider wrapper now gives more real spacing on the right side so card shadows have room to spread.
- The right pseudo overlay was widened and softened with a longer gradient.
- The gradient now fades from transparent into the section background gradually, instead of ending sharply.
- This keeps the card shadow feeling continuous and blended into the section background.

### 22.2 Mobile slider behavior

Feedback:

- Mobile pagination showed 4 dots even though there are only 3 strength cards.
- At the last slide, dragging created a small unwanted extra movement.
- Desired mobile display: one 330px card is visible, with a small part of the next card visible behind it, like a carousel cue.

Update:

- Strength slider now uses custom pagination bullets generated from the real number of slides, so it always shows exactly 3 dots.
- Mobile slide width remains `330px`.
- Mobile slider keeps `slidesOffsetBefore: 20` so the first slide starts 20px from the screen edge.
- `slidesOffsetAfter: 20` keeps breathing room after the last slide.
- `slidesPerView: auto` remains because it allows one card plus a small preview of the next card.
- The custom pagination updates using `activeIndex`, avoiding the extra snap/pagination dot issue caused by Swiper's auto snap grid.


## 22. K-Elements slider correction after rollback feedback

Yêu cầu mới nhất:

- Không bỏ `overflow: hidden` ở vùng slider vì cách trước làm layout nhìn lỗi hơn.
- Rollback hướng xử lý phần K-Elements về gần bản trước đó: wrapper slider vẫn là vùng cắt có kiểm soát.
- PC: box-shadow bên phải chỉ cần hòa vào nền, không được tạo cảm giác như một vệt/khối màu đen hoặc một bức tường chắn.
- Cách xử lý PC:
  - giữ wrapper `overflow: hidden`
  - tạo padding nội bộ để shadow có không gian hiển thị
  - thêm lớp gradient nền màu `#e8edf1` ở mép phải, kéo dài và blur nhẹ để shadow tan vào background
  - không dùng overlay đậm/hard edge
- Mobile:
  - slider vẫn dùng `slidesPerView: auto`
  - slide đầu bắt đầu cách trái 20px
  - slide item giữ width 330px, với fallback `calc(100vw - 60px)` cho màn quá nhỏ
  - có thể nhìn thấy một phần slide kế tiếp phía sau
  - pagination được render thủ công theo số slide thật để chỉ còn đúng 3 chấm
  - tắt overscroll/resistance mạnh để tránh đến slide cuối vẫn bị nhích thêm hoặc tạo cảm giác có snap dư


## 22. K-Elements Swiper cleanup and bug fix

### 22.1 Swiper parameters

Theo feedback mới, cấu hình `strengthSwiper` đã được tinh giản lại. Các tham số không cần thiết đã được xóa để Swiper sử dụng behavior mặc định nhiều nhất có thể.

Giữ lại các tham số thật sự cần cho yêu cầu UI:

- `slidesPerView: 'auto'`: để card giữ kích thước cố định theo CSS.
- `spaceBetween`: khoảng cách giữa các card.
- `slidesOffsetBefore / slidesOffsetAfter` trên mobile: để slide đầu cách trái 20px và slide cuối có khoảng thở bên phải.
- `watchOverflow`: tránh behavior không cần thiết khi nội dung không overflow.
- `pagination`: dùng pagination mặc định của Swiper, không render thủ công.
- `breakpoints`: chỉ để phân biệt spacing/offset mobile và PC.

Đã xóa các tham số gây rối hoặc không cần thiết như custom bullet thủ công, `resistanceRatio`, `threshold`, `normalizeSlideIndex`, `roundLengths`, `slideToClickedSlide`, `grabCursor`, custom `touchEnd`.

### 22.2 Pagination alignment

- Pagination của section `K-Elements` được đặt lại ở giữa vùng slider.
- Dùng class mặc định `.swiper-pagination-bullet` của Swiper, chỉ custom style màu/kích thước.

### 22.3 PC end-slide bug

Vấn đề trước:

- Khi kéo đến slide cuối trên PC vẫn kéo thêm được một đoạn.
- Một số màn hình dưới 1920px bị kẹt ở slide cuối, không swipe ngược lại được.

Nguyên nhân khả dĩ:

- Có quá nhiều custom option can thiệp vào snap/active index.
- Custom `touchEnd` ép `slideTo(last)` có thể làm swiper bị giữ ở slide cuối.

Cách sửa:

- Bỏ custom `touchEnd`.
- Bỏ custom pagination tự quản lý active index.
- Để Swiper tự xử lý snap grid và active index bằng default behavior.

### 22.4 Shadow right side

- Giữ `overflow: hidden` cho wrapper slider như yêu cầu.
- Chỉ dùng lớp gradient nhẹ màu nền ở bên phải để làm mềm box-shadow bị cắt.
- Không bỏ overflow hidden nữa.
- Không tạo vùng đen/cứng như một bức tường chắn.


## 23. Knowledge Center / News sections

### 23.1 Knowledge Center

Added section: `Knowledge Center / 学ぶ・知る`.

Purpose:

- Surface technical content and connector-related knowledge on the homepage.
- Make KEL feel like a technical partner, not only a product catalog.
- Provide a gateway to SEO-friendly knowledge pages such as floating connector, half-pitch connector, thermal solution, and micro-coaxial connector topics.

Layout:

- White background.
- Section title on the left, explanatory lead text on the right.
- Four knowledge cards in one row on PC.
- Cards become two columns on tablet and one column on mobile.

Interaction:

- Each card starts with a light gray background and left primary border.
- On hover/focus-visible, card background changes to white.
- Card also lifts slightly with a softer shadow.

### 23.2 News

Added section: `ニュース`.

Purpose:

- Show latest updates in a corporate-news style.
- Keep categories visible: `すべて`, `製品`, `IR`, `お知らせ`.
- Provide quick filtering with simple JavaScript using data attributes.

Layout:

- Light gray background.
- Title on the left and category tabs on the right on PC.
- On mobile, title and tabs stack vertically.
- News list uses horizontal rows on PC and compact stacked rows on mobile.

Interaction:

- Hover/focus-visible on news item changes border color to primary.
- Right arrow icon moves slightly to the right on hover/focus-visible.
- Tabs toggle active state and filter visible items.

Homepage flow after update:

```text
Header
Hero Slider
Corporate Overview
Product Solutions
Field of Activity
KELの強み / K-Elements
Knowledge Center
ニュース
Footer
```


## 24. Knowledge Center / News responsive refinement

### 24.1 Knowledge Center

Latest adjustment:

- Hover transition of `knowledge-card` background was lengthened so the change from light gray to white feels smoother and more intentional.
- On mobile, `knowledge-card` layout is forced to **1 item per row**.

### 24.2 News section

Latest adjustment:

- Removed `transform` from `news-item` hover. News rows no longer move upward on hover.
- News item hover still changes border color to primary and keeps the right arrow moving slightly to the right.
- `news-tabs__button` hover no longer changes border to primary. Border stays white on hover/focus.
- Only `.news-tabs__button.is-active` uses the primary border color.
- Mobile news item layout was changed to match the latest reference:
  - card-like vertical rows
  - category badge and date on the first row
  - title on the second row
  - arrow icon hidden on mobile
  - title wraps normally instead of staying on one line


## 25. News tabs + CTA panel section update

### 25.1 News section tab behavior clarification

Feedback clarification for the `ニュース` section:

- Inactive tabs should **not** show a white border by default on initial load.
- Only the active tab should have the primary border color.
- Inactive tabs should become white background + white border only on hover/focus.

Implementation result:

- Default inactive state: transparent border.
- Hover/focus inactive state: white background + white border.
- Active state: white background + primary border color.

### 25.2 New CTA panel section

A new section was added before the footer, based on the provided desktop and mobile references.

Section purpose:

- Provide clear shortcut cards to:
  - 採用情報
  - IR情報
  - 代理店一覧
  - お問い合わせ

Background image direction:

- Generate and use a background image showing workers actively working inside a modern factory.
- Workers wear full safety/protective clothing.
- The factory includes advanced machinery and production-line equipment.
- The section uses a parallax-style background treatment and should feel premium/corporate.

Visual / interaction rules:

- Section height should be at least around 700px or more for a better parallax impression.
- Card hover: `rgb(255 255 255 / 0.1)`.
- Last card (`お問い合わせ / Contact`) default background: `rgb(0 97 148 / 0.2)`.
- Last card hover background: `rgb(0 97 148 / 0.3)`.
- Mobile layout: 1 item per row, matching the provided reference image.


## 26. Back to top button

Requirement:

- Add a circular `Back to top` button similar to the provided reference image.
- When the page first loads, the button is hidden.
- The button only appears after the user scrolls more than `100px`.
- When appearing, the button uses a fade-up style motion:
  - opacity from 0 to 1
  - translateY from below to its normal position
- Clicking the button scrolls smoothly back to the top.
- On hover/focus, the button has a small animation:
  - moves slightly upward
  - background changes to dark
  - icon shifts upward slightly
- The button includes an accessible label: `ページトップへ戻る`.
