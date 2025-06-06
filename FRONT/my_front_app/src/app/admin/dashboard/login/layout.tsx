import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'] });

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="bg-indigo-100 min-h-screen flex items-center justify-center text-blue-700">
        {/* TODO : remplacer la div en dessous par la card qui sera prédéfinie dans components, définir
        les titres dans components ausssi?  */}
        <div className="w-full max-w-md p-6 bg-white rounded shadow">
                {children}
        </div>
      </body>
    </html>
  );
}