const fs = require('fs');
const path = require('path');
const marked = require('marked');

// Read the markdown file
const markdownPath = path.join(__dirname, 'Raw', 'Thần Quốc Chi Thượng.md');
const markdown = fs.readFileSync(markdownPath, 'utf8');

// Read the template HTML
const templatePath = path.join(__dirname, 'Raw', 'than-quoc-chi-thuong.html');
const template = fs.readFileSync(templatePath, 'utf8');

// Custom renderer to match the template classes
const renderer = new marked.Renderer();

// Headings
renderer.heading = function(text, level) {
  const classMap = {
    1: 'article__title',
    2: 'article__heading--level2',
    3: 'article__heading--level3',
    4: 'article__heading--level4',
    5: 'article__heading--level4', // assuming h4 for h5+
    6: 'article__heading--level4'
  };
  const className = classMap[level] || 'article__heading--level4';
  return `<h${level} class="${className}">${text}</h${level}>\n`;
};

// Paragraphs
renderer.paragraph = function(text) {
  return `<p class="article__paragraph">${text}</p>\n`;
};

// Blockquotes
renderer.blockquote = function(quote) {
  return `<blockquote class="article__quote">
<p class="article__quote-text">${quote}</p>
</blockquote>\n`;
};

// Lists
renderer.list = function(body, ordered) {
  const listClass = ordered ? 'article__list article__list--ordered' : 'article__list article__list--unordered';
  const tag = ordered ? 'ol' : 'ul';
  return `<${tag} class="${listClass}">\n${body}</${tag}>\n`;
};

renderer.listitem = function(text) {
  return `<li class="article__list-item">${text}</li>\n`;
};

// Tables
renderer.table = function(header, body) {
  return `<div class="article__table-wrapper">
<table class="article__table">
<thead>\n${header}</thead>
<tbody>\n${body}</tbody>
</table>
</div>\n`;
};

renderer.tablerow = function(content) {
  return `<tr>\n${content}</tr>\n`;
};

renderer.tablecell = function(content, flags) {
  const tag = flags.header ? 'th' : 'td';
  return `<${tag}>${content}</${tag}>\n`;
};

// Code (inline)
renderer.codespan = function(code) {
  return `<code>${code}</code>`;
};

// Code block
renderer.code = function(code, language) {
  return `<pre><code class="language-${language}">${code}</code></pre>\n`;
};

// Links
renderer.link = function(href, title, text) {
  const titleAttr = title ? ` title="${title}"` : '';
  return `<a href="${href}"${titleAttr}>${text}</a>`;
};

// Images - assuming simple img for now
renderer.image = function(href, title, text) {
  const alt = text || '';
  const titleAttr = title ? ` title="${title}"` : '';
  return `<figure class="article__image">
<img src="${href}" alt="${alt}"${titleAttr} />
</figure>\n`;
};

// Strong
renderer.strong = function(text) {
  return `<strong>${text}</strong>`;
};

// Emphasis
renderer.em = function(text) {
  return `<em>${text}</em>`;
};

// Convert markdown to HTML
const htmlContent = marked.parse(markdown, { renderer });

// Extract the content between <article> and </article> from template
const articleStart = template.indexOf('<article class="article">');
const articleEnd = template.indexOf('</article>') + 10; // include </article>
const beforeArticle = template.substring(0, articleStart);
const afterArticle = template.substring(articleEnd);

// Build the new HTML
const newHtml = beforeArticle + '<article class="article">\n' + htmlContent + '</article>\n' + afterArticle;

// Write to new file
const outputPath = path.join(__dirname, 'Raw', 'than-quoc-chi-thuong-new.html');
fs.writeFileSync(outputPath, newHtml, 'utf8');

console.log('Conversion complete. Output file: Raw/than-quoc-chi-thuong-new.html');