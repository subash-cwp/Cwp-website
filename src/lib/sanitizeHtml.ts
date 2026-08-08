import DOMPurify from "dompurify";

/**
 * Sanitize CMS-editable heading HTML. Only inline formatting is allowed —
 * scripts, event handlers, iframes, etc. are stripped.
 */
export const sanitizeHeading = (html: string | undefined | null): string =>
  DOMPurify.sanitize(html ?? "", {
    ALLOWED_TAGS: ["span", "b", "strong", "i", "em", "u", "br", "small", "mark", "sup", "sub"],
    ALLOWED_ATTR: ["class", "style"],
  });
