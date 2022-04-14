import "./App.css";

import Header from "./components/header/Header";
import Footer from "./components/footer/footer";
import EnhancedTable from "./components/table_grid/table";

function App() {
  return (
    <div className="App"> 
      <Header />
      <EnhancedTable/>
      <Footer />
    </div>
  );
}

export default App;
