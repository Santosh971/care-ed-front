/**
 * Email utilities for handling email links
 */

/**
 * Convert an email address to a Gmail compose URL
 * Opens Gmail web interface instead of system default email client
 *
 * @param {string} email - The email address
 * @param {string} subject - Optional email subject
 * @param {string} body - Optional email body
 * @returns {string} - Gmail compose URL or "#" if email is invalid
 */
export const getGmailLink = (email, subject = "", body = "") => {
  if (!email) return "#";

  // Clean the email - trim whitespace
  const cleanEmail = email.trim();

  // Validate email format
  if (!cleanEmail || !cleanEmail.includes("@")) {
    return "#";
  }

  // If email starts with mailto:, extract the email address
  const emailAddress = cleanEmail.startsWith("mailto:")
    ? cleanEmail.replace("mailto:", "")
    : cleanEmail;

  const params = new URLSearchParams();

  params.set("view", "cm");
  params.set("fs", "1");
  params.set("to", emailAddress);

  if (subject) {
    params.set("su", subject);
  }

  if (body) {
    params.set("body", body);
  }

  return `https://mail.google.com/mail/?${params.toString()}`;
};

/**
 * Check if a link is an email link (mailto: or contains @)
 * @param {string} link - The link to check
 * @returns {boolean} - True if the link is an email link
 */
export const isEmailLink = (link) => {
  if (!link || typeof link !== "string") return false;
  return link.startsWith("mailto:") || (link.includes("@") && !link.startsWith("http"));
};

/**
 * Process a link and return appropriate href
 * If it's an email, return Gmail link; otherwise return original link
 *
 * @param {string} link - The original link
 * @param {string} email - Optional email address (if different from link)
 * @returns {string} - Processed link
 */
export const processLink = (link, email = null) => {
  if (!link) return "#";

  // If it's a mailto: link, convert to Gmail
  if (link.startsWith("mailto:")) {
    const emailAddress = link.replace("mailto:", "");
    return getGmailLink(emailAddress);
  }

  // If it's an email address (contains @ but not http)
  if (email || (link.includes("@") && !link.startsWith("http"))) {
    return getGmailLink(email || link);
  }

  // Return original link for tel:, http, https, etc.
  return link;
};

export default {
  getGmailLink,
  isEmailLink,
  processLink
};