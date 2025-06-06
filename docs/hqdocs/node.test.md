// tests/node.test.js
'use strict';

import Node from '../models/Node.js';

describe('Node', () => {
  it('should create a node with the correct properties', () => {
    const node = new Node(1, 'New York POP', { x: 0, y: 0 }, 'online', 50);
    expect(node.id).toBe(1);
    expect(node.name).toBe('New York POP');
    expect(node.coordinates.x).toBe(0);
    expect(node.coordinates.y).toBe(0);
    expect(node.status).toBe('online');
    expect(node.traffic).toBe(50);
  });

  it('should update traffic dynamically', () => {
    const node = new Node(1, 'New York POP', { x: 0, y: 0 }, 'online', 50);
    node.updateTraffic(20);
    expect(node.traffic).toBe(70);
  });
});
