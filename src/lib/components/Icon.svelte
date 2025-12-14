<script lang="ts">
  import { base } from "$app/paths";

  let { name, size = 24 }: { name: string; size?: number } = $props();
</script>

<svg fill="none" stroke="currentColor" width={size} height={size}>
  <use href={`${base}/icons.svg#${name}`}></use>
</svg>
