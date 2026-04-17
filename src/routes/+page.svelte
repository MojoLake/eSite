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

      <div class="about-section">
        <img src="/IMG_4668.jpeg" alt="Elias" class="profile-photo" />

        <div class="about-text">
          <p>
            a machine learning engineer at <a
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
            Recently I've been excited about <a href="/rejection-therapy"
              ><Yellow>talking to strangers</Yellow></a
            >, being more social and overall living a less predictable life that
            way!
          </p>
            If anything on this website seems interesting to you, feel free to send me an <a href="mailto:simo.simojoki@gmail.com"><Yellow>email</Yellow></a>.
          <p>

          </p>
        </div>
      </div>
    </div>
  {/if}

  {#if showContent}
    <div class="content-container" in:fade={{ duration: 1000 }}>
      <div class="column">
        <h3><a href="/blogs" class="section-link">Blogs</a></h3>
        <ListComponent
          items={posts}
          basePath="blogs"
          itemType="post"
          showCount={5}
        />
      </div>
      <div class="column">
        <h3><a href="/projects" class="section-link">Projects</a></h3>
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
        <h3><a href="/blogs" class="section-link">Blogs</a></h3>
        <ListComponent
          items={posts}
          basePath="blogs"
          itemType="post"
          showCount={5}
        />
      </div>
      <div class="column">
        <h3><a href="/projects" class="section-link">Projects</a></h3>
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
    border-radius: 0;
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

  .section-link {
    color: inherit;
    text-decoration: none;
  }

  .section-link:hover {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    .content-container {
      flex-direction: column;
      gap: 2rem;
    }
  }
</style>
