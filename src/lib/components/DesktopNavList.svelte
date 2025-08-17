<script>
    import NavList from '$lib/components/NavList.svelte';
</script>

<style>
    .desktop-nav {
        /* For the nav*/
        --nav-margin-top: 2rem;
        --nav-padding: 0 1rem;

        /* For the ul*/
        --nav-ul-display: flex;
        --nav-justify-content: space-evenly;
        --nav-ul-padding: 0;
        --nav-ul-margin: 0;

        /* For the li*/
        --nav-li-font-size: 2rem;
    }
</style>


<div class="desktop-nav">
    <NavList />
</div>
