# 쓸모랩 (Sseulmo Lab) — 미니 웹 허브

생활 계산기 2종 + 트렌드 테스트 1종으로 구성한 **순수 정적(HTML/CSS/JS) 멀티 페이지 사이트**입니다.
백엔드·빌드 도구·프레임워크가 없어서 GitHub Pages / Cloudflare Pages / Vercel 어디에나 폴더째 올리면 바로 동작합니다.

```
web_hub/
├── index.html              메인 허브 (도구 카드)
├── about.html              사이트 소개 (애드센스 심사용)
├── privacy.html            개인정보처리방침 (쿠키·애드센스 안내 포함)
├── 404.html                페이지 없음
├── trend-2026/index.html   2026 연말 트렌드 고사 (10문항 퀴즈 + 해설 글)
├── jeonse-calc/index.html  전세 vs 월세(반전세) 실질 주거비 계산기 + 해설
├── stock-calc/index.html   주식·ETF 물타기 평단가·목표가 계산기 + 해설
├── assets/
│   ├── style.css           공통 스타일시트 (브랜드 색은 :root 토큰)
│   ├── common.js           숫자 포맷·클립보드 복사 등 공통 유틸
│   └── favicon.svg
├── sitemap.xml
├── robots.txt
└── screenshots/            검수용 스크린샷(배포해도 무해, 원하면 제외)
```

## 로컬에서 확인하기

```bash
cd web_hub
python3 -m http.server 8080
# http://localhost:8080/index.html
```

서버를 띄우지 않아도 `index.html`을 브라우저로 직접 열면 대부분 동작합니다(모든 링크가 상대 경로).

## 배포

| 서비스 | 방법 |
|---|---|
| **GitHub Pages** | 저장소에 `web_hub` 폴더 내용을 올리고 Settings → Pages → Branch 지정. `/repo-name/` 하위 경로에서도 CSS·링크가 그대로 동작하도록 모든 경로를 상대 경로로 작성했습니다. |
| **Cloudflare Pages / Vercel** | 빌드 명령 없이 output directory를 `web_hub`로 지정해 업로드. |
| **직접 서버** | 폴더를 그대로 웹 루트에 복사. |

배포 후 **도메인에 맞춰 canonical·OG·sitemap의 `sseulmolab.com`을 실제 도메인으로 바꿔 주세요.**

## 이름·도메인 바꾸기 (가칭 → 실제 이름)

브랜드 이름은 공통 헤더/푸터/메타 블록에만 나타나도록 구조화해 두었습니다. 아래 3가지를 일괄 치환하면 됩니다.

1. `쓸모랩` → 새 한글 이름
2. `Sseulmo Lab` / `sseulmolab` → 새 영문 이름·도메인
3. `hello@sseulmolab.com` → 새 문의 메일
4. 헤더의 `.brand-mark` 안 글자(`쓸`)와 `assets/favicon.svg` 색/모양

```bash
cd web_hub
grep -rl "쓸모랩\|sseulmolab\|Sseulmo Lab" . | xargs sed -i 's/쓸모랩/새이름/g; s/sseulmolab/newdomain.com/g; s/Sseulmo Lab/New Name/g'
```

브랜드 색을 바꾸려면 `assets/style.css`의 `:root` 변수(`--brand`, `--accent` 등)만 수정하세요.

## 콘텐츠 수정 위치

- **퀴즈 문제·해설**: `trend-2026/index.html` 하단 `<script>` 안의 `QUESTIONS` 배열 10개. 각 항목은 `cat`(카테고리), `q`(질문), `options`(보기 4개), `answer`(정답 인덱스), `explain`(해설), `src`(출처)로 이루어집니다. 문제를 추가하면 진행률·점수·등급이 자동으로 따라갑니다(점수 = 정답 수 × 10).
- **해설 글**: 각 도구 페이지의 `<article class="article">` 블록.
- **계산 가정값**: 각 계산기 `DEFAULTS` 객체(예시값 초기화 버튼과 동일).

## 애드센스 신청 전 체크리스트

- [ ] 실제 도메인으로 canonical·OG·sitemap·robots의 주소 교체
- [ ] `about.html`에 운영자 정보(이름 또는 상호, 연락 메일) 보완 — 현재는 메일만 있음
- [ ] Search Console / 네이버 서치어드바이저에 `sitemap.xml` 제출
- [ ] 승인 후 `ads.txt` 생성 (예: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`) 후 루트에 배치
- [ ] 광고 코드 삽입 위치: 각 페이지의 `<main>` 안 섹션 사이. 계산 결과 영역 위에는 넣지 않는 편이 사용성에 좋습니다.
- [ ] 정책 페이지 링크가 모든 페이지 푸터에 있는지 확인 (구현됨)

## 검수 결과 (2026-11-21)

headless Chromium(Playwright) + 로컬 `python3 -m http.server` 환경에서 확인했습니다. 자동 점검 143개 항목 전부 통과.

- **7개 페이지 × 2 해상도(390×844, 1280×800)**: 모두 HTTP 200, 콘솔 에러·JS 예외 0건, 가로 스크롤(오버플로) 0건, Pretendard 적용 확인
- **트렌드 고사**: 10문항 진행률·즉시 채점 동작, 정답 10개 → 100점·오답 0개, 전부 오답 → 0점·오답 노트 10건, 결과 텍스트 클립보드 복사, 다시 풀기
- **전세·월세 계산기**: 기본값 전세 108만원 / 월세 117만원(월 9만원 차이), 현재 전환율 4.8%·손익분기 4.26%, 대출금리 6% 입력 시 월세 우위로 전환, 초기화 동작
- **주식 계산기**: 5만원×100주 + 4만원×100주 → 평단 45,000원·총 900만원·목표가 49,500원, 목표 수익률 20% → 54,000원, 금액 입력 모드 600만원 → 44,000원·250주

상세 로그: `screenshots/test-report.txt`
스크린샷: `screenshots/mobile-*.png`(390폭), `screenshots/desktop-*.png`(1280폭), `screenshots/el-*.png`(결과 카드 단위)

## 라이선스·출처

- 폰트: Pretendard (SIL Open Font License) — jsDelivr CDN
- 2026 트렌드 문제·해설의 근거 자료는 `trend-2026` 페이지 하단 ‘참고 자료’에 링크로 명시
