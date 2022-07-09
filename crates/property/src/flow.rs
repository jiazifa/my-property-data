use entity::{flow::InsertFlow, DBConnection};

use crate::account::AccountCoordinator;

pub struct FlowCoordinator {}

impl FlowCoordinator {
    pub async fn add_flow(flow: InsertFlow, db: &DBConnection) {}
}
