import express from 'express';
import DockerService from '../services/DockerService.js';

const router = express.Router();
const dockerService = new DockerService();

/**
 * GET /api/tools
 * List all Stackvo tools
 */
router.get('/', async (req, res) => {
  try {
    const tools = await dockerService.listTools();
    res.json({
      success: true,
      data: { tools },
      meta: { count: tools.length }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * POST /api/tools/:containerName/start
 * Start a tool container
 */
router.post('/:containerName/start', async (req, res) => {
  try {
    const { containerName } = req.params;
    const io = req.app.get('io');
    
    // Extract tool name from container name (remove 'stackvo-' prefix)
    const toolName = containerName.replace('stackvo-', '');
    
    // Emit starting event
    if (io) {
      io.emit('tool:starting', { tool: toolName });
    }
    
    const result = await dockerService.startContainer(containerName);
    
    // Emit success event
    if (io) {
      io.emit('tool:started', { 
        tool: toolName,
        running: true
      });
    }
    
    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    // Emit error event
    const io = req.app.get('io');
    const toolName = req.params.containerName.replace('stackvo-', '');
    if (io) {
      io.emit('tool:error', { 
        tool: toolName,
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * POST /api/tools/:containerName/stop
 * Stop a tool container
 */
router.post('/:containerName/stop', async (req, res) => {
  try {
    const { containerName } = req.params;
    const io = req.app.get('io');
    
    // Extract tool name from container name (remove 'stackvo-' prefix)
    const toolName = containerName.replace('stackvo-', '');
    
    // Emit stopping event
    if (io) {
      io.emit('tool:stopping', { tool: toolName });
    }
    
    const result = await dockerService.stopContainer(containerName);
    
    // Emit success event
    if (io) {
      io.emit('tool:stopped', { 
        tool: toolName,
        running: false
      });
    }
    
    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    // Emit error event
    const io = req.app.get('io');
    const toolName = req.params.containerName.replace('stackvo-', '');
    if (io) {
      io.emit('tool:error', { 
        tool: toolName,
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * POST /api/tools/:containerName/restart
 * Restart a tool container
 */
router.post('/:containerName/restart', async (req, res) => {
  try {
    const { containerName } = req.params;
    const io = req.app.get('io');
    
    // Extract tool name from container name (remove 'stackvo-' prefix)
    const toolName = containerName.replace('stackvo-', '');
    
    // Emit restarting event
    if (io) {
      io.emit('tool:restarting', { tool: toolName });
    }
    
    const result = await dockerService.restartContainer(containerName);
    
    // Emit success event
    if (io) {
      io.emit('tool:restarted', { 
        tool: toolName,
        running: true
      });
    }
    
    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    // Emit error event
    const io = req.app.get('io');
    const toolName = req.params.containerName.replace('stackvo-', '');
    if (io) {
      io.emit('tool:error', { 
        tool: toolName,
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * POST /api/tools/:toolName/enable
 * Enable a tool (requires container rebuild)
 */
router.post('/:toolName/enable', async (req, res) => {
  try {
    const { toolName } = req.params;
    const dockerService = req.app.get('dockerService');
    const io = req.app.get('io');
    const EnvService = (await import('../services/EnvService.js')).default;
    const envService = new EnvService();
    
    // Emit enabling event
    io.emit('tool:enabling', { tool: toolName });
    
    const result = await dockerService.enableTool(toolName, envService);
    
    // Emit enabled event
    io.emit('tool:enabled', { tool: toolName, message: result.message });
    
    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Enable tool error:', error);
    
    // Emit error event
    const io = req.app.get('io');
    io.emit('tool:error', { tool: req.params.toolName, error: error.message });
    
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * POST /api/tools/:toolName/disable
 * Disable a tool (requires container rebuild)
 */
router.post('/:toolName/disable', async (req, res) => {
  try {
    const { toolName } = req.params;
    const dockerService = req.app.get('dockerService');
    const io = req.app.get('io');
    const EnvService = (await import('../services/EnvService.js')).default;
    const envService = new EnvService();
    
    // Emit disabling event
    io.emit('tool:disabling', { tool: toolName });
    
    const result = await dockerService.disableTool(toolName, envService);
    
    // Emit disabled event
    io.emit('tool:disabled', { tool: toolName, message: result.message });
    
    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Disable tool error:', error);
    
    // Emit error event
    const io = req.app.get('io');
    io.emit('tool:error', { tool: req.params.toolName, error: error.message });
    
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
