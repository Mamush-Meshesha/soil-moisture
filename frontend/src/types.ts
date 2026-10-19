export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'PLATFORM_ADMIN' | 'FARM_MANAGER' | 'FIELD_OPERATOR' | 'AGRONOMIST' | 'VIEWER';
  organizationName: string;
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  latitude?: number;
  longitude?: number;
  timezone: string;
  total_area_ha: number;
  description?: string;
  fields_count?: number;
  devices_count?: number;
  active_alerts_count?: number;
  avg_moisture_24h?: number;
  created_at: string;
}

export interface Field {
  id: string;
  farm_id: string;
  farm_name?: string;
  name: string;
  crop_type: string;
  planting_date?: string;
  soil_type: string;
  target_min_moisture: number;
  target_max_moisture: number;
  area_ha: number;
  root_depth_cm: number;
  devices_count?: number;
  active_alerts_count?: number;
  current_vwc?: number;
  current_temp?: number;
  created_at: string;
}

export interface Device {
  id: string;
  farm_id?: string;
  field_id?: string;
  farm_name?: string;
  field_name?: string;
  device_uid: string;
  name: string;
  model: string;
  hardware_type: string;
  firmware_version: string;
  battery_level: number;
  signal_quality: number;
  status: 'ONLINE' | 'OFFLINE' | 'STALE';
  last_seen_at: string;
  latest_vwc?: number;
  created_at: string;
}

export interface SensorReading {
  id: string;
  device_id: string;
  field_id?: string;
  depth_cm: number;
  vwc_percent: number;
  temp_c?: number;
  ec_ds_m?: number;
  quality_score?: number;
  source: string;
  is_demo: number;
  measured_at: string;
}

export interface Alert {
  id: string;
  field_id?: string;
  field_name?: string;
  farm_name?: string;
  device_id?: string;
  device_name?: string;
  device_uid?: string;
  title: string;
  message: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
  triggered_at: string;
  acknowledged_at?: string;
  resolved_at?: string;
}

export interface AlertRule {
  id: string;
  field_id: string;
  field_name?: string;
  farm_name?: string;
  rule_name: string;
  metric: string;
  operator: string;
  threshold: number;
  severity: string;
  is_active: number;
  created_at: string;
}

export interface IrrigationEvent {
  id: string;
  field_id: string;
  field_name?: string;
  crop_type?: string;
  scheduled_at: string;
  duration_minutes: number;
  water_applied_mm: number;
  method: string;
  notes?: string;
  created_at: string;
}

export interface IrrigationGuidance {
  fieldId: string;
  fieldName: string;
  cropType: string;
  soilType: string;
  currentVwc: number;
  targetMin: number;
  targetMax: number;
  rootDepthCm: number;
  status: 'CRITICAL_DEFICIT' | 'LOW' | 'OPTIMAL' | 'SATURATED';
  recommendedWaterMm: number;
  guidanceText: string;
  disclaimer: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  description: string;
  specs: Record<string, string>;
  image_url: string;
  inStock: boolean;
  stock_qty: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface MaintenanceRecord {
  id: string;
  device_id: string;
  type: string;
  description: string;
  performed_by: string;
  notes?: string;
  performed_at: string;
}
