import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { config } from "dotenv";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

config();

export default defineConfig({
  plugins: [
    devtools(),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      router: {
        quoteStyle: "double",
        semicolons: true,
      },
    }),
    viteReact({
      // https://react.dev/learn/react-compiler
      babel: {
        plugins: [
          [
            "babel-plugin-react-compiler",
            {
              target: "19",
            },
          ],
        ],
      },
    }),
    tailwindcss(),
  ],
});
