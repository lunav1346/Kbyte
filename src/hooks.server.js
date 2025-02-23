import { prisma } from '$lib/server/prisma';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	// 세션 쿠키를 확인합니다
	const session = event.cookies.get('session');

	if (session) {
		try {
			// 데이터베이스에서 사용자를 찾습니다
			const user = await prisma.user.findUnique({
				where: { id: session },
				select: { id: true, email: true, name: true }
			});

			if (user) {
				// 사용자 정보를 locals에 저장합니다 (비밀번호는 제외)
				event.locals.user = {
					id: user.id,
					email: user.email,
					name: user.name
				};
			}
		} catch (error) {
			console.error('Session verification error:', error);
		}
	}

	// 요청을 계속 처리합니다
	const response = await resolve(event);
	return response;
}
