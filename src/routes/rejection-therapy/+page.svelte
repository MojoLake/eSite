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
      title: "Ask strangers if I can come make tea at their home",
      notes:
        "I walked around the neighbourhood with a pack of tea. I greeted strangers, claiming that my kettle was broken and asking if I could prepare my tea at their home. I asked 4 people and everyone said no. It was quite late, 8pm, so that might have had an effect as well.",
      videoUrl: "",
    },
    {
      day: 2,
      title: "Store my frozen peas in a strangers freezer",
      notes:
        "Walking in the neighbourhood with a pack of frozen peas. I claimed that my freezer was broken and that I did not want to eat my peas today so I asked if I could store my peas overnight in their freezer. Three rejections!",
      videoUrl: "",
    },
    {
        day: 3,
        title: "Borrow toilet paper because friend is over in the restroom and it ran out",
        notes: "Exactly what the title says. The first guy (Bilal) that I approached said yes, so we walked to his house - having a nice discussion on the way there - and I walked away with a handful of paper tissues! So day 3 failed: no rejection."
    },
    {
        day: 4,
        title: "Ask a stranger to pray that I get accepted to Y Combinator",
        notes: "Yeah. And he did!"
    },
    {
        day: 5,
        title: "Buy a chocolate egg and ask the cashier to hide it for me",
        notes: "She said no. So success!"
    },
    {
        day: 6,
        title: "3 things: 1. ask to model for a photo shop(?), 2. ask for free hangers in a clothing store, 3. ask to make an announcement at a shopping mall",
        notes: `1. They gave me the email of the person who handles the social media.
        2. The woman was super nice and said of course I can have some hangers, went to the backroom and came out with a giant bag. I had to tell her I only need 4 instead of 40 :)
        3. Didn't get to announce but had a nice conversation with the person at the info desk. I learned that the shopping mall owns the music they play. When it was built, there was apparently a song contest and the best ones were chosen for the official track of the shopping mall, Kamppi.`
    }
  ];
</script>

<svelte:head>
  <title>100 Days of Rejection</title>
</svelte:head>

<div class="page">
  <h1>100 Days of Rejection</h1>

  <p>Inspired by Jia Jiang and he's book "Rejection Proof".</p>

  <ul class="events">
    {#each events as event}
      <li>
        <h2>Day {event.day}: {event.title}</h2>
        <p class="notes">{event.notes}</p>

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

  .notes {
    line-height: 1.6;
    white-space: pre-line;
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
