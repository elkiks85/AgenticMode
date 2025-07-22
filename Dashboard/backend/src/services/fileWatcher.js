import { EventEmitter } from 'events';
import chokidar from 'chokidar';
import { readFile } from 'fs/promises';
import { join } from 'path';

export class FileWatcher extends EventEmitter {
  constructor(basePath) {
    super();
    this.basePath = basePath;
    this.watcher = null;
  }

  start() {
    const paths = [
      join(this.basePath, '_SYSTEM/REGISTRY/**/*.md'),
      join(this.basePath, 'AGENTS/**/STATE.md'),
      join(this.basePath, 'AGENTS/**/HEARTBEAT*.md'),
      join(this.basePath, 'WORK/**/*.md'),
      join(this.basePath, 'PROJECTS/**/*.md'),
      join(this.basePath, 'COMMUNICATION/**/*.md'),
    ];

    this.watcher = chokidar.watch(paths, {
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 500,
        pollInterval: 100
      }
    });

    this.watcher
      .on('add', (path) => this.handleFileChange('add', path))
      .on('change', (path) => this.handleFileChange('change', path))
      .on('unlink', (path) => this.handleFileChange('unlink', path));

    console.log('File watcher started');
  }

  async handleFileChange(event, filePath) {
    try {
      const relativePath = filePath.replace(this.basePath, '');
      
      // Determine file type and emit appropriate event
      if (relativePath.includes('REGISTRY/HEARTBEATS')) {
        this.emit('agent:heartbeat', { event, path: relativePath });
      } else if (relativePath.includes('AGENTS') && relativePath.includes('STATE.md')) {
        this.emit('agent:update', { event, path: relativePath });
      } else if (relativePath.includes('WORK')) {
        this.emit('task:update', { event, path: relativePath });
      } else if (relativePath.includes('PROJECTS')) {
        this.emit('project:update', { event, path: relativePath });
      } else if (relativePath.includes('COMMUNICATION/MESSAGES')) {
        if (event === 'add') {
          const content = await this.readFile(filePath);
          this.emit('message:new', { path: relativePath, content });
        }
      } else if (relativePath.includes('REGISTRY')) {
        this.emit('system:update', { event, path: relativePath });
      }
    } catch (error) {
      console.error('Error handling file change:', error);
    }
  }

  async readFile(filePath) {
    try {
      return await readFile(filePath, 'utf-8');
    } catch (error) {
      console.error('Error reading file:', filePath, error);
      return null;
    }
  }

  stop() {
    if (this.watcher) {
      this.watcher.close();
    }
  }
}