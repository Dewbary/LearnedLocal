import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "@learnedlocal/config/env.mjs";
import { appRouter, createTRPCContext } from "@learnedlocal/api";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    process.env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});
