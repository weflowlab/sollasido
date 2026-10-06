"use client";

import { useEffect, useState } from "react";

const OPTIONS = [
  { value: "event", label: "행사기획 · 공연 섭외" },
  { value: "vocal", label: "보컬 레슨" },
  { value: "instrument", label: "악기 레슨" },
  { value: "other", label: "기타" },
] as const;

// 입력칸 공통 스타일: OS 기본 모양(iOS 파란 포커스 테두리 등)을 끄고 브랜드 포커스로 통일
const FIELD =
  "w-full min-w-0 appearance-none rounded-xl border border-line bg-soft px-4 py-3 text-base text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink/40 focus:border-orange focus:bg-white focus:ring-4 focus:ring-orange/15";

type Inquiry = (typeof OPTIONS)[number]["value"];

const isInquiry = (v: string | undefined): v is Inquiry =>
  OPTIONS.some((o) => o.value === v);

/**
 * 페이지 어디서든 data-inquiry="vocal" 같은 속성이 붙은 링크를 누르면
 * 폼의 문의 종류가 그 값으로 바뀐다.
 */
export default function ContactForm() {
  const [type, setType] = useState<Inquiry>("event");

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-inquiry]");
      const v = el?.dataset.inquiry;
      if (isInquiry(v)) setType(v);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <form className="flex min-w-0 flex-col gap-4 bg-white p-7 text-ink md:p-14">
      {/* 문의 보내기 버튼은 맨 아래에 붙여서 왼쪽 카카오톡·전화 버튼과 같은 줄에 둔다 */}
      <div className="font-serif text-2xl font-bold">온라인 문의 남기기</div>
      <label className="flex min-w-0 flex-col gap-1.5 text-sm font-medium text-ink/80">
        문의 종류
        <span className="relative block">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as Inquiry)}
            className={`${FIELD} cursor-pointer pr-11`}
          >
            {OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {/* OS 기본 화살표 대신 같은 모양의 화살표 */}
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </label>
      <label className="flex min-w-0 flex-col gap-1.5 text-sm font-medium text-ink/80">
        성함
        <input className={FIELD} placeholder="홍길동" />
      </label>
      <label className="flex min-w-0 flex-col gap-1.5 text-sm font-medium text-ink/80">
        연락처
        <input className={FIELD} inputMode="tel" placeholder="010-0000-0000" />
      </label>
      <label className="flex min-w-0 flex-col gap-1.5 text-sm font-medium text-ink/80">
        내용
        <textarea
          rows={4}
          className={`${FIELD} resize-none`}
          placeholder="행사 날짜, 장소, 인원 또는 배우고 싶은 분야를 적어 주세요."
        />
      </label>
      <button
        type="button"
        className="mt-auto rounded-full bg-ink px-6 py-4 text-base font-semibold leading-none text-white transition-colors hover:bg-orange-deep"
      >
        문의 보내기
      </button>
    </form>
  );
}
