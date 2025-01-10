function distributeValues(gridRows, gridCols, totalValues) {
    // Calculate total number of grid cells
    const totalCells = gridRows * gridCols;

    // Calculate the base values per cell
    const baseValue = Math.floor(totalValues / totalCells);

    // Calculate remaining values to be distributed
    const remainder = totalValues % totalCells;

    // Create a grid and distribute values
    const grid = [];
    let remaining = remainder;

    for (let i = 0; i < gridRows; i++) {
        const row = [];
        for (let j = 0; j < gridCols; j++) {
            // Add base value to the cell
            let value = baseValue;

            // Distribute the remaining values
            if (remaining > 0) {
                value += 1;
                remaining -= 1;
            }

            row.push(value);
        }
        grid.push(row);
    }

    return grid;
}

export default distributeValues;