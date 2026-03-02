import { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import MissionButton from "@/components/MissionButton";
import ValueChip from "@/components/ValueChip";

const VALUES = [
  "Kindness",
  "Peace",
  "Connection",
  "Honesty",
  "Patience",
  "Courage",
  "Self-compassion",
  "Gratitude",
  "Creativity",
  "Growth",
  "Rest",
  "Love",
  "Simplicity",
  "Freedom",
  "Purpose",
  "Joy",
];

interface ValuesScreenProps {
  selected: string[];
  onSelect: (values: string[]) => void;
  onNext: () => void;
}

const ValuesScreen = ({ selected, onSelect, onNext }: ValuesScreenProps) => {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onSelect(selected.filter((v) => v !== value));
    } else if (selected.length < 3) {
      onSelect([...selected, value]);
    }
  };

  return (
    <ScreenWrapper screenKey="values">
      <div className="flex-1 space-y-6">
        <h1 className="text-[22px] font-heading text-foreground">
          What feels important right now?
        </h1>

        <p className="text-[15px] font-body text-muted-foreground leading-[1.65] text-justified">
          Choose 1–3 values that feel grounding.
        </p>

        <div className="flex flex-wrap gap-3">
          {VALUES.map((v) => (
            <ValueChip
              key={v}
              label={v}
              selected={selected.includes(v)}
              onToggle={() => toggle(v)}
            />
          ))}
        </div>
      </div>

      <div className="pt-8 pb-4">
        <MissionButton onClick={onNext} disabled={selected.length === 0}>
          Next
        </MissionButton>
      </div>
    </ScreenWrapper>
  );
};

export default ValuesScreen;
