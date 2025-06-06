document.addEventListener("DOMContentLoaded", function () {

  // Global state for Core Equipment mode
  var addingCore = false;
  // Global array for currently shift-selected segments
  var selectedSegments = [];

  // -------------------------------
  // 1. Equipment Data for Fiber Segments
  // -------------------------------
  var equipmentData = {
    "G.652.D Backbone (96 Faser)": {
      fasern: "96",
      daempfung: "0,19 dB/km @ 1550 nm, 0,35 dB/km @ 1310 nm",
      biegeradius: "30 mm",
      besonderheiten: "Tight-Buffer, Standard",
      einsatzgebiet: "Long-Haul / Metro Backbone"
    },
    "G.654.E Backbone (96 Faser)": {
      fasern: "96",
      daempfung: "0,17 dB/km @ 1550 nm, 0,32 dB/km @ 1310 nm",
      biegeradius: "40 mm",
      besonderheiten: "Niedrige Dämpfung bei 1,55–1,65 µm",
      einsatzgebiet: "Ultra-Long-Haul / Seekabel-Anbindung"
    },
    "G.652.D Backbone intern (144/288 Faser)": {
      fasern: "144 / 288",
      daempfung: "wie G.652.D",
      biegeradius: "40 mm",
      besonderheiten: "hohe Faserzahl für PoP-Interconnect",
      einsatzgebiet: "PoP-Backbone, hohe Kapazität"
    },
    "G.657.A1 Zubringer-Kabel": {
      fasern: "12 / 24",
      daempfung: "0,20 dB/km @ 1550 nm, 0,36 dB/km @ 1310 nm",
      biegeradius: "10 mm",
      besonderheiten: "loose-tube, biegeunempfindlich",
      einsatzgebiet: "PoP → NVt / Straßenverteilung"
    },
    "G.657.A2 Drop-Kabel": {
      fasern: "1 – 2",
      daempfung: "0,30 dB/km @ 1550 nm, 0,40 dB/km @ 1310 nm",
      biegeradius: "7,5 mm",
      besonderheiten: "PU-Mantel, sehr biegeunempfindlich",
      einsatzgebiet: "NVt → Hausanschluss"
    },
    "G.657.B3 Drop-Kabel": {
      fasern: "1 – 2",
      daempfung: "0,32 dB/km @ 1550 nm, 0,42 dB/km @ 1310 nm",
      biegeradius: "5 mm",
      besonderheiten: "dünnster Mantel, extrem biegeunempfindlich",
      einsatzgebiet: "Indoor-Drop, enge Installationen"
    },
    "Armoured (“Panzer”) Fiber-Cable": {
      fasern: "12 – 48",
      daempfung: "0,20 dB/km @ 1550 nm",
      biegeradius: "25 mm",
      besonderheiten: "Stahl-/Aramid-Armierung für mechanischen Schutz",
      einsatzgebiet: "Erd- und Außeninstallationen"
    },
    "Ribbon-Fiber-Cable": {
      fasern: "12 – 144",
      daempfung: "0,18 dB/km @ 1550 nm",
      biegeradius: "35 mm",
      besonderheiten: "Flache Ribbons (z. B. 12-er Ribbons in Loose-Tube)",
      einsatzgebiet: "Massenzuführung in PoPs"
    },
    "Loose-Tube-Kabel": {
      fasern: "12 – 72",
      daempfung: "0,19 dB/km @ 1550 nm",
      biegeradius: "30 mm",
      besonderheiten: "Fasern in gelgefülltem Tube, gute Witterungsbeständigkeit",
      einsatzgebiet: "Backbone / Verteilnetz"
    },
    "Tight-Buffer-Kabel": {
      fasern: "1 – 24",
      daempfung: "0,20 dB/km @ 1550 nm",
      biegeradius: "20 mm",
      besonderheiten: "Fasern direkt im PBT-Buffer, einfache Steckermontage",
      einsatzgebiet: "Indoor-Patch-Verbindungen"
    },
    "Pre-konfektioniertes LWL-Patchkabel (SC/APC)": {
      fasern: "1 – 24",
      daempfung: "≤ 0,15 dB Steckerdämpfung",
      biegeradius: "–",
      besonderheiten: "factory-terminated, farbcodiert",
      einsatzgebiet: "PoP, ODF, OLT-Patchfelder"
    },
    "LWL-Pigtail (SC/APC)": {
      fasern: "1",
      daempfung: "≤ 0,10 dB Steckerdämpfung",
      biegeradius: "–",
      besonderheiten: "lose Enden zum Fusionieren, farbcodiert",
      einsatzgebiet: "Fusion im ODF"
    },
    "Biegeunempfindliches Pigtail": {
      fasern: "1",
      daempfung: "≤ 0,15 dB @ 1550 nm",
      biegeradius: "7 mm",
      besonderheiten: "integrierter Biegeradius-Schutz",
      einsatzgebiet: "enge Montageumgebungen"
    }
  };

  // -------------------------------
  // 2. Core Equipment Data
  // -------------------------------
  var coreEquipmentData = {
    "DWDM Transponder (ADVA FSP 3000)": { description: "DWDM Transponder für hohe Kapazität und flexible Wellenlängen." },
    "ROADM (FlexGrid) & Mux/Demux": { description: "ROADM System mit FlexGrid Technologie und Mux/Demux Funktionalität." },
    "Juniper PTX10003 (IP/MPLS Core)": { description: "Hochleistungsfähiger IP/MPLS Core Router für skalierbare Netzwerke." },
    "OTN-Termination": { description: "OTN Termination zur optimalen Signalaufbereitung in optischen Netzwerken." }
  };

  // -------------------------------
  // 3. Initialize the Map (using a local tile server)
  // -------------------------------
  var map = L.map('map').setView([51.66, 6.43], 14);
  L.tileLayer('http://localhost:8080/styles/bright/{z}/{x}/{y}.png', {  
    attribution: '&copy; Lokaler Tile-Server'
  }).addTo(map);
  console.log("Map initialized:", map);

  // -------------------------------
  // 4. Create a FeatureGroup for all elements (fibers and core equipment)
  // -------------------------------
  var drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  // -------------------------------
  // 5. Persistence: Save/Load GeoJSON Data
  // -------------------------------
  function saveData() {
    var data = drawnItems.toGeoJSON();
    localStorage.setItem("drawnData", JSON.stringify(data));
    console.log("Daten gespeichert:", JSON.stringify(data));
  }
  function loadStoredData() {
    var data = localStorage.getItem("drawnData");
    if (data) {
      try {
        var geojson = JSON.parse(data);
        if (!geojson || geojson.type !== "FeatureCollection" || !Array.isArray(geojson.features)) {
          throw new Error("Invalid GeoJSON structure");
        }
        var loadedLayer = L.geoJSON(geojson, {
          onEachFeature: function(feature, layer) {
            // For Fiber Segments
            if (feature.properties && feature.properties.equipment) {
              layer.options.equipment = feature.properties.equipment;
              layer.options.state = feature.properties.state;
              layer.options.fault = feature.properties.fault || null;  // store fault info
              var eq = equipmentData[feature.properties.equipment];
              var content = "<b>Leitungstyp:</b> " + feature.properties.equipment;
              if (eq) {
                content += "<br><strong>Fasern:</strong> " + eq.fasern +
                           "<br><strong>Dämpfung:</strong> " + eq.daempfung +
                           "<br><strong>Min. Biegeradius:</strong> " + eq.biegeradius +
                           "<br><strong>Besonderheiten:</strong> " + eq.besonderheiten +
                           "<br><strong>Einsatzgebiet:</strong> " + eq.einsatzgebiet;
              }
              if (feature.properties.state) {
                content += "<br><strong>Status:</strong> " + feature.properties.state;
              }
              if (layer.options.fault) {
                content += "<br><strong>Fault:</strong> " + layer.options.fault.type +
                           " (Ausmaß: " + layer.options.fault.magnitude + ")";
              }
              content += "<br><i>Zur Änderung: Bearbeitungsmodus nutzen.</i>";
              layer.bindPopup(content);
              if (feature.properties.state === "störung") {
                layer.setStyle({ color: 'grey', dashArray: '4,4', weight: 3 });
              } else {
                layer.setStyle({ color: 'red', dashArray: null, weight: 3 });
              }
            }
            // For Core Equipment (as Marker)
            if (feature.geometry && feature.geometry.type === "Point" && feature.properties.coreEquipment) {
              layer.options.coreEquipment = feature.properties.coreEquipment;
              layer.options.status = feature.properties.status;
              layer.options.fault = feature.properties.fault || null;
              var info = coreEquipmentData[feature.properties.coreEquipment];
              var content = "<b>Core Equipment:</b> " + feature.properties.coreEquipment;
              if (info) {
                content += "<br>" + info.description;
              }
              content += "<br><strong>Status:</strong> " + feature.properties.status;
              if (layer.options.fault) {
                content += "<br><strong>Fault:</strong> " + layer.options.fault.type +
                           " (Ausmaß: " + layer.options.fault.magnitude + ")";
              }
              content += "<br><i>Zur Änderung: Bearbeitungsmodus nutzen.</i>";
              layer.bindPopup(content);
              var col = feature.properties.status === "fail" ? "red" : "green";
              layer.setStyle({ color: col, fillColor: col, fillOpacity: 0.8 });
            }
            if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
              layer.on("click", onLineClick);
              layer.on("mouseover", onLineMouseOver);
              layer.on("mouseout", onLineMouseOut);
            }
            if (layer instanceof L.Marker) {
              layer.on("click", onCoreClick);
            }
          }
        });
        loadedLayer.eachLayer(function(layer){
          drawnItems.addLayer(layer);
        });
        console.log("Gespeicherte Daten geladen.");
        updateFaultsDashboard();
      } catch (e) {
        console.error("Fehler beim Laden gespeicherter Daten:", e);
        localStorage.removeItem("drawnData");
      }
    } else {
      console.log("Keine gespeicherten Daten gefunden.");
    }
  }

  // -------------------------------
  // 6. Initialize the Draw Control for Fiber Segments
  // -------------------------------
  var drawControl = new L.Control.Draw({
    edit: { featureGroup: drawnItems, remove: true },
    draw: {
      polygon: false,
      circle: false,
      rectangle: false,
      marker: false,
      circlemarker: false,
      polyline: { shapeOptions: { color: 'red', weight: 3 }, metric: true }
    }
  });
  map.addControl(drawControl);

  // -------------------------------
  // 7. Segment a Polyline into 50-Meter Segments (with Turf.js)
  // -------------------------------
  function segmentPolyline(layer, segmentLength) {
    var latlngs = layer.getLatLngs();
    if (latlngs.length < 2) return [layer];
    var coords = latlngs.map(function(latlng) { return [latlng.lng, latlng.lat]; });
    var turfLine = { type: "Feature", geometry: { type: "LineString", coordinates: coords } };
    var totalLength = turf.length(turfLine, { units: "kilometers" }) * 1000;
    var segments = [];
    var currentDist = 0;
    // Generate a unique groupId and order for segments of this line
    var groupId = 'group-' + Date.now() + '-' + Math.floor(Math.random()*10000);
    var orderIndex = 0;
    while (currentDist < totalLength) {
      var startDist = currentDist;
      var endDist = Math.min(currentDist + segmentLength, totalLength);
      var startPoint = turf.along(turfLine, startDist / 1000, { units: "kilometers" });
      var endPoint = turf.along(turfLine, endDist / 1000, { units: "kilometers" });
      var segment = turf.lineSlice(startPoint, endPoint, turfLine);
      var segCoords = segment.geometry.coordinates.map(function(coord) { return [coord[1], coord[0]]; });
      if (segCoords.length >= 2) {
        var segLayer = L.polyline(segCoords, { color: 'red', weight: 3 });
        segLayer.options.groupId = groupId;
        segLayer.options.order = orderIndex++;
        segments.push(segLayer);
      }
      currentDist += segmentLength;
    }
    return segments;
  }

  // -------------------------------
  // 8. Hover Functions for Fiber Segments
  // -------------------------------
  function onLineMouseOver(e) {
    var layer = e.target;
    if (selectedSegments.indexOf(layer) !== -1) {
      layer.setStyle({ color: 'darkblue', weight: 5 });
      return;
    }
    layer.setStyle({ weight: layer.options.weight + 2, color: 'orange' });
  }
  function onLineMouseOut(e) {
    var layer = e.target;
    if (selectedSegments.indexOf(layer) !== -1) {
      layer.setStyle({ color: 'blue', weight: 5 });
      return;
    }
    if (layer.options.state === "störung") {
      layer.setStyle({ color: 'grey', dashArray: '4,4', weight: 3 });
    } else {
      layer.setStyle({ color: 'red', dashArray: null, weight: 3 });
    }
  }

  // -------------------------------
  // 9. Click Handler for Fiber Segments (Single and Mass Assignment)
  // -------------------------------
  function onLineClick(e) {
    var line = e.target;
    // SHIFT key: Toggle selection and range selection
    if (e.originalEvent && e.originalEvent.shiftKey) {
      if (selectedSegments.indexOf(line) !== -1) {
        selectedSegments = selectedSegments.filter(function(seg) { return seg !== line; });
        if (line.options.state === "störung") {
          line.setStyle({ color: 'grey', dashArray: '4,4', weight: 3 });
        } else {
          line.setStyle({ color: 'red', dashArray: null, weight: 3 });
        }
      } else {
        if (selectedSegments.length > 0 && selectedSegments[0].options.groupId !== line.options.groupId) {
          selectedSegments = [];
        }
        selectedSegments.push(line);
        line.setStyle({ color: 'blue', weight: 5 });
      }
      if (selectedSegments.length > 1) {
        var orders = selectedSegments.map(function(seg) { return seg.options.order; });
        orders.push(line.options.order);
        var minOrder = Math.min.apply(null, orders);
        var maxOrder = Math.max.apply(null, orders);
        drawnItems.eachLayer(function(layer) {
          if (layer instanceof L.Polyline && layer.options.groupId === line.options.groupId) {
            if (layer.options.order >= minOrder && layer.options.order <= maxOrder) {
              layer.setStyle({ color: 'blue', weight: 5 });
              if (selectedSegments.indexOf(layer) === -1) {
                selectedSegments.push(layer);
              }
            }
          }
        });
      }
      return;
    }
    // If multiple segments are selected, open mass assignment popup
    if (selectedSegments.length > 0) {
      openMassAssignmentPopup(e.latlng);
      return;
    }
    // Single assignment: if already assigned, show info popup
    if (line.options.equipment) {
      var eq = equipmentData[line.options.equipment];
      var content = "<b>Leitungstyp:</b> " + line.options.equipment;
      if (eq) {
        content += "<br><strong>Fasern:</strong> " + eq.fasern +
                   "<br><strong>Dämpfung:</strong> " + eq.daempfung +
                   "<br><strong>Min. Biegeradius:</strong> " + eq.biegeradius +
                   "<br><strong>Besonderheiten:</strong> " + eq.besonderheiten +
                   "<br><strong>Einsatzgebiet:</strong> " + eq.einsatzgebiet;
      }
      content += "<br><strong>Status:</strong> " + line.options.state;
      if (line.options.fault) {
        content += "<br><strong>Fault:</strong> " + line.options.fault.type +
                   " (Ausmaß: " + line.options.fault.magnitude + ")";
      }
      content += "<br><i>Zur Änderung: Bearbeitungsmodus nutzen.</i>";
      L.popup().setLatLng(e.latlng).setContent(content).openOn(map);
      return;
    }
    // No assignment yet: Open individual assignment popup
    openIndividualAssignmentPopup(e.latlng, line);
  }

  // -------------------------------
  // 9a. Individual Assignment Popup for a Fiber Segment
  // -------------------------------
  function openIndividualAssignmentPopup(latlng, line) {
    var optionsHTML = '<option value="">--Bitte wählen--</option>';
    Object.keys(equipmentData).forEach(function(key) {
      optionsHTML += '<option value="' + key + '">' + key + '</option>';
    });
    var popupContent = `
      <form id="equipmentForm">
        <label for="equipmentSelect">Wähle Leitungstyp:</label>
        <select id="equipmentSelect">${optionsHTML}</select>
        <div id="equipmentDetails" style="margin-top:8px; font-size:0.9em; border:1px solid #ccc; padding:4px;"></div>
        <br>
        <label for="lineStatusSelect">Leitungsstatus:</label>
        <select id="lineStatusSelect">
          <option value="online" selected>Online</option>
          <option value="störung">Störung</option>
        </select>
        <br><br>
        <input type="submit" value="Zuweisen">
      </form>
      <p style="font-size:0.9em;color:#555;">Zur Änderung: Bearbeitungsmodus nutzen.</p>
    `;
    L.popup().setLatLng(latlng).setContent(popupContent).openOn(map);
    setTimeout(function() {
      var select = document.getElementById("equipmentSelect");
      var detailsDiv = document.getElementById("equipmentDetails");
      if (select && detailsDiv) {
        select.addEventListener("change", function() {
          var selectedKey = select.value;
          if (selectedKey && equipmentData[selectedKey]) {
            var eq = equipmentData[selectedKey];
            detailsDiv.innerHTML = `
              <strong>Fasern:</strong> ${eq.fasern}<br>
              <strong>Dämpfung:</strong> ${eq.daempfung}<br>
              <strong>Min. Biegeradius:</strong> ${eq.biegeradius}<br>
              <strong>Besonderheiten:</strong> ${eq.besonderheiten}<br>
              <strong>Einsatzgebiet:</strong> ${eq.einsatzgebiet}
            `;
          } else {
            detailsDiv.innerHTML = "";
          }
        });
      }
      var form = document.getElementById("equipmentForm");
      if (form) {
        form.addEventListener("submit", function(ev) {
          ev.preventDefault();
          var equipSelect = document.getElementById("equipmentSelect");
          var selected = equipSelect.value;
          var statusSelect = document.getElementById("lineStatusSelect");
          var status = statusSelect.value;
          if (selected === "") {
            alert("Bitte wähle einen Leitungstyp aus!");
            return;
          }
          line.options.equipment = selected;
          line.options.state = status;
          line.toGeoJSON = function() {
            var base = L.Polyline.prototype.toGeoJSON.call(this);
            base.properties.equipment = this.options.equipment;
            base.properties.state = this.options.state;
            return base;
          };
          var eq = equipmentData[selected];
          var content = "<b>Leitungstyp:</b> " + selected;
          if (eq) {
            content += "<br><strong>Fasern:</strong> " + eq.fasern +
                       "<br><strong>Dämpfung:</strong> " + eq.daempfung +
                       "<br><strong>Min. Biegeradius:</strong> " + eq.biegeradius +
                       "<br><strong>Besonderheiten:</strong> " + eq.besonderheiten +
                       "<br><strong>Einsatzgebiet:</strong> " + eq.einsatzgebiet;
          }
          content += "<br><strong>Status:</strong> " + status;
          content += "<br><i>Zur Änderung: Bearbeitungsmodus nutzen.</i>";
          line.bindPopup(content);
          if (status === "störung") {
            line.setStyle({ color: 'grey', dashArray: '4,4', weight: 3 });
          } else {
            line.setStyle({ color: 'red', dashArray: null, weight: 3 });
          }
          map.closePopup();
          saveData();
        });
      }
    }, 100);
  }

  // -------------------------------
  // 9b. Mass Assignment Popup for Selected Segments
  // -------------------------------
  function openMassAssignmentPopup(latlng) {
    var optionsHTML = '<option value="">--Bitte wählen--</option>';
    Object.keys(equipmentData).forEach(function(key) {
      optionsHTML += '<option value="' + key + '">' + key + '</option>';
    });
    var popupContent = `
      <form id="massEquipmentForm">
        <label for="massEquipmentSelect">Wähle Leitungstyp für ${selectedSegments.length} Segmente:</label>
        <select id="massEquipmentSelect">${optionsHTML}</select>
        <div id="massEquipmentDetails" style="margin-top:8px; font-size:0.9em; border:1px solid #ccc; padding:4px;"></div>
        <br>
        <label for="massLineStatusSelect">Leitungsstatus:</label>
        <select id="massLineStatusSelect">
          <option value="online" selected>Online</option>
          <option value="störung">Störung</option>
        </select>
        <br><br>
        <input type="submit" value="Zuweisen für alle">
      </form>
      <p style="font-size:0.9em;color:#555;">Zur Änderung: Bearbeitungsmodus nutzen.</p>
    `;
    L.popup().setLatLng(latlng).setContent(popupContent).openOn(map);
    setTimeout(function() {
      var select = document.getElementById("massEquipmentSelect");
      var detailsDiv = document.getElementById("massEquipmentDetails");
      if (select && detailsDiv) {
        select.addEventListener("change", function() {
          var selectedKey = select.value;
          if (selectedKey && equipmentData[selectedKey]) {
            var eq = equipmentData[selectedKey];
            detailsDiv.innerHTML = `
              <strong>Fasern:</strong> ${eq.fasern}<br>
              <strong>Dämpfung:</strong> ${eq.daempfung}<br>
              <strong>Min. Biegeradius:</strong> ${eq.biegeradius}<br>
              <strong>Besonderheiten:</strong> ${eq.besonderheiten}<br>
              <strong>Einsatzgebiet:</strong> ${eq.einsatzgebiet}
            `;
          } else {
            detailsDiv.innerHTML = "";
          }
        });
      }
      var form = document.getElementById("massEquipmentForm");
      if (form) {
        form.addEventListener("submit", function(ev) {
          ev.preventDefault();
          var equipSelect = document.getElementById("massEquipmentSelect");
          var selected = equipSelect.value;
          var statusSelect = document.getElementById("massLineStatusSelect");
          var status = statusSelect.value;
          if (selected === "") {
            alert("Bitte wähle einen Leitungstyp aus!");
            return;
          }
          selectedSegments.forEach(function(seg) {
            seg.options.equipment = selected;
            seg.options.state = status;
            seg.toGeoJSON = function() {
              var base = L.Polyline.prototype.toGeoJSON.call(this);
              base.properties.equipment = this.options.equipment;
              base.properties.state = this.options.state;
              return base;
            };
            var eq = equipmentData[selected];
            var content = "<b>Leitungstyp:</b> " + selected;
            if (eq) {
              content += "<br><strong>Fasern:</strong> " + eq.fasern +
                         "<br><strong>Dämpfung:</strong> " + eq.daempfung +
                         "<br><strong>Min. Biegeradius:</strong> " + eq.biegeradius +
                         "<br><strong>Besonderheiten:</strong> " + eq.besonderheiten +
                         "<br><strong>Einsatzgebiet:</strong> " + eq.einsatzgebiet;
            }
            content += "<br><strong>Status:</strong> " + status;
            content += "<br><i>Zur Änderung: Bearbeitungsmodus nutzen.</i>";
            seg.bindPopup(content);
            if (status === "störung") {
              seg.setStyle({ color: 'grey', dashArray: '4,4', weight: 3 });
            } else {
              seg.setStyle({ color: 'red', dashArray: null, weight: 3 });
            }
          });
          selectedSegments = [];
          map.closePopup();
          saveData();
        });
      }
    }, 100);
  }

  // -------------------------------
  // 10. Core Equipment – Marker Placement
  // -------------------------------
  // Listener for the "Add Core Equipment" Button
  document.getElementById("add-core-btn").addEventListener("click", function() {
    addingCore = true;
    alert("Core Equipment Mode activated. Click on the map to place a Core Device.");
  });
  // When in Core mode, handle map click to open core assignment popup
  map.on("click", function(e) {
    if (addingCore) {
      openCoreAssignmentPopup(e.latlng);
      addingCore = false;
    }
  });
  // Core Equipment Marker click handler (to show info)
  function onCoreClick(e) {
    var marker = e.target;
    var info = coreEquipmentData[marker.options.coreEquipment];
    var content = "<b>Core Equipment:</b> " + marker.options.coreEquipment;
    if (info) {
      content += "<br>" + info.description;
    }
    content += "<br><strong>Status:</strong> " + marker.options.status;
    if (marker.options.fault) {
      content += "<br><strong>Fault:</strong> " + marker.options.fault.type +
                 " (Ausmaß: " + marker.options.fault.magnitude + ")";
    }
    content += "<br><i>Zur Änderung: Bearbeitungsmodus nutzen.</i>";
    L.popup().setLatLng(e.latlng).setContent(content).openOn(map);
  }
  // Core Equipment Assignment Popup
  function openCoreAssignmentPopup(latlng) {
    var optionsHTML = '<option value="">--Bitte wählen--</option>';
    Object.keys(coreEquipmentData).forEach(function(key) {
      optionsHTML += '<option value="' + key + '">' + key + '</option>';
    });
    var popupContent = `
      <form id="coreEquipmentForm">
        <label for="coreEquipmentSelect">Wähle Core Equipment:</label>
        <select id="coreEquipmentSelect">${optionsHTML}</select>
        <div id="coreEquipmentDetails" style="margin-top:8px; font-size:0.9em; border:1px solid #ccc; padding:4px;"></div>
        <br>
        <label for="coreStatusSelect">Status:</label>
        <select id="coreStatusSelect">
          <option value="online" selected>Online</option>
          <option value="fail">Fail</option>
        </select>
        <br><br>
        <input type="submit" value="Zuweisen">
      </form>
      <p style="font-size:0.9em;color:#555;">Zur Änderung: Bearbeitungsmodus nutzen.</p>
    `;
    L.popup().setLatLng(latlng).setContent(popupContent).openOn(map);
    setTimeout(function() {
      var coreSelect = document.getElementById("coreEquipmentSelect");
      var detailsDiv = document.getElementById("coreEquipmentDetails");
      if (coreSelect && detailsDiv) {
        coreSelect.addEventListener("change", function() {
          var selectedKey = coreSelect.value;
          if (selectedKey && coreEquipmentData[selectedKey]) {
            detailsDiv.innerHTML = coreEquipmentData[selectedKey].description;
          } else {
            detailsDiv.innerHTML = "";
          }
        });
      }
      var form = document.getElementById("coreEquipmentForm");
      if (form) {
        form.addEventListener("submit", function(ev) {
          ev.preventDefault();
          var sel = document.getElementById("coreEquipmentSelect");
          var selected = sel.value;
          var statusSelect = document.getElementById("coreStatusSelect");
          var status = statusSelect.value;
          if (selected === "") {
            alert("Bitte wähle ein Core Equipment aus!");
            return;
          }
          // Create a Core Equipment Marker (CircleMarker)
          var col = status === "online" ? "green" : "red";
          var coreMarker = L.circleMarker(latlng, { radius: 8, color: col, fillColor: col, fillOpacity: 0.8 });
          coreMarker.options.coreEquipment = selected;
          coreMarker.options.status = status;
          coreMarker.toGeoJSON = function() {
            var base = L.CircleMarker.prototype.toGeoJSON.call(this);
            base.properties.coreEquipment = this.options.coreEquipment;
            base.properties.status = this.options.status;
            return base;
          };
          var info = coreEquipmentData[selected] ? coreEquipmentData[selected].description : "";
          var content = "<b>Core Equipment:</b> " + selected +
                        "<br><strong>Status:</strong> " + status +
                        "<br>" + info +
                        "<br><i>Zur Änderung: Bearbeitungsmodus nutzen.</i>";
          coreMarker.bindPopup(content);
          drawnItems.addLayer(coreMarker);
          map.closePopup();
          saveData();
        });
      }
    }, 100);
  }

  // -------------------------------
  // 11. Handling Drawing of New Elements
  // -------------------------------
  map.on(L.Draw.Event.CREATED, function(event) {
    var layer = event.layer;
    if (layer instanceof L.Polyline) {
      var segments = segmentPolyline(layer, 50);
      segments.forEach(function(seg) {
        seg.on("click", onLineClick);
        seg.on("mouseover", onLineMouseOver);
        seg.on("mouseout", onLineMouseOut);
        drawnItems.addLayer(seg);
      });
    } else {
      drawnItems.addLayer(layer);
    }
    saveData();
  });
  map.on(L.Draw.Event.EDITED, function(event) {
    event.layers.eachLayer(function(layer) {
      console.log("Geändertes Segment:", layer.toGeoJSON());
    });
    saveData();
  });
  map.on(L.Draw.Event.DELETED, function(event) {
    event.layers.eachLayer(function(layer) {
      console.log("Gelöschtes Segment:", layer.toGeoJSON());
    });
    saveData();
  });

  // -------------------------------
  // 12. Export Button Functionality
  // -------------------------------
  document.getElementById("export-btn").addEventListener("click", function() {
    var data = drawnItems.toGeoJSON();
    console.log("Export GeoJSON:", JSON.stringify(data));
    alert("GeoJSON wurde in der Konsole ausgegeben!");
  });

  // -------------------------------
  // 13. Fault Simulation & Dashboard Updates
  // -------------------------------
  // This function simulates random faults (e.g., power outages, network failures) on segments and core devices.
  function simulateFaults() {
    // Define fault types and severity levels
    var faultTypes = [
      { type: "Störung", magnitude: "mittel" },
      { type: "Stromausfall", magnitude: "hoch" },
      { type: "Netzausfall", magnitude: "sehr hoch" },
      { type: "Leistungsabfall", magnitude: "niedrig" }
    ];
    // Randomly select an element from drawnItems
    drawnItems.eachLayer(function(layer) {
      // Only simulate for Polyline segments or Core Markers; 10% chance for a fault
      if ((layer instanceof L.Polyline || layer instanceof L.Marker) && Math.random() < 0.1) {
        var fault = faultTypes[Math.floor(Math.random() * faultTypes.length)];
        layer.options.fault = fault;
        // Adjust status and style based on element type
        if (layer instanceof L.Polyline) {
          layer.options.state = "störung";
          layer.setStyle({ color: 'grey', dashArray: '4,4', weight: 3 });
        }
        if (layer instanceof L.Marker) {
          layer.options.status = "fail";
          layer.setStyle({ color: 'red', fillColor: 'red', fillOpacity: 0.8 });
        }
      } else {
        // With 50% chance, clear existing faults
        if (layer.options.fault && Math.random() < 0.5) {
          delete layer.options.fault;
          if (layer instanceof L.Polyline) {
            layer.options.state = "online";
            layer.setStyle({ color:'red', dashArray: null, weight: 3 });
          }
          if (layer instanceof L.Marker) {
            layer.options.status = "online";
            layer.setStyle({ color:'green', fillColor:'green', fillOpacity: 0.8 });
          }
        }
      }
    });
    updateFaultsDashboard();
    saveData();
  }
  // Update the Faults tab in the dashboard
  function updateFaultsDashboard() {
    var faultsList = document.getElementById("faults-list");
    var faultItems = [];
    drawnItems.eachLayer(function(layer) {
      if (layer.options.fault) {
        var item = "<li>" +
                   (layer.options.equipment ? "Segment (" + layer.options.equipment + ")" :
                   (layer.options.coreEquipment ? "Core: " + layer.options.coreEquipment : "Unbekannt")) +
                   " - Fault: " + layer.options.fault.type + " (" + layer.options.fault.magnitude + ")" +
                   "</li>";
        faultItems.push(item);
      }
    });
    faultsList.innerHTML = faultItems.length > 0 ? "<ul>" + faultItems.join("") + "</ul>" : "<p>Keine aktuellen Faults.</p>";
  }
  // Start fault simulation every 30 seconds
  setInterval(simulateFaults, 30000);

  // -------------------------------
  // 14. Load Stored Data
  // -------------------------------
  loadStoredData();
});
