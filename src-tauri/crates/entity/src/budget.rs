use sea_orm::{entity::prelude::*, ActiveValue};
use serde::{Deserialize, Serialize};

use crate::{DBConnection, Result};

// 预算表
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, DeriveEntityModel)]
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

#[derive(Debug)]
pub struct InsertBudget {
    pub title: String,
    pub moneny: i32,
    pub remark: Option<String>,
    pub limit_end_time: DateTimeLocal,
    pub limit_start_time: DateTimeLocal,
}

impl InsertBudget {
    pub fn new(
        title: String,
        moneny: i32,
        remark: Option<String>,
        limit_end_time: DateTimeLocal,
        limit_start_time: DateTimeLocal,
    ) -> Self {
        Self {
            title,
            moneny,
            remark,
            limit_end_time,
            limit_start_time,
        }
    }

    pub async fn execute(self, db: &DBConnection) -> Result<Model> {
        let mut insert: ActiveModel = Default::default();
        insert.title = ActiveValue::set(self.title);
        insert.moneny = ActiveValue::set(self.moneny);
        insert.remark = ActiveValue::set(self.remark);
        insert.limit_start_time = ActiveValue::set(self.limit_start_time);
        insert.limit_end_time = ActiveValue::set(self.limit_end_time);
        let newElement = insert.insert(db).await?;
        return Ok(newElement);
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
    pub fn new(
        title: Option<String>,
        moneny: Option<i32>,
        remark: Option<String>,
        limit_end_time: Option<DateTimeLocal>,
        limit_start_time: Option<DateTimeLocal>,
    ) -> Self {
        Self {
            title,
            moneny,
            remark,
            limit_end_time,
            limit_start_time,
        }
    }

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
        let new_element = updated.update(db).await?;
        return Ok(new_element);
    }
}

pub struct FindBudget(i32);

impl FindBudget {
    pub fn new(uid: i32) -> Self {
        Self(uid)
    }
}
impl FindBudget {
    pub async fn execute(self, db: &DBConnection) -> Result<Option<Model>> {
        let budget = Entity::find_by_id(self.0).one(db).await?;
        return Ok(budget);
    }
}
pub struct FindAllBudget();

impl FindAllBudget {
    pub async fn execute(db: &DBConnection) -> Result<Vec<Model>> {
        let budget = Entity::find().all(db).await?;
        return Ok(budget);
    }
}
pub struct FindBudgetByTime(DateTimeLocal);

impl FindBudgetByTime {
    pub fn new(time: DateTimeLocal) -> Self {
        Self(time)
    }

    pub async fn execute(self, db: &DBConnection) -> Result<Vec<Model>> {
        let budget = Entity::find()
            .filter(Column::LimitStartTime.lt(self.0))
            .filter(Column::LimitEndTime.gt(self.0))
            .all(db)
            .await?;
        return Ok(budget);
    }
}

pub struct RemoveBudget(i32);

impl RemoveBudget {
    pub fn new(uid: i32) -> Self {
        Self(uid)
    }
}

impl RemoveBudget {
    pub async fn execute(self, db: &DBConnection) -> Result<bool> {
        let removed = Entity::delete_by_id(self.0).exec(db).await?;
        return Ok(removed.rows_affected > 0);
    }
}
