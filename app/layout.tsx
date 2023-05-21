import "./globals.css";
import { Roboto } from "next/font/google";

const inter = Roboto({
  subsets: ["latin", "greek", "cyrillic"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Drive Time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
