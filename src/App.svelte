<script lang="ts">
  import WheelBuilder from './lib/WheelBuilder.svelte'
</script>

<main>
  <WheelBuilder />
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    min-height: 100vh;
    font-family: 'Inter', system-ui, sans-serif;
  }
  
  main {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
  }
</style>