(function () {
  const data = window.MAP_DATA;
  const elements = [
    ...data.nodes.map((node) => ({ data: node })),
    ...data.edges.map(([source, target, label], index) => ({
      data: { id: `e-${index}`, source, target, label, kind: "hierarchy" }
    })),
    ...data.crossEdges.map(([source, target, label], index) => ({
      data: { id: `c-${index}`, source, target, label, kind: "cross" }
    }))
  ];

  const cy = cytoscape({
    container: document.getElementById("cy"),
    elements,
    wheelSensitivity: 0.18,
    minZoom: 0.18,
    maxZoom: 2.4,
    style: [
      {
        selector: "node",
        style: {
          label: "data(label)",
          "text-wrap": "wrap",
          "text-max-width": 118,
          "font-family": "Inter, system-ui, sans-serif",
          "font-size": 13,
          "font-weight": 700,
          color: "#142033",
          "text-valign": "center",
          "text-halign": "center",
          width: 112,
          height: 58,
          shape: "round-rectangle",
          "background-color": "#ffffff",
          "border-width": 2.4,
          "border-color": "#6b7280",
          "overlay-opacity": 0,
          "transition-property": "border-width, width, height, background-color, opacity",
          "transition-duration": "140ms"
        }
      },
      { selector: 'node[group = "central"]', style: { width: 156, height: 78, "background-color": "#f8fafc", "border-color": "#172554", "font-size": 15 } },
      { selector: 'node[group = "history"]', style: { "border-color": "#0f766e", "background-color": "#e6fffb" } },
      { selector: 'node[group = "principles"]', style: { "border-color": "#7c3aed", "background-color": "#f4efff" } },
      { selector: 'node[group = "teaching"]', style: { "border-color": "#047857", "background-color": "#e9fbf3" } },
      { selector: 'node[group = "method"]', style: { width: 86, height: 42, shape: "ellipse", "border-color": "#a855f7", "background-color": "#fbf7ff", "font-size": 12 } },
      {
        selector: "edge",
        style: {
          label: "data(label)",
          "font-family": "Inter, system-ui, sans-serif",
          "font-size": 10,
          "font-weight": 650,
          color: "#334155",
          "text-background-color": "#ffffff",
          "text-background-opacity": 0.9,
          "text-background-padding": 3,
          "curve-style": "bezier",
          "target-arrow-shape": "triangle",
          "target-arrow-color": "#64748b",
          "line-color": "#64748b",
          width: 1.6,
          "text-rotation": "autorotate",
          "control-point-step-size": 46
        }
      },
      { selector: 'edge[kind = "cross"]', style: { "line-style": "dashed", "target-arrow-shape": "none", "line-color": "#94a3b8", color: "#475569" } },
      { selector: ".selected", style: { "border-width": 5, "background-color": "#ffffff" } },
      { selector: ".faded", style: { opacity: 0.17 } },
      { selector: ".connected", style: { opacity: 1, width: 3, "line-color": "#0f172a", "target-arrow-color": "#0f172a" } },
      { selector: ".hovered", style: { width: 124, height: 66, "border-width": 4 } }
    ],
    layout: {
      name: "dagre",
      rankDir: "TB",
      rankSep: 105,
      nodeSep: 34,
      edgeSep: 18
    }
  });

  const detailTitle = document.getElementById("detailTitle");
  const detailGroup = document.getElementById("detailGroup");
  const detailBody = document.getElementById("detailBody");
  const captureBtn = document.getElementById("captureBtn");

  function renderDetail(nodeData) {
    detailTitle.textContent = nodeData.title;
    detailGroup.textContent = nodeData.type;
    detailBody.innerHTML = `
      <h3>Concepto</h3>
      <p>${nodeData.body}</p>
      <h3>Relación con el capítulo</h3>
      <p>${nodeData.relation}</p>
      ${
        nodeData.example
          ? `<h3>Ejemplo aplicado a mi práctica docente</h3><p>${nodeData.example}</p>`
          : ""
      }
    `;
  }

  function selectNode(node) {
    cy.elements().removeClass("selected faded connected");
    const neighborhood = node.closedNeighborhood();
    cy.elements().not(neighborhood).addClass("faded");
    neighborhood.addClass("connected");
    node.addClass("selected");
    renderDetail(node.data());
  }

  cy.on("tap", "node", (event) => selectNode(event.target));
  cy.on("dbltap", "node", (event) => {
    selectNode(event.target);
    cy.animate({ center: { eles: event.target }, zoom: 1.05 }, { duration: 280 });
  });
  cy.on("mouseover", "node", (event) => event.target.addClass("hovered"));
  cy.on("mouseout", "node", (event) => event.target.removeClass("hovered"));
  cy.on("tap", (event) => {
    if (event.target === cy) {
      cy.elements().removeClass("selected faded connected");
    }
  });

  document.getElementById("fitBtn").addEventListener("click", () => cy.fit(undefined, 48));
  document.getElementById("expandBtn").addEventListener("click", () => {
    cy.layout({ name: "dagre", rankDir: "TB", rankSep: 105, nodeSep: 34, edgeSep: 18 }).run();
    window.setTimeout(() => cy.fit(undefined, 42), 220);
  });
  captureBtn.addEventListener("click", () => {
    document.body.classList.toggle("capture-mode");
    captureBtn.textContent = document.body.classList.contains("capture-mode") ? "Salir captura" : "Modo captura";
    cy.resize();
    cy.fit(undefined, 28);
  });
  document.getElementById("exportBtn").addEventListener("click", () => {
    const png = cy.png({ full: true, scale: 2.4, bg: "white" });
    const link = document.createElement("a");
    link.download = "mapa_conceptual_pedagogia_tradicion_vigencia.png";
    link.href = png;
    link.click();
  });

  document.querySelectorAll("[data-dialog]").forEach((button) => {
    button.addEventListener("click", () => document.getElementById(button.dataset.dialog).showModal());
  });

  const questionsList = document.getElementById("questionsList");
  questionsList.innerHTML = data.questions
    .map(
      (item, index) => `
        <details ${index === 0 ? "open" : ""}>
          <summary>${item.q}</summary>
          <p>${item.a}</p>
        </details>
      `
    )
    .join("");

  window.addEventListener("resize", () => cy.resize());
  window.addEventListener("load", () => {
    const root = cy.getElementById("root");
    selectNode(root);
    cy.fit(undefined, 42);
  });
})();
