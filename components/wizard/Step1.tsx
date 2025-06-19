import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { RealignmentFormData } from "@/lib/types";

interface Props {
  data: RealignmentFormData;
  /** field = key being updated, value = new string */
  onChange: (field: keyof RealignmentFormData, value: string) => void;
}

export default function Step1({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="orgName">Organization name</Label>
        <Input
          id="orgName"
          value={data.orgName}
          onChange={(e) => onChange("orgName", e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="unitName">Unit name</Label>
        <Input
          id="unitName"
          value={data.unitName}
          onChange={(e) => onChange("unitName", e.target.value)}
        />
      </div>
    </div>
  );
}