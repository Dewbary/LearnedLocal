import type { GetServerSidePropsContext } from "next";

export default function Robots() {
  return null;
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader("Content-Type", "text/plain");
  context.res.write(`User-agent: *
Allow: /

Sitemap: https://learnedlocal.app/sitemap.txt
Sitemap: https://www.learnedlocal.app/sitemap.txt`);
  context.res.end();

  return {
    props: {},
  };
}
