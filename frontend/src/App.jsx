import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import ReleaseList from "./components/ReleaseList";
import ReleaseDetail from "./components/ReleaseDetail";

const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="px-4 pb-12">
        {selectedId ? (
          <ReleaseDetail
            id={selectedId}
            onBack={() => setSelectedId(null)}
            onDeleted={() => setSelectedId(null)}
          />
        ) : (
          <ReleaseList onView={(id) => setSelectedId(id)} />
        )}
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
