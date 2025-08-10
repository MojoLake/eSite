<script lang="ts">
    import '../app.css';
    let { children } = $props();
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
        color: var(--vanilla-text);
        background-color: var(--background-blue);
    }

    main {
        flex: 1;
    }

    nav {
        background-color: var(--lighter-background-blue);
        margin: auto;
    }

    :global(a) {
        color: var(--vanilla-text);
    }

    a:hover {
        color: var(--background-blue);
    }

    ul {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        list-style: none;
        padding: 0;
        margin: 0;
        height: 3rem;
    }

    li {
        display: flex;
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
</style>

<main>
    <nav>
        <ul>
            <li><a href="/">eHome</a></li>
            <li><a href="/blogs">eBlogs</a></li>
            <li><a href="/projects">eProjects</a></li>
        </ul>
    </nav>

    {@render children?.()}

</main>

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
