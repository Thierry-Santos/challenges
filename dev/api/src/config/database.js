module.exports = {
  dialect: 'postgres',
  host: 'db',
  username: 'postgres',
  password: 'docker',
  database: 'iheros',
  define: {
    timestamps: true,
    underscored: true,
  }
}