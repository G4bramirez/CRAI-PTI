'use client';

import { useState } from 'react';
import { apiClient, LeadData } from '@/services/api';

interface DemoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  planType?: string;
}

export default function DemoFormModal({ isOpen, onClose, planType = 'Geral' }: DemoFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    empresa: '',
    mrr_atual: '',
    telefone: '',
    mensagem: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const leadData: LeadData = {
        nome: formData.nome,
        email: formData.email,
        empresa: formData.empresa,
        mrr_atual: formData.mrr_atual ? parseFloat(formData.mrr_atual) : undefined,
        telefone: formData.telefone,
        tipo_plano: planType,
        origem: 'landing_page',
        mensagem: formData.mensagem,
      };

      const result = await apiClient.leads.create(leadData);

      if (result.success) {
        setSuccess(true);
        setFormData({
          nome: '',
          email: '',
          empresa: '',
          mrr_atual: '',
          telefone: '',
          mensagem: '',
        });

        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar formulário');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-surface-container-low p-3xl rounded-2xl w-full max-w-md border border-primary/20 backdrop-blur-sm">
        <h2 className="font-sora text-headline-lg mb-lg text-on-surface">
          Solicitar Demonstração
        </h2>
        <p className="text-on-surface-variant text-sm mb-2xl">
          {planType ? `Plano: ${planType}` : 'Preencha seus dados para agendar uma demo'}
        </p>

        {success ? (
          <div className="bg-tertiary/20 border border-tertiary text-tertiary p-lg rounded-lg text-center space-y-md">
            <p className="font-bold text-headline-md">✅ Sucesso!</p>
            <p className="text-sm">
              Obrigado! Você receberá um email de confirmação em breve.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-lg">
            <div>
              <label className="block text-on-surface text-label-md font-bold mb-xs">
                Nome *
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Seu nome completo"
                required
                className="w-full px-md py-sm bg-background border border-outline-variant/30 rounded-lg text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-on-surface text-label-md font-bold mb-xs">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
                className="w-full px-md py-sm bg-background border border-outline-variant/30 rounded-lg text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-on-surface text-label-md font-bold mb-xs">
                Empresa
              </label>
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                placeholder="Nome da sua empresa"
                className="w-full px-md py-sm bg-background border border-outline-variant/30 rounded-lg text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-on-surface text-label-md font-bold mb-xs">
                MRR Atual (R$)
              </label>
              <input
                type="number"
                name="mrr_atual"
                value={formData.mrr_atual}
                onChange={handleChange}
                placeholder="Ex: 100000"
                className="w-full px-md py-sm bg-background border border-outline-variant/30 rounded-lg text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-on-surface text-label-md font-bold mb-xs">
                Telefone
              </label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(11) 98765-4321"
                className="w-full px-md py-sm bg-background border border-outline-variant/30 rounded-lg text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-on-surface text-label-md font-bold mb-xs">
                Mensagem (Opcional)
              </label>
              <textarea
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                placeholder="Conte-nos mais sobre seu interesse..."
                rows={3}
                className="w-full px-md py-sm bg-background border border-outline-variant/30 rounded-lg text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {error && (
              <div className="bg-error/20 border border-error text-error p-md rounded-lg text-sm">
                ❌ {error}
              </div>
            )}

            <div className="flex gap-md pt-lg">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-lg py-sm border-2 border-outline-variant/30 rounded-lg text-on-surface hover:bg-surface-container transition-all font-bold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-lg py-sm bg-primary text-on-primary rounded-lg font-bold hover:shadow-[0_0_20px_rgba(239,147,17,0.4)] transition-all disabled:opacity-50"
              >
                {loading ? '⏳ Enviando...' : '✓ Enviar'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
