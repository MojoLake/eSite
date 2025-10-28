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
      Quick facts about me:
      <ul>
        <li>A caring older brother.</li>
        <li>Finnish🇫🇮</li>
        <li>Interested in founding my own startup one day.</li>
        <li>Mathematics student at <a href="https://www.aalto.fi/en" target="_blank" rel="noopener noreferrer"><Yellow>Aalto University</Yellow></a>.</li>
        <li>ML engineer at <a href="https://hamina.com" target="_blank" rel="noopener noreferrer"><Yellow>Hamina Wireless</Yellow></a>.</li>
        <li>Background in competitive programming.</li>

        <li>
             I love animals. <a href="https://www.youtube.com/watch?v=LQRAfJyEsko&t=0s" target="_blank" rel="noopener noreferrer"><Yellow>This</Yellow></a> is the opposite of loving animals🌱.
        </li>
        <li>I also love music! I've written some songs and want to learn to produce them.</li>

      </ul>
    </div>

    <p class="bottom-text">
        If you have any questions or want to chat, please contact me :)
    </p>
</div>


