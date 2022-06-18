use chrono::NaiveDateTime;
use sea_orm::entity::prelude::*;
use serde::Deserialize;

// 标签
#[derive(Debug, Clone, PartialEq, Deserialize, DeriveEntityModel)]
#[sea_orm(table_name = "flow")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub title: String,
    pub moneny: i32,
    pub remark: Option<String>,
    pub budget_id: i32,
    pub create_at: NaiveDateTime,
}

#[derive(Debug, Clone, Copy, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        has_one = "super::budget::Entity"
        belongs_to = "super::budget::Entity", 
        from = "Column::BudgetId"
         to = "super::budget::Column::Id"
        )]
    Budget,
}

impl ActiveModelBehavior for ActiveModel {}
