<script>
	import { page } from '$app/stores';
</script>

<div class="section">
	<div class="container has-text-centered">
		<h1 class="title">
			{$page.status}: {$page.error?.message}
		</h1>
		<p class="subtitle">이런! 여기는 없는 페이지입니다!<br />또는 있어도 접근 권한이 없습니다!</p>
		<a href="/" class="button is-primary"> 홈으로 돌아가기 </a>
	</div>
</div>
