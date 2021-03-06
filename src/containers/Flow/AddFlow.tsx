import React, { useState } from "react";
import { useAppDispatch } from "../../reducers";
import { makeModalContentDisable } from "../../reducers/app";


function CreateFlowFormDialog() {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    const [money, setMoneny] = useState(0);
    const [remark, setRemark] = useState<string>("");

    const handleComfirm = () => {
        var payload = {
            title: title,
            date: date,
            moneny: money,
            remark: remark
        }
        console.log(`${JSON.stringify(payload)}`);
    };

    return (
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">添加流水</p>
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
                        <label className="label">金额</label>
                        <div className="control">
                            <input type="text" className="input" placeholder="请输入金额" value={money} onChange={(e) => setMoneny(+e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">消耗预算项</label>
                        <div className="control">
                            <input type="text" className="input" placeholder="消耗预算项" value={remark} onChange={(e) => setRemark(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">使用人</label>
                        <div className="control">
                            <input type="text" className="input" placeholder="使用人" value={remark} onChange={(e) => setRemark(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">时间</label>
                        <div className="control">
                            <input type="text" className="input" placeholder="时间" value={remark} onChange={(e) => setRemark(e.target.value)} />
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

export { CreateFlowFormDialog }