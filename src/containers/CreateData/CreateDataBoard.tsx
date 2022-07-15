import { Box, Card, CardActionArea, CardContent, CardHeader, createTheme, Grid, ThemeProvider, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { BootstrapDialogComp } from "../../components/Dialog";
import { CreateAccountFormDialog } from './Account';

const theme = createTheme();

declare interface CreateDataItem {
    identifier: string;
    title: string;
    subheader?: string;

}

const createDataList: Array<CreateDataItem> = [
    {
        identifier: "account",
        title: "成员",
        subheader: "zhelishi ceshi",
    },
];

const GridSectionBuilder = (items: Array<CreateDataItem>, onClickAction: (item: CreateDataItem) => void) => {
    return (
        <Box m={5}>
            <Grid
                container
                justifyContent="flex-start"
                alignItems="stretch"
                direction="row"
                rowSpacing={1}
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}>

                {items.map((i) => {
                    return (
                        <Grid item xs={4} >
                            <Card>
                                <CardActionArea onClick={() => onClickAction(i)}>
                                    <CardHeader
                                        title={i.title}
                                        subheader={i.subheader}
                                    />
                                    <CardContent>
                                        <Typography variant='body2' color="text.secondary" gutterBottom>
                                            {`--`}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                })}


            </Grid>
        </Box >

    );
}

function getActiveDialogIfCould(item: CreateDataItem | undefined, setKey: Dispatch<SetStateAction<String>>): null | React.ReactNode {
    if (!item) {
        return null;
    }
    if (item.identifier === "account") {
        return (<BootstrapDialogComp
            title={item.title}
            open={true}
            onClose={() => setKey("")}
            children={<CreateAccountFormDialog />}
        />)
    }
    return null;
}

function CreateDataBoard() {
    const [activeDialog, setActiveDialog] = useState<String>("");

    const activeItem = createDataList.find(i => i.identifier === activeDialog);
    const targetNode = getActiveDialogIfCould(activeItem, setActiveDialog);
    return (
        <ThemeProvider theme={theme}>
            {GridSectionBuilder(createDataList, (item) => { setActiveDialog(item.identifier) })}
            {targetNode}
        </ThemeProvider >

    )
}

export { CreateDataBoard };