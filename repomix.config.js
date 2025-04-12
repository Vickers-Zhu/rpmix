module.exports = {
  // Directories or files that will always be included in the bundle, regardless of import analysis
  // For directories, all JS/TS/MD/JSON files will be included recursively
  alwaysInclude: ["ai_instructions.md", "config", "types"],

  // Files or patterns to exclude from the bundle
  ignore: ["node_modules/**", "tests/**", "**/*.test.ts", "**/*.spec.ts"],

  // Output file name
  outputFile: "repomix-bundle.txt",

  // Maximum depth of import resolution (prevents infinite loops and makes bundles manageable)
  maxDepth: 5,

  // Whether to output verbose logs
  verbose: false,
};
