<script lang="ts">
  import ListComponent from "$lib/components/ListComponent.svelte";
  import Yellow from "$lib/components/Yellow.svelte";

  let { data } = $props();
  const { hiddenPosts } = data;
</script>

<div class="hidden-blogs-page">
  <h1><Yellow>Hidden</Yellow> blogs</h1>
  <p class="description">
    The blogs where I share too much information or for some other reason am unsure of releasing on the main page.
  </p>

  {#if hiddenPosts.length > 0}
    <ListComponent items={hiddenPosts} basePath="blogs" itemType="post" showCount={-1} />
  {:else}
    <p>No hidden blogs yet.</p>
  {/if}
</div>

<style>
  .hidden-blogs-page {
    max-width: 48rem;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  h1 {
    color: var(--primary-title-colour);
    margin-bottom: 0.75rem;
  }

  .description {
    margin-top: 0;
    margin-bottom: 2rem;
    line-height: 1.6;
  }
</style>
