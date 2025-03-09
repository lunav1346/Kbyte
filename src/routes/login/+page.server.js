import { prisma } from '$lib/server/prisma';
import bcrypt from 'bcrypt';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (!email || !password) {
			return fail(400, { message: '이메일과 비밀번호를 모두 입력해주세요.' });
		}

		try {
			const user = await prisma.user.findUnique({
				where: { email: email.toString() }
			});

			if (!user) {
				return fail(400, { message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
			}

			const passwordMatch = await bcrypt.compare(password.toString(), user.password);

			if (!passwordMatch) {
				return fail(400, { message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
			}

			// 계정 인증 상태 확인
			if (!user.isValid) {
				return fail(403, {
					message: '계정이 아직 인증되지 않았습니다. 관리자의 승인을 기다려주세요.'
				});
			}

			// 세션 쿠키를 설정합니다
			cookies.set('session', user.id, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 30 // 30일
			});

			// 여기서 직접 리다이렉트합니다
			return { success: true };
		} catch (error) {
			console.error('로그인 오류:', error);
			return fail(500, { message: '서버 오류가 발생했습니다.' });
		}
	}
};
