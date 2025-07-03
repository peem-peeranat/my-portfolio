# Font Setup Guide

## ภาษาไทยและภาษาอังกฤษ Font System

เว็บไซต์นี้ใช้ font system ที่แยกตามภาษา:

### Fonts ที่ใช้
- **ภาษาไทย**: Noto Sans Thai (weight: 100-200)
- **ภาษาอังกฤษ**: Montserrat (weight: 100-200)

### การตั้งค่า

#### 1. Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..200;1,100..200&family=Noto+Sans+Thai:wght@100..200&display=swap');
```

#### 2. CSS Variables
```css
:root {
  --font-thai: 'Noto Sans Thai', 'Sarabun', 'Kanit', sans-serif;
  --font-english: 'Montserrat', sans-serif;
}
```

#### 3. CSS Classes
- `.font-thai` - สำหรับข้อความภาษาไทย
- `.font-english` - สำหรับข้อความภาษาอังกฤษ

### การใช้งานใน React Components

#### วิธีที่ 1: ใช้ getFontClass() จาก LanguageContext
```jsx
import { useLanguage } from '../context/LanguageContext';

function MyComponent() {
  const { t, getFontClass } = useLanguage();
  
  return (
    <h1 className={`text-2xl ${getFontClass()}`}>
      {t('title')}
    </h1>
  );
}
```

#### วิธีที่ 2: ใช้ CSS classes โดยตรง
```jsx
// สำหรับข้อความภาษาไทย
<div className="font-thai">สวัสดีครับ</div>

// สำหรับข้อความภาษาอังกฤษ
<div className="font-english">Hello World</div>
```

#### วิธีที่ 3: ใช้ lang attribute
```jsx
// ภาษาไทย
<div lang="th">สวัสดีครับ</div>

// ภาษาอังกฤษ
<div lang="en">Hello World</div>
```

### การตั้งค่า Weight
- ทั้งสอง font ถูกจำกัดให้ใช้ weight ไม่เกิน 200 (ExtraLight)
- ใช้ `font-weight: 200` เป็นค่าเริ่มต้น
- Tailwind CSS class `font-light` จะใช้ weight 200

### การทำงานของ LanguageContext
- `getFontClass()` จะคืนค่า `font-thai` หรือ `font-english` ตามภาษาปัจจุบัน
- สามารถส่ง parameter เพื่อบังคับภาษาได้: `getFontClass('en')` หรือ `getFontClass('th')`

### การแก้ไขปัญหา Font ภาษาไทย
- เพิ่ม fallback fonts: Sarabun, Kanit
- ใช้ `!important` เพื่อ override Tailwind CSS
- เพิ่ม `font-display: swap` เพื่อการโหลดที่ดีขึ้น
- ใช้ CSS selectors ที่เฉพาะเจาะจงมากขึ้น

### ตัวอย่างการใช้งาน
```jsx
// ใช้ภาษาปัจจุบัน
<h1 className={`text-4xl ${getFontClass()}`}>{t('title')}</h1>

// บังคับภาษาไทย
<p className={`text-lg ${getFontClass('th')}`}>ข้อความภาษาไทย</p>

// บังคับภาษาอังกฤษ
<p className={`text-lg ${getFontClass('en')}`}>English text</p>

// ใช้ Tailwind font-light class
<p className="font-thai font-light">ข้อความภาษาไทยน้ำหนักเบา</p>
``` 