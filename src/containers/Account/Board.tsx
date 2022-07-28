import { IModalContentModel, useAppDispatch } from "../../reducers";
import { setActiveModalContent } from "../../reducers/app";
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
const rows: any[] = [
    {
        id: 1,
        name: "测试1",
        gender: 1,
        email: "2333@qq.com",
        phone: "18344445555",
    },
    {
        id: 2,
        name: "测试1",
        gender: 1,
        email: "2333@qq.com",
        phone: "182"
    },
    {
        id: 3,
        name: "测试1",
        gender: 1,
        email: "2333@qq.com",
        phone: "182"
    }
];

const removeAction = (item: any) => {

};

const editAction = (item: any) => { };

function AccountBoard() {

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
        content: <CreateAccountFormDialog />
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

export { AccountBoard };