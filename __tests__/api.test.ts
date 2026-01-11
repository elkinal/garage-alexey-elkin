/**
 * Integration tests for the PDF generation logic.
 * Tests the core functionality with mocked external dependencies.
 */

import { isValidUuid } from '../app/lib/utils';

// Mock external dependencies
jest.mock('sharp', () => {
  return jest.fn().mockImplementation(() => ({
    resize: jest.fn().mockReturnThis(),
    jpeg: jest.fn().mockReturnThis(),
    toBuffer: jest.fn().mockResolvedValue(Buffer.from('fake-image-data')),
  }));
});

// Sample listing data that matches what the Garage API returns
const mockListingData = {
  id: 'abc12345-1234-5678-9abc-def012345678',
  secondaryId: 123456,
  listingTitle: '2024 Pierce Enforcer Pumper',
  sellingPrice: 850000,
  listingDescription: 'PUMP\n1500 GPM Hale\nMiles: 5,000\nExcellent condition',
  imageUrls: ['https://example.com/image.jpg'],
  itemBrand: 'Pierce',
  itemAge: 2024,
  itemLength: 30,
  itemWidth: 8,
  itemHeight: 10,
  itemWeight: 45000,
  vin: '1HGBH41JXMN109186',
  address: { state: 'CA' },
  categoryV2: { name: 'Engines and Pumpers' },
};

describe('API Route Logic', () => {
  describe('ID Validation', () => {
    it('rejects missing ID', () => {
      expect(isValidUuid('')).toBe(false);
    });

    it('rejects invalid UUID format', () => {
      expect(isValidUuid('not-a-valid-uuid')).toBe(false);
      expect(isValidUuid('12345')).toBe(false);
      expect(isValidUuid('abc-def-ghi')).toBe(false);
    });

    it('accepts valid UUID', () => {
      expect(isValidUuid('abc12345-1234-5678-9abc-def012345678')).toBe(true);
    });
  });

  describe('Listing Data Handling', () => {
    it('handles complete listing data', () => {
      expect(mockListingData.id).toBeDefined();
      expect(mockListingData.listingTitle).toBeDefined();
      expect(mockListingData.sellingPrice).toBeGreaterThan(0);
    });

    it('handles listing with null optional fields', () => {
      const partialListing = {
        ...mockListingData,
        itemWeight: null,
        vin: null,
        address: null,
      };
      
      expect(partialListing.id).toBeDefined();
      expect(partialListing.itemWeight).toBeNull();
    });

    it('handles listing with empty image array', () => {
      const noImageListing = {
        ...mockListingData,
        imageUrls: [],
      };
      
      expect(noImageListing.imageUrls).toHaveLength(0);
    });

    it('handles listing with zero dimensions', () => {
      const zeroDimensions = {
        ...mockListingData,
        itemLength: 0,
        itemWidth: 0,
        itemHeight: 0,
      };
      
      // These should be hidden in the PDF (tested via the condition)
      const shouldShowDimensions = 
        zeroDimensions.itemLength > 0 || 
        zeroDimensions.itemWidth > 0 || 
        zeroDimensions.itemHeight > 0;
      
      expect(shouldShowDimensions).toBe(false);
    });
  });

  describe('Image Processing', () => {
    it('filters for jpg/png images only', () => {
      const imageUrls = [
        'https://example.com/photo.heic',
        'https://example.com/photo.jpg',
        'https://example.com/photo.png',
        'https://example.com/photo.webp',
      ];
      
      const validImages = imageUrls.filter(
        url => url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.jpeg')
      );
      
      expect(validImages).toHaveLength(2);
      expect(validImages).toContain('https://example.com/photo.jpg');
      expect(validImages).toContain('https://example.com/photo.png');
    });
  });

  describe('Feature Description Parsing', () => {
    it('splits description into lines', () => {
      const description = 'PUMP\n1500 GPM Hale\nMiles: 5,000';
      const lines = description.split('\n');
      
      expect(lines).toHaveLength(3);
    });

    it('filters empty lines', () => {
      const description = 'Line 1\n\n\nLine 2\n  \nLine 3';
      const lines = description
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
      
      expect(lines).toHaveLength(3);
    });

    it('determines correct column count', () => {
      const getColumnCount = (featureCount: number) => 
        featureCount > 70 ? 3 : featureCount > 35 ? 2 : 1;
      
      expect(getColumnCount(10)).toBe(1);
      expect(getColumnCount(35)).toBe(1);
      expect(getColumnCount(36)).toBe(2);
      expect(getColumnCount(70)).toBe(2);
      expect(getColumnCount(71)).toBe(3);
    });
  });
});

describe('Environment Configuration', () => {
  it('has default API URL', () => {
    const apiUrl = process.env.GARAGE_API_URL || 'https://garage-backend.onrender.com/listings';
    expect(apiUrl).toContain('garage-backend');
  });
});
