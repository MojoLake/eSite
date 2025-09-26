<script>
  import NavList from "$lib/components/NavList.svelte";

  export let onClick;
</script>

<div class="mobile-nav">
  <NavList {onClick} />
</div>

<style>
  .mobile-nav {
    /* --nav-height: calc(100dvh - 12rem); */
    --nav-height: 70vh;

    --nav-ul-display: flex;
    --nav-ul-flex-direction: column;
    --nav-ul-align-items: center;
    --nav-ul-justify-content: space-evenly;
    --nav-ul-height: 100%;

    --nav-li-font-size: 3rem;
  }
</style>
