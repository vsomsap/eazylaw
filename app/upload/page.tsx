import Link from "next/link";
import PdfUploader from "@/components/PdfUploader";

export default function UploadPage() {
  return (
    <div style={{minHeight: "100vh", background: "#f7fafc", fontFamily: "'Sarabun', 'Noto Sans Thai', sans-serif"}}>
      {/* Top Nav */}
      <nav style={{background: "white", borderBottom: "1px solid #e2e8f0", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <Link href="/" style={{display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none"}}>
          <div style={{width: 36, height: 36, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "1.1rem"}}>
            E
          </div>
          <span style={{color: "#2d3748", fontSize: "1.2rem", fontWeight: "700"}}>EazyLaw</span>
        </Link>
        <Link href="/" style={{color: "#667eea", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.25rem"}}>
          ← กลับหน้าหลัก
        </Link>
      </nav>

      {/* Main Content */}
      <main style={{maxWidth: 900, margin: "0 auto", padding: "3rem 2rem"}}>
        <div style={{textAlign: "center", marginBottom: "2.5rem"}}>
          <h1 style={{fontSize: "2rem", fontWeight: "800", color: "#2d3748", marginBottom: "0.75rem"}}>
            สร้างเอกสารกฎหมายอัตโนมัติ
          </h1>
          <p style={{color: "#718096", fontSize: "1.05rem"}}>
            อัปโหลดใบเสนอราคา → ระบบสร้างเอกสารกฎหมายให้อัตโนมัติ
          </p>
        </div>

        <div style={{background: "white", borderRadius: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflow: "hidden"}}>
          <PdfUploader />
        </div>

        <p style={{textAlign: "center", color: "#a0aec0", fontSize: "0.8rem", marginTop: "1.5rem"}}>
          เอกสารที่สร้างเป็นเพียงเครื่องมือช่วยร่าง ควรให้ทนายความตรวจสอบก่อนใช้งาน
        </p>
      </main>
    </div>
  );
}
