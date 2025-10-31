<script lang="ts">
    let { projects } = $props();
</script>

<div class="main">
    {#each projects as project}
       <a href={`/projects/${project.slug}`} class="project-link"> 
            <div class="project">
              <h3 class="project-title">
                  {project.title}
              </h3>
              &nbsp;{project.summary}
            </div>
      </a>
    {/each}
</div>

<style>
    .main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 0 0.5rem;
    }

    .project-link {
        text-decoration: none;
    }

    .project-link:hover {
        text-decoration: underline;
    }

    .project-title {
        color: var(--secondary-text-colour);
    }

</style>
