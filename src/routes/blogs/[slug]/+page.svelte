<script lang="ts">

  const { data } = $props<{
    data: { slug: string; title: string; date: string; summary: string; content: string; }
  }>();

  const modules = import.meta.glob('$lib/content/blogs/*.svx');

  console.log(`Available keys: ${Object.keys(modules)}`);
  const key = `/src/lib/content/blogs/${data.slug}.svx`;
  console.log(`key: ${key}`);
  if (!modules[key]) {
    throw new Error(`Omg post not found: ${data.slug}`);
  }

  let ContentComponent: any = $state(null);

  $effect(async() => {
    const mod: any = await modules[key]();
    ContentComponent = mod.default;
  });

</script>

<div class="main">
  <h1 class="title">{data.title}</h1>
  <div class="summary">
    <p> 
      <span style="color: var(--secondary-text-colour)">Summary:</span>
      {data.summary}
    </p>
  </div>
  {#if ContentComponent}
    <div class="blog-text">
      <ContentComponent />
    </div>
  {/if}
</div>


<style>

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; 

    padding: 2rem 0.75rem;
    margin: 0 auto;
    max-width: 60rem;
  }

  .summary {
    font-size: 2rem;
  }

  .blog-text {
    font-size: 1.0rem;
  }
  .blog-text :global(a) {
    color: var(--secondary-text-colour);
  }

  .blog-text :global(mark) {
    color: var(--secondary-text-colour);
    background: var(--background-colour);
  }
</style>
