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
		<h1 class="title">코테만 준비하기에는 너무 아까우니까.</h1>
		<p class="subtitle">한국항공대학교 종합 프로그래밍 소모임, Kbyte</p>
	</div>
	<div class="container">
		<p class="subtitle">
			웹개발 및 디자인을 할 줄 몰라서, 이 칸에 쩌는 디자인을 넣어주실 분을 구합니다
		</p>
	</div>
</section>
