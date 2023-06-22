import Footer from "../../components/all-other/footer";
import Navbar from "@/components/navbar/navbar";
import Underfooter from "@/components/all-other/underfooter";
import { Sora } from "next/font/google";
const sora = Sora({
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sora.className}>
        <div className="mx-12 my-10 xl:mx-32 xl:my-16">
          <Navbar />
          {children}
          <Footer />
          <Underfooter />
        </div>
      </body>
    </html>
  );
}
