<script lang="ts">
    import BlogsComponent from '$lib/components/BlogsComponent.svelte';

    export let data;
    const { posts } = data;
</script>

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

   .bottom-text {
        text-align: center;
        font-size: 1.0rem;
        margin: 5rem auto;
   }

</style>


<div class="home">
    <h1>hi! i'm
        <a style="text-decoration: underline; color: var(--secondary-text-colour)" href="/elias">
            elias
        </a>
    </h1>

    <p class="main-text">
      Welcome to the website!
      Have a deep breath and enjoy :)
    </p>

    <BlogsComponent posts={posts} showCount=5 />
</div>

