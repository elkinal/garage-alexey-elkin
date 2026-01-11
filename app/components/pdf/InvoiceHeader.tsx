import { View, Text } from "@react-pdf/renderer";
import { GarageLogo } from "./GarageLogo";
import { styles } from "./styles";

interface InvoiceHeaderProps {
  date: string;
  refId: string;
}

export function InvoiceHeader({ date, refId }: InvoiceHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <GarageLogo />
        <Text style={styles.subtitle}>
          Marketplace for emergency vehicles, equipment, and more.
        </Text>
      </View>
      <View style={styles.invoiceInfo}>
        <Text style={styles.invoiceTitle}>QUOTE</Text>
        <Text style={styles.invoiceMeta}>
          <Text style={styles.invoiceLabel}>Date: </Text>
          <Text style={styles.invoiceValue}>{date}</Text>
        </Text>
        <Text style={styles.invoiceMeta}>
          <Text style={styles.invoiceLabel}>Ref: </Text>
          <Text style={styles.invoiceValue}>#{refId}</Text>
        </Text>
      </View>
    </View>
  );
}

