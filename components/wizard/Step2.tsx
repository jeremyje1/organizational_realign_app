import Input from "@/components/ui/input";
import { RealignmentFormData } from "@/lib/types";

interface Props {
  data: RealignmentFormData;
  onChange: (field: keyof RealignmentFormData, value: string) => void;
}

export default function Step2({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium mb-1">Scenario</label>
      <Input
        value={data.scenario}
        onChange={(e) => onChange("scenario", e.target.value)}
      />
    </div>
  );
}