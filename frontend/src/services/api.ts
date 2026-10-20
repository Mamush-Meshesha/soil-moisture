import {
  User,
  Farm,
  Field,
  Device,
  SensorReading,
  Alert,
  AlertRule,
  IrrigationEvent,
  IrrigationGuidance,
  Product,
  Project,
} from '../types';

const BASE_URL = ((import.meta as any).env?.VITE_API_URL || '').replace(/\/$/, '') + '/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('agtech_auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

export const api = {
  // Auth
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
  },

  async register(
    email: string,
    password: string,
    fullName: string,
    organizationName?: string
  ): Promise<{ token: string; user: User }> {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, fullName, organizationName }),
    });
    return handleResponse(res);
  },

  async getMe(): Promise<{ user: User }> {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  // Farms
  async getFarms(): Promise<{ farms: Farm[] }> {
    const res = await fetch(`${BASE_URL}/farms`, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  async getFarm(id: string): Promise<{ farm: Farm; fields: Field[]; devices: Device[] }> {
    const res = await fetch(`${BASE_URL}/farms/${id}`, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  async createFarm(data: any): Promise<{ farm: Farm }> {
    const res = await fetch(`${BASE_URL}/farms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async deleteFarm(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${BASE_URL}/farms/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  // Fields
  async getFields(farmId?: string): Promise<{ fields: Field[] }> {
    const url = farmId ? `${BASE_URL}/fields?farmId=${farmId}` : `${BASE_URL}/fields`;
    const res = await fetch(url, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  async getField(
    id: string
  ): Promise<{ field: Field; devices: Device[]; alertRules: AlertRule[]; recentAlerts: Alert[]; latestProfile: any[] }> {
    const res = await fetch(`${BASE_URL}/fields/${id}`, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  async createField(data: any): Promise<{ field: Field }> {
    const res = await fetch(`${BASE_URL}/fields`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async deleteField(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${BASE_URL}/fields/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  // Devices
  async getDevices(): Promise<{ devices: Device[] }> {
    const res = await fetch(`${BASE_URL}/devices`, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  async getDevice(id: string): Promise<{ device: Device; recentReadings: SensorReading[]; maintenance: any[] }> {
    const res = await fetch(`${BASE_URL}/devices/${id}`, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  async registerDevice(data: any): Promise<{ device: Device }> {
    const res = await fetch(`${BASE_URL}/devices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async updateDevice(id: string, data: any): Promise<{ device: Device }> {
    const res = await fetch(`${BASE_URL}/devices/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async addMaintenanceRecord(deviceId: string, data: any): Promise<{ record: any }> {
    const res = await fetch(`${BASE_URL}/devices/${deviceId}/maintenance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // Telemetry
  async getTelemetryHistory(params: {
    fieldId?: string;
    deviceId?: string;
    depthCm?: number;
    startDate?: string;
    endDate?: string;
    limit?: number;
  }): Promise<{ readings: SensorReading[]; count: number }> {
    const searchParams = new URLSearchParams();
    if (params.fieldId) searchParams.append('fieldId', params.fieldId);
    if (params.deviceId) searchParams.append('deviceId', params.deviceId);
    if (params.depthCm) searchParams.append('depthCm', params.depthCm.toString());
    if (params.startDate) searchParams.append('startDate', params.startDate);
    if (params.endDate) searchParams.append('endDate', params.endDate);
    if (params.limit) searchParams.append('limit', params.limit.toString());

    const res = await fetch(`${BASE_URL}/telemetry/history?${searchParams.toString()}`);
    return handleResponse(res);
  },

  async getTelemetryAnalytics(fieldId?: string, deviceId?: string): Promise<any> {
    const searchParams = new URLSearchParams();
    if (fieldId) searchParams.append('fieldId', fieldId);
    if (deviceId) searchParams.append('deviceId', deviceId);

    const res = await fetch(`${BASE_URL}/telemetry/analytics?${searchParams.toString()}`);
    return handleResponse(res);
  },

  async ingestTelemetry(payload: any, idempotencyKey?: string): Promise<any> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (idempotencyKey) headers['X-Idempotency-Key'] = idempotencyKey;

    const res = await fetch(`${BASE_URL}/telemetry/ingest`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  // Alerts
  async getAlerts(params?: { status?: string; severity?: string; fieldId?: string }): Promise<{ alerts: Alert[] }> {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append('status', params.status);
    if (params?.severity) searchParams.append('severity', params.severity);
    if (params?.fieldId) searchParams.append('fieldId', params.fieldId);

    const res = await fetch(`${BASE_URL}/alerts?${searchParams.toString()}`, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  async acknowledgeAlert(id: string): Promise<{ alert: Alert }> {
    const res = await fetch(`${BASE_URL}/alerts/${id}/acknowledge`, {
      method: 'PUT',
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  async resolveAlert(id: string): Promise<{ alert: Alert }> {
    const res = await fetch(`${BASE_URL}/alerts/${id}/resolve`, {
      method: 'PUT',
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  async getAlertRules(fieldId?: string): Promise<{ rules: AlertRule[] }> {
    const url = fieldId ? `${BASE_URL}/alerts/rules?fieldId=${fieldId}` : `${BASE_URL}/alerts/rules`;
    const res = await fetch(url, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  async createAlertRule(data: any): Promise<{ rule: AlertRule }> {
    const res = await fetch(`${BASE_URL}/alerts/rules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // Irrigation
  async getIrrigationEvents(fieldId?: string): Promise<{ events: IrrigationEvent[] }> {
    const url = fieldId ? `${BASE_URL}/irrigation/events?fieldId=${fieldId}` : `${BASE_URL}/irrigation/events`;
    const res = await fetch(url, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  async logIrrigationEvent(data: any): Promise<{ event: IrrigationEvent }> {
    const res = await fetch(`${BASE_URL}/irrigation/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async getIrrigationGuidance(): Promise<{ guidance: IrrigationGuidance[] }> {
    const res = await fetch(`${BASE_URL}/irrigation/guidance`, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  // Hardware Store & Catalog
  async getProducts(category?: string): Promise<{ products: Product[] }> {
    const url = category ? `${BASE_URL}/store/products?category=${category}` : `${BASE_URL}/store/products`;
    const res = await fetch(url);
    return handleResponse(res);
  },

  async getProduct(slug: string): Promise<{ product: Product }> {
    const res = await fetch(`${BASE_URL}/store/products/${slug}`);
    return handleResponse(res);
  },

  async createProduct(data: any): Promise<{ success: boolean; product: Product; message: string }> {
    const res = await fetch(`${BASE_URL}/store/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async updateProduct(id: string, data: any): Promise<{ success: boolean; product: Product; message: string }> {
    const res = await fetch(`${BASE_URL}/store/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async deleteProduct(id: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${BASE_URL}/store/products/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  async checkout(orderData: any): Promise<any> {
    const res = await fetch(`${BASE_URL}/store/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    return handleResponse(res);
  },

  // Field Initiatives & Projects (Our Work)
  async getProjects(params?: { category?: string; lang?: string; limit?: number }): Promise<{ projects: Project[]; count: number }> {
    const searchParams = new URLSearchParams();
    if (params?.category && params.category !== 'all') searchParams.append('category', params.category);
    if (params?.lang) searchParams.append('lang', params.lang);
    if (params?.limit) searchParams.append('limit', String(params.limit));

    const query = searchParams.toString();
    const url = query ? `${BASE_URL}/projects?${query}` : `${BASE_URL}/projects`;
    const res = await fetch(url);
    return handleResponse(res);
  },

  async getProject(id: string, lang?: string): Promise<{ project: Project }> {
    const query = lang ? `?lang=${lang}` : '';
    const res = await fetch(`${BASE_URL}/projects/${id}${query}`);
    return handleResponse(res);
  },

  async createProject(data: any): Promise<{ success: boolean; project: Project; message: string }> {
    const res = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async updateProject(id: string, data: any): Promise<{ success: boolean; project: Project; message: string }> {
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async deleteProject(id: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },


  // Reports
  getExportCsvUrl(fieldId?: string, deviceId?: string): string {
    const params = new URLSearchParams();
    if (fieldId) params.append('fieldId', fieldId);
    if (deviceId) params.append('deviceId', deviceId);
    return `${BASE_URL}/reports/csv?${params.toString()}`;
  },

  async getReportSummary(): Promise<any> {
    const res = await fetch(`${BASE_URL}/reports/summary`, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  // Contact / Demo
  async submitContact(data: any): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // Cloudinary Image Upload
  async uploadImage(
    fileOrDataUrl: File | string,
    folder: string = 'aquascope'
  ): Promise<{ success: boolean; url: string; publicId: string }> {
    let imagePayload = '';
    if (typeof fileOrDataUrl === 'string') {
      imagePayload = fileOrDataUrl;
    } else {
      imagePayload = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(fileOrDataUrl);
      });
    }

    const res = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ image: imagePayload, folder }),
    });

    return handleResponse(res);
  },
};
