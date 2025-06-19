import Input from "@/components/ui/input";
import { RealignmentFormData } from "@/lib/types";

interface Props {
  data: RealignmentFormData;
  onChange: (field: keyof RealignmentFormData, value: string) => void;
}

export default function Step1({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Organisation name</label>
        <Input
          value={data.orgName}
          onChange={(e) => onChange("orgName", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Unit name</label>
        <Input
          value={data.unitName}
          onChange={(e) => onChange("unitName", e.target.value)}
        />
      </div>
    </div>
  );
}