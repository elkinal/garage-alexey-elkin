import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { ListingData } from "../lib/types";
import {
  styles,
  InvoiceHeader,
  InvoiceSpecs,
  InvoiceFeatures,
  InvoiceFooter,
} from "./pdf";

interface InvoicePDFProps {
  listing: ListingData;
  imageData: string | null;
}

function formatPrice(price: number | null | undefined): string {
  if (price == null) return "Contact for price";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function InvoicePDF({ listing, imageData }: InvoicePDFProps) {
  // Build listing URL
  const slugifiedTitle = listing.listingTitle
    ?.replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-");
  const listingUrl = `https://www.shopgarage.com/listing/${slugifiedTitle}-${listing.id}`;

  // Reference ID for the quote
  const refId = listing.secondaryId?.toString() || listing.id?.slice(0, 8).toUpperCase() || "N/A";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceHeader date={formatDate()} refId={refId} />

        {/* Main content: Image + Details */}
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
            <InvoiceSpecs listing={listing} />
          </View>
        </View>

        {/* Features */}
        {listing.listingDescription && (
          <InvoiceFeatures description={listing.listingDescription} />
        )}

        <InvoiceFooter listingUrl={listingUrl} />
      </Page>
    </Document>
  );
}
