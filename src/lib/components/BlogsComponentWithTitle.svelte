<script lang="ts">
  import Yellow from "$lib/components/Yellow.svelte";
  import ListComponent from "$lib/components/ListComponent.svelte";

  let { posts, showCount } = $props();
</script>

<div class="main">
  <h1 class="page-title">My (currently few) <Yellow>blog</Yellow> posts</h1>
  <ListComponent items={posts} basePath="blogs" itemType="post" {showCount} />
</div>

<style>
  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 0.5rem;
  }

  .page-title {
    text-align: center;
    color: var(--primary-title-colour);
  }
</style>
