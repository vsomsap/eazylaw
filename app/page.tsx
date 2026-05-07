import Link from "next/link";

export default function Home() {
  return (
    <div style={{fontFamily: "'Sarabun', 'Noto Sans Thai', sans-serif", minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}}>
      {/* Navigation */}
      <nav style={{background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100}}>
        <div style={{display: "flex", alignItems: "center", gap: "0.5rem"}}>
          <div style={{width: 40, height: 40, background: "white", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: "bold", color: "#764ba2"}}>
            E
          </div>
          <span style={{color: "white", fontSize: "1.4rem", fontWeight: "bold"}}>EazyLaw</span>
        </div>
        <div style={{display: "flex", gap: "1.5rem", alignItems: "center"}}>
          <a href="#features" style={{color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: "0.95rem"}}>ฟีเจอร์</a>
          <a href="#how-it-works" style={{color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: "0.95rem"}}>วิธีใช้</a>
          <a href="#pricing" style={{color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: "0.95rem"}}>ราคา</a>
          <Link href="/upload" style={{background: "white", color: "#764ba2", padding: "0.5rem 1.2rem", borderRadius: 25, textDecoration: "none", fontWeight: "600", fontSize: "0.95rem"}}>
            เริ่มใช้งาน
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{padding: "5rem 2rem 4rem", textAlign: "center", maxWidth: 900, margin: "0 auto"}}>
        <div style={{display: "inline-block", background: "rgba(255,255,255,0.2)", borderRadius: 25, padding: "0.4rem 1rem", marginBottom: "1.5rem", color: "white", fontSize: "0.85rem"}}>
          ✨ ขับเคลื่อนด้วย Claude AI
        </div>
        <h1 style={{color: "white", fontSize: "3.5rem", fontWeight: "800", lineHeight: 1.2, marginBottom: "1.5rem"}}>
          สร้างเอกสารกฎหมาย<br/>
          <span style={{color: "#ffd700"}}>ได้ในไม่กี่วินาที</span>
        </h1>
        <p style={{color: "rgba(255,255,255,0.85)", fontSize: "1.2rem", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 600, margin: "0 auto 2.5rem"}}>
          เพียงอัปโหลดใบเสนอราคา ระบบ AI จะดึงข้อมูลและสร้างสัญญาว่าจ้างพร้อมใช้งานให้คุณทันที
          ลดเวลาทำเอกสารจากหลายชั่วโมงเหลือเพียงไม่กี่วินาที
        </p>
        <div style={{display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap"}}>
          <Link href="/upload" style={{background: "#ffd700", color: "#333", padding: "1rem 2.5rem", borderRadius: 30, textDecoration: "none", fontWeight: "700", fontSize: "1.1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem"}}>
            🚀 ลองใช้ฟรีเลย
          </Link>
          <a href="#how-it-works" style={{background: "rgba(255,255,255,0.2)", color: "white", padding: "1rem 2.5rem", borderRadius: 30, textDecoration: "none", fontWeight: "600", fontSize: "1.1rem", border: "2px solid rgba(255,255,255,0.4)"}}>
            ดูวิธีใช้
          </a>
        </div>
        
        {/* Stats */}
        <div style={{display: "flex", justifyContent: "center", gap: "3rem", marginTop: "4rem", flexWrap: "wrap"}}>
          {[
            {num: "< 30 วิ", label: "สร้างเอกสาร"},
            {num: "99%", label: "ความแม่นยำ"},
            {num: "3 แบบ", label: "รูปแบบสัญญา"},
          ].map((stat, i) => (
            <div key={i} style={{textAlign: "center"}}>
              <div style={{color: "#ffd700", fontSize: "2rem", fontWeight: "800"}}>{stat.num}</div>
              <div style={{color: "rgba(255,255,255,0.8)", fontSize: "0.9rem"}}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{background: "white", padding: "5rem 2rem"}}>
        <div style={{maxWidth: 1100, margin: "0 auto"}}>
          <div style={{textAlign: "center", marginBottom: "3rem"}}>
            <h2 style={{fontSize: "2.2rem", fontWeight: "800", color: "#2d3748", marginBottom: "1rem"}}>ทำไมต้องเลือก EazyLaw?</h2>
            <p style={{color: "#718096", fontSize: "1.1rem"}}>ระบบ AI ที่เข้าใจกฎหมายไทย ออกแบบมาเพื่อนักธุรกิจและทนายความ</p>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem"}}>
            {[
              {icon: "📄", title: "อ่าน PDF อัตโนมัติ", desc: "ระบบสามารถอ่านและวิเคราะห์ใบเสนอราคา PDF ได้โดยอัตโนมัติ ไม่ต้องพิมพ์ข้อมูลเอง"},
              {icon: "🤖", title: "AI ดึงข้อมูลอัจฉริยะ", desc: "Claude AI จะระบุ ผู้ว่าจ้าง ผู้รับจ้าง มูลค่างาน วันส่งมอบ และเงื่อนไขต่างๆ ได้อย่างแม่นยำ"},
              {icon: "⚖️", title: "สร้างสัญญาถูกต้องตามกฎหมาย", desc: "สัญญาที่สร้างขึ้นสอดคล้องกับกฎหมายแพ่งและพาณิชย์ไทย พร้อมข้อกำหนดครบถ้วน"},
              {icon: "🎯", title: "3 รูปแบบสัญญา", desc: "เลือกรูปแบบที่เหมาะสม: สัญญาว่าจ้างทั่วไป สัญญาจ้างบริการ หรือสัญญาจ้างพัฒนาซอฟต์แวร์"},
              {icon: "⚡", title: "รวดเร็วทันใจ", desc: "จากการอัปโหลดไฟล์จนได้เอกสารสัญญาพร้อมใช้ ใช้เวลาไม่เกิน 30 วินาที"},
              {icon: "🔒", title: "ปลอดภัยและเป็นส่วนตัว", desc: "ข้อมูลของคุณถูกประมวลผลอย่างปลอดภัย ไม่มีการจัดเก็บข้อมูลส่วนตัวในระบบ"},
            ].map((feature, i) => (
              <div key={i} style={{background: "#f7fafc", borderRadius: 16, padding: "2rem", border: "1px solid #e2e8f0"}}>
                <div style={{fontSize: "2.5rem", marginBottom: "1rem"}}>{feature.icon}</div>
                <h3 style={{fontSize: "1.2rem", fontWeight: "700", color: "#2d3748", marginBottom: "0.75rem"}}>{feature.title}</h3>
                <p style={{color: "#718096", lineHeight: 1.6}}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "5rem 2rem"}}>
        <div style={{maxWidth: 900, margin: "0 auto"}}>
          <div style={{textAlign: "center", marginBottom: "3rem"}}>
            <h2 style={{fontSize: "2.2rem", fontWeight: "800", color: "white", marginBottom: "1rem"}}>ใช้งานง่ายใน 3 ขั้นตอน</h2>
            <p style={{color: "rgba(255,255,255,0.8)", fontSize: "1.1rem"}}>ไม่ต้องมีความรู้ด้านกฎหมาย ระบบจัดการให้ทุกอย่าง</p>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem"}}>
            {[
              {step: "01", icon: "📤", title: "อัปโหลดไฟล์", desc: "ลากและวางไฟล์ใบเสนอราคา PDF ของคุณ หรือคลิกเพื่อเลือกไฟล์"},
              {step: "02", icon: "🔍", title: "AI วิเคราะห์", desc: "ระบบ AI อ่านและดึงข้อมูลสำคัญจากเอกสาร เช่น ชื่อคู่สัญญา มูลค่า วันส่งมอบ"},
              {step: "03", icon: "📋", title: "รับเอกสารสัญญา", desc: "ดาวน์โหลดสัญญาว่าจ้างที่สมบูรณ์ พร้อมลงนามได้ทันที"},
            ].map((step, i) => (
              <div key={i} style={{background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", borderRadius: 16, padding: "2rem", textAlign: "center", border: "1px solid rgba(255,255,255,0.2)"}}>
                <div style={{color: "rgba(255,215,0,0.6)", fontSize: "3rem", fontWeight: "800", marginBottom: "0.5rem"}}>{step.step}</div>
                <div style={{fontSize: "2.5rem", marginBottom: "1rem"}}>{step.icon}</div>
                <h3 style={{fontSize: "1.2rem", fontWeight: "700", color: "white", marginBottom: "0.75rem"}}>{step.title}</h3>
                <p style={{color: "rgba(255,255,255,0.8)", lineHeight: 1.6}}>{step.desc}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign: "center", marginTop: "3rem"}}>
            <Link href="/upload" style={{background: "#ffd700", color: "#333", padding: "1rem 3rem", borderRadius: 30, textDecoration: "none", fontWeight: "700", fontSize: "1.1rem", display: "inline-block"}}>
              เริ่มใช้งานเลย →
            </Link>
          </div>
        </div>
      </section>

      {/* Document types */}
      <section style={{background: "white", padding: "5rem 2rem"}}>
        <div style={{maxWidth: 1000, margin: "0 auto"}}>
          <div style={{textAlign: "center", marginBottom: "3rem"}}>
            <h2 style={{fontSize: "2.2rem", fontWeight: "800", color: "#2d3748", marginBottom: "1rem"}}>รองรับ 3 รูปแบบสัญญา</h2>
            <p style={{color: "#718096", fontSize: "1.1rem"}}>เลือกรูปแบบที่เหมาะกับงานของคุณ</p>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem"}}>
            {[
              {
                type: "สัญญา ก",
                title: "สัญญาว่าจ้างทั่วไป",
                color: "#667eea",
                items: ["เหมาะสำหรับงานบริการทั่วไป", "กำหนดขอบเขตงานชัดเจน", "เงื่อนไขการชำระเงิน", "การรับประกันผลงาน"]
              },
              {
                type: "สัญญา ข",
                title: "สัญญาจ้างที่ปรึกษา",
                color: "#764ba2",
                items: ["สำหรับงานให้คำปรึกษา", "กำหนดชั่วโมงทำงาน", "สิทธิ์ในทรัพย์สินทางปัญญา", "ข้อกำหนดความลับ"]
              },
              {
                type: "สัญญา ค",
                title: "สัญญาพัฒนาซอฟต์แวร์",
                color: "#f6ad55",
                items: ["เฉพาะโปรเจกต์ IT", "Milestone การส่งมอบ", "Source code ownership", "การบำรุงรักษาหลังส่งมอบ"]
              },
            ].map((doc, i) => (
              <div key={i} style={{borderRadius: 16, border: `2px solid ${doc.color}`, overflow: "hidden"}}>
                <div style={{background: doc.color, padding: "1.5rem", textAlign: "center"}}>
                  <div style={{color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", marginBottom: "0.25rem"}}>{doc.type}</div>
                  <div style={{color: "white", fontSize: "1.2rem", fontWeight: "700"}}>{doc.title}</div>
                </div>
                <div style={{padding: "1.5rem"}}>
                  {doc.items.map((item, j) => (
                    <div key={j} style={{display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", color: "#4a5568"}}>
                      <span style={{color: doc.color, fontWeight: "bold"}}>✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{background: "#f7fafc", padding: "5rem 2rem"}}>
        <div style={{maxWidth: 900, margin: "0 auto", textAlign: "center"}}>
          <h2 style={{fontSize: "2.2rem", fontWeight: "800", color: "#2d3748", marginBottom: "1rem"}}>ราคาที่คุ้มค่า</h2>
          <p style={{color: "#718096", fontSize: "1.1rem", marginBottom: "3rem"}}>เริ่มต้นฟรี ไม่ต้องใช้บัตรเครดิต</p>
          <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", maxWidth: 750, margin: "0 auto"}}>
            {[
              {
                name: "ฟรี",
                price: "0",
                period: "บาท/เดือน",
                color: "#667eea",
                features: ["5 เอกสาร/เดือน", "ทุกรูปแบบสัญญา", "ดาวน์โหลด PDF", "รองรับภาษาไทย"],
                cta: "เริ่มใช้ฟรี",
                popular: false
              },
              {
                name: "Pro",
                price: "990",
                period: "บาท/เดือน",
                color: "#764ba2",
                features: ["ไม่จำกัดเอกสาร", "ทุกรูปแบบสัญญา", "แก้ไขและปรับแต่ง", "ลายเซ็นอิเล็กทรอนิกส์", "รองรับ 2 ภาษา"],
                cta: "เริ่ม 30 วันฟรี",
                popular: true
              },
            ].map((plan, i) => (
              <div key={i} style={{
                background: plan.popular ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "white",
                borderRadius: 20,
                padding: "2.5rem",
                border: plan.popular ? "none" : "2px solid #e2e8f0",
                position: "relative",
                transform: plan.popular ? "scale(1.03)" : "none",
                boxShadow: plan.popular ? "0 20px 60px rgba(118,75,162,0.3)" : "none"
              }}>
                {plan.popular && (
                  <div style={{position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#ffd700", color: "#333", padding: "0.25rem 1rem", borderRadius: 20, fontSize: "0.8rem", fontWeight: "700"}}>
                    ยอดนิยม
                  </div>
                )}
                <div style={{color: plan.popular ? "rgba(255,255,255,0.8)" : "#718096", marginBottom: "0.5rem"}}>{plan.name}</div>
                <div style={{color: plan.popular ? "white" : "#2d3748", fontSize: "3rem", fontWeight: "800"}}>
                  ฿{plan.price}
                </div>
                <div style={{color: plan.popular ? "rgba(255,255,255,0.7)" : "#a0aec0", marginBottom: "2rem", fontSize: "0.9rem"}}>{plan.period}</div>
                {plan.features.map((feature, j) => (
                  <div key={j} style={{display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", color: plan.popular ? "rgba(255,255,255,0.9)" : "#4a5568", textAlign: "left"}}>
                    <span style={{color: plan.popular ? "#ffd700" : "#667eea"}}>✓</span>
                    {feature}
                  </div>
                ))}
                <Link href="/upload" style={{
                  display: "block",
                  background: plan.popular ? "#ffd700" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: plan.popular ? "#333" : "white",
                  padding: "0.875rem",
                  borderRadius: 25,
                  textDecoration: "none",
                  fontWeight: "700",
                  textAlign: "center",
                  marginTop: "1.5rem"
                }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "5rem 2rem", textAlign: "center"}}>
        <div style={{maxWidth: 700, margin: "0 auto"}}>
          <h2 style={{fontSize: "2.5rem", fontWeight: "800", color: "white", marginBottom: "1rem"}}>
            พร้อมเริ่มใช้งานหรือยัง?
          </h2>
          <p style={{color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", marginBottom: "2.5rem", lineHeight: 1.7}}>
            เข้าร่วมกับนักธุรกิจและทนายความที่ใช้ EazyLaw สร้างเอกสารกฎหมายได้อย่างง่ายดาย
          </p>
          <Link href="/upload" style={{background: "#ffd700", color: "#333", padding: "1.2rem 3.5rem", borderRadius: 35, textDecoration: "none", fontWeight: "700", fontSize: "1.2rem", display: "inline-block"}}>
            🚀 ลองใช้ฟรีเลย ไม่ต้องสมัคร
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background: "#1a202c", color: "#a0aec0", padding: "2rem", textAlign: "center"}}>
        <div style={{marginBottom: "0.5rem", color: "white", fontWeight: "600"}}>EazyLaw</div>
        <div style={{fontSize: "0.85rem"}}>ระบบสร้างเอกสารกฎหมายอัตโนมัติ ขับเคลื่อนด้วย Claude AI</div>
        <div style={{marginTop: "1rem", fontSize: "0.8rem"}}>© 2025 EazyLaw. สงวนลิขสิทธิ์</div>
      </footer>
    </div>
  );
}
