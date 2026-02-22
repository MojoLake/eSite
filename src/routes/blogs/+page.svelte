<script lang="ts">
  import ListComponent from "$lib/components/ListComponent.svelte";
  import Yellow from "$lib/components/Yellow.svelte";

  let { data } = $props();
  const { regularPosts, spanishPreviewPosts } = data;
</script>

<div class="blogs-page">
  <div class="columns">
    <section class="column featured-column">
      <h1>My <Yellow>blogs</Yellow></h1>
      <ListComponent items={regularPosts} basePath="blogs" itemType="post" showCount={-1} />
    </section>

    <aside class="column">
      <h2>Spanish writing</h2>
      <p class="description">
        I am learning Spanish, so this section has my Spanish posts and song translations.
      </p>

        <ListComponent
          items={spanishPreviewPosts}
          basePath="blogs"
          itemType="post"
          showCount={-1}
      />
      <a class="spanish-link" href="/blogs/spanish">Go to Spanish writings →</a>
    </aside>
  </div>
</div>

<style>
  .blogs-page {
    max-width: 60rem;
    margin: 0 auto;
    padding: 0 0.5rem;
  }

  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
  }

  .column h1,
  .column h2 {
    color: var(--primary-title-colour);
    margin-bottom: 1rem;
  }

  .description {
    margin-top: 0;
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .featured-column {
    padding: 1rem;
    border: 1px solid rgba(114, 197, 233, 0.2);
    border-radius: 8px;
    background: rgba(114, 197, 233, 0.05);
  }

  .spanish-link {
    display: inline-block;
    margin-top: 1rem;
    color: var(--secondary-text-colour);
    text-decoration: none;
  }

  .spanish-link:hover {
    text-decoration: underline;
  }

  @media (max-width: 777px) {
    .columns {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
</style>
