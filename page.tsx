import PdfUploader from "@/components/PdfUploader";

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">EazyLaw</h1>
          <p className="text-sm text-gray-400 mt-1">
            อัปโหลดใบเสนอราคา → ระบบสร้างเอกสารกฎหมายให้อัตโนมัติ
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <PdfUploader />
        </div>
        <p className="text-center text-xs text-gray-300 mt-6">
          เอกสารที่สร้างเป็นเพียงเครื่องมือช่วยร่าง ควรให้ทนายตรวจสอบก่อนใช้งาน
        </p>
      </div>
    </main>
  );
}
