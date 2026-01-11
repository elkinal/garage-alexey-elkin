import { View, Text } from "@react-pdf/renderer";
import { styles } from "./styles";

interface InvoiceFeaturesProps {
  description: string;
}

/**
 * Cleans a feature line by removing encoding artifacts and normalizing text
 */
function cleanLine(line: string): string {
  return line
    // Handle malformed =X patterns (like =9Dimensions)
    .replace(/=([0-9])([A-Z])/g, "$2")
    // Standard =XX hex patterns
    .replace(/=[0-9A-Fa-f]{2}/g, " ")
    // Remove non-printable characters
    .replace(/[^\x20-\x7E\u00A0-\u00FF]/g, " ")
    // Normalize whitespace
    .replace(/^\s+|\s+$/g, "")
    .replace(/\s+/g, " ")
    // Fix concatenated numbers+letters
    .replace(/(\d)([A-Za-z])/g, "$1 $2")
    .replace(/([A-Za-z])(\d)/g, "$1 $2");
}

/**
 * Renders a single feature item with appropriate styling
 */
function FeatureItem({ line, index }: { line: string; index: number }) {
  // Section header: ALL CAPS (3+ chars) or ends with ":" alone
  const isSectionHeader =
    /^[A-Z][A-Z\s&+]{2,}$/.test(line) || /^[A-Za-z\s&]+:$/.test(line);

  if (isSectionHeader) {
    return (
      <Text key={index} style={styles.sectionHeader}>
        {line.replace(/:$/, "")}
      </Text>
    );
  }

  // Key-value pair: "Label: Value"
  const kvMatch = line.match(/^([^:]+):\s*(.+)$/);
  if (kvMatch && kvMatch[1].length < 30) {
    return (
      <View key={index} style={styles.descriptionItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.descriptionText}>
          <Text style={styles.keyLabel}>{kvMatch[1]}: </Text>
          <Text style={styles.keyValue}>{kvMatch[2]}</Text>
        </Text>
      </View>
    );
  }

  // Promotional: ALL CAPS with !
  const isPromo =
    /^[A-Z\s!]+!{1,}$/.test(line) ||
    (line.includes("!") && line === line.toUpperCase());

  if (isPromo) {
    return (
      <View key={index} style={styles.descriptionItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.promoText}>{line}</Text>
      </View>
    );
  }

  // Default: regular bullet point
  return (
    <View key={index} style={styles.descriptionItem}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.descriptionText}>{line}</Text>
    </View>
  );
}

export function InvoiceFeatures({ description }: InvoiceFeaturesProps) {
  const features = description
    .split(/[\r\n]+/)
    .map(cleanLine)
    .filter((line) => line.length > 0 && !/^[-–—•·]+$/.test(line));

  if (features.length === 0) return null;

  // Determine column count
  const numCols = features.length > 70 ? 3 : features.length > 35 ? 2 : 1;

  // Split into columns (newspaper style)
  const splitIntoColumns = (items: string[], cols: number): string[][] => {
    const itemsPerCol = Math.ceil(items.length / cols);
    const columns: string[][] = [];
    for (let i = 0; i < cols; i++) {
      columns.push(items.slice(i * itemsPerCol, (i + 1) * itemsPerCol));
    }
    return columns;
  };

  if (numCols === 1) {
    return (
      <View style={styles.descriptionSection}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.descriptionList}>
          {features.map((line, index) => (
            <FeatureItem key={index} line={line} index={index} />
          ))}
        </View>
      </View>
    );
  }

  const columns = splitIntoColumns(features, numCols);

  return (
    <View style={styles.descriptionSection}>
      <Text style={styles.sectionTitle}>Features</Text>
      <View style={styles.descriptionListMultiCol}>
        {columns.map((colItems, colIndex) => (
          <View key={colIndex} style={styles.descriptionColumn}>
            {colItems.map((line, index) => (
              <FeatureItem key={index} line={line} index={index} />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

