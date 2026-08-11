'use client';

import { useState } from 'react';
import { apiClient } from '@/services/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result = await apiClient.newsletter.subscribe(email);
      if (result.success) {
        setMessage('✅ Inscrição realizada com sucesso!');
        setEmail('');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('❌ ' + (error instanceof Error ? error.message : 'Erro ao inscrever'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/10 py-2xl mt-xl">
      <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-4 gap-lg">
        {/* Brand */}
        <div className="space-y-md">
          <div className="flex items-center gap-2">
            <img
              alt="CRAI Logo"
              className="h-8 w-auto"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvQ5IYeQSfow5N1eP59ufCK_mqM3xZfnRpNSGYpYYUxQaB_YEMBwoOSf6fcfG8ADPF2aHamfsPBDCiSAaxxRsQQn52kWnJ3c-nSfGkfutNy_xnNo27qzcZxsUouIiDHyh-0DWTWKr_8JHbUu9_ZDB_kE1NuT5lsphUQfyXsd5ZIpWn59PbW06LBAdIg3Ctu2RlyeLN03ZPsgzQa3GUn5sMAqhTtZBcmubCqIH-RkWG-mtO1nSJwiY_3MMJMvqaT2rmwUN6zWHWza8"
            />
            <span className="font-sora text-headline-md font-bold text-primary">
              CRAI
            </span>
          </div>
          <p className="text-on-surface-variant text-sm">
            O sistema operacional de retenção definitivo para empresas SaaS de
            alta escala no Brasil.
          </p>
        </div>

        {/* Product */}
        <div>
          <h5 className="text-on-surface font-bold mb-md uppercase text-xs tracking-widest">
            Produto
          </h5>
          <ul className="space-y-sm text-sm text-on-surface-variant">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Recuperação de Pagamentos
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Score de Retenção
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Integrações
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Preços
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h5 className="text-on-surface font-bold mb-md uppercase text-xs tracking-widest">
            Empresa
          </h5>
          <ul className="space-y-sm text-sm text-on-surface-variant">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Contato
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Políticas de Privacidade
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                LGPD
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h5 className="text-on-surface font-bold mb-md uppercase text-xs tracking-widest">
            Newsletter
          </h5>
          <p className="text-sm text-on-surface-variant mb-md">
            Receba insights semanais sobre retenção e crescimento de SaaS.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-sm">
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                required
                disabled={loading}
                className="bg-background border border-outline-variant/30 rounded-l-lg px-md py-sm text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary/50 text-on-surface placeholder-on-surface-variant/50"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-on-primary px-md rounded-r-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? '...' : 'OK'}
              </button>
            </div>
            {message && <p className="text-xs text-primary">{message}</p>}
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-container-max mx-auto px-gutter mt-2xl pt-lg border-t border-outline-variant/5 text-center text-xs text-on-surface-variant/60">
        <p>© 2026 CRAI Retention OS. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
