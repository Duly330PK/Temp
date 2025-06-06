Comprehensive Ultra-Detailed Roadmap (English)
Phase 1: Foundational Infrastructure & Backend Systems (Q1 2025)
Local Tile Server Integration (Offline Mode):

Replace CDN-based tiles with a local tile server (using MBTiles and Docker-based solutions like TileServer GL).

Ensure full offline availability.

Modular Dashboard Setup:

Create dynamic dashboard panels: NOC Dashboard, Customers Dashboard, and Segments Dashboard.

Dynamically generate containers when missing and populate them with sample data and refresh buttons.

Persistent Data Storage:

Implement a persistence mechanism (GeoJSON saved in LocalStorage) to store drawn elements, device statuses, and configurations.

Phase 2: Fiber Segmentation & Equipment Assignment (Q1–Q2 2025)
FiberSegments Module:

Use Turf.js to calculate realistic routes for fiber cables and split them into 50‑meter segments.

Generate detailed segmentation data to mimic actual fiber layout.

Equipment Assignment:

Single Assignment: If a segment has no assigned equipment, display a form to choose the cable type and status (“online” or “störung”).

Mass Assignment: Enable shift-based range selection to assign equipment and status to multiple segments simultaneously.

Technical Details: Support various cable types (e.g., G.652.D Backbone, G.654.E Backbone, etc.) with comprehensive specifications (fiber count, attenuation, bend radius, application).

Visual Indicators:

Default colors: red for “online” segments; grey with dashed lines for “störung.”

Blue highlights for segments during mass assignment.

Persistence:

Ensure equipment assignments and statuses are saved and reloaded with GeoJSON.

Phase 3: Core Equipment Integration (Q2 2025)
Core Equipment Mode:

Activate a dedicated mode (via an “Add Core Equipment” button) for placing core network devices.

Supported Devices:

DWDM Transponder (ADVA FSP 3000)

ROADM (FlexGrid) & Mux/Demux

Juniper PTX10003 (IP/MPLS Core)

OTN-Termination

Status Assignment for Core Devices:

Each device can be set to “Online” or “Fail.”

Visual markers: green for “Online,” red for “Fail.”

Device Details & Persistence:

Show technical descriptions in popups.

Save core device settings with location, type, and status.

Phase 4: Virtual IP Networks, CGNAT & Live Data Simulation (Q2–Q3 2025)
Simulated IP Network Infrastructure:

Build a virtual IP network environment with realistic IP addressing and routing (OSPF, BGP).

Include both static and dynamic routing tables.

CGNAT Integration:

Simulate Carrier-Grade NAT scenarios (e.g., one public IP shared by 32–64 end users).

Reflect load and bandwidth impact.

Live Data Feeds:

Integrate simulated live metrics: throughput, latency, packet loss.

Dynamically update network statuses (transitioning between states based on load/faults).

Dynamic Status Updating:

Automatically update components between “Online,” “Offline,” “Fail,” or “Störung” states based on simulation data.

Phase 5: Advanced Performance, Capacity & Fault Management (Q3 2025)
Capacity Planning & End Customer Allocation:

Model PON architectures (GPON, XGS-PON, Active Ethernet) with realistic splitter ratios (1:32, 1:64).

Calculate theoretical versus effective bandwidth (e.g., 1 Gbit/s downstream, 500 Mbit/s upstream).

Fault Simulation & Alerting:

Develop a fault simulation engine to randomly trigger disturbances (outages, power failures, performance degradation).

Log fault details (fault type and severity).

Dashboard Fault Reporting:

Provide a “Faults” tab that lists current faults with detailed information and remediation suggestions.

Visual and Analytical Feedback:

Real-time visual updates (marker color, line style) to reflect faults.

Simulate throughput losses and increased latency.

Phase 6: Dashboard Optimization & Global Network Management (Q3–Q4 2025)
Comprehensive NOC Dashboard:

Develop a full-featured sidebar dashboard with tabs for Status, Devices, Segments, Metrics, and Faults.

Aggregate real-time network data and alerts.

Global Device Management:

Implement centralized functions (e.g., highlightDevice(id)) to keep maps, device lists, and detail panels in sync.

Synchronize updates across all network elements.

Formatted Detail Views:

Utilize functions like showDetailsFormatted() to display structured details with color-coded status indicators.

Enhanced User Interaction:

Improve searching, filtering, and manual refresh options.

Phase 7: System Testing, Optimization & Deployment (Q4 2025 – Q1 2026)
Comprehensive Simulation Testing:

Execute extensive tests for the IP network, CGNAT, live data, and fault simulation under various load conditions.

Stress-test the system for nationwide-scale scenarios.

Performance Optimization:

Refine real-time update algorithms, fault detection, and capacity planning.

Optimize dashboard performance and data persistence.

Deployment & Documentation:

Prepare the final release with complete documentation, training materials, and a demo environment (potentially containerized with Docker).

Post-Deployment Monitoring:

Set up continuous monitoring to capture performance metrics and fault statistics during live scenarios.

Additional Future Enhancements (Beyond Q1 2026)
Expanded Geo-Data Integration:

Integrate detailed vector datasets (buildings, addresses) via GeoJSON for urban simulations.

Dedicated Customer Network Simulation:

Model high-density end-customer scenarios and premium service tiers.

Advanced Device Analytics:

Enhance network device data with firmware versions, interface statistics, energy consumption, and live throughput graphs.

Cloud Integration & API Connectivity:

Develop an API layer to ingest live network data from monitoring systems for a hybrid live/simulated environment.

Scalability Enhancements:

Adapt the system to simulate nationwide networks with inter-region routing and resilience strategies.