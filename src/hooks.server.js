import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const session = event.cookies.get('session');

	// 보안이 필요한 경로 목록
	const securedPaths = ['/community', '/study'];
	const path = event.url.pathname;

	// 세션이 있으면 사용자 정보를 가져오기
	if (session) {
		try {
			const user = await prisma.user.findUnique({
				where: { id: session },
				select: { id: true, email: true, name: true }
			});

			if (user) {
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

	// 보안된 경로에 접근하려 할 때 로그인이 필요한 경우
	if (securedPaths.some((p) => path.startsWith(p)) && !event.locals.user) {
		throw redirect(303, '/login');
	}

	const response = await resolve(event);
	return response;
}
