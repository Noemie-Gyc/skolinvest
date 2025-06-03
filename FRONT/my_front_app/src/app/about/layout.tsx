
import { Poppins } from 'next/font/google';
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });
import Footer from "@/components/footer"


export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={poppins.className}>
            <body className="bg-yellow-50 min-h-screen flex flex-col text-blue-700">
                <main className="flex-grow flex items-center justify-center">
                    <div className="w-full max-w-md p-6 bg-white rounded shadow">
                            <div>{children}</div>
                    </div>
                </main>
                <Footer />
            </body>
        </html>
    );
}
