#!/usr/bin/env node
// CLI: Generate a static site from a config file
// Usage: node generate.js --config template/examples/clawdbob.json --output dist/
//        node generate.js --config my-agent.json --output ./out/ --base-css css/style.css

const fs = require('fs');
const path = require('path');
const { generate } = require('./template/generator.js');

function main() {
    const args = parseArgs(process.argv.slice(2));

    if (args.help) {
        console.log(`
Agent Website Generator

Usage:
  node generate.js --config <config.json> --output <dir/>
  node generate.js --config <config.json> --output <dir/> --base-css <path/to/style.css>

Options:
  --config, -c    Path to site config JSON file (required)
  --output, -o    Output directory (required)
  --base-css      Path to base CSS file (default: css/style.css from project root)
  --copy-assets   Copy images/ and other static assets to output (default: true)
  --help, -h      Show this help message

Examples:
  # Generate ClawdBob's site
  node generate.js -c template/examples/clawdbob.json -o dist/

  # Generate with custom base CSS
  node generate.js -c my-agent.json -o out/ --base-css path/to/custom.css
`);
        process.exit(0);
    }

    if (!args.config) {
        console.error('Error: --config is required. Use --help for usage.');
        process.exit(1);
    }

    if (!args.output) {
        console.error('Error: --output is required. Use --help for usage.');
        process.exit(1);
    }

    // Read config
    const configPath = path.resolve(args.config);
    let config;
    try {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
        console.error(`Error reading config: ${e.message}`);
        process.exit(1);
    }

    console.log(`Generating site for: ${config.agent?.name || 'Agent'}`);
    console.log(`  Blocks: ${(config.blocks || []).join(', ')}`);
    console.log(`  Languages: ${(config.i18n?.languages || ['en']).join(', ')}`);

    // Generate
    const options = {};
    if (args['base-css']) {
        options.baseCssPath = path.resolve(args['base-css']);
    }

    const files = generate(config, options);

    // Write output
    const outputDir = path.resolve(args.output);
    for (const [filePath, content] of Object.entries(files)) {
        const fullPath = path.join(outputDir, filePath);
        fs.mkdirSync(path.dirname(fullPath), { recursive: true });
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`  ✓ ${filePath}`);
    }

    // Copy static assets if needed
    if (args['copy-assets'] !== 'false') {
        const assetsDir = path.join(path.dirname(configPath), '..', '..');
        const imagesSrc = config.assetsPath
            ? path.resolve(path.dirname(configPath), config.assetsPath)
            : path.join(__dirname, 'images');

        if (fs.existsSync(imagesSrc)) {
            const imagesDest = path.join(outputDir, 'images');
            copyDirSync(imagesSrc, imagesDest);
            console.log(`  ✓ images/ (copied)`);
        }

        // Copy tunnel-url.json if it exists (for status endpoint)
        const tunnelSrc = path.join(__dirname, 'tunnel-url.json');
        if (fs.existsSync(tunnelSrc)) {
            fs.copyFileSync(tunnelSrc, path.join(outputDir, 'tunnel-url.json'));
            console.log(`  ✓ tunnel-url.json (copied)`);
        }
    }

    console.log(`\nDone! Open ${path.join(args.output, 'index.html')} to preview.`);
}

function copyDirSync(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDirSync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function parseArgs(argv) {
    const args = {};
    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === '--help' || arg === '-h') {
            args.help = true;
        } else if (arg === '--config' || arg === '-c') {
            args.config = argv[++i];
        } else if (arg === '--output' || arg === '-o') {
            args.output = argv[++i];
        } else if (arg === '--base-css') {
            args['base-css'] = argv[++i];
        } else if (arg === '--copy-assets') {
            args['copy-assets'] = argv[++i];
        }
    }
    return args;
}

main();
