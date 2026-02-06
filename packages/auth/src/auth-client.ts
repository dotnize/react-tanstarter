import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: process.env.VITE_BASE_URL,
});

export default authClient;
