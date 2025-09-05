import PublicHeader from "@/components/publicHeader";
import Footer from "@/components/footer";

export default function Page() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
        <PublicHeader />
      </header>

      <main className="min-h-screen flex flex-col">
        <section id="formations" className="min-h-[60vh] flex items-center justify-center px-4 py-16">
          <h2 className="text-2xl font-semibold">Nos formations</h2>
        </section>

        <section id="about" className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4 py-16">
          <h2 className="text-2xl font-semibold">À propos</h2>
        </section>

        <section id="contact" className="min-h-[60vh] flex items-center justify-center px-4 py-16">
          <h2 className="text-2xl font-semibold">Contact</h2>
        </section>
      </main>

      <Footer />
    </>
  );
}