/**
 * 공지 팝업 정보. 서버 컴포넌트(page.tsx)와 클라이언트 컴포넌트(notice-popup.tsx)가 함께 읽으므로
 * "use client" 파일이 아닌 여기 둔다. ("use client" 파일의 일반 값은 서버에서 읽을 수 없음)
 * 새 행사로 바꿀 때 id를 바꾸면 "다시 보지 않기"가 초기화된다.
 */
export const POPUP = {
  id: "haenam-gayoje-2026",
  src: "/images/haenam-gayoje-2026-v2.webp", // 10/8 수정본 (개최 목적 문구 "알리고자"로 수정)
  width: 1024,
  height: 1536,
  alt: "제1회 해남가요제 & 축하공연 포스터. 예선 10월 25일 해남군청 예술회관, 본선 11월 14일 해남종합운동장 특설무대",
};
