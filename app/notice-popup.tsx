"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { POPUP } from "./notice-data";

const HIDE_KEY = `sollasido-popup-hidden:${POPUP.id}`;
const OPEN_EVENT = "notice-popup:open";

/** 페이지 어디서든 팝업을 다시 열 때 쓰는 버튼 (공지 카드 등) */
export function NoticePopupTrigger({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      {children}
    </button>
  );
}

export default function NoticePopup() {
  const [open, setOpen] = useState(false);
  // 처음 자동으로 뜬 팝업에서만 "다시 보지 않기"를 보여준다
  const [auto, setAuto] = useState(false);

  // 첫 방문 시 자동으로 열기 (다시 보지 않기를 누른 사람은 제외)
  useEffect(() => {
    let hidden = false;
    try {
      hidden = localStorage.getItem(HIDE_KEY) === "1";
    } catch {}
    if (hidden) return;
    const t = setTimeout(() => {
      setAuto(true);
      setOpen(true);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  // 공지 카드에서 다시 열기
  useEffect(() => {
    const onOpen = () => {
      setAuto(false);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const hideForever = useCallback(() => {
    try {
      localStorage.setItem(HIDE_KEY, "1");
    } catch {}
    setOpen(false);
  }, []);

  // 열려 있는 동안 뒤 페이지 스크롤 막기 + Esc로 닫기
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="popup-fade fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 backdrop-blur-[2px]"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="공지 팝업: 제1회 해남가요제"
        onClick={(e) => e.stopPropagation()}
        className="popup-rise flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        // 포스터(2:3)가 화면 높이 안에 다 들어오도록: 폭 = (화면 높이 - 아래 버튼 줄) × 2/3
        style={{ width: "min(92vw, calc((100svh - 2rem - 52px) * 0.6667), 520px)" }}
      >
        <Image
          src={POPUP.src}
          alt={POPUP.alt}
          width={POPUP.width}
          height={POPUP.height}
          sizes="(max-width: 600px) 92vw, 520px"
          priority
          className="block h-auto w-full"
        />
        {/* 칸 구분선 없이, 글자 부분만 눌리게 */}
        <div className="flex h-[52px] items-center justify-between border-t border-line px-5 text-[15px] font-medium">
          {auto ? (
            <button
              type="button"
              onClick={hideForever}
              className="text-muted transition-colors hover:text-ink"
            >
              다시 보지 않기
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={close}
            className="font-semibold text-ink transition-colors hover:text-orange-deep"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
