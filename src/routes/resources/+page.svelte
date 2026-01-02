<script lang="ts">
  import Yellow from "$lib/components/Yellow.svelte";
</script>

<div class="container">
  <h1>eResources</h1>
  <p class="subtitle">
    Stuff I've found useful or interesting and think you might as well.
  </p>

  <section class="category">
    <h2>
      <span class="category-icon">📝</span>
      Blogs
    </h2>

    <div class="items">
      <a href="https://matklad.github.io/" target="_blank" class="item-card">
        <h3>matklad</h3>
        <p>
          A great mix of insightful, useful and honest blogs about programming
          and life.
        </p>
        <span class="external-link">↗</span>
      </a>

      <a href="https://near.blog/" target="_blank" class="item-card">
        <h3>near.blog</h3>
        <p>
          Good advice for life and other stuff. Particularly enjoyed
          <Yellow>Unusual Holidays</Yellow>.
        </p>
        <span class="external-link">↗</span>
      </a>
    </div>
  </section>

  <section class="category">
    <h2>
      <span class="category-icon">📚</span>
      Books
    </h2>

    <div class="items">
      <div class="item-card book">
        <h3>Brothers Karamazov</h3>
        <span class="author">Fyodor Dostoevsky</span>
        <p>
          One of the best books I've read. I found the way Dostoevsky talked
          about children and their purity very touching.
        </p>
      </div>

      <div class="item-card book">
        <h3>The Beginning of Infinity</h3>
        <span class="author">David Deutsch</span>
        <p>
          Probably the first book I've read on epistemology. Deutsch's ideas are
          so deep and beautiful that every page was a joyful journey of
          exploration. His approach is very much one of a theoretical physicist.
          I should re-read this soon.
        </p>
      </div>
    </div>

    <p class="cta">
      For all the books I've read, check my
      <a href="https://app.thestorygraph.com/profile/mojolake" target="_blank">
        <Yellow>Storygraph account</Yellow>
      </a>
    </p>
  </section>
</div>

<style>
  .container {
    max-width: 48rem;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  h1 {
    text-align: center;
    font-size: 3rem;
    color: var(--primary-title-colour);
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
  }

  .subtitle {
    text-align: center;
    font-size: 1.1rem;
    color: var(--primary-text-colour);
    opacity: 0.8;
    margin-bottom: 3rem;
  }

  .category {
    margin-bottom: 3rem;
  }

  .category h2 {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.4rem;
    color: var(--secondary-text-colour);
    margin-bottom: 1.25rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(114, 197, 233, 0.2);
  }

  .category-icon {
    font-size: 1.2rem;
  }

  .items {
    display: grid;
    gap: 1rem;
  }

  .item-card {
    display: block;
    position: relative;
    padding: 1.25rem 1.5rem;
    background: rgba(114, 197, 233, 0.05);
    border: 1px solid rgba(114, 197, 233, 0.15);
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease;
  }

  a.item-card:hover {
    background: rgba(114, 197, 233, 0.1);
    border-color: rgba(114, 197, 233, 0.3);
    transform: translateY(-2px);
  }

  .item-card h3 {
    font-size: 1.15rem;
    color: var(--primary-title-colour);
    margin: 0 0 0.5rem 0;
  }

  .item-card p {
    font-size: 0.95rem;
    color: var(--primary-text-colour);
    margin: 0;
    line-height: 1.6;
    opacity: 0.9;
  }

  .item-card.book .author {
    display: block;
    font-size: 0.85rem;
    color: var(--secondary-text-colour);
    margin-bottom: 0.75rem;
    font-style: italic;
  }

  .external-link {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1rem;
    color: var(--primary-title-colour);
    opacity: 0.4;
    transition: opacity 0.2s ease;
  }

  a.item-card:hover .external-link {
    opacity: 1;
  }

  .cta {
    margin-top: 1.5rem;
    padding: 1rem 1.5rem;
    background: rgba(237, 204, 112, 0.08);
    border-radius: 8px;
    text-align: center;
    font-size: 0.95rem;
  }

  .cta a {
    text-decoration: none;
  }

  .cta a:hover {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 2.25rem;
    }

    .container {
      padding: 1.5rem 1rem;
    }
  }
</style>
