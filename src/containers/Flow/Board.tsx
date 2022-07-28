import { IModalContentModel, useAppDispatch } from "../../reducers";
import { setActiveModalContent } from "../../reducers/app";
import { CreateFlowFormDialog } from "./AddFlow";

const rows: any[] = [
    {
        id: 1,
        title: "测试1",
        remark: "描述",
    },
    {
        id: 2,
        title: "测试1",
        remark: "描述",
    },
    {
        id: 3,
        title: "测试1",
        remark: "描述",
    },
];

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
        key: "budget",
        title: "消耗预算项"
    },
    {
        key: "account",
        title: "使用人"
    },
    {
        key: "date",
        title: "时间"
    },
    {
        key: "remark",
        title: "备注"
    },
]

const removeAction = (item: any) => {

};

const editAction = (item: any) => { };

function FlowBoard() {

    const dispatch = useAppDispatch();
    const headerContainer = header.map((h) => (<th key={h.key}><abbr title={h.key}>{h.title}</abbr></th>));
    const rowContainer = rows.map((r) => (
        <tr
            key={r.id}>
            <th>{r.id}</th>
            <td>{r.title}</td>
            <td>{r.desc}</td>
            <td>{r.remark}</td>
        </tr>
    ));
    const addModal: IModalContentModel = {
        content: <CreateFlowFormDialog />
    };
    return (
        <div>
            <div className="mt-4 container level is-max-desktop">
                <div className="level-left"></div>
                <div className="level-right">
                    <button className="button" onClick={() => dispatch(setActiveModalContent(addModal))}>
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

export { FlowBoard };