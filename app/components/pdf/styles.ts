import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 12,
    color: "#333",
  },
  // Header
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
  // Main content layout
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
  listingIdUnderTitle: {
    fontSize: 7,
    color: "#999",
    fontFamily: "Courier",
    marginBottom: 4,
  },
  priceInline: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F97315",
    marginBottom: 8,
  },
  // Specs
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
  // Features section
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

