<script lang="ts">
    import type { PageData } from "./$types";
    export let data;
    const { posts } = data;
</script>


<div class="main">
    <h1>Blog</h1>

    <div class="post">
        {#each posts as post}
          {post.title}
          {post.summary}
          <a href={`/blogs/${post.slug}`}>{post.slug}</a>
        {/each}
    </div>
</div>


<style>
    .main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .post {
    }
</style>
