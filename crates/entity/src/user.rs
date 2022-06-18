use chrono::NaiveDateTime;
use sea_orm::entity::prelude::*;
use serde::Deserialize;

// 用户表
#[derive(Debug, Clone, PartialEq, Deserialize, DeriveEntityModel)]
#[sea_orm(table_name = "user")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub identifier: String,
    pub name: String,
    pub sex: Option<bool>,
    pub email: Option<String>,
    pub phone: Option<String>,
    pub icon: Option<String>,
    pub create_at: NaiveDateTime,
}

#[derive(Debug, Clone, Copy, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}
