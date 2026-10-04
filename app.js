(function () {
  const data = window.MAP_DATA;
  const branchGrid = document.getElementById("branchGrid");
  const questions = document.getElementById("preguntas");

  function paragraph(text, className = "") {
    return `<p${className ? ` class="${className}"` : ""}>${text}</p>`;
  }

  function nodeTemplate(node) {
    return `
      <article class="node-card" data-connector="${node.connector}">
        <h3>${node.title}</h3>
        ${paragraph(node.body)}
        ${paragraph(node.relation, "relation")}
        ${
          node.example
            ? `<p class="example"><strong>Ejemplo aplicado a mi práctica docente</strong>${node.example}</p>`
            : ""
        }
      </article>
    `;
  }

  branchGrid.innerHTML = data.branches
    .map(
      (branch) => `
        <section class="branch ${branch.id}" aria-label="${branch.title}">
          <div class="branch-header">
            <span class="connector-label">${branch.connector}</span>
            <h2>${branch.title}</h2>
            <p class="branch-intro">${branch.intro}</p>
          </div>
          <div class="branch-flow">
            ${branch.nodes.map(nodeTemplate).join("")}
          </div>
        </section>
      `
    )
    .join("");

  questions.innerHTML = data.questions
    .map(
      (item, index) => `
        <article class="question-card">
          <span class="node-label">Pregunta ${index + 1}</span>
          <h3>${item.q}</h3>
          <p>${item.a}</p>
        </article>
      `
    )
    .join("");

  const captureBtn = document.getElementById("captureBtn");
  captureBtn.addEventListener("click", () => {
    document.body.classList.toggle("capture-mode");
    captureBtn.textContent = document.body.classList.contains("capture-mode")
      ? "Salir captura"
      : "Modo captura";
  });

  document.getElementById("exportBtn").addEventListener("click", async () => {
    const element = document.getElementById("conceptMap");
    const canvas = await html2canvas(element, {
      backgroundColor: "#f4f7fb",
      scale: 2,
      useCORS: true
    });
    const link = document.createElement("a");
    link.download = "actividad_1_1_mapa_conceptual_expandido.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
})();
