import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Home } from "./pages/Home/Home";
import { NovoCliente } from "./pages/NovoCliente/NovoCliente";
import { Clientes } from "./pages/Clientes/Clientes";
import { EditaCliente } from "./pages/EditaCliente/EditaCliente";
import { NovoPets } from "./pages/Pets/NovoPets";
import { AddProduto } from "./pages/Produtos/AddProd";
import { NovoPedido } from "./pages/NovoPedido/NovoPedido";
import { Produtos } from "./pages/Produtos/Produtos";
import { EditarProd } from "./pages/Produtos/EditarProd";
import { Pets } from "./pages/Pets/Pets";
import { EditarPet } from "./pages/Pets/EditarPet";
import { Pedidos } from "./pages/Pedidos/Pedidos";
import { NovoAgendamento } from "./pages/Agendamentos/NovoAgendamento";
import { NovoServico } from "./pages/NovoServico/NovoServico";
import { Servicos } from "./pages/Servicos/Servicos";
import { EditaServico } from "./pages/EditaServico/EditaServico";
import { Agendamentos } from "./pages/Agendamentos/Agendamentos";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { EditarAgendamento } from "./pages/Agendamentos/EditarAgendamento";
import { EditaPedido } from "./pages/EditaPedido/EditaPedido";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />          
          <Route path="/dashboard" element={<Dashboard/>}/>

          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/novo" element={<NovoCliente />} />
          <Route path="/clientes/editar/:id" element={<EditaCliente />} />

          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/novo" element={<NovoPets />} />
          <Route path="/pets/editar/:id" element={<EditarPet />} />

          <Route path="/pedidos/" element={<Pedidos />} />          
          <Route path="/pedidos/novo" element={<NovoPedido />} />
          <Route path = "/pedidos/editar/:id" element= { <EditaPedido />} />

          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/novo" element={<AddProduto />} />
          <Route path="/produtos/editar/:id" element={<EditarProd />} />

          <Route path="/agendamentos" element={<Agendamentos/>} />
          <Route path="/agendamentos/novo" element={<NovoAgendamento />} />
          <Route path="/agendamentos/editar/:id" element={<EditarAgendamento/>}/>
          
          <Route path="/servicos/novo" element={<NovoServico />} />
          <Route path = "/servicos" element= { <Servicos />} />
          <Route path="/servicos/editar/:id" element={< EditaServico />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;
