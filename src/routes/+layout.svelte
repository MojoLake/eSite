<script lang="ts">
    import '../app.css';
    let { children } = $props();

    import Icon from '$lib/components/Icon.svelte';

    let desktop = $state(false);

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

    .desktop-nav {
        margin: auto;
        margin-top: 2rem;
        padding: 0 1rem;
    }

    :global(a) {
        color: var(--primary-text-colour);
    }

    a:hover {
        color: var(--secondary-text-colour);
    }

    ul {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        padding: 0;
        margin: 0;
    }

    li {
        font-size: 2rem;
        list-style-type: none;
    }

    .link-list {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.25rem;
    }

    .link-list img {
        height: 1.5rem;
    }

    .footnote {
        text-align: center; 
        display: inline-block;
        margin: 0.5rem auto;
        padding: 0.25rem 0.25rem;
        border-radius: 0.2rem;
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
    }

    .mobile-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .mobile-elias {
        margin: 1rem;
    }

</style>

<main>
    {#if !desktop}
        <nav class="mobile-nav">
            <p class="mobile-elias"><span style="color: var(--secondary-text-colour)">elias</span> simojoki </p>
            <button class="menu-button">
                <Icon name="hamburger" ariaLabel="Open menu" size={28}/>
            </button>
        </nav>
    {:else}
        <nav class="desktop-nav">
            <ul>
                <li><a href="/">eHome</a></li>
                <li><a href="/elias">eLias</a></li>
                <li><a href="/blogs">eBlogs</a></li>
                <li><a href="/projects">eProjects</a></li>
            </ul>
        </nav>
    {/if}

    {@render children?.()}
</main>

<p class="bottom-text">
    If you have any questions or want to chat, please contact me.<br>I (usually)
    enjoy getting to know new people :).
</p>
<ul class="link-list">
    <li>
        <a href="https://github.com/MojoLake">
            <img src="github-mark/github-mark-white.svg" alt="Github logo"/>
        </a>
    </li>
    <li>
        <a href="https://www.linkedin.com/in/elias-simojoki/">
            <img src="linkedin.svg" alt="Linkedin logo"/>
        </a>
    </li>
    <li>
        <a Email href="mailto:simo.simojoki@gmail.com">
            <img src="semail.svg" alt="email logo"/>
        </a>
    </li>
</ul>
<p class="footnote">Elias Simojoki 10/8/2025 (d/m/y)</p>
