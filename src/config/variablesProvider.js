/* eslint-disable no-unused-vars */
import config from './config.json';

// Resolve the current environment
// eslint-disable-next-line no-undef
const environment = process.env.NODE_ENV || 'development';

// Get the corresponding configuration
// const resolvedConfig = config[environment] || config['development']; // Fallback to development
const resolvedConfig = config['production'];// Fallback to development
// const resolvedConfig = config[environment]; // Fallback to development

// Export the resolved configuration
export const API_BASE_URL = resolvedConfig.API_BASE_URL;
export const OTHER_CONFIG = resolvedConfig.OTHER_CONFIG;

// You can export more values as needed
export default resolvedConfig;
