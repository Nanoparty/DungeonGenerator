import logo from "./logo.svg";
import "./App.css";

function App() {
  //draw();
  return (
    <div className="App">
      <header className="App-header">
        <p>Dungeon Generator</p>
        {draw()}
      </header>
    </div>
  );
}

function draw() {
  const canvas = document.getElementById("root");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  }
}

export default App;
