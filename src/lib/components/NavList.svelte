<script>
  let { onClick } = $props();

  let items = [
    { text: "eHome", href: "/" },
    { text: "eLias", href: "/elias" },
    { text: "eBlogs", href: "/blogs" },
    { text: "eResources", href: "/resources" },
  ];
</script>

<nav>
  <ul>
    {#each items as item}
      <li>
        <a href={item.href} on:click={onClick}>
          {item.text}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  nav {
    margin: auto;
    margin-top: var(--nav-margin-top);
    padding: var(--nav-padding);
    height: var(--nav-height);
  }

  ul {
    display: var(--nav-ul-display);
    flex-direction: var(--nav-ul-flex-direction);
    justify-content: var(--nav-ul-justify-content);
    align-items: var(--nav-ul-align-items);
    flex-wrap: var(--nav-flex-wrap);
    padding: var(--nav-ul-padding);
    margin: var(--nav-ul-margin);
    height: var(--nav-ul-height);
    gap: var(--nav-ul-gap);
  }

  li {
    font-size: var(--nav-li-font-size);
    list-style-type: none;
  }

  a {
    color: var(--primary-title-colour);
  }

  a:hover {
    color: var(--secondary-text-colour);
  }
</style>
