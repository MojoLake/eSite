<script lang="ts">
    import { base } from '$app/paths';

    export let name: string;
    export let size = 24;
</script>

<svg fill="none" stroke="currentColor" width={size} height={size} >
    <use href={`${base}/icons.svg#${name}`}></use>
</svg>

