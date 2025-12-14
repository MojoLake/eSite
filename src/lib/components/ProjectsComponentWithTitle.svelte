<script lang="ts">
  import Yellow from "$lib/components/Yellow.svelte";
  import ListComponent from "$lib/components/ListComponent.svelte";

  let { projects } = $props();
</script>

<div class="main">
  <h1 class="page-title"><Yellow>Projects</Yellow> I've Done</h1>
  <ListComponent items={projects} basePath="projects" itemType="project" />
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
