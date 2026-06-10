/**
 * Converts lightweight markers in plain strings into HTML, escaping any
 * HTML first. Used with set:html to enrich content data without storing
 * raw HTML in it.
 *
 * Supported markers:
 *   **text**      → <strong> (accent-colored via component CSS)
 *   *text*        → <em>
 *   ==text==      → <mark> (accent color only, no weight change)
 *   [text](url)   → <a> (opens in a new tab)
 */
export function emphasize(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return escaped
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    .replace(/==([^=]+)==/g, '<mark>$1</mark>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
