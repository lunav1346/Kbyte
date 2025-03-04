<script>
	export let data;
	let isActive = false;
	let currentPath = '';

	function toggleMenu() {
		isActive = !isActive;
	}

	if (typeof window !== 'undefined') {
		currentPath = window.location.pathname;
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
							<button type="submit" class="button is-light"> 로그아웃 </button>
						</form>
					{:else}
						<!-- 로그인하지 않은 경우 -->
						<a href="/login" class="button is-light"> 로그인 </a>
						<a href="/signup" class="button is-primary">
							<strong>회원가입</strong>
						</a>
					{/if}
				</div>
			</div>
		</div>
	</div>
</nav>
