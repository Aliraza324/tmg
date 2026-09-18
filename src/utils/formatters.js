/**
 * Healthcare and Patient Data Formatting Utilities
 */

export function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export function formatDateTime(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

/**
 * Masks sensitive patient contact information to safeguard privacy (Section 59)
 * e.g., +95 9 123 456 789 -> +95 *** *** 789
 */
export function maskPhoneNumber(phone) {
  if (!phone) return "—";
  const cleaned = phone.replace(/\s+/g, "");
  if (cleaned.length < 7) return phone;
  const prefix = cleaned.slice(0, 3);
  const suffix = cleaned.slice(-3);
  return `${prefix} *** *** ${suffix}`;
}

export function maskEmail(email) {
  if (!email || !email.includes("@")) return "—";
  const [local, domain] = email.split("@");
  if (local.length <= 2) return `*@${domain}`;
  return `${local[0]}***${local[local.length - 1]}@${domain}`;
}

export function formatFileSize(bytes) {
  if (!bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
