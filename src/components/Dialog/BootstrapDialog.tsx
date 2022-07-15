import { Close } from "@mui/icons-material";
import { Button, createTheme, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled } from "@mui/material";
import React from "react";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <Close />
            </IconButton>
        </DialogTitle>
    );
};

export declare interface IBootstrapDialogAction {
    title: string;
    action: () => void;
}

export declare interface IBootstrapDialogProps {
    title: string;
    open?: boolean;
    actions?: Array<IBootstrapDialogAction>;
    children?: React.ReactNode;
    onClose: () => void;
}

export default function BootstrapDialogComp(props: IBootstrapDialogProps) {
    const [open, setOpen] = React.useState(props.open ?? true);

    const handleClose = (action?: IBootstrapDialogAction) => {
        setOpen(false);
        props.onClose();
    };

    const hasNoAction = props.actions === null;

    return (
        <div>
            <BootstrapDialog
                onClose={() => { handleClose(undefined) }}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => { handleClose(undefined) }}>
                    {props.title}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {props.children}
                </DialogContent>
                {hasNoAction ? null :
                    <DialogActions>
                        {props.actions?.map((item) =>
                            <Button autoFocus onClick={() => { handleClose(item) }}>
                                {item.title}
                            </Button>)}

                    </DialogActions>
                }

            </BootstrapDialog>
        </div>
    );
}