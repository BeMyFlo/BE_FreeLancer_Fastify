import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import configJson from '../config/config.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const config = configJson[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

// Tự động import tất cả models trong thư mục models
const files = fs.readdirSync(__dirname).filter(file =>
  file.endsWith('.js') && file !== 'index.js'
);

for (const file of files) {
  const { default: defineModel } = await import(path.join(__dirname, file));
  const model = defineModel(sequelize);
  db[model.name] = model;
}

// Setup associate nếu có
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
