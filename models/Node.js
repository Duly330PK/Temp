// models/Node.js
export default class Node {
  constructor(id, name, coordinates, status, traffic) {
    this.id = id;
    this.name = name;
    this.coordinates = coordinates || { x: 0, y: 0 };
    this.status = status;
    this.traffic = traffic;
  }

  updateTraffic(delta) {
    this.traffic += delta;
  }
}
