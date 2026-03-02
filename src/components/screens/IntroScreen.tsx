import ScreenWrapper from "@/components/ScreenWrapper";
import MissionButton from "@/components/MissionButton";

interface IntroScreenProps {
  onNext: () => void;
}

const IntroScreen = ({ onNext }: IntroScreenProps) => {
  return (
    <ScreenWrapper screenKey="intro">
      <div className="flex-1 flex flex-col justify-center space-y-8">
        <h1 className="text-[22px] font-heading text-foreground">
          A Moment to Reconnect
        </h1>

        <div className="space-y-5 text-[15px] font-body text-muted-foreground leading-[1.65] text-justified">
          <p>
            When you're feeling depressed, anxious, or overwhelmed, it's easy to
            lose sight of what truly matters to you.
          </p>
          <p>
            A personal mission statement is not about pressure or productivity.
            It is a gentle reminder of your values — the kind of person you want
            to be, even during difficult seasons.
          </p>
          <p className="text-foreground/80 italic">Take one slow breath.</p>
          <p>There are no right or wrong answers here.</p>
        </div>
      </div>

      <div className="pt-8 pb-4">
        <MissionButton onClick={onNext}>Begin</MissionButton>
      </div>
    </ScreenWrapper>
  );
};

export default IntroScreen;
