import Database from 'better-sqlite3';
const db = new Database('a_crude_db.db', { verbose: console.log });

export { db };