// 로그인 상태를 확인하는 API 엔드포인트
export async function GET({ cookies }) {
	// 쿠키확인
	const sessionId = cookies.get('session');

	return new Response(
		JSON.stringify({
			isLoggedIn: !!sessionId
		}),
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
}
