import { prisma } from '$lib/server/prisma';
import bcrypt from 'bcrypt';
import { fail } from '@sveltejs/kit';

export const actions = {
	// POST 요청 처리
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		const name = formData.get('name');
		const dept = formData.get('dept'); // 추가
		const studentNumber = formData.get('studentNumber'); // 추가

		// 필수 입력값 검증
		if (!email || !password || !name || !dept || !studentNumber) {
			return fail(400, { message: '모든 필드를 입력해주세요.' });
		}

		try {
			// 이메일 중복 확인
			const existingUser = await prisma.user.findUnique({
				where: { email: email.toString() }
			});

			if (existingUser) {
				return fail(400, { message: '이미 사용중인 이메일입니다.' });
			}

			// 비밀번호 해시화 (보안을 위해)
			const hashedPassword = await bcrypt.hash(password.toString(), 10);

			// 새로운 사용자 생성
			const user = await prisma.user.create({
				data: {
					email: email.toString(),
					password: hashedPassword,
					name: name.toString(),
					dept: dept.toString(), // 추가
					studentNumber: studentNumber.toString() // 추가
				}
			});

			// 회원가입 후 자동 로그인을 위한 세션 설정
			cookies.set('session', user.id, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 30 // 30일
			});

			return { success: true };
		} catch (error) {
			console.error('회원가입 오류:', error);
			return fail(500, { message: '서버 오류가 발생했습니다.' });
		}
	}
};
