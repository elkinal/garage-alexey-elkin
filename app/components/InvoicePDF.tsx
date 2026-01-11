import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Svg,
  Path,
  Link,
} from "@react-pdf/renderer";
import { ListingData } from "../lib/types";

// Garage logo as react-pdf SVG component
function GarageLogo() {
  return (
    <Svg width="100" height="26" viewBox="0 0 707 187">
      <Path
        d="M47.1968 187C34.531 187 24.6983 184.5 17.6988 179.5C10.6993 174.5 5.86627 167.583 3.19978 158.75C0.533297 149.75 -0.466635 139.333 0.199987 127.5C1.03326 115.667 2.86647 102.917 5.69962 89.25C11.8659 60.25 20.3653 38.1667 31.1979 23C42.1972 7.66667 57.1961 0 76.1949 0C95.8602 0 109.109 5.75 115.942 17.25C122.942 28.75 124.775 45.9167 121.442 68.75H79.9446C81.4445 58.4167 81.7778 50.9167 80.9445 46.25C80.1113 41.5833 77.5281 39.25 73.1951 39.25C68.1954 39.25 63.9457 43.5833 60.4459 52.25C57.1128 60.75 53.5297 74.1667 49.6967 92.5C47.6968 102.333 46.0302 111.5 44.697 120C43.3637 128.333 43.1138 135.083 43.947 140.25C44.947 145.417 47.7801 148 52.4465 148C55.9462 148 58.946 146.25 61.4459 142.75C64.1124 139.25 66.3622 133.167 68.1954 124.5L69.1953 118.75H57.1962L64.1957 85.25L118.442 85.5L109.443 127.5C106.609 141.667 102.11 153.167 95.9435 162C89.7773 170.667 82.5278 177 74.195 181C65.8622 185 56.8628 187 47.1968 187Z"
        fill="#F97315"
      />
      <Path
        d="M102.554 184.75L168.05 2.5H230.046L220.546 184.75H177.299L180.049 154.75H155.301L145.802 184.75H102.554ZM166.3 119.75H183.049L187.799 79L191.548 44H189.799L179.049 78.5L166.3 119.75Z"
        fill="#F97315"
      />
      <Path
        d="M229.854 184.75L267.852 2.5H317.349C335.014 2.5 347.513 6.5 354.846 14.5C362.179 22.3333 365.679 32.6667 365.345 45.5C364.845 58.1667 361.762 69.4167 356.096 79.25C350.43 89.0833 343.013 95.6667 333.847 99L333.597 100.75C340.43 103.25 344.43 107.5 345.597 113.5C346.763 119.5 346.263 127.417 344.097 137.25L338.097 166.5C337.431 169.833 336.931 173.333 336.597 177C336.264 180.5 336.014 183.083 335.847 184.75H291.1C290.934 182.417 290.934 179.917 291.1 177.25C291.267 174.417 291.684 171.667 292.35 169L298.1 142C299.1 137 299.516 132.583 299.35 128.75C299.183 124.75 297.1 122.75 293.1 122.75H287.101L274.351 184.75H229.854ZM294.6 87.75H299.6C304.933 87.75 309.349 84.75 312.849 78.75C316.515 72.75 318.515 64.8333 318.848 55C319.015 50 318.015 46.5833 315.849 44.75C313.682 42.75 310.682 41.75 306.849 41.75H304.099L294.6 87.75Z"
        fill="#F97315"
      />
      <Path
        d="M343.993 184.75L409.489 2.5H471.485L461.985 184.75H418.738L421.488 154.75H396.74L387.24 184.75H343.993ZM407.739 119.75H424.488L429.237 79L432.987 44H431.237L420.488 78.5L407.739 119.75Z"
        fill="#F97315"
      />
      <Path
        d="M523.483 187C510.817 187 500.985 184.5 493.985 179.5C486.986 174.5 482.153 167.583 479.486 158.75C476.82 149.75 475.82 139.333 476.486 127.5C477.32 115.667 479.153 102.917 481.986 89.25C488.152 60.25 496.652 38.1667 507.484 23C518.483 7.66667 533.482 0 552.481 0C572.146 0 585.396 5.75 592.228 17.25C599.228 28.75 601.061 45.9167 597.728 68.75H556.231C557.731 58.4167 558.064 50.9167 557.231 46.25C556.398 41.5833 553.814 39.25 549.481 39.25C544.482 39.25 540.232 43.5833 536.732 52.25C533.399 60.75 529.816 74.1667 525.983 92.5C523.983 102.333 522.317 111.5 520.983 120C519.65 128.333 519.4 135.083 520.233 140.25C521.233 145.417 524.066 148 528.733 148C532.233 148 535.232 146.25 537.732 142.75C540.399 139.25 542.648 133.167 544.482 124.5L545.482 118.75H533.482L540.482 85.25L594.728 85.5L585.729 127.5C582.896 141.667 578.396 153.167 572.23 162C566.064 170.667 558.814 177 550.481 181C542.148 185 533.149 187 523.483 187Z"
        fill="#F97315"
      />
      <Path
        d="M587.008 184.75L625.006 2.5H707L699.251 41.75H660.253L653.754 73.5H688.751L681.002 110H646.254L638.755 145.5H677.252L669.253 184.75H587.008Z"
        fill="#F97315"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 12,
    color: "#333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    borderBottom: "2px solid #F97315",
    paddingBottom: 15,
  },
  headerLeft: {
    flexDirection: "column",
  },
  subtitle: {
    fontSize: 9,
    color: "#666",
    marginTop: 4,
  },
  invoiceInfo: {
    textAlign: "right",
    marginTop: -6,
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  invoiceMeta: {
    marginTop: 3,
  },
  invoiceLabel: {
    fontSize: 9,
    color: "#999",
  },
  invoiceValue: {
    fontSize: 9,
    color: "#555",
  },
  // Two-column layout for image + details
  mainContent: {
    flexDirection: "row",
    marginBottom: 15,
    gap: 20,
  },
  imageColumn: {
    width: "40%",
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: 4,
    padding: 8,
    alignSelf: "flex-start",
  },
  detailsColumn: {
    width: "60%",
  },
  truckImage: {
    width: "100%",
    maxHeight: 160,
    objectFit: "contain",
    borderRadius: 2,
  },
  imagePlaceholder: {
    width: "100%",
    height: 100,
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    fontSize: 9,
    color: "#9ca3af",
  },
  truckTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  priceInline: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F97315",
    marginBottom: 8,
  },
  specsHeader: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  specsGrid: {
    flexDirection: "column",
  },
  specItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
    borderBottom: "1px solid #f3f4f6",
  },
  specLabel: {
    fontSize: 8,
    color: "#666",
  },
  specValue: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#333",
  },
  // Description section
  descriptionSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  descriptionList: {
    flexDirection: "column",
  },
  descriptionListMultiCol: {
    flexDirection: "row",
    gap: 15,
  },
  descriptionColumn: {
    flex: 1,
    flexDirection: "column",
  },
  descriptionItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bullet: {
    fontSize: 8,
    color: "#F97315",
    marginRight: 5,
    width: 6,
  },
  descriptionText: {
    fontSize: 8,
    color: "#444",
    flex: 1,
  },
  // Feature formatting variants
  sectionHeader: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
    marginBottom: 2,
  },
  keyLabel: {
    fontSize: 8,
    color: "#999",
  },
  keyValue: {
    fontSize: 8,
    color: "#222",
  },
  promoText: {
    fontSize: 8,
    color: "#666",
    fontStyle: "italic",
    flex: 1,
  },
  // Bottom section
  bottomSection: {
    marginTop: 12,
    padding: 10,
    backgroundColor: "#fafafa",
    borderRadius: 4,
    border: "1px solid #e5e7eb",
  },
  listingUrlContainer: {
    flexDirection: "column",
    fontSize: 8,
    marginBottom: 6,
  },
  listingUrlLabel: {
    color: "#666",
    marginBottom: 2,
  },
  listingUrl: {
    color: "#2563eb",
    textDecoration: "underline",
  },
  listingIdUnderTitle: {
    fontSize: 7,
    color: "#999",
    fontFamily: "Courier",
    marginBottom: 4,
  },
  ctaRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  ctaText: {
    fontSize: 9,
    color: "#333",
  },
  ctaPhone: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#F97315",
  },
  disclaimer: {
    fontSize: 7,
    color: "#999",
    fontStyle: "italic",
  },
  footer: {
    position: "absolute",
    bottom: 25,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#999",
    borderTop: "1px solid #eee",
    paddingTop: 8,
  },
});

interface InvoicePDFProps {
  listing: ListingData;
  imageData: string | null; // Base64 image data from server
}

export function InvoicePDF({ listing, imageData }: InvoicePDFProps) {
  const formatPrice = (price: number | null | undefined) => {
    if (price == null) return "Contact for price";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = () => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatNumber = (num: number | null | undefined) => {
    if (num == null) return "N/A";
    return num.toLocaleString();
  };

  // Construct listing URL
  const slugifiedTitle = listing.listingTitle
    ?.replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-");
  const listingUrl = `https://www.shopgarage.com/listing/${slugifiedTitle}-${listing.id}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
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
              <Text style={styles.invoiceValue}>{formatDate()}</Text>
            </Text>
            <Text style={styles.invoiceMeta}>
              <Text style={styles.invoiceLabel}>Ref: </Text>
              <Text style={styles.invoiceValue}>
                #{listing.secondaryId || listing.id?.slice(0, 8).toUpperCase()}
              </Text>
            </Text>
          </View>
        </View>

        {/* Two-column: Image + Details */}
        <View style={styles.mainContent}>
          {/* Left: Image */}
          <View style={styles.imageColumn}>
            {imageData ? (
              <Image style={styles.truckImage} src={imageData} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>No Image Available</Text>
              </View>
            )}
          </View>

          {/* Right: Title + Price + Specs */}
          <View style={styles.detailsColumn}>
            <Text style={styles.truckTitle}>
              {listing.listingTitle || "Untitled Listing"}
            </Text>
            <Text style={styles.listingIdUnderTitle}>{listing.id}</Text>
            <Text style={styles.priceInline}>{formatPrice(listing.sellingPrice)}</Text>
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
          </View>
        </View>

        {/* Description */}
        {listing.listingDescription && (() => {
          const features = listing.listingDescription
            .split(/[\r\n]+/)
            .map((line) => line
              // Remove quoted-printable encoding artifacts
              // Handle malformed =X patterns (like =9Dimensions where =9 is a tab encoding)
              .replace(/=([0-9])([A-Z])/g, "$2")
              // Then: standard =XX hex patterns
              .replace(/=[0-9A-Fa-f]{2}/g, " ")
              // Remove all non-printable ASCII and weird characters, keep only standard printable
              .replace(/[^\x20-\x7E\u00A0-\u00FF]/g, " ")
              // Normalize whitespace
              .replace(/^\s+|\s+$/g, "")
              .replace(/\s+/g, " ")
              // Fix concatenated numbers+letters (e.g., "723Headroom" -> "723 Headroom")
              .replace(/(\d)([A-Za-z])/g, "$1 $2")
              .replace(/([A-Za-z])(\d)/g, "$1 $2")
            )
            .filter((line) => line.length > 0 && !/^[-–—•·]+$/.test(line));
          const featureCount = features.length;
          
          // Determine column count based on feature count
          const numCols = featureCount > 70 ? 3 : featureCount > 35 ? 2 : 1;
          
          // Split features into columns (newspaper style - fill first column, then next)
          const splitIntoColumns = (items: string[], cols: number) => {
            const itemsPerCol = Math.ceil(items.length / cols);
            const columns: string[][] = [];
            for (let i = 0; i < cols; i++) {
              columns.push(items.slice(i * itemsPerCol, (i + 1) * itemsPerCol));
            }
            return columns;
          };

          // Detect feature type and render accordingly
          const renderFeatureItem = (line: string, index: number) => {
            // Section header: ALL CAPS (3+ chars) or ends with ":" alone
            const isSectionHeader = 
              /^[A-Z][A-Z\s&+]{2,}$/.test(line) || 
              /^[A-Za-z\s&]+:$/.test(line);
            
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

            // Promotional: ALL CAPS with ! or very salesy language
            const isPromo = /^[A-Z\s!]+!{1,}$/.test(line) || 
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
          };

          if (numCols === 1) {
            return (
              <View style={styles.descriptionSection}>
                <Text style={styles.sectionTitle}>Features</Text>
                <View style={styles.descriptionList}>
                  {features.map(renderFeatureItem)}
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
                    {colItems.map(renderFeatureItem)}
                  </View>
                ))}
              </View>
            </View>
          );
        })()}

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
      </Page>
    </Document>
  );
}
