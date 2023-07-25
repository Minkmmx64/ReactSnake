const low = require("../statis/low.mp3");
const high = require("../statis/high.mp3");
const die = require("../statis/die.mp3");

export const Sound = {
  low: new Audio(low),
  high: new Audio(high),
  die: new Audio(die),
}