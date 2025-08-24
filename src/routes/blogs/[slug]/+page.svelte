<script lang="ts">

  const { data } = $props<{
    data: { slug: string; title: string; date: string; summary: string; }
  }>();

  const modules = import.meta.glob('$lib/content/blogs/*.svx');

  console.log(`Available keys: ${Object.keys(modules)}`);
  const key = `/src/lib/content/blogs/${data.slug}.svx`;
  console.log(`key: ${key}`);
  if (!modules[key]) {
    throw new Error(`Omg post not found: ${data.slug}`);
  }

  const { default: content } = await modules[key]();
</script>

<h1>{data.title}</h1>
{data.summary}
<svelte:component this={content} />

