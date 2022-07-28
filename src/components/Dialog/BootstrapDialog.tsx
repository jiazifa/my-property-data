import React from "react";


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
        <div className={"modal" + " " + open ? "is-active" : ""}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{props.title}</p>
                    <button className="delete" aria-label="close" onClick={() => handleClose()}></button>
                </header>
                <section className="modal-card-body">
                    {props.children}
                </section>
                <footer className="modal-card-foot">
                </footer>
            </div>
        </div>

    );
}