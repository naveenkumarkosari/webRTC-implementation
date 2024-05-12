import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Sender } from "./componets/Sender";
import { Receiver } from "./componets/Receiver";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/sender" element={<Sender/>}/>
        <Route path="/reciever" element={<Receiver/>}/>
        </Routes></BrowserRouter>
    </>
  );
}

export default App;
