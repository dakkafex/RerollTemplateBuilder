import { useState } from "react";
import { Output } from "./components/Output";
import Menu from "./components/Menu";
import { Backgrounds } from "./components/Backgrounds";
import { Route, Routes } from "react-router-dom";
import { Classes } from "./components/Classes";

export default function App() {
  const [outputJson, setOutputJson] = useState({});

  return (
    <div className="flex h-screen w-screen bg-gray-50 text-gray-900">
      {/* Left Vertical Icon Menu */}
      <Menu />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto bg-white">
        <h1 className="text-2xl font-bold mb-4">Main Content Area</h1>
        <p>This is where your main content goes.</p>
        <Routes>
          <Route path="/background" element={<Backgrounds onSubmit={(data) => setOutputJson(data)} />} />
          <Route path="/classes" element={<Classes onSubmit={(data) => setOutputJson(data)} />} />
        </Routes>

      </main>

      {/* Code/Output Panel */}
      <aside className="w-1/3 bg-gray-100 p-4 overflow-auto border-l border-gray-300">
        <h2 className="text-lg font-semibold mb-2">Json Output</h2>
        <Routes>
          <Route path="/*" element={<Output json={outputJson} />} />
        </Routes>


      </aside>
    </div>
  );
}


