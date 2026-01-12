/**
 * Extracts a UUID from a Garage listing URL
 * @param url - The full listing URL
 * @returns The UUID if found, null otherwise
 */
export function extractUuidFromUrl(url: string): string | null {
  const match = url.match(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i
  );
  return match ? match[0] : null;
}

/**
 * Validates that a string is a properly formatted UUID
 * @param id - The string to validate
 * @returns True if valid UUID format
 */
export function isValidUuid(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

/**
 * Cleans a feature line by removing encoding artifacts and normalizing whitespace
 * @param line - Raw feature line from listing description
 * @returns Cleaned line
 */
export function cleanFeatureLine(line: string): string {
  return line
    // Remove quoted-printable encoding artifacts
    // Handle malformed =X patterns (like =9Dimensions where =9 is a tab encoding)
    // Match = followed by single digit, then capital letter (likely start of word)
    .replace(/=([0-9])([A-Z])/g, "$2")
    // Then: standard =XX hex patterns
    .replace(/=[0-9A-Fa-f]{2}/g, " ")
    // Remove all non-printable ASCII and weird characters
    .replace(/[^\x20-\x7E\u00A0-\u00FF]/g, " ")
    // Normalize whitespace
    .replace(/^\s+|\s+$/g, "")
    .replace(/\s+/g, " ")
    // Remove leading bullet prefixes (•, ·, -, *, >) with optional space
    .replace(/^[•·\-*>]\s*/, "")
    // Fix concatenated numbers+letters (e.g., "723Headroom" -> "723 Headroom")
    .replace(/(\d)([A-Za-z])/g, "$1 $2")
    .replace(/([A-Za-z])(\d)/g, "$1 $2");
}

/**
 * Determines the type of a feature line for formatting purposes
 * @param line - Cleaned feature line
 * @returns 'header' | 'keyValue' | 'promo' | 'normal'
 */
export function getFeatureType(line: string): 'header' | 'keyValue' | 'promo' | 'normal' {
  // Section header: ALL CAPS (3+ chars) or ends with ":" alone
  if (/^[A-Z][A-Z\s&+]{2,}$/.test(line) || /^[A-Za-z\s&]+:$/.test(line)) {
    return 'header';
  }
  
  // Key-value pair: "Label: Value"
  const kvMatch = line.match(/^([^:]+):\s*(.+)$/);
  if (kvMatch && kvMatch[1].length < 30) {
    return 'keyValue';
  }
  
  // Promotional: ALL CAPS with !
  if (/^[A-Z\s!]+!{1,}$/.test(line) || (line.includes("!") && line === line.toUpperCase())) {
    return 'promo';
  }
  
  return 'normal';
}

/**
 * Parses a key-value feature line
 * @param line - Feature line in "Key: Value" format
 * @returns Object with key and value, or null if not a key-value pair
 */
export function parseKeyValue(line: string): { key: string; value: string } | null {
  const match = line.match(/^([^:]+):\s*(.+)$/);
  if (match && match[1].length < 30) {
    return { key: match[1], value: match[2] };
  }
  return null;
}

/**
 * Formats a price as USD currency
 * @param price - Price in cents or dollars
 * @returns Formatted price string
 */
export function formatPrice(price: number | null | undefined): string {
  if (price == null) return "Contact for price";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

/**
 * Formats a number with locale-specific separators
 * @param num - Number to format
 * @returns Formatted number string or "N/A"
 */
export function formatNumber(num: number | null | undefined): string {
  if (num == null) return "N/A";
  return num.toLocaleString();
}

