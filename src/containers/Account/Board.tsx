import { Add } from "@mui/icons-material";
import { Badge, Box, Card, CardActionArea, CardContent, CardHeader, createTheme, Grid, IconButton, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { Dispatch, SetStateAction, useState } from "react";
import { BootstrapDialogComp } from "../../components/Dialog";
import { CreateAccountFormDialog } from "./Account";

declare interface DialogItem {
    identifier: string;
    title: string;
    child: React.ReactNode,

}

const theme = createTheme();

const columns: Array<GridColDef> = [
    {
        field: "id",
        headerName: "ID",
        width: 40,
        editable: false,
    },
    {
        field: "name",
        headerName: "姓名",
        width: 80,
        editable: false,
    },
    {
        field: "gender",
        headerName: "性别",
        width: 140,
        editable: false,
    },
    {
        field: "phone",
        headerName: "电话",
        width: 240,
        editable: false,
    },
    {
        field: "email",
        headerName: "邮箱",
        width: 240,
        editable: false,
    },
]

const rows: any[] = [
    {
        id: 1,
        name: "测试1",
        gender: 1,
        email: "2333@qq.com",
        phone: "18344445555",
    },
    {
        id: 2,
        name: "测试1",
        gender: 1,
        email: "2333@qq.com",
        phone: "182"
    },
    {
        id: 3,
        name: "测试1",
        gender: 1,
        email: "2333@qq.com",
        phone: "182"
    }
];

const dialogs: Array<DialogItem> = [
    {
        identifier: "create.account",
        title: "创建成员",
        child: <CreateAccountFormDialog />
    }
]

function getActiveDialogIfCould(item: DialogItem | undefined, setKey: Dispatch<SetStateAction<string>>): null | React.ReactNode {
    if (!item) {
        return null;
    }

    return (<BootstrapDialogComp
        title={item.title}
        open={true}
        onClose={() => setKey("")}
        children={item.child}
    />)
}

function AccountBoard() {

    const [activeDialog, setActiveDialog] = useState<string>("");
    const activeItem = dialogs.find(i => i.identifier === activeDialog);
    const activeNode = getActiveDialogIfCould(activeItem, setActiveDialog);
    return (
        <ThemeProvider theme={theme}>
            <Box width="100%" height="100%">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        onClick={() => setActiveDialog("create.account")}>
                        <Add />
                    </IconButton>
                </Toolbar>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    hideFooterPagination={true}
                    onCellClick={(e) => console.log(e.row)}
                    disableSelectionOnClick
                />
            </Box>
            {activeNode}
        </ThemeProvider>
    )
}

export { AccountBoard };