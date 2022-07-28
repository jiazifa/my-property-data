import { IModalContentModel, useAppDispatch } from "../../reducers";
import { setActiveModalContent } from "../../reducers/app";
import { CreateTagFormDialog } from "./AddDialog";
// import { CreateTagFormDialog } from "./AddDialog";

const rows: any[] = [
    {
        id: 1,
        title: "测试1",
        desc: "描述",
        remark: "备注",
    },
    {
        id: 2,
        title: "测试1",
        desc: "描述",
        remark: "备注",
    },
    {
        id: 3,
        title: "测试1",
        desc: "描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述",
        remark: "备注备注备注备注备注备注备注备注备注备注备注备注备注",
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
        key: "desc",
        title: "描述"
    },
    {
        key: "remark",
        title: "备注"
    },
]

const removeAction = (item: any) => {

};

const editAction = (item: any) => { };

function TagBoard() {

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
        content: <CreateTagFormDialog />
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

export { TagBoard };