<script lang="ts">
  import BlogsComponentWithTitle from "$lib/components/BlogsComponentWithTitle.svelte";

  let { data } = $props();
  const { posts } = data;
</script>

<BlogsComponentWithTitle {posts} showCount={-1} />
<!-- -1 means all -->
