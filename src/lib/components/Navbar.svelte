<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	export let data;
	let isActive = false;

	$: currentPath = $page.url.pathname;

	function toggleMenu() {
		isActive = !isActive;
	}
</script>

<nav class="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item" href="/">
			<img src="/logo.png" alt="" />
		</a>

		<a
			role="button"
			class="navbar-burger {isActive ? 'is-active' : ''}"
			aria-label="menu"
			aria-expanded="false"
			on:click={toggleMenu}
		>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
		</a>
	</div>

	<div class="navbar-menu {isActive ? 'is-active' : ''}">
		<div class="navbar-start">
			<a class="navbar-item {currentPath === '/' ? 'is-active' : ''}" href="/"> 홈 </a>
			<a class="navbar-item {currentPath === '/about' ? 'is-active' : ''}" href="/about"> 소개 </a>
			{#if data?.user}
				<a class="navbar-item {currentPath === '/community' ? 'is-active' : ''}" href="/community">
					커뮤니티
				</a>
				<a class="navbar-item {currentPath === '/study' ? 'is-active' : ''}" href="/study">
					스터디
				</a>
			{/if}
		</div>

		<div class="navbar-end">
			<div class="navbar-item">
				<div class="buttons">
					{#if data?.user}
						<!-- 사용자가 로그인한 경우 -->
						<span class="navbar-item">
							안녕하세요, {data.user.name}님!
						</span>
						<form action="/logout" method="POST">
							<button type="submit" class="button is-outlined is-light"> 로그아웃 </button>
						</form>
					{:else}
						<!-- 로그인하지 않은 경우 -->
						<a href="/login" class="button is-outlined custom-button"> 로그인 </a>
						<a href="/signup" class="button is-outlined custom-button">
							<strong>회원가입</strong>
						</a>
					{/if}
				</div>
			</div>
		</div>
	</div>
</nav>

<!-- 각 페이지의 최상위 div에 적용 -->
<div class="section page-container">
	<div class="container">
		<!-- 기존 콘텐츠 -->
	</div>
</div>

<style>
	.navbar {
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%) !important;
	}

	.navbar-item.is-active {
		background-color: rgba(255, 255, 255, 0.2) !important;
		border: 1px solid rgba(255, 255, 255, 0.7);
	}
	.navbar-item:hover {
		background-color: rgba(255, 255, 255, 0.2) !important;
	}

	/* 햄버거 메뉴 스타일 */
	.navbar-burger {
		background: transparent;
		border: none;
	}

	.navbar-burger:hover {
		background-color: rgba(255, 255, 255, 0.1) !important;
	}

	.navbar-burger.is-active {
		background-color: rgba(255, 255, 255, 0.2) !important;
	}

	/* 모바일 메뉴 스타일 */
	.navbar-menu.is-active {
		background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
	}

	.button {
		transition: all 0.2s;
	}

	.button:hover {
		transform: translateY(-1px);
	}

	:global(.page-container) {
		animation: fadeIn 0.5s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* 버튼 스타일 수정 */
	.button.is-primary.is-inverted {
		background-color: transparent;
		color: #363636;
		border-color: #363636;
	}

	.button.is-primary.is-inverted:hover {
		background-color: rgba(79, 172, 254, 0.1);
		color: #363636;
		transform: translateY(-1px);
	}

	.button.is-outlined.custom-button {
		background-color: transparent;
		color: #363636;
		border: 0.5px solid #363636;
		margin: 0 0.5rem;
	}

	.button.is-outlined.custom-button:hover {
		background-color: rgba(79, 172, 254, 0.1);
		color: #363636;
		border-color: #363636;
		transform: translateY(-1px);
	}

	.button.is-outlined.is-light {
		border: 2px solid #fff;
		color: #fff;
	}

	.button.is-outlined.is-light:hover {
		background-color: rgba(255, 255, 255, 0.1);
		color: #fff;
		transform: translateY(-1px);
	}
</style>
