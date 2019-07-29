require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  storege: './__tests__/database.sqlite',
  // logging: false,
  // não exibe as querys executadas
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
