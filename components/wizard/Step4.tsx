import { RealignmentFormData } from "@/lib/types";

interface Props {
  data: RealignmentFormData;
}

export default function Step4({ data }: Props) {
  return (
    <pre className="rounded bg-muted p-4 text-sm">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}