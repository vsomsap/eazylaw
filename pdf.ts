// lib/pdf.ts
// ใช้ฝั่ง client (browser) ด้วย PDF.js

export async function extractTextFromPdf(file: File): Promise<string> {
  // โหลด PDF.js จาก CDN
  const pdfjsLib = await loadPdfJs();

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";

  // อ่านสูงสุด 10 หน้าแรก
  const maxPages = Math.min(pdf.numPages, 10);

  for (let i = 1; i <= maxPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str)
      .join(" ");
    fullText += pageText + "\n";
  }

  return fullText.trim();
}

async function loadPdfJs(): Promise<any> {
  // PDF.js ถูกโหลดผ่าน script tag ใน layout.tsx
  // หรือใช้ dynamic import ที่นี่
  if (typeof window === "undefined") {
    throw new Error("extractTextFromPdf ใช้ได้เฉพาะฝั่ง browser");
  }

  return new Promise((resolve, reject) => {
    // ถ้าโหลดแล้ว
    if ((window as any).pdfjsLib) {
      resolve((window as any).pdfjsLib);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => {
      const lib = (window as any).pdfjsLib;
      lib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      resolve(lib);
    };
    script.onerror = () => reject(new Error("โหลด PDF.js ไม่สำเร็จ"));
    document.head.appendChild(script);
  });
}
