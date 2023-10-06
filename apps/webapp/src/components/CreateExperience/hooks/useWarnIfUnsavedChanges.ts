import { useRouter } from "next/router";
import { useEffect } from "react";

const useWarnIfUnsavedChanges = (
  dirty = true,
  slug: string,
  warningText = "You have unsaved changes – are you sure you wish to leave this page?"
) => {
  const router = useRouter();

  useEffect(() => {
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!dirty) return;
      e.preventDefault();
      return (e.returnValue = warningText);
    };

    const handleBrowseAway = (url: string) => {
      if (!dirty) return;
      if (url.includes(`/experience/create/${slug}`)) return;
      if (window?.confirm(warningText)) return;
      router.events.emit("routeChangeError", "your error message", "your-url", {
        shallow: false,
      });
    };

    window.addEventListener("beforeunload", handleWindowClose);

    router.events.on("routeChangeStart", handleBrowseAway);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      router.events.off("routeChangeStart", handleBrowseAway);
    };
  }, [dirty]);
};

export default useWarnIfUnsavedChanges;
