# rpmix (Repository Mixer)

A lightweight CLI tool that bundles relevant parts of your codebase based on directory analysis and import tracking, designed for sending to LLMs with limited context windows.

## Problem

LLMs have context window limitations (even 200K or 1M tokens aren't always enough), making it difficult to analyze large codebases. You often don't need the entire codebase - just the relevant parts for your task.

## Solution

`rpmix` analyzes your codebase starting from specified directories, follows all imports recursively, and creates a single bundle with just the relevant code.

## Features

- 📁 Directory-based code analysis
- 🔍 Recursively analyzes imports in JavaScript/TypeScript files
- 📦 Bundles only the code that's actually used
- ⚙️ Configurable via command line or config file
- 🔄 Handles relative imports with full path resolution
- 🔧 Customizable inclusion and exclusion patterns
- 📝 Creates a single, organized file for sending to LLMs

## Installation

```bash
npm install -g .
```

Or use directly with npx:

```bash
npx rpmix [options] [directories...]
```

## Usage

Basic usage:

```bash
rpmix server/actions
```

This will:

1. Recursively scan all JavaScript/TypeScript files in the `server/actions` directory
2. Find all imports in those files
3. Follow those imports recursively across your codebase
4. Bundle everything into `repomix-bundle.js`

With multiple directories:

```bash
rpmix server/actions apps/utils
```

With options:

```bash
rpmix server/actions --output=my-bundle.js --include=ai_instructions.md --exclude=node_modules/** --depth=3 --verbose
```

## Configuration

You can create a `repomix.config.js` file in your project root:

```javascript
module.exports = {
  // Directories or files that will always be included in the bundle
  // For directories, all files will be included recursively
  alwaysInclude: ["ai_instructions.md", "config", "types"],

  // Files or patterns to exclude from the bundle
  ignore: ["node_modules/**", "tests/**"],

  // Output file name
  outputFile: "repomix-bundle.js",

  // Maximum depth of import resolution
  maxDepth: 5,

  // Whether to output verbose logs
  verbose: false,
};
```

## Command Line Options

| Option                    | Description                                                 |
| ------------------------- | ----------------------------------------------------------- |
| `-o, --output <file>`     | Output file name (default: `repomix-bundle.js`)             |
| `-i, --include <dirs...>` | Directories or patterns to always include (comma-separated) |
| `-x, --exclude <dirs...>` | Directories or patterns to exclude (comma-separated)        |
| `-d, --depth <number>`    | Maximum import depth to follow                              |
| `-v, --verbose`           | Verbose output                                              |

## Example

If you have a directory structure like:

```
server/
  ├── actions/
  │   └── users.ts (imports utils and queries)
apps/
  ├── utils/
  │   └── users.ts
  └── db/
      └── queries/
          └── users.ts
```

Running:

```bash
rpmix server/actions
```

Will analyze all files in `server/actions`, follow their imports to `apps/utils/users.ts` and `apps/db/queries/users.ts`, and bundle all of them together (up to the configured depth).

## License

MIT
