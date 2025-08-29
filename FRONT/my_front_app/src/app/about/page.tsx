import PublicHeader from "@/components/publicHeader";
export default function AboutPage() {
        return (
          <>
            <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
              <PublicHeader />
            </header>

            <main className="h-screen flex flex-col gap-2 justify-start items-start p-4">
              <h1>À propos</h1>
            </main>
          </>
        );
  }