# Kbyte - 한국항공대학교 프로그래밍 소모임

한국항공대학교 프로그래밍 소모임 Kbyte입니다.

## 🚀 기술 스택

- **FrontEnd**: SvelteKit
- **CSS**: Bulma
- **Backend**: SvelteKit (서버리스)
- **DB**: Supabase (PostgreSQL)
- **Deploy**: Vercel
- **Auth**: 자체 구현 (bcrypt)

## ⚙️ 주요 기능

- 회원가입/로그인 시스템
- 학과별 사용자 관리
- 커뮤니티 게시판
- 스터디 그룹 관리
- 반응형 디자인

## 🔧 개발 환경 설정

```bash
# 저장소 복제
git clone https://github.com/yourusername/kbyte.git
cd kbyte

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 🌐 환경 변수 설정

.env 파일에 다음을 추가해주세요.**(깃허브에 올리는 경우 반드시 .gitignore에 .env 추가해주세요)**

```bash
DATABASE_URL="your-supabase-database-url"
DIRECT_URL="your-supabase-direct-url"
PUBLIC_SUPABASE_URL="your-supabase-project-url"
PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

## 📦 배포

이 프로젝트는 Vercel에 자동 배포되도록 설정되어 있습니다.

## 📃 라이선스

이 프로젝트는 MIT 라이선스에 따라 배포됩니다.

## 📬 지원 및 문의

- 이슈 트래커를 통해 버그를 제보해주세요.
- 프로젝트 개선을 위한 제안도 환영합니다.
- 기타 문의는 lunav1346@kau.kr로 부탁드립니다.
