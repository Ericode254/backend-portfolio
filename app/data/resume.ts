/**
 * DOCUMENT_DATA
 * 
 * This file contains the source content for the "Resume & Docs" (Manila Folder) modal.
 * The content is separated from the view logic (CaseStudyModal.tsx) to make updates easier.
 * 
 * Structure:
 * - header: Metadata displayed at the top of the report.
 * - downloadUrl: Link to the actual PDF file in the public folder.
 * - sections: Array of content blocks. Supported types: 'text', 'list', 'experience', 'code'.
 */
export const DOCUMENT_DATA = {
  // Metadata for the "Paper Header"
  header: {
    id: "PERSONNEL-FILE-001",
    date: new Date().toISOString().split('T')[0],
    title: "Erick Jillo",
    subtitle: "Senior Backend Engineer // Distributed Systems",
    classification: "TOP SECRET // EYES ONLY"
  },
  
  // The Download Link (Place your real PDF in the public folder)
  downloadUrl: "/resume.pdf",

  // The Content Sections (Rendered in the Typewriter style)
  sections: [
    {
      type: "text",
      title: "Executive Summary",
      content: "Results-oriented Backend Engineer with 5+ years of experience designing scalable microservices. Proven track record of reducing latency and optimizing high-throughput systems. Polyglot programmer with a focus on Go, Rust, and Cloud Native technologies."
    },
    {
      type: "list",
      title: "Core Competencies",
      items: [
        "Distributed System Design (Raft, Paxos)",
        "High-Performance APIs (gRPC, GraphQL)",
        "Database Optimization (PostgreSQL Internals, Redis Lua)",
        "Infrastructure as Code (Terraform, Kubernetes)",
        "Observability (Prometheus, Grafana, OpenTelemetry)"
      ]
    },
    {
      type: "experience",
      title: "Professional History",
      items: [
        {
          role: "Senior Backend Engineer",
          company: "TechCorp Cloud",
          duration: "2022 - Present",
          details: "Led the migration of the monolithic payment gateway to event-driven microservices. Reduced transaction latency by 40%."
        },
        {
          role: "Software Engineer",
          company: "StartupX",
          duration: "2019 - 2022",
          details: "Built the initial MVP for the real-time collaboration tool using Elixir/Phoenix. Scaled to 100k concurrent users."
        }
      ]
    },
    {
      type: "code",
      title: "Signature Code Style",
      language: "go",
      content: `func (s *Server) HandleRequest(ctx context.Context, req *pb.Request) (*pb.Response, error) {
    // Always prioritize context cancellation
    select {
    case <-ctx.Done():
        return nil, ctx.Err()
    default:
        // Efficient processing...
        return s.process(req)
    }
}`
    }
  ]
};
