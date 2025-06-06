<script>
    import '../app.css'

    let { children } = $props()
</script>

<svelte:head>
    <link as="font"
          crossorigin="anonymous"
          fetchpriority="high"
          href="/font/Geist-Regular.woff2"
          rel="preload"
          type="font/woff2"
    />

    <link as="font"
          crossorigin="anonymous"
          fetchpriority="high"
          href="/font/Geist-Medium.woff2"
          rel="preload"
          type="font/woff2"
    />

    <link as="font"
          crossorigin="anonymous"
          fetchpriority="high"
          href="/font/Geist-SemiBold.woff2"
          rel="preload"
          type="font/woff2"
    />

    <link as="font"
          crossorigin="anonymous"
          fetchpriority="high"
          href="/font/Geist-Bold.woff2"
          rel="preload"
          type="font/woff2"
    />

    <link as="font"
          crossorigin="anonymous"
          fetchpriority="high"
          href="/font/Geist-ExtraBold.woff2"
          rel="preload"
          type="font/woff2"
    />

    <link as="font"
          crossorigin="anonymous"
          fetchpriority="high"
          href="/font/Geist-Black.woff2"
          rel="preload"
          type="font/woff2"
    />
</svelte:head>

{@render children()}
