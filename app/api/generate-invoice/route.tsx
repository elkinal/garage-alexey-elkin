import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import sharp from "sharp";
import { InvoicePDF } from "../../components/InvoicePDF";
import { ListingData } from "../../lib/types";
import { isValidUuid } from "../../lib/utils";

const GARAGE_API_URL = process.env.GARAGE_API_URL || "https://garage-backend.onrender.com/listings";

// Fetch image, resize it, and convert to base64 data URL
async function fetchImageAsBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.status} for ${url}`);
      return null;
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);
    
    // Resize image for PDF (keeps aspect ratio, higher quality)
    const resizedBuffer = await sharp(inputBuffer)
      .resize(1200, 900, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 90 })
      .toBuffer();
    
    const base64 = resizedBuffer.toString("base64");
    console.log(`Image resized: ${inputBuffer.length} -> ${resizedBuffer.length} bytes`);
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error(`Error fetching/resizing image ${url}:`, error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing listing ID" },
      { status: 400 }
    );
  }

  // Validate UUID format
  if (!isValidUuid(id)) {
    return NextResponse.json(
      { error: "Invalid listing ID format" },
      { status: 400 }
    );
  }

  try {
    // Fetch listing data from Garage API
    const response = await fetch(`${GARAGE_API_URL}/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Listing not found" },
          { status: 404 }
        );
      }
      throw new Error(`API returned ${response.status}`);
    }

    const listing: ListingData = await response.json();

    // Fetch main image as base64 (server-side to avoid CORS issues)
    let imageBase64: string | null = null;
    const imageUrls = listing.imageUrls || [];
    
    // Try to find and fetch a valid image
    for (const url of imageUrls) {
      if (url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".jpeg")) {
        imageBase64 = await fetchImageAsBase64(url);
        if (imageBase64) break; // Found a working image
      }
    }

    // Generate PDF with the fetched image
    const pdfBuffer = await renderToBuffer(
      <InvoicePDF listing={listing} imageData={imageBase64} />
    );

    // Return PDF as response
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="invoice-${id}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating invoice:", error);
    return NextResponse.json(
      { error: "Failed to generate invoice" },
      { status: 500 }
    );
  }
}

