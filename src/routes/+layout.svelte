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
    import Yellow from '$lib/components/Yellow.svelte';

    const initialDesktop = browser
        ? window.matchMedia('(min-width: 777px)').matches
        : false;

    let desktop = $state(initialDesktop);
    let navbar_open = $state(false);

    const handleMenuClick = () => {
        navbar_open = !navbar_open; 
    }

    const handleNameClick = () => {
        navbar_open = false;
    };

    const desktop_hamburger_size = 50;
    const mobile_hamburger_size = 28;

    let hamburger_size = desktop ? desktop_hamburger_size : mobile_hamburger_size;

    $effect(() => {
        const mql = window.matchMedia('(min-width: 777px)');

        desktop = mql.matches;

        const handler = (e: MediaQueryListEvent) => {
            desktop = e.matches;

            if (desktop) {
              hamburger_size = desktop_hamburger_size;
            } else {
              hamburger_size = mobile_hamburger_size;
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

    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: 100%;
        max-width: 60rem;

        margin: 0 auto;
    }

    .elias {
        margin: 1rem;
        font-size: 1.2rem;
    }

    @media (min-width: 777px) {
      .elias {
        font-size: 2rem;
      }
    }

    .nav-overlay {
        position: absolute;
        inset: 0;
        background-color: var(--background-colour);
    }

    .top-content {
      display: flex;
      justify-content: space-between;
      
      max-width: 200rem;
      margin: 0 auto;
    }

</style>

<main>
    
        <nav class="nav">
            <a href="/" onclick={handleNameClick}>

              {#if navbar_open}
                    <p class="elias">elias<Yellow>&nbsp;simojoki</Yellow></p>
              {:else}
                    <p class="elias"><Yellow>elias</Yellow> simojoki </p>
              {/if}

            </a>

            <button class="menu-button" onclick={handleMenuClick}>
                {#if navbar_open}
                    <Icon style="color: var(--secondary-text-colour)" name="ex" ariaLabel="Close menu" size={hamburger_size}/>
                {:else}
                    <Icon name="hamburger" ariaLabel="Open menu" size={hamburger_size}/>
                {/if}
            </button>
        </nav>
    
    <!-- We have to check whether the navbar is open or not. -->
    <div class="content-shell" class:locked={navbar_open}>
        {#if navbar_open}
            <div class="nav-overlay" transition:fade={{ duration: 100 }}>
            <!-- <div class="nav-overlay" transition:fly={{ y: 8, duration: 350 }}> -->
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
