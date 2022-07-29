import React, { useState } from "react";
import { useAppDispatch } from "../../reducers";
import { setActiveModalContent } from "../../reducers/app";
import { Account, addAccount } from "../../reducers/user";
import { add_user } from "../../utils/backend";

function CreateAccountFormDialog() {
    const dispatch = useAppDispatch();
    const [key, _] = useState("name");
    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    const [gender, setGender] = useState(1);
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const handleComfirm = () => {
        var payload = {
            name: name,
            gender: gender,
            email: email,
            phone: phone,
        }
        add_user(name, gender, email, phone)
            .then((u) => u as Account)
            .then((u) => dispatch(addAccount(u)))
            .catch((e) => console.log(`${JSON.stringify(e)}`))
    };

    return (
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">添加成员</p>
                <button className="delete" aria-label="close" onClick={() => dispatch(setActiveModalContent(undefined))}></button>
            </header>
            <section className="modal-card-body">
                <div className="container">
                    <div className="field">
                        <label className="label">姓名</label>
                        <div className="control">
                            <input type="text" className="input" placeholder="请输入姓名" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <div className="level">
                            <div className="level-left">
                                <label className="label">性别</label>
                            </div>
                            <div className="select">
                                <select onChange={(e) => setGender(+e.target.value)}>
                                    <option value={1}>男</option>
                                    <option value={2}>女</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">邮箱</label>
                        <div className="control">
                            <input type="text" className="input" placeholder="请输入邮箱" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">电话</label>
                        <div className="control">
                            <input type="text" className="input" placeholder="请输入电话" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>
                </div >
            </section>
            <footer className="modal-card-foot">
                <button className="button is-success" onClick={() => handleComfirm()}>添加</button>
                <button className="button" type="reset" onClick={() => dispatch(setActiveModalContent(undefined))}>取消</button>
            </footer>
        </div>
    );
}

export { CreateAccountFormDialog }