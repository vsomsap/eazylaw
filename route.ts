import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const EXTRACT_PROMPT = `คุณคือระบบ extract ข้อมูลจากใบเสนอราคาสำหรับระบบกฎหมาย EazyLaw

ข้อความจากเอกสาร:
"""
{TEXT}
"""

ดึงข้อมูลต่อไปนี้แล้วตอบเป็น JSON เท่านั้น ห้ามมีข้อความอื่นนอกจาก JSON:
{
  "ผู้ว่าจ้าง": "ชื่อบริษัทหรือบุคคลที่ว่าจ้าง",
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
    const { text } = await req.json();

    if (!text || text.trim().length < 20) {
      return NextResponse.json(
        { error: "ข้อความสั้นเกินไป กรุณาตรวจสอบ PDF" },
        { status: 400 }
      );
    }

    // จำกัดความยาวข้อความไม่เกิน 8,000 ตัวอักษร
    const truncatedText = text.substring(0, 8000);

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

    const clean = rawText.replace(/```json|```/g, "").trim();
    const data = JSON.parse(clean);

    return NextResponse.json({ data });
  } catch (err) {
    console.error("Extract error:", err);

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "AI ตอบกลับในรูปแบบที่ไม่ถูกต้อง กรุณาลองใหม่" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }
}
