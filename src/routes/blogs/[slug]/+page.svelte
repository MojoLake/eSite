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

<h1>{data.title}</h1>
{data.summary}
moi
moi
{#if ContentComponent}
  
  <svelte:component this={ContentComponent} />
{/if}
