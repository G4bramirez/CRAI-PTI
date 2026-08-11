'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/services/api';

interface Lead {
  id: number;
  nome: string;
  email: string;
  empresa: string;
  tipo_plano: string;
  status: string;
  criado_em: string;
}

interface Contato {
  id: number;
  nome: string;
  email: string;
  assunto: string;
  tipo_contato: string;
  status: string;
  criado_em: string;
}

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'leads' | 'contatos'>('leads');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (authenticated) {
      loadData();
    }
  }, [authenticated]);

  const loadData = async () => {
    try {
      setLoading(true);
      const leadsData = await apiClient.leads.getAll();
      const contatosData = await apiClient.contact.getAll();
      setLeads(leadsData.leads || []);
      setContatos(contatosData.contatos || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setAuthenticated(true);
    } else {
      alert('Senha incorreta');
    }
  };

  const updateLeadStatus = async (id: number, status: string) => {
    try {
      await apiClient.leads.updateStatus(id, status);
      loadData();
    } catch (error) {
      alert('Erro ao atualizar status');
    }
  };

  const updateContatoStatus = async (id: number, status: string) => {
    try {
      await apiClient.contact.updateStatus(id, status);
      loadData();
    } catch (error) {
      alert('Erro ao atualizar status');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-gutter">
        <div className="bg-surface-container p-3xl rounded-2xl border border-primary/20 w-full max-w-sm">
          <h1 className="font-sora text-headline-lg mb-2xl text-on-surface">Admin CRAI</h1>
          <form onSubmit={handleLogin} className="space-y-lg">
            <div>
              <label className="block text-on-surface font-bold mb-sm">Senha Admin</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-lg py-sm bg-background border border-outline-variant/30 rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Digite a senha"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-on-primary font-bold py-sm rounded-lg hover:opacity-90 transition"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-gutter">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-3xl">
          <h1 className="font-sora text-headline-lg text-on-surface">Dashboard Admin</h1>
          <button
            onClick={() => setAuthenticated(false)}
            className="px-lg py-sm bg-error/10 text-error rounded-lg font-bold hover:bg-error/20 transition"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-md mb-2xl border-b border-outline-variant/20">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-lg py-sm font-bold transition ${
              activeTab === 'leads'
                ? 'border-b-2 border-primary text-primary'
                : 'text-on-surface-variant'
            }`}
          >
            Leads ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('contatos')}
            className={`px-lg py-sm font-bold transition ${
              activeTab === 'contatos'
                ? 'border-b-2 border-primary text-primary'
                : 'text-on-surface-variant'
            }`}
          >
            Contatos ({contatos.length})
          </button>
        </div>

        {/* Loading */}
        {loading && <p className="text-on-surface-variant">Carregando...</p>}

        {/* Leads Tab */}
        {activeTab === 'leads' && !loading && (
          <div className="space-y-md">
            {leads.length === 0 ? (
              <p className="text-on-surface-variant text-center py-3xl">Nenhum lead ainda</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-outline-variant/20">
                      <th className="text-left py-md px-md text-on-surface font-bold">Nome</th>
                      <th className="text-left py-md px-md text-on-surface font-bold">Email</th>
                      <th className="text-left py-md px-md text-on-surface font-bold">Empresa</th>
                      <th className="text-left py-md px-md text-on-surface font-bold">Plano</th>
                      <th className="text-left py-md px-md text-on-surface font-bold">Status</th>
                      <th className="text-left py-md px-md text-on-surface font-bold">Data</th>
                      <th className="text-left py-md px-md text-on-surface font-bold">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b border-outline-variant/10 hover:bg-surface-container-high">
                        <td className="py-md px-md text-on-surface">{lead.nome}</td>
                        <td className="py-md px-md text-on-surface-variant">{lead.email}</td>
                        <td className="py-md px-md text-on-surface">{lead.empresa || '-'}</td>
                        <td className="py-md px-md text-primary font-bold">{lead.tipo_plano}</td>
                        <td className="py-md px-md">
                          <span className={`px-md py-xs rounded-full text-xs font-bold ${
                            lead.status === 'novo' ? 'bg-primary/20 text-primary' :
                            lead.status === 'demo_agendada' ? 'bg-tertiary/20 text-tertiary' :
                            'bg-on-surface-variant/20 text-on-surface-variant'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-md px-md text-on-surface-variant text-xs">
                          {new Date(lead.criado_em).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-md px-md">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className="bg-background border border-outline-variant/30 rounded px-sm py-xs text-xs text-on-surface"
                          >
                            <option value="novo">Novo</option>
                            <option value="contatado">Contatado</option>
                            <option value="demo_agendada">Demo Agendada</option>
                            <option value="cliente">Cliente</option>
                            <option value="rejeitado">Rejeitado</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Contatos Tab */}
        {activeTab === 'contatos' && !loading && (
          <div className="space-y-md">
            {contatos.length === 0 ? (
              <p className="text-on-surface-variant text-center py-3xl">Nenhum contato ainda</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-outline-variant/20">
                      <th className="text-left py-md px-md text-on-surface font-bold">Nome</th>
                      <th className="text-left py-md px-md text-on-surface font-bold">Email</th>
                      <th className="text-left py-md px-md text-on-surface font-bold">Assunto</th>
                      <th className="text-left py-md px-md text-on-surface font-bold">Tipo</th>
                      <th className="text-left py-md px-md text-on-surface font-bold">Status</th>
                      <th className="text-left py-md px-md text-on-surface font-bold">Data</th>
                      <th className="text-left py-md px-md text-on-surface font-bold">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contatos.map((contato) => (
                      <tr key={contato.id} className="border-b border-outline-variant/10 hover:bg-surface-container-high">
                        <td className="py-md px-md text-on-surface">{contato.nome}</td>
                        <td className="py-md px-md text-on-surface-variant">{contato.email}</td>
                        <td className="py-md px-md text-on-surface">{contato.assunto || '-'}</td>
                        <td className="py-md px-md text-on-surface-variant text-xs">{contato.tipo_contato}</td>
                        <td className="py-md px-md">
                          <span className={`px-md py-xs rounded-full text-xs font-bold ${
                            contato.status === 'novo' ? 'bg-primary/20 text-primary' :
                            contato.status === 'respondido' ? 'bg-tertiary/20 text-tertiary' :
                            'bg-on-surface-variant/20 text-on-surface-variant'
                          }`}>
                            {contato.status}
                          </span>
                        </td>
                        <td className="py-md px-md text-on-surface-variant text-xs">
                          {new Date(contato.criado_em).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-md px-md">
                          <select
                            value={contato.status}
                            onChange={(e) => updateContatoStatus(contato.id, e.target.value)}
                            className="bg-background border border-outline-variant/30 rounded px-sm py-xs text-xs text-on-surface"
                          >
                            <option value="novo">Novo</option>
                            <option value="lido">Lido</option>
                            <option value="respondido">Respondido</option>
                            <option value="fechado">Fechado</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
