// src/services/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface LeadData {
  nome: string;
  email: string;
  empresa?: string;
  mrr_atual?: number;
  telefone?: string;
  tipo_plano: string;
  origem?: string;
  mensagem?: string;
}

export interface ContactData {
  nome: string;
  email: string;
  assunto?: string;
  mensagem: string;
  tipo_contato?: string;
}

export const apiClient = {
  // LEADS
  leads: {
    create: async (leadData: LeadData) => {
      const response = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao enviar lead');
      }
      return response.json();
    },

    getAll: async () => {
      const response = await fetch(`${API_URL}/leads`);
      if (!response.ok) throw new Error('Erro ao buscar leads');
      return response.json();
    },

    getById: async (id: number) => {
      const response = await fetch(`${API_URL}/leads/${id}`);
      if (!response.ok) throw new Error('Lead não encontrado');
      return response.json();
    },

    updateStatus: async (id: number, status: string) => {
      const response = await fetch(`${API_URL}/leads/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Erro ao atualizar status');
      return response.json();
    },
  },

  // NEWSLETTER
  newsletter: {
    subscribe: async (email: string) => {
      const response = await fetch(`${API_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao inscrever');
      }
      return response.json();
    },

    unsubscribe: async (email: string) => {
      const response = await fetch(`${API_URL}/newsletter/unsubscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error('Erro ao desinscrever');
      return response.json();
    },
  },

  // CONTATO
  contact: {
    send: async (contactData: ContactData) => {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao enviar contato');
      }
      return response.json();
    },

    getAll: async () => {
      const response = await fetch(`${API_URL}/contact`);
      if (!response.ok) throw new Error('Erro ao buscar contatos');
      return response.json();
    },
  },

  // HEALTH
  health: async () => {
    try {
      const response = await fetch(`${API_URL.replace('/api', '')}/api/health`);
      return response.json();
    } catch {
      return { status: 'offline' };
    }
  },
};
