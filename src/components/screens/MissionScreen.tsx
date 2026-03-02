import { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import MissionButton from "@/components/MissionButton";
import { MissionData } from "@/pages/Index";
import { toast } from "sonner";

interface MissionScreenProps {
  data: MissionData;
  onEdit: () => void;
  onChange: (partial: Partial<MissionData>) => void;
}

const MissionScreen = ({ data, onEdit, onChange }: MissionScreenProps) => {
  const valuesText = data.values.join(", ").replace(/, ([^,]*)$/, ", and $1") || "my values";

  const [statement, setStatement] = useState(
    `I choose to live with ${valuesText.toLowerCase()},\nand to be someone who ${data.beingSomeoneWho.toLowerCase()},\nso my life can feel more ${data.lifeFeelMore.toLowerCase()}.`
  );

  const handleSave = () => {
    toast.success("Your mission statement has been saved.", {
      style: {
        background: "hsl(155, 13%, 28%)",
        color: "hsl(36, 16%, 87%)",
        border: "1px solid hsl(160, 10%, 35%)",
      },
    });
  };

  return (
    <ScreenWrapper screenKey="mission">
      <div className="flex-1 space-y-8">
        <h1 className="text-[22px] font-heading text-foreground">
          Your Personal Mission
        </h1>

        <textarea
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          className="w-full bg-card text-foreground text-[16px] font-body rounded-2xl border border-border px-5 py-5 min-h-[140px] resize-none placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 leading-[1.7]"
        />

        <div className="space-y-4 text-[15px] font-body text-muted-foreground leading-[1.65] text-justified">
          <p>This is not a rule.<br />It is a reminder.</p>
          <p>You can return to it whenever you need direction.</p>
        </div>
      </div>

      <div className="pt-8 pb-4 space-y-3">
        <MissionButton onClick={handleSave}>Save</MissionButton>
        <MissionButton variant="outline" onClick={onEdit}>
          Edit
        </MissionButton>
      </div>
    </ScreenWrapper>
  );
};

export default MissionScreen;
