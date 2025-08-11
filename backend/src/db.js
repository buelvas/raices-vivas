import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = process.env.DB_PATH || path.join(__dirname, '..', '..', 'data.db')
const db = new Database(dbPath)

// Opcional: performance/consistencia en dev
db.pragma('journal_mode = WAL')
db.pragma('synchronous = NORMAL')

// schema (crea una DB nueva con todos los campos)
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    email          TEXT    UNIQUE NOT NULL,
    password_hash  TEXT    NOT NULL,
    name           TEXT,
    phone          TEXT,
    city           TEXT,
    country        TEXT,
    role           TEXT,
    terms          INTEGER DEFAULT 0,        -- 0/1 (booleano)
    started_at     TEXT,                     -- ISO de último login
    created_at     TEXT    DEFAULT (datetime('now'))
  );

  -- Índices útiles
  CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  CREATE INDEX IF NOT EXISTS idx_users_started_at ON users(started_at);
`)

export default db
