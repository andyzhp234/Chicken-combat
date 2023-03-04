function checkLeftBoundaries(xPosition) {
  return xPosition > 0;
}

function checkRightBoundaries(xPosition, right) {
  return xPosition < right;
}

export { checkLeftBoundaries, checkRightBoundaries };
