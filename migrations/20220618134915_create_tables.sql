-- Add migration script here
CREATE TABLE IF NOT EXISTS budget (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(128),
    moneny INTEGER,
    remark TEXT NULL,
    limit_start_time DateTime NOT NULL,
    limit_end_time DateTime NOT NULL,
    create_at TIMESTAMP NOT NULL default (datetime('now', 'localtime'))
);

-- 流水表
CREATE TABLE IF NOT EXISTS flow (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(128),
    moneny INTEGER,
    remark TEXT NULL,
    budget_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    create_at TIMESTAMP NOT NULL
);

-- 标签
CREATE TABLE IF NOT EXISTS tag (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(128),
    `desc` TEXT NULL,
    remark TEXT NULL,
    create_at TIMESTAMP NOT NULL default (datetime('now', 'localtime'))
);

-- 用户
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    identifier VARCHAR(128),
    `name` VARCHAR(32),
    sex SMALLINT,
    email TEXT NULL,
    phone VARCHAR(11) NULL,
    icon TEXT NULL,
    create_at TIMESTAMP NOT NULL default (datetime('now', 'localtime'))
);