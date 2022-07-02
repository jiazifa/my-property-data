use sea_orm::{entity::prelude::*, ActiveValue};
use serde::Deserialize;

use crate::{DBConnection, Result};

// 预算表
#[derive(Debug, Clone, PartialEq, Deserialize, DeriveEntityModel)]
#[sea_orm(table_name = "budget")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub title: String,
    pub moneny: i32,
    pub remark: Option<String>,
    pub limit_end_time: DateTimeLocal,
    pub limit_start_time: DateTimeLocal,
    pub create_at: DateTimeLocal,
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

pub struct InsertBudget {
    pub title: String,
    pub moneny: i32,
    pub remark: Option<String>,
    pub limit_end_time: DateTimeLocal,
    pub limit_start_time: DateTimeLocal,
}

impl InsertBudget {
    pub async fn execute(self, db: &DBConnection) -> Result<Model> {
        let mut insert: ActiveModel = Default::default();
        insert.title = ActiveValue::set(self.title);
        insert.moneny = ActiveValue::set(self.moneny);
        insert.remark = ActiveValue::set(self.remark);
        insert.limit_start_time = ActiveValue::set(self.limit_start_time);
        insert.limit_end_time = ActiveValue::set(self.limit_end_time);
        insert.insert(db).await
    }
}

pub struct UpdateBudget {
    pub title: Option<String>,
    pub moneny: Option<i32>,
    pub remark: Option<String>,
    pub limit_end_time: Option<DateTimeLocal>,
    pub limit_start_time: Option<DateTimeLocal>,
}

impl UpdateBudget {
    pub async fn execute(self, origin: Model, db: &DBConnection) -> Result<Model> {
        let mut updated: ActiveModel = origin.into();
        if let Some(title) = self.title {
            updated.title = ActiveValue::set(title);
        }
        if let Some(value) = self.moneny {
            updated.moneny = ActiveValue::set(value);
        }
        if let Some(value) = self.remark {
            updated.remark = ActiveValue::set(value.into());
        }
        if let Some(value) = self.limit_start_time {
            updated.limit_start_time = ActiveValue::set(value);
        }
        if let Some(value) = self.limit_end_time {
            updated.limit_start_time = ActiveValue::set(value);
        }
        updated.update(db).await
    }
}

pub struct RemoveBudget(i32);

impl RemoveBudget {
    pub async fn execute(self, db: &DBConnection) -> Result<bool> {
        let removed = Entity::delete_by_id(self.0).exec(db).await?;
        return Ok(removed.rows_affected > 0);
    }
}
