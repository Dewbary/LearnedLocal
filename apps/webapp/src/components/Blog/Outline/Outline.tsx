/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as React from "react";
import type { SanityBlock } from "sanity-codegen";
import cx from "classnames";

type Props = {
  headings: SanityBlock[];
};

const Outline = ({ headings }: Props) => {
  return (
    <ol>
      {headings.map((heading) => {
        if (
          !heading ||
          "_key" in heading === false ||
          "children" in heading === false
        )
          return null;
        return (
          <li
            key={heading._key}
            className={cx({
              "ml-0": heading.style === "h1",
              "ml-8": heading.style === "h2",
              "ml-12": heading.style === "h3",
            })}
          >
            <a href={`#${heading._key}`}>{heading.children?.[0]?.text ?? ""}</a>
          </li>
        );
      })}
      -----------------------
    </ol>
  );
};

export default Outline;
