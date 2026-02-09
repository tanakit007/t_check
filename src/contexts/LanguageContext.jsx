import { createContext, useState, useContext } from "react";

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      home: "Home",
      chat: "Launch Chat",
      title: "T-Check-Demo",
    },
    home: {
      tag: "AI-Powered Grammar Correction V1.0",
      title: "Write with",
      titleHighlight: "Confidence",
      description:
        "Elevate your writing with our advanced AI assistant. Correct Thai and English grammar instantly with style and precision.",
      cta: "Start Communicating",
      learnMore: "Learn How It Works",
      features: {
        instant: {
          title: "Instant Correction",
          desc: "Real-time grammar checks for both Thai and English languages.",
        },
        style: {
          title: "Style Suggestions",
          desc: "Improve clarity, tone, and delivery of your message.",
        },
        privacy: {
          title: "Privacy First",
          desc: "Your text is processed securely and never stored without permission.",
        },
      },
    },
    chat: {
      title: "Untitled Document",
      file: "File",
      edit: "Edit",
      view: "View",
      check: "Check Grammar",
      processing: "Checking...",
      placeholder: "Type or paste your text here...",
      suggestions: "Suggestions",
      noSuggestions: "No suggestions found. Your text looks good!",
      original: "Original Text",
      corrected: "Corrected Version",
      saveComputer: "Save to Computer",
      saveDocs: "Export to Google Docs",
      exporting: "Exporting...",
      exportSuccess: "Exported successfully!",
      humanizer: "Humanizer",
      paraphraser: "Paraphraser",
      voices: "Voices",
      styles: "Styles",
      voiceList: {
        everyday: { name: "The Everyday Voice", desc: "Natural • Balanced" },
        precisionist: { name: "The Precisionist", desc: "Concise • Efficient" },
        executive: { name: "The Executive", desc: "Formal • Confident" },
        scholar: { name: "The Scholar", desc: "Formal • Precise" },
      },
      styleList: {
        humanize: "Humanize",
        academic: "Academic",
        professional: "Professional",
        streamlined: "Streamlined",
        creative: "Creative",
      },
    },
    settings: {
      title: "AI Settings",
      apiKey: "API Key",
      baseUrl: "Base URL",
      model: "Model Name",
      save: "Save Configuration",
    },
    auth: {
      login: "Log In",
      register: "Register",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      loginSuccess: "Logged in successfully!",
      registerSuccess: "Account created successfully!",
    },
  },
  th: {
    nav: {
      home: "หน้าหลัก",
      chat: "เริ่มใช้งาน",
      title: "T-Check",
    },
    home: {
      tag: "ระบบตรวจสอบไวยกรณ์ AI V1.0",
      title: "เขียนงานอย่าง",
      titleHighlight: "มั่นใจ",
      description:
        "ยกระดับงานเขียนของคุณด้วยผู้ช่วย AI อัจฉริยะ ตรวจสอบไวยกรณ์ภาษาไทยและอังกฤษได้ทันที แม่นยำ และเป็นธรรมชาติ",
      cta: "เริ่มใช้งานทันที",
      learnMore: "ดูการทำงาน",
      features: {
        instant: {
          title: "ตรวจสอบทันที",
          desc: "ตวรจสอบไวยกรณ์ได้แบบเรียลไทม์ทั้งภาษาไทยและอังกฤษ",
        },
        style: {
          title: "แนะนำสำนวน",
          desc: "ปรับปรุงความชัดเจน น้ำเสียง และการสื่อสารให้น่าอ่านยิ่งขึ้น",
        },
        privacy: {
          title: "ความเป็นส่วนตัว",
          desc: "ข้อความของคุณถูกประมวลผลอย่างปลอดภัยและไม่มีการบันทึก",
        },
      },
    },
    chat: {
      title: "เอกสารไม่มีชื่อ",
      file: "ไฟล์",
      edit: "แก้ไข",
      view: "มุมมอง",
      check: "ตรวจสอบไวยกรณ์",
      processing: "กำลังตรวจสอบ...",
      placeholder: "พิมพ์หรือวางข้อความที่นี่...",
      suggestions: "คำแนะนำ",
      noSuggestions: "ไม่พบคำแนะนำ ข้อความของคุณดูดีแล้ว!",
      original: "ข้อความต้นฉบับ",
      corrected: "ข้อความที่แก้ไขแล้ว",
      saveComputer: "บันทึกลงเครื่อง",
      saveDocs: "ส่งออกไปยัง Google Docs",
      exporting: "กำลังส่งออก...",
      exportSuccess: "ส่งออกเรียบร้อยแล้ว!",
      humanizer: "ทำให้เหมือนมนุษย์",
      paraphraser: "ปรับสำนวน",
      voices: "เสียง",
      styles: "สไตล์",
      voiceList: {
        everyday: { name: "เสียงทั่วไป", desc: "เป็นธรรมชาติ • สมดุล" },
        precisionist: { name: "เสียงกระชับ", desc: "รวดเร็ว • มีประสิทธิภาพ" },
        executive: { name: "เสียงผู้บริหาร", desc: "ทางการ • มั่นใจ" },
        scholar: { name: "เสียงนักวิชาการ", desc: "ทางการ • แม่นยำ" },
      },
      styleList: {
        humanize: "ธรรมชาติ",
        academic: "วิชาการ",
        professional: "มืออาชีพ",
        streamlined: "กระชับ",
        creative: "สร้างสรรค์",
      },
    },
    settings: {
      title: "ตั้งค่า AI",
      apiKey: "คีย์ API",
      baseUrl: "Base URL",
      model: "ชื่อโมเดล",
      save: "บันทึกการตั้งค่า",
    },
    auth: {
      login: "เข้าสู่ระบบ",
      register: "สมัครสมาชิก",
      email: "อีเมล",
      password: "รหัสผ่าน",
      confirmPassword: "ยืนยันรหัสผ่าน",
      noAccount: "ยังไม่มีบัญชี?",
      hasAccount: "มีบัญชีอยู่แล้ว?",
      loginSuccess: "เข้าสู่ระบบสำเร็จ!",
      registerSuccess: "สร้างบัญชีเรียบร้อยแล้ว!",
    },
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "th" : "en"));
  };

  const t = (path) => {
    const keys = path.split(".");
    let current = translations[language];
    for (const key of keys) {
      if (current[key] === undefined) return path;
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
