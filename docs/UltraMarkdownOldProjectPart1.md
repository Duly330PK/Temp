<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NOCProfiTool – Deutschland Vernetzt</title>
  <link rel="icon" href="favicon.ico" type="image/x-icon" />
  
  <!-- Leaflet CSS -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  
  <!-- Leaflet.draw CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css" />
  
  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      font-family: sans-serif;
    }
    #map {
      width: calc(100% - 320px);
      height: 100%;
      float: left;
    }
    /* Dashboard Sidebar */
    #dashboard {
      position: absolute;
      top: 0;
      right: 0;
      width: 320px;
      height: 100%;
      background: #f4f4f4;
      overflow-y: auto;
      border-left: 1px solid #ccc;
    }
    #dashboard-tabs {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      background: #0078d7;
    }
    #dashboard-tabs li {
      flex: 1;
      padding: 10px;
      text-align: center;
      cursor: pointer;
      color: #fff;
    }
    .dashboard-tab {
      padding: 10px;
      display: none;
    }
    .active-tab {
      display: block;
    }
    /* Button Styles */
    #export-btn, #add-core-btn {
      position: absolute;
      top: 10px;
      z-index: 1001;
      padding: 8px 12px;
      background: #0078d7;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    #export-btn { right: 340px; }
    #add-core-btn { right: 480px; }
    #export-btn:hover, #add-core-btn:hover { background: #005a9e; }
  </style>
</head>
<body>
  <button id="export-btn">Export GeoJSON</button>
  <button id="add-core-btn">Add Core Equipment</button>
  <div id="map"></div>
  
  <!-- Dashboard Sidebar -->
  <div id="dashboard">
    <ul id="dashboard-tabs">
      <li data-tab="status" style="background: #005a9e;">Status</li>
      <li data-tab="devices">Geräte</li>
      <li data-tab="segments">Segmente</li>
      <li data-tab="metrics">Metriken</li>
      <li data-tab="faults">Faults</li>
    </ul>
    <div id="tab-status" class="dashboard-tab active-tab">
      <h3>Netzwerkstatus</h3>
      <p>Hier werden alle aktuellen Statusmeldungen angezeigt.</p>
    </div>
    <div id="tab-devices" class="dashboard-tab">
      <h3>Geräte</h3>
      <p>Liste aktueller Netzwerkgeräte (Core, Backbone usw.).</p>
    </div>
    <div id="tab-segments" class="dashboard-tab">
      <h3>Segmente</h3>
      <p>Übersicht der Glasfasersegmente inkl. aller Zuweisungen.</p>
    </div>
    <div id="tab-metrics" class="dashboard-tab">
      <h3>Metriken</h3>
      <p>Aktuelle Leistungsdaten, Durchsatz, Latenz etc.</p>
    </div>
    <div id="tab-faults" class="dashboard-tab">
      <h3>Fault Alerts</h3>
      <div id="faults-list">
        <p>Keine aktuellen Faults.</p>
      </div>
    </div>
  </div>
  
  <!-- Skripte -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js"></script>
  <script src="js/map_sandbox.js"></script>
  
  <!-- Dashboard Tabs Script -->
  <script>
    document.addEventListener("DOMContentLoaded", function(){
      var tabs = document.querySelectorAll("#dashboard-tabs li");
      tabs.forEach(function(tab) {
        tab.addEventListener("click", function(){
          // Hide all tabs
          document.querySelectorAll(".dashboard-tab").forEach(function(content){
            content.style.display = "none";
          });
          // Show the selected tab by its data attribute value
          var selectedTab = this.getAttribute("data-tab");
          document.getElementById("tab-" + selectedTab).style.display = "block";
          
          // Optional: Update tab background colors for the active state
          tabs.forEach(function(t){ t.style.background = "#0078d7"; });
          this.style.background = "#005a9e";
        });
      });
    });
  </script>
</body>
</html>
