import { useEffect, useState, useMemo, useCallback } from 'react';
import api from '../api';
import { useAuth } from '../Context/Authentication_Context.jsx';
import { useToast } from '../Context/Toast_Context.jsx';
import Header from '../Components/Header.jsx';
import Tabs from '../Components/Tabs.jsx';
import Toolbar from '../Components/Toolbar.jsx';
import NodeCard from '../Components/Node_Card.jsx';
import NodeModal from '../Components/Node_Modal.jsx';
import PasswordModal from '../Components/Password_Modal.jsx';
import InfoModal from '../Components/Info_Modal.jsx';
import { isHardware, effectiveStatus } from '../nodeHelper.js';

export default function Dashboard() {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('hardware');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [editingNode, setEditingNode] = useState(null);
  const [showNodeModal, setShowNodeModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [infoNode, setInfoNode] = useState(null);
  const [pingingId, setPingingId] = useState(null);
  const [pingingAll, setPingingAll] = useState(false);

  const { username, logout } = useAuth();
  const showToast = useToast();

  const loadNodes = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/nodes');
      setNodes(data);
    } catch {
      showToast('Nodes konnten nicht geladen werden.', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadNodes();
  }, [loadNodes]);

  // Filterlogik
  const base = useMemo(() => {
    if (tab === 'hardware') return nodes.filter(isHardware);
    if (tab === 'vm') return nodes.filter((n) => n.type === 'vm');
    if (tab === 'container') return nodes.filter((n) => n.type === 'container');
    return nodes;
  }, [nodes, tab]);

  const list = useMemo(() => {
    const q = search.toLowerCase();
    return base.filter((n) => {
      const parent = n.parentId ? nodes.find((x) => x._id === n.parentId) : null;
      const text = [n.name, n.ip, n.domain, n.port, n.protocol, n.desc, parent?.name, ...(n.services || []).map((s) => s.name)]
        .join(' ')
        .toLowerCase();
      const typeMatches = tab === 'hardware' ? !typeFilter || n.type === typeFilter : true;
      return (!q || text.includes(q)) && typeMatches && (!statusFilter || effectiveStatus(n) === statusFilter);
    });
  }, [base, search, typeFilter, statusFilter, tab, nodes]);

  const countLabel = useMemo(() => {
    const label = tab === 'vm' ? 'VM' : tab === 'container' ? 'Container' : 'Hardware';
    if (list.length !== base.length) return `${list.length} / ${base.length} ${label}`;
    return `${base.length} ${label}${label === 'Hardware' || base.length === 1 ? '' : 's'} · ${nodes.length} total`;
  }, [list, base, nodes, tab]);

  // CRUD-Aktionen
  async function handleSave(form) {
    try {
      if (editingNode) {
        await api.put(`/nodes/${editingNode._id}`, form);
        showToast('Eintrag aktualisiert.', 'success');
      } else {
        await api.post('/nodes', form);
        showToast('Eintrag erstellt.', 'success');
      }
      setShowNodeModal(false);
      setEditingNode(null);
      loadNodes();
    } catch (err) {
      showToast(err.response?.data?.error || 'Speichern fehlgeschlagen.', 'error');
    }
  }

  async function handleDelete(node) {
    if (!confirm(`"${node.name}" wirklich löschen?`)) return;
    try {
      await api.delete(`/nodes/${node._id}`);
      showToast('Eintrag gelöscht.', 'success');
      loadNodes();
    } catch {
      showToast('Löschen fehlgeschlagen.', 'error');
    }
  }

  async function handlePing(node) {
    setPingingId(node._id);
    try {
      const { data } = await api.post(`/nodes/${node._id}/ping`);
      showToast(
        data.status === 'online' ? `${node.name} ist online.` : `${node.name} ist offline.`,
        data.status === 'online' ? 'success' : 'error'
      );
      loadNodes();
    } finally {
      setPingingId(null);
    }
  }

  async function handlePingAll() {
    setPingingAll(true);
    try {
      await api.post('/nodes/ping-all');
      showToast('Alle Nodes geprüft.', 'success');
      loadNodes();
    } finally {
      setPingingAll(false);
    }
  }

  return (
    <>
      <Header
        nodes={nodes}
        username={username}
        onLogout={logout}
        onPingAll={handlePingAll}
        pingingAll={pingingAll}
        onOpenPassword={() => setShowPasswordModal(true)}
        onOpenNew={() => {
          setEditingNode(null);
          setShowNodeModal(true);
        }}
      />

      <main>
        <Tabs active={tab} onChange={setTab} />

        {(tab === 'hardware' || tab === 'vm' || tab === 'container') && (
          <>
            <Toolbar
              search={search}
              onSearch={setSearch}
              typeFilter={typeFilter}
              onTypeFilter={setTypeFilter}
              statusFilter={statusFilter}
              onStatusFilter={setStatusFilter}
              view={tab}
              count={countLabel}
            />

            <div className="grid">
              {loading ? (
                <div className="loading-state">
                  <div className="spinner" />
                  <div>Lade Daten…</div>
                </div>
              ) : nodes.length === 0 ? (
                <div className="empty-state">
                  <h3>Noch keine Einträge</h3>
                  <p>
                    Klicke oben auf <strong>+ Eintrag</strong>, um deine erste Hardware, VM oder deinen ersten
                    Container einzutragen.
                  </p>
                </div>
              ) : list.length === 0 ? (
                <div className="empty-state">
                  <h3>Keine Ergebnisse</h3>
                  <p>Keine Einträge entsprechen dem aktuellen Filter.</p>
                </div>
              ) : (
                list.map((n) => (
                  <NodeCard
                    key={n._id}
                    node={n}
                    allNodes={nodes}
                    view={tab}
                    onEdit={(node) => {
                      setEditingNode(node);
                      setShowNodeModal(true);
                    }}
                    onDelete={handleDelete}
                    onPing={handlePing}
                    onInfo={setInfoNode}
                    pinging={pingingId === n._id}
                  />
                ))
              )}
            </div>
          </>
        )}
      </main>

      {showNodeModal && (
        <NodeModal
          node={editingNode}
          allNodes={nodes}
          onSave={handleSave}
          onClose={() => {
            setShowNodeModal(false);
            setEditingNode(null);
          }}
        />
      )}

      {showPasswordModal && <PasswordModal onClose={() => setShowPasswordModal(false)} />}
      {infoNode && <InfoModal node={infoNode} onClose={() => setInfoNode(null)} />}
    </>
  );
}
