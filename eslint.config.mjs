import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // Module-boundary enforcement: a module's api/domain/data layers are
    // private implementation detail. Cross-module code (and app/) may only
    // import a module's public index.ts, or its ui/hooks subpaths. Code
    // *inside* a module reaches its own api/domain/data via relative
    // imports, so this pattern never fires for legitimate intra-module use.
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/modules/*/api",
                "@/modules/*/api/*",
                "@/modules/*/domain",
                "@/modules/*/domain/*",
                "@/modules/*/data",
                "@/modules/*/data/*",
              ],
              message:
                "Deep imports into a module's internals are forbidden. Import only the module's public surface (@/modules/<name>) or its ui/hooks subpaths.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
