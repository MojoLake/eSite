<script lang="ts">
    const { data } = $props<{
        data: { slug: string; title: string; summary: string; }
    }>();

    const modules = import.meta.glob('$lib/content/projects/*.svx');
    const key = `/src/lib/content/projects/${data.slug}.svx`;

    let ContentComponent: any = $state(null);

    $effect(() => {
        (async () => {
            const mod: any = await modules[key]();
            ContentComponent = mod.default;
        })();
    });
</script>

<div class="main">
    <h1 class="title">{data.title}</h1>
    {#if data.summary}
        <div class="summary">
            <p>
                <span style="color: var(--secondary-text-colour)">Summary:</span>
                {data.summary}
            </p>
        </div>
    {/if}
    {#if ContentComponent}
        <div class="project-text">
            <ContentComponent />
        </div>
    {/if}
</div>

<style>
    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        padding: 2rem 0.75rem;
        margin: 0 auto;
        max-width: 60rem;
    }

    .summary {
        font-size: 2rem;
    }

    .project-text {
        font-size: 1.0rem;
        width: 100%;
    }

    .project-text :global(img) {
        max-width: 100%;
    }
</style>



