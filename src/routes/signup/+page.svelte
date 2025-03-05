<script>
	import { enhance } from '$app/forms';

	// 폼 데이터를 관리하는 객체
	let formData = {
		email: '',
		password: '',
		confirmPassword: '',
		name: '',
		dept: '',
		studentNumber: ''
	};

	// 에러와 성공 상태를 관리하는 변수들
	let errors = {};
	let success = false;

	// 폼 유효성 검사 함수
	function validateForm() {
		errors = {};

		if (!formData.email) {
			errors.email = '이메일을 입력해주세요';
		}
		if (!formData.password) {
			errors.password = '비밀번호를 입력해주세요';
		}
		if (formData.password !== formData.confirmPassword) {
			errors.confirmPassword = '비밀번호가 일치하지 않습니다';
		}
		if (!formData.name) {
			errors.name = '이름을 입력해주세요';
		}
		if (!formData.dept) {
			errors.dept = '학과를 입력해주세요';
		}
		if (!formData.studentNumber) {
			errors.studentNumber = '학번을 입력해주세요';
		}

		return Object.keys(errors).length === 0;
	}

	// 학과 목록 추가
	const departments = [
		'항공우주공학과',
		'기계항공공학과',
		'신소재공학과',
		'항공우주및기계공학부',
		'항공전자정보공학부',
		'스마트드론학과',
		'공과대학 융합전공',
		'소프트웨어학과',
		'전기전자공학과',
		'컴퓨터공학과',
		'AI자율주행시스템공학과',
		'AI대학 융합전공',
		'항공교통물류학부',
		'항공경영학과',
		'경영학과',
		'항공운항학과',
		'국제교류학부',
		'경영학부',
		'항공/경영대학 융합전공',
		'자유전공학부',
		'인문자연학부'
	];
</script>

<div class="section">
	<div class="container">
		<div class="columns is-centered">
			<div class="column is-half">
				<div class="box">
					<h1 class="title has-text-centered">회원가입</h1>

					{#if success}
						<div class="notification is-success">회원가입이 완료되었습니다!</div>
					{/if}

					<form
						method="POST"
						use:enhance={() => {
							return async ({ update }) => {
								// 폼 제출 후 페이지 업데이트
								await update();
							};
						}}
					>
						<!-- 이메일 입력 필드 -->
						<div class="field">
							<label class="label" for="email">이메일</label>
							<div class="control">
								<input
									class="input {errors.email ? 'is-danger' : ''}"
									type="email"
									id="email"
									name="email"
									bind:value={formData.email}
								/>
							</div>
							{#if errors.email}
								<p class="help is-danger">{errors.email}</p>
							{/if}
						</div>

						<!-- 비밀번호 입력 필드 -->
						<div class="field">
							<label class="label" for="password">비밀번호</label>
							<div class="control">
								<input
									class="input {errors.password ? 'is-danger' : ''}"
									type="password"
									id="password"
									name="password"
									bind:value={formData.password}
								/>
							</div>
							{#if errors.password}
								<p class="help is-danger">{errors.password}</p>
							{/if}
						</div>

						<!-- 비밀번호 확인 필드 -->
						<div class="field">
							<label class="label" for="confirmPassword">비밀번호 확인</label>
							<div class="control">
								<input
									class="input {errors.confirmPassword ? 'is-danger' : ''}"
									type="password"
									id="confirmPassword"
									bind:value={formData.confirmPassword}
								/>
							</div>
							{#if errors.confirmPassword}
								<p class="help is-danger">{errors.confirmPassword}</p>
							{/if}
						</div>

						<!-- 이름 입력 필드 -->
						<div class="field">
							<label class="label" for="name">이름</label>
							<div class="control">
								<input
									class="input {errors.name ? 'is-danger' : ''}"
									type="text"
									id="name"
									name="name"
									bind:value={formData.name}
								/>
							</div>
							{#if errors.name}
								<p class="help is-danger">{errors.name}</p>
							{/if}
						</div>

						<!-- 학과 선택 필드 수정 -->
						<div class="field">
							<label class="label" for="dept">학과</label>
							<div class="control">
								<div class="select is-fullwidth {errors.dept ? 'is-danger' : ''}">
									<select id="dept" name="dept" bind:value={formData.dept}>
										<option value="">학과를 선택하세요</option>
										{#each departments as department}
											<option value={department}>{department}</option>
										{/each}
									</select>
								</div>
							</div>
							{#if errors.dept}
								<p class="help is-danger">{errors.dept}</p>
							{/if}
						</div>

						<!-- 학번 입력 필드 -->
						<div class="field">
							<label class="label" for="studentNumber">학번</label>
							<div class="control">
								<input
									class="input {errors.studentNumber ? 'is-danger' : ''}"
									type="text"
									id="studentNumber"
									name="studentNumber"
									bind:value={formData.studentNumber}
								/>
							</div>
							{#if errors.studentNumber}
								<p class="help is-danger">{errors.studentNumber}</p>
							{/if}
						</div>

						<!-- 제출 버튼 -->
						<div class="field">
							<div class="control">
								<button class="button is-primary is-fullwidth" type="submit"> 가입하기 </button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
