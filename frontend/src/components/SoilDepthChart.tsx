import React, { useState, useMemo } from 'react';
import { SensorReading } from '../types';

interface SoilDepthChartProps {
  readings: SensorReading[];
  targetMin?: number;
  targetMax?: number;
}

const DEPTH_COLORS: Record<number, { stroke: string; label: string }> = {
  10: { stroke: '#74B875', label: '10 cm (Topsoil)' },
  20: { stroke: '#176B45', label: '20 cm (Upper Root)' },
  30: { stroke: '#3678B7', label: '30 cm (Mid Root)' },
  40: { stroke: '#8558A8', label: '40 cm (Deep Root)' },
  50: { stroke: '#D99A23', label: '50 cm (Subsoil Horizon)' },
};

export const SoilDepthChart: React.FC<SoilDepthChartProps> = ({
  readings,
  targetMin = 20.0,
  targetMax = 38.0,
}) => {
  const [activeDepths, setActiveDepths] = useState<number[]>([10, 20, 30, 40, 50]);
  const [hoveredPoint, setHoveredPoint] = useState<any | null>(null);

  // Group readings by timestamp
  const timeMap = useMemo(() => {
    const map = new Map<string, Record<number, number>>();
    for (const r of readings) {
      if (!map.has(r.measured_at)) {
        map.set(r.measured_at, {});
      }
      map.get(r.measured_at)![r.depth_cm] = r.vwc_percent;
    }
    // Sort timestamps ascending
    return Array.from(map.entries()).sort(
      (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
    );
  }, [readings]);

  // Chart dimensions
  const width = 800;
  const height = 320;
  const padding = { top: 30, right: 30, bottom: 40, left: 50 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const minVwc = 10;
  const maxVwc = 50;

  const getY = (val: number) => {
    const clamped = Math.max(minVwc, Math.min(maxVwc, val));
    return padding.top + chartH - ((clamped - minVwc) / (maxVwc - minVwc)) * chartH;
  };

  const getX = (index: number, total: number) => {
    if (total <= 1) return padding.left + chartW / 2;
    return padding.left + (index / (total - 1)) * chartW;
  };

  const toggleDepth = (depth: number) => {
    setActiveDepths((prev) =>
      prev.includes(depth) ? prev.filter((d) => d !== depth) : [...prev, depth]
    );
  };

  if (timeMap.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
        No time-series telemetry recorded for the selected period.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Legend & Horizon Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
          Horizons:
        </span>
        {Object.entries(DEPTH_COLORS).map(([dStr, meta]) => {
          const d = parseInt(dStr, 10);
          const isActive = activeDepths.includes(d);
          return (
            <button
              key={d}
              onClick={() => toggleDepth(d)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: 600,
                borderRadius: '6px',
                border: `1px solid ${isActive ? meta.stroke : 'var(--color-border)'}`,
                backgroundColor: isActive ? 'var(--color-surface)' : 'var(--color-surface-sunken)',
                color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
                cursor: 'pointer',
                opacity: isActive ? 1 : 0.6,
              }}
            >
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: meta.stroke,
                }}
              />
              {meta.label}
            </button>
          );
        })}
      </div>

      {/* SVG Chart */}
      <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
        >
          {/* Optimal Agronomic Band */}
          <rect
            x={padding.left}
            y={getY(targetMax)}
            width={chartW}
            height={getY(targetMin) - getY(targetMax)}
            fill="rgba(116, 184, 117, 0.12)"
          />

          {/* Grid lines & Y-Axis labels */}
          {[15, 20, 25, 30, 35, 40, 45].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + chartW}
                  y2={y}
                  stroke="var(--color-border)"
                  strokeDasharray={val === targetMin || val === targetMax ? '4 4' : 'none'}
                  strokeWidth={val === targetMin || val === targetMax ? 1.5 : 1}
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="var(--color-text-muted)"
                  fontFamily="inherit"
                >
                  {val}%
                </text>
              </g>
            );
          })}

          {/* Target Threshold Guide Labels */}
          <text
            x={padding.left + chartW - 6}
            y={getY(targetMax) - 6}
            textAnchor="end"
            fontSize="10"
            fill="var(--color-primary)"
            fontWeight="600"
          >
            Field Capacity ({targetMax}%)
          </text>
          <text
            x={padding.left + chartW - 6}
            y={getY(targetMin) + 14}
            textAnchor="end"
            fontSize="10"
            fill="var(--color-warning)"
            fontWeight="600"
          >
            Refill Threshold ({targetMin}%)
          </text>

          {/* Plot Series Lines per Depth */}
          {activeDepths.map((depth) => {
            const points: string[] = [];
            timeMap.forEach(([t, depthsMap], idx) => {
              if (depthsMap[depth] !== undefined) {
                const x = getX(idx, timeMap.length);
                const y = getY(depthsMap[depth]);
                points.push(`${x},${y}`);
              }
            });

            if (points.length === 0) return null;

            return (
              <polyline
                key={depth}
                fill="none"
                stroke={DEPTH_COLORS[depth]?.stroke || '#176B45'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points.join(' ')}
              />
            );
          })}

          {/* Interactive Hover Trigger Columns */}
          {timeMap.map(([timestamp, depthsMap], idx) => {
            const x = getX(idx, timeMap.length);
            return (
              <rect
                key={timestamp}
                x={x - 10}
                y={padding.top}
                width={20}
                height={chartH}
                fill="transparent"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredPoint({ timestamp, depthsMap, x })}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            );
          })}

          {/* Hover indicator line */}
          {hoveredPoint && (
            <line
              x1={hoveredPoint.x}
              y1={padding.top}
              x2={hoveredPoint.x}
              y2={padding.top + chartH}
              stroke="var(--color-text)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          )}

          {/* X-Axis Dates */}
          {timeMap.filter((_, i) => i % Math.max(1, Math.floor(timeMap.length / 5)) === 0).map(([t, _], i) => {
            const originalIndex = timeMap.findIndex(([ts]) => ts === t);
            const x = getX(originalIndex, timeMap.length);
            const dateStr = new Date(t).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit' });
            return (
              <text
                key={t}
                x={x}
                y={height - 12}
                textAnchor="middle"
                fontSize="11"
                fill="var(--color-text-muted)"
              >
                {dateStr}
              </text>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: `${Math.min(chartW - 140, Math.max(20, hoveredPoint.x - 70))}px`,
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '8px 12px',
              boxShadow: 'var(--shadow-md)',
              pointerEvents: 'none',
              fontSize: '12px',
              zIndex: 10,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: '4px', color: 'var(--color-text)' }}>
              {new Date(hoveredPoint.timestamp).toLocaleString([], {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
            {activeDepths.map((d) => (
              <div key={d} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                <span style={{ color: DEPTH_COLORS[d]?.stroke, fontWeight: 600 }}>{d}cm:</span>
                <span style={{ fontWeight: 700 }}>
                  {hoveredPoint.depthsMap[d] !== undefined ? `${hoveredPoint.depthsMap[d]}%` : '--'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
