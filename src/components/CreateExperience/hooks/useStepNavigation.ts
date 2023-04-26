import { useState } from "react";
import { TabInfo } from "../types";
import { useRouter } from "next/router";

export const useStepNavigation = (tabs: TabInfo[], initialStep = 0) => {
  const [step, setStep] = useState(initialStep);
  const router = useRouter();

  const next = async () => {
    if (step < tabs.length - 1) {
      setStep(step + 1);
      await router.push(tabs[step + 1]?.url ?? "", undefined, { shallow: true });
    }
  };

  const back = async () => {
    if (step > 0) {
      setStep(step - 1);
      await router.push(tabs[step - 1]?.url ?? "", undefined, { shallow: true });
    }
  };

  const goToStep = async (step: number) => {
    if (step >= 0 && step < tabs.length) {
      setStep(step);
      await router.push(tabs[step]?.url ?? "", undefined, { shallow: true });
    }
  };

  const activeTab = tabs[step];

  return { step, next, back, goToStep, activeTab };
};
