<script lang="ts">
  let { data } = $props();
  const { projects } = data;

  type Order = "ranking" | "chronological";

  let order = $state<Order>("ranking");
  let orderedProjects = $derived(
    order === "chronological"
      ? [...projects].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )
      : projects,
  );
</script>

<div class="container">
  <h1>eProjects</h1>
  <p class="subtitle">Things I've built.</p>

  <label class="order-control">
    <span>Order:</span>
    <select bind:value={order} aria-label="Project order">
      <option value="ranking">My ranking</option>
      <option value="chronological">Chronological</option>
    </select>
  </label>

  <div class="projects">
    {#each orderedProjects as project}
      <div class="project-card">
        <div class="project-header">
          <h3><a href={`/projects/${project.slug}`}>{project.title}</a></h3>
        </div>
        <p>{project.summary}</p>
        <div class="project-links">
          <a href={`/projects/${project.slug}`} class="read-more">🔍 Read more</a>
          {#if project.liveUrl}
            <a href={project.liveUrl} target="_blank" class="link-badge live">
              <span class="link-icon">🌐</span> Website
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
    margin-bottom: 2rem;
  }

  .order-control {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    color: var(--primary-text-colour);
    font-size: 0.95rem;
  }

  .order-control select {
    color: var(--secondary-text-colour);
    background: transparent;
    border: 1px solid rgba(114, 197, 233, 0.35);
    border-radius: 0;
    padding: 0.3rem 0.55rem;
    font: inherit;
  }

  .order-control select:focus {
    outline: 1px solid var(--secondary-text-colour);
    outline-offset: 2px;
  }

  .projects {
    display: grid;
    gap: 1.5rem;
  }

  .project-card {
    display: block;
    position: relative;
    padding: 1.5rem;
    background: transparent;
    border: 1px solid rgba(114, 197, 233, 0.15);
    border-radius: 0;
  }

  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .project-card h3 {
    font-size: 1.3rem;
    margin: 0 0 0.75rem 0;
  }

  .project-card h3 a {
    color: var(--primary-title-colour);
    text-decoration: none;
  }

  .project-card h3 a:hover {
    text-decoration: underline;
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
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .read-more {
    color: var(--secondary-text-colour);
    font-size: 0.95rem;
    text-decoration: none;
  }

  .read-more:hover {
    text-decoration: underline;
  }

  .link-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.95rem;
    text-decoration: none;
  }

  .link-badge.live {
    color: var(--secondary-text-colour);
  }

  .link-badge.live:hover {
    text-decoration: underline;
  }

  .link-badge.github {
    color: var(--primary-title-colour);
  }

  .link-badge.github:hover {
    text-decoration: underline;
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
