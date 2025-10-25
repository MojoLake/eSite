<script lang="ts">
  import Yellow from '$lib/components/Yellow.svelte';
  import BlogsComponent from '$lib/components/BlogsComponent.svelte';

  let { posts, showCount } = $props();
</script>


<div class="main">
    <h1 class="page-title">My (currently few) <Yellow>blog</Yellow> posts</h1>
    <BlogsComponent posts={posts} showCount={showCount} />
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
