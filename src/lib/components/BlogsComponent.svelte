<script lang="ts">
  let { posts, showCount } = $props();
  let displayPosts = $derived(
    showCount === -1 ? posts : posts.slice(0, showCount)
  );
</script>

<div class="main">
  {#each displayPosts as post}
    <a href={`/blogs/${post.slug}`} class="post-link">
      <div class="post">
        <h3 class="post-title">
          {post.title}
        </h3>
        &nbsp;{post.summary}
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

  .post-link {
    text-decoration: none;
  }

  .post-link:hover {
    text-decoration: underline;
  }

  .post-title {
    color: var(--secondary-text-colour);
  }
</style>
