import prisma from '../prisma';

export interface LocalizedProjectData {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryKey: string;
  date: string;
  location: string;
  image: string;
  summary: string;
  objective: string;
  method: string;
  keyFindings: string[];
  partner?: string | null;
  details?: {
    objective: string;
    method: string;
    keyFindings: string[];
    partner?: string | null;
  };
  translations?: Record<string, any>;
  order?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ProjectService {
  async getProjects(categoryKey?: string, lang?: string): Promise<LocalizedProjectData[]> {
    const where: any = {};
    if (categoryKey && categoryKey.toLowerCase() !== 'all') {
      where.categoryKey = categoryKey.toLowerCase();
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    return projects.map((p) => this.formatProject(p, lang));
  }

  async getProjectById(id: string, lang?: string): Promise<LocalizedProjectData> {
    const project = await prisma.project.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });

    if (!project) {
      const err: any = new Error('Project not found');
      err.statusCode = 404;
      throw err;
    }

    return this.formatProject(project, lang);
  }

  async createProject(data: any): Promise<LocalizedProjectData> {
    const {
      title,
      category = 'Field Testing',
      categoryKey = 'field',
      date = 'Current',
      location = 'Field Site',
      image = '/images/hero-water-testing.jpg',
      summary = '',
      objective = '',
      method = '',
      keyFindings = [],
      partner = null,
      translations = null,
      order = 0,
    } = data;

    if (!title || !summary) {
      const err: any = new Error('Title and summary are required');
      err.statusCode = 400;
      throw err;
    }

    const slug =
      data.slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') +
        '-' +
        Math.floor(100 + Math.random() * 900);

    const project = await prisma.project.create({
      data: {
        slug,
        title,
        category,
        categoryKey,
        date,
        location,
        image,
        summary,
        objective,
        method,
        keyFindingsJson: JSON.stringify(Array.isArray(keyFindings) ? keyFindings : [keyFindings]),
        partner,
        translationsJson: translations ? JSON.stringify(translations) : null,
        order: Number(order) || 0,
      },
    });

    return this.formatProject(project);
  }

  async updateProject(id: string, data: any): Promise<LocalizedProjectData> {
    const existing = await prisma.project.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });

    if (!existing) {
      const err: any = new Error('Project not found');
      err.statusCode = 404;
      throw err;
    }

    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.categoryKey !== undefined) updateData.categoryKey = data.categoryKey;
    if (data.date !== undefined) updateData.date = data.date;
    if (data.location !== undefined) updateData.location = data.location;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.summary !== undefined) updateData.summary = data.summary;
    if (data.objective !== undefined) updateData.objective = data.objective;
    if (data.method !== undefined) updateData.method = data.method;
    if (data.keyFindings !== undefined) {
      updateData.keyFindingsJson = JSON.stringify(
        Array.isArray(data.keyFindings) ? data.keyFindings : [data.keyFindings]
      );
    }
    if (data.partner !== undefined) updateData.partner = data.partner;
    if (data.translations !== undefined) {
      updateData.translationsJson = data.translations ? JSON.stringify(data.translations) : null;
    }
    if (data.order !== undefined) updateData.order = Number(data.order) || 0;

    const updated = await prisma.project.update({
      where: { id: existing.id },
      data: updateData,
    });

    return this.formatProject(updated);
  }

  async deleteProject(id: string): Promise<{ success: boolean; message: string }> {
    const existing = await prisma.project.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });

    if (!existing) {
      const err: any = new Error('Project not found');
      err.statusCode = 404;
      throw err;
    }

    await prisma.project.delete({ where: { id: existing.id } });
    return { success: true, message: 'Project deleted successfully' };
  }

  private formatProject(p: any, lang?: string): LocalizedProjectData {
    let findings: string[] = [];
    try {
      findings = JSON.parse(p.keyFindingsJson || '[]');
    } catch (_) {
      findings = [];
    }

    let translations: Record<string, any> = {};
    try {
      translations = JSON.parse(p.translationsJson || '{}');
    } catch (_) {
      translations = {};
    }

    // If specific language requested (e.g. 'am', 'om', 'ti'), merge overrides
    if (lang && translations[lang]) {
      const tr = translations[lang];
      return {
        id: p.id,
        slug: p.slug,
        title: tr.title || p.title,
        category: tr.category || p.category,
        categoryKey: p.categoryKey,
        date: tr.date || p.date,
        location: tr.location || p.location,
        image: p.image,
        summary: tr.summary || p.summary,
        objective: tr.objective || p.objective,
        method: tr.method || p.method,
        keyFindings: tr.keyFindings || findings,
        partner: tr.partner || p.partner,
        details: {
          objective: tr.objective || p.objective,
          method: tr.method || p.method,
          keyFindings: tr.keyFindings || findings,
          partner: tr.partner || p.partner,
        },
        translations,
        order: p.order,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      };
    }

    return {
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      categoryKey: p.categoryKey,
      date: p.date,
      location: p.location,
      image: p.image,
      summary: p.summary,
      objective: p.objective,
      method: p.method,
      keyFindings: findings,
      partner: p.partner,
      details: {
        objective: p.objective,
        method: p.method,
        keyFindings: findings,
        partner: p.partner,
      },
      translations,
      order: p.order,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    };
  }
}

export const projectService = new ProjectService();
export default projectService;
