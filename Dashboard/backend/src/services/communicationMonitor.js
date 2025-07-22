import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class CommunicationMonitor {
  constructor(agenticPath) {
    this.agenticPath = agenticPath;
    this.commPath = path.join(agenticPath, 'COMMUNICATION');
    this.messages = [];
  }

  async start() {
    console.log('CommunicationMonitor started');
    await this.loadRecentMessages();
  }

  async loadRecentMessages() {
    try {
      const messagesPath = path.join(this.commPath, 'MESSAGES');
      const broadcastPath = path.join(this.commPath, 'BROADCAST');
      
      const messages = await this.readMessagesFromDir(messagesPath, 'DIRECT');
      const broadcasts = await this.readMessagesFromDir(broadcastPath, 'BROADCAST');
      
      this.messages = [...messages, ...broadcasts]
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 100); // Keep last 100 messages
    } catch (error) {
      console.error('Error loading messages:', error);
      this.messages = [];
    }
  }

  async readMessagesFromDir(dirPath, type) {
    try {
      const messages = [];
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isFile() && entry.name.endsWith('.md')) {
          try {
            const content = await fs.readFile(path.join(dirPath, entry.name), 'utf-8');
            const message = this.parseMessage(content, entry.name, type);
            if (message) messages.push(message);
          } catch (err) {
            console.error(`Error reading message ${entry.name}:`, err);
          }
        }
      }
      
      return messages;
    } catch {
      return [];
    }
  }

  parseMessage(content, filename, type) {
    try {
      // Parse markdown message format
      const from = this.extractField(content, 'From');
      const to = this.extractField(content, 'To');
      const timestamp = this.extractField(content, 'Timestamp');
      const subject = this.extractSubject(content);
      const body = this.extractContent(content);
      
      return {
        id: filename.replace('.md', ''),
        type,
        from: from || 'Unknown',
        to: to || 'Unknown',
        timestamp: timestamp ? new Date(timestamp) : new Date(),
        subject: subject || 'No Subject',
        content: body || '',
        priority: this.extractField(content, 'Priority') || 'NORMAL'
      };
    } catch (error) {
      console.error('Error parsing message:', error);
      return null;
    }
  }

  extractField(content, field) {
    const regex = new RegExp(`\\*\\*${field}\\*\\*:\\s*(.+)$`, 'm');
    const match = content.match(regex);
    return match ? match[1].trim() : null;
  }

  extractSubject(content) {
    const match = content.match(/##\s*Subject\s*\n(.+)$/m);
    return match ? match[1].trim() : null;
  }

  extractContent(content) {
    const match = content.match(/##\s*Content\s*\n([\s\S]*?)(?=\n##|$)/);
    return match ? match[1].trim() : '';
  }

  async getRecentMessages(limit = 50) {
    await this.loadRecentMessages();
    return this.messages.slice(0, limit);
  }

  async getMessagesByAgent(agentName, limit = 50) {
    await this.loadRecentMessages();
    return this.messages
      .filter(msg => msg.from === agentName || msg.to === agentName)
      .slice(0, limit);
  }

  async getMessagesByType(type, limit = 50) {
    await this.loadRecentMessages();
    return this.messages
      .filter(msg => msg.type === type)
      .slice(0, limit);
  }

  async getCommunicationStats() {
    await this.loadRecentMessages();
    
    const stats = {
      totalMessages: this.messages.length,
      messagesByType: {},
      messagesByAgent: {},
      averagePerHour: 0
    };
    
    // Count by type
    this.messages.forEach(msg => {
      stats.messagesByType[msg.type] = (stats.messagesByType[msg.type] || 0) + 1;
      stats.messagesByAgent[msg.from] = (stats.messagesByAgent[msg.from] || 0) + 1;
    });
    
    // Calculate average per hour
    if (this.messages.length > 1) {
      const timeSpan = this.messages[0].timestamp - this.messages[this.messages.length - 1].timestamp;
      const hours = timeSpan / (1000 * 60 * 60);
      stats.averagePerHour = Math.round(this.messages.length / hours);
    }
    
    return stats;
  }
}