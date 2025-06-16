<header class="map-header">
  <h1>
    Palestine Solidarity Map <span>– Berlin</span>
  </h1>
</header>

<style>
  .map-header {
    color: var(--color-1);
    background: white;
    border-radius: 10px;
    position: fixed;
    left: 50%;
    top: 12px;
    transform: translateX(-50%);
    padding: 10px 24px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    z-index: 100;
    text-align: center;
    letter-spacing: 0.01em;
  }

  .map-header h1 {
    font-size: 22px;
    font-weight: 400;
    margin: 0;
    padding: 0;
    line-height: 1.4;
  }

  .map-header h1 span {
    display: inline;
    font-size: 18px;
    font-weight: 400;
    color: inherit;
  }

  @media (max-width: 480px) {
    .map-header {
      padding: 4px 8px;
    }

    .map-header h1 {
      font-size: 18px;
    }

    .map-header h1 span {
      font-size: 14px;
    }
  }
</style>
