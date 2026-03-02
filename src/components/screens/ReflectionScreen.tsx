import ScreenWrapper from "@/components/ScreenWrapper";
import MissionButton from "@/components/MissionButton";
import ReflectionInput from "@/components/ReflectionInput";
import { MissionData } from "@/pages/Index";

interface ReflectionScreenProps {
  data: MissionData;
  onChange: (partial: Partial<MissionData>) => void;
  onNext: () => void;
}

const ReflectionScreen = ({ data, onChange, onNext }: ReflectionScreenProps) => {
  const canProceed = data.beingSomeoneWho.trim() && data.lifeFeelMore.trim();

  return (
    <ScreenWrapper screenKey="reflection">
      <div className="flex-1 space-y-8">
        <h1 className="text-[22px] font-heading text-foreground">
          Complete the sentence
        </h1>

        <ReflectionInput
          label="Even on hard days, I want to be someone who ________."
          placeholder="e.g. listens with patience"
          value={data.beingSomeoneWho}
          onChange={(e) => onChange({ beingSomeoneWho: e.target.value })}
        />

        <ReflectionInput
          label="Right now, I want my life to feel more ________."
          placeholder="e.g. peaceful and connected"
          value={data.lifeFeelMore}
          onChange={(e) => onChange({ lifeFeelMore: e.target.value })}
        />
      </div>

      <div className="pt-8 pb-4">
        <MissionButton onClick={onNext} disabled={!canProceed}>
          Create My Statement
        </MissionButton>
      </div>
    </ScreenWrapper>
  );
};

export default ReflectionScreen;
