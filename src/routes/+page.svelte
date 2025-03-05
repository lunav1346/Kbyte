<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let formData = {
		email: '',
		password: ''
	};
	let error = '';

	function handleSubmit() {
		return async ({ result }) => {
			if (result.type === 'failure') {
				error = result.data?.message || '로그인에 실패했습니다.';
			} else if (result.type === 'success') {
				await goto('/', { replaceState: true });
				location.reload(); // 상태 갱신을 위한 새로고침
			}
		};
	}
</script>

<section class="section">
	<div class="container">
		<h1 class="title">환영합니다!</h1>
		<p class="subtitle">SvelteKit과 Bulma로 만든 웹사이트입니다.</p>
	</div>
</section>

<form method="POST" use:enhance={handleSubmit}>
	<!-- ...existing form content... -->
</form>
