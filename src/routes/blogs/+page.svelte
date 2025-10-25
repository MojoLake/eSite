<script lang="ts">
    import BlogsComponentWithTitle from '$lib/components/BlogsComponentWithTitle.svelte';

    export let data;
    const { posts } = data;
</script>

<BlogsComponentWithTitle posts={posts} showCount=-1 /> <!-- -1 means all -->
