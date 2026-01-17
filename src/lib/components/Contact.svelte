<style>
    .link-list {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.25rem;
    }

    .link-list img {
        height: 2rem;
    }

    li {
      list-style-type: none;
    }

    /* This doesn't work yet */
    a:hover {
        color: var(--secondary-text-colour);
    }

</style>

<ul class="link-list">
    <li>
        <a href="https://github.com/MojoLake" target="_blank" rel="noopener noreferrer">
            <img src="/github-mark/github-mark-white.svg" alt="Github logo"/>
        </a>
    </li>
    <li>
        <a href="https://www.linkedin.com/in/elias-simojoki/" target="_blank" rel="noopener noreferrer">
            <img src="/linkedin.svg" alt="Linkedin logo"/>
        </a>
    </li>
    <li>
        <a href="https://x.com/elias_simojoki" target="_blank" rel="noopener noreferrer">
            <img src="/x.svg" alt="X logo"/>
        </a>
    </li>
    <li>
        <a href="mailto:simo.simojoki@gmail.com">
            <img src="/semail.svg" alt="email logo"/>
        </a>
    </li>
</ul>
