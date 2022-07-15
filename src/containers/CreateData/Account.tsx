import { Avatar, Box, Button, Container, createTheme, CssBaseline, Dialog, DialogTitle, TextField, ThemeProvider } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";

import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../reducers";

const theme = createTheme();

export interface CreateAccountFormCompProps {

}

function CreateAccountFormComp(props: CreateAccountFormCompProps) {

    const navigator = useNavigate();

    const [key, _] = useState("name");
    const [value, setValue] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    const dispatch = useAppDispatch();

    const handleComfirm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let v = Number(value);
        let time = date;
        // let tString = moment(time).format("YYYY/MM/DD");
        // const unit: IHealthDataUnit = {
        //     value: v,
        //     time: time
        // };
        // // console.log(`${time} :: ${tString}`)
        // dispatch(addUricHealthData(unit));
        // props.onCommit();
    }, []);

    const handleValueChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
    }, []);

    const isValueError = !(value.length >= 0);
    console.log(isValueError);
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component='main' maxWidth="xs">
                    <CssBaseline />
                    <Box mt={2} display='flex' flexDirection='column' alignItems='center'>
                        <Avatar> U </Avatar>
                    </Box>
                    <Box component='form' onSubmit={handleComfirm} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            error={isValueError}
                            id="account.value"
                            name="account.value"
                            autoComplete="my-property-data.account.value"
                            autoFocus
                            label={isValueError ? "Error" : "姓名"}
                            value={value}
                            onChange={handleValueChanged}
                            variant={isValueError ? "filled" : "outlined"}
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="录入时间"
                                value={date}
                                onChange={(newValue) => { setDate(newValue || new Date()) }}
                                renderInput={(params) => <TextField fullWidth required {...params} />}
                            />
                        </LocalizationProvider>

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}> 添加 </Button>
                    </Box>
                </Container>
            </ThemeProvider>

        </div>
    )
}

export interface CreateUricAcidFormDialogProps {
    open?: boolean;
}

function CreateAccountFormDialog(props: CreateUricAcidFormDialogProps) {
    return (
        <CreateAccountFormComp />
    );
}

export { CreateAccountFormComp, CreateAccountFormDialog }