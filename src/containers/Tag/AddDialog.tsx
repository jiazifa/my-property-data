import { useState } from "react";
import { useAppDispatch } from "../../reducers";
import { makeModalContentDisable } from "../../reducers/app";
import { addTag, TagMeta } from "../../reducers/tag";
import { add_tag } from "../../utils/backend";


function CreateTagFormDialog() {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState<string>("");
    const [date, _] = useState<Date>(new Date());
    const [desc, setDesc] = useState<string>("");
    const [remark, setRemark] = useState<string>("");

    const handleComfirm = () => {
        add_tag(title, desc, remark)
            .then((r) => r as TagMeta)
            .then((tag) => dispatch(addTag(tag)))
            .catch(e => console.log(`${JSON.stringify(e)}`))
            .finally(() => dispatch(makeModalContentDisable()))
    };

    return (
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">添加标签</p>
                <button className="delete" aria-label="close" onClick={() => dispatch(makeModalContentDisable())}></button>
            </header>
            <section className="modal-card-body">
                <div className="container">
                    <div className="field">
                        <label className="label">标题</label>
                        <div className="control">
                            <input type="text" className="input" placeholder="请输入标题" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">描述</label>
                        <div className="control">
                            <input type="text" className="input" placeholder="请输入描述" value={desc} onChange={(e) => setDesc(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">备注</label>
                        <div className="control">
                            <input type="text" className="input" placeholder="请输入备注" value={remark} onChange={(e) => setRemark(e.target.value)} />
                        </div>
                    </div>

                </div >
            </section>
            <footer className="modal-card-foot">
                <button className="button is-success" onClick={() => handleComfirm()}>添加</button>
                <button className="button" type="reset" onClick={() => dispatch(makeModalContentDisable())}>取消</button>
            </footer>
        </div>
    );
}

export { CreateTagFormDialog }