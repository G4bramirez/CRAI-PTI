import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRAI | Retention OS - Recupere sua Receita SaaS",
  description:
    "CRAI detecta pagamentos falhados e clientes em risco antes que você perceba — e age automaticamente para recuperar sua receita.",
  keywords: [
    "SaaS",
    "Retenção",
    "Recuperação de Pagamentos",
    "Churn",
    "FinTech",
  ],
  authors: [{ name: "CRAI" }],
  openGraph: {
    title: "CRAI | Retention OS - Recupere sua Receita SaaS",
    description:
      "Detecte e recupere sua receita com inteligência artificial",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface">{children}</body>
    </html>
  );
}
