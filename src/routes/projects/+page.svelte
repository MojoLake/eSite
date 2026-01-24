<script lang="ts">
  let { data } = $props();
  const { projects } = data;
</script>

<div class="container">
  <h1>eProjects</h1>
  <p class="subtitle">Things I've built that you can try out.</p>

  <div class="projects">
    {#each projects as project}
      <div class="project-card">
        <div class="project-header">
          <h3>{project.title}</h3>
        </div>
        <p>{project.summary}</p>
        <div class="project-links">
          {#if project.liveUrl}
            <a href={project.liveUrl} target="_blank" class="link-badge live">
              <span class="link-icon">🌐</span> Live
              <span class="external-link">↗</span>
            </a>
          {/if}
          {#if project.githubUrl}
            <a href={project.githubUrl} target="_blank" class="link-badge github">
              <span class="link-icon">⌨</span> GitHub
              <span class="external-link">↗</span>
            </a>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .container {
    max-width: 48rem;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  h1 {
    text-align: center;
    font-size: 3rem;
    color: var(--primary-title-colour);
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
  }

  .subtitle {
    text-align: center;
    font-size: 1.1rem;
    color: var(--primary-text-colour);
    opacity: 0.8;
    margin-bottom: 3rem;
  }

  .projects {
    display: grid;
    gap: 1.5rem;
  }

  .project-card {
    display: block;
    position: relative;
    padding: 1.5rem;
    background: rgba(114, 197, 233, 0.05);
    border: 1px solid rgba(114, 197, 233, 0.15);
    border-radius: 8px;
  }

  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .project-card h3 {
    font-size: 1.3rem;
    color: var(--primary-title-colour);
    margin: 0 0 0.75rem 0;
  }

  .project-card p {
    font-size: 1rem;
    color: var(--primary-text-colour);
    margin: 0 0 1.25rem 0;
    line-height: 1.6;
    opacity: 0.9;
  }

  .project-links {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .link-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    font-size: 0.85rem;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .link-badge.live {
    background: rgba(237, 204, 112, 0.15);
    color: var(--secondary-text-colour);
    border: 1px solid rgba(237, 204, 112, 0.3);
  }

  .link-badge.live:hover {
    background: rgba(237, 204, 112, 0.25);
    border-color: rgba(237, 204, 112, 0.5);
    transform: translateY(-2px);
  }

  .link-badge.github {
    background: rgba(114, 197, 233, 0.1);
    color: var(--primary-title-colour);
    border: 1px solid rgba(114, 197, 233, 0.2);
  }

  .link-badge.github:hover {
    background: rgba(114, 197, 233, 0.2);
    border-color: rgba(114, 197, 233, 0.4);
    transform: translateY(-2px);
  }

  .link-icon {
    font-size: 0.9rem;
  }

  .external-link {
    font-size: 0.8rem;
    opacity: 0.6;
    margin-left: 0.2rem;
  }

  .link-badge:hover .external-link {
    opacity: 1;
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 2.25rem;
    }

    .container {
      padding: 1.5rem 1rem;
    }

    .project-card {
      padding: 1.25rem;
    }
  }
</style>
