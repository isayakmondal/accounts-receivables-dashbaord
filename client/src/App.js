import "./App.css";

import Header from "./components/header/Header";

import EnhancedTable from "./components/grid/table";
import Footer from "./components/footer/footer";

function App() {
  return (
    <div className="App">
      <Header />

      <EnhancedTable />
      <Footer />
    </div>
  );
}

export default App;
