/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { PortableText } from "@portabletext/react";

import markdownStyles from "./markdown-styles.module.css";
import type { BlockContent } from "~/components/types";
import type { SanityBlock } from "sanity-codegen";
import Outline from "../../Outline";

type Props = {
  headings: SanityBlock[];
  content: BlockContent | undefined;
};

const components = {
  block: {
    h1: (props: any) => {
      const { node, children } = props;
      console.log(node.children);
      return <h1 id={`${node._key}`}>{children}</h1>;
    },
    h2: (props: any) => {
      const { node, children } = props;
      return <h2 id={`${node._key}`}>{children}</h2>;
    },
    h3: (props: any) => {
      const { node, children } = props;
      return <h3 id={`${node._key}`}>{children}</h3>;
    },
  },
};

export default function PostBody({ headings, content }: Props) {
  if (!content) return null;

  return (
    <div className={`mx-auto max-w-2xl ${markdownStyles.markdown ?? ""}`}>
      <Outline headings={headings} />
      <PortableText value={content} components={components} />
    </div>
  );
}
