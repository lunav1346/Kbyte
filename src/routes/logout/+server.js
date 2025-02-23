import { redirect } from '@sveltejs/kit';

export async function POST({ cookies }) {
	// 세션 쿠키를 삭제합니다
	cookies.delete('session', { path: '/' });

	// 홈페이지로 리다이렉트합니다
	throw redirect(303, '/');
}
