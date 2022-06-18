use chrono::NaiveDateTime;
use sea_orm::entity::prelude::*;
use serde::Deserialize;

// 标签
#[derive(Debug, Clone, PartialEq, Deserialize, DeriveEntityModel)]
#[sea_orm(table_name = "tag")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub title: String,
    pub desc: Option<String>,
    pub remark: Option<String>,
    pub create_at: NaiveDateTime,
}

#[derive(Debug, Clone, Copy, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}
