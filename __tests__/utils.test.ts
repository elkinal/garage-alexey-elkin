import {
  extractUuidFromUrl,
  isValidUuid,
  cleanFeatureLine,
  getFeatureType,
  parseKeyValue,
  formatPrice,
  formatNumber,
} from '../app/lib/utils';

describe('extractUuidFromUrl', () => {
  it('extracts UUID from a standard Garage listing URL', () => {
    const url = 'https://www.shopgarage.com/listing/2024-Pierce-Enforcer-abc12345-1234-5678-9abc-def012345678';
    expect(extractUuidFromUrl(url)).toBe('abc12345-1234-5678-9abc-def012345678');
  });

  it('handles uppercase UUIDs (some listings have these)', () => {
    const url = 'https://www.shopgarage.com/listing/Fire-Truck-ABC12345-1234-5678-9ABC-DEF012345678';
    expect(extractUuidFromUrl(url)).toBe('ABC12345-1234-5678-9ABC-DEF012345678');
  });

  it('returns null when URL has no UUID', () => {
    const url = 'https://www.shopgarage.com/listing/some-truck';
    expect(extractUuidFromUrl(url)).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(extractUuidFromUrl('')).toBeNull();
  });

  it('works with query parameters after the UUID', () => {
    const url = 'https://www.shopgarage.com/listing/truck-abc12345-1234-5678-9abc-def012345678?ref=home';
    expect(extractUuidFromUrl(url)).toBe('abc12345-1234-5678-9abc-def012345678');
  });

  it('extracts first UUID if multiple present', () => {
    // Edge case: shouldn't happen in practice but good to know the behavior
    const url = 'https://example.com/abc12345-1234-5678-9abc-def012345678/other/11111111-2222-3333-4444-555555555555';
    expect(extractUuidFromUrl(url)).toBe('abc12345-1234-5678-9abc-def012345678');
  });
});

describe('isValidUuid', () => {
  it('accepts valid lowercase UUID', () => {
    expect(isValidUuid('abc12345-1234-5678-9abc-def012345678')).toBe(true);
  });

  it('accepts valid uppercase UUID', () => {
    expect(isValidUuid('ABC12345-1234-5678-9ABC-DEF012345678')).toBe(true);
  });

  it('rejects malformed UUID', () => {
    expect(isValidUuid('not-a-uuid')).toBe(false);
  });

  it('rejects UUID with trailing characters', () => {
    expect(isValidUuid('abc12345-1234-5678-9abc-def012345678-extra')).toBe(false);
  });

  it('rejects empty string', () => {
    expect(isValidUuid('')).toBe(false);
  });

  it('rejects UUID with wrong segment lengths', () => {
    expect(isValidUuid('abc123-1234-5678-9abc-def012345678')).toBe(false);
  });
});

describe('cleanFeatureLine', () => {
  // This handles a real bug we found: some listing descriptions have
  // quoted-printable encoding artifacts like "=9" (tab character)
  it('removes quoted-printable encoding like =9 before words', () => {
    expect(cleanFeatureLine('=9Dimensions & Weight')).toBe('Dimensions & Weight');
  });

  it('removes standard =XX hex patterns', () => {
    expect(cleanFeatureLine('Hello=20World')).toBe('Hello World');
  });

  // Another real issue: some specs have no space between number and unit
  it('adds space between numbers and letters', () => {
    expect(cleanFeatureLine('723Headroom')).toBe('723 Headroom');
  });

  it('adds space between letters and numbers', () => {
    expect(cleanFeatureLine('Model3500')).toBe('Model 3500');
  });

  it('trims leading and trailing whitespace', () => {
    expect(cleanFeatureLine('  Hello World  ')).toBe('Hello World');
  });

  it('collapses multiple spaces into one', () => {
    expect(cleanFeatureLine('Hello    World')).toBe('Hello World');
  });

  it('handles empty string without crashing', () => {
    expect(cleanFeatureLine('')).toBe('');
  });
});

describe('getFeatureType', () => {
  describe('header detection', () => {
    it('detects ALL CAPS text as header', () => {
      expect(getFeatureType('PUMP')).toBe('header');
    });

    it('detects ALL CAPS with spaces and symbols', () => {
      expect(getFeatureType('ELECTRIC + LIGHTING')).toBe('header');
    });

    it('detects lines ending with colon as header', () => {
      expect(getFeatureType('Included:')).toBe('header');
    });
  });

  describe('key-value detection', () => {
    it('detects "Label: Value" pattern', () => {
      expect(getFeatureType('Miles: 94,000')).toBe('keyValue');
    });

    it('detects short labels with values', () => {
      expect(getFeatureType('Year: 2024')).toBe('keyValue');
    });
  });

  describe('promo detection', () => {
    it('detects ALL CAPS with exclamation marks', () => {
      expect(getFeatureType('FREE SHIPPING!!!')).toBe('promo');
    });

    it('detects shouty marketing text', () => {
      expect(getFeatureType('CALL NOW!')).toBe('promo');
    });
  });

  describe('normal text', () => {
    it('returns normal for regular feature descriptions', () => {
      expect(getFeatureType('Cummins diesel engine')).toBe('normal');
    });

    it('returns normal for sentence-like text', () => {
      expect(getFeatureType('Air conditioning included')).toBe('normal');
    });
  });
});

describe('parseKeyValue', () => {
  it('extracts key and value from colon-separated text', () => {
    expect(parseKeyValue('Miles: 94,000')).toEqual({ 
      key: 'Miles', 
      value: '94,000' 
    });
  });

  it('handles values that contain colons (like times)', () => {
    expect(parseKeyValue('Time: 10:30 AM')).toEqual({ 
      key: 'Time', 
      value: '10:30 AM' 
    });
  });

  it('returns null for plain text without colon', () => {
    expect(parseKeyValue('Just a regular line')).toBeNull();
  });

  it('returns null when key is too long (probably a sentence, not a label)', () => {
    const sentence = 'This is a very long key that should not be parsed as a key value pair: value';
    expect(parseKeyValue(sentence)).toBeNull();
  });
});

describe('formatPrice', () => {
  it('formats whole dollar amounts with commas', () => {
    expect(formatPrice(150000)).toBe('$150,000');
  });

  it('handles smaller amounts', () => {
    expect(formatPrice(99999)).toBe('$99,999');
  });

  it('returns placeholder text for null price', () => {
    expect(formatPrice(null)).toBe('Contact for price');
  });

  it('returns placeholder text for undefined price', () => {
    expect(formatPrice(undefined)).toBe('Contact for price');
  });

  it('handles zero price', () => {
    expect(formatPrice(0)).toBe('$0');
  });
});

describe('formatNumber', () => {
  it('adds thousand separators', () => {
    expect(formatNumber(1000000)).toBe('1,000,000');
  });

  it('returns N/A for null', () => {
    expect(formatNumber(null)).toBe('N/A');
  });

  it('returns N/A for undefined', () => {
    expect(formatNumber(undefined)).toBe('N/A');
  });

  it('handles zero', () => {
    expect(formatNumber(0)).toBe('0');
  });
});
