"use client";

import { useEffect, useState } from "react";

const OPTIONS = [
  { value: "event", label: "행사기획 · 공연 섭외" },
  { value: "vocal", label: "보컬 레슨" },
  { value: "instrument", label: "악기 레슨" },
  { value: "other", label: "기타" },
] as const;

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
    <form className="flex flex-col gap-4 bg-white p-8 text-ink md:p-14">
      {/* 문의 보내기 버튼은 맨 아래에 붙여서 왼쪽 카카오톡·전화 버튼과 같은 줄에 둔다 */}
      <div className="font-serif text-2xl font-bold">온라인 문의 남기기</div>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink/80">
        문의 종류
        <select
          value={type}
          onChange={(e) => setType(e.target.value as Inquiry)}
          className="rounded-xl border border-line bg-soft px-4 py-3 text-base text-ink"
        >
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink/80">
        성함
        <input className="rounded-xl border border-line bg-soft px-4 py-3 text-base" placeholder="홍길동" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink/80">
        연락처
        <input className="rounded-xl border border-line bg-soft px-4 py-3 text-base" placeholder="010-0000-0000" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink/80">
        내용
        <textarea
          rows={4}
          className="rounded-xl border border-line bg-soft px-4 py-3 text-base"
          placeholder="행사 날짜, 장소, 인원 또는 배우고 싶은 과목을 적어 주세요."
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
