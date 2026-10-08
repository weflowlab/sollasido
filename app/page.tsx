import Image from "next/image";
import Reveal from "./reveal";
import SiteHeader from "./site-header";
import ContactForm from "./contact-form";
import NoticePopup, { NoticePopupTrigger } from "./notice-popup";
import { POPUP } from "./notice-data";

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const PHOTOS = {
  heroC: u("photo-1516280440614-37939bbacd81", 700),
  mic: u("photo-1511671782779-c97d3d27a1d4", 700),
  violin: u("photo-1465847899084-d164df4dedc6", 900),
  piano: u("photo-1513883049090-d0b7439799bf", 900),
  sheet: u("photo-1507838153414-b4b713384a76", 900),
  event: u("photo-1492684223066-81342ee5ff30"),
  vocal: u("photo-1478737270239-2f02b77fc618"),
  instrument: u("photo-1510915361894-db8b60106cb1"),
  g1: u("photo-1459749411175-04bf5292ceea", 900),
  g2: u("photo-1520523839897-bd0b52f945a0", 900),
  g3: u("photo-1519892300165-cb5542fb47c7", 900),
  g4: u("photo-1470225620780-dba8ba36b745", 900),
  g5: u("photo-1511795409834-ef04bbd61622", 900),
  g6: u("photo-1514525253161-7a46d19cd819", 900),
};

const MARQUEE = ["EVENT PLANNING", "VOCAL LESSON", "INSTRUMENT LESSON", "SOLLASIDO BAND", "HAENAM"];

const SERVICES = [
  {
    title: "행사기획",
    inquiry: "event",
    cta: "행사기획 문의하기",
    en: "EVENT PLANNING",
    lead: ["축제부터 마을 잔치까지,", "무대는 저희가 만듭니다."],
    desc: ["지역 축제, 기업 행사, 기념식, 소규모 모임까지.", "기획과 섭외, 무대·음향·조명, 당일 진행 운영을", "한 팀이 처음부터 끝까지 맡습니다."],
    tags: ["축제 · 기념식", "기업 행사", "무대 · 음향 · 조명"],
    photo: PHOTOS.event,
    alt: "조명이 켜진 야외 행사 무대",
    accent: "orange",
  },
  {
    title: "보컬지도",
    inquiry: "vocal",
    cta: "보컬 레슨 문의하기",
    en: "VOCAL LESSON",
    lead: ["노래는 나이가 없습니다.", "오늘부터 배우면 됩니다."],
    desc: ["발성과 호흡부터 무대 매너까지.", "취미로 시작하는 분, 노래방에서 한 곡 멋지게 부르고 싶은 분,", "무대에 서고 싶은 분까지 눈높이에 맞춰 1:1로 지도합니다."],
    tags: ["1:1 맞춤 레슨", "발성 · 호흡", "트로트 · 가요"],
    photo: PHOTOS.vocal,
    alt: "무대 위 마이크",
    accent: "teal",
  },
  {
    title: "악기지도",
    inquiry: "instrument",
    cta: "악기 레슨 문의하기",
    en: "INSTRUMENT LESSON",
    lead: ["현역 밴드 연주자가 직접 가르칩니다."],
    desc: ["기타, 드럼, 건반, 베이스. 악보를 몰라도 괜찮습니다.", "기초부터 차근차근, 원하시면 합주반에서 솔라시도 밴드와 함께", "무대에 오릅니다."],
    tags: ["기타 · 드럼 · 건반 · 베이스", "기초반 · 합주반"],
    photo: PHOTOS.instrument,
    alt: "기타를 연주하는 손",
    accent: "orange",
  },
];

const BAND_REEL = [
  { src: PHOTOS.g6, alt: "밴드 공연" },
  { src: PHOTOS.mic, alt: "빈티지 마이크" },
  { src: PHOTOS.g3, alt: "드럼 연주" },
  { src: PHOTOS.violin, alt: "현악 연주" },
  { src: PHOTOS.g1, alt: "무대 조명" },
  { src: PHOTOS.instrument, alt: "기타 연주" },
  { src: PHOTOS.piano, alt: "피아노 연주" },
  { src: PHOTOS.sheet, alt: "악보" },
];

const GALLERY = [
  { src: PHOTOS.g1, alt: "조명이 켜진 공연 무대", cls: "col-span-2 md:col-span-3 md:row-span-2" },
  { src: PHOTOS.g6, alt: "밴드 공연", cls: "md:col-span-2" },
  { src: PHOTOS.g2, alt: "피아노 건반", cls: "md:col-span-1" },
  { src: PHOTOS.g3, alt: "드럼 연주", cls: "md:col-span-1" },
  { src: PHOTOS.g4, alt: "공연 조명", cls: "md:col-span-2" },
  { src: PHOTOS.heroC, alt: "보컬 무대", cls: "col-span-2 md:col-span-6" },
];

/** 공지 · 이벤트. 가로 2개씩 들어가는 카드. popup: true 면 누르면 공지 팝업을 다시 연다 */
const NOTICES = [
  {
    tag: "공지",
    title: "제1회 해남가요제 & 축하공연",
    date: "2026.10.08",
    image: POPUP.src,
    alt: "제1회 해남가요제 & 축하공연 포스터",
    popup: true,
  },
];

const HERO_SLOT_A = [
  { src: PHOTOS.mic, alt: "무대 위 빈티지 마이크" },
  { src: PHOTOS.event, alt: "조명이 켜진 행사 무대" },
  { src: PHOTOS.piano, alt: "피아노 연주" },
];

const HERO_SLOT_B = [
  { src: PHOTOS.instrument, alt: "기타를 연주하는 손" },
  { src: PHOTOS.heroC, alt: "노래하는 보컬" },
  { src: PHOTOS.g1, alt: "무대 조명" },
];

/** 글자 사이에 끼는 사진 조각. 사진 3장이 천천히 교차하며 바뀐다 */
const INLINE_SLOT = "hidden sm:inline-block h-[0.9em] w-[1.8em] translate-y-[0.07em]";

function PhotoSlot({ photos, className = INLINE_SLOT }: { photos: { src: string; alt: string }[]; className?: string }) {
  return (
    <span className={`xfade relative ${className} shrink-0 overflow-hidden rounded-md shadow-xl shadow-black/30 ring-1 ring-white/30`}>
      {photos.map((p, i) => (
        <span key={p.src} className="absolute inset-0" style={{ animationDelay: `${i * 4}s` }}>
          <Image src={p.src} alt={p.alt} fill sizes="240px" className="object-cover" priority={i === 0} />
        </span>
      ))}
    </span>
  );
}

/** 상담 카드 두 개. 히어로는 문의하기·전화 상담, 문의 섹션은 카카오톡 상담·전화 상담. 전화는 대표 번호로 연결 */
function ChannelCards({ place = "hero" }: { place?: "hero" | "contact" }) {
  // 히어로는 "문의하기", 문의 섹션은 "카카오톡 상담"
  const first =
    place === "contact"
      ? {
          title: "카카오톡 상담",
          href: "https://www.kakaocorp.com/page/service/service/openchat", // 카카오톡 오픈채팅 안내 (실제 채널 주소로 교체 예정)
          external: true,
          tile: "bg-[#FEE500] text-[#191919]",
          icon: (
            <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 3.5c-5.25 0-9.5 3.33-9.5 7.44 0 2.6 1.71 4.9 4.3 6.22l-.92 3.4c-.08.3.26.54.52.37l4.03-2.66c.52.07 1.05.11 1.57.11 5.25 0 9.5-3.33 9.5-7.44S17.25 3.5 12 3.5Z" /></svg>
          ),
        }
      : null;
  const cards = [
    {
      title: "문의하기",
      href: "#contact", // 문의 폼으로 이동
      tile: "bg-orange text-white",
      icon: (
        <svg aria-hidden viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.4 2.6a1.4 1.4 0 0 1 3 3l-9 9a2 2 0 0 1-.85.5l-2.87.84a.5.5 0 0 1-.62-.62l.84-2.87a2 2 0 0 1 .5-.85Z" /></svg>
      ),
    },
    {
      title: "전화 상담",
      href: "tel:010-2376-7518", // 대표(단장 유광종) 번호로 연결
      tile: "bg-white text-ink",
      icon: (
        <svg aria-hidden viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" /></svg>
      ),
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-2.5 md:gap-3">
      {(first ? [first, cards[1]] : cards).map((c) => (
        <a
          key={c.title}
          href={c.href}
          {...("external" in c && c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group flex items-center gap-2.5 rounded-2xl bg-white/[0.08] p-2.5 text-left ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/[0.14] md:gap-3 md:p-3.5"
        >
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl md:h-10 md:w-10 ${c.tile}`}>{c.icon}</span>
          <span className={`relative min-w-0 flex-1 ${
            // 문의 섹션은 문구를 1px 더 위로
            place === "contact" ? "-top-[1.5px]" : "-top-[0.5px]"
          } ${
            // 문의 섹션의 첫 카드 문구만 4px 오른쪽으로
            place === "contact" && c.title === "카카오톡 상담" ? "-left-[3px]" : "-left-[7px]"
          } whitespace-nowrap text-center text-sm font-semibold leading-none text-white md:text-[15px]`}>{c.title}</span>
          <svg aria-hidden viewBox="0 0 24 24" className="hidden h-4 w-4 shrink-0 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:text-white sm:block" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
      ))}
    </div>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 text-xs font-semibold tracking-[0.3em] ${light ? "text-white/70" : "text-muted"}`}>
      <span className="grad-line h-px w-8" />
      {children}
    </span>
  );
}

const MELODY = [
  // 음악 폰트의 음표 기준점은 머리 아래쪽이라, 머리 중심보다 5(반 칸) 아래 값을 주고
  // 보기 좋게 1px 더 내렸다
  { y: 56 }, // 솔: 둘째 줄(50)
  { y: 51 }, // 라: 둘째·셋째 줄 사이(45)
  { y: 46 }, // 시: 셋째 줄(40)
  { y: 41 }, // 도: 셋째·넷째 줄 사이(35)
];

/** 좌우 끝까지 이어지는 오선 위에 "솔라시도" 선율 */
function StaffDivider() {
  const start = 110;
  const step = 56;
  const measure = 4 * step + 40;
  const measures = 4;
  return (
    <div className="relative h-[100px] w-full overflow-hidden" aria-hidden>
      <div
        className="absolute left-[calc(50%-162.5px)] top-[30px] h-[41px] w-[325px] md:left-0 md:right-0 md:w-auto"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(22,21,26,0.22) 0 1px, transparent 1px 10px)",
        }}
      />
      <svg
        width="1160"
        height="100"
        viewBox="0 -10 1160 100"
        className="absolute left-[calc(50%-182.5px)] top-0 md:left-1/2 md:-translate-x-1/2"
        style={{ fontFamily: "var(--font-music)" }}
      >
        <text x="40" y="50" fontSize="40" fill="#ee8b3a">
          {"\u{1D11E}"}
        </text>
        {Array.from({ length: measures }).map((_, m) =>
          MELODY.map((n, i) => {
            const x = start + m * measure + i * step;
            return (
              <g key={`${m}-${i}`} className={`note-pop ${m > 0 ? "hidden md:inline" : ""}`} style={{ animationDelay: `${i * 0.45}s` }}>
                <text x={x} y={n.y} fontSize="40" fill={i % 2 === 0 ? "#16151a" : "#1f6668"}>
                  {"\u{1D15F}"}
                </text>
              </g>
            );
          }),
        )}
        {Array.from({ length: measures }).map((_, m) => {
          const x = start + m * measure + 4 * step + 4;
          const last = m === measures - 1;
          return (
            <g key={`bar-${m}`} stroke="#16151a" strokeOpacity="0.5" className={m > 0 ? "hidden md:inline" : ""}>
              <line x1={x} x2={x} y1="20" y2="60" strokeWidth="1" />
              {last && <line x1={x + 5} x2={x + 5} y1="20" y2="60" strokeWidth="3" />}
              {/* 모바일은 첫 마디에서 끝나므로 겹세로줄 */}
              {m === 0 && <line x1={x + 5} x2={x + 5} y1="20" y2="60" strokeWidth="3" className="md:hidden" />}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <div id="top" className="flex flex-1 flex-col">
      <Reveal />

      <SiteHeader />
      <NoticePopup />

      {/* 히어로: 이음컴퍼니식 큰 타이포 + 글자 사이 사진 조각, 명함 그라데이션 배경 */}
      <section className="aurora relative overflow-hidden text-white">
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-74px)] max-w-6xl flex-col items-center justify-center px-4 pb-8 pt-[112px] sm:min-h-[100svh] sm:pb-14 sm:pt-[136px] text-center md:px-6">
          {/* 휴대폰 전용: 이음컴퍼니 모바일처럼 사진을 헤드라인 위·아래로 엇갈려 배치 */}
          <div className="rise rise-1 mb-6 flex w-full justify-end sm:hidden">
            <PhotoSlot photos={HERO_SLOT_A} className="block aspect-[16/10] w-[54%] !rounded-lg" />
          </div>

          <h1 className="rise rise-2 font-serif text-[36px] font-bold leading-[1.2] tracking-tight sm:text-5xl md:text-6xl lg:text-[88px]">
            <span className="flex flex-wrap items-center justify-center gap-x-[0.3em] gap-y-2">
              <span>해남의</span>
              <PhotoSlot photos={HERO_SLOT_A} />
              <span>무대는</span>
            </span>
            <span className="mt-2 flex flex-wrap items-center justify-center gap-x-[0.3em] gap-y-2 md:mt-4">
              <PhotoSlot photos={HERO_SLOT_B} />
              <span>
                <span className="shine-text hero-shadow">솔라시도</span>가 만듭니다
              </span>
            </span>
          </h1>

          <div className="rise rise-3 mt-6 flex w-full justify-start sm:hidden">
            <PhotoSlot photos={HERO_SLOT_B} className="block aspect-[16/10] w-[54%] !rounded-lg" />
          </div>

          <p className="rise rise-3 mt-7 hidden max-w-3xl text-[15px] sm:block leading-7 text-white/80 sm:mt-8 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
            해남에서 무대를 만들고,
            <br className="sm:hidden" /> 노래와 악기를 가르칩니다.
            <br /> 행사 하나를 맡겨 주시면
            <br className="sm:hidden" /> 기획부터 공연까지 솔라시도가 함께합니다.
          </p>

          <div className="rise rise-4 mt-8 w-full max-w-[340px] sm:mt-10 sm:w-[460px] sm:max-w-none">
            <ChannelCards />
          </div>
        </div>

      </section>

      {/* 마키 */}
      <div className="relative overflow-hidden border-y border-line bg-white py-5">
        <div className="marquee-track flex w-max whitespace-nowrap">
          {[0, 1].map((k) => (
            <div key={k} className="flex items-center" aria-hidden={k === 1}>
              {MARQUEE.map((t) => (
                <span key={`${k}-${t}`} className="flex items-center font-serif text-2xl font-bold tracking-[0.08em] text-ink md:text-3xl">
                  <span className="px-7">{t}</span>
                  <span className="text-orange">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <main className="flex flex-col">
        {/* 소개 */}
        <section id="about" className="scroll-mt-20 bg-white">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-[0.9fr_1.1fr] md:gap-14 md:px-6 md:py-32">
            <div className="reveal relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[32px]">
                <Image src={PHOTOS.g6} alt="밴드 공연" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
              </div>
            </div>
            <div className="reveal flex flex-col gap-6">
              <Eyebrow>ABOUT US</Eyebrow>
              <h2 className="font-serif text-4xl font-bold leading-tight text-ink md:text-5xl">
                무대를 만들고,
                <br />
                무대에 서고,
                <br />
                <span className="text-orange-deep">무대를 가르칩니다.</span>
              </h2>
              <p className="text-lg leading-8 text-ink/85">
                솔라시도 엔터테인먼트는 해남에서 행사를 기획하고 운영하는 회사입니다.
                <br className="hidden md:block" /> 같은 이름의 솔라시도 밴드가 직접 무대에 서고,
                <br className="hidden md:block" /> 그 경험을 그대로 보컬·악기 지도에 담습니다.
              </p>
              <p className="text-base leading-7 text-muted">
                큰 축제든 작은 모임이든,
                <br className="hidden md:block" /> 무대 위에서 사람들이 함께 웃는 순간을 만드는 것이 저희의 일입니다.
              </p>
              <div className="grid grid-cols-3 gap-4 border-t border-line pt-6">
                {[
                  ["행사기획", "기획 · 섭외 · 운영"],
                  ["보컬지도", "1:1 맞춤 레슨"],
                  ["악기지도", "현역 연주자"],
                ].map(([t, d], i) => (
                  <div key={t} className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
                    <span className={`font-serif text-xl font-bold sm:text-2xl md:-ml-[0.06em] ${i === 1 ? "text-teal-deep" : "text-orange-deep"}`}>{t}</span>
                    <span className="text-sm text-muted">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <StaffDivider />

        {/* 하는 일: 번갈아 배치 */}
        <section id="services" className="scroll-mt-20 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32">
            <div className="reveal flex flex-col items-start gap-4">
              <Eyebrow>WHAT WE DO</Eyebrow>
              <h2 className="font-serif text-4xl font-bold leading-tight text-ink md:text-5xl">
                행사기획 <span className="text-orange">·</span> 보컬지도 <span className="text-teal">·</span> 악기지도
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-muted">
                세 가지 일을 한 팀이 합니다. 그래서 무대 경험이 레슨이 되고, 레슨이 다시 무대가 됩니다.
              </p>
            </div>

            <div className="mt-16 flex flex-col gap-10 md:gap-16">
              {SERVICES.map((s, i) => {
                const flip = i % 2 === 1;
                const accent = s.accent === "teal" ? "text-teal-deep" : "text-orange-deep";
                const chip = s.accent === "teal" ? "bg-teal/10 text-teal-deep" : "bg-orange/10 text-orange-deep";
                return (
                  <article
                    key={s.title}
                    className={`reveal grid items-center gap-8 md:grid-cols-2 md:gap-14 ${flip ? "md:[&>*:first-child]:order-2" : ""}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[32px]">
                      <Image src={s.photo} alt={s.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                    <div className="flex flex-col gap-4">
                      <span className={`text-xs font-semibold tracking-[0.3em] ${accent}`}>{s.en}</span>
                      <h3 className="font-serif text-3xl font-bold text-ink md:text-4xl">{s.title}</h3>
                      <p className="text-xl font-semibold leading-8 text-ink">
                        {s.lead.map((line, j) => (
                          <span key={line}>
                            {j > 0 && <br className="md:hidden" />}
                            {j > 0 && " "}
                            {line}
                          </span>
                        ))}
                      </p>
                      <p className="text-base leading-7 text-muted md:text-[17px] md:leading-8">
                        {s.desc.map((line, j) => (
                          <span key={line}>
                            {j > 0 && <br className="hidden md:block" />}
                            {j > 0 && " "}
                            {line}
                          </span>
                        ))}
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {s.tags.map((t) => (
                          <li key={t} className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${chip}`}>
                            {t}
                          </li>
                        ))}
                      </ul>
                      <a href="#contact" data-inquiry={s.inquiry} className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange hover:text-ink">
                        {s.cta} <span aria-hidden>→</span>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 솔라시도 밴드: 무대 조명 + 무한 캐러셀 */}
        <section id="band" className="stage scroll-mt-20 overflow-hidden text-white">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 pt-24 text-center md:px-6 md:pt-32">
            <div className="reveal flex flex-col items-center gap-6">
              <Eyebrow light>SOLLASIDO BAND</Eyebrow>
              <h2 className="font-serif text-[32px] font-bold leading-[1.25] sm:text-5xl md:text-6xl lg:text-7xl">
                직접 무대에 서는 팀,
                <br />
                <span className="shine-text">솔라시도 밴드</span>
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-white/80 md:text-xl md:leading-9">
                기획만 하지 않습니다.
                <br className="hidden md:block" /> 축제 오프닝, 기업 행사, 결혼식까지 솔라시도 밴드가 직접 연주합니다.
                <br className="hidden md:block" /> 가요부터 트로트, 최신곡까지<br className="md:hidden" /> 자리에 맞는 선곡으로 준비합니다.
              </p>
              <div className="mt-2 grid w-full grid-cols-3 gap-2 sm:gap-3">
                {[
                  ["축제 · 행사", "오프닝 · 메인 무대"],
                  ["결혼식 · 잔치", "축가 · 라이브 반주"],
                  ["기업 · 기관", "송년회 · 기념식"],
                ].map(([t, d]) => (
                  <div key={t} className="rounded-xl border border-white/15 bg-white/5 px-2 py-3.5 backdrop-blur sm:rounded-2xl sm:p-5">
                    <div className="font-serif text-[15px] font-bold text-amber sm:text-lg">{t}</div>
                    <div className="mt-1 text-[11px] leading-4 text-white/70 sm:text-sm">{d}</div>
                  </div>
                ))}
              </div>
              <a href="#contact" data-inquiry="event" className="mt-2 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-amber">
                공연 섭외 문의
              </a>
            </div>
          </div>

          <div className="relative mt-16 pb-24 md:mt-20 md:pb-32">
            <div className="marquee-track flex w-max" style={{ animationDuration: "60s" }}>
              {[0, 1].map((k) => (
                <div key={k} className="flex" aria-hidden={k === 1}>
                  {BAND_REEL.map((p) => (
                    <div key={`${k}-${p.src}`} className="pr-4 md:pr-5">
                      <div className="relative h-[200px] w-[300px] overflow-hidden rounded-2xl ring-1 ring-white/15 md:h-[300px] md:w-[450px]">
                        <Image src={p.src} alt={k === 0 ? p.alt : ""} fill sizes="450px" className="object-cover" />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 갤러리 */}
        <section id="gallery" className="scroll-mt-20 bg-soft">
          <div className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32">
            <div className="reveal flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col gap-4">
                <Eyebrow>GALLERY</Eyebrow>
                <h2 className="font-serif text-4xl font-bold leading-tight text-ink md:text-5xl">함께한 무대</h2>
              </div>
            </div>
            <div className="reveal mt-12 grid auto-rows-[170px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-6 md:gap-4">
              {GALLERY.map((g) => (
                <div key={g.src} className={`relative overflow-hidden rounded-2xl ${g.cls}`}>
                  <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 공지 · 이벤트 */}
        <section id="notice" className="scroll-mt-20 bg-white">
          <div className="mx-auto max-w-6xl px-4 pt-24 md:px-6 md:pt-32">
            <div className="reveal flex flex-col items-start gap-4">
              <Eyebrow>NOTICE &amp; EVENT</Eyebrow>
              <h2 className="font-serif text-4xl font-bold leading-tight text-ink md:text-5xl">공지 · 이벤트</h2>
            </div>
            <div className="reveal mt-10 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
              {NOTICES.map((n) => {
                const body = (
                  <>
                    <span className="relative block aspect-[16/10] overflow-hidden bg-soft">
                      <Image
                        src={n.image}
                        alt={n.alt}
                        fill
                        sizes="(min-width: 768px) 560px, 100vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </span>
                    <span className="flex flex-col gap-2 p-5 md:p-6">
                      <span className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange-deep">{n.tag}</span>
                        <time className="text-sm text-muted">{n.date}</time>
                      </span>
                      <span className="font-serif text-xl font-bold leading-snug text-ink md:text-2xl">{n.title}</span>
                    </span>
                  </>
                );
                const card =
                  "group flex w-full flex-col overflow-hidden rounded-3xl border border-line bg-white text-left shadow-sm transition-shadow hover:shadow-xl hover:shadow-black/5";
                return n.popup ? (
                  <NoticePopupTrigger key={n.title} className={card}>
                    {body}
                  </NoticePopupTrigger>
                ) : (
                  <div key={n.title} className={card}>
                    {body}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 문의 */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32">
            {/* 이동 목표는 섹션이 아니라 카드. 떠오르는 효과(reveal)가 없는 바깥 틀에 id를 둬야 멈추는 위치가 정확함 */}
            <div id="contact" className="scroll-mt-[19px]">
            <div className="reveal overflow-hidden rounded-[36px] bg-white text-white shadow-2xl shadow-black/10 ring-1 ring-line">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr]">
                <div className="aurora relative flex flex-col gap-5 p-7 md:gap-6 md:p-14">
                  <Eyebrow light>CONTACT</Eyebrow>
                  <h2 className="font-serif text-[28px] font-bold leading-[1.3] md:text-[44px] md:leading-[1.2]">
                    어떤 무대를
                    <br /> 준비하고 계신가요?
                  </h2>
                  <p className="hidden text-[15px] leading-7 text-white/75 md:block md:text-lg md:leading-8">
                    행사 날짜와 장소, 또는 배우고 싶은 악기를 알려 주세요.
                    <br className="hidden md:block" /> 담당자가 직접 연락드립니다.
                  </p>

                  <dl className="mt-auto hidden gap-3 border-t border-white/15 pt-6 text-[15px] md:grid">
                    <div className="flex gap-4">
                      <dt className="w-[4.5rem] shrink-0 text-white/55">주소</dt>
                      <dd className="text-white/90">전남 해남군 해남읍 남동길 4, 2층</dd>
                    </div>
                    <div className="flex gap-4">
                      <dt className="w-[4.5rem] shrink-0 text-white/55">문의 분야</dt>
                      <dd className="text-white/90">행사기획 · 공연 섭외 · 보컬 레슨 · 악기 레슨</dd>
                    </div>
                  </dl>

                  <ChannelCards place="contact" />
                </div>

                <ContactForm />
              </div>
            </div>
            </div>
          </div>
        </section>
      </main>

      {/* 푸터: 명함식 2줄 */}
      <footer className="border-t border-line bg-white text-ink">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 md:flex-row md:items-start md:justify-between md:px-6">
          <div className="flex items-start gap-4">
            <Image src="/logo-mark.png" alt="솔라시도 로고" width={56} height={56} className="rounded-full ring-1 ring-black/10" />
            <div className="flex flex-col gap-1">
              <span className="font-serif text-lg font-bold">솔라시도 엔터테인먼트</span>
              <span className="font-serif text-lg font-bold">솔라시도 밴드</span>
              <span className="mt-2 text-sm text-muted">행사기획 · 보컬지도 · 악기지도</span>
            </div>
          </div>
          {/* 항목명은 굵게, 값은 보통 굵기로 구분 */}
          <dl className="flex flex-col gap-1.5 text-sm text-muted">
            {[
              ["대표", "유광종"],
              ["사업자등록번호", "416-20-94943"],
              ["주소", "전남 해남군 해남읍 남동길 4, 2층"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <dt className="font-semibold text-ink">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grad-line h-1 w-full" />
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted md:flex-row md:items-center md:justify-between md:px-6">
          <span>© 2026 Sollasido Entertainment. All rights reserved.</span>
          <span>희망의 땅 해남, 땅의 시작!</span>
        </div>
      </footer>
    </div>
  );
}
