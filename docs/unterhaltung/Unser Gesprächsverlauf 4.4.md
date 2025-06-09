






You said:
kannst du das ganze komplett projekt umsetzen auf basis von import json
import random
import time
from datetime import datetime
import networkx as nx
import matplotlib.pyplot as plt

# Konstanten
DEFAULT_TICK_FREQUENCY = 1000  # Millisekunden
TRAFFIC_VARIATION_RANGE = (5, 20)  # Mbit/s

# Datenmodelle
class Node:
    def __init__(self, id, name, coordinates, status='online', traffic=0, capacity=10, pop=False):
        self.id = id
        self.name = name
        self.coordinates = coordinates
        self.status = status
        self.traffic = traffic
        self.capacity = capacity
        self.pop = pop
        self.history = []

    def update_traffic(self):
        if self.status in ['offline', 'maintenance']:
            self.traffic = 0
        else:
            delta = random.randint(TRAFFIC_VARIATION_RANGE[0], TRAFFIC_VARIATION_RANGE[1])
            self.traffic += delta

    def log_state(self):
        self.history.append((datetime.now(), self.status, self.traffic))

class Link:
    def __init__(self, source, target, status='online', length=100, latency_base=5, load=0, redundancy=False):
        self.source = source
        self.target = target
        self.status = status
        self.length = length
        self.latency_base = latency_base
        self.load = load
        self.redundancy = redundancy
        self.history = []
        self.latency = latency_base  # initial

    def update_load(self):
        if self.status == 'online':
            self.load += random.randint(TRAFFIC_VARIATION_RANGE[0], TRAFFIC_VARIATION_RANGE[1])
        else:
            self.load = 0

    def recalculate_latency(self):
        # Beispielhaft: Basislatenz plus Lastanteil
        self.latency = self.latency_base + (self.load / 10)

    def log_state(self):
        self.history.append((datetime.now(), self.status, self.load))

# Eventbus für Events
class EventBus:
    def __init__(self):
        self.listeners = {}

    def subscribe(self, event_type, callback):
        if event_type not in self.listeners:
            self.listeners[event_type] = []
        self.listeners[event_type].append(callback)

    def publish(self, event_type, data):
        if event_type in self.listeners:
            for listener in self.listeners[event_type]:
                listener(data)

# Simulation Engine mit Routing
class NetworkSimulation:
    def __init__(self, nodes, links, tick_frequency=DEFAULT_TICK_FREQUENCY):
        self.nodes = {node.id: node for node in nodes}
        self.links = {(link.source, link.target): link for link in links}
        self.tick_frequency = tick_frequency
        self.event_bus = EventBus()
        self.routing_graph = nx.Graph()

    def run(self, ticks=10):
        for tick_count in range(ticks):
            print(f"\n--- Tick {tick_count+1} ---")
            self.update_nodes()
            self.update_links()
            self.build_routing_graph()
            self.check_failures()
            self.event_bus.publish('tick', {})

            # Beispiel: Kürzesten Pfad von Node 1 zu 3 finden
            path = self.find_shortest_path(1, 3)
            if path:
                node_names = [self.nodes[node_id].name for node_id in path]
                print(f"Kürzester Pfad von Node 1 nach Node 3: {' -> '.join(node_names)}")
            else:
                print("Kein Pfad von Node 1 nach Node 3 gefunden!")

            self.dashboard()

            time.sleep(self.tick_frequency / 1000)

    def update_nodes(self):
        for node in self.nodes.values():
            node.update_traffic()
            node.log_state()

    def update_links(self):
        for link in self.links.values():
            link.update_load()
            link.recalculate_latency()
            link.log_state()

    def build_routing_graph(self):
        self.routing_graph.clear()
        for node in self.nodes.values():
            if node.status == 'online':
                self.routing_graph.add_node(node.id)
        for (src, tgt), link in self.links.items():
            if link.status == 'online' and self.nodes[src].status == 'online' and self.nodes[tgt].status == 'online':
                self.routing_graph.add_edge(src, tgt, weight=link.latency)

    def find_shortest_path(self, source_id, target_id):
        try:
            return nx.dijkstra_path(self.routing_graph, source=source_id, target=target_id, weight='weight')
        except nx.NetworkXNoPath:
            return None

    def check_failures(self):
        # Simuliere zufällige Ausfälle bei Knoten
        for node in self.nodes.values():
            if node.status == 'online' and random.random() < 0.01:
                node.status = 'offline'
                print(f"!!! Node {node.name} ist ausgefallen!")
                self.event_bus.publish('node_failure', {'id': node.id})

        # Simuliere zufällige Ausfälle bei Links, wenn ein Endknoten offline ist
        for link in self.links.values():
            if link.status == 'online':
                if random.random() < 0.01 and (self.nodes[link.source].status == 'offline' or self.nodes[link.target].status == 'offline'):
                    link.status = 'failed'
                    print(f"!!! Link {link.source} -> {link.target} ist ausgefallen!")
                    self.event_bus.publish('link_failure', {'source': link.source, 'target': link.target})

    def dashboard(self):
        print("Dashboard:")
        for node in self.nodes.values():
            print(f"  Node {node.name} (ID {node.id}): Status={node.status}, Traffic={node.traffic} Mbit/s")
        for link in self.links.values():
            print(f"  Link {link.source} -> {link.target}: Status={link.status}, Load={link.load} Mbit/s, Latency={link.latency:.2f} ms")

# Visualization (optional)
def render_network(nodes, links):
    G = nx.Graph()
    for node in nodes.values():
        G.add_node(node.id, pos=node.coordinates)
    for link in links.values():
        if link.status == 'online':
            G.add_edge(link.source, link.target)
    pos = nx.get_node_attributes(G, 'pos')
    nx.draw(G, pos, with_labels=True, node_color='lightblue', edge_color='gray', node_size=500)
    plt.show()

# Main-Funktion zum Starten
def main():
    # Beispielknoten
    nodes = [
        Node(id=1, name="Node A", coordinates=(0, 0)),
        Node(id=2, name="Node B", coordinates=(1, 1)),
        Node(id=3, name="Node C", coordinates=(2, 0)),
        Node(id=4, name="Node D", coordinates=(3, 1)),
        Node(id=5, name="Node E", coordinates=(4, 0)),
    ]

    # Beispielverbindungen
    links = [
        Link(source=1, target=2, length=10, latency_base=5),
        Link(source=2, target=3, length=10, latency_base=5),
        Link(source=1, target=3, length=20, latency_base=10),
        Link(source=3, target=4, length=10, latency_base=5),
        Link(source=4, target=5, length=10, latency_base=5),
        Link(source=3, target=5, length=15, latency_base=8),
    ]

    sim = NetworkSimulation(nodes, links, tick_frequency=1000)

    # Event-Abos
    sim.event_bus.subscribe('tick', lambda data: print("Tick event"))
    sim.event_bus.subscribe('node_failure', lambda data: print(f"Node mit ID {data['id']} ist ausgefallen"))
    sim.event_bus.subscribe('link_failure', lambda data: print(f"Link {data['source']}->{data['target']} ist ausgefallen"))

    sim.run(ticks=15)

    # Optional: Netzwerktopologie anzeigen
    render_network(sim.nodes, sim.links)

if __name__ == "__main__":
    main()


ChatGPT said:
Klar, ich fasse dir das komplette Python-Projekt basierend auf deinem Codewunsch zusammen und baue es so aus, dass es eine vollständige Network Simulation mit realistischem Traffic, Routing, Eventbus, Fehler-Simulation, Dashboard-Ausgabe und optionaler Visualisierung enthält.

python
Copy
Edit
import json
import random
import time
from datetime import datetime
import networkx as nx
import matplotlib.pyplot as plt

# Konstanten
DEFAULT_TICK_FREQUENCY = 1000  # Millisekunden
TRAFFIC_VARIATION_RANGE = (5, 20)  # Mbit/s

# Datenmodelle
class Node:
    def __init__(self, id, name, coordinates, status='online', traffic=0, capacity=10, pop=False):
        self.id = id
        self.name = name
        self.coordinates = coordinates
        self.status = status
        self.traffic = traffic
        self.capacity = capacity
        self.pop = pop
        self.history = []

    def update_traffic(self):
        if self.status in ['offline', 'maintenance']:
            self.traffic = 0
        else:
            delta = random.randint(*TRAFFIC_VARIATION_RANGE)
            self.traffic += delta

    def log_state(self):
        self.history.append((datetime.now(), self.status, self.traffic))

class Link:
    def __init__(self, source, target, status='online', length=100, latency_base=5, load=0, redundancy=False):
        self.source = source
        self.target = target
        self.status = status
        self.length = length
        self.latency_base = latency_base
        self.load = load
        self.redundancy = redundancy
        self.history = []
        self.latency = latency_base  # initial

    def update_load(self):
        if self.status == 'online':
            self.load += random.randint(*TRAFFIC_VARIATION_RANGE)
        else:
            self.load = 0

    def recalculate_latency(self):
        self.latency = self.latency_base + (self.load / 10)

    def log_state(self):
        self.history.append((datetime.now(), self.status, self.load))

# Eventbus für Events
class EventBus:
    def __init__(self):
        self.listeners = {}

    def subscribe(self, event_type, callback):
        if event_type not in self.listeners:
            self.listeners[event_type] = []
        self.listeners[event_type].append(callback)

    def publish(self, event_type, data):
        if event_type in self.listeners:
            for listener in self.listeners[event_type]:
                listener(data)

# Simulation Engine mit Routing
class NetworkSimulation:
    def __init__(self, nodes, links, tick_frequency=DEFAULT_TICK_FREQUENCY):
        self.nodes = {node.id: node for node in nodes}
        self.links = {(link.source, link.target): link for link in links}
        self.tick_frequency = tick_frequency
        self.event_bus = EventBus()
        self.routing_graph = nx.Graph()

    def run(self, ticks=10):
        for tick_count in range(ticks):
            print(f"\n--- Tick {tick_count+1} ---")
            self.update_nodes()
            self.update_links()
            self.build_routing_graph()
            self.check_failures()
            self.event_bus.publish('tick', {})

            # Beispiel: Kürzesten Pfad von Node 1 zu 3 finden
            path = self.find_shortest_path(1, 3)
            if path:
                node_names = [self.nodes[node_id].name for node_id in path]
                print(f"Kürzester Pfad von Node 1 nach Node 3: {' -> '.join(node_names)}")
            else:
                print("Kein Pfad von Node 1 nach Node 3 gefunden!")

            self.dashboard()

            time.sleep(self.tick_frequency / 1000)

    def update_nodes(self):
        for node in self.nodes.values():
            node.update_traffic()
            node.log_state()

    def update_links(self):
        for link in self.links.values():
            link.update_load()
            link.recalculate_latency()
            link.log_state()

    def build_routing_graph(self):
        self.routing_graph.clear()
        for node in self.nodes.values():
            if node.status == 'online':
                self.routing_graph.add_node(node.id)
        for (src, tgt), link in self.links.items():
            if link.status == 'online' and self.nodes[src].status == 'online' and self.nodes[tgt].status == 'online':
                self.routing_graph.add_edge(src, tgt, weight=link.latency)

    def find_shortest_path(self, source_id, target_id):
        try:
            return nx.dijkstra_path(self.routing_graph, source=source_id, target=target_id, weight='weight')
        except nx.NetworkXNoPath:
            return None

    def check_failures(self):
        # Zufällige Knoten-Ausfälle
        for node in self.nodes.values():
            if node.status == 'online' and random.random() < 0.01:
                node.status = 'offline'
                print(f"!!! Node {node.name} ist ausgefallen!")
                self.event_bus.publish('node_failure', {'id': node.id})

        # Zufällige Link-Ausfälle, wenn ein Endknoten offline ist
        for link in self.links.values():
            if link.status == 'online':
                if random.random() < 0.01 and (self.nodes[link.source].status == 'offline' or self.nodes[link.target].status == 'offline'):
                    link.status = 'failed'
                    print(f"!!! Link {link.source} -> {link.target} ist ausgefallen!")
                    self.event_bus.publish('link_failure', {'source': link.source, 'target': link.target})

    def dashboard(self):
        print("Dashboard:")
        for node in self.nodes.values():
            print(f"  Node {node.name} (ID {node.id}): Status={node.status}, Traffic={node.traffic} Mbit/s")
        for link in self.links.values():
            print(f"  Link {link.source} -> {link.target}: Status={link.status}, Load={link.load} Mbit/s, Latency={link.latency:.2f} ms")

# Visualization (optional)
def render_network(nodes, links):
    G = nx.Graph()
    for node in nodes.values():
        G.add_node(node.id, pos=node.coordinates)
    for link in links.values():
        if link.status == 'online':
            G.add_edge(link.source, link.target)
    pos = nx.get_node_attributes(G, 'pos')
    nx.draw(G, pos, with_labels=True, node_color='lightblue', edge_color='gray', node_size=500)
    plt.show()

# Main-Funktion
def main():
    nodes = [
        Node(id=1, name="Node A", coordinates=(0, 0)),
        Node(id=2, name="Node B", coordinates=(1, 1)),
        Node(id=3, name="Node C", coordinates=(2, 0)),
        Node(id=4, name="Node D", coordinates=(3, 1)),
        Node(id=5, name="Node E", coordinates=(4, 0)),
    ]

    links = [
        Link(source=1, target=2, length=10, latency_base=5),
        Link(source=2, target=3, length=10, latency_base=5),
        Link(source=1, target=3, length=20, latency_base=10),
        Link(source=3, target=4, length=10, latency_base=5),
        Link(source=4, target=5, length=10, latency_base=5),
        Link(source=3, target=5, length=15, latency_base=8),
    ]

    sim = NetworkSimulation(nodes, links, tick_frequency=1000)

    # Event-Abos
    sim.event_bus.subscribe('tick', lambda data: print("Tick event"))
    sim.event_bus.subscribe('node_failure', lambda data: print(f"Node mit ID {data['id']} ist ausgefallen"))
    sim.event_bus.subscribe('link_failure', lambda data: print(f"Link {data['source']}->{data['target']} ist ausgefallen"))

    sim.run(ticks=15)

    # Optional: Visualisiere die Netzwerktopologie
    render_network(sim.nodes, sim.links)

if __name__ == "__main__":
    main()
Features des Projekts:

Nodes mit Traffic-Simulation (Status: online/offline/maintenance)

Links mit Load, Latenz, Status und dynamischer Aktualisierung

Routing über NetworkX Dijkstra-Algorithmus basierend auf aktueller Latenz

Zufällige Ausfälle von Nodes und Links mit Event-Benachrichtigungen

Dashboard-Ausgabe im Terminal

Eventbus für extensible Events

Optionale Visualisierung der Netzwerkstruktur mit Matplotlib und NetworkX

Simulationsschleife mit konfigurierbarer Tickrate und Tick-Anzahl

Wenn du möchtest, kann ich das Ganze auch modularer, mit Web-UI (z.B. React + D3) oder mit speziellem Fokus auf mehr Realismus weiter ausbauen.

Möchtest du so noch was angepasst oder erweitert?







You said:
könntest du es komplett für mich fertig stellen, wichtig ist das ich über die index.html das ganze aufrufe, mit sehr guter durchschaltbarer oder auch logischer und sinnvoller visualisierung. nenne mir dann die datei/ordnerstruktur die ich aufbauen soll und welcher code wo rein kommt, nicht stück für stück hau das komplette projekt fertig raus mit beispieldaten


ChatGPT said:
Alles klar! Ich baue dir ein komplettes kleines Webprojekt für die Network Simulation auf, mit

Backend in Python (API-Server mit FastAPI)

Frontend mit HTML/JS (index.html) für Visualisierung und Steuerung

Realistische Simulation, live Updates über WebSocket

Schöne, durchschaltbare Visualisierung mit D3.js (Knoten, Links, Status, Traffic, Routing)

Struktur und alle Dateien, die du brauchst

1. Projektübersicht & Ordnerstruktur
bash
Copy
Edit
network-simulation/
│
├── backend/
│   ├── main.py               # Python FastAPI Backend mit Simulation und API
│   ├── requirements.txt      # Python Dependencies
│
├── frontend/
│   ├── index.html           # Web UI (HTML + JS + D3)
│   ├── style.css            # CSS Styles
│
└── README.md
2. Backend: backend/main.py
python
Copy
Edit
import random
import asyncio
from datetime import datetime
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import networkx as nx
import uvicorn

app = FastAPI()

# Static frontend mount (optional, falls du lokal servieren willst)
app.mount("/", StaticFiles(directory="../frontend", html=True), name="frontend")

# --- Datenmodelle ---
class Node:
    def __init__(self, id, name, x, y, status="online"):
        self.id = id
        self.name = name
        self.x = x
        self.y = y
        self.status = status
        self.traffic = 0
        self.history = []

    def update_traffic(self):
        if self.status != "online":
            self.traffic = 0
        else:
            self.traffic = random.randint(5, 20)
        self.history.append((datetime.now().isoformat(), self.status, self.traffic))

class Link:
    def __init__(self, source, target, latency_base=5):
        self.source = source
        self.target = target
        self.status = "online"
        self.load = 0
        self.latency_base = latency_base
        self.latency = latency_base
        self.history = []

    def update_load(self):
        if self.status == "online":
            self.load = random.randint(5, 20)
        else:
            self.load = 0
        self.latency = self.latency_base + self.load / 10
        self.history.append((datetime.now().isoformat(), self.status, self.load))


# --- Simulation State ---
nodes = {
    1: Node(1, "Node A", 100, 200),
    2: Node(2, "Node B", 300, 100),
    3: Node(3, "Node C", 500, 200),
    4: Node(4, "Node D", 700, 100),
    5: Node(5, "Node E", 900, 200),
}

links = [
    Link(1, 2),
    Link(2, 3),
    Link(1, 3),
    Link(3, 4),
    Link(4, 5),
    Link(3, 5),
]

# Build NetworkX graph for routing
def build_graph():
    G = nx.Graph()
    for node in nodes.values():
        if node.status == "online":
            G.add_node(node.id)
    for link in links:
        if (
            link.status == "online"
            and nodes[link.source].status == "online"
            and nodes[link.target].status == "online"
        ):
            G.add_edge(link.source, link.target, weight=link.latency)
    return G

def find_shortest_path(source, target):
    G = build_graph()
    try:
        path = nx.dijkstra_path(G, source=source, target=target, weight="weight")
        return path
    except nx.NetworkXNoPath:
        return []

# WebSocket manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)

manager = ConnectionManager()

# --- Simulation Loop ---
async def simulation_loop():
    while True:
        # Update nodes and links
        for node in nodes.values():
            node.update_traffic()

        for link in links:
            link.update_load()

        # Random failures simulation (low chance)
        for node in nodes.values():
            if node.status == "online" and random.random() < 0.01:
                node.status = "offline"
        for link in links:
            if link.status == "online" and random.random() < 0.01:
                if (
                    nodes[link.source].status == "offline"
                    or nodes[link.target].status == "offline"
                ):
                    link.status = "failed"

        # Prepare state for frontend
        node_data = [
            {
                "id": n.id,
                "name": n.name,
                "x": n.x,
                "y": n.y,
                "status": n.status,
                "traffic": n.traffic,
            }
            for n in nodes.values()
        ]
        link_data = [
            {
                "source": l.source,
                "target": l.target,
                "status": l.status,
                "load": l.load,
                "latency": round(l.latency, 2),
            }
            for l in links
        ]

        # Example path from 1 to 5
        path = find_shortest_path(1, 5)

        update = {
            "type": "update",
            "nodes": node_data,
            "links": link_data,
            "path": path,
            "timestamp": datetime.now().isoformat(),
        }

        await manager.broadcast(update)
        await asyncio.sleep(1)  # 1s Tick

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(simulation_loop())

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()  # Just keep alive or listen to client commands later
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.get("/")
async def get():
    with open("../frontend/index.html") as f:
        return HTMLResponse(f.read())

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
3. Frontend: frontend/index.html
html
Copy
Edit
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>NetSim - Network Simulation Visualisierung</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; overflow: hidden; }
    svg { width: 100vw; height: 100vh; background: #111; }
    .node circle { stroke: #fff; stroke-width: 2px; }
    .node.online circle { fill: #4caf50; }
    .node.offline circle { fill: #f44336; }
    .link { stroke: #bbb; stroke-width: 2px; }
    .link.failed { stroke: #f44336; stroke-dasharray: 5 5; }
    .path { stroke: #00ffff; stroke-width: 4px; }
    text { fill: #eee; font-size: 12px; pointer-events: none; }
    #info { position: absolute; top: 5px; left: 5px; color: #eee; background: #222; padding: 8px; border-radius: 4px; }
  </style>
</head>
<body>
  <div id="info">NetSim - Lade Daten...</div>
  <svg></svg>

  <script src="https://d3js.org/d3.v7.min.js"></script>
  <script>
    const svg = d3.select("svg");
    const width = window.innerWidth;
    const height = window.innerHeight;

    const info = document.getElementById("info");

    let nodes = [];
    let links = [];
    let path = [];

    // Scales for traffic/load visualization
    const trafficScale = d3.scaleLinear().domain([0, 20]).range([10, 30]);

    // Create groups
    const linkGroup = svg.append("g").attr("class", "links");
    const pathGroup = svg.append("g").attr("class", "pathgroup");
    const nodeGroup = svg.append("g").attr("class", "nodes");
    const labelGroup = svg.append("g").attr("class", "labels");

    // WebSocket setup
    const ws = new WebSocket(`ws://${window.location.host}/ws`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "update") {
        nodes = data.nodes;
        links = data.links;
        path = data.path;

        info.innerText = `NetSim - Letztes Update: ${new Date(data.timestamp).toLocaleTimeString()}`;

        updateVisualization();
      }
    };

    function updateVisualization() {
      // Update Links
      const linkSelection = linkGroup.selectAll("line").data(links, d => d.source + "-" + d.target);
      linkSelection.exit().remove();
      const linkEnter = linkSelection.enter().append("line").attr("class", "link");
      linkSelection.merge(linkEnter)
        .attr("x1", d => getNodeById(d.source).x)
        .attr("y1", d => getNodeById(d.source).y)
        .attr("x2", d => getNodeById(d.target).x)
        .attr("y2", d => getNodeById(d.target).y)
        .attr("stroke-width", d => Math.max(2, d.load / 5))
        .attr("stroke", d => d.status === "failed" ? "#f44336" : "#bbb")
        .classed("failed", d => d.status === "failed");

      // Update Path Highlight
      pathGroup.selectAll("line").remove();
      for (let i = 0; i < path.length - 1; i++) {
        let src = getNodeById(path[i]);
        let tgt = getNodeById(path[i+1]);
        pathGroup.append("line")
          .attr("class", "path")
          .attr("x1", src.x)
          .attr("y1", src.y)
          .attr("x2", tgt.x)
          .attr("y2", tgt.y);
      }

      // Update Nodes
      const nodeSelection = nodeGroup.selectAll("g.node").data(nodes, d => d.id);
      nodeSelection.exit().remove();
      const nodeEnter = nodeSelection.enter().append("g").attr("class", "node");
      nodeEnter.append("circle");
      nodeEnter.append("text")
        .attr("dy", -15)
        .attr("text-anchor", "middle");

      nodeSelection.merge(nodeEnter)
        .attr("transform", d => `translate(${d.x},${d.y})`)
        .attr("class", d => `node ${d.status}`)
        .select("circle")
        .attr("r", d => trafficScale(d.traffic))
        .attr("fill", d => d.status === "online" ? "#4caf50" : "#f44336");

      nodeSelection.merge(nodeEnter)
        .select("text")
        .text(d => d.name + " (" + d.traffic + " Mbps)");
    }

    function getNodeById(id) {
      return nodes.find(n => n.id === id);
    }
  </script>
</body>
</html>
4. Frontend Styles (optional) frontend/style.css
css
Copy
Edit
/* Optional: Auslagern der Styles aus index.html */
5. Python Dependencies backend/requirements.txt
css
Copy
Edit
fastapi
uvicorn[standard]
networkx
6. So startest du das Projekt
Python-Umgebung vorbereiten

bash
Copy
Edit
cd network-simulation/backend
python3 -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
Server starten

bash
Copy
Edit
uvicorn main:app --reload
Frontend öffnen

Öffne im Browser: http://localhost:8000

Simulation läuft live, Daten aktualisieren sich jede Sekunde

Zusammenfassung
Backend: FastAPI + NetworkX, Simulation mit Status + Traffic + Routing

Frontend: HTML + D3.js, Echtzeit-Visualisierung über WebSocket, Knoten + Links + Pfad hervorgehoben

Volle Integration, du öffnest localhost:8000, siehst sofort deine Netzwerk-Simulation live

Wenn du möchtest, kann ich das auch noch erweitern mit:

Steuerungspanel (Start/Stop, Knoten hinzufügen, Ausfälle manuell triggern)

Logging in Dateien

Erweiterter UI/UX mit React oder Vue

Sag Bescheid, wenn du noch Wünsche hast!







You said:
erweitere es um alles sinnvolle was dir einfällt, es soll ultra realistisch und umfangreich sein, mach es komplett fertig,  gib mir die gesammten codes der files mit filenames und struktur etc.


ChatGPT said:
Cool, ich mache dir das Projekt jetzt richtig umfangreich, realistisch, interaktiv und professionell fertig.
Das heißt:

Backend:

FastAPI API + WebSocket für Live-Updates

Vollständige Simulation mit:

Node Status (online, offline, maintenance)

Traffic, Kapazität, Auslastung

Link Status, Load, Latency, Redundanz

Fehler-Simulation (mit Wiederherstellung)

Logging von Events

API zum Starten/Stoppen der Simulation

API zum manuellen Triggern von Fehlern (Nodes/Links)

API zum Abfragen des Netzwerkstatus (für REST-Zugriff)

Persistenz (einfach in-memory, Logs exportierbar)

Background-Task gesteuerte Simulation

Frontend:

React (ohne Build-Tools — nur CDN)

Übersichtliche Steuerung (Buttons zum Start/Stop, Fehler provozieren)

Übersicht mit Live-Status (Nodes, Links, Traffic, Status, Kapazität)

Grafische Visualisierung mit D3.js:

Nodes als Kreise, Größe & Farbe nach Traffic & Status

Links mit Farbe & Breite nach Status & Load

Routing-Pfad farblich hervorgehoben

Event-Log Anzeige (Events aus Backend in Echtzeit)

Responsive Design

Projektstruktur
css
Copy
Edit
network-simulation/
│
├── backend/
│   ├── main.py
│   ├── simulation.py
│   ├── models.py
│   ├── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│
└── README.md
1. Backend Code
backend/models.py
python
Copy
Edit
from datetime import datetime
from typing import List, Tuple

class Node:
    def __init__(self, id: int, name: str, x: int, y: int, capacity: int = 100):
        self.id = id
        self.name = name
        self.x = x
        self.y = y
        self.status = "online"  # online, offline, maintenance
        self.traffic = 0
        self.capacity = capacity
        self.history: List[Tuple[str, str, int]] = []  # (timestamp, status, traffic)

    def update_traffic(self):
        if self.status in ['offline', 'maintenance']:
            self.traffic = 0
        else:
            # Simuliere Traffic zwischen 10 und Kapazität
            import random
            self.traffic = random.randint(10, self.capacity)
        self.history.append((datetime.now().isoformat(), self.status, self.traffic))

    def set_status(self, status: str):
        self.status = status
        if status != 'online':
            self.traffic = 0
        self.history.append((datetime.now().isoformat(), self.status, self.traffic))


class Link:
    def __init__(self, source: int, target: int, length: int = 100, latency_base: int = 5):
        self.source = source
        self.target = target
        self.status = "online"  # online, failed, maintenance
        self.length = length
        self.latency_base = latency_base
        self.load = 0
        self.latency = latency_base
        self.redundancy = False
        self.history: List[Tuple[str, str, int]] = []  # (timestamp, status, load)

    def update_load(self):
        import random
        if self.status == "online":
            self.load = random.randint(5, 50)
        else:
            self.load = 0
        self.latency = self.latency_base + (self.load / 10)
        self.history.append((datetime.now().isoformat(), self.status, self.load))

    def set_status(self, status: str):
        self.status = status
        if status != 'online':
            self.load = 0
        self.history.append((datetime.now().isoformat(), self.status, self.load))
backend/simulation.py
python
Copy
Edit
import random
import asyncio
from datetime import datetime
import networkx as nx
from models import Node, Link
