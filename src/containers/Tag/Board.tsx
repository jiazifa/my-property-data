import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../reducers";
import { makeModalContentVisible } from "../../reducers/app";
import { selectAllTags, TagMeta, updateTags } from "../../reducers/tag";
import { load_all_tag } from "../../utils/backend";
import PropertyReactNodeManager from "../../utils/propertyReactNodeManager";
import { CreateTagFormDialog } from "./AddDialog";
// import { CreateTagFormDialog } from "./AddDialog";

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
    useEffect(() => {
        load_all_tag()
            .then((r) => r as Array<TagMeta>)
            .then((tags) => dispatch(updateTags(tags)))
            .catch((e) => console.log(`${JSON.stringify(e)}`));
    }, []);
    const headerContainer = header.map((h) => (<th key={h.key}><abbr title={h.key}>{h.title}</abbr></th>));
    const tags = useAppSelector(selectAllTags);
    const rowContainer = tags.map((r) => (
        <tr
            key={r.id}>
            <th>{r.id}</th>
            <td>{r.title}</td>
            <td>{r.desc}</td>
            <td>{r.remark}</td>
        </tr>
    ));

    return (
        <div>
            <div className="mt-4 container level is-max-desktop">
                <div className="level-left"></div>
                <div className="level-right">
                    <button className="button" onClick={() => {
                        PropertyReactNodeManager.getManager().modalNode = (<CreateTagFormDialog />);
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

export { TagBoard };