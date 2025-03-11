<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';

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
	let studentIdFile;
	let uploading = false;
	let selectedFile = null; // 선택된 파일을 저장할 변수 추가

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

	async function handleFileUpload(event) {
		const file = event.target.files[0];
		if (!file) return;

		selectedFile = file; // 선택된 파일 정보 업데이트

		try {
			uploading = true;
			const fileExt = file.name.split('.').pop();
			// UUID를 사용하여 더 안전한 파일명 생성
			const fileName = `${crypto.randomUUID()}.${fileExt}`;
			const filePath = `student-ids/${fileName}`;

			const { error: uploadError } = await supabase.storage
				.from('student-ids')
				.upload(filePath, file, {
					cacheControl: '0',
					upsert: false
				});

			if (uploadError) {
				throw uploadError;
			}

			studentIdFile = filePath;
		} catch (error) {
			console.error('Error uploading file:', error);
			errors = { ...errors, studentId: '파일 업로드에 실패했습니다.' };
		} finally {
			uploading = false;
		}
	}

	// handleSubmit 함수를 다음과 같이 수정
	function handleSubmit() {
		return async ({ result }) => {
			if (!studentIdFile) {
				errors = { ...errors, studentId: '학생증 사진을 업로드해주세요.' };
				return;
			}

			if (result.type === 'failure') {
				errors = { form: result.data?.message || '회원가입에 실패했습니다.' };
				return;
			}

			if (result.type === 'success') {
				success = true;
				await goto('/login');
			}
		};
	}
</script>

<div class="section">
	<div class="container">
		<div class="columns is-centered">
			<div class="column is-half">
				<div class="box">
					<h1 class="title has-text-centered">회원가입</h1>

					{#if success}
						<div class="notification is-success has-text-centered">
							<p class="title is-5">회원가입이 완료되었습니다!</p>
							<p>관리자의 승인 후 로그인이 가능합니다.</p>
							<p class="is-size-7 mt-2">잠시 후 로그인 페이지로 이동합니다</p>
							<a href="/login">바로 이동하려면 클릭해주세요</a>
						</div>
					{/if}

					<form
						method="POST"
						action="/signup"
						use:enhance={handleSubmit}
						enctype="multipart/form-data"
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

						<!-- 학생증 업로드 필드 수정 -->
						<div class="field">
							<label class="label" for="studentId">학생증 사진</label>
							<div class="file has-name is-fullwidth">
								<label class="file-label">
									<input
										class="file-input"
										type="file"
										name="studentId"
										accept="image/*"
										on:change={handleFileUpload}
									/>
									<span class="file-cta">
										<span class="file-icon">
											<i class="fas fa-upload"></i>
										</span>
										<span class="file-label"> 파일 선택... </span>
									</span>
									<span class="file-name">
										{selectedFile ? selectedFile.name : '선택된 파일 없음'}
									</span>
								</label>
							</div>
							{#if uploading}
								<progress class="progress is-small is-primary mt-2" max="100">15%</progress>
							{/if}
							{#if errors.studentId}
								<p class="help is-danger">{errors.studentId}</p>
							{/if}
						</div>

						<!-- 제출 버튼 -->
						<div class="field">
							<div class="control">
								<button class="button is-primary is-fullwidth" type="submit" disabled={uploading}>
									{uploading ? '처리중...' : '가입하기'}
								</button>
							</div>
						</div>

						{#if errors.form}
							<div class="notification is-danger">{errors.form}</div>
						{/if}

						{#if success}
							<div class="notification is-success">
								회원가입이 완료되었습니다! 관리자 승인 후 로그인이 가능합니다.
							</div>
						{/if}
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
