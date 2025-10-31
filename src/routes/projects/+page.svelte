<script lang="ts">
  import ProjectsComponentWithTitle from '$lib/components/ProjectsComponentWithTitle.svelte';

  export let data;
  const { projects } = data;
</script>

<ProjectsComponentWithTitle {projects} />
