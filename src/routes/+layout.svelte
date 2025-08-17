<script lang="ts">
    import '../app.css';
    let { children } = $props();

    import { fade } from 'svelte/transition';
    import { fly } from 'svelte/transition';

    import Icon from '$lib/components/Icon.svelte';
    import DeskTopNavList from '$lib/components/DesktopNavList.svelte';
    import MobileNavList from '$lib/components/MobileNavList.svelte';
    import Contact from '$lib/components/Contact.svelte';
    import Footnote from '$lib/components/Footnote.svelte';

    let desktop = $state(false);
    let navbar_open = $state(false);

    const handleMenuClick = () => {
        navbar_open = !navbar_open; 
    }

    $effect(() => {
        const mql = window.matchMedia('(min-width: 777px)');

        desktop = mql.matches;

        const handler = (e: MediaQueryListEvent) => {
            desktop = e.matches;
        };

        mql.addEventListener('change', handler);

        return () => mql.removeEventListener('change', handler);
    });

</script>

<style>
    :global(html, body) {
        height: 100%;
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
        flex: 1;
    }

    :global(a) {
        color: var(--primary-text-colour);
    }


   .bottom-text {
        text-align: center;
        font-size: 1.0rem;
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
        display: flex;
        justify-content: center;
    }


</style>

<main>
    {#if !desktop}

        <div>
            <nav class="mobile-nav">
                <a href="/">
                  <p class="mobile-elias"><span style="color: var(--secondary-text-colour)">elias</span> simojoki </p>
                </a>

                <button class="menu-button" onclick={handleMenuClick}>
                    <Icon name="hamburger" ariaLabel="Open menu" size={28}/>
                </button>
            </nav>
        </div>
        
        <!-- We have to check whether the navbar is open or not. -->
        {#if navbar_open}
            <div class="mobile-nav-overlay" transition:fade={{ duration: 180 }}>
            <!-- <div class="mobile-nav-overlay" transition:fly={{ y: 8, duration: 200 }}> -->
                <MobileNavList/>
            </div>
        {/if}

    {:else}
      <DeskTopNavList/>
    {/if}


    {#if desktop || !navbar_open}
        {@render children?.()}
    {/if}
</main>

{#if desktop || !navbar_open}
    <p class="bottom-text">
        If you have any questions or want to chat, please contact me.<br>I (usually)
        enjoy getting to know new people :).
    </p>

{/if}
<Contact/>
<Footnote/>
