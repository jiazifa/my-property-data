use sea_orm::{entity::prelude::*, ActiveValue};
use serde::Deserialize;

use crate::{DBConnection, EntityError, Result};

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
    pub user_id: i32,
    pub create_at: DateTimeLocal,
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

pub struct InsertFlow {
    pub title: String,
    pub moneny: i32,
    pub remark: Option<String>,
    pub budget_id: i32,
    pub user_id: i32,
    pub create_at: DateTimeLocal,
}

impl InsertFlow {
    pub async fn execute(self, db: &DBConnection) -> Result<Model> {
        let mut element: ActiveModel = Default::default();
        element.title = ActiveValue::set(self.title);
        element.moneny = ActiveValue::set(self.moneny);
        element.budget_id = ActiveValue::set(self.budget_id);
        element.remark = ActiveValue::set(self.remark);
        element.create_at = ActiveValue::set(self.create_at);
        let new_element = element.insert(db).await?;
        return Ok(new_element);
    }
}

pub struct UpdateFlow {
    pub id: i32,
    pub title: String,
    pub moneny: i32,
    pub remark: Option<String>,
    pub budget_id: i32,
    pub user_id: i32,
    pub create_at: DateTimeLocal,
}

impl UpdateFlow {
    pub async fn execute(self, db: &DBConnection) -> Result<Model> {
        let origin = match Entity::find_by_id(self.id).one(db).await? {
            Some(e) => e,
            None => {
                return Err(EntityError::DbError(error_code::DBError::RecordNotFound(
                    "Flow".to_owned(),
                )))
            }
        };
        let mut element: ActiveModel = origin.into();
        element.title = ActiveValue::set(self.title);
        element.moneny = ActiveValue::set(self.moneny);
        element.budget_id = ActiveValue::set(self.budget_id);
        element.remark = ActiveValue::set(self.remark);
        element.create_at = ActiveValue::set(self.create_at);
        let new_element = element.insert(db).await?;
        return Ok(new_element);
    }
}

pub struct RemoveFlow(i32);

impl RemoveFlow {
    pub async fn execute(self, db: &DBConnection) -> Result<bool> {
        let removed = Entity::delete_by_id(self.0).exec(db).await?;
        return Ok(removed.rows_affected > 0);
    }
}
