import moment from "moment";
import { useState } from "react";
import { useAppDispatch } from "../../reducers";
import { makeModalContentDisable } from "../../reducers/app";
import { BudgetMeta } from "../../reducers/budget";
import { add_budget } from "../../utils/backend";

function CreateBudgetFormDialog() {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState<string>("test");
    const [date, setDate] = useState<Date>(new Date());
    const [money, setMoneny] = useState(110);
    const [remark, setRemark] = useState<string>("test remark");

    const handleComfirm = () => {
        const start = moment().startOf("month").valueOf();
        const end = moment().endOf("month").valueOf();
        add_budget(title, money, remark, start, end)
            .then((r) => r as BudgetMeta)
            .catch(e => console.log(`${JSON.stringify(e)}`))
            .finally(() => dispatch(makeModalContentDisable()));
    };

    return (
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">添加预算</p>
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

export { CreateBudgetFormDialog }