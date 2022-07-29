import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../reducers";
import { makeModalContentVisible } from "../../reducers/app";
import { Account, selectAccounts, updateAccounts } from "../../reducers/user";
import { load_all_user } from "../../utils/backend";
import PropertyReactNodeManager from "../../utils/propertyReactNodeManager";
import { CreateAccountFormDialog } from "./AddDialog";

const header = [
    {
        title: "ID",
        key: "ID"
    },
    {
        key: "name",
        title: "姓名"
    },
    {
        key: "gender",
        title: "性别"
    },
    {
        key: "email",
        title: "邮箱"
    },
    {
        key: "phone",
        title: "电话"
    },
]

const removeAction = (item: any) => {

};

const editAction = (item: any) => { };

function AccountBoard() {

    const dispatch = useAppDispatch();
    useEffect(() => {
        load_all_user()
            .then((r) => r as Array<Account>)
            .then((users) => dispatch(updateAccounts(users)))
            .catch((e) => console.log(`${JSON.stringify(e)}`));
    }, []);
    const accounts = useAppSelector(selectAccounts);

    const headerContainer = header.map((h) => (<th key={h.key}><abbr title={h.key}>{h.title}</abbr></th>));
    const rowContainer = accounts.map((r) => (
        <tr
            key={r.id}>
            <th>{r.id}</th>
            <td>{r.name}</td>
            <td>{r.gender === 1 ? "女" : "男"}</td>
            <td>{r.email}</td>
            <td>{r.phone}</td>
        </tr>
    ));
    return (
        <div>
            <div className="mt-4 container level is-max-desktop">
                <div className="level-left"></div>
                <div className="level-right">
                    <button className="button" onClick={() => {
                        PropertyReactNodeManager.getManager().modalNode = (<CreateAccountFormDialog />);
                        dispatch(makeModalContentVisible());
                    }}>
                        <span>添加</span>
                    </button>
                </div>
            </div>
            <table className="table container is-max-desktop">
                <thead>
                    <tr>
                        {headerContainer}
                    </tr>
                </thead>
                <tbody>
                    {rowContainer}
                </tbody>
            </table>

        </div>
    )
}

export { AccountBoard };