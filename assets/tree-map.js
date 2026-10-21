(() => {
  const problem = {
    title: 'Árbol de problemas',
    central: { id: 'p0', code: 'P0', label: 'Aprendizaje autónomo, crítico y aplicado insuficiente', kind: 'Problema central' },
    topKind: 'Efecto', middleKind: 'Causa directa', lowerKind: 'Causa indirecta', bottomKind: 'Causa estructural',
    top: ['Menor autonomía para resolver y defender problemas', 'Productos abundantes con comprensión superficial', 'Calificaciones que reflejan de forma incompleta las competencias', 'Errores repetidos y debilidad metacognitiva', 'Dificultad para transferir saberes', 'Brechas ocultas por productos colectivos', 'Participación y oportunidades asimétricas', 'Tensiones de confianza y autoría'],
    middle: ['La IA reemplaza el intento propio', 'Material asistido por IA sin curaduría', 'Se califica el entregable, no el proceso', 'Poca retroalimentación durante el avance', 'Ejercicios poco conectados con contextos reales', 'Poca experimentación individual', 'Acceso y competencias tecnológicas desiguales', 'Faltan acuerdos claros sobre IA y autoría'],
    lower: ['Las tareas valoran principalmente el resultado terminado', 'Tiempo limitado para revisar propuestas automatizadas', 'Instrumentos que priorizan la entrega', 'Faltan hitos intermedios y autoevaluación', 'Escasa articulación con contextos reales', 'Se prioriza completar el proyecto grupal', 'Diferencias en conectividad, equipos y tiempo', 'Criterios heterogéneos sobre IA y autoría'],
    bottom: ['Cultura de credencialismo y cumplimiento', 'Desigualdad social y tecnológica', 'Cambios rápidos sin acuerdos institucionales'],
    ids: { top: 'e', middle: 'c', lower: 'i', bottom: 't' }
  };
  const solution = {
    title: 'Árbol de soluciones',
    central: { id: 'o0', code: 'O0', label: 'Aprendizaje autónomo, crítico y aplicado fortalecido', kind: 'Objetivo general' },
    topKind: 'Resultado esperado', middleKind: 'Solución', lowerKind: 'Medida ejecutable', bottomKind: 'Línea transversal',
    top: ['Mayor autonomía y capacidad de justificar decisiones', 'Materiales pertinentes y comprensión acompañada', 'Evidencias fiables y notas mejor justificadas', 'Menos errores repetidos y mejor autorregulación', 'Mayor transferencia y pertinencia social', 'Participación equilibrada y práctica verificable', 'Oportunidades más equitativas', 'Confianza y consistencia en la autoría'],
    middle: ['IA como andamiaje, no como sustituto', 'Docente que valida, contextualiza y media', 'Evidencias progresivas y defensas breves', 'Retroalimentar, revisar y volver a intentar', 'Aprendizaje basado en retos contextualizados', 'Practicar primero, colaborar después', 'Acceso justo y uso crítico de tecnología', 'Reglas transparentes y actualización compartida'],
    lower: ['Intento propio antes de consultar IA', 'Ejecutar y revisar cada ejemplo generado', 'Dividir actividades en planteamiento y avance', 'Programar hitos de revisión y segunda versión', 'Proponer retos con datos y contextos reales', 'Iniciar cada bloque con un microreto individual', 'Consultar condiciones de acceso sin exponer a nadie', 'Construir acuerdos concretos sobre IA y autoría'],
    bottom: ['Diseño y acompañamiento', 'Práctica y participación', 'Gobernanza y equidad'],
    ids: { top: 'l', middle: 's', lower: 'm', bottom: 'r' }
  };
  const byId = id => document.getElementById(id);
  const clean = text => text.replace(/\s+/g, ' ').trim();
  const getCard = id => byId(id);
  const cardContent = id => {
    const card = getCard(id);
    if (!card) return null;
    const copy = card.cloneNode(true);
    copy.querySelector('summary')?.remove();
    return Array.from(copy.childNodes);
  };
  const sourceSummary = id => clean(getCard(id)?.querySelector('summary')?.textContent || '');
  const wrap = (text, max = 23) => {
    const words = text.split(' '), lines = [], line = [];
    words.forEach(word => { if ((line.join(' ').length + word.length + 1) > max && line.length) { lines.push(line.join(' ')); line.length = 0; } line.push(word); });
    if (line.length) lines.push(line.join(' '));
    return lines.slice(0, 3);
  };
  function renderMap(host, tree) {
    const data = [
      ...tree.top.map((label, i) => ({ id: `${tree.ids.top}${i + 1}`, code: `${tree.ids.top.toUpperCase()}${i + 1}`, label, kind: tree.topKind, row: 'top', index: i })),
      ...tree.middle.map((label, i) => ({ id: `${tree.ids.middle}${i + 1}`, code: `${tree.ids.middle.toUpperCase()}${i + 1}`, label, kind: tree.middleKind, row: 'middle', index: i })),
      tree.central,
      ...tree.lower.map((label, i) => ({ id: `${tree.ids.lower}${i + 1}`, code: `${tree.ids.lower.toUpperCase()}${i + 1}`, label, kind: tree.lowerKind, row: 'lower', index: i })),
      ...tree.bottom.map((label, i) => ({ id: `${tree.ids.bottom}${i + 1}`, code: `${tree.ids.bottom.toUpperCase()}${i + 1}`, label, kind: tree.bottomKind, row: 'bottom', index: i }))
    ];
    const W = 1440, H = 1160, nodeW = 150, nodeH = 82, x = i => 45 + i * 180, centerX = W / 2 - nodeW / 2;
    const pos = n => n.row === 'top' || n.row === 'middle' || n.row === 'lower' ? { x: x(n.index), y: n.row === 'top' ? 70 : n.row === 'middle' ? 330 : 790 } : n.row === 'bottom' ? { x: 450 + n.index * 270, y: 1015 } : { x: centerX, y: 550 };
    const point = (p, side) => ({ x: p.x + nodeW / 2, y: side === 'top' ? p.y : p.y + nodeH });
    const lines = [];
    const edges = (from, to) => { const a = point(pos(from), 'bottom'), b = point(pos(to), 'top'); lines.push(`<path class="tree-edge" d="M ${a.x} ${a.y} L ${b.x} ${b.y}"/>`); };
    const central = tree.central;
    data.filter(n => n.row === 'middle').forEach(n => edges(n, central));
    data.filter(n => n.row === 'top').forEach((n, i) => edges(n, data.find(m => m.row === 'middle' && m.index === i)));
    data.filter(n => n.row === 'lower').forEach((n, i) => edges(n, data.find(m => m.row === 'middle' && m.index === i)));
    data.filter(n => n.row === 'bottom').forEach(n => data.filter(m => m.row === 'lower').slice(n.index === 2 ? 5 : n.index * 3, n.index === 2 ? 8 : n.index * 3 + 3).forEach(m => edges(n, m)));
    const nodes = data.map(n => { const p = pos(n), linesText = wrap(n.label); const cardId = getCard(n.id) ? n.id : null; return `<g class="tree-node ${n === central ? 'central' : ''}" tabindex="0" role="button" aria-label="${n.code}: ${n.label}" data-node-id="${n.id}" data-code="${n.code}" data-label="${n.label}" data-card-id="${cardId || ''}" transform="translate(${p.x},${p.y})"><rect width="${nodeW}" height="${nodeH}" rx="14"/><text x="${nodeW / 2}" y="21" text-anchor="middle" class="node-kind">${n.code} · ${n.kind}</text>${linesText.map((line, j) => `<text x="${nodeW / 2}" y="${43 + j * 17}" text-anchor="middle">${line}</text>`).join('')}</g>`; }).join('');
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${tree.title} interactivo"><g>${lines.join('')}</g><g>${nodes}</g></svg>`;
    const dialog = document.createElement('dialog'); dialog.className = 'tree-dialog'; dialog.innerHTML = '<div class="tree-dialog-head"><h2 id="tree-dialog-title"></h2><button type="button" class="tree-dialog-close" aria-label="Cerrar ventana">Cerrar</button></div><div id="tree-dialog-body"></div>'; document.body.append(dialog);
    const open = node => { const title = `${node.dataset.code} · ${node.dataset.label}`; dialog.querySelector('#tree-dialog-title').textContent = title; const body = dialog.querySelector('#tree-dialog-body'); body.replaceChildren(...(node.dataset.cardId ? cardContent(node.dataset.cardId) : [document.createTextNode('Esta ficha resume el elemento del árbol y su relación causal dentro de la actividad.')])); if (!dialog.open) dialog.showModal(); };
    host.querySelectorAll('.tree-node').forEach(node => { node.addEventListener('click', () => open(node)); node.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(node); } }); });
    dialog.querySelector('.tree-dialog-close').addEventListener('click', () => dialog.close()); dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  }
  function renderProblemMap(host, tree) {
    const W = 1800, H = 1000, nodeW = 220, nodeH = 94, gap = 8, start = 30;
    const nodes = [
      ...tree.top.map((label, i) => ({ id: `${tree.ids.top}${i + 1}`, code: `${tree.ids.top.toUpperCase()}${i + 1}`, label, row: 'top', index: i })),
      ...tree.middle.map((label, i) => ({ id: `${tree.ids.middle}${i + 1}`, code: `${tree.ids.middle.toUpperCase()}${i + 1}`, label, row: 'middle', index: i })),
      { ...tree.central, row: 'central' },
      ...tree.lower.map((label, i) => ({ id: `${tree.ids.lower}${i + 1}`, code: `${tree.ids.lower.toUpperCase()}${i + 1}`, label, row: 'lower', index: i })),
      ...tree.bottom.map((label, i) => ({ id: `${tree.ids.bottom}${i + 1}`, code: `${tree.ids.bottom.toUpperCase()}${i + 1}`, label, row: 'bottom', index: i }))
    ];
    const x = i => start + i * ((W - (2 * start) - nodeW) / 7);
    const pos = n => n.row === 'central' ? { x: W / 2 - nodeW / 2, y: 445 } : n.row === 'bottom' ? { x: W / 2 - nodeW / 2 - 280 + n.index * 280, y: 855 } : { x: x(n.index), y: n.row === 'top' ? 35 : n.row === 'middle' ? 235 : 650 };
    const center = p => p.x + nodeW / 2;
    const edge = (a, b, busY) => { const pa = pos(a), pb = pos(b); return `<path class="tree-edge" d="M ${center(pa)} ${pa.y + nodeH} V ${busY} H ${center(pb)} V ${pb.y}"/>`; };
    const top = nodes.filter(n => n.row === 'top'), middle = nodes.filter(n => n.row === 'middle'), lower = nodes.filter(n => n.row === 'lower'), bottom = nodes.filter(n => n.row === 'bottom'), central = nodes.find(n => n.row === 'central');
    const paths = [];
    top.forEach((n, i) => paths.push(edge(n, middle[i], 175)));
    middle.forEach(n => paths.push(edge(n, central, 420)));
    lower.forEach(n => paths.push(edge(central, n, 610)));
    bottom.forEach((n, i) => lower.slice(i * 3, i * 3 + 3).forEach(m => paths.push(edge(m, n, 825))));
    const renderedNodes = nodes.map(n => { const p = pos(n), lines = wrap(n.label, n.row === 'central' ? 29 : 24), cardId = getCard(n.id) ? n.id : ''; return `<g class="tree-node ${n.row === 'central' ? 'central' : ''}" tabindex="0" role="button" aria-label="${n.code}: ${n.label}" data-node-id="${n.id}" data-code="${n.code}" data-label="${n.label}" data-card-id="${cardId}" transform="translate(${p.x},${p.y})"><rect width="${nodeW}" height="${nodeH}" rx="0"/>${lines.map((line, j) => `<text x="${nodeW / 2}" y="${n.row === 'central' ? 35 + j * 27 : 32 + j * 23}" text-anchor="middle">${line}</text>`).join('')}</g>`; }).join('');
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Árbol de problemas interactivo"><g>${paths.join('')}</g><g>${renderedNodes}</g></svg>`;
    const dialog = document.createElement('dialog'); dialog.className = 'tree-dialog'; dialog.innerHTML = '<div class="tree-dialog-head"><h2 id="tree-dialog-title"></h2><button type="button" class="tree-dialog-close" aria-label="Cerrar ventana">Cerrar</button></div><div id="tree-dialog-body"></div>'; document.body.append(dialog);
    const open = node => { dialog.querySelector('#tree-dialog-title').textContent = `${node.dataset.code} · ${node.dataset.label}`; const body = dialog.querySelector('#tree-dialog-body'); body.replaceChildren(...(node.dataset.cardId ? cardContent(node.dataset.cardId) : [document.createTextNode('Este elemento forma parte de la relación causal del árbol de problemas.')])); dialog.showModal(); };
    host.querySelectorAll('.tree-node').forEach(node => { node.addEventListener('click', () => open(node)); node.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(node); } }); });
    dialog.querySelector('.tree-dialog-close').addEventListener('click', () => dialog.close()); dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  }
  document.querySelectorAll('.tree-map').forEach(host => host.dataset.treeKind === 'solution' ? renderMap(host, solution) : renderProblemMap(host, problem));
})();
