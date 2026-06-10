/**
 * Converts `**text**` markers in plain strings into <strong> tags,
 * escaping any HTML first. Used with set:html to colorize key phrases
 * without storing raw HTML in the content data.
 */
export function emphasize(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}
