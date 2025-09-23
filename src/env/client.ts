import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

console.log(import.meta.env.VITE_BASE_URL);

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_BASE_URL: z.url(),
  },
  runtimeEnv: import.meta.env,
});
