import { NextResponse } from "next/server";
// import Step1 from "@/components/wizard/Step1";
// import Step2 from "@/components/wizard/Step2";
// import Step3 from "@/components/wizard/Step3";
// import Step4 from "@/components/wizard/Step4";
import { Button } from "@/components/ui/button";

export async function GET() {
  return NextResponse.json({ status: "ok" });
}