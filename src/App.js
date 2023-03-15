import './App.css';
import {Routes, Route, Navigate} from "react-router-dom"
import Shopping from "./components/Shopping";
import TypeContextProvider from "./context/TypeContextProvider";

function App() {
    return (
        <div className="App">
            <TypeContextProvider>
                <Routes>
                    <Route path={"/Charge"} element={<Shopping/>}/>
                    <Route path={"/*"} element={<Navigate to={"/Charge"}/>}/>
                </Routes>
            </TypeContextProvider>
        </div>
    );
}

export default App;
