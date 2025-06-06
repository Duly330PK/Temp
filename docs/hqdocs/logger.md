// src/logger.js
'use strict';

import winston from 'winston';
const { combine, timestamp, printf, colorize } = winston.format;

// Benutzerdefiniertes Format für Log-Ausgaben.
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'debug', // Minimale Log-Ebene
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    // Optional: Ausgabe in eine Datei
    // new winston.transports.File({ filename: 'logs/application.log' })
  ]
});

export default logger;
