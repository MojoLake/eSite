<script lang="ts">
  import Yellow from '$lib/components/Yellow.svelte';
  import ProjectsComponent from '$lib/components/ProjectsComponent.svelte';

  let { projects } = $props();
</script>


<div class="main">
    <h1 class="page-title"><Yellow>Projects</Yellow> I've Done</h1>
    <ProjectsComponent projects={projects} />
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
</style>
