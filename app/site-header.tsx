"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { href: "#about", label: "회사소개" },
  { href: "#services", label: "하는 일" },
  { href: "#band", label: "솔라시도 밴드" },
  { href: "#gallery", label: "공연 갤러리" },
  { href: "#contact", label: "문의" },
];

const HEADER_H = 80;
const MOUSE_ZONE = 72; // 화면 위쪽 이 높이 안으로 마우스가 오면 메뉴바 노출

export default function SiteHeader() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // 모바일 메뉴가 열려 있으면 흰 바탕으로 보여야 글자가 읽힘
  const solid = scrolled || menuOpen;

  const menuOpenRef = useRef(false);
  const headerRef = useRef<HTMLElement>(null);

  // 메뉴가 열려 있을 때 헤더 바깥을 누르면 닫기
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen]);
  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  // 데스크톱 폭으로 넓어지면 모바일 메뉴 닫기
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let travel = 0; // 같은 방향으로 이어서 스크롤한 거리
    let mouseNearTop = false;
    let ticking = false;
    // 문의 카드로 이동하는 동안은 헤더가 카드 윗부분(0.5cm 여백)을 덮지 않도록 강제로 숨김
    let suppressUntil = 0;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      setScrolled(y > HEADER_H);

      if (performance.now() < suppressUntil) {
        setVisible(false);
        travel = 0;
        return;
      }

      if (y <= HEADER_H) {
        setVisible(true);
        travel = 0;
        return;
      }
      // 방향이 바뀌면 거리 초기화 → 살짝 흔들리는 스크롤에는 반응하지 않음
      travel = Math.sign(dy) === Math.sign(travel) ? travel + dy : dy;
      if (travel > 24 && !mouseNearTop && !menuOpenRef.current) setVisible(false); // 내리면 숨김
      else if (travel < -24) setVisible(true); // 올리면 나타남
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const near = e.clientY <= MOUSE_ZONE;
      if (near !== mouseNearTop) {
        mouseNearTop = near;
        if (near && performance.now() >= suppressUntil) setVisible(true);
      }
    };

    const onContactClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest('a[href="#contact"]');
      if (!a) return;
      suppressUntil = performance.now() + 1600; // 부드러운 스크롤이 끝날 때까지
      setMenuOpen(false);
      setVisible(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("click", onContactClick, true);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("click", onContactClick, true);
    };
  }, []);

  return (
    <>
      {/* 맨 위에서는 투명하게 히어로 위에 얹히고, 스크롤하면 흰 바탕으로 바뀜 */}
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 border-b will-change-transform ${
          solid
            ? "border-line bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
        style={{
          height: HEADER_H,
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          transition:
            "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <div className="mx-auto grid h-full max-w-6xl grid-cols-[1fr_auto] items-center px-4 md:px-6 lg:grid-cols-[1fr_auto_1fr]">
          <a href="#top" className="flex items-center gap-3 justify-self-start">
            <Image
              src="/logo-mark.png"
              alt="솔라시도 로고"
              width={46}
              height={46}
              priority
              className="rounded-full ring-1 ring-black/10"
            />
            <span className="flex flex-col items-start leading-none">
              <span className={`-ml-[0.06em] font-serif text-[22px] font-bold tracking-tight transition-colors ${solid ? "text-ink" : "text-white"}`}>
                솔라시도
              </span>
              <span className={`mt-1.5 text-[10px] font-semibold tracking-[0.16em] transition-colors ${solid ? "text-muted" : "text-white/70"}`}>
                ENTERTAINMENT · BAND
              </span>
            </span>
          </a>

          <nav className="hidden items-center justify-center lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={`px-5 text-[17px] font-semibold transition-colors lg:px-6 ${
                  solid ? "text-ink/85 hover:text-orange-deep" : "text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] hover:text-amber"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
          <a
            href="#contact"
            className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-colors sm:inline-block ${
              scrolled
                ? "bg-ink text-white hover:bg-orange hover:text-ink"
                : "bg-white/10 text-white ring-1 ring-white/40 backdrop-blur hover:bg-white hover:text-ink"
            }`}
          >
            문의하기
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden ${
              solid ? "text-ink hover:bg-ink/5" : "text-white hover:bg-white/10"
            }`}
          >
            <span className="relative block h-3.5 w-5">
              <span className={`absolute left-0 top-0 h-[2px] w-5 rounded bg-current transition-transform duration-300 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[6px] h-[2px] w-5 rounded bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[12px] h-[2px] w-5 rounded bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </span>
          </button>
          </div>
        </div>

        {/* 모바일 · 태블릿 메뉴 */}
        <div
          className={`overflow-hidden border-b border-line bg-white transition-[max-height,opacity] duration-500 ease-out lg:hidden ${
            menuOpen ? "max-h-[480px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3 md:px-6">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-line/70 py-4 text-lg font-semibold text-ink last:border-b-0"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-3 mb-2 rounded-full bg-ink py-4 text-center text-base font-semibold leading-none text-white"
            >
              문의하기
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
