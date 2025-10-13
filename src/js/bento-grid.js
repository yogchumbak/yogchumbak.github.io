/**
 * =================================================================
 * DYNAMIC BENTO GRID - HYBRID ALGORITHM (v3 - Curated & Stable)
 * =================================================================
 * This script uses a hybrid approach:
 * 1. CURATED LAYOUTS: Applies beautiful, pre-designed layouts for specific item counts.
 * 2. ALGORITHMIC FALLBACK: Uses a robust matrix-packing algorithm for any other
 *    number of items, ensuring a gap-free layout in all cases.
 */

document.addEventListener('DOMContentLoaded', () => {
  const bentoGrid = document.querySelector('.bento-grid');
  if (bentoGrid) {
    applyBentoLayout(bentoGrid);
  }
});

// =================================================================
// CURATED LAYOUTS
// =================================================================
// Each pattern is an array of {col, row} spans for a specific item count.
const LAYOUT_PATTERNS = {
  8: [
    { col: 2, row: 1 }, { col: 2, row: 1 }, { col: 2, row: 1 }, // Row 1
    { col: 4, row: 2 }, { col: 2, row: 2 },                   // Row 2
    { col: 2, row: 1 }, { col: 2, row: 1 }, { col: 2, row: 1 }, // Row 3
  ],
  // Add other curated layouts here (e.g., for 5, 6, 7, 9, 10 items)
};


function applyBentoLayout(grid) {
  const items = Array.from(grid.querySelectorAll('.gallery-item'));
  const itemCount = items.length;
  if (itemCount === 0) return;

  // Reset existing styles first
  items.forEach(item => {
    item.style.gridColumn = '';
    item.style.gridRow = '';
  });

  const curatedPattern = LAYOUT_PATTERNS[itemCount];

  if (curatedPattern) {
    // --- 1. APPLY CURATED LAYOUT ---
    applyCuratedPattern(items, curatedPattern);
    console.log(`✅ Curated bento layout applied for ${itemCount} items`);
  } else {
    // --- 2. USE ALGORITHMIC FALLBACK ---
    applyAlgorithmicFallback(items);
    console.log(`✅ Algorithmic fallback applied for ${itemCount} items`);
  }
}

function applyCuratedPattern(items, pattern) {
  items.forEach((item, index) => {
    const { col, row } = pattern[index];
    item.style.gridColumn = `span ${col}`;
    item.style.gridRow = `span ${row}`;
  });
}


// =================================================================
// ALGORITHMIC FALLBACK (MATRIX PACKER)
// =================================================================

function applyAlgorithmicFallback(items) {
  const GRID_COLS = 6;
  const TILE_PATTERN = [
    { col: 2, row: 2 }, { col: 2, row: 1 }, { col: 2, row: 1 },
    { col: 3, row: 2 }, { col: 3, row: 1 },
  ];

  const estimatedRows = Math.ceil(items.length / 2) * 2;
  let gridMatrix = Array.from({ length: estimatedRows }, () => Array(GRID_COLS).fill(0));
  let patternIndex = 0;

  for (const item of items) {
    let cell = findNextOpenCell(gridMatrix);
    while (!cell) {
      gridMatrix.push(Array(GRID_COLS).fill(0));
      cell = findNextOpenCell(gridMatrix);
    }

    let placed = false;
    for (let i = 0; i < TILE_PATTERN.length; i++) {
      const currentPattern = TILE_PATTERN[(patternIndex + i) % TILE_PATTERN.length];
      if (canPlace(gridMatrix, cell.row, cell.col, currentPattern.col, currentPattern.row)) {
        placeItem(item, gridMatrix, cell.row, cell.col, currentPattern.col, currentPattern.row);
        placed = true;
        break;
      }
    }

    if (!placed) {
      placeItem(item, gridMatrix, cell.row, cell.col, 1, 1);
    }
    patternIndex++;
  }

  const totalRows = gridMatrix.findIndex(row => row.every(cell => cell === 0)) || gridMatrix.length;
  grid.style.gridTemplateRows = `repeat(${totalRows}, auto)`;
}

function findNextOpenCell(matrix) {
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      if (matrix[r][c] === 0) return { row: r, col: c };
    }
  }
  return null;
}

function canPlace(matrix, r, c, colSpan, rowSpan) {
  if (r + rowSpan > matrix.length || c + colSpan > matrix[0].length) return false;
  for (let i = r; i < r + rowSpan; i++) {
    for (let j = c; j < c + colSpan; j++) {
      if (matrix[i][j] === 1) return false;
    }
  }
  return true;
}

function placeItem(item, matrix, r, c, colSpan, rowSpan) {
  item.style.gridColumn = `${c + 1} / span ${colSpan}`;
  item.style.gridRow = `${r + 1} / span ${rowSpan}`;
  for (let i = r; i < r + rowSpan; i++) {
    for (let j = c; j < c + colSpan; j++) {
      matrix[i][j] = 1;
    }
  }
}