<script lang="ts">
    import { browser } from '$app/environment';

    import '../app.css';
    let { children } = $props();

    import { fade } from 'svelte/transition';
    import { fly } from 'svelte/transition';

    import Icon from '$lib/components/Icon.svelte';
    import DesktopNavList from '$lib/components/DesktopNavList.svelte';
    import MobileNavList from '$lib/components/MobileNavList.svelte';
    import Contact from '$lib/components/Contact.svelte';
    import Footnote from '$lib/components/Footnote.svelte';

    const initialDesktop = browser
        ? window.matchMedia('(min-width: 930px)').matches
        : false;

    let desktop = $state(initialDesktop);
    let navbar_open = $state(false);

    const handleMenuClick = () => {
        navbar_open = !navbar_open; 
    }

    const handleNameClick = () => {
        navbar_open = false;
    };

    $effect(() => {
        const mql = window.matchMedia('(min-width: 930px)');

        desktop = mql.matches;

        const handler = (e: MediaQueryListEvent) => {
            desktop = e.matches;
            if (desktop) {
                // Desktop does not have a navbar
                navbar_open = false;
            }
        };

        mql.addEventListener('change', handler);

        return () => mql.removeEventListener('change', handler);
    });

</script>

<style>
    :global(html, body) {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        margin: 0;
    }

    :global(body) {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        color: var(--primary-text-colour);
        background-color: var(--background-colour);
    }

    main {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    :global(a) {
        color: var(--primary-text-colour);
    }

    .content-shell {
        position: relative;
        flex: 1;
        min-height: 0;
    }

    .page-content {
        height: 100%;
    }



    .menu-button {
        color: var(--primary-text-colour);
        background: none;
        border: none;
        display: flex;
        margin: 1rem;

        anchor-name: --hamb;
    }

    .mobile-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .mobile-elias {
        margin: 1rem;
    }

    .mobile-nav-overlay {
        position: absolute;
        inset: 0;
        background-color: var(--background-colour);
    }


</style>

<main>
    
    {#if desktop}
        <DesktopNavList />
    {:else}
        <div>
            <nav class="mobile-nav">
                <a href="/" onclick={handleNameClick}>
                {#if navbar_open}
                      <p class="mobile-elias">elias<span style="color: var(--secondary-text-colour)">&nbsp;simojoki</span></p>
                {:else}
                      <p class="mobile-elias"><span style="color: var(--secondary-text-colour)">elias</span> simojoki </p>
                {/if}
                </a>

                <button class="menu-button" onclick={handleMenuClick}>
                    {#if navbar_open}
                        <Icon style="color: var(--secondary-text-colour)" name="ex" ariaLabel="Close menu" size={28}/>
                    {:else}
                        <Icon name="hamburger" ariaLabel="Open menu" size={28}/>
                    {/if}
                </button>
            </nav>
        </div>
    {/if}
    
    <!-- We have to check whether the navbar is open or not. -->
    <div class="content-shell" class:locked={navbar_open}>
        {#if navbar_open}
            <div class="mobile-nav-overlay" transition:fade={{ duration: 100 }}>
            <!-- <div class="mobile-nav-overlay" transition:fly={{ y: 8, duration: 350 }}> -->
                <MobileNavList onClick={handleNameClick}/>
            </div>
        {/if}

        <div class="page-content" aria-hidden={navbar_open}>
            {@render children?.()}
        </div>
    </div>
</main>

<Contact/>
<Footnote/>
