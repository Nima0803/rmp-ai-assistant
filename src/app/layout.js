import { Poppins, Roboto } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} ${roboto.className}`} style={{ height: '100%' }}>
      <body className="overflow-x-hidden antialiased" style={{ margin: 0, padding: 0, height: '100%', overflow: 'hidden' }}>
        <div
          style={{
            background: "#5163ba",
            padding: "1rem",
            textAlign: "center",
            fontSize: "0.85rem",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "fixed",
            width: "100%",
            top: 0,
            zIndex: 1000,
          }}
        >
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="http://localhost:3000/home" style={{ color: "#fff", textDecoration: "none" }}>
              Home
            </Link>

            <Link href="/sentiment-analysis" style={{ color: "#fff", textDecoration: "none" }}>
              Sentiment Analysis
            </Link>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Link href="/sign-in">
              <button
                style={{
                  background: "#ffffff",
                  color: "#5163ba",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: roboto.className,
                }}
              >
                Log in
              </button>
            </Link>
          </div>
        </div>
        <main style={{ paddingTop: '70px', height: 'calc(100% - 70px)', overflowY: 'auto' }}>
          {children}
        </main>
      </body>
    </html>
  );
}