import { View, Text } from "@react-pdf/renderer";
import { ListingData } from "../../lib/types";
import { styles } from "./styles";

interface InvoiceSpecsProps {
  listing: ListingData;
}

function formatNumber(num: number | null | undefined): string {
  if (num == null) return "N/A";
  return num.toLocaleString();
}

export function InvoiceSpecs({ listing }: InvoiceSpecsProps) {
  return (
    <>
      <Text style={styles.specsHeader}>Specifications</Text>
      <View style={styles.specsGrid}>
        {listing.itemAge && (
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Year</Text>
            <Text style={styles.specValue}>{listing.itemAge}</Text>
          </View>
        )}
        {listing.itemBrand && (
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Brand</Text>
            <Text style={styles.specValue}>{listing.itemBrand}</Text>
          </View>
        )}
        {listing.categoryV2?.name && (
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Category</Text>
            <Text style={styles.specValue}>{listing.categoryV2.name}</Text>
          </View>
        )}
        {listing.address?.state && (
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Location</Text>
            <Text style={styles.specValue}>{listing.address.state}</Text>
          </View>
        )}
        {listing.itemWeight != null && listing.itemWeight > 0 && (
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Weight</Text>
            <Text style={styles.specValue}>
              {formatNumber(listing.itemWeight)} lbs
            </Text>
          </View>
        )}
        {listing.itemLength != null &&
          listing.itemWidth != null &&
          listing.itemHeight != null &&
          (listing.itemLength > 0 || listing.itemWidth > 0 || listing.itemHeight > 0) && (
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Dimensions</Text>
              <Text style={styles.specValue}>
                {listing.itemLength}" x {listing.itemWidth}" x {listing.itemHeight}"
              </Text>
            </View>
          )}
        {listing.vin && (
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>VIN</Text>
            <Text style={styles.specValue}>{listing.vin}</Text>
          </View>
        )}
      </View>
    </>
  );
}

