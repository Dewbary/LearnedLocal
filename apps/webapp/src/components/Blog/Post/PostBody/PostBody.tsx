import { PortableText } from "@portabletext/react";

import { BlockContent } from "~/components/types";
import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: BlockContent | undefined;
};

export default function PostBody({ content }: Props) {
  return (
    <div className={`mx-auto max-w-2xl ${markdownStyles.markdown ?? ""}`}>
      {content && <PortableText value={content} />}
    </div>
  );
}
