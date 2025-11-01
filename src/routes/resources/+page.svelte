<script lang="ts">
    import Yellow from "$lib/components/Yellow.svelte";
</script>


<h1>Stuff I've found useful or interesting and think you might as well.</h1>

<div class="main">

    <ul class="list-of-blogs">
        <h3>Other blogs:</h3>
        <li>
            <a href="https://matklad.github.io/" target="_blank">matklad</a>
            <ul>
                <li>a great mix of insightful, useful and honest blogs</li>
            </ul>
        </li>
        <li>
            <a href="https://near.blog/" target="_blank">near.blog</a>
            <ul>
                <li>good advice for life and other stuff. One blog I enjoyed a lot was
                    <a href="https://near.blog/unusual-holidays/">Unusual Holidays</a>
                </li>
            </ul>
        </li>

        <h3>Books:</h3>

        <li>
            <h4>Brothers Karamazov</h4>
            <ul>
                <li>One of the best books I've read. I found the way Dostoyevski 
                    talked about children and their purity very touching.
                </li>
            </ul>
        </li>

        <li>
            <h4>The Beginning of Infinity by David Deutsch</h4>
            <ul>
                <li>
                    Probably the first book I've read on epistemology. Deutch's ideas
                    are so deep and beautiful that every page was a joyful journey
                    of exploration. His approach is (of course) very much one of a theoretical physicist which I greatly enjoy. I didn't comprehend everything yet so I should re-read this soon.
                </li>
            </ul>
        </li>

        <h4>For all the books i've read, check my <a href="https://app.thestorygraph.com/profile/mojolake"><Yellow>Storygraph account</Yellow></a></h4>
    </ul>

</div>


<style>
    h1 {
        text-align: center;
        font-size: 2rem;
        color: var(--primary-title-colour);
    }

    .main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .list-of-blogs {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        max-width: 40rem;
    }

</style>



