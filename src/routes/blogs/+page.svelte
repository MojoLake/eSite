<script lang="ts">
    import type { PageData } from "./$types";
    export let data;
    const { posts } = data;
</script>

<h1>Blog</h1>
{#each posts as post}
  {post.title}
  {post.summary}
  {post.slug}
{/each}


<style>
</style>
