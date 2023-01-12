export const getVisibleTreeCount = (input) => {
  const treeMatrix = input
    .split("\n")
    .map((line) => line.split("").map((i) => Number.parseInt(i, 10)));

  let visibleCount = 0;

  treeMatrix.forEach((treeLine, lineNumber) => {
    if (lineNumber === 0 || lineNumber === treeMatrix.length - 1) {
      visibleCount += treeLine.length;
      return;
    }

    treeLine.forEach((tree, treeNumber) => {
      if (treeNumber === 0 || treeNumber === treeLine.length - 1) {
        visibleCount += 1;
        return;
      }

      const visible = {
        left: true,
        right: true,
        top: true,
        bottom: true,
      };

      // check from left
      for (let i = 0; i < treeNumber; i += 1) {
        if (treeLine[i] >= tree) {
          visible.left = false;
          break;
        }
      }

      // check from right
      for (let i = treeLine.length - 1; i > treeNumber; i -= 1) {
        if (treeLine[i] >= tree) {
          visible.right = false;
          break;
        }
      }

      // check from top
      for (let i = 0; i < lineNumber; i += 1) {
        if (treeMatrix[i][treeNumber] >= tree) {
          visible.top = false;
          break;
        }
      }

      // check from bottom
      for (let i = treeMatrix.length - 1; i > lineNumber; i -= 1) {
        if (treeMatrix[i][treeNumber] >= tree) {
          visible.bottom = false;
          break;
        }
      }

      if (!visible.right && !visible.left && !visible.top && !visible.bottom) {
        return;
      }
      visibleCount += 1;
    });
  });

  return visibleCount;
};

export const getBestScenicScore = (input) => {
  const treeMatrix = input
    .split("\n")
    .map((line) => line.split("").map((i) => Number.parseInt(i, 10)));

  let bestScore = 0;

  treeMatrix.forEach((treeLine, lineNumber) => {
    if (lineNumber === 0 || lineNumber === treeMatrix.length - 1) {
      return;
    }

    treeLine.forEach((tree, treeNumber) => {
      if (treeNumber === 0 || treeNumber === treeLine.length - 1) {
        return;
      }

      const scores = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      };

      // score from left
      for (let i = treeNumber - 1; i >= 0; i -= 1) {
        scores.left += 1;
        if (treeLine[i] >= tree) {
          break;
        }
      }

      // check from right
      for (let i = treeNumber + 1; i <= treeLine.length - 1; i += 1) {
        scores.right += 1;
        if (treeLine[i] >= tree) {
          break;
        }
      }

      // check from top
      for (let i = lineNumber - 1; i >= 0; i -= 1) {
        scores.top += 1;
        if (treeMatrix[i][treeNumber] >= tree) {
          break;
        }
      }

      // check from bottom
      for (let i = lineNumber + 1; i <= treeMatrix.length - 1; i += 1) {
        scores.bottom += 1;
        if (treeMatrix[i][treeNumber] >= tree) {
          break;
        }
      }

      const totalScore =
        scores.left * scores.right * scores.top * scores.bottom;

      if (totalScore > bestScore) {
        bestScore = totalScore;
      }
    });
  });

  return bestScore;
};
