import { Router } from 'express';
import * as CC from '../Controllers/content.controller.js';
import { checkToken } from '../Middleware/auth.middleware.js';

const router = Router();

// Aplicamos el middleware a todas las rutas de este archivo
router.use(checkToken);

// --- MODULE: NOTES ---
// GET: Ver notas (USER: solo propias | ADMIN: todas)
router.get('/notes', CC.handleGet('notes'));
// POST: Agregar una nota
router.post('/notes', CC.handleCreate('notes'));
// PATCH: Modificar una nota por ID
router.patch('/notes/:id', CC.handleUpdate('notes'));
// DELETE: Borrar una nota por ID
router.delete('/notes/:id', CC.handleDelete('notes'));

// --- MODULE: TASKS ---
// GET: Obtener las tareas
router.get('/tasks', CC.handleGet('tasks'));
// POST: Agregar una tarea
router.post('/tasks', CC.handleCreate('tasks'));
// PATCH: Modificar la tarea
router.patch('/tasks/:id', CC.handleUpdate('tasks'));
// DELETE: Eliminar la tarea
router.delete('/tasks/:id', CC.handleDelete('tasks'));

// --- MODULE: ACHIEVEMENTS ---
// GET: Obtener los logros
router.get('/achievements', CC.handleGet('achievements'));
// POST: Agregar el logro
router.post('/achievements', CC.handleCreate('achievements'));
// PATCH: Modificar el logro
router.patch('/achievements/:id', CC.handleUpdate('achievements'));
// DELETE: Eliminar el logro
router.delete('/achievements/:id', CC.handleDelete('achievements'));

// --- MODULE: EXPERIENCES ---
// GET: Obtener la experiencia
router.get('/experiences', checkToken, CC.handleGet('experiences'));
// POST: Agregar la experiencia
router.post('/experiences', CC.handleCreate('experiences'));
// PATCH: Actualizar la experiencia
router.patch('/experiences/:id', CC.handleUpdate('experiences'));
// DELETE: Eliminar la experiencia
router.delete('/experiences/:id', CC.handleDelete('experiences'));

export default router;