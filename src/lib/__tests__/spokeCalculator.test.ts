import { describe, it, expect } from 'vitest';
import { calculateSpokeLength, validateWheelSpecs, getCommonWheelSizes, type WheelSpecs } from '../spokeCalculator';

describe('spokeCalculator', () => {
  describe('validateWheelSpecs', () => {
    it('should return no errors for valid specifications', () => {
      const specs: WheelSpecs = {
        rimEffectiveDiameter: 622,
        spokeCount: 32,
        crossPattern: 3,
        hubFlangeDiameter: 60
      };
      
      const errors = validateWheelSpecs(specs);
      expect(errors).toHaveLength(0);
    });

    it('should validate rim effective diameter range', () => {
      const specs: WheelSpecs = {
        rimEffectiveDiameter: -100,
        spokeCount: 32,
        crossPattern: 3,
        hubFlangeDiameter: 60
      };
      
      const errors = validateWheelSpecs(specs);
      expect(errors).toContain('Rim effective diameter must be between 1-1000mm');
    });

    it('should validate spoke count range and divisibility', () => {
      const specs: WheelSpecs = {
        rimEffectiveDiameter: 622,
        spokeCount: 15, // Not divisible by 4
        crossPattern: 3,
        hubFlangeDiameter: 60
      };
      
      const errors = validateWheelSpecs(specs);
      expect(errors).toContain('Spoke count must be between 8-48 and divisible by 4');
    });

    it('should validate cross pattern range', () => {
      const specs: WheelSpecs = {
        rimEffectiveDiameter: 622,
        spokeCount: 32,
        crossPattern: 5, // Out of range
        hubFlangeDiameter: 60
      };
      
      const errors = validateWheelSpecs(specs);
      expect(errors).toContain('Cross pattern must be between 0-4');
    });

    it('should validate hub flange diameter vs rim diameter', () => {
      const specs: WheelSpecs = {
        rimEffectiveDiameter: 622,
        spokeCount: 32,
        crossPattern: 3,
        hubFlangeDiameter: 700 // Larger than rim
      };
      
      const errors = validateWheelSpecs(specs);
      expect(errors).toContain('Hub flange diameter must be smaller than rim diameter');
    });
  });

  describe('calculateSpokeLength', () => {
    it('should calculate correct spoke length for 700C wheel with 3-cross pattern', () => {
      const specs: WheelSpecs = {
        rimEffectiveDiameter: 622,
        spokeCount: 32,
        crossPattern: 3,
        hubFlangeDiameter: 60
      };
      
      const result = calculateSpokeLength(specs);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.spokeLength).toBeCloseTo(292.4, 1); // Expected result for these specs
    });

    it('should calculate correct spoke length for radial (0-cross) pattern', () => {
      const specs: WheelSpecs = {
        rimEffectiveDiameter: 622,
        spokeCount: 32,
        crossPattern: 0, // Radial
        hubFlangeDiameter: 60
      };
      
      const result = calculateSpokeLength(specs);
      
      expect(result.isValid).toBe(true);
      expect(result.spokeLength).toBeCloseTo(281, 0); // Radial should be shorter
    });

    it('should handle different wheel sizes correctly', () => {
      const specs26: WheelSpecs = {
        rimEffectiveDiameter: 559, // 26"
        spokeCount: 32,
        crossPattern: 3,
        hubFlangeDiameter: 60
      };
      
      const specs700: WheelSpecs = {
        rimEffectiveDiameter: 622, // 700C
        spokeCount: 32,
        crossPattern: 3,
        hubFlangeDiameter: 60
      };
      
      const result26 = calculateSpokeLength(specs26);
      const result700 = calculateSpokeLength(specs700);
      
      expect(result26.isValid).toBe(true);
      expect(result700.isValid).toBe(true);
      expect(result700.spokeLength).toBeGreaterThan(result26.spokeLength);
    });

    it('should return errors for invalid specifications', () => {
      const specs: WheelSpecs = {
        rimEffectiveDiameter: -100,
        spokeCount: 15,
        crossPattern: 5,
        hubFlangeDiameter: 700
      };
      
      const result = calculateSpokeLength(specs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.spokeLength).toBe(0);
    });

    it('should handle edge case of maximum cross pattern', () => {
      const specs: WheelSpecs = {
        rimEffectiveDiameter: 622,
        spokeCount: 32,
        crossPattern: 4, // Maximum cross
        hubFlangeDiameter: 60
      };
      
      const result = calculateSpokeLength(specs);
      
      expect(result.isValid).toBe(true);
      expect(result.spokeLength).toBeGreaterThan(290); // Should be longer than 3-cross
    });
  });

  describe('getCommonWheelSizes', () => {
    it('should return common wheel sizes', () => {
      const sizes = getCommonWheelSizes();
      
      expect(sizes).toHaveLength(6);
      expect(sizes.some(size => size.name.includes('700C'))).toBe(true);
      expect(sizes.some(size => size.name.includes('26"'))).toBe(true);
      expect(sizes.some(size => size.name.includes('29"'))).toBe(true);
    });

    it('should include proper diameter values', () => {
      const sizes = getCommonWheelSizes();
      const size700C = sizes.find(size => size.name.includes('700C'));
      
      expect(size700C).toBeDefined();
      expect(size700C?.diameter).toBe(622);
    });
  });
});