import * as fs from 'fs';
import * as morgan from 'morgan';
import * as path from 'path';

const logFilePath = path.join(__dirname, '../../logs/access.log');

const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

export const logger = morgan('combined', { stream: logStream });
