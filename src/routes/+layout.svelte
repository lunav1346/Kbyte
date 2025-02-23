<script>
	import 'bulma/css/bulma.min.css';
	import Navbar from '$lib/components/Navbar.svelte';

	// 페이지 데이터를 받아옵니다
	export let data;
</script>

<!-- data를 Navbar 컴포넌트에 전달합니다 -->
<Navbar {data} />

<slot />

<style>
	:global(body) {
		padding-top: 3.25rem;
	}
</style>
