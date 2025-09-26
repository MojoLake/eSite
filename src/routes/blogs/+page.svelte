<script lang="ts">
    import type { PageData } from "./$types";
    export let data;
    const { posts } = data;
</script>


<div class="main">
    <h1>Blogs</h1>

    <div class="post">
        {#each posts as post}
           <a href={`/blogs/${post.slug}`} class="post-link"> 
                <div class="post">
                  <h3 class="post-title">
                      {post.title}
                  </h3>
                  {post.summary}
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
    }

    .post-link {
        text-decoration: none;
    }

    .post-link:hover {
        text-decoration: underline;
    }

    .post {
    }

    .post-title {
    }
</style>
