import { useRef } from "react";

/**
 * Honeypot anti-spam helper.
 *
 * Renders a hidden input that real users won't fill in. Bots that
 * blindly populate every input will trip it and the submit handler
 * should silently abort.
 *
 * Usage:
 *   const honeypot = useHoneypot();
 *   ...
 *   if (honeypot.isBot()) return; // silently drop spam
 *   ...
 *   <honeypot.HoneypotField />
 */
export const useHoneypot = () => {
  const ref = useRef<HTMLInputElement>(null);

  const HoneypotField = () => (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-10000px",
        top: "auto",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    >
      <label>
        Leave this field empty
        <input
          ref={ref}
          type="text"
          name="website_url_hp"
          tabIndex={-1}
          autoComplete="off"
        />
      </label>
    </div>
  );

  const isBot = () => Boolean(ref.current?.value);

  return { HoneypotField, isBot };
};
