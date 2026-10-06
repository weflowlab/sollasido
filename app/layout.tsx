import type { Metadata } from "next";
import { Noto_Music, Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_KR({
  variable: "--font-sans-kr",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const serif = Noto_Serif_KR({
  variable: "--font-serif-kr",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const music = Noto_Music({
  variable: "--font-music",
  subsets: ["music"],
  weight: "400",
  display: "block",
});

export const metadata: Metadata = {
  title: "솔라시도 엔터테인먼트 · 솔라시도 밴드",
  description:
    "희망의 땅 해남, 땅의 시작. 행사기획 · 보컬지도 · 악기지도 전문 솔라시도 엔터테인먼트와 솔라시도 밴드입니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${sans.variable} ${serif.variable} ${music.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
