<script lang="ts">
  import { calculateSpokeLength, getCommonWheelSizes, type WheelSpecs, type CalculationResult } from './spokeCalculator';
  
  let rimEffectiveDiameter = 622;
  let spokeCount = 32;
  let crossPattern = 3;
  let hubFlangeDiameter = 60;
  
  let result: CalculationResult = { spokeLength: 0, isValid: false, errors: [] };
  let isCalculating = false;
  
  const commonSizes = getCommonWheelSizes();
  
  function handleCalculate() {
    isCalculating = true;
    
    // Add small delay for smooth UX
    setTimeout(() => {
      const specs: WheelSpecs = {
        rimEffectiveDiameter,
        spokeCount,
        crossPattern,
        hubFlangeDiameter
      };
      
      result = calculateSpokeLength(specs);
      isCalculating = false;
    }, 100);
  }
  
  function selectCommonSize(diameter: number) {
    rimEffectiveDiameter = diameter;
    handleCalculate();
  }
  
  // Auto-calculate when inputs change
  $: if (rimEffectiveDiameter || spokeCount || crossPattern || hubFlangeDiameter) {
    handleCalculate();
  }
</script>

<div class="wheel-builder">
  <div class="header">
    <h1>🚴 Wheelbuilder</h1>
    <p>Professional bicycle wheel spoke length calculator</p>
  </div>
  
  <div class="calculator-container">
    <div class="inputs-section">
      <h2>Wheel Specifications</h2>
      
      <div class="input-group">
        <label for="rim-diameter">Rim Effective Diameter (mm)</label>
        <input
          id="rim-diameter"
          type="number"
          bind:value={rimEffectiveDiameter}
          min="200"
          max="1000"
          step="1"
          class="input-field"
        />
        <div class="common-sizes">
          <span class="label">Common sizes:</span>
          {#each commonSizes as size}
            <button
              type="button"
              class="size-button"
              class:active={rimEffectiveDiameter === size.diameter}
              on:click={() => selectCommonSize(size.diameter)}
            >
              {size.name}
            </button>
          {/each}
        </div>
      </div>
      
      <div class="input-row">
        <div class="input-group">
          <label for="spoke-count">Spoke Count</label>
          <select
            id="spoke-count"
            bind:value={spokeCount}
            class="input-field"
          >
            <option value={16}>16</option>
            <option value={20}>20</option>
            <option value={24}>24</option>
            <option value={28}>28</option>
            <option value={32}>32</option>
            <option value={36}>36</option>
            <option value={40}>40</option>
            <option value={48}>48</option>
          </select>
        </div>
        
        <div class="input-group">
          <label for="cross-pattern">Cross Pattern</label>
          <select
            id="cross-pattern"
            bind:value={crossPattern}
            class="input-field"
          >
            <option value={0}>0-cross (Radial)</option>
            <option value={1}>1-cross</option>
            <option value={2}>2-cross</option>
            <option value={3}>3-cross</option>
            <option value={4}>4-cross</option>
          </select>
        </div>
      </div>
      
      <div class="input-group">
        <label for="hub-flange">Hub Flange Diameter (mm)</label>
        <input
          id="hub-flange"
          type="number"
          bind:value={hubFlangeDiameter}
          min="20"
          max="200"
          step="0.1"
          class="input-field"
        />
      </div>
    </div>
    
    <div class="results-section">
      <h2>Calculation Result</h2>
      
      {#if isCalculating}
        <div class="loading">
          <div class="spinner"></div>
          <p>Calculating...</p>
        </div>
      {:else if result.isValid}
        <div class="result-success">
          <div class="spoke-length">
            <span class="value">{result.spokeLength}</span>
            <span class="unit">mm</span>
          </div>
          <p class="result-label">Required Spoke Length</p>
          <div class="specs-summary">
            <div class="spec">
              <span class="spec-label">Rim:</span>
              <span class="spec-value">{rimEffectiveDiameter}mm</span>
            </div>
            <div class="spec">
              <span class="spec-label">Spokes:</span>
              <span class="spec-value">{spokeCount}</span>
            </div>
            <div class="spec">
              <span class="spec-label">Cross:</span>
              <span class="spec-value">{crossPattern}</span>
            </div>
            <div class="spec">
              <span class="spec-label">Hub:</span>
              <span class="spec-value">{hubFlangeDiameter}mm</span>
            </div>
          </div>
        </div>
      {:else if result.errors.length > 0}
        <div class="result-error">
          <h3>⚠️ Validation Errors</h3>
          <ul>
            {#each result.errors as error}
              <li>{error}</li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .wheel-builder {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Inter', system-ui, sans-serif;
  }
  
  .header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .header h1 {
    font-size: 3rem;
    font-weight: 700;
    color: #1e40af;
    margin-bottom: 0.5rem;
    text-shadow: 0 2px 4px rgba(30, 64, 175, 0.1);
  }
  
  .header p {
    font-size: 1.1rem;
    color: #64748b;
    font-weight: 400;
  }
  
  .calculator-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    background: white;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;
  }
  
  .inputs-section h2,
  .results-section h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 0.5rem;
  }
  
  .input-group {
    margin-bottom: 1.5rem;
  }
  
  .input-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  label {
    display: block;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
  
  .input-field {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s ease;
    background-color: #ffffff;
  }
  
  .input-field:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
  
  .common-sizes {
    margin-top: 0.75rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }
  
  .label {
    font-size: 0.8rem;
    color: #64748b;
    font-weight: 500;
  }
  
  .size-button {
    padding: 0.25rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: #f8fafc;
    color: #374151;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .size-button:hover {
    background: #e2e8f0;
    border-color: #94a3b8;
  }
  
  .size-button.active {
    background: #2563eb;
    color: white;
    border-color: #2563eb;
  }
  
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
    color: #64748b;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e2e8f0;
    border-top: 3px solid #2563eb;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .result-success {
    text-align: center;
    padding: 1.5rem 0;
  }
  
  .spoke-length {
    display: flex;
    align-items: baseline;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .spoke-length .value {
    font-size: 3.5rem;
    font-weight: 700;
    color: #059669;
  }
  
  .spoke-length .unit {
    font-size: 1.2rem;
    color: #64748b;
    margin-left: 0.5rem;
  }
  
  .result-label {
    font-size: 1.1rem;
    color: #374151;
    font-weight: 500;
    margin-bottom: 1.5rem;
  }
  
  .specs-summary {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    background: #f8fafc;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
  }
  
  .spec {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
  }
  
  .spec-label {
    color: #64748b;
    font-weight: 500;
  }
  
  .spec-value {
    color: #1e293b;
    font-weight: 600;
  }
  
  .result-error {
    padding: 1.5rem;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 8px;
  }
  
  .result-error h3 {
    color: #dc2626;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  .result-error ul {
    color: #991b1b;
    margin: 0;
    padding-left: 1.5rem;
  }
  
  .result-error li {
    margin-bottom: 0.5rem;
  }
  
  @media (max-width: 768px) {
    .wheel-builder {
      padding: 1rem;
    }
    
    .header h1 {
      font-size: 2rem;
    }
    
    .calculator-container {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 1.5rem;
    }
    
    .input-row {
      grid-template-columns: 1fr;
    }
    
    .common-sizes {
      justify-content: center;
    }
    
    .specs-summary {
      grid-template-columns: 1fr;
    }
    
    .spoke-length .value {
      font-size: 2.5rem;
    }
  }
</style>