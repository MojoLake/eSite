<script lang="ts">
  let { onClick, variant = "desktop" } = $props();

  let items = [
    { text: "eLias", href: "/" },
    { text: "eBlogs", href: "/blogs" },
    { text: "eResources", href: "/resources" },
  ];
</script>

<nav class={variant}>
  <ul>
    {#each items as item}
      <li>
        <a href={item.href} onclick={onClick}>
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

  li {
    font-size: 3rem;
    list-style-type: none;
  }

  a {
    color: var(--primary-title-colour);
  }

  a:hover {
    color: var(--secondary-text-colour);
  }
</style>
