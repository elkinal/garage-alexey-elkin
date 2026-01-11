export interface ListingData {
  id: string;
  secondaryId: number | null;
  listingTitle: string;
  sellingPrice: number | null;
  listingDescription: string | null;
  imageUrls: string[];
  itemBrand: string | null;
  itemAge: number | null;
  itemLength: number | null;
  itemWidth: number | null;
  itemHeight: number | null;
  itemWeight: number | null;
  vin: string | null;
  address: {
    state: string;
  } | null;
  categoryV2: {
    name: string;
  } | null;
}
