<script>
    import NavList from '$lib/components/NavList.svelte';

    export let onClick;
</script>

<style>
    .mobile-nav {
        --nav-height: calc(100vh - 12rem);
    
        --nav-ul-display: flex;
        --nav-ul-flex-direction: column;
        --nav-ul-align-items: center;
        --nav-ul-justify-content: space-evenly;
        --nav-ul-height: 100%;
        
        --nav-li-font-size: 3rem;
    }
</style>

<div class="mobile-nav">
    <NavList onClick={onClick}/>
</div>
