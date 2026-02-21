<script lang="ts">
  import ListComponent from "$lib/components/ListComponent.svelte";
  import Yellow from "$lib/components/Yellow.svelte";

  let { data } = $props();
  const { spanishWritingPosts, spanishSongTranslationPosts } = data;
</script>

<div class="spanish-page">
  <a class="back-link" href="/blogs">← Back to eBlogs</a>
  <h1>My <Yellow>Spanish</Yellow> writing</h1>
  <p class="intro">
    I am learning Spanish and publishing my practice here. Song translations are included below too.
  </p>

  <div class="sections">
    <section class="section">
      <h2>Spanish writings</h2>
      {#if spanishWritingPosts.length > 0}
        <ListComponent items={spanishWritingPosts} basePath="blogs" itemType="post" showCount={-1} />
      {:else}
        <p class="empty-state">No Spanish writings yet.</p>
      {/if}
    </section>

    <section class="section">
      <h2>Song translations</h2>
      {#if spanishSongTranslationPosts.length > 0}
        <ListComponent
          items={spanishSongTranslationPosts}
          basePath="blogs"
          itemType="post"
          showCount={-1}
        />
      {:else}
        <p class="empty-state">No song translations yet.</p>
      {/if}
    </section>
  </div>
</div>

<style>
  .spanish-page {
    max-width: 60rem;
    margin: 0 auto;
    padding: 1rem 0.5rem;
  }

  .back-link {
    display: inline-block;
    margin-bottom: 0.75rem;
    color: var(--secondary-text-colour);
    text-decoration: none;
  }

  .back-link:hover {
    text-decoration: underline;
  }

  h1 {
    color: var(--primary-title-colour);
    margin-bottom: 0.5rem;
  }

  .intro {
    margin-top: 0;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .sections {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
  }

  .section h2 {
    margin-bottom: 1rem;
    color: var(--primary-title-colour);
  }

  .empty-state {
    opacity: 0.8;
    font-style: italic;
  }

  @media (max-width: 777px) {
    .sections {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
</style>
