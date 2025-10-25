<script lang="ts">
    let { posts, showCount } = $props();
</script>

<div class="main">
    <div class="post">
        {#each showCount == -1 ? posts : posts.slice(0, showCount) as post}
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
</div>

<style>
    .main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
