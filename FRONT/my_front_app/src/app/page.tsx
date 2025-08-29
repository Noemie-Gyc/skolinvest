import PublicHeader from "@/components/publicHeader";
import Footer from "@/components/footer";

export default function Page() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
        <PublicHeader />
      </header>

      <main className="h-screen flex flex-col gap-2 justify-center items-center">
      </main>

      <Footer />
    </>
  );
}