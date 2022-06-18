use chrono::NaiveDateTime;
use sea_orm::entity::prelude::*;
use serde::Deserialize;

// 预算表
#[derive(Debug, Clone, PartialEq, Deserialize, DeriveEntityModel)]
#[sea_orm(table_name = "budget")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub title: String,
    pub moneny: i32,
    pub remark: Option<String>,
    pub limit_end_time: NaiveDateTime,
    pub limit_start_time: NaiveDateTime,
    pub create_at: NaiveDateTime,
}

#[derive(Debug, Clone, Copy, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::flow::Entity",
        has_many = "super::flow::Entity",
        from = "Column::Id",
        to = "super::flow::Column::BudgetId"
    )]
    Flow,
}

impl ActiveModelBehavior for ActiveModel {}
