// Minimal markdown -> HTML renderer for bold/italic/heading/links/paragraphs
// Intentionally small to avoid adding new runtime dependencies.

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Fallback sanitizer (used during SSR if DOMPurify is not available)
function fallbackSanitizeHtml(html: string) {
  // remove script and iframe tags
  html = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '');
  // remove on* attributes
  html = html.replace(/\son[a-z]+=("|')(?:.*?)("|')/gi, '');
  // remove javascript: in href/src
  html = html.replace(/(href|src)=("|')javascript:[^"']*("|')/gi, '$1="#"');
  return html;
}

export function renderMarkdownToHtml(md: string) {
  if (!md) return '';
  const lines = md.split(/\r?\n/);
  const blocks: string[] = [];
  let buffer: string[] = [];

  function flushBuffer() {
    if (buffer.length === 0) return;
    const text = buffer.join('\n');
    // process inline formatting: bold, italic, links
    let html = escapeHtml(text)
      // bold **text**
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // italic *text*
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // links [text](url)
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // line breaks
      .replace(/\n/g, '<br/>');
    blocks.push(`<p>${html}</p>`);
    buffer = [];
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimEnd();
    if (line.trim() === '') {
      flushBuffer();
      continue;
    }
    // headings
    const h3 = line.match(/^###\s+(.*)/);
    const h2 = line.match(/^##\s+(.*)/);
    const h1 = line.match(/^#\s+(.*)/);
    if (h1) {
      flushBuffer();
      blocks.push(`<h1>${escapeHtml(h1[1])}</h1>`);
      continue;
    }
    if (h2) {
      flushBuffer();
      blocks.push(`<h2>${escapeHtml(h2[1])}</h2>`);
      continue;
    }
    if (h3) {
      flushBuffer();
      blocks.push(`<h3>${escapeHtml(h3[1])}</h3>`);
      continue;
    }

    buffer.push(line);
  }
  flushBuffer();

  const result = blocks.join('\n');

  // Use DOMPurify in the browser when available for robust sanitization.
  try {
    if (typeof window !== 'undefined') {
      // import DOMPurify dynamically to avoid SSR issues
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const createDOMPurify = require('dompurify');
      const DOMPurify = createDOMPurify(window);
      return DOMPurify.sanitize(result, { ADD_ATTR: ['target', 'rel'] });
    }
  } catch (e) {
    // fallback to simple sanitizer in non-browser contexts
  }

  return fallbackSanitizeHtml(result);
}

export default renderMarkdownToHtml;
