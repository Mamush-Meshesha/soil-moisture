import React, { useState } from 'react';
import { Bluetooth, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck, WifiOff } from 'lucide-react';
import { api } from '../services/api';
import { useLanguage } from '../i18n/LanguageContext';

interface BleSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncComplete?: () => void;
}

export const BleSimulatorModal: React.FC<BleSimulatorModalProps> = ({
  isOpen,
  onClose,
  onSyncComplete,
}) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<'DISCOVER' | 'PAIRING' | 'CONNECTED' | 'SYNCING' | 'DONE'>('DISCOVER');
  const [selectedDevice, setSelectedDevice] = useState<string>('TS-PROBE-88219');
  const [syncResult, setSyncResult] = useState<any | null>(null);
  const [isSimulatingOffline, setIsSimulatingOffline] = useState(false);

  if (!isOpen) return null;

  const handlePair = () => {
    setStep('PAIRING');
    setTimeout(() => {
      setStep('CONNECTED');
    }, 1200);
  };

  const handleSync = async () => {
    setStep('SYNCING');
    const idempotencyKey = `ble-sync-${Date.now()}`;

    // Emulate batch of 5 readings across 5 depth horizons collected during offline field walk
    const samplePayload = {
      deviceUid: selectedDevice,
      source: 'BLE_SYNC',
      batteryMv: 3860,
      signalRssi: -62,
      firmware: 'v2.4.1-ble',
      readings: [
        { depthCm: 10, vwcPercent: 27.8, tempC: 22.4, ecDsM: 1.14, qualityScore: 1.0, measuredAt: new Date().toISOString() },
        { depthCm: 20, vwcPercent: 30.5, tempC: 20.8, ecDsM: 1.20, qualityScore: 1.0, measuredAt: new Date().toISOString() },
        { depthCm: 30, vwcPercent: 33.1, tempC: 19.5, ecDsM: 1.28, qualityScore: 1.0, measuredAt: new Date().toISOString() },
        { depthCm: 40, vwcPercent: 34.6, tempC: 18.9, ecDsM: 1.32, qualityScore: 1.0, measuredAt: new Date().toISOString() },
        { depthCm: 50, vwcPercent: 36.2, tempC: 18.2, ecDsM: 1.35, qualityScore: 1.0, measuredAt: new Date().toISOString() },
      ],
    };

    try {
      const res = await api.ingestTelemetry(samplePayload, idempotencyKey);
      setSyncResult(res);
      setStep('DONE');
      if (onSyncComplete) onSyncComplete();
    } catch (err: any) {
      alert(`Sync Error: ${err.message}`);
      setStep('CONNECTED');
    }
  };

  return (
    <div className="ts-modal-backdrop" onClick={onClose}>
      <div className="ts-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <div className="ts-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bluetooth size={22} color="var(--color-primary)" />
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{t('ble.title')}</h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: 'var(--color-text-muted)' }}
          >
            &times;
          </button>
        </div>

        <div className="ts-modal-body">
          {step === 'DISCOVER' && (
            <div>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                {t('ble.desc')}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {[
                  { uid: 'TS-PROBE-88219', name: 'Probe Alpha Center (Corn Field)', rssi: -64, battery: '94%' },
                  { uid: 'TS-PROBE-77104', name: 'Probe Beta South Edge (Soybeans)', rssi: -72, battery: '88%' },
                  { uid: 'TS-PROBE-99341', name: 'Vineyard Probe Block 4 (Merlot)', rssi: -59, battery: '96%' },
                ].map((d) => (
                  <label
                    key={d.uid}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: `2px solid ${selectedDevice === d.uid ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      cursor: 'pointer',
                      backgroundColor: selectedDevice === d.uid ? 'var(--color-primary-subtle)' : 'var(--color-surface)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input
                        type="radio"
                        name="ble_device"
                        checked={selectedDevice === d.uid}
                        onChange={() => setSelectedDevice(d.uid)}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '14px' }}>{d.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>UID: {d.uid}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      <div>RSSI: {d.rssi} dBm</div>
                      <div>Battery: {d.battery}</div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="ts-alert-banner ts-alert-banner-info" style={{ marginBottom: '16px' }}>
                <ShieldCheck size={18} />
                <div>
                  <strong>Offline Synchronization Guarantee:</strong> Telemetry is buffered in device flash memory until synced. Composite constraints prevent duplicate records upon retry.
                </div>
              </div>
            </div>
          )}

          {step === 'PAIRING' && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <RefreshCw size={36} className="ts-skeleton" style={{ margin: '0 auto 16px', color: 'var(--color-primary)' }} />
              <h4>Pairing &amp; Exchanging GATT Handshake...</h4>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
                Subscribing to characteristic <code>6E400003-B5A3-F393-E0A9-E50E24DCCA9E</code>
              </p>
            </div>
          )}

          {step === 'CONNECTED' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', padding: '12px', backgroundColor: 'var(--color-success-bg)', borderRadius: '8px' }}>
                <CheckCircle2 size={24} color="var(--color-primary)" />
                <div>
                  <div style={{ fontWeight: 700 }}>Connected to {selectedDevice}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>GATT Service: Environmental Sensing Profile v2.4</div>
                </div>
              </div>

              <div style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '14px', marginBottom: '16px' }}>
                <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '8px' }}>Device Telemetry Status:</div>
                <ul style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.8', listStyle: 'none' }}>
                  <li>• Active horizons: 5 depths (10, 20, 30, 40, 50 cm)</li>
                  <li>• Battery voltage: 3,860 mV (Normal)</li>
                  <li>• Offline flash buffer: 5 uncommitted multi-horizon records ready to flush</li>
                </ul>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                <input
                  type="checkbox"
                  id="offlineCheck"
                  checked={isSimulatingOffline}
                  onChange={(e) => setIsSimulatingOffline(e.target.checked)}
                />
                <label htmlFor="offlineCheck">Simulate no mobile network (read into app buffer only)</label>
              </div>
            </div>
          )}

          {step === 'SYNCING' && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <RefreshCw size={36} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 16px', color: 'var(--color-primary)' }} />
              <h4>Uploading 5 Multi-Depth Readings to Cloud API...</h4>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
                Applying <code>X-Idempotency-Key</code> and evaluating moisture thresholds.
              </p>
            </div>
          )}

          {step === 'DONE' && syncResult && (
            <div>
              <div className="ts-alert-banner ts-alert-banner-success" style={{ marginBottom: '16px' }}>
                <CheckCircle2 size={20} />
                <div>
                  <strong>Synchronization Complete!</strong>
                  <div>
                    {syncResult.insertedCount} reading horizons successfully committed to the database.
                    {syncResult.duplicatesSkipped > 0 && ` (${syncResult.duplicatesSkipped} duplicates skipped).`}
                  </div>
                </div>
              </div>

              {syncResult.alertsTriggered && syncResult.alertsTriggered.length > 0 && (
                <div className="ts-alert-banner ts-alert-banner-warning" style={{ marginBottom: '16px' }}>
                  <AlertTriangle size={20} />
                  <div>
                    <strong>Threshold Rule Triggered:</strong>
                    {syncResult.alertsTriggered.map((a: any, i: number) => (
                      <div key={i} style={{ fontSize: '12px' }}>{a.ruleName}: {a.message}</div>
                    ))}
                  </div>
                </div>
              )}

              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                Field sensor and water quality readings have been indexed and are now available on the dashboard and water testing views.
              </p>
            </div>
          )}
        </div>

        <div className="ts-modal-footer">
          {step === 'DISCOVER' && (
            <>
              <button className="ts-btn ts-btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button className="ts-btn ts-btn-primary" onClick={handlePair}>
                {t('ble.pairBtn')}
              </button>
            </>
          )}

          {step === 'CONNECTED' && (
            <>
              <button className="ts-btn ts-btn-secondary" onClick={() => setStep('DISCOVER')}>
                Back
              </button>
              <button className="ts-btn ts-btn-primary" onClick={handleSync}>
                {t('ble.syncBtn')}
              </button>
            </>
          )}

          {step === 'DONE' && (
            <button className="ts-btn ts-btn-primary" onClick={onClose}>
              {t('ble.doneReturn')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
