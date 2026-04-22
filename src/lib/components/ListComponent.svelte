<script lang="ts">
  let { items, basePath, itemType = "item", showCount = -1 } = $props();
  let displayItems = $derived(
    showCount === -1 ? items : items.slice(0, showCount),
  );
</script>

<div class="main">
  {#each displayItems as item}
    <a href={`/${basePath}/${item.slug}`} class="{itemType}-link">
      <div class={itemType}>
        <h3 class="{itemType}-title">
          {item.title}
        </h3>
        {item.summary}
      </div>
    </a>
  {/each}
</div>

<style>
  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 0.5rem;
  }

  .post-link,
  .project-link,
  .item-link {
    text-decoration: none;
  }

  .post-link:hover,
  .project-link:hover,
  .item-link:hover {
    text-decoration: underline;
  }

  .post-title,
  .project-title,
  .item-title {
    color: var(--secondary-text-colour);
  }
</style>
