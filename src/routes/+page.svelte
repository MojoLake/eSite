<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import type { TransitionConfig } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import ListComponent from "$lib/components/ListComponent.svelte";
  import Yellow from "$lib/components/Yellow.svelte";

  let { data } = $props();
  const { posts } = data;

  let showHeader = $state(false);
  let showBlogs = $state(false);

  // Custom transition that slides from center of viewport to final position
  function slideFromCenter(node: Element): TransitionConfig {
    const rect = node.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const elementCenter = rect.top + rect.height / 2;
    const offset = viewportCenter - elementCenter;

    return {
      delay: 500,
      duration: 800,
      easing: cubicOut,
      css: (t: number) => {
        const currentOffset = offset * (1 - t);
        return `transform: translateY(${currentOffset}px);`;
      },
    };
  }

  onMount(() => {
    // Show header immediately to trigger the transition
    showHeader = true;

    // Show blogs after header animation completes
    setTimeout(() => {
      showBlogs = true;
    }, 1300);
  });
</script>

<div class="home">
  {#if showHeader}
    <div class="header-container" in:slideFromCenter>
      <h1>
        hi! i'm <span style="color: var(--secondary-text-colour)">elias</span>,
      </h1>

      <!-- <p class="welcome-text">
        Welcome to the website! Have a deep breath and enjoy :)
      </p> -->

      <div class="about-section">
        <img src="/IMG_4668.jpeg" alt="Elias" class="profile-photo" />

        <div class="about-text">
          <p>
            an ML engineer at <a
              href="https://hamina.com"
              target="_blank"
              rel="noopener noreferrer"><Yellow>Hamina Wireless</Yellow></a
            >
            and a mathematics student at
            <a
              href="https://www.aalto.fi/en"
              target="_blank"
              rel="noopener noreferrer"><Yellow>Aalto University</Yellow></a
            > with a background in competitive programming (NCPC winner, IOI team
            🇫🇮).
          </p>
          <p>
            I love building stuff. I have won multiple hackathons, built a
            custom drone and multiple other personal projects.
          </p>
        </div>
      </div>
    </div>
  {/if}

  {#if showBlogs}
    <div class="blog-container" in:fade={{ duration: 1000 }}>
      <h3>Here's a list of blogs I've written:</h3>

      <ListComponent
        items={posts}
        basePath="blogs"
        itemType="post"
        showCount={5}
      />
    </div>
  {:else}
    <div class="blog-container" style="opacity: 0;">
      <h3>Here's a list of blogs I've written:</h3>

      <ListComponent
        items={posts}
        basePath="blogs"
        itemType="post"
        showCount={5}
      />
    </div>
  {/if}
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

  .header-container {
    width: 100%;
  }

  .about-section {
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    margin: 2rem 1rem;
  }

  .profile-photo {
    flex-shrink: 0;
    width: 200px;
    height: 200px;
    border-radius: 8px;
    object-fit: cover;
  }

  .about-text {
    font-size: 1.2rem;
  }

  .about-text p {
    margin: 0 0 1rem 0;
    line-height: 1.6;
  }

  .about-text p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 600px) {
    .about-section {
      flex-direction: column;
      align-items: center;
    }

    .about-text {
      text-align: center;
    }
  }

  .contact-text {
    text-align: center;
    font-size: 1rem;
    margin: 2rem auto;
  }

  .blog-container {
    margin: 4rem auto;
  }
</style>
