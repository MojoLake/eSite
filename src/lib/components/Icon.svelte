<script lang="ts">
  import { base } from "$app/paths";

  let {
    name,
    size = 24,
    ariaLabel,
  }: { name: string; size?: number; ariaLabel?: string } = $props();
</script>

<svg
  fill="none"
  stroke="currentColor"
  width={size}
  height={size}
  aria-label={ariaLabel}
>
  <use href={`${base}/icons.svg#${name}`}></use>
</svg>
