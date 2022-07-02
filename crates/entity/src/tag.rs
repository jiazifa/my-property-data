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

pub async fn create_tag(insert: InsertTag, db: &DBConnection) -> Result<Model> {
    let mut tag: ActiveModel = Default::default();
    tag.title = ActiveValue::set(insert.title);
    tag.desc = ActiveValue::set(insert.desc);
    tag.remark = ActiveValue::set(insert.remark);
    tag.insert(db).await
}

pub async fn remove_tag(_id: i32, db: &DBConnection) -> Result<bool> {
    let result = Entity::delete_by_id(_id).exec(db).await?;
    return Ok(result.rows_affected > 0);
}
