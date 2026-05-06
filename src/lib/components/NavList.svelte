<script lang="ts">
  let {
    onClick,
    variant = "desktop",
  }: {
    onClick?: ((event: MouseEvent) => void) | undefined;
    variant?: "desktop" | "mobile";
  } = $props();

  let items = [
    { text: "eLias", href: "/" },
    { text: "eBlogs", href: "/blogs" },
    { text: "eProjects", href: "/projects" },
    { text: "100 Rejections", href: "/rejection-therapy" },
    { text: "eResources", href: "/resources" },
    { text: "Hidden blogs", href: "/hidden-blogs", hidden: true },
  ];
</script>

<nav class={variant}>
  <ul>
    {#each items as item}
      <li class:hidden-nav-item={item.hidden}>
        <a
          href={item.href}
          onclick={onClick}
          class:hidden-nav-link={item.hidden}
          aria-label={item.hidden ? item.text : undefined}
        >
          {item.text}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  nav {
    margin: auto;
    padding: 0;
  }

  nav.desktop {
    margin-top: 2rem;
  }

  nav.mobile {
    height: 70vh;
  }

  ul {
    display: flex;
    padding: 0;
    margin: 0;
  }

  nav.desktop ul {
    justify-content: center;
    gap: 4rem;
    flex-wrap: wrap;
  }

  nav.mobile ul {
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;
  }

  nav.mobile li {
    text-align: center;
  }

  nav.desktop .hidden-nav-item {
    flex-basis: 100%;
    text-align: center;
  }

  li {
    font-size: 3rem;
    list-style-type: none;
  }

  a {
    color: var(--primary-title-colour);
  }

  nav.mobile a {
    display: block;
    text-align: center;
  }

  a:hover {
    color: var(--secondary-text-colour);
  }

  .hidden-nav-link {
    color: transparent;
    user-select: none;
  }

  .hidden-nav-link:hover,
  .hidden-nav-link:focus-visible {
    color: var(--secondary-text-colour);
  }

  .hidden-nav-item {
    min-height: 1.2em;
  }

  @media (hover: none) {
    .hidden-nav-link:hover {
      color: transparent;
    }
  }
</style>
