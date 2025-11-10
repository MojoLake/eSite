<script lang="ts">
  import Yellow from '$lib/components/Yellow.svelte';
</script>

<style>
   h1 {
        text-align: center;
        font-size: 3rem;
        white-space: normal;
        overflow-wrap: break-word;
        color: var(--primary-title-colour);
   } 

   .home {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 50rem;
        margin: 2rem auto;
   }

   .main-text {
      font-size: 1rem;
      margin: auto 1rem;
   }

   .bottom-text {
        text-align: center;
        font-size: 1.0rem;
        margin: 5rem auto;
   }

</style>


<div class="home">
    <h1>yep! i'm still&nbsp;<span style="color: var(--secondary-text-colour)">elias</span></h1>

    
    <div class="main-text">
      <h3>Professional facts about me:</h3>
      <ul>
        <li>ML engineer at <a href="https://hamina.com" target="_blank" rel="noopener noreferrer"><Yellow>Hamina Wireless</Yellow></a>.</li>
        <li>Mathematics student at <a href="https://www.aalto.fi/en" target="_blank" rel="noopener noreferrer"><Yellow>Aalto University</Yellow></a>.</li>
        <li>Background in competitive programming (NCPC 2024 winner, NOI 2023 Gold Medalist, IOI 2022 Participant).</li>
        <li>Interested in founding my own startup one day.</li>

      </ul>

      <h3>Less professional facts about me:</h3>
      <ul>
        <li>The oldest of tree brothers</li>
        <li>Finnish🇫🇮</li>
        <li>I love music! I've written some songs and want to learn to produce them.</li>
      </ul>
    </div>

    <p class="bottom-text">
        If you have any questions or want to chat, please contact me :)
    </p>
</div>


