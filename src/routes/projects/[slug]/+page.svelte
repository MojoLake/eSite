<script lang="ts">
    const { data } = $props<{
        data: { slug: string; title: string; }
    }>();

    console.log(`project slug is ${data.slug}`);
</script>

{data.slug}



