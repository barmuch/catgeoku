# Rich Text Editor - Fitur Lengkap

## 📝 Overview
Rich text editor dengan fitur lengkap untuk membuat dan mengedit artikel/event di admin panel.

## ✨ Fitur Utama

### 1. **Auto-Center Images** ✅
- **Upload gambar otomatis berada di tengah**
- Ketika admin upload gambar, gambar langsung diposisikan di tengah editor
- Gambar juga muncul di tengah saat ditampilkan di halaman user

**Cara Kerja:**
```javascript
// Saat upload gambar:
1. Admin klik tombol image di toolbar
2. Pilih file gambar
3. Gambar otomatis di-insert dengan alignment center
4. Styling auto-applied: margin: 0 auto, display: block
```

**CSS yang Digunakan:**
```css
/* Di Editor */
.ql-editor .ql-align-center img {
  margin-left: auto;
  margin-right: auto;
}

/* Di Client (halaman user) */
.article-content .ql-align-center img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
```

### 2. **Image Resize** ✅
- **Gambar bisa di-resize dengan mudah**
- Klik gambar → masukkan ukuran baru (contoh: 50%, 300px, 100%)
- Ukuran tersimpan dan muncul sesuai di halaman user

**Cara Pakai:**
1. Klik gambar yang sudah di-upload
2. Dialog muncul meminta ukuran baru
3. Masukkan ukuran: `50%`, `300px`, `800px`, dll
4. Gambar langsung berubah ukuran
5. Aspect ratio tetap terjaga (height: auto)

**Contoh Input:**
- `50%` - gambar 50% lebar container
- `300px` - gambar lebar 300 piksel
- `100%` - gambar full width

### 3. **Formula Support (LaTeX)** ✅
- **Tombol Formula (Σ) di toolbar**
- Support rumus matematika dengan syntax LaTeX
- Menggunakan library KaTeX untuk rendering

**Cara Pakai:**
1. Klik tombol Σ (Sigma) di toolbar
2. Masukkan rumus LaTeX
3. Formula di-render dengan cantik

**Contoh Formula:**
```latex
E = mc^2
\frac{a}{b}
\sqrt{x}
x^2 + y^2 = z^2
\int_{a}^{b} f(x)dx
```

### 4. **Rich Formatting Toolbar**
Toolbar lengkap dengan fitur:
- **Headers** (H1-H6)
- **Font** styles
- **Size** (small, normal, large, huge)
- **Bold, Italic, Underline, Strike**
- **Colors** (text & background)
- **Subscript/Superscript**
- **Lists** (ordered & bullet)
- **Indent** (increase/decrease)
- **Alignment** (left, center, right, justify)
- **Blockquote & Code Block**
- **Links, Images, Videos**
- **Formula** (mathematical expressions)
- **Clean** (remove formatting)

### 5. **Dark Mode Support** 🌙
- Editor otomatis adjust dengan theme
- Toolbar, border, dan text color berubah sesuai dark mode
- Warna accent: Orange (#f97316)

## 🎨 Visual Features

### Image Hover Effect
```css
.ql-editor img:hover {
  opacity: 0.9;
  box-shadow: 0 0 0 2px rgb(251 146 60); /* Orange */
  border-radius: 4px;
}
```

### Responsive Images
```css
.ql-editor img {
  max-width: 100%;
  height: auto;
  display: block;
  cursor: pointer;
}
```

## 📱 Client-Side Rendering

### ArticleContent Component
Component khusus untuk render HTML content dengan:
- ✅ Image alignment support (left, center, right)
- ✅ Responsive images
- ✅ Formula rendering (KaTeX)
- ✅ Link security (target="_blank", rel="noopener")
- ✅ Dark mode prose styling

## 🔧 Technical Details

### Dependencies
```json
{
  "react-quill": "^2.0.0",
  "katex": "^0.16.9"
}
```

### File Structure
```
components/admin/RichTextEditor.js     - Editor component
components/common/ArticleContent.js    - Client renderer
```

### Image Storage
- Images converted to **base64 data URLs**
- Stored directly in database (MongoDB)
- No external image hosting needed
- Alternative: Bisa diubah untuk upload ke cloud storage (Cloudinary, AWS S3, dll)

### Custom Image Handler
```javascript
const imageHandler = function() {
  // 1. Create file input
  // 2. Read file as base64 (FileReader)
  // 3. Insert image to editor
  // 4. Auto-center with formatLine
  // 5. Apply styles (maxWidth, margin)
  // 6. Add click handler for resize
}
```

## 📊 Data Flow

### Saat Create/Edit Article:
```
Admin Upload Image
    ↓
FileReader (convert to base64)
    ↓
Insert to Quill Editor (centered)
    ↓
Apply inline styles
    ↓
Save HTML to Database
    ↓
Display di Client dengan ArticleContent
```

### Saat Tampil di User:
```
Fetch Article dari Database
    ↓
Pass content (HTML) to ArticleContent
    ↓
dangerouslySetInnerHTML render HTML
    ↓
CSS apply styling untuk images
    ↓
KaTeX render formulas
    ↓
User lihat artikel lengkap
```

## 🚀 Usage Example

### Di Admin Panel:
1. Buka `/admin/articles/new` atau edit existing article
2. Di field "Content", klik toolbar untuk formatting
3. Upload gambar → otomatis center
4. Klik gambar untuk resize
5. Tambah formula dengan tombol Σ
6. Save → Publish

### Di User Side:
1. Buka `/posts/[slug]`
2. Artikel tampil dengan formatting lengkap
3. Images centered & responsive
4. Formulas di-render dengan KaTeX
5. Links buka di tab baru

## ⚙️ Configuration

### next.config.js - External Images
```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: '**' },
    { protocol: 'http', hostname: '**' }
  ]
}
```
Allows semua domain untuk Next.js Image optimization.

### Quill Modules
```javascript
modules: {
  toolbar: {
    container: [...], // toolbar buttons
    handlers: {
      image: imageHandler // custom image upload
    }
  }
}
```

### Quill Formats
```javascript
formats: [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'script', 'list', 'bullet', 'indent',
  'align', 'blockquote', 'code-block',
  'link', 'image', 'video',
  'formula', 'width', 'style'
]
```

## 🐛 Troubleshooting

### Gambar tidak centered di client?
✅ **Solved** - CSS sudah ditambahkan di ArticleContent.js

### Content tidak tersimpan?
✅ **Solved** - API routes sudah fix dengan explicit field checking

### Published article tidak muncul?
✅ **Solved** - Added `export const dynamic = 'force-dynamic'` di blog pages

### Formula tidak render?
- Pastikan KaTeX CSS sudah di-import: `import 'katex/dist/katex.min.css'`
- Check formula syntax LaTeX benar

### Image terlalu besar?
- Klik gambar → resize ke ukuran lebih kecil (contoh: 50% atau 600px)

## 📝 Notes

- Base64 images bisa bikin database besar, consider external storage untuk production
- Image resize pakai prompt dialog, bisa diubah jadi slider/input field untuk UX lebih baik
- Formula support lengkap untuk artikel-artikel teknis (Geology, Geophysics, Engineering)

## 🎯 Status: COMPLETED ✅

Semua fitur sudah diimplementasikan dan berfungsi dengan baik:
- ✅ Auto-center images on upload
- ✅ Click-to-resize images
- ✅ Formula support (LaTeX)
- ✅ Dark mode support
- ✅ Client-side rendering with proper CSS
- ✅ Responsive & accessible
