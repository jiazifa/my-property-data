import React from "react";

export default class PropertyReactNodeManager {
    modalNode: React.ReactNode | undefined;

    private static manager: PropertyReactNodeManager;

    private constructor() {
        // 构造器
        this.modalNode = undefined;
    }

    public static getManager(): PropertyReactNodeManager {
        if (this.manager == null) {
            this.manager = new PropertyReactNodeManager();
        }
        return this.manager;
    }
}