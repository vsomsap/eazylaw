import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const EXTRACT_PROMPT = `คุเคือระบบ extract ข้อมูลจากใบเสนอราคาสำหรับระบบกฎหมาย EazyLaw

ข้อความจากเอกสาร:
"""
{TEXT}
"""

ดึงข้อมูลต่อไปนี้แล้วตอบ เป็น JSON เท่านั้น ห้ามมีข้อความอื่นนอกจาก JSON:
{
  "ผู้จ้าง": "ชื่อบริษัทหรือบุคคลที่จ้าง",
  "ผู้รับจ้าง": "ชื่อบริษัทหรือบุคคลที่รับจ้าง",
  "มูลค่างาน": "ตัวเลขพร้อมสกุลเงิน เช่น 50,000 บาท",
  "รายละเอียดงาน": "สรุปสั้นๆ ว่าจ้างทำอะไร ไม่เกิน 2 ประโยค",
  "วันส่งมอบ": "วันที่ส่งมอบงาน หรือ null ถ้าไม่ระบุ",
  "เงื่อนไขชำระ": "เงื่อนไขการชำระเงิน หรือ null",
  "วันออกเอกสาร": "วันที่ในเอกสาร หรือ null",
  "confidence": 85
}

กฎ:
- ถ้าไม่พบข้อมูลใดให้ใส่ null
- confidence คือความมั่นใจในการ extract 0-100 อิงจากความชัดเจนของเอกสาร
- ตอบ JSON เท่านั้น ห้ามมี markdown หรือข้อความอื่น`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY ไม่ได้ถูกตั้งค่า กรุณาเพิ่ม API key ใน .env.local" },
        { status: 500 }
      );
    }

    const { text } = await req.json();

    if (!text || text.trim().length < 20) {
      return NextResponse.json(
        { error: "ข้อความสั้นเกินไป กรุณาตรวจสอบ PDF" },
        { status: 400 }
      );
    }

    // จำกัดความยาวข้อความไม่เกิน 8,000 ตัวอักษร
    const truncatedText = text.substring(0, 8000);

    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: EXTRACT_PROMPT.replace("{TEXT}", truncatedText),
        },
      ],
    });

    const rawText = message.content
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("");

    if (!rawText || rawText.trim().length === 0) {
      return NextResponse.json(
        { error: "AI ไม่ได้ส่งคืนข้อมูล กรุณาลองใหม่" },
        { status: 500 }
      );
    }

    const clean = rawText.replace(/```json|```/g, "").trim();

    let data;
    try {
      data = JSON.parse(clean);
    } catch (parseErr) {
      console.error("JSON parse error:", parseErr, "raw:", rawText);
      return NextResponse.json(
        { error: "AI ตอบกลับในรูปแบบที่ไม่ถูกต้อง กรุณาลองใหม่" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("Extract error:", err);

    return NextResponse.json(
      { error: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }
}
