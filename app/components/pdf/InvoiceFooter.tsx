import { View, Text, Link } from "@react-pdf/renderer";
import { styles } from "./styles";

interface InvoiceFooterProps {
  listingUrl: string;
}

export function InvoiceFooter({ listingUrl }: InvoiceFooterProps) {
  return (
    <>
      {/* Bottom Section: URL + CTA */}
      <View style={styles.bottomSection}>
        <View style={styles.listingUrlContainer}>
          <Text style={styles.listingUrlLabel}>View full listing:</Text>
          <Link style={styles.listingUrl} src={listingUrl}>
            {listingUrl}
          </Link>
        </View>
        <View style={styles.ctaRow}>
          <Text style={styles.ctaText}>Questions? Call </Text>
          <Text style={styles.ctaPhone}>(201) 293-7164</Text>
        </View>
        <Text style={styles.disclaimer}>
          This is a price quote, not a receipt. Prices are subject to change.
        </Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Garage Technologies, Inc. | www.shopgarage.com | (201) 293-7164 |
        support@withgarage.com
      </Text>
    </>
  );
}

