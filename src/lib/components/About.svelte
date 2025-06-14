<script>
  export let t;
</script>

<section>
  <p style="white-space: pre-line;">{t.about_text}</p>
</section>

<div class="contact-info">
  <a href="mailto:gn@gmail.com">Contact</a>
</div>

<style>
  section {
    font-size: 19px;
  }

  .contact-info {
    position: fixed;
    bottom: 10px;
    right: 10px;
    background: rgba(255, 255, 255, 0.9);
    padding: 5px 10px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
    font-size: 1em;
    z-index: 1100;
  }

  a {
    color: var(--color-1);
  }
</style>
