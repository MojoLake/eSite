<script lang="ts">
    import type { PageData } from "./$types";
    import Yellow from '$lib/components/Yellow.svelte';

    export let data;
    const { posts } = data;
</script>


<div class="main">
    <h1 class="page-title">My (currently few) <Yellow>blog</Yellow> posts</h1>

    <div class="post">
        {#each posts as post}
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

    .page-title {
        text-align: center;
        color: var(--primary-title-colour);
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
