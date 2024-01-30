// useNavigation.tsx
import { useRouter } from "next/router";
import { useState } from "react";
import type { FormPage } from "~/components/types";

export function useNavigation(
  tabs: FormPage[],
  slug: string,
  initialStep = 0,
  experienceId: string
) {
  const router = useRouter();
  const [step, setStep] = useState(initialStep);

  const next = async () => {
    if (step < tabs.length - 1) {
      setStep(step + 1);
      await router.push(
        `/experience/create/${slug}/${tabs[step + 1]?.url ?? ""}`,
        undefined,
        { shallow: true }
      );
    }
  };

  const back = async () => {
    if (step > 0) {
      setStep(step - 1);
      await router.push(
        `/experience/create/${slug}/${tabs[step - 1]?.url ?? ""}`,
        undefined,
        { shallow: true }
      );
    }
  };

  const goToStep = async (step: number) => {
    if (step >= 0 && step < tabs.length) {
      setStep(step);
      await router.push(
        {
          pathname: tabs[step]?.url ?? "",
          query: { experienceId: experienceId },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  const activeTab = tabs[step];

  return {
    next,
    back,
    goToStep,
    activeTab,
    step,
  };
}
