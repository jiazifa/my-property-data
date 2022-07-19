import { Avatar, Box, Button, Container, createTheme, CssBaseline, Dialog, Select, MenuItem, TextField, ThemeProvider, SelectChangeEvent } from "@mui/material"
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
    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    const [gender, setGender] = useState(1);
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const dispatch = useAppDispatch();

    const handleComfirm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let v = Number(name);
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

    const handleNameValueChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setName(newValue);
    }, []);

    const isValueError = !(name.length >= 0);
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component='main' maxWidth="xs">
                    <CssBaseline />
                    <Box mt={2} display='flex' flexDirection='column' alignItems='center'>
                        <Avatar> {name.charAt(0)} </Avatar>
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
                            value={name}
                            onChange={handleNameValueChanged}
                            variant={isValueError ? "filled" : "outlined"}
                        />

                        <Select
                            label="性别"
                            id="account.gender.value"
                            fullWidth
                            value={"" + gender}
                            onChange={(e) => setGender(+e.target.value)}
                        >
                            <MenuItem value={1}> 男 </MenuItem>
                            <MenuItem value={2}> 女 </MenuItem>

                        </Select>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="account.email.value"
                            name="account.email.value"
                            autoComplete="my-property-data.account.email.value"
                            autoFocus
                            label={"邮箱"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant={isValueError ? "filled" : "outlined"}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="account.phone.value"
                            name="account.phone.value"
                            autoComplete="my-property-data.account.phone.value"
                            autoFocus
                            label={"电话"}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            variant={isValueError ? "filled" : "outlined"}
                        />

                        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="录入时间"
                                value={date}
                                onChange={(newValue) => { setDate(newValue || new Date()) }}
                                renderInput={(params) => <TextField fullWidth required {...params} />}
                            />
                        </LocalizationProvider> */}

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}> 添加 </Button>
                    </Box>
                </Container>
            </ThemeProvider>

        </div >
    )
}

function CreateAccountFormDialog() {
    return (
        <CreateAccountFormComp />
    );
}

export { CreateAccountFormComp, CreateAccountFormDialog }