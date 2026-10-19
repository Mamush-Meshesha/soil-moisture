import React from 'react';

interface MoistureGaugeProps {
  value: number | string | null | undefined; // e.g., 28.5%
  minTarget?: number | string | null | undefined; // e.g. 20%
  maxTarget?: number | string | null | undefined; // e.g. 38%
  size?: number;
  label?: string;
}

export const MoistureGauge: React.FC<MoistureGaugeProps> = ({
  value,
  minTarget = 20.0,
  maxTarget = 38.0,
  size = 180,
  label = 'Root-Zone Moisture',
}) => {
  // Safe numeric parsing for PostgreSQL numeric/string types and undefined
  const numericVal =
    typeof value === 'number'
      ? (isNaN(value) ? 0 : value)
      : (parseFloat(String(value ?? '')) || 0);

  const minTargetNum =
    typeof minTarget === 'number'
      ? (isNaN(minTarget) ? 20.0 : minTarget)
      : (parseFloat(String(minTarget ?? '')) || 20.0);

  const maxTargetNum =
    typeof maxTarget === 'number'
      ? (isNaN(maxTarget) ? 38.0 : maxTarget)
      : (parseFloat(String(maxTarget ?? '')) || 38.0);

  // Determine agronomic state
  let statusText = 'Optimal Band';
  let statusClass = 'ts-badge-success';
  let strokeColor = '#176B45';

  if (numericVal < minTargetNum - 5) {
    statusText = 'Critical Deficit';
    statusClass = 'ts-badge-error';
    strokeColor = '#C94B48';
  } else if (numericVal < minTargetNum) {
    statusText = 'Refill Needed';
    statusClass = 'ts-badge-warning';
    strokeColor = '#D99A23';
  } else if (numericVal > maxTargetNum) {
    statusText = 'Saturated / Runoff Risk';
    statusClass = 'ts-badge-info';
    strokeColor = '#3678B7';
  }

  // Circular gauge math (180 degree semi-circle arc)
  const radius = 65;
  const cx = 90;
  const cy = 90;
  const clampedVal = Math.max(0, Math.min(50, numericVal));
  const angle = (clampedVal / 50) * 180; // 0 to 180 deg

  // Arc path
  const polarToCartesian = (centerX: number, centerY: number, r: number, angleInDegrees: number) => {
    const angleInRadians = ((180 - angleInDegrees) * Math.PI) / 180.0;
    return {
      x: centerX + r * Math.cos(angleInRadians),
      y: centerY - r * Math.sin(angleInRadians),
    };
  };

  const startPoint = polarToCartesian(cx, cy, radius, 0);
  const endPoint = polarToCartesian(cx, cy, radius, 180);
  const currentPoint = polarToCartesian(cx, cy, radius, angle);

  const bgArc = `M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 0 1 ${endPoint.x} ${endPoint.y}`;
  const valueArc = `M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 ${angle > 180 ? 1 : 0} 1 ${currentPoint.x} ${currentPoint.y}`;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '12px',
        textAlign: 'center',
      }}
    >
      <svg width={size} height={size * 0.65} viewBox="0 0 180 120">
        {/* Background Arc */}
        <path d={bgArc} fill="none" stroke="var(--color-border)" strokeWidth="12" strokeLinecap="round" />

        {/* Optimal Range Highlight Arc */}
        {(() => {
          const optStartAngle = (minTargetNum / 50) * 180;
          const optEndAngle = (maxTargetNum / 50) * 180;
          const p1 = polarToCartesian(cx, cy, radius, optStartAngle);
          const p2 = polarToCartesian(cx, cy, radius, optEndAngle);
          return (
            <path
              d={`M ${p1.x} ${p1.y} A ${radius} ${radius} 0 0 1 ${p2.x} ${p2.y}`}
              fill="none"
              stroke="rgba(116, 184, 117, 0.4)"
              strokeWidth="12"
            />
          );
        })()}

        {/* Active Value Arc */}
        {angle > 0 && (
          <path
            d={valueArc}
            fill="none"
            stroke={strokeColor}
            strokeWidth="12"
            strokeLinecap="round"
          />
        )}

        {/* Value Text */}
        <text
          x={cx}
          y={cy - 5}
          textAnchor="middle"
          fontSize="24"
          fontWeight="800"
          fill="var(--color-text)"
          fontFamily="inherit"
        >
          {numericVal.toFixed(1)}%
        </text>
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          fontSize="11"
          fontWeight="500"
          fill="var(--color-text-muted)"
          fontFamily="inherit"
        >
          VWC
        </text>
      </svg>

      <div style={{ marginTop: '4px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text)' }}>
        {label}
      </div>

      <div style={{ marginTop: '6px' }}>
        <span className={`ts-badge ${statusClass}`}>{statusText}</span>
      </div>

      <div style={{ marginTop: '6px', fontSize: '11px', color: 'var(--color-text-muted)' }}>
        Target: {minTargetNum}% – {maxTargetNum}% VWC
      </div>
    </div>
  );
};
