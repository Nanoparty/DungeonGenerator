import RandomPlacement from "../GenerationMethods/RandomPlacement";
import DungeonConfig from "./DungeonConfig";

function Home() {
  return (
    <header className="App-header">
      <p>Dungeon Generator</p>
      {/* <DungeonConfig /> */}
      <canvas
        id="myCanvas"
        width="100px"
        height="100px"
        style={{
          border: "1px solid #d3d3d3",
          //backgroundColor: "aqua",
          margin: "auto",
        }}
      >
        Your browser does not support the HTML canvas tag.
      </canvas>
      <button
        onClick={() => {
          RandomPlacement(50, 50, 8);
        }}
      >
        Generate
      </button>
    </header>
  );
}

export default Home;
