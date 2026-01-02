const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Parse command line arguments
const args = process.argv.slice(2);
let inputMarkdown = 'Thần Quốc Chi Thượng.md';
let templateFile = null;
let outputFile = null;

// Simple argument parser
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--input' || args[i] === '-i') {
    inputMarkdown = args[i + 1];
    i++;
  } else if (args[i] === '--template' || args[i] === '-t') {
    templateFile = args[i + 1];
    i++;
  } else if (args[i] === '--output' || args[i] === '-o') {
    outputFile = args[i + 1];
    i++;
  } else if (args[i] === '--help' || args[i] === '-h') {
    console.log(`
Usage: node convert-md-to-html.js [options]

Options:
  -i, --input <file>      Input markdown file (default: "Thần Quốc Chi Thượng.md")
  -t, --template <file>   Template HTML file (default: "template-post.html")
  -o, --output <file>     Output HTML file (default: auto-generated from input name)
  -h, --help              Show this help message

Examples:
  node convert-md-to-html.js
  node convert-md-to-html.js -i myfile.md -o output.html
  node convert-md-to-html.js --input article.md --template template.html
    `);
    process.exit(0);
  }
}

// Build file paths
const markdownPath = path.join(__dirname, 'Raw', inputMarkdown);

// Use template-post.html if no template specified
if (!templateFile) {
  templateFile = 'template-post.html';
}
const templatePath = templateFile.includes('/')
  ? path.resolve(templateFile)
  : path.join(__dirname, templateFile);

// Generate output filename if not specified
if (!outputFile) {
  const baseName = path.basename(inputMarkdown, '.md');
  outputFile = `${baseName}-new.html`;
}
const outputPath = path.join(__dirname, 'Raw', outputFile);

// Check if files exist
try {
  if (!fs.existsSync(markdownPath)) {
    console.error(`Error: Markdown file not found: ${markdownPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(templatePath)) {
    console.error(`Error: Template file not found: ${templatePath}`);
    process.exit(1);
  }
} catch (err) {
  console.error('Error checking files:', err.message);
  process.exit(1);
}

// Read the markdown file
const markdown = fs.readFileSync(markdownPath, 'utf8');

// Read the template HTML
const template = fs.readFileSync(templatePath, 'utf8');

// Custom renderer using marked v12+ API
const renderer = {
  // Headings
  heading({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const classMap = {
      1: 'article__title',
      2: 'article__heading--level2',
      3: 'article__heading--level3',
      4: 'article__heading--level4',
      5: 'article__heading--level4',
      6: 'article__heading--level4'
    };
    const className = classMap[depth] || 'article__heading--level4';
    return `<h${depth} class="${className}">${text}</h${depth}>\n`;
  },

  // Paragraphs
  paragraph({ tokens }) {
    const text = this.parser.parseInline(tokens);
    return `<p class="article__paragraph">${text}</p>\n`;
  },

  // Blockquotes - Fixed bug
  blockquote({ tokens }) {
    const body = this.parser.parse(tokens);
    return `<blockquote class="article__quote">\n${body}</blockquote>\n`;
  },

  // Lists
  list({ ordered, items }) {
    const listClass = ordered ? 'article__list article__list--ordered' : 'article__list article__list--unordered';
    const tag = ordered ? 'ol' : 'ul';
    const body = items.map(item => this.listitem(item)).join('');
    return `<${tag} class="${listClass}">\n${body}</${tag}>\n`;
  },

  listitem({ tokens }) {
    const text = this.parser.parse(tokens);
    return `<li class="article__list-item">${text}</li>\n`;
  },

  // Tables
  table({ header, rows }) {
    const headerRow = this.tablerow({ text: header.map(cell => this.tablecell({ ...cell, flags: { header: true } })).join('') });
    const bodyRows = rows.map(row => 
      this.tablerow({ text: row.map(cell => this.tablecell({ ...cell, flags: { header: false } })).join('') })
    ).join('');
    
    return `<div class="article__table-wrapper">
<table class="article__table">
<thead>
${headerRow}</thead>
<tbody>
${bodyRows}</tbody>
</table>
</div>\n`;
  },

  tablerow({ text }) {
    return `<tr>\n${text}</tr>\n`;
  },

  tablecell({ tokens, flags }) {
    const content = this.parser.parseInline(tokens);
    const tag = flags.header ? 'th' : 'td';
    return `<${tag}>${content}</${tag}>\n`;
  },

  // Code (inline)
  codespan({ text }) {
    return `<code>${text}</code>`;
  },

  // Code block
  code({ text, lang }) {
    const language = lang || '';
    return `<pre><code class="language-${language}">${text}</code></pre>\n`;
  },

  // Links
  link({ href, title, tokens }) {
    const text = this.parser.parseInline(tokens);
    const titleAttr = title ? ` title="${title}"` : '';
    return `<a href="${href}"${titleAttr}>${text}</a>`;
  },

  // Images - Will be post-processed to group consecutive images
  image({ href, title, text }) {
    const CDN_BASE = 'https://cdn.jsdelivr.net/gh/danhsakai/vidian@main/Cover/';
    
    // Extract filename from href (handle various formats)
    let imageSrc = href;
    if (!href.startsWith('http')) {
      // If it's just a filename, prepend CDN base
      imageSrc = CDN_BASE + href;
    }
    
    const alt = text || '';
    const titleAttr = title ? ` title="${title}"` : '';
    
    // Return figure - will be grouped by post-processor
    return `<figure class="article__image">
<img src="${imageSrc}" alt="${alt}"${titleAttr} />
</figure>
`;
  },

  // Strong
  strong({ tokens }) {
    const text = this.parser.parseInline(tokens);
    return `<strong>${text}</strong>`;
  },

  // Emphasis
  em({ tokens }) {
    const text = this.parser.parseInline(tokens);
    return `<em>${text}</em>`;
  }
};

// Configure marked with custom renderer
marked.use({ renderer });

// Function to expand image patterns like ![Alt](TrieuTuongNhi-{0-5}.webp)
function expandImagePatterns(markdown) {
  // Pattern: ![alt text](filename-{start-end}.ext)
  const patternRegex = /!\[([^\]]*)\]\(([^{]+)\{(\d+)-(\d+)\}([^)]*)\)/g;
  
  return markdown.replace(patternRegex, (match, alt, prefix, start, end, suffix) => {
    const startNum = parseInt(start);
    const endNum = parseInt(end);
    const images = [];
    
    for (let i = startNum; i <= endNum; i++) {
      const filename = `${prefix}${i}${suffix}`;
      images.push(`![${alt}](${filename})`);
    }
    
    return images.join('\n');
  });
}

// Expand patterns before converting
const expandedMarkdown = expandImagePatterns(markdown);

// Convert markdown to HTML
const htmlContent = marked.parse(expandedMarkdown);

// Function to group consecutive images into galleries
function groupImagesToGallery(html) {
  // First, remove paragraph wrappers from image-only paragraphs
  html = html.replace(/<p class="article__paragraph">(<figure class="article__image">[\s\S]*?<\/figure>\s*)+<\/p>/g, (match) => {
    // Extract just the figures, removing the <p> wrapper
    return match.replace(/<\/?p[^>]*>/g, '');
  });

  const lines = html.split('\n');
  const result = [];
  let currentGallery = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    
    // Check if this line starts a figure with article__image
    if (line.startsWith('<figure class="article__image">')) {
      // Start collecting images
      const imgLines = [lines[i], lines[i + 1], lines[i + 2]]; // <figure>, <img>, </figure>
      currentGallery.push({
        src: imgLines[1].match(/src="([^"]+)"/)?.[1] || '',
        alt: imgLines[1].match(/alt="([^"]*)"/)?.[1] || '',
        title: imgLines[1].match(/title="([^"]*)"/)?.[1] || ''
      });
      i += 3;
      
      // Look ahead - skip empty lines and check for more images
      while (i < lines.length && lines[i].trim() === '') {
        i++;
      }
      
      // Check if next non-empty line is another image
      if (i < lines.length && lines[i].trim().startsWith('<figure class="article__image">')) {
        continue; // Continue collecting
      } else {
        // No more images, flush gallery
        if (currentGallery.length === 1) {
          // Single image
          const img = currentGallery[0];
          const titleAttr = img.title ? ` title="${img.title}"` : '';
          result.push('<figure class="article__image">');
          result.push(`<img src="${img.src}" alt="${img.alt}"${titleAttr} />`);
          result.push('</figure>');
        } else {
          // Multiple images - create gallery
          result.push('<div class="article__gallery-grid">');
          currentGallery.forEach(img => {
            const titleAttr = img.title ? ` title="${img.title}"` : '';
            result.push('  <figure class="article__gallery-item">');
            result.push(`    <img src="${img.src}" alt="${img.alt}"${titleAttr} />`);
            result.push('  </figure>');
          });
          result.push('</div>');
        }
        currentGallery = [];
      }
    } else {
      result.push(lines[i]);
      i++;
    }
  }
  
  return result.join('\n');
}

// Post-process to group images into galleries
const processedHtml = groupImagesToGallery(htmlContent);

// Extract the content between <article> and </article> from template
const articleStart = template.indexOf('<article class="article">');
const articleEnd = template.indexOf('</article>') + 10; // include </article>
const beforeArticle = template.substring(0, articleStart);
const afterArticle = template.substring(articleEnd);

// Build the new HTML
const newHtml = beforeArticle + '<article class="article">\n' + processedHtml + '</article>\n' + afterArticle;

// Write to new file
fs.writeFileSync(outputPath, newHtml, 'utf8');

console.log(`✅ Conversion complete!`);
console.log(`   Input:    ${markdownPath}`);
console.log(`   Template: ${templatePath}`);
console.log(`   Output:   ${outputPath}`);