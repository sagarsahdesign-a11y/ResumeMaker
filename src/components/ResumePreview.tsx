interface ResumePreviewProps {
  candidateName?: string;
  role?: string;
  compact?: boolean;
}

export default function ResumePreview({
  candidateName = "Alexandra Chen",
  role = "Senior Software Engineer",
  compact = false,
}: ResumePreviewProps) {
  return (
    <div
      className="bg-white text-gray-900 rounded-sm shadow-2xl w-full font-sans overflow-hidden"
      style={{
        aspectRatio: "210/297",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
        fontFamily: "'Times New Roman', serif",
        fontSize: compact ? "7px" : "8.5px",
        lineHeight: 1.4,
      }}
    >
      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="border-b-2 border-gray-800 pb-3 mb-3">
          <h1 className="font-bold text-gray-900" style={{ fontSize: compact ? "14px" : "18px", letterSpacing: "0.05em", fontFamily: "Arial, sans-serif" }}>
            {candidateName.toUpperCase()}
          </h1>
          <p className="text-gray-600 mt-0.5" style={{ fontSize: compact ? "8px" : "10px", fontFamily: "Arial, sans-serif" }}>
            {role} · San Francisco, CA · alex@email.com · linkedin.com/in/alexchen
          </p>
        </div>

        {/* Summary */}
        <div className="mb-3">
          <h2 className="font-bold text-gray-800 uppercase tracking-widest mb-1" style={{ fontSize: compact ? "7px" : "9px", fontFamily: "Arial, sans-serif", letterSpacing: "0.12em" }}>
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
            Results-driven Software Engineer with 7+ years of experience building scalable distributed systems and leading cross-functional teams. Expert in cloud-native architectures, React/Node.js ecosystems, and agile methodologies. Proven track record of delivering high-impact products used by millions.
          </p>
        </div>

        {/* Experience */}
        <div className="mb-3">
          <h2 className="font-bold text-gray-800 uppercase tracking-widest mb-2" style={{ fontSize: compact ? "7px" : "9px", fontFamily: "Arial, sans-serif", letterSpacing: "0.12em" }}>
            Work Experience
          </h2>
          {[
            {
              title: "Senior Software Engineer",
              company: "TechCorp Inc.",
              period: "Jan 2021 – Present",
              points: [
                "Architected and led migration of monolithic services to microservices, reducing latency by 40%",
                "Mentored team of 5 engineers and conducted 120+ code reviews quarterly",
                "Implemented CI/CD pipelines with 99.9% deployment success rate",
              ],
            },
            {
              title: "Software Engineer",
              company: "StartupXYZ",
              period: "Jun 2018 – Dec 2020",
              points: [
                "Built React-based dashboard serving 200K DAU with sub-100ms response times",
                "Reduced infrastructure costs by 30% through AWS optimization",
              ],
            },
          ].map((job, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-gray-900" style={{ fontFamily: "Arial, sans-serif", fontSize: compact ? "7.5px" : "9.5px" }}>
                  {job.title} · {job.company}
                </span>
                <span className="text-gray-500 ml-2 flex-shrink-0" style={{ fontSize: compact ? "6.5px" : "8px" }}>{job.period}</span>
              </div>
              <ul className="mt-0.5 list-disc pl-4">
                {job.points.map((pt, j) => (
                  <li key={j} className="text-gray-700">{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mb-3">
          <h2 className="font-bold text-gray-800 uppercase tracking-widest mb-1" style={{ fontSize: compact ? "7px" : "9px", fontFamily: "Arial, sans-serif", letterSpacing: "0.12em" }}>
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-1">
            {["React", "TypeScript", "Node.js", "Python", "AWS", "Kubernetes", "PostgreSQL", "Redis", "GraphQL", "Docker", "CI/CD", "Agile"].map((skill) => (
              <span
                key={skill}
                className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded"
                style={{ fontSize: compact ? "6px" : "7.5px", fontFamily: "Arial, sans-serif" }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="font-bold text-gray-800 uppercase tracking-widest mb-1" style={{ fontSize: compact ? "7px" : "9px", fontFamily: "Arial, sans-serif", letterSpacing: "0.12em" }}>
            Education
          </h2>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-900" style={{ fontFamily: "Arial, sans-serif", fontSize: compact ? "7.5px" : "9px" }}>
              B.S. Computer Science · Stanford University
            </span>
            <span className="text-gray-500" style={{ fontSize: compact ? "6.5px" : "8px" }}>2018</span>
          </div>
        </div>
      </div>
    </div>
  );
}