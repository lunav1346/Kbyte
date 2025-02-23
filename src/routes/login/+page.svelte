<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let formData = {
		email: '',
		password: ''
	};

	let error = '';
</script>

<div class="section">
	<div class="container">
		<div class="columns is-centered">
			<div class="column is-half">
				<div class="box">
					<h1 class="title has-text-centered">로그인</h1>

					{#if error}
						<div class="notification is-danger">
							{error}
						</div>
					{/if}

					<form
						method="POST"
						use:enhance={() => {
							return async ({ result }) => {
								if (result.type === 'failure') {
									error = result.data?.message || '로그인에 실패했습니다.';
								} else if (result.type === 'success') {
									// 로그인 성공 시 홈페이지로 이동
									await goto('/', { replaceState: true });
									window.location.reload(); // 페이지를 새로고침하여 상태를 업데이트
								}
							};
						}}
					>
						<!-- 나머지 폼 내용은 동일 -->
						<div class="field">
							<label class="label" for="email">이메일</label>
							<div class="control">
								<input
									class="input"
									type="email"
									id="email"
									name="email"
									bind:value={formData.email}
									placeholder="example@email.com"
									required
								/>
							</div>
						</div>

						<div class="field">
							<label class="label" for="password">비밀번호</label>
							<div class="control">
								<input
									class="input"
									type="password"
									id="password"
									name="password"
									bind:value={formData.password}
									required
								/>
							</div>
						</div>

						<div class="field">
							<div class="control">
								<button class="button is-primary is-fullwidth" type="submit"> 로그인 </button>
							</div>
						</div>

						<div class="has-text-centered mt-4">
							<p>계정이 없으신가요? <a href="/signup">회원가입</a></p>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
