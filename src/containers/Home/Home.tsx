import { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { Navigation } from "../../components/Navigation";
import { useAppSelector } from "../../reducers";
import { isModalActive } from "../../reducers/app";
import DashBoard from "../DashBoard";
import { AccountBoard } from "../Account";
import { TagBoard } from "../Tag";
import { BudgetBoard } from "../Budget";
import { FlowBoard } from "../Flow";
import PropertyReactNodeManager from "../../utils/propertyReactNodeManager";


const Home = () => {
    const NavigationContainer = Navigation(true);
    const domRef = useRef<HTMLInputElement>(null);
    const isModalVisible = useAppSelector(isModalActive);

    if (isModalVisible === false) {
        domRef.current?.classList.remove("is-active");
    } else {
        domRef.current?.classList.add("is-active");
    }
    return (
        <div>
            {NavigationContainer}
            <Routes>
                <Route path="dashboard/" element={<DashBoard />} />
                <Route path="account/" element={< AccountBoard />} />
                <Route path="tag/" element={< TagBoard />} />
                <Route path="budget/" element={< BudgetBoard />} />
                <Route path="flow/" element={< FlowBoard />} />
            </Routes>
            <div className={"modal"} ref={domRef}>
                <div className="modal-background"></div>
                <div>
                    {PropertyReactNodeManager.getManager().modalNode}
                </div>
            </div>
        </div >
    )
}

export { Home };