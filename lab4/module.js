/**
 * KLASA OPERATION...
 */
class Operation {
  /**
   * @param {int} x blbl
   * @param {int} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  /**
   * SUMA
   * @returns x + y
   */

  sum() {
    return (this.x + this.y);
  }
}

module.exports = Operation;
