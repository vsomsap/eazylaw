import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text || text.trim().length < 20)
      return NextResponse.json({ error: "ข้อความสั้นเกินไป" }, { status: 400 });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 1024,
      messages: [
        { role: "system", content: "คุณคือระบบ extract ข้อมูลจากใบเสนอราคา ตอบเป็น JSON เท่านั้น ห้ามมีข้อความอื่น" },
        { role: "user", content: `extract ข้อมูลจากข้อความนี้แล้วตอบเป็น JSON:\n{"ผู้ว่าจ้าง":"","ผู้รับจ้าง":"","มูลค่างาน":"","รายละเอียดงาน":"","วันส่งมอบ":null,"เงื่อนไขชำระ":null,"วันออกเอกสาร":null,"confidence":85}\nถ้าไม่พบข้อมูลใดใส่ null\n\nข้อความ:\n"""\n${text.substring(0, 6000)}\n"""` }
      ],
      response_format: { type: "json_object" },
    });

    const data = JSON.parse(completion.choices[0].message.content || "{}");
    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
