use sea_orm::{
    entity::prelude::*,
    ActiveValue::{self},
};
use serde::{Deserialize, Serialize};

use crate::{DBConnection, Result};

// 用户表
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, DeriveEntityModel)]
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

pub struct FindUserById(i32);

impl FindUserById {
    pub fn new(uid: i32) -> FindUserById {
        FindUserById(uid)
    }
}

impl FindUserById {
    pub async fn execute(self, db: &DBConnection) -> Result<Option<Model>> {
        let result = Entity::find_by_id(self.0).one(db).await?;
        return Ok(result);
    }
}

pub struct FindAllUsers();

impl FindAllUsers {
    pub async fn execute(db: &DBConnection) -> Result<Vec<Model>> {
        let result = Entity::find().all(db).await?;
        return Ok(result);
    }
}

pub struct FindUserByName {
    name: String,
}

impl FindUserByName {
    pub fn new(name: String) -> Self {
        Self { name }
    }
}

impl FindUserByName {
    pub async fn execute(self, db: &DBConnection) -> Result<Option<Model>> {
        let result = Entity::find()
            .filter(Column::Name.eq(self.name))
            .one(db)
            .await?;
        return Ok(result);
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
    pub fn new(
        identifier: String,
        name: String,
        gender: Option<Gender>,
        email: Option<String>,
        phone: Option<String>,
        icon: Option<String>,
    ) -> Self {
        Self {
            identifier,
            name,
            gender,
            email,
            phone,
            icon,
        }
    }

    pub async fn execute(self, db: &DBConnection) -> Result<Model> {
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
        let u = user.insert(db).await?;
        return Ok(u);
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
    pub fn new(
        name: Option<String>,
        sex: Option<Gender>,
        email: Option<String>,
        phone: Option<String>,
        icon: Option<String>,
    ) -> Self {
        Self {
            name,
            sex,
            email,
            phone,
            icon,
        }
    }

    pub async fn execute(self, origin: Model, db: &DBConnection) -> Result<Model> {
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

        let u = updated.update(db).await?;
        return Ok(u);
    }
}

pub struct CancellationUser(i32);

impl CancellationUser {
    pub fn new(uid: i32) -> Self {
        Self(uid)
    }
}

impl CancellationUser {
    pub async fn execute(self, db: &DBConnection) -> Result<bool> {
        let removed = Entity::delete_by_id(self.0).exec(db).await?;
        return Ok(removed.rows_affected > 0);
    }
}

#[cfg(test)]
mod tests {
    use sea_orm::{entity::prelude::*, entity::*, tests_cfg::*};

    use crate::EntityError;

    use super::InsertUser;

    use tokio_test;

    async fn test_insert_user() -> Result<(), EntityError> {
        let insert = InsertUser::new(
            "12312321312312312".to_string(),
            "Test".to_string(),
            None,
            None,
            None,
            None,
        );
        return Ok(());
    }
}
