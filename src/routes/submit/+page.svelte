<script>
  import { translations } from "$lib/translations.js";
  let name = "",
    address = "",
    note = "",
    submitted = false;
  let lang = "en"; 

  async function submitToSheet() {
    const res = await fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, address, note }),
    });
    let result = await res.json();
    if (res.ok && result.result === "success") {
      alert(translations[lang].submitted);
      name = address = note = "";
      submitted = true;
    } else {
      alert(
        translations[lang].submission_failed +
          " " +
          (result.message || "unknown")
      );
    }
  }
</script>

<div class="flex justify-end mb-4">
  <button
    class="px-2"
    on:click={() => (lang = "en")}
    aria-pressed={lang === "en"}>EN</button
  >
  <button
    class="px-2"
    on:click={() => (lang = "de")}
    aria-pressed={lang === "de"}>DE</button
  >
</div>

{#if import.meta.env.DEV}
  <form
    class="p-4 max-w-xl mx-auto grid gap-3"
    on:submit|preventDefault={submitToSheet}
  >
    <input
      bind:value={name}
      placeholder={translations[lang].name}
      class="border rounded p-2"
      required
    />
    <input
      bind:value={address}
      placeholder={translations[lang].address}
      class="border rounded p-2"
      required
    />
    <textarea
      bind:value={note}
      placeholder={translations[lang].note}
      class="border rounded p-2"
      rows="4"
    ></textarea>
    <button type="submit" class="bg-green-600 text-white py-2 px-4 rounded">
      {translations[lang].submit}
    </button>
  </form>
{:else}
  <p class="text-center text-gray-500 my-10">
    {translations[lang].form_unavailable}
  </p>
{/if}
