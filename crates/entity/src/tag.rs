use sea_orm::{entity::prelude::*, ActiveValue};
use serde::{Deserialize, Serialize};

use crate::{DBConnection, Result};

// 标签
#[derive(Debug, Clone, PartialEq, Deserialize, DeriveEntityModel)]
#[sea_orm(table_name = "tag")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub title: String,
    pub desc: Option<String>,
    pub remark: Option<String>,
    pub tag_type: TagType,
    pub create_at: DateTimeLocal,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize, EnumIter, DeriveActiveEnum)]
#[sea_orm(rs_type = "i32", db_type = "Integer")]
pub enum TagType {
    #[sea_orm(num_value = 1)]
    FlowTag = 1,
    #[sea_orm(num_value = 2)]
    BudgetTag,
}

#[derive(Debug, Clone, Copy, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}

pub struct InsertTag {
    pub title: String,
    pub desc: Option<String>,
    pub remark: Option<String>,
}

impl InsertTag {
    pub async fn execute(self, db: &DBConnection) -> Result<Model> {
        let mut tag: ActiveModel = Default::default();
        tag.title = ActiveValue::set(self.title);
        tag.desc = ActiveValue::set(self.desc);
        tag.remark = ActiveValue::set(self.remark);
        let t = tag.insert(db).await?;
        return Ok(t);
    }
}

pub struct RemoveTag(i32);

impl RemoveTag {
    pub async fn execute(self, db: &DBConnection) -> Result<bool> {
        let result = Entity::delete_by_id(self.0).exec(db).await?;
        return Ok(result.rows_affected > 0);
    }
}

#[cfg(test)]
mod test {}
