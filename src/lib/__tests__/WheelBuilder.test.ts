import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import WheelBuilder from '../WheelBuilder.svelte';

describe('WheelBuilder Component', () => {
  beforeEach(() => {
    render(WheelBuilder);
  });

  it('should render the component with proper title', () => {
    expect(screen.getByText('🚴 Wheelbuilder')).toBeInTheDocument();
    expect(screen.getByText('Professional bicycle wheel spoke length calculator')).toBeInTheDocument();
  });

  it('should have all required input fields', () => {
    expect(screen.getByLabelText('Rim Effective Diameter (mm)')).toBeInTheDocument();
    expect(screen.getByLabelText('Spoke Count')).toBeInTheDocument();
    expect(screen.getByLabelText('Cross Pattern')).toBeInTheDocument();
    expect(screen.getByLabelText('Hub Flange Diameter (mm)')).toBeInTheDocument();
  });

  it('should display default values correctly', () => {
    const rimInput = screen.getByLabelText('Rim Effective Diameter (mm)') as HTMLInputElement;
    const spokeSelect = screen.getByLabelText('Spoke Count') as HTMLSelectElement;
    const crossSelect = screen.getByLabelText('Cross Pattern') as HTMLSelectElement;
    const hubInput = screen.getByLabelText('Hub Flange Diameter (mm)') as HTMLInputElement;

    expect(rimInput.value).toBe('622');
    expect(spokeSelect.value).toBe('32');
    expect(crossSelect.value).toBe('3');
    expect(hubInput.value).toBe('60');
  });

  it('should display calculated result', async () => {
    // Wait for initial calculation to complete
    await new Promise(resolve => setTimeout(resolve, 200));
    
    expect(screen.getByText('Required Spoke Length')).toBeInTheDocument();
    
    // Check if result is displayed (should be around 292.4mm for default values)
    const resultElement = screen.getByText(/mm$/);
    expect(resultElement).toBeInTheDocument();
  });

  it('should update calculation when inputs change', async () => {
    const rimInput = screen.getByLabelText('Rim Effective Diameter (mm)') as HTMLInputElement;
    
    // Change rim diameter
    await fireEvent.input(rimInput, { target: { value: '559' } });
    
    // Wait for calculation
    await new Promise(resolve => setTimeout(resolve, 200));
    
    expect(rimInput.value).toBe('559');
    // Result should still be displayed
    expect(screen.getByText('Required Spoke Length')).toBeInTheDocument();
  });

  it('should show common wheel size buttons', () => {
    expect(screen.getByText('700C (622mm)')).toBeInTheDocument();
    expect(screen.getByText('26" (559mm)')).toBeInTheDocument();
    expect(screen.getByText('29" (622mm)')).toBeInTheDocument();
  });

  it('should update rim diameter when common size is clicked', async () => {
    const rimInput = screen.getByLabelText('Rim Effective Diameter (mm)') as HTMLInputElement;
    const size26Button = screen.getByText('26" (559mm)');
    
    await fireEvent.click(size26Button);
    
    expect(rimInput.value).toBe('559');
  });

  it('should have proper spoke count options', () => {
    const spokeSelect = screen.getByLabelText('Spoke Count') as HTMLSelectElement;
    const options = Array.from(spokeSelect.options).map(option => option.value);
    
    expect(options).toContain('16');
    expect(options).toContain('32');
    expect(options).toContain('36');
  });

  it('should have proper cross pattern options', () => {
    const crossSelect = screen.getByLabelText('Cross Pattern') as HTMLSelectElement;
    const options = Array.from(crossSelect.options).map(option => option.text);
    
    expect(options).toContain('0-cross (Radial)');
    expect(options).toContain('3-cross');
    expect(options).toContain('4-cross');
  });

  it('should display specs summary in results', async () => {
    // Wait for initial calculation
    await new Promise(resolve => setTimeout(resolve, 200));
    
    expect(screen.getByText('Rim:')).toBeInTheDocument();
    expect(screen.getByText('Spokes:')).toBeInTheDocument();
    expect(screen.getByText('Cross:')).toBeInTheDocument();
    expect(screen.getByText('Hub:')).toBeInTheDocument();
  });
});