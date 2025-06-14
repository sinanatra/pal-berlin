<script>
  import Header from "$lib/components/Header.svelte";
  import Map from "$lib/components/Map.svelte";
  import About from "$lib/components/About.svelte";
  import SubmitForm from "$lib/components/SubmitForm.svelte";
  import { translations } from "$lib/translations.js";

  let lang =
    typeof navigator !== "undefined" && navigator.language.startsWith("de")
      ? "de"
      : "en";
  let showAbout = false;
  let showSubmit = false;

  $: t = translations[lang];

  function toggleLang() {
    lang = lang === "en" ? "de" : "en";
  }
</script>

<Header />
<Map />

<div class="button-row">
  <button on:click={() => (showAbout = true)} class="main-btn">{t.about}</button
  >
  <button on:click={() => (showSubmit = true)} class="main-btn"
    >{t.contribute}</button
  >
  <button on:click={toggleLang} class="lang-btn"
    >{lang === "en" ? "DE" : "EN"}</button
  >
</div>

{#if showAbout}
  <div class="modal-bg" on:click={() => (showAbout = false)}>
    <div class="modal-content" on:click|stopPropagation>
      <!-- <button class="close-btn" on:click={() => (showAbout = false)}>×</button> -->
      <About {t} />
    </div>
  </div>
{/if}

{#if showSubmit}
  <div class="modal-bg" on:click={() => (showSubmit = false)}>
    <div class="modal-content" on:click|stopPropagation>
      <!-- <button class="close-btn" on:click={() => (showSubmit = false)}>×</button> -->
      <SubmitForm
        {translations}
        {lang}
        onSuccess={() => setTimeout(() => (showSubmit = false), 1200)}
      />
    </div>
  </div>
{/if}

<style>
  .button-row {
    position: fixed;
    left: 50%;
    bottom: 10px;
    z-index: 40;
    display: flex;
    gap: 10px;
    transform: translateX(-50%);
    pointer-events: none;
  }

  .button-row > * {
    pointer-events: auto;
  }

  button {
    background: rgba(255, 255, 255, 0.92);
    border-radius: 3px;
    font-size: 20px;
    border: none;
    cursor: pointer;
    border-radius: 10px;
  }

  button:hover {
    background: var(--color-1);
    color: white;
  }

  .modal-bg {
    position: fixed;
    inset: 0;
    z-index: 50;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    position: relative;
    background: #fff;
    max-width: 92vw;
    width: 650px;
    padding: 10px;
    border-radius: 10px;
    min-height: 170px;
  }

  @media (max-width: 520px) {
    .modal-content {
      width: 90vw;
    
    }
    .button-row {
      gap: 0.7rem;
      bottom: 1.1rem;
    }

    .main-btn,
    .lang-btn {
      font-size: 1rem;
      padding: 0.8em 1.2em;
    }
  }
  @keyframes fadeIn {
    0% {
      transform: scale(0.92);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
