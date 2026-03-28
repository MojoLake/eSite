<script lang="ts">
  type RejectionEvent = {
    day: number;
    title: string;
    notes: string;
    videoUrl?: string;
  };

  const events: RejectionEvent[] = [
    {
      day: 1,
      title: "Ask for a Free Coffee",
      notes:
        "Dummy text for day one. Replace this with what you asked, what happened, and what you learned.",
      videoUrl: "",
    },
  ];
</script>

<svelte:head>
  <title>100 Days of Rejection</title>
</svelte:head>

<div class="page">
  <h1>100 Days of Rejection</h1>

  <ul class="events">
    {#each events as event}
      <li>
        <h2>Day {event.day}: {event.title}</h2>
        <p>{event.notes}</p>

        {#if event.videoUrl}
          <p>
            <a href={event.videoUrl} target="_blank" rel="noopener noreferrer">
              Video
            </a>
          </p>
        {/if}
      </li>
    {/each}
  </ul>
</div>

<style>
  .page {
    max-width: 48rem;
    margin: 0 auto;
    padding: 2rem 1rem 4rem;
  }

  h1 {
    color: var(--primary-title-colour);
    margin-bottom: 2rem;
  }

  .events {
    padding-left: 1.25rem;
  }

  .events li {
    margin-bottom: 2rem;
  }

  h2 {
    margin-bottom: 0.5rem;
    color: var(--secondary-text-colour);
    font-size: 1.2rem;
  }

  p {
    line-height: 1.6;
  }
</style>
