<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import ListComponent from "$lib/components/ListComponent.svelte";
  import Yellow from "$lib/components/Yellow.svelte";

  let { data } = $props();
  const { posts, projects } = data;

  let showHeader = $state(false);
  let showContent = $state(false);

  onMount(() => {
    // Show header immediately to trigger the transition
    showHeader = true;

    // Show content after header animation completes
    setTimeout(() => {
      showContent = true;
    }, 1300);
  });
</script>

<div class="home">
  {#if showHeader}
    <div class="header-container">
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
            I have won multiple hackathons, built a custom drone and been a
            cyber security researcher at the Finnish Defence Research Agency.
          </p>
        </div>
      </div>
    </div>
  {/if}

  {#if showContent}
    <div class="content-container" in:fade={{ duration: 1000 }}>
      <div class="column">
        <h3>Blogs</h3>
        <ListComponent
          items={posts}
          basePath="blogs"
          itemType="post"
          showCount={5}
        />
      </div>
      <div class="column">
        <h3>Projects</h3>
        <ListComponent
          items={projects}
          basePath="projects"
          itemType="project"
          showCount={5}
        />
      </div>
    </div>
  {:else}
    <div class="content-container" style="opacity: 0;">
      <div class="column">
        <h3>Blogs</h3>
        <ListComponent
          items={posts}
          basePath="blogs"
          itemType="post"
          showCount={5}
        />
      </div>
      <div class="column">
        <h3>Projects</h3>
        <ListComponent
          items={projects}
          basePath="projects"
          itemType="project"
          showCount={5}
        />
      </div>
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

  .content-container {
    display: flex;
    gap: 3rem;
    margin: 4rem auto;
    width: 100%;
  }

  .column {
    flex: 1;
    min-width: 0;
  }

  .column h3 {
    margin-bottom: 1rem;
  }

  @media (max-width: 600px) {
    .content-container {
      flex-direction: column;
      gap: 2rem;
    }
  }
</style>
