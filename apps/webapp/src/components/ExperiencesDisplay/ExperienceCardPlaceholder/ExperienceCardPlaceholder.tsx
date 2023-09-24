import * as React from "react";
import ContentLoader from "react-content-loader";

const ExperienceCardPlaceholder = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="card-component my-8 flex justify-center">
      <ContentLoader
        speed={2}
        width={288}
        height={384}
        viewBox="0 0 288 384"
        backgroundColor="#f0f0f0"
        foregroundColor="#dedede"
      >
        <rect x="8" y="319" rx="3" ry="3" width="141" height="10" />
        <rect x="8" y="340" rx="3" ry="3" width="83" height="10" />
        <circle cx="244" cy="346" r="32" />
        <rect x="4" y="3" rx="13" ry="13" width="279" height="291" />
        <rect x="7" y="363" rx="3" ry="3" width="141" height="10" />
      </ContentLoader>
    </div>
  );
};

export default ExperienceCardPlaceholder;
