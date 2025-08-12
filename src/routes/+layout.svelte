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
        color: var(--primary-text-colour);
        background-color: var(--background-colour);
    }

    main {
        flex: 1;
    }

    nav {
        margin: auto;
        margin-top: 2rem;
    }

    :global(a) {
        color: var(--primary-text-colour);
    }

    a:hover {
        color: var(--secondary-text-colour);
    }

    ul {
        display: flex;
        justify-content: center;
        gap: 5rem;
        align-items: center;
        list-style: none;
        padding: 0;
        margin: 0;
        height: 4rem;
        font-size: 2rem;
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

   p {
        text-align: center;
        font-size: 1.0rem;
   }
</style>

<main>
    <nav>
        <ul>
            <li><a href="/">eHome</a></li>
            <li><a href="/elias">eLias</a></li>
            <li><a href="/blogs">eBlogs</a></li>
            <li><a href="/projects">eProjects</a></li>
        </ul>
    </nav>

    {@render children?.()}

</main>

<p>
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
