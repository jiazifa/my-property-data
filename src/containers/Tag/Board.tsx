import { Add, DeleteRounded, EditRounded } from "@mui/icons-material";
import { Box, createTheme, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { BootstrapDialogComp } from "../../components/Dialog";
import { CreateTagFormDialog } from "./AddDialog";

const theme = createTheme();

const rows: any[] = [
    {
        id: 1,
        title: "测试1",
        desc: "描述",
    },
    {
        id: 2,
        title: "测试1",
        desc: "描述",
    },
    {
        id: 3,
        title: "测试1",
        desc: "描述",
    },
];

const removeAction = (item: any) => {

};

const editAction = (item: any) => { };

function TagBoard() {

    const [activeDialog, setActiveDialog] = useState<React.ReactNode>();
    return (
        <ThemeProvider theme={theme}>
            <Box width="100%" height="100%">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        onClick={() => setActiveDialog(
                            <BootstrapDialogComp
                                title="添加标签"
                                open={true}
                                onClose={() => setActiveDialog(null)}
                                children={<CreateTagFormDialog />}
                            />
                        )}>
                        <Add />
                    </IconButton>
                </Toolbar>
                <TableContainer component={Paper}>
                    <Table aria-label="标签列表">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>标题</TableCell>
                                <TableCell>描述</TableCell>
                                <TableCell>备注</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.desc}</TableCell>
                                    <TableCell>{row.remark}</TableCell>
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

export { TagBoard };