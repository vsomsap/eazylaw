"use client";

import { useState, useCallback } from "react";
import { extractTextFromPdf } from "@/lib/pdf";

// ข้อมูลที่ extract ได้จากใบเสนอราคา
export interface ExtractedData {
  ผู้ว่าจ้าง: string | null;
  ผู้รับจ้าง: string | null;
  มูลค่างาน: string | null;
  รายละเอียดงาน: string | null;
  วันส่งมอบ: string | null;
  เงื่อนไขชำระ: string | null;
  วันออกเอกสาร: string | null;
  confidence: number;
}

type Step = "idle" | "reading" | "extracting" | "done" | "error";
type Scenario = "A" | "B" | "C";

const FIELD_DEFS: {
  key: keyof ExtractedData;
  label: string;
  full?: boolean;
}[] = [
  { key: "ผู้ว่าจ้าง", label: "ผู้ว่าจ้าง" },
  { key: "ผู้รับจ้าง", label: "ผู้รับจ้าง" },
  { key: "มูลค่างาน", label: "มูลค่างาน" },
  { key: "วันส่งมอบ", label: "วันส่งมอบ" },
  { key: "เงื่อนไขชำระ", label: "เงื่อนไขชำระ" },
  { key: "วันออกเอกสาร", label: "วันที่เอกสาร" },
  { key: "รายละเอียดงาน", label: "รายละเอียดงาน", full: true },
];

export default function PdfUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<Step>("idle");
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<ExtractedData | null>(null);
  const [editedData, setEditedData] = useState<Partial<ExtractedData>>({});
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((f: File) => {
    setError("");
    if (f.type !== "application/pdf") {
      setError("กรุณาเลือกไฟล์ PDF เท่านั้น");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError("ไฟล์ใหญ่เกิน 10 MB กรุณาลดขนาดก่อน");
      return;
    }
    setFile(f);
    setStep("idle");
    setData(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const extract = async () => {
    if (!file) return;
    setError("");

    try {
      // Step 1: อ่าน PDF
      setStep("reading");
      const text = await extractTextFromPdf(file);

      if (!text || text.length < 20) {
        throw new Error(
          "ไม่พบข้อความในไฟล์ PDF — อาจเป็นไฟล์สแกน ยังไม่รองรับใน V1"
        );
      }

      // Step 2: ส่งให้ Claude วิเคราะห์
      setStep("extracting");
      const res = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "API error");
      }

      const { data: extracted } = await res.json();
      setData(extracted);
      setEditedData({});
      setStep("done");
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาด กรุณาลองใหม่");
      setStep("error");
    }
  };

  const getFieldValue = (key: keyof ExtractedData) => {
    if (key in editedData) return editedData[key] as string;
    return data?.[key] as string | null;
  };

  const updateField = (key: keyof ExtractedData, value: string) => {
    setEditedData((prev) => ({ ...prev, [key]: value }));
  };

  const getFinalData = (): ExtractedData => ({
    ...data!,
    ...editedData,
  });

  const reset = () => {
    setFile(null);
    setStep("idle");
    setData(null);
    setEditedData({});
    setError("");
    setSelectedScenario(null);
  };

  const conf = data?.confidence ?? 0;
  const confColor =
    conf >= 80 ? "text-green-600" : conf >= 60 ? "text-amber-600" : "text-red-500";
  const confLabel =
    conf >= 80 ? "แม่นยำสูง" : conf >= 60 ? "ตรวจสอบก่อนใช้" : "กรอกเพิ่มเติม";

  return (
    <div className="max-w-2xl mx-auto p-6">

      {/* Upload Zone */}
      {step !== "done" && (
        <div className="space-y-4">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-input")?.click()}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
              ${isDragging
                ? "border-blue-400 bg-blue-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
          >
            <div className="text-4xl mb-3">📄</div>
            <p className="text-sm font-medium text-gray-700">
              วาง PDF ใบเสนอราคาที่นี่ หรือ{" "}
              <span className="text-blue-600">คลิกเพื่อเลือกไฟล์</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">รองรับ PDF · สูงสุด 10 MB</p>
          </div>
          <input
            id="file-input"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />

          {/* File Selected */}
          {file && (
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
              <span className="text-lg">📎</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Steps */}
          {(step === "reading" || step === "extracting") && (
            <div className="space-y-2">
              {[
                { id: "reading", label: "อ่านและแปลง PDF เป็นข้อความ" },
                { id: "extracting", label: "ส่งข้อความให้ Claude วิเคราะห์" },
              ].map((s) => {
                const isActive = step === s.id;
                const isDone =
                  (s.id === "reading" && step === "extracting");
                return (
                  <div
                    key={s.id}
                    className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg
                      ${isActive ? "bg-blue-50 text-blue-700" : ""}
                      ${isDone ? "text-green-600" : ""}
                      ${!isActive && !isDone ? "text-gray-400" : ""}
                    `}
                  >
                    <span>{isDone ? "✓" : isActive ? "⏳" : "○"}</span>
                    {s.label}
                  </div>
                );
              })}
            </div>
          )}

          {/* Extract Button */}
          <button
            onClick={extract}
            disabled={!file || step === "reading" || step === "extracting"}
            className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg
              disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
          >
            {step === "reading" || step === "extracting"
              ? "กำลัง extract..."
              : "✦ Extract ข้อมูลด้วย AI"}
          </button>
        </div>
      )}

      {/* Result */}
      {step === "done" && data && (
        <div className="space-y-5">

          {/* Header */}
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <p className="text-sm font-medium text-gray-800">
              Extract สำเร็จ — ตรวจสอบและแก้ไขก่อนดำเนินการต่อ
            </p>
          </div>

          {/* Confidence */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">ความแม่นยำ</span>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${conf >= 80 ? "bg-green-500" : conf >= 60 ? "bg-amber-400" : "bg-red-400"}`}
                style={{ width: `${conf}%` }}
              />
            </div>
            <span className={`text-xs font-medium ${confColor}`}>
              {conf}% — {confLabel}
            </span>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-2 gap-3">
            {FIELD_DEFS.map((f) => {
              const val = getFieldValue(f.key);
              const isEmpty = !val || val === "null";
              return (
                <div
                  key={f.key}
                  className={`${f.full ? "col-span-2" : ""} space-y-1`}
                >
                  <label className="text-xs text-gray-400 uppercase tracking-wide">
                    {f.label}
                  </label>
                  <input
                    type="text"
                    value={isEmpty ? "" : val!}
                    placeholder={isEmpty ? "ไม่พบในเอกสาร — กรอกเอง" : ""}
                    onChange={(e) => updateField(f.key, e.target.value)}
                    className={`w-full text-sm px-3 py-2 border rounded-lg outline-none
                      focus:ring-2 focus:ring-blue-100 focus:border-blue-300
                      ${isEmpty
                        ? "border-dashed border-gray-200 text-gray-400 placeholder:text-gray-300"
                        : "border-gray-200 text-gray-800"
                      }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Scenario */}
          <div className="border-t pt-4">
            <p className="text-sm font-medium text-gray-800 mb-3">เลือก Scenario</p>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: "A", icon: "📄", label: "Scenario A", sub: "ร่างสัญญา" },
                  { id: "B", icon: "📬", label: "Scenario B", sub: "โนตีสทวง" },
                  { id: "C", icon: "⚖️", label: "Scenario C", sub: "เตรียมฟ้อง" },
                ] as const
              ).map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedScenario(s.id)}
                  className={`p-3 rounded-xl border text-center transition-all
                    ${selectedScenario === s.id
                      ? "border-blue-300 bg-blue-50"
                      : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  <span className="text-xl block mb-1">{s.icon}</span>
                  <p className="text-xs font-medium text-gray-800">{s.label}</p>
                  <p className="text-xs text-gray-400">{s.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={reset}
              className="flex-1 py-2.5 border border-gray-200 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Upload ใหม่
            </button>
            <button
              disabled={!selectedScenario}
              className="flex-1 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg
                disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
              onClick={() => {
                // TODO: ส่งข้อมูลไป generate เอกสาร
                console.log("Generate:", selectedScenario, getFinalData());
              }}
            >
              สร้างเอกสาร →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
