import moment from "moment";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../reducers";
import { makeModalContentVisible } from "../../reducers/app";
import { BudgetMeta } from "../../reducers/budget";
import { load_all_budget } from "../../utils/backend";
import PropertyReactNodeManager from "../../utils/propertyReactNodeManager";
import { CreateBudgetFormDialog } from "./AddBudget";

const header = [
    {
        title: "ID",
        key: "ID"
    },
    {
        key: "title",
        title: "标题"
    },
    {
        key: "money",
        title: "金额"
    },
    {
        key: "limit",
        title: "周期"
    },
    {
        key: "remark",
        title: "备注"
    },
]

const removeAction = (item: any) => {

};

const editAction = (item: any) => { };

function BudgetBoard() {
    const [budgets, setBudgets] = useState<Array<BudgetMeta>>([]);
    const dispatch = useAppDispatch();
    useEffect(() => {
        load_all_budget()
            .then(r => {
                console.log(`${JSON.stringify(r)}`);
                return r as Array<BudgetMeta>;
            })
            .then(budgets => setBudgets(budgets))
    }, []);
    console.log(`budgets:  ${JSON.stringify(budgets)}`);
    const headerContainer = header.map((h) => (<th key={h.key}><abbr title={h.key}>{h.title}</abbr></th>));
    const rowContainer = budgets.map((r) => (
        <tr
            key={r.id}>
            <th>{r.id}</th>
            <td>{r.title}</td>
            <td>{r.moneny}</td>
            <td>{`${moment(r.limit_start_time).format('YYYY-MM-DD')} -- ${moment(r.limit_end_time).format('YYYY-MM-DD')}`}</td>
            <td>{r.remark}</td>
        </tr>
    ));
    return (
        <div>
            <div className="mt-4 container level is-max-desktop">
                <div className="level-left"></div>
                <div className="level-right">
                    <button className="button" onClick={() => {
                        PropertyReactNodeManager.getManager().modalNode = (<CreateBudgetFormDialog />);
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

export { BudgetBoard };