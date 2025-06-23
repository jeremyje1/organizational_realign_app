"use client";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { computeRedundancy, computeAiReadiness, estimateSavings } from "@/config/scoring";
import { loadSurveyData, loadRoleData } from "@/lib/storage";
import { supabase } from "@/lib/supabase";

import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image, pdf } from "@react-pdf/renderer";

import SummaryCard from "@/components/results/SummaryCard";
import RoleList from "@/components/results/RoleList";
import PriorityMatrix from "@/components/results/PriorityMatrix";

const pdfStyles = StyleSheet.create({
  page: { padding: 30, position: "relative", flexDirection: "column", justifyContent: "flex-start" },
  sectionHeader: {
    backgroundColor: "#E6F1FF",
    padding: 6,
    borderRadius: 4,
    marginBottom: 8,
  },
  sectionHeaderText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#0E1A2B",
  },
  heading: { fontSize: 16, marginBottom: 6, fontWeight: "bold", color: "#0E1A2B" },
  line: { fontSize: 12, marginBottom: 4 },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    fontSize: 10,
    color: "#999",
  },
  pageNumber: {
    position: "absolute",
    bottom: 30,
    right: 30,
    fontSize: 10,
    color: "#999",
  },
  titleTextLarge: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0E1A2B",
    marginBottom: 12,
  },
  titleTextMedium: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  titleTextSmall: {
    fontSize: 12,
    color: "#555",
  },
  qrLink: {
    fontSize: 10,
    color: "#0E1A2B",
    textDecoration: "underline",
    marginTop: 20,
  },
  watermark: {
    position: "absolute",
    top: "50%",
    left: "20%",
    fontSize: 50,
    color: "#F3F4F6",
    transform: "rotate(-30deg)",
  },
  brandHeader: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  logoPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  logoText: {
    color: "#0E1A2B",
    fontWeight: "bold",
    fontSize: 18,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0E1A2B",
  },
  brandSubtitle: {
    fontSize: 10,
    color: "#999",
  },
  executiveLetterContainer: {
    marginBottom: 20,
  },
  executiveLetterGreeting: {
    fontSize: 12,
    fontStyle: "italic",
    marginBottom: 10,
  },
  executiveLetterText: {
    fontSize: 11,
    lineHeight: 1.5,
  },
  executiveLetterSpanishText: {
    fontSize: 11,
    lineHeight: 1.5,
    marginTop: 12,
  },
  executiveLetterBoldSpan: {
    fontWeight: "bold",
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0E1A2B",
  },
  summaryLine: {
    fontSize: 12,
    marginBottom: 4,
    color: "#0E1A2B",
  },
  summaryChartContainer: {
    backgroundColor: "#FFF7E5",
    padding: 6,
    borderRadius: 4,
    marginBottom: 8,
  },
  summaryChartTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#92400E",
  },
  chartBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  chartBarLabel: {
    fontSize: 10,
    marginLeft: 4,
  },
  appendixContainer: {
    backgroundColor: "#F5F5F5",
    padding: 6,
    borderRadius: 4,
    marginBottom: 8,
  },
  appendixTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#374151",
  },
  appendixLine: {
    fontSize: 12,
    marginBottom: 4,
  },
});

const ReportPDF = ({
  redundancy,
  aiReadiness,
  savings,
  orgName,
  roles,
}: {
  redundancy: number;
  aiReadiness: number;
  savings: number;
  orgName: string;
  roles: { id: string; name: string; tag?: string }[];
}) => (
  <Document>
    {/* Title Cover Page */}
    <Page size="A4" style={pdfStyles.page}>
      <View style={{ marginBottom: 60, alignItems: "center", justifyContent: "center" }}>
        <Text style={pdfStyles.titleTextLarge}>NORTHPATH</Text>
        <Text style={pdfStyles.titleTextMedium}>Strategic Realignment Report</Text>
        <Text style={pdfStyles.titleTextSmall}>{orgName}</Text>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 10, color: "#888", marginBottom: 4 }}>Scan QR to access live dashboard:</Text>
          <Image
            src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://northpathstrategies.org/dashboard"
            style={{ width: 80, height: 80, marginBottom: 4 }}
          />
          <Text style={pdfStyles.qrLink}>
            https://northpathstrategies.org/dashboard
          </Text>
        </View>
        <Text style={{ fontSize: 10, color: "#888", marginTop: 24 }}>
          Generated on: {new Date().toLocaleDateString()}
        </Text>
      </View>
      <Text
        style={pdfStyles.footer}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
      />
      <Text
        style={pdfStyles.pageNumber}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
      />
    </Page>

    {/* Executive Letter Page */}
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.watermark}>CONFIDENTIAL</Text>

      {/* Brand Header */}
      <View style={pdfStyles.brandHeader}>
        <View style={pdfStyles.logoPlaceholder}>
          <Text style={pdfStyles.logoText}>NP</Text>
        </View>
        <View>
          <Text style={pdfStyles.brandTitle}>NORTHPATH STRATEGIC REALIGNMENT</Text>
          <Text style={pdfStyles.brandSubtitle}>Custom Organizational Efficiency Report</Text>
        </View>
      </View>

      {/* Executive Letter Section Header */}
      <View style={pdfStyles.sectionHeader}>
        <Text style={pdfStyles.sectionHeaderText}>Executive Letter / Carta Ejecutiva</Text>
      </View>

      <View style={pdfStyles.executiveLetterContainer}>
        <Text style={pdfStyles.executiveLetterGreeting}>Dear Institutional Leader,</Text>
        <Text style={pdfStyles.executiveLetterText}>
          Congratulations on completing the organizational realignment assessment. This report provides key insights
          into potential efficiencies, cost-saving opportunities, and strategic improvements across your institution. We
          encourage you to review the recommendations with your leadership team and contact us for personalized support.
        </Text>
        <Text style={pdfStyles.executiveLetterSpanishText}>
          <Text style={pdfStyles.executiveLetterBoldSpan}>Estimado líder institucional,{"\n"}</Text>
          Gracias por completar la evaluación de realineación organizativa. Este informe proporciona información clave
          sobre eficiencias potenciales, oportunidades de ahorro de costos y mejoras estratégicas en su institución.
          Le animamos a revisar las recomendaciones con su equipo de liderazgo y contactarnos para obtener soporte personalizado.
        </Text>
      </View>

      <Text
        style={pdfStyles.footer}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages} | Contact: hello@northpathstrategies.org`}
      />
      <Text
        style={pdfStyles.pageNumber}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
      />
    </Page>

    {/* Summary and Chart Page */}
    <Page size="A4" style={pdfStyles.page}>
      {/* Report Summary Section Header */}
      <View style={pdfStyles.sectionHeader}>
        <Text style={pdfStyles.sectionHeaderText}>Report Summary</Text>
      </View>

      <Text style={pdfStyles.summaryTitle}>NorthPath Strategic Realignment Report</Text>
      <Text style={pdfStyles.summaryLine}>Institution: {orgName}</Text>
      <Text style={pdfStyles.summaryLine}>Redundancy Index: {redundancy}%</Text>
      <Text style={pdfStyles.summaryLine}>AI Readiness Index: {aiReadiness}%</Text>
      <Text style={pdfStyles.summaryLine}>Estimated Savings: ${savings.toLocaleString()}</Text>

      {/* Summary Chart Section Header */}
      <View style={[pdfStyles.sectionHeader, { backgroundColor: "#FFF7E5" }]}>
        <Text style={[pdfStyles.sectionHeaderText, { color: "#92400E" }]}>Summary Chart</Text>
      </View>

      <View>
        <Text style={pdfStyles.line}>Redundancy Index</Text>
        <View style={pdfStyles.chartBarContainer}>
          <View style={{ width: (redundancy || 0) * 2, height: 10, backgroundColor: "#EF4444", borderRadius: 2 }} />
          <Text style={pdfStyles.chartBarLabel}>{redundancy}%</Text>
        </View>

        <Text style={[pdfStyles.line, { marginTop: 10 }]}>AI Readiness Index</Text>
        <View style={pdfStyles.chartBarContainer}>
          <View style={{ width: (aiReadiness || 0) * 2, height: 10, backgroundColor: "#3B82F6", borderRadius: 2 }} />
          <Text style={pdfStyles.chartBarLabel}>{aiReadiness}%</Text>
        </View>

        <Text style={[pdfStyles.line, { marginTop: 10 }]}>Estimated Savings</Text>
        <View style={pdfStyles.chartBarContainer}>
          <View
            style={{
              width: Math.min((savings || 0) / 2000, 100),
              height: 10,
              backgroundColor: "#FACC15",
              borderRadius: 2,
            }}
          />
          <Text style={pdfStyles.chartBarLabel}>${savings.toLocaleString()}</Text>
        </View>
      </View>

      {/* Strategic Recommendations Section */}
      <View style={[pdfStyles.sectionHeader, { backgroundColor: "#E1FCEF" }]}>
        <Text style={[pdfStyles.sectionHeaderText, { color: "#065F46" }]}>Strategic Recommendations</Text>
      </View>

      <View>
        {redundancy > 70 && (
          <Text style={pdfStyles.line}>
            Consider reducing overlapping roles and consolidating administrative functions to address high redundancy.
          </Text>
        )}
        {aiReadiness < 50 && (
          <Text style={pdfStyles.line}>
            Explore opportunities to integrate AI tools into advising, helpdesk, and data processing systems to improve readiness.
          </Text>
        )}
        {savings > 200000 && (
          <Text style={pdfStyles.line}>
            Potential savings exceed $200K. Prioritize implementation of shared services or automation pilots.
          </Text>
        )}
      </View>

      <Text
        style={pdfStyles.footer}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages} | Contact: hello@northpathstrategies.org`}
      />
      <Text
        style={pdfStyles.pageNumber}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
      />
    </Page>

    {/* Appendix Page */}
    <Page size="A4" style={pdfStyles.page}>
      {/* Appendix Section Header */}
      <View style={pdfStyles.appendixContainer}>
        <Text style={pdfStyles.appendixTitle}>Appendix: Role Inventory / Apéndice: Inventario de Roles</Text>
      </View>

      {roles.map((role, idx) => (
        <Text key={role.id} style={pdfStyles.appendixLine}>
          {idx + 1}. {role.name} — {role.tag || "Uncategorized"}
        </Text>
      ))}

      <Text
        style={pdfStyles.footer}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages} | Contact: hello@northpathstrategies.org`}
      />
      <Text
        style={pdfStyles.pageNumber}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
      />
    </Page>
  </Document>
);

export default function ResultsPage() {

  const { data: session } = useSession();
  const surveyData = loadSurveyData();
  const roles = loadRoleData();

  const filteredRef = useRef<HTMLDivElement>(null);
  const [sortedRoles, setSortedRoles] = useState(roles);
  const [redundancy, setRedundancy] = useState<number | null>(null);
  const [aiReadiness, setAiReadiness] = useState<number | null>(null);
  const [savings, setSavings] = useState<number | null>(null);

  useEffect(() => {
    const sorted = [...roles].sort((a, b) => a.name.localeCompare(b.name));
    setSortedRoles(sorted);
  }, [roles]);

  useEffect(() => {
    const answers = roles.map((r) => ({
      id: r.id,
      value: r.tag === "redundant" ? 2 : r.tag === "open" ? 4 : 3,
    }));
    const budget = Number((surveyData as any)?.budget || 1000000);

    setRedundancy(computeRedundancy(answers));
    setAiReadiness(computeAiReadiness(answers));
    setSavings(estimateSavings(answers, budget));
  }, [roles, surveyData]);

  const handleSave = async () => {
    if (!session?.user?.email || !surveyData) {
      alert("Login and survey data are required to save.");
      return;
    }

    const { error } = await supabase.from("realignments").insert([
      {
        user_email: session.user.email,
        name: surveyData.name,
        org_type: surveyData.orgType,
        roles,
      },
    ]);

    if (error) {
      alert("Save failed.");
    } else {
      // Generate PDF blob and upload to Supabase Storage
      const doc = (
        <ReportPDF
          redundancy={redundancy || 0}
          aiReadiness={aiReadiness || 0}
          savings={savings || 0}
          orgName={surveyData.name}
          roles={roles}
        />
      );

      const blob = await pdf(doc).toBlob();

      const upload = await supabase.storage
        .from("realignments_reports")
        .upload(`${session.user.email}/${surveyData.name}-report.pdf`, blob, {
          contentType: "application/pdf",
          upsert: true,
        });

      if (upload.error) {
        console.error("Upload error:", upload.error);
        alert("Report save failed.");
      } else {
        alert("PDF saved to Supabase!");
      }
      // Step one of email automation using Resend: send report link via /api/send-report
      if (!upload.error) {
        const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/realignments_reports/${session.user.email}/${surveyData.name}-report.pdf`;

        await fetch("/api/send-report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: session.user.email,
            subject: "Your NorthPath Strategic Report",
            link: fileUrl,
            orgName: surveyData.name,
          }),
        });
      }
    }
  };

  return (
    <main className="px-4 py-6 sm:px-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Organizational Structure</h1>
      <p className="text-sm text-gray-500 mb-4">
        {surveyData?.name} — {surveyData?.orgType}
      </p>

      {session?.user && (
        <button
          className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save to My Workspaces
        </button>
      )}

      {redundancy !== null && aiReadiness !== null && savings !== null && (
        <>
          <SummaryCard redundancy={redundancy} aiReadiness={aiReadiness} savings={savings} />

          <PDFDownloadLink
            document={
              <ReportPDF
                redundancy={redundancy}
                aiReadiness={aiReadiness}
                savings={savings}
                orgName={surveyData?.name || "Unnamed Institution"}
                roles={roles}
              />
            }
            fileName="northpath_report.pdf"
            className="btn-primary mt-4 inline-block"
          >
            {({ loading }) => (loading ? "Preparing PDF..." : "Download PDF Report")}
          </PDFDownloadLink>
        </>
      )}

      <PriorityMatrix />

      <div ref={filteredRef}>
        <RoleList roles={sortedRoles} />
      </div>
    </main>
  );
}