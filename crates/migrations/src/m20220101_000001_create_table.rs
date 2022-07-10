use entity;
use sea_orm_migration::{
    prelude::*,
    sea_orm::{ConnectionTrait, Statement},
};
pub struct Migration;

impl MigrationName for Migration {
    fn name(&self) -> &str {
        "m20220101_000001_create_table"
    }
}

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let sql = r#"
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
        "#;
        let statement = Statement::from_string(manager.get_database_backend(), sql.to_owned());
        manager
            .get_connection()
            .execute(statement)
            .await
            .map(|_| ())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let sql = r#"
    DROP TABLE `user`;
    DROP TABLE `tag`;
    DROP TABLE `flow`;
    DROP TABLE `budget`;
        "#;
        let statement = Statement::from_string(manager.get_database_backend(), sql.to_owned());
        manager
            .get_connection()
            .execute(statement)
            .await
            .map(|_| ())
    }
}
