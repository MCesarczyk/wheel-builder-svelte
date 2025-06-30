/**
 * Bicycle wheel spoke length calculation utilities
 */

export interface WheelSpecs {
  rimEffectiveDiameter: number; // mm
  spokeCount: number;
  crossPattern: number; // 0-4
  hubFlangeDiameter: number; // mm
}

export interface CalculationResult {
  spokeLength: number; // mm
  isValid: boolean;
  errors: string[];
}

/**
 * Validates wheel specifications
 */
export function validateWheelSpecs(specs: WheelSpecs): string[] {
  const errors: string[] = [];

  if (specs.rimEffectiveDiameter <= 0 || specs.rimEffectiveDiameter > 1000) {
    errors.push('Rim effective diameter must be between 1-1000mm');
  }

  if (specs.spokeCount < 8 || specs.spokeCount > 48 || specs.spokeCount % 4 !== 0) {
    errors.push('Spoke count must be between 8-48 and divisible by 4');
  }

  if (specs.crossPattern < 0 || specs.crossPattern > 4) {
    errors.push('Cross pattern must be between 0-4');
  }

  if (specs.hubFlangeDiameter <= 0 || specs.hubFlangeDiameter > 200) {
    errors.push('Hub flange diameter must be between 1-200mm');
  }

  if (specs.hubFlangeDiameter >= specs.rimEffectiveDiameter) {
    errors.push('Hub flange diameter must be smaller than rim diameter');
  }

  return errors;
}

/**
 * Calculates spoke length using the standard bicycle wheel formula
 * L = √[(r - h×cos(θ))² + (h×sin(θ))²]
 * where:
 * - r = rim radius (effective diameter / 2)
 * - h = hub flange radius (flange diameter / 2)
 * - θ = cross angle in radians
 */
export function calculateSpokeLength(specs: WheelSpecs): CalculationResult {
  const errors = validateWheelSpecs(specs);
  
  if (errors.length > 0) {
    return {
      spokeLength: 0,
      isValid: false,
      errors
    };
  }

  const rimRadius = specs.rimEffectiveDiameter / 2;
  const hubFlangeRadius = specs.hubFlangeDiameter / 2;
  
  // Calculate cross angle in radians
  const crossAngleDegrees = (specs.crossPattern * 360) / specs.spokeCount;
  const crossAngleRadians = (crossAngleDegrees * Math.PI) / 180;
  
  // Apply the spoke length formula
  const a = rimRadius - hubFlangeRadius * Math.cos(crossAngleRadians);
  const b = hubFlangeRadius * Math.sin(crossAngleRadians);
  const spokeLength = Math.sqrt(a * a + b * b);

  return {
    spokeLength: Math.round(spokeLength * 10) / 10, // Round to 1 decimal place
    isValid: true,
    errors: []
  };
}

/**
 * Get common wheel sizes for quick selection
 */
export function getCommonWheelSizes(): Array<{name: string, diameter: number}> {
  return [
    { name: '700C (622mm)', diameter: 622 },
    { name: '26" (559mm)', diameter: 559 },
    { name: '27.5" (584mm)', diameter: 584 },
    { name: '29" (622mm)', diameter: 622 },
    { name: '20" (406mm)', diameter: 406 },
    { name: '24" (507mm)', diameter: 507 }
  ];
}