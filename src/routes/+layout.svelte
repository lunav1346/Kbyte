<script>
	import 'bulma/css/bulma.min.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	export let data;
</script>

<div class="site-container">
	<Navbar {data} />

	<main class="main-content">
		<slot />
	</main>

	<Footer />
</div>

<style>
	:global(body) {
		min-height: 100vh;
		background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
		padding-top: 3.25rem;
	}

	.site-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.main-content {
		flex: 1;
	}

	:global(.section) {
		background: transparent;
	}

	:global(.box) {
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
	}

	:global(.navbar.is-primary) {
		background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
	}

	:global(.button.is-primary) {
		background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
		border: none;
		transition: transform 0.2s;
	}

	:global(.button.is-primary:hover) {
		transform: translateY(-2px);
	}
</style>
