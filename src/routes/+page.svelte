<script lang="ts">
  import ListComponent from "$lib/components/ListComponent.svelte";

  let { data } = $props();
  const { posts } = data;
</script>

<div class="home">
  <h1>
    hi! i'm
    <a
      style="text-decoration: underline; color: var(--secondary-text-colour)"
      href="/elias"
    >
      elias
    </a>
  </h1>

  <p class="main-text">
    Welcome to the website! Have a deep breath and enjoy :)
  </p>

  <div class="blog-container">
    <h3>Here's a list of blogs I've written:</h3>

    <ListComponent
      items={posts}
      basePath="blogs"
      itemType="post"
      showCount={5}
    />
  </div>
</div>

<style>
  h1 {
    text-align: center;
    font-size: 4rem;
    white-space: normal;
    overflow-wrap: break-word;
    color: var(--primary-title-colour);
  }

  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 50rem;
    margin: 2rem auto;
  }

  .main-text {
    font-size: 1.5rem;
    text-align: center;
    margin: auto 0.1rem;
  }

  .blog-container {
    margin: 4rem auto;
  }
</style>
