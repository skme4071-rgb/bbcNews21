import { Route, BrowserRouter, Routes } from "react-router-dom";


import "./../style/App.css";



import { Dashboard_Leyout } from "./Leyout";

import Users from "./pages/Analytics";
import Articles from "./pages/Articles";
import Dashboard from "./pages/Dashboard";
import Editors from "./pages/Editors";
import Messages from "./pages/Messages";
import Reporters from "./pages/Reporters";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";





export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Dashboard/" element={<Dashboard_Leyout />}>
          <Route index element={<Dashboard />} />
          <Route path="Users" element={<Users />} />
          <Route path="Analytics" element={<Analytics />} />
          <Route path="Articles" element={<Articles />} />
          <Route path="Editors" element={<Editors />} />
          <Route path="Reporters" element={<Reporters />} />
          <Route path="Messages" element={<Messages />} />
          <Route path="Settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

