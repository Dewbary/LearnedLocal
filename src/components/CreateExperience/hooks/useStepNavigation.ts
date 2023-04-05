import { useState } from "react";
import { TabInfo } from "../types";
import { useRouter } from "next/router";

export const useStepNavigation = (tabs: TabInfo[], initialStep: number = 0) => {
  const [step, setStep] = useState(initialStep);
  const router = useRouter();

  const next = () => {
    if (step < tabs.length - 1) {
      setStep(step + 1);
      router.push(tabs[step + 1]?.url ?? "", undefined, { shallow: true });
    }
  };

  const back = () => {
    if (step > 0) {
      setStep(step - 1);
      router.push(tabs[step - 1]?.url ?? "", undefined, { shallow: true });
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < tabs.length) {
      setStep(step);
      router.push(tabs[step]?.url ?? "", undefined, { shallow: true });
    }
  };

  const activeTab = tabs[step];

  return { step, next, back, goToStep, activeTab };
};
