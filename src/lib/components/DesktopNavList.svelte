<script>
    import NavList from '$lib/components/NavList.svelte';
</script>

<style>
    .desktop-nav {
        /* For the nav*/
        --nav-margin-top: 2rem;
        --nav-padding: 0 0rem;

        /* For the ul*/
        --nav-ul-display: flex;
        --nav-ul-justify-content: center;
        --nav-ul-padding: 0;
        --nav-ul-margin: 0;
        --nav-ul-gap: 4rem;
        --nav-flex-wrap: wrap;

        /* For the li*/
        --nav-li-font-size: 3rem;
    }
</style>


<div class="desktop-nav">
    <NavList />
</div>
