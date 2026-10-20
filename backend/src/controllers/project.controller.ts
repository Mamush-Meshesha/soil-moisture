import { Request, Response, NextFunction } from 'express';
import projectService from '../services/project.service';

export class ProjectController {
  async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, lang } = req.query;
      const projects = await projectService.getProjects(
        category as string | undefined,
        lang as string | undefined
      );
      return res.json({ projects, count: projects.length });
    } catch (error) {
      next(error);
    }
  }

  async getProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const { lang } = req.query;
      const project = await projectService.getProjectById(
        req.params.id,
        lang as string | undefined
      );
      return res.json({ project });
    } catch (error) {
      next(error);
    }
  }

  async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await projectService.createProject(req.body);
      return res.status(201).json({
        success: true,
        message: 'Field work initiative published successfully.',
        project,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProject(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await projectService.updateProject(req.params.id, req.body);
      return res.json({
        success: true,
        message: 'Field work initiative updated successfully.',
        project,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await projectService.deleteProject(req.params.id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const projectController = new ProjectController();
export default projectController;
