import { prisma } from '$lib/server/prisma';
import bcrypt from 'bcrypt';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		try {
			const formData = await request.formData();
			const formDataObj = Object.fromEntries(formData);

			// 필수 필드 확인
			const requiredFields = [
				'email',
				'password',
				'name',
				'dept',
				'studentNumber',
				'studentIdImage'
			];
			for (const field of requiredFields) {
				if (!formDataObj[field]) {
					return {
						status: 400,
						body: {
							success: false,
							message: `${field} 필드가 누락되었습니다.`
						}
					};
				}
			}

			const user = await prisma.user.create({
				data: {
					email: formDataObj.email,
					password: await bcrypt.hash(formDataObj.password, 10),
					name: formDataObj.name,
					dept: formDataObj.dept,
					studentNumber: formDataObj.studentNumber,
					studentIdImage: formDataObj.studentIdImage,
					isValid: false
				}
			});

			return {
				status: 200,
				body: {
					success: true,
					message: '회원가입이 완료되었습니다.'
				}
			};
		} catch (error) {
			console.error('회원가입 오류:', error);

			if (error.code === 'P2002') {
				return {
					status: 400,
					body: {
						success: false,
						message: '이미 등록된 이메일입니다.'
					}
				};
			}

			return {
				status: 500,
				body: {
					success: false,
					message: '서버 오류가 발생했습니다.'
				}
			};
		}
	}
};
