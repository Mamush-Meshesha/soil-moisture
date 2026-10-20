import { Router } from 'express';
import projectController from '../controllers/project.controller';

const router = Router();

// Public endpoints
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);

// Dashboard management endpoints
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

export default router;
