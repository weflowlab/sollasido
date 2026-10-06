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

const SITE_TITLE = "솔라시도 엔터테인먼트 · 솔라시도 밴드";
const SITE_DESC =
  "희망의 땅 해남, 땅의 시작. 행사기획 · 보컬지도 · 악기지도 전문 솔라시도 엔터테인먼트와 솔라시도 밴드입니다.";

// 공유 미리보기 이미지는 app/opengraph-image.jpg, app/twitter-image.jpg 파일 규칙으로 자동 연결됨
export const metadata: Metadata = {
  metadataBase: new URL("https://sollasido.vercel.app"),
  title: SITE_TITLE,
  description: SITE_DESC,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "솔라시도 엔터테인먼트",
    title: SITE_TITLE,
    description: SITE_DESC,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
  },
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
