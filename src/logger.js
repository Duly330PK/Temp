// src/logger.js
'use strict';

const winston = require('winston');
const { combine, timestamp, printf, colorize } = winston.format;

// Definiere ein benutzerdefiniertes Format für Log-Ausgaben
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'debug', // Setze die minimale Log-Ebene
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(),
    logFormat
  ),
  transports: [
    // Logge in die Konsole
    new winston.transports.Console(),
    // Optional: Ausgabe in eine Datei
    // new winston.transports.File({ filename: 'logs/application.log' })
  ]
});

module.exports = logger;
