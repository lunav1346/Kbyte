<script>
	import { page } from '$app/stores';
</script>

<div class="section">
	<div class="container has-text-centered">
		<h1 class="title">
			{$page.status}: {$page.error?.message}
		</h1>
		<p class="subtitle">죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
		<a href="/" class="button is-primary"> 홈으로 돌아가기 </a>
	</div>
</div>
