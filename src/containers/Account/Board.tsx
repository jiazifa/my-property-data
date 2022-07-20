import { Add, DeleteRounded, EditRounded } from "@mui/icons-material";
import { Box, createTheme, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { BootstrapDialogComp } from "../../components/Dialog";
import { CreateAccountFormDialog } from "./AddDialog";

const theme = createTheme();

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

const removeAction = (item: any) => {

};

const editAction = (item: any) => { };

function AccountBoard() {

    const [activeDialog, setActiveDialog] = useState<React.ReactNode>();
    return (
        <ThemeProvider theme={theme}>
            <Box width="100%" height="100%">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        onClick={() => setActiveDialog(
                            <BootstrapDialogComp
                                title="添加成员"
                                open={true}
                                onClose={() => setActiveDialog(null)}
                                children={<CreateAccountFormDialog />}
                            />
                        )}>
                        <Add />
                    </IconButton>
                </Toolbar>
                <TableContainer component={Paper}>
                    <Table aria-label="成员列表">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>姓名</TableCell>
                                <TableCell>性别</TableCell>
                                <TableCell>电话</TableCell>
                                <TableCell>邮箱</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.gender}</TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => removeAction(row)}>
                                            <EditRounded />
                                        </IconButton>

                                        <IconButton onClick={() => editAction(row)}>
                                            <DeleteRounded />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {activeDialog}
        </ThemeProvider>
    )
}

export { AccountBoard };