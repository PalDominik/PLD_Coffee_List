import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import { useState } from "react";
import CoffeeList from "./components/Pages/UserPage";
import type { Role } from "./Types/Type";
import Navbar from "./components/Page_Componets/NavBar";


function App() {
  const [mod,setMod] = useState<Role>("user");

  return(
    <>
      <Navbar role={mod} onChange={setMod}></Navbar>
      <div className="container-fluid py-3">
        <br />
        {/* {mod === "user" &&<CoffeeList></CoffeeList>} */}
        <CoffeeList></CoffeeList>
        {mod === "moderator" && <ModeratorPage></ModeratorPage>}
      </div>
    </>)

}

export default App
