import { Avatar, Box, Button, Container, createTheme, CssBaseline, Dialog, Select, MenuItem, TextField, ThemeProvider } from "@mui/material"
import moment from "moment";

import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export interface CreateTagFormCompProps {

}

function CreateTagFormComp(props: CreateTagFormCompProps) {

    const navigator = useNavigate();

    const [title, setTitle] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    const [desc, setDesc] = useState<string>();
    const [remark, setRemark] = useState<string>("");


    const handleComfirm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let v = Number(title);
        let time = date;
    }, []);

    const isValueError = !(title.length >= 0);
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component='main' maxWidth="xs">
                    <Box component='form' onSubmit={handleComfirm} sx={{ mt: 1 }}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Tag.title.value"
                            name="Tag.title.value"
                            autoComplete="my-property-data.Tag.title.value"
                            autoFocus
                            label={"标题"}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            variant={isValueError ? "filled" : "outlined"}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Tag.desc.value"
                            name="Tag.desc.value"
                            autoComplete="my-property-data.Tag.desc.value"
                            autoFocus
                            label={"描述"}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            variant={isValueError ? "filled" : "outlined"}
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            id="Tag.remark.value"
                            name="Tag.remark.value"
                            autoComplete="my-property-data.Tag.remark.value"
                            autoFocus
                            label={"备注"}
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            variant={isValueError ? "filled" : "outlined"}
                        />

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}> 添加 </Button>
                    </Box>
                </Container>
            </ThemeProvider>

        </div >
    )
}

function CreateTagFormDialog() {
    return (
        <CreateTagFormComp />
    );
}

export { CreateTagFormComp, CreateTagFormDialog }