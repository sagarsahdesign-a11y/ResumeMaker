import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Star, Check, Zap, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";

const categories = ["All", "Professional", "Technical", "Executive", "Creative", "Academic"];

// ─── Live Resume Preview Components ───────────────────────────────────────────

function PreviewExecutivePro() {
  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", padding: "32px", backgroundColor: "#fff", width: "800px", minHeight: "1100px", color: "#111", fontSize: "11px", lineHeight: "1.5" }}>
      {/* Two-col header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
        <div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "26px", fontWeight: "bold", color: "#1a2744", letterSpacing: "-0.5px" }}>ALEXANDRA CHEN</div>
          <div style={{ fontSize: "11px", color: "#555", marginTop: "2px", fontFamily: "Arial, sans-serif" }}>Senior Vice President · Product Strategy</div>
        </div>
        <div style={{ textAlign: "right", fontFamily: "Arial, sans-serif", fontSize: "9.5px", color: "#444", lineHeight: "1.7" }}>
          <div>alexandra.chen@email.com</div>
          <div>+1 (415) 555-0192</div>
          <div>linkedin.com/in/alexandrachen</div>
          <div>San Francisco, CA</div>
        </div>
      </div>
      <div style={{ borderBottom: "1.5px solid #1a2744", marginBottom: "14px" }} />

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Left sidebar */}
        <div style={{ width: "30%", borderLeft: "3px solid #1a2744", paddingLeft: "12px" }}>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", color: "#1a2744", borderBottom: "1.5px solid #1a2744", paddingBottom: "3px", marginBottom: "7px" }}>Core Skills</div>
          {["Strategic Planning", "Executive Leadership", "P&L Management", "Board Relations", "M&A Integration", "OKR Frameworks", "Stakeholder Mgmt"].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px", fontSize: "9px" }}>
              <span style={{ color: "#1a2744", fontWeight: "bold" }}>▪</span> {s}
            </div>
          ))}

          <div style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", color: "#1a2744", borderBottom: "1.5px solid #1a2744", paddingBottom: "3px", marginBottom: "7px", marginTop: "14px" }}>Education</div>
          <div style={{ fontSize: "9px", fontWeight: "bold", color: "#111" }}>MBA, Stanford GSB</div>
          <div style={{ fontSize: "8.5px", color: "#555" }}>2012 · Arjay Miller Scholar</div>
          <div style={{ fontSize: "9px", fontWeight: "bold", color: "#111", marginTop: "6px" }}>B.S. Computer Science</div>
          <div style={{ fontSize: "8.5px", color: "#555" }}>MIT · 2010 · Cum Laude</div>

          <div style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", color: "#1a2744", borderBottom: "1.5px solid #1a2744", paddingBottom: "3px", marginBottom: "7px", marginTop: "14px" }}>Certifications</div>
          <div style={{ fontSize: "9px", marginBottom: "3px" }}>▪ PMP Certified</div>
          <div style={{ fontSize: "9px", marginBottom: "3px" }}>▪ AWS Solutions Architect</div>
          <div style={{ fontSize: "9px" }}>▪ Six Sigma Black Belt</div>
        </div>

        {/* Right main */}
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", color: "#1a2744", borderBottom: "1.5px solid #1a2744", paddingBottom: "3px", marginBottom: "8px" }}>Professional Summary</div>
          <div style={{ fontSize: "9.5px", color: "#333", lineHeight: "1.6", marginBottom: "14px", fontFamily: "Arial, sans-serif" }}>
            Visionary product executive with 14+ years leading cross-functional teams across Series B to post-IPO environments. Delivered $2.4B in cumulative ARR growth. Expert in translating complex technical capabilities into market-winning strategies.
          </div>

          <div style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", color: "#1a2744", borderBottom: "1.5px solid #1a2744", paddingBottom: "3px", marginBottom: "9px" }}>Work Experience</div>

          {[
            { role: "SVP Product Strategy", co: "Stripe", dates: "2020 – Present", bullets: ["Led $800M product portfolio spanning Payments, Radar, and Treasury", "Scaled product org from 40 to 240 PMs across 12 countries", "Delivered 99.97% uptime SLA through infrastructure overhaul"] },
            { role: "Director of Product", co: "Google DeepMind", dates: "2016 – 2020", bullets: ["Owned $340M annual P&L for AI platform products", "Launched 6 ML developer tools now used by 2M+ researchers"] },
          ].map((exp, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontSize: "10px", fontWeight: "bold", color: "#111" }}>{exp.role} · <span style={{ color: "#1a2744" }}>{exp.co}</span></div>
                <div style={{ fontSize: "8.5px", color: "#666", fontFamily: "Arial, sans-serif" }}>{exp.dates}</div>
              </div>
              {exp.bullets.map((b, j) => (
                <div key={j} style={{ display: "flex", gap: "6px", fontSize: "9px", color: "#444", marginTop: "3px", fontFamily: "Arial, sans-serif" }}>
                  <span style={{ color: "#1a2744", flexShrink: 0 }}>▪</span>{b}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PreviewTechnicalEdge() {
  return (
    <div style={{ fontFamily: "'Courier New', Courier, monospace", padding: "28px", backgroundColor: "#fff", width: "800px", minHeight: "1100px", color: "#111", fontSize: "11px" }}>
      {/* Header with teal left border */}
      <div style={{ borderLeft: "4px solid #00897b", paddingLeft: "12px", marginBottom: "14px" }}>
        <div style={{ fontSize: "22px", fontWeight: "bold", color: "#00897b", letterSpacing: "0.02em" }}>MARCUS WEI</div>
        <div style={{ fontSize: "10px", color: "#555", marginTop: "2px" }}>marcus.wei@gmail.com · github.com/marcuswei · +1 628 555 0183</div>
      </div>

      {/* Skills first — pill tags */}
      <div style={{ marginBottom: "14px" }}>
        <div style={{ fontSize: "8px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.12em", color: "#00897b", borderLeft: "3px solid #00897b", paddingLeft: "8px", marginBottom: "8px" }}>Technical Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {["TypeScript", "React", "Node.js", "Go", "PostgreSQL", "Redis", "Kubernetes", "AWS", "GraphQL", "gRPC", "Kafka", "Terraform", "Docker", "Prometheus"].map((s) => (
            <span key={s} style={{ background: "#e0f2f1", color: "#00695c", border: "1px solid #00897b", borderRadius: "3px", padding: "2px 7px", fontSize: "8.5px", fontFamily: "'Courier New', monospace", fontWeight: "bold" }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div style={{ marginBottom: "14px" }}>
        <div style={{ fontSize: "8px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.12em", color: "#00897b", borderLeft: "3px solid #00897b", paddingLeft: "8px", marginBottom: "6px" }}>Summary</div>
        <div style={{ fontSize: "9.5px", color: "#444", lineHeight: "1.6", paddingLeft: "11px" }}>
          Senior software engineer with 9 years building high-throughput distributed systems. Obsessed with correctness, performance, and developer experience. Open source contributor with 3.4k GitHub stars.
        </div>
      </div>

      {/* Experience */}
      <div>
        <div style={{ fontSize: "8px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.12em", color: "#00897b", borderLeft: "3px solid #00897b", paddingLeft: "8px", marginBottom: "9px" }}>Experience</div>
        {[
          { role: "Staff Engineer", co: "Meta", stack: "React | GraphQL | Hack | Kubernetes", dates: "2021–Present", bullets: ["Architected event-driven notification system serving 3.2B daily active users", "Reduced P99 API latency by 67% through query plan optimization"] },
          { role: "Senior SWE", co: "Stripe", stack: "Ruby | Go | PostgreSQL | AWS", dates: "2018–2021", bullets: ["Built Stripe Radar ML pipeline processing $600B/yr in transactions", "Led zero-downtime migration of 200 microservices to Kubernetes"] },
        ].map((exp, i) => (
          <div key={i} style={{ paddingLeft: "11px", marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontSize: "10px", fontWeight: "bold", color: "#111" }}>{exp.role} · <span style={{ color: "#00897b" }}>{exp.co}</span></div>
              <div style={{ fontSize: "8.5px", color: "#888" }}>{exp.dates}</div>
            </div>
            <div style={{ fontSize: "8px", color: "#00897b", marginTop: "2px", marginBottom: "4px" }}>{exp.stack}</div>
            {exp.bullets.map((b, j) => (
              <div key={j} style={{ fontSize: "9px", color: "#444", display: "flex", gap: "5px", marginTop: "2px" }}>
                <span style={{ color: "#00897b" }}>›</span>{b}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewCorporateClassic() {
  return (
    <div style={{ fontFamily: "'Times New Roman', Times, serif", padding: "36px", backgroundColor: "#fff", width: "800px", minHeight: "1100px", color: "#111", fontSize: "11px", lineHeight: "1.6" }}>
      {/* Centered header */}
      <div style={{ textAlign: "center", marginBottom: "14px" }}>
        <div style={{ fontSize: "26px", fontWeight: "bold", letterSpacing: "0.03em", color: "#000" }}>SARAH OKONKWO</div>
        <div style={{ fontSize: "10px", color: "#666", marginTop: "3px", letterSpacing: "0.01em" }}>sarah.okonkwo@gmail.com · (312) 555-0147 · linkedin.com/in/sarahokonkwo · Chicago, IL</div>
      </div>
      <div style={{ borderBottom: "2px solid #111", marginBottom: "14px" }} />

      {[
        { heading: "Professional Summary", body: <div style={{ fontSize: "10px", color: "#333", lineHeight: "1.7" }}>Results-driven financial services professional with 11 years of progressive experience in investment banking, corporate strategy, and stakeholder relations. Proven track record of structuring and closing $4B+ in M&A transactions.</div> },
        { heading: "Professional Experience", body: (
          <div>
            {[
              { role: "Managing Director, Corporate Banking", co: "JPMorgan Chase", dates: "2019 – Present", bullets: ["Managed $1.2B corporate credit portfolio for Fortune 500 clients across healthcare and technology sectors", "Led team of 18 analysts and associates; achieved 96% retention rate over 4 years", "Closed 14 M&A advisory mandates totaling $3.8B in transaction value"] },
              { role: "Vice President, Investment Banking", co: "Goldman Sachs", dates: "2014 – 2019", bullets: ["Advised on 8 cross-border acquisitions in EMEA and APAC markets", "Built pitch books and financial models for deals between $50M–$800M"] },
            ].map((exp, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontSize: "10.5px", fontWeight: "bold" }}>{exp.role}, <span style={{ fontStyle: "italic" }}>{exp.co}</span></div>
                  <div style={{ fontSize: "9.5px", color: "#555" }}>{exp.dates}</div>
                </div>
                {exp.bullets.map((b, j) => (
                  <div key={j} style={{ display: "flex", gap: "6px", fontSize: "9.5px", color: "#444", marginTop: "3px" }}>
                    <span>–</span>{b}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )},
        { heading: "Education", body: <div style={{ fontSize: "10px" }}><div style={{ fontWeight: "bold" }}>MBA, Finance — The Wharton School, University of Pennsylvania</div><div style={{ color: "#555" }}>2014 · Dean's List · Tobin Leadership Award</div><div style={{ fontWeight: "bold", marginTop: "5px" }}>B.A. Economics — University of Chicago</div><div style={{ color: "#555" }}>2012 · Phi Beta Kappa</div></div> },
      ].map((sec, i) => (
        <div key={i} style={{ marginBottom: "14px" }}>
          <div style={{ fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid #111", paddingBottom: "3px", marginBottom: "8px" }}>{sec.heading}</div>
          {sec.body}
        </div>
      ))}
    </div>
  );
}

function PreviewDataPro() {
  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif", padding: "28px", backgroundColor: "#fff", width: "800px", minHeight: "1100px", color: "#111", fontSize: "11px" }}>
      {/* Header: name left, links right */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <div>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1a1a2e" }}>PRIYA SHARMA</div>
          <div style={{ fontSize: "10px", color: "#555", marginTop: "2px" }}>Senior Data Scientist · ML Research Lead</div>
        </div>
        <div style={{ textAlign: "right", fontSize: "9px", color: "#555", lineHeight: "1.8" }}>
          <div>📧 priya.sharma@mit.edu</div>
          <div>🔗 github.com/priyasharma-ds</div>
          <div>📊 kaggle.com/priyasharma</div>
          <div>🌐 portfolio.priyasharma.io</div>
        </div>
      </div>

      {/* Technical Skills: 3-column grid table */}
      <div style={{ backgroundColor: "#f0f0f0", padding: "4px 8px", fontSize: "8px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", color: "#333", marginBottom: "6px" }}>Technical Skills</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", marginBottom: "14px", border: "1px solid #ddd", padding: "8px", fontSize: "9px" }}>
        <div><div style={{ fontWeight: "bold", color: "#1a1a2e", marginBottom: "3px", fontSize: "8.5px" }}>Languages</div>{["Python", "R", "SQL", "Scala", "Julia"].map(s => <div key={s} style={{ marginBottom: "1px" }}>· {s}</div>)}</div>
        <div><div style={{ fontWeight: "bold", color: "#1a1a2e", marginBottom: "3px", fontSize: "8.5px" }}>Tools & Libraries</div>{["PyTorch", "TensorFlow", "scikit-learn", "Pandas", "Spark"].map(s => <div key={s} style={{ marginBottom: "1px" }}>· {s}</div>)}</div>
        <div><div style={{ fontWeight: "bold", color: "#1a1a2e", marginBottom: "3px", fontSize: "8.5px" }}>Platforms</div>{["AWS SageMaker", "GCP Vertex AI", "Databricks", "Snowflake", "Airflow"].map(s => <div key={s} style={{ marginBottom: "1px" }}>· {s}</div>)}</div>
      </div>

      {/* Experience with metrics */}
      <div style={{ backgroundColor: "#f0f0f0", padding: "4px 8px", fontSize: "8px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", color: "#333", marginBottom: "8px" }}>Experience</div>
      {[
        { role: "Senior Data Scientist", co: "Stripe", dates: "2022–Present", bullets: ["Improved fraud detection model accuracy by <b>23%</b>, saving $18M annually", "Reduced feature engineering pipeline runtime by <b>40%</b> using Spark optimization", "Led team of 6 MLE/DS to productionize 12 ML models serving <b>100M+ requests/day</b>"] },
        { role: "ML Research Engineer", co: "Google Brain", dates: "2020–2022", bullets: ["Authored 3 papers (NeurIPS 2021, ICML 2022) with <b>800+ citations</b>", "Built self-supervised vision model achieving <b>94.2% top-1 accuracy</b> on ImageNet"] },
      ].map((exp, i) => (
        <div key={i} style={{ marginBottom: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontSize: "10px", fontWeight: "bold" }}>{exp.role} · <span style={{ color: "#4a4a9a" }}>{exp.co}</span></div>
            <div style={{ fontSize: "9px", color: "#888" }}>{exp.dates}</div>
          </div>
          {exp.bullets.map((b, j) => (
            <div key={j} style={{ fontSize: "9px", color: "#444", marginTop: "3px", display: "flex", gap: "5px" }}>
              <span>•</span><span dangerouslySetInnerHTML={{ __html: b }} />
            </div>
          ))}
        </div>
      ))}

      {/* Projects section */}
      <div style={{ backgroundColor: "#f0f0f0", padding: "4px 8px", fontSize: "8px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", color: "#333", marginBottom: "8px" }}>Notable Projects</div>
      <div style={{ fontSize: "9px", color: "#444", lineHeight: "1.6" }}>
        <div style={{ marginBottom: "5px" }}><span style={{ fontWeight: "bold" }}>OpenFraud (Open Source)</span> · 2.1k GitHub stars · Real-time fraud scoring library used by 200+ fintechs</div>
        <div><span style={{ fontWeight: "bold" }}>TimeSeries Benchmark</span> · Kaggle Gold Medal · Ranked 3rd globally in M5 Accuracy Competition</div>
      </div>
    </div>
  );
}

function PreviewCreativeClear() {
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", display: "flex", backgroundColor: "#fff", width: "800px", minHeight: "1100px", color: "#111", fontSize: "11px" }}>
      {/* Left sidebar */}
      <div style={{ width: "35%", backgroundColor: "#f5f5f0", padding: "28px 18px", flexShrink: 0 }}>
        {/* Profile photo placeholder */}
        <div style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "#d4a0a8", border: "3px solid #c9747a", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontWeight: "bold", color: "#fff" }}>JD</div>
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <div style={{ fontFamily: "'Montserrat', 'Segoe UI', sans-serif", fontSize: "14px", fontWeight: "700", color: "#2a2a2a", letterSpacing: "0.02em" }}>JORDAN DAVIS</div>
          <div style={{ fontSize: "8.5px", color: "#c9747a", fontWeight: "bold", marginTop: "2px" }}>UX Design Lead</div>
          <div style={{ borderBottom: "2px solid #c9747a", width: "40px", margin: "6px auto 0" }} />
        </div>

        {/* Contact icons */}
        <div style={{ marginBottom: "14px" }}>
          <div style={{ fontSize: "9px", color: "#c9747a", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>Contact</div>
          {[["✉", "jordan@studio.io"], ["📱", "+1 917 555 0127"], ["🔗", "linkedin.com/in/jdavis"]].map(([icon, val], i) => (
            <div key={i} style={{ display: "flex", gap: "6px", alignItems: "center", fontSize: "8.5px", color: "#555", marginBottom: "4px" }}>
              <span>{icon}</span>{val}
            </div>
          ))}
        </div>

        {/* Skills with dot ratings */}
        <div style={{ marginBottom: "14px" }}>
          <div style={{ fontSize: "9px", color: "#c9747a", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Skills</div>
          {[["Figma / FigJam", 5], ["Design Systems", 5], ["User Research", 4], ["Prototyping", 4], ["CSS / HTML", 3], ["React", 3]].map(([skill, level], i) => (
            <div key={i} style={{ marginBottom: "6px" }}>
              <div style={{ fontSize: "8.5px", color: "#333", marginBottom: "2px" }}>{skill}</div>
              <div style={{ display: "flex", gap: "3px" }}>
                {[1,2,3,4,5].map(d => (
                  <div key={d} style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: d <= (level as number) ? "#c9747a" : "#ddd" }} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bio */}
        <div>
          <div style={{ fontSize: "9px", color: "#c9747a", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>About</div>
          <div style={{ fontSize: "8.5px", color: "#555", lineHeight: "1.6" }}>Passionate UX designer crafting intuitive digital experiences for 9 years. Driven by empathy, system thinking, and pixel-perfect craft.</div>
        </div>
      </div>

      {/* Right main content */}
      <div style={{ flex: 1, padding: "28px 24px" }}>
        {[
          { heading: "Experience", items: [
            { role: "UX Design Lead", co: "Airbnb", dates: "2021–Present", bullets: ["Led redesign of Host Dashboard serving 4M hosts globally", "Built and scaled design system (Linen 2.0) used by 80+ product teams", "Mentored team of 12 junior and mid-level designers"] },
            { role: "Senior UX Designer", co: "Figma", dates: "2018–2021", bullets: ["Owned end-to-end design for Figma's Plugin Marketplace launch", "Increased plugin discovery rate by 38% through information architecture redesign"] },
          ]},
          { heading: "Education", items: [{ role: "BFA Interaction Design", co: "RISD", dates: "2018", bullets: ["GPA 3.9 · Senior Thesis Award · Teaching Assistant, Visual Communication"] }] },
        ].map((section, si) => (
          <div key={si} style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", color: "#c9747a", borderBottom: "1px solid #c9747a", paddingBottom: "3px", marginBottom: "10px" }}>{section.heading}</div>
            {section.items.map((exp, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontSize: "10px", fontWeight: "bold", color: "#222" }}>{exp.role} · <span style={{ color: "#c9747a" }}>{exp.co}</span></div>
                  <div style={{ fontSize: "8.5px", color: "#888" }}>{exp.dates}</div>
                </div>
                {exp.bullets.map((b, j) => (
                  <div key={j} style={{ fontSize: "9px", color: "#555", marginTop: "3px", display: "flex", gap: "5px" }}>
                    <span style={{ color: "#c9747a" }}>·</span>{b}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewMinimalist() {
  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", padding: "48px 52px", backgroundColor: "#fff", width: "800px", minHeight: "1100px", color: "#111", fontSize: "11px" }}>
      {/* Name — very large, light weight */}
      <div style={{ fontSize: "30px", fontWeight: "300", color: "#000", letterSpacing: "-0.5px", marginBottom: "4px" }}>Emily Tanaka</div>
      {/* Contact — single line with pipes */}
      <div style={{ fontSize: "9.5px", color: "#888", marginBottom: "36px" }}>emily.tanaka@gmail.com &nbsp;|&nbsp; (646) 555-0134 &nbsp;|&nbsp; New York, NY &nbsp;|&nbsp; linkedin.com/in/emilytanaka</div>

      {[
        { heading: "Summary", body: <div style={{ fontSize: "10px", color: "#444", lineHeight: "1.8", paddingLeft: "0px" }}>Operations leader with a decade of experience simplifying complex organizational systems. Known for calm clarity under pressure and building processes that scale without noise.</div> },
        { heading: "Experience", body: (
          <div>
            {[
              { role: "VP Operations", co: "Notion", dates: "2020–Present", bullets: ["Grew ops function from 4 to 40 across 6 global offices", "Reduced vendor costs by $2.8M annually through contract consolidation", "Led ISO 27001 certification program across 140-person engineering org"] },
              { role: "Senior Operations Manager", co: "Figma", dates: "2017–2020", bullets: ["Designed onboarding program reducing new-hire ramp from 90 to 28 days", "Managed $12M annual budget across People, Legal, and IT functions"] },
            ].map((exp, i) => (
              <div key={i} style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontSize: "10px", fontWeight: "400", color: "#000" }}>{exp.role} &mdash; {exp.co}</div>
                  <div style={{ fontSize: "9px", color: "#aaa" }}>{exp.dates}</div>
                </div>
                {exp.bullets.map((b, j) => (
                  <div key={j} style={{ fontSize: "9.5px", color: "#555", marginTop: "5px", lineHeight: "1.6", paddingLeft: "16px", textIndent: "-16px" }}>
                    &nbsp;&nbsp;&nbsp;&nbsp;{b}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )},
        { heading: "Education", body: <div style={{ fontSize: "10px", color: "#555" }}>B.S. Industrial Engineering &mdash; Cornell University &nbsp;·&nbsp; 2013</div> },
        { heading: "Skills", body: <div style={{ fontSize: "9.5px", color: "#666", lineHeight: "2" }}>Organizational Design &nbsp;·&nbsp; Vendor Management &nbsp;·&nbsp; Budget Planning &nbsp;·&nbsp; Cross-Functional Leadership &nbsp;·&nbsp; Lean Operations &nbsp;·&nbsp; OKR Facilitation</div> },
      ].map((sec, i) => (
        <div key={i} style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#888", fontWeight: "400", marginBottom: "8px" }}>{sec.heading}</div>
          {sec.body}
        </div>
      ))}
    </div>
  );
}

function PreviewAcademicScholar() {
  return (
    <div style={{ fontFamily: "'Palatino Linotype', 'Palatino', 'Book Antiqua', Georgia, serif", padding: "32px", backgroundColor: "#fff", width: "800px", minHeight: "1100px", color: "#111", fontSize: "11px", lineHeight: "1.6" }}>
      {/* Centered header */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <div style={{ fontSize: "22px", fontWeight: "bold", color: "#1a1a1a", letterSpacing: "0.01em", fontVariant: "small-caps" }}>Dr. Anya Petrov</div>
        <div style={{ fontSize: "10px", color: "#555", fontStyle: "italic", marginTop: "2px" }}>Assistant Professor, Department of Computer Science · Carnegie Mellon University</div>
        <div style={{ fontSize: "9px", color: "#666", marginTop: "3px" }}>anya.petrov@cs.cmu.edu · scholar.google.com/anya-petrov · researchgate.net/anya.petrov</div>
      </div>
      <div style={{ borderBottom: "0.5pt solid #333", marginBottom: "12px" }} />

      {[
        { heading: "Education", body: (
          <div>
            <div style={{ fontWeight: "bold", fontSize: "10px" }}>Ph.D. Computer Science — Stanford University</div>
            <div style={{ fontSize: "9.5px", color: "#555" }}>2019 · Dissertation: "Causal Inference in Large Language Models" · Advisor: Prof. Christopher Manning</div>
            <div style={{ fontWeight: "bold", fontSize: "10px", marginTop: "5px" }}>M.S. Artificial Intelligence — UC Berkeley</div>
            <div style={{ fontSize: "9.5px", color: "#555" }}>2015 · GPA: 4.0/4.0</div>
          </div>
        )},
        { heading: "Research Experience", body: (
          <div>
            {[
              { role: "Assistant Professor", co: "CMU SCS", dates: "2022–Present", bullets: ["Lead the Language and Cognition Lab with 12 PhD students and 2 postdocs", "NSF CAREER Award recipient ($500k) for causal reasoning in NLP"] },
              { role: "Postdoctoral Researcher", co: "MIT CSAIL", dates: "2019–2022", bullets: ["Developed CAUSALBERT: a causal reasoning benchmark adopted by 40+ research groups"] },
            ].map((exp, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontSize: "10px", fontWeight: "bold" }}>{exp.role} · <span style={{ fontStyle: "italic" }}>{exp.co}</span></div>
                  <div style={{ fontSize: "9px", color: "#666" }}>{exp.dates}</div>
                </div>
                {exp.bullets.map((b, j) => <div key={j} style={{ fontSize: "9px", color: "#444", display: "flex", gap: "5px", marginTop: "2px" }}><span>–</span>{b}</div>)}
              </div>
            ))}
          </div>
        )},
        { heading: "Selected Publications", body: (
          <div style={{ fontSize: "9px", color: "#444", lineHeight: "1.8" }}>
            <div>Petrov, A., Manning, C., & Jurafsky, D. (2024). Causal Chains in Neural Language Models. <span style={{ fontStyle: "italic" }}>Nature Machine Intelligence</span>, 6(3), 112–128.</div>
            <div style={{ marginTop: "4px" }}>Petrov, A., & Levy, R. (2023). Counterfactual Reasoning Benchmarks for LLMs. <span style={{ fontStyle: "italic" }}>Proceedings of ACL 2023</span>, 4821–4836.</div>
            <div style={{ marginTop: "4px" }}>Petrov, A. (2022). CausalBERT: A Framework for Interventional NLP. <span style={{ fontStyle: "italic" }}>EMNLP 2022</span>, 1204–1219. <span style={{ color: "#888" }}>[Best Paper Award]</span></div>
          </div>
        )},
        { heading: "Awards & Grants", body: (
          <div style={{ fontSize: "9px", color: "#444", lineHeight: "2" }}>
            <div>· NSF CAREER Award ($500,000) · 2023</div>
            <div>· Best Paper Award, EMNLP · 2022</div>
            <div>· Stanford Graduate Fellowship · 2015–2019</div>
          </div>
        )},
      ].map((sec, i) => (
        <div key={i} style={{ marginBottom: "13px" }}>
          <div style={{ fontSize: "9.5px", fontWeight: "bold", fontVariant: "small-caps", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "0.5pt solid #555", paddingBottom: "2px", marginBottom: "6px" }}>{sec.heading}</div>
          {sec.body}
        </div>
      ))}
    </div>
  );
}

function PreviewStartupFounder() {
  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", padding: "28px", backgroundColor: "#fff", width: "800px", minHeight: "1100px", color: "#111", fontSize: "11px" }}>
      {/* Header */}
      <div style={{ marginBottom: "14px" }}>
        <div style={{ fontSize: "28px", fontWeight: "900", color: "#0f0f0f", letterSpacing: "-0.8px", lineHeight: 1 }}>RYAN PARK</div>
        <div style={{ borderBottom: "3px solid #e8540a", width: "60px", margin: "6px 0" }} />
        <div style={{ fontSize: "10px", color: "#e8540a", fontVariant: "small-caps", letterSpacing: "0.1em", fontWeight: "600" }}>Founder · Product · Growth</div>
        <div style={{ fontSize: "9px", color: "#666", marginTop: "4px" }}>ryan@parkventures.io · linkedin.com/in/ryanpark · @rpark · New York</div>
      </div>

      {/* Ventures Founded — FIRST */}
      <div style={{ marginBottom: "14px" }}>
        <div style={{ borderLeft: "4px solid #e8540a", paddingLeft: "10px", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.08em", color: "#0f0f0f", marginBottom: "9px" }}>Ventures Founded</div>
        {[
          { name: "ParkAI", tagline: "Enterprise AI Automation", stage: "Series A · $18M raised", dates: "2022–Present", bullets: ["Founded and scaled to $4.2M ARR in 14 months", "Hired 40-person team across Product, Eng, and GTM", "Led Series A: a16z, Sequoia participation"] },
          { name: "LoopStack", tagline: "Dev Tooling · Acquired by GitHub", stage: "Seed → Acquired", dates: "2019–2022", bullets: ["Bootstrapped to $800k ARR before raising $3.2M seed", "Sold to GitHub (Microsoft) for $22M in 2022"] },
        ].map((v, i) => (
          <div key={i} style={{ marginBottom: "12px", paddingLeft: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: "bold", color: "#0f0f0f" }}>{v.name}</span>
                <span style={{ fontSize: "9px", color: "#888", marginLeft: "8px" }}>{v.tagline}</span>
              </div>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <span style={{ fontSize: "7.5px", backgroundColor: "#fff3e0", color: "#e8540a", border: "1px solid #e8540a", padding: "1px 5px", fontWeight: "bold" }}>{v.stage}</span>
                <span style={{ fontSize: "8.5px", color: "#999" }}>{v.dates}</span>
              </div>
            </div>
            {v.bullets.map((b, j) => <div key={j} style={{ fontSize: "9px", color: "#555", display: "flex", gap: "5px", marginTop: "2px" }}><span style={{ color: "#e8540a" }}>›</span>{b}</div>)}
          </div>
        ))}
      </div>

      {/* Experience */}
      <div style={{ marginBottom: "14px" }}>
        <div style={{ borderLeft: "4px solid #e8540a", paddingLeft: "10px", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.08em", color: "#0f0f0f", marginBottom: "9px" }}>Prior Experience</div>
        <div style={{ paddingLeft: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontSize: "10px", fontWeight: "bold" }}>Product Manager · <span style={{ color: "#e8540a" }}>Stripe</span></div>
            <div style={{ fontSize: "8.5px", color: "#999" }}>2017–2019</div>
          </div>
          {["Led Stripe Atlas from beta to $50M ARR — 0 to 1 B2B product launch", "Owned roadmap for 3 enterprise products; grew NPS from 42 to 71"].map((b, j) => <div key={j} style={{ fontSize: "9px", color: "#555", display: "flex", gap: "5px", marginTop: "2px" }}><span style={{ color: "#e8540a" }}>›</span>{b}</div>)}
        </div>
      </div>

      {/* Skills */}
      <div>
        <div style={{ borderLeft: "4px solid #e8540a", paddingLeft: "10px", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.08em", color: "#0f0f0f", marginBottom: "8px" }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", paddingLeft: "14px" }}>
          {["Fundraising", "Go-to-Market", "Product Strategy", "Team Building", "Investor Relations", "B2B SaaS", "YC Alum (S21)", "Angel Investing"].map(s => (
            <span key={s} style={{ background: "#fff3e0", border: "1px solid #e8540a", color: "#b84200", fontSize: "8.5px", padding: "2px 7px", fontWeight: "bold" }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Template Data ─────────────────────────────────────────────────────────────

type TemplateType = {
  id: number;
  name: string;
  category: string;
  atsScore: number;
  description: string;
  popular: boolean;
  badge: "free" | "credit" | "pro";
  PreviewComponent: React.FC;
};

const templates: TemplateType[] = [
  { id: 1, name: "Executive Pro",     category: "Executive",     atsScore: 98, description: "Dense, authoritative two-column layout. Built for senior leadership and C-suite applications.", popular: true,  badge: "free",   PreviewComponent: PreviewExecutivePro },
  { id: 2, name: "Technical Edge",    category: "Technical",     atsScore: 97, description: "Skills-first single column. Teal accents, monospace font, dev portfolio feel.",              popular: true,  badge: "free",   PreviewComponent: PreviewTechnicalEdge },
  { id: 3, name: "Corporate Classic", category: "Professional",  atsScore: 96, description: "Centered header, classic serif, generous whitespace. Safe for any industry.",                popular: false, badge: "free",   PreviewComponent: PreviewCorporateClassic },
  { id: 4, name: "Data Pro",          category: "Technical",     atsScore: 95, description: "Skills grid table, metric-driven bullets, GitHub/Kaggle links. Built for DS and ML roles.",  popular: false, badge: "credit", PreviewComponent: PreviewDataPro },
  { id: 5, name: "Creative Clear",    category: "Creative",      atsScore: 92, description: "Warm sidebar with photo, dot-rating skills, dusty rose accent. Design portfolio style.",     popular: false, badge: "credit", PreviewComponent: PreviewCreativeClear },
  { id: 6, name: "Minimalist",        category: "Professional",  atsScore: 97, description: "Ultra-sparse. Light font weight, no borders, no color. Pure whitespace and typography.",    popular: false, badge: "free",   PreviewComponent: PreviewMinimalist },
  { id: 7, name: "Academic Scholar",  category: "Academic",      atsScore: 90, description: "Publications section, small-caps headers, Palatino serif. CV format for research roles.",   popular: false, badge: "credit", PreviewComponent: PreviewAcademicScholar },
  { id: 8, name: "Startup Founder",   category: "Executive",     atsScore: 94, description: "Ventures-first, orange accents, bold sans-serif. Built for founders and YC applications.",  popular: false, badge: "credit", PreviewComponent: PreviewStartupFounder },
];

// ─── Main Component ────────────────────────────────────────────────────────────

export default function Templates() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(1);

  const filtered = templates.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedName = templates.find((t) => t.id === selectedTemplate)?.name ?? null;

  const atsColor = (score: number) => {
    if (score >= 95) return "#16a34a";
    if (score >= 90) return "#d97706";
    return "#dc2626";
  };

  const badgeStyle = (badge: "free" | "credit" | "pro"): React.CSSProperties => {
    if (badge === "free")   return { background: "#0d9488", color: "#fff" };
    if (badge === "credit") return { background: "#d97706", color: "#fff" };
    return                         { background: "#374151", color: "#fff" };
  };

  const badgeLabel = (badge: "free" | "credit" | "pro") => {
    if (badge === "free")   return "FREE PLAY";
    if (badge === "credit") return "CREDIT COMPATIBLE";
    return "PRO ONLY";
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#121214] pb-24 pt-24 font-mono">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[#e0128b] font-pixel text-[9px] uppercase tracking-widest mb-2 animate-pulse">TEMPLATE LIBRARY</p>
          <h1 className="font-retro font-black text-4xl lg:text-5xl text-black mb-3 uppercase leading-none">
            CHOOSE YOUR <span className="text-[#ff7700]">FORMAT STYLE</span>
          </h1>
          <p className="font-mono text-gray-600 text-sm font-medium">
            Every template is ATS-optimized, professionally designed, and tested against real hiring systems.
            Previews show actual typographic layouts — not placeholders.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
            <input
              placeholder="SEARCH STYLES..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border-2 border-black text-black placeholder:text-gray-400 h-10 pl-9 pr-4 font-mono text-xs uppercase outline-none focus:border-[#e0128b] shadow-[2px_2px_0px_#000] focus:shadow-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 border-2 border-black font-mono text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#000] transition-all retro-btn-press ${
                  activeCategory === cat
                    ? "bg-[#e0128b] text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((tmpl) => {
            const isSelected = selectedTemplate === tmpl.id;
            return (
              <div
                key={tmpl.id}
                className="group relative bg-white border-4 border-black shadow-[4px_4px_0px_#121214] transition-all duration-200 cursor-pointer hover:shadow-[6px_6px_0px_#121214] hover:-translate-y-0.5"
                style={isSelected ? { borderColor: "#e0128b", boxShadow: "4px 4px 0px #e0128b" } : {}}
                onClick={() => setSelectedTemplate(tmpl.id)}
              >
                {/* ── Live Preview Window ── */}
                <div
                  className="relative border-b-2 border-black overflow-hidden bg-[#f9f9f9]"
                  style={{ height: "210px" }}
                >
                  {/* Scaled resume preview */}
                  <div
                    style={{
                      transform: "scale(0.26)",
                      transformOrigin: "top left",
                      width: "800px",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  >
                    <tmpl.PreviewComponent />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#140d25]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                    <button
                      className="px-4 py-1.5 bg-white text-black border-2 border-black font-mono font-bold uppercase tracking-wider text-[10px] shadow-[2px_2px_0px_#000] retro-btn-press"
                      onClick={(e) => { e.stopPropagation(); setSelectedTemplate(tmpl.id); }}
                    >
                      {isSelected ? "✓ SELECTED" : "SELECT STYLE"}
                    </button>
                  </div>

                  {/* Top-left badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                    {tmpl.popular && (
                      <div className="flex items-center gap-1 px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000] font-mono text-[9px] font-bold uppercase" style={{ background: "#ff7700", color: "#fff" }}>
                        <Star size={8} className="fill-current" /> Popular
                      </div>
                    )}
                    <div className="px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000] font-mono text-[8px] font-bold uppercase" style={badgeStyle(tmpl.badge)}>
                      {tmpl.badge === "pro" && <Lock size={7} className="inline mr-1" />}
                      {badgeLabel(tmpl.badge)}
                    </div>
                  </div>

                  {/* Selected check */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 border-2 border-black flex items-center justify-center z-10" style={{ background: "#e0128b" }}>
                      <Check size={12} className="text-white stroke-[3px]" />
                    </div>
                  )}
                </div>

                {/* Info panel */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1.5">
                    <h3 className="font-retro font-bold text-xl text-black uppercase leading-none">{tmpl.name}</h3>
                    <span className="font-retro font-bold text-lg leading-none" style={{ color: atsColor(tmpl.atsScore) }}>
                      {tmpl.atsScore}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gray-100 border border-black px-2 py-0.5 font-mono text-[8.5px] font-bold uppercase text-gray-600">
                      {tmpl.category}
                    </span>
                  </div>
                  <p className="font-mono text-[10.5px] text-gray-600 leading-relaxed">{tmpl.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#121214]">
          <div>
            <p className="font-retro font-black text-2xl text-black uppercase leading-none">
              {selectedName ? `SELECTED: ${selectedName.toUpperCase()}` : "SELECT A TEMPLATE TO START"}
            </p>
            <p className="font-mono text-xs text-gray-500 mt-1">
              Your template preference is passed directly into the AI generation step.
            </p>
          </div>
          <Link to="/generate">
            <button
              disabled={!selectedTemplate}
              className="px-6 py-3 text-white border-2 border-black shadow-[3px_3px_0px_#000] font-mono font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all retro-btn-press disabled:opacity-35 disabled:pointer-events-none"
              style={{ background: "#e8540a" }}
            >
              <Zap size={14} className="fill-white" />
              USE SELECTED STYLE →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}