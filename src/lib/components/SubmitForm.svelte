<script>
  export let translations = {};
  export let lang = "en";
  export let onSuccess = () => {};

  $: t = translations && translations[lang] ? translations[lang] : {};

  let name = "";
  let address = "";
  let note = "";
  let submitted = false;
  let loading = false;

  async function submitToSheet() {
    loading = true;
    try {
      const res = await fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, address, note }),
      });
      let result = await res.json();
      if (res.ok && result.result === "success") {
        name = address = note = "";
        submitted = true;
        onSuccess();
      } else {
        alert(
          (t.submission_failed || "Submission failed:") +
            " " +
            (result.message || "unknown")
        );
      }
    } catch (err) {
      alert((t.submission_failed || "Submission failed:") + " Network error");
    }
    loading = false;
  }
</script>

{#if submitted}
  <div class="text-center text-green-700 font-bold py-10">
    {t.submitted || "Submitted!"}
  </div>
{:else}
  <form
    class="p-4 max-w-xl mx-auto grid gap-3"
    on:submit|preventDefault={submitToSheet}
    autocomplete="off"
  >
    <input
      bind:value={name}
      placeholder={t.name || "Name"}
      class="border rounded p-2"
      required
      autocomplete="off"
      disabled={loading}
    />
    <input
      bind:value={address}
      placeholder={t.address || "Address"}
      class="border rounded p-2"
      required
      autocomplete="off"
      disabled={loading}
    />
    <textarea
      bind:value={note}
      placeholder={t.note || "Your note or story"}
      class="border rounded p-2"
      rows="4"
      disabled={loading}
    ></textarea>
    <button
      type="submit"
      class="bg-green-600 text-white py-2 px-4 rounded font-semibold"
      disabled={loading}
    >
      {#if loading}
        <span class="loader"></span> {t.submit || "Submit"}...
      {:else}
        {t.submit || "Submit"}
      {/if}
    </button>
  </form>
{/if}

<style>
  form {
    background: rgba(255, 255, 255, 0.94);
    border-radius: 10px;
    padding: 10px;
    margin: 0 auto;
    display: grid;
    gap: 10px;
  }
  input,
  textarea {
    font-size: 18px;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 10px 5px;
    outline: none;
    background: #faf8ff;
    transition: border 0.16s;
  }
  input:focus,
  textarea:focus {
    border: 1.5px solid var(--color-1);
    background: #fff;
  }
  textarea {
    resize: vertical;
    min-height: 64px;
    max-height: 260px;
  }
  button[type="submit"] {
    background: var(--color-1);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 19px;
    font-weight: 600;
    padding: 10px;
    margin-top: 4px;
    cursor: pointer;
    box-shadow: 0 1px 6px rgba(120, 0, 255, 0.1);
    transition: background 0.17s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  button[type="submit"]:hover {
    background: #6f00bb;
  }
  button[disabled],
  input[disabled],
  textarea[disabled] {
    opacity: 0.6;
    pointer-events: none;
  }
  .loader {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 2.5px solid #fff;
    border-top: 2.5px solid #b871e7;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    margin-right: 3px;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
