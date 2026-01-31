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
    subtitle: "Senior Backend Engineer // Linux Systems",
    classification: "TOP SECRET"
  },
  
  // The Download Link (Place your real PDF in the public folder)
  downloadUrl: "/Erick.pdf",

  // The Content Sections (Rendered in the Typewriter style)
  sections: [
    {
      type: "text",
      title: "Executive Summary",
      content: "Results-oriented Backend Engineer with 2+ years of experience designing scalable microservices and backend systems. Proven track record of reducing latency and optimizing high-throughput systems. Polyglot programmer with a focus on Go, Python, and Javascript/Typescript"
    },
    {
      type: "list",
      title: "Core Competencies",
      items: [
        // "Distributed System Design (Raft, Paxos)",
        "High-Performance APIs (RESTAPI, GraphQL)",
        "Database Optimization (PostgreSQL Internals)",
        "Observability (Prometheus, Grafana, OpenTelemetry)"
      ]
    },
    {
      type: "experience",
      title: "Professional History",
      items: [
        {
          role: "Backend Engineer",
          duration: "2025 - Present",
          details: "Built a RESTFULAPI that incorperated caching for faster fetching of data from the database and implimented end to end encryption for user chats"
        },
        {
          role: "Software Engineer",
          duration: "2025-2026",
          details: "Built a highly secure chama app that enables users to create informal savings groups and investments clubs."
        }
      ]
    },
//     {
//       type: "code",
//       title: "Signature Code Style",
//       language: "go",
//       content: `func (s *Server) HandleRequest(ctx context.Context, req *pb.Request) (*pb.Response, error) {
//     // Always prioritize context cancellation
//     select {
//     case <-ctx.Done():
//         return nil, ctx.Err()
//     default:
//         // Efficient processing...
//         return s.process(req)
//     }
// }`
//     }
  ]
};
