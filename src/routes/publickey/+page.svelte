<svelte:head>
  <title>OpenPGP Public Key</title>
</svelte:head>

<main class="public-key">
  <h1>OpenPGP Public Key</h1>
  <p class="fingerprint">
    Fingerprint: <code>7DF5 C049 D9FC D481 A227 1A1B 58AE 342E 0B60 0BE8</code>
  </p>
  <p>
    Raw file: <a href="/publickey.asc" target="_blank" rel="noopener noreferrer">/publickey.asc</a>
  </p>
  <pre>-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEaZSUOxYJKwYBBAHaRw8BAQdAD22yQjoCSdzI3qst1KsO4mTEYDRD3HEvcaJD
7v42Yi+0H0VsaWFzIDxzaW1vLnNpbW9qb2tpQGdtYWlsLmNvbT6IkwQTFgoAOxYh
BH31wEnZ/NSBoicaG1iuNC4LYAvoBQJplJQ7AhsDBQsJCAcCAiICBhUKCQgLAgQW
AgMBAh4HAheAAAoJEFiuNC4LYAvo6YoBAJ1cguWGrqUEiLg1oD79vLIJF9XwwVq4
lO/T+zrBpGUkAP91WX81+PWqUwl8bKOU5kPfIHtdf9WjQmtfXB0ptdS+Bbg4BGmU
lDsSCisGAQQBl1UBBQEBB0BB3azV3Iyeef7R+VuA3XeTX+GkXR6fZ6JBxC7GxKZU
agMBCAeIeAQYFgoAIBYhBH31wEnZ/NSBoicaG1iuNC4LYAvoBQJplJQ7AhsMAAoJ
EFiuNC4LYAvolFsBANyjAWsIk9/0BQoxtR06aNDjlPljvP/a0T6T8y2dKy9bAQCm
6H5Qx93PVdSAUUJEX4RA0QV0b+3syARQKq4j5jA5CA==
=SHCn
-----END PGP PUBLIC KEY BLOCK-----</pre>
</main>

<style>
  .public-key {
    max-width: 60rem;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  .fingerprint {
    margin: 0.5rem 0 1rem;
  }

  pre {
    white-space: pre-wrap;
    word-break: break-word;
    overflow-x: auto;
    padding: 1rem;
    border: 1px solid var(--border-colour, #444);
    border-radius: 8px;
    background: var(--code-background-colour, #111);
  }
</style>
