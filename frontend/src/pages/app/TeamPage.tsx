import React, { useState } from 'react';
import { Users, UserPlus, Shield, Mail, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';

export const TeamPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [members, setMembers] = useState([
    {
      id: 'usr-1',
      name: 'Dr. Sarah Kibet',
      email: 'admin@example.com',
      role: 'PLATFORM_ADMIN',
      status: 'Active',
      joined: '2025-11-12',
    },
    {
      id: 'usr-2',
      name: 'Abebe Bekele',
      email: 'wash.lead@example.com',
      role: 'FARM_MANAGER',
      status: 'Active',
      joined: '2026-01-08',
    },
    {
      id: 'usr-3',
      name: 'Dr. Alemayehu Tadesse',
      email: 'water.specialist@example.com',
      role: 'AGRONOMIST',
      status: 'Active',
      joined: '2026-03-22',
    },
    {
      id: 'usr-4',
      name: 'Fatima Al-Mansoor',
      email: 'technician@example.com',
      role: 'FIELD_OPERATOR',
      status: 'Active',
      joined: '2026-05-14',
    },
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('FIELD_OPERATOR');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setMembers((prev) => [
      ...prev,
      {
        id: `usr-${Date.now()}`,
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: inviteRole,
        status: 'Invited',
        joined: new Date().toISOString().slice(0, 10),
      },
    ]);
    setShowInviteModal(false);
    setInviteEmail('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
            {t('team.title')}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            {t('team.subtitle')}
          </p>
        </div>

        <button onClick={() => setShowInviteModal(true)} className="ts-btn ts-btn-primary">
          <UserPlus size={16} /> {t('team.inviteMember')}
        </button>
      </div>

      {/* Role Hierarchy Reference */}
      <div className="ts-card" style={{ backgroundColor: 'var(--color-surface)' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>
          Role-Based Access Control (RBAC) Matrix
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '13px' }}>
          <div style={{ padding: '10px', backgroundColor: 'var(--color-bg)', borderRadius: '6px' }}>
            <strong style={{ color: 'var(--color-primary-dark)' }}>PLATFORM_ADMIN</strong>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '4px' }}>Full root access, team management, sensor calibration overrides.</p>
          </div>
          <div style={{ padding: '10px', backgroundColor: 'var(--color-bg)', borderRadius: '6px' }}>
            <strong style={{ color: 'var(--color-primary)' }}>WASH_PROGRAM_LEAD</strong>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '4px' }}>Water point management, treatment protocols, safety threshold configuration.</p>
          </div>
          <div style={{ padding: '10px', backgroundColor: 'var(--color-bg)', borderRadius: '6px' }}>
            <strong style={{ color: 'var(--color-info)' }}>WATER_QUALITY_ENGINEER</strong>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '4px' }}>Optical telemetry analytics, incubation curves, laboratory ISO verification exports.</p>
          </div>
          <div style={{ padding: '10px', backgroundColor: 'var(--color-bg)', borderRadius: '6px' }}>
            <strong style={{ color: 'var(--color-text-muted)' }}>FIELD_TEST_OPERATOR</strong>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '4px' }}>Rapid test kit sync, mobile field assays, contamination alert acknowledgments.</p>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="ts-card">
        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>
          Organization Members ({members.length})
        </h3>
        <div className="ts-table-container">
          <table className="ts-table">
            <thead>
              <tr>
                <th>Member Name</th>
                <th>Email Address</th>
                <th>Assigned Role</th>
                <th>Status</th>
                <th>Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id}>
                  <td>
                    <strong>{m.name}</strong>
                    {m.email === user?.email && (
                      <span className="ts-badge ts-badge-success" style={{ marginLeft: '8px', fontSize: '10px' }}>You</span>
                    )}
                  </td>
                  <td style={{ color: 'var(--color-text-muted)' }}>{m.email}</td>
                  <td>
                    <span className="ts-badge ts-badge-neutral">{m.role}</span>
                  </td>
                  <td>
                    <span className={`ts-badge ${m.status === 'Active' ? 'ts-badge-success' : 'ts-badge-warning'}`}>
                      {m.status}
                    </span>
                  </td>
                  <td>{m.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="ts-modal-backdrop" onClick={() => setShowInviteModal(false)}>
          <div className="ts-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ts-modal-header">
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Invite Team Member</h3>
              <button onClick={() => setShowInviteModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>
                &times;
              </button>
            </div>
            <form onSubmit={handleInvite}>
              <div className="ts-modal-body">
                <div className="ts-form-group">
                  <label className="ts-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="colleague@greenvalleyagro.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="ts-input"
                  />
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Role Assignment</label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="ts-select"
                  >
                    <option value="FIELD_OPERATOR">FIELD_OPERATOR</option>
                    <option value="AGRONOMIST">AGRONOMIST</option>
                    <option value="FARM_MANAGER">FARM_MANAGER</option>
                    <option value="VIEWER">VIEWER (Read Only)</option>
                  </select>
                </div>
              </div>

              <div className="ts-modal-footer">
                <button type="button" onClick={() => setShowInviteModal(false)} className="ts-btn ts-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="ts-btn ts-btn-primary">
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
