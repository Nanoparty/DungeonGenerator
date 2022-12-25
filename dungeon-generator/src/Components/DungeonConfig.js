import RandomPlacement from "../GenerationMethods/RandomPlacement";

function DungeonConfig() {
  return (
    <div>
      <form id="generation_config">
        <label for="rows">rows</label>
        <input type="text" id="rows" name="rows" value="50" />

        <label for="cols">cols</label>
        <input type="text" id="cols" name="cols" value="50" />

        <label for="size">grid size</label>
        <input type="text" id="size" name="size" value="8" />

        <label for="method">method</label>
        <select name="method" id="method">
          <option value="random_placement">Random Placement</option>
          <option value="binary_partitioning">Binary Partitioning</option>
        </select>
      </form>
    </div>
  );
}

export default DungeonConfig;
