use sea_orm::{
    entity::prelude::*,
    ActiveValue::{self},
};
use serde::{Deserialize, Serialize};

use crate::{DBConnection, Result};

// 用户表
#[derive(Debug, Clone, PartialEq, Deserialize, DeriveEntityModel)]
#[sea_orm(table_name = "user")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub identifier: String,
    pub name: String,
    pub sex: Option<Gender>,
    pub email: Option<String>,
    pub phone: Option<String>,
    pub icon: Option<String>,
    pub create_at: DateTimeLocal,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize, EnumIter, DeriveActiveEnum)]
#[sea_orm(rs_type = "i32", db_type = "Integer")]
pub enum Gender {
    #[sea_orm(num_value = 1)]
    Female = 1,
    #[sea_orm(num_value = 2)]
    Male = 2,
}

#[derive(Debug, Clone, Copy, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}

pub struct FindUser(i32);
impl FindUser {
    pub async fn execute(self, db: &DBConnection) -> Result<Option<Model>> {
        Entity::find_by_id(self.0).one(db).await
    }
}

pub struct InsertUser {
    pub identifier: String,
    pub name: String,
    pub gender: Option<Gender>,
    pub email: Option<String>,
    pub phone: Option<String>,
    pub icon: Option<String>,
}

impl InsertUser {
    pub async fn create_user(self, db: &DBConnection) -> Result<Model> {
        let mut user: ActiveModel = Default::default();
        user.set(Column::Identifier, self.identifier.into());
        user.set(Column::Name, self.name.into());
        if let Some(gender) = self.gender {
            user.set(Column::Sex, gender.into());
        }
        if let Some(email) = self.email {
            user.set(Column::Email, email.into());
        }
        if let Some(phone) = self.phone {
            user.set(Column::Phone, phone.into());
        }
        if let Some(icon) = self.icon {
            user.set(Column::Icon, icon.into());
        }
        user.insert(db).await
    }
}

pub struct UpdateUser {
    pub name: Option<String>,
    pub sex: Option<Gender>,
    pub email: Option<String>,
    pub phone: Option<String>,
    pub icon: Option<String>,
}

impl UpdateUser {
    pub async fn update_user(self, origin: Model, db: &DBConnection) -> Result<Model> {
        let mut updated: ActiveModel = origin.clone().into();
        if let Some(name) = self.name {
            updated.name = ActiveValue::set(name)
        }

        if let Some(value) = self.sex {
            updated.sex = ActiveValue::set(value.into())
        }

        if let Some(value) = self.email {
            updated.email = ActiveValue::set(value.into())
        }

        if let Some(value) = self.phone {
            updated.phone = ActiveValue::set(value.into())
        }

        updated.update(db).await
    }
}

pub struct CancellationUser(i32);

impl CancellationUser {
    async fn cancellation_user(self, db: &DBConnection) -> Result<bool> {
        let removed = Entity::delete_by_id(self.0).exec(db).await?;
        return Ok(removed.rows_affected > 0);
    }
}
