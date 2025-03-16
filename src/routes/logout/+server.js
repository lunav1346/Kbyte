import { redirect } from '@sveltejs/kit';

export async function POST({ cookies }) {
	// 세션 쿠키 삭제
	cookies.delete('session', { path: '/' });

	// 홈페이지로 리다이렉트
	throw redirect(303, '/');
}
