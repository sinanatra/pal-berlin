<script>
  import { translations } from "$lib/translations.js";
  import CartoNo from "$lib/components/CartoNo.svelte";
  export let data;
  let lang =
    typeof navigator !== "undefined" && navigator.language.startsWith("de")
      ? "de"
      : "en";
  $: t = translations[lang];
  let password = "";
  let loading = false;
  function toggleLang() {
    lang = lang === "en" ? "de" : "en";
  }
</script>

<div class="wall-root">
  <CartoNo  />
  <div class="button-row">
    <button>{t.about}</button>
    <button>{t.contribute}</button>
    <button class="lang-btn">{lang === "en" ? "DE" : "EN"}</button>
  </div>
  <div class="modal-bg auth-bg">
    <div class="modal-content auth-content" on:click|stopPropagation>
      <div class="about-short" style="margin-bottom:1.1em;">
        {t.login_about}
      </div>
      <form
        method="POST"
        class="login-form"
        on:submit={() => (loading = true)}
        autocomplete="off"
      >
        <input
          name="password"
          type="password"
          bind:value={password}
          required
          placeholder="Password"
        />
        {#if data?.incorrect}
          <div class="text-red-600 text-sm text-center mt-1">
            {t.incorrect || "Incorrect password"}
          </div>
        {/if}
        <button
          type="submit"
          class="main-btn"
          disabled={loading}
          style="width:100%;margin-top:10px;"
        >
          {#if loading}
            <span class="loader"></span> {t.login_btn || "Login"}...
          {:else}
            {t.login_btn || "Login"}
          {/if}
        </button>
      </form>
      <button class="lang-btn" on:click={toggleLang} style="margin-top:1.2em">
        {lang === "en" ? "DE" : "EN"}
      </button>
    </div>
  </div>
</div>

<style>
  .about-short {
    font-size: 1rem;
    color: var(--color-1);
    background: #f7f4fc;
    border-radius: 8px;
    padding: 0.75em 1em;
    box-shadow: 0 1px 7px 0 rgba(110, 0, 150, 0.05);
    text-align: center;
    font-weight: 500;
  }
  .wall-root {
    position: relative;
    min-height: 100vh;
    width: 100vw;
  }
  .modal-bg.auth-bg {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba(44, 30, 70, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(0.5px);
  }
  .modal-content.auth-content {
    background: rgba(255, 255, 255, 0.98);
    border-radius: 14px;
    padding: 28px 24px 20px 24px;
    min-width: 270px;
    box-shadow: 0 6px 44px 0 rgba(110, 0, 150, 0.13);
    display: flex;
    flex-direction: column;
    gap: 11px;
    width: 96vw;
    max-width: 340px;
    animation: fadeIn 0.22s cubic-bezier(0.4, 1.3, 0.7, 1) both;
  }
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  input {
    font-size: 18px;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 10px 8px;
    outline: none;
    background: #faf8ff;
    transition: border 0.16s;
    margin-bottom: 0.7em;
  }
  input:focus {
    border: 1.5px solid var(--color-1);
    background: #fff;
  }

  .main-btn {
    background: var(--color-1, #222);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 19px;
    font-weight: 600;
    padding: 10px 0;
    cursor: pointer;
    transition: background 0.17s;
    box-shadow: 0 1px 6px rgba(120, 0, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .main-btn:hover:not([disabled]) {
    background: var(--color-2);
  }
  .main-btn[disabled],
  input[disabled] {
    opacity: 0.6;
    pointer-events: none;
  }
  .loader {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 2.5px solid #fff;
    border-top: 2.5px solid var(--color-2);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    margin-right: 3px;
  }

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

  .button-row button {
    background: rgba(255, 255, 255, 0.92);
    color: var(--color-1);
    border-radius: 3px;
    font-size: 20px;
    border: none;
    cursor: pointer;
    border-radius: 10px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
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
