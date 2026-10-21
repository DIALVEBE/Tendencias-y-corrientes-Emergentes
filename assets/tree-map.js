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
  const wrapMany = (text, max = 20) => {
    const words = text.split(' '), lines = [], line = [];
    words.forEach(word => { if ((line.join(' ').length + word.length + 1) > max && line.length) { lines.push(line.join(' ')); line.length = 0; } line.push(word); });
    if (line.length) lines.push(line.join(' '));
    return lines;
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
    const W = 1920, H = 1080, nodeW = 230, nodeH = 108, start = 25;
    const nodes = [
      ...tree.top.map((label, i) => ({ id: `${tree.ids.top}${i + 1}`, code: `${tree.ids.top.toUpperCase()}${i + 1}`, label, row: 'top', index: i })),
      ...tree.middle.map((label, i) => ({ id: `${tree.ids.middle}${i + 1}`, code: `${tree.ids.middle.toUpperCase()}${i + 1}`, label, row: 'middle', index: i })),
      { ...tree.central, row: 'central' },
      ...tree.lower.map((label, i) => ({ id: `${tree.ids.lower}${i + 1}`, code: `${tree.ids.lower.toUpperCase()}${i + 1}`, label, row: 'lower', index: i })),
      ...tree.bottom.map((label, i) => ({ id: `${tree.ids.bottom}${i + 1}`, code: `${tree.ids.bottom.toUpperCase()}${i + 1}`, label, row: 'bottom', index: i }))
    ];
    const centralW = 520, centralH = 140;
    const x = i => start + i * ((W - (2 * start) - nodeW) / 7);
    const size = n => n.row === 'central' ? { w: centralW, h: centralH } : { w: nodeW, h: nodeH };
    const pos = n => n.row === 'central' ? { x: W / 2 - centralW / 2, y: 480 } : n.row === 'bottom' ? { x: W / 2 - nodeW / 2 - 300 + n.index * 300, y: 910 } : { x: x(n.index), y: n.row === 'top' ? 32 : n.row === 'middle' ? 270 : 700 };
    const center = n => pos(n).x + size(n).w / 2;
    const topPoint = n => pos(n).y;
    const bottomPoint = n => pos(n).y + size(n).h;
    const vertical = (n, y) => `M ${center(n)} ${bottomPoint(n)} V ${y}`;
    const downTo = (n, y) => `M ${center(n)} ${y} V ${topPoint(n)}`;
    const generatedDetails = {
      e1: '<p><strong>E1 · Menor autonomía para resolver y defender problemas.</strong></p><p>Cuando una solución llega terminada, disminuye la oportunidad de practicar, probar casos límite y explicar las decisiones propias.</p>',
      e2: '<p><strong>E2 · Abundancia de productos con comprensión superficial.</strong></p><p>La producción de materiales puede crecer sin que aumenten en la misma proporción la comprensión, la pertinencia o la calidad del aprendizaje.</p>',
      e3: '<p><strong>E3 · Calificaciones que reflejan de forma incompleta las competencias.</strong></p><p>Un producto correcto o visualmente convincente no siempre permite verificar el razonamiento y la competencia real.</p>',
      e4: '<p><strong>E4 · Errores repetidos y debilidad metacognitiva.</strong></p><p>Sin retroalimentación durante el proceso, los errores pueden mantenerse hasta el cierre de la actividad.</p>',
      e5: '<p><strong>E5 · Dificultad para transferir saberes.</strong></p><p>Cuando las tareas no se conectan con situaciones reales, resulta más difícil aplicar lo aprendido en un caso nuevo.</p>',
      e6: '<p><strong>E6 · Brechas ocultas por productos colectivos.</strong></p><p>El trabajo grupal puede ocultar vacíos técnicos si no existen momentos individuales de práctica y explicación.</p>',
      e7: '<p><strong>E7 · Participación y oportunidades asimétricas.</strong></p><p>Las diferencias de acceso, tiempo y competencias tecnológicas generan experiencias de aprendizaje desiguales.</p>',
      e8: '<p><strong>E8 · Tensiones de confianza y autoría.</strong></p><p>La falta de acuerdos sobre IA y autoría produce incertidumbre para estudiantes y docentes.</p>',
      i1: '<p><strong>I1 · Las tareas valoran principalmente el resultado terminado.</strong></p><p>Si no se solicitan evidencias de proceso, se vuelve difícil distinguir comprensión, apoyo recibido y autoría.</p>',
      i2: '<p><strong>I2 · Tiempo limitado para revisar propuestas automatizadas.</strong></p><p>La falta de rutinas de validación puede permitir que materiales plausibles contengan errores o no respondan al contexto del grupo.</p>',
      i3: '<p><strong>I3 · Instrumentos que priorizan la entrega.</strong></p><p>Una evaluación centrada en el archivo final deja pocas evidencias del razonamiento y de las decisiones tomadas.</p>',
      i4: '<p><strong>I4 · Faltan hitos intermedios y autoevaluación.</strong></p><p>Sin momentos para revisar y corregir, la retroalimentación llega cuando ya no puede transformar el aprendizaje.</p>',
      i5: '<p><strong>I5 · Escasa articulación con contextos reales.</strong></p><p>La desconexión entre asignaturas, problemas y experiencias reduce el sentido de las actividades.</p>',
      i6: '<p><strong>I6 · Se prioriza completar el proyecto grupal.</strong></p><p>La presión por terminar puede reducir la experimentación individual y la demostración de competencias.</p>',
      i7: '<p><strong>I7 · Diferencias en conectividad, equipos y tiempo.</strong></p><p>Las condiciones de acceso no son iguales para todas las personas y afectan la posibilidad de participar.</p>',
      i8: '<p><strong>I8 · Criterios heterogéneos sobre IA y autoría.</strong></p><p>Las reglas poco claras generan interpretaciones distintas y tensiones en la evaluación.</p>'
    };
    const top = nodes.filter(n => n.row === 'top'), middle = nodes.filter(n => n.row === 'middle'), lower = nodes.filter(n => n.row === 'lower'), bottom = nodes.filter(n => n.row === 'bottom'), central = nodes.find(n => n.row === 'central');
    const paths = [];
    top.forEach((n, i) => paths.push(`${vertical(n, 210)} ${downTo(middle[i], 210)}`));
    [[0, 1], [2, 3], [4, 5], [6, 7]].forEach(group => {
      const a = middle[group[0]], b = middle[group[1]], junction = (center(a) + center(b)) / 2;
      paths.push(`${vertical(a, 425)} H ${junction} ${vertical(b, 425)} H ${junction} V 450`);
    });
    paths.push(`M ${center(middle[0]) + (center(middle[1]) - center(middle[0])) / 2} 450 H ${center(middle[6]) + (center(middle[7]) - center(middle[6])) / 2} M ${center(central)} 450 V ${topPoint(central)}`);
    paths.push(`${vertical(central, 650)} M ${center(lower[0])} 650 H ${center(lower[7])}`);
    lower.forEach(n => paths.push(downTo(n, 650)));
    [[0, 1, 2], [3, 4, 5], [6, 7]].forEach((group, i) => {
      const groupNodes = group.map(index => lower[index]), first = groupNodes[0], last = groupNodes[groupNodes.length - 1], target = bottom[i], junction = center(target);
      paths.push(`${vertical(first, 855)} H ${junction} ${vertical(last, 855)} H ${junction} V ${topPoint(target)}`);
      groupNodes.slice(1, -1).forEach(n => paths.push(`${vertical(n, 855)} H ${junction}`));
    });
    const renderedNodes = nodes.map(n => { const p = pos(n), box = size(n), lines = n.row === 'central' ? wrapMany(n.label, 35) : wrapMany(n.label, 20), cardId = getCard(n.id) ? n.id : ''; return `<g class="tree-node ${n.row === 'central' ? 'central' : ''}" tabindex="0" role="button" aria-label="${n.code}: ${n.label}" data-node-id="${n.id}" data-code="${n.code}" data-label="${n.label}" data-card-id="${cardId}" transform="translate(${p.x},${p.y})"><rect width="${box.w}" height="${box.h}" rx="0"/>${lines.map((line, j) => `<text x="${box.w / 2}" y="${(box.h - (lines.length - 1) * 22) / 2 + j * 22}" text-anchor="middle">${line}</text>`).join('')}</g>`; }).join('');
    const pathMarkup = paths.map(d => `<path class="tree-edge" d="${d}"/>`).join('');
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Árbol de problemas interactivo"><g>${pathMarkup}</g><g>${renderedNodes}</g></svg>`;
    const dialog = document.createElement('dialog'); dialog.className = 'tree-dialog'; dialog.innerHTML = '<div class="tree-dialog-head"><h2 id="tree-dialog-title"></h2><button type="button" class="tree-dialog-close" aria-label="Cerrar ventana">Cerrar</button></div><div id="tree-dialog-body"></div>'; document.body.append(dialog);
    const open = node => { dialog.querySelector('#tree-dialog-title').textContent = `${node.dataset.code} · ${node.dataset.label}`; const body = dialog.querySelector('#tree-dialog-body'); const detail = node.dataset.cardId ? cardContent(node.dataset.cardId) : null; body.innerHTML = ''; if (detail) body.replaceChildren(...detail); else body.innerHTML = generatedDetails[node.dataset.nodeId] || '<p>Este elemento forma parte de la relación causal del árbol de problemas.</p>'; dialog.showModal(); };
    host.querySelectorAll('.tree-node').forEach(node => { node.addEventListener('click', () => open(node)); node.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(node); } }); });
    dialog.querySelector('.tree-dialog-close').addEventListener('click', () => dialog.close()); dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  }
  function renderSolutionMap(host, tree) {
    const W = 1920, H = 1080, nodeW = 230, nodeH = 108, start = 25;
    const nodes = [
      ...tree.top.map((label, i) => ({ id: `${tree.ids.top}${i + 1}`, code: `${tree.ids.top.toUpperCase()}${i + 1}`, label, row: 'top', index: i })),
      ...tree.middle.map((label, i) => ({ id: `${tree.ids.middle}${i + 1}`, code: `${tree.ids.middle.toUpperCase()}${i + 1}`, label, row: 'middle', index: i })),
      { ...tree.central, row: 'central' },
      ...tree.lower.map((label, i) => ({ id: `${tree.ids.lower}${i + 1}`, code: `${tree.ids.lower.toUpperCase()}${i + 1}`, label, row: 'lower', index: i })),
      ...tree.bottom.map((label, i) => ({ id: `${tree.ids.bottom}${i + 1}`, code: `${tree.ids.bottom.toUpperCase()}${i + 1}`, label, row: 'bottom', index: i }))
    ];
    const centralW = 600, centralH = 140;
    const x = i => start + i * ((W - (2 * start) - nodeW) / 7);
    const size = n => n.row === 'central' ? { w: centralW, h: centralH } : { w: nodeW, h: nodeH };
    const pos = n => n.row === 'central' ? { x: W / 2 - centralW / 2, y: 480 } : n.row === 'bottom' ? { x: W / 2 - nodeW / 2 - 300 + n.index * 300, y: 910 } : { x: x(n.index), y: n.row === 'top' ? 32 : n.row === 'middle' ? 270 : 700 };
    const center = n => pos(n).x + size(n).w / 2;
    const topPoint = n => pos(n).y;
    const bottomPoint = n => pos(n).y + size(n).h;
    const vertical = (n, y) => `M ${center(n)} ${bottomPoint(n)} V ${y}`;
    const downTo = (n, y) => `M ${center(n)} ${y} V ${topPoint(n)}`;
    const generatedDetails = {
      l1: '<p><strong>L1 · Mayor autonomía y capacidad de justificar decisiones.</strong></p><p>Se espera que el estudiante pueda resolver, explicar y adaptar una solución sin depender de una respuesta automática.</p>',
      l2: '<p><strong>L2 · Materiales pertinentes y comprensión acompañada.</strong></p><p>La validación docente mejora la exactitud, el contexto y el nivel de dificultad de los materiales.</p>',
      l3: '<p><strong>L3 · Evidencias fiables y notas mejor justificadas.</strong></p><p>Valorar proceso, avances y explicaciones permite fundamentar mejor la evaluación.</p>',
      l4: '<p><strong>L4 · Menos errores repetidos y mejor autorregulación.</strong></p><p>Los ciclos de retroalimentación permiten corregir antes del cierre y explicar las mejoras.</p>',
      l5: '<p><strong>L5 · Mayor transferencia y pertinencia social.</strong></p><p>Los retos situados conectan las competencias con problemas y datos del contexto.</p>',
      l6: '<p><strong>L6 · Participación equilibrada y práctica verificable.</strong></p><p>Los microretos individuales hacen visible la práctica antes de la colaboración.</p>',
      l7: '<p><strong>L7 · Oportunidades más equitativas.</strong></p><p>Conocer condiciones de acceso permite ajustar recursos y formas de participación.</p>',
      l8: '<p><strong>L8 · Confianza y consistencia en la autoría.</strong></p><p>Reglas transparentes reducen la incertidumbre y hacen más coherente la evaluación.</p>',
      m1: '<p><strong>M1 · Intento propio antes de consultar IA.</strong></p><p>Solicitar una primera solución, registrar la consulta y explicar qué se aceptó o modificó.</p>',
      m2: '<p><strong>M2 · Ejecutar y revisar cada ejemplo generado.</strong></p><p>Comprobar exactitud, contexto y nivel de dificultad antes de usar materiales con el grupo.</p>',
      m3: '<p><strong>M3 · Dividir actividades en planteamiento y avance.</strong></p><p>Recoger evidencias progresivas del razonamiento, las pruebas y las decisiones.</p>',
      m4: '<p><strong>M4 · Programar hitos de revisión y segunda versión.</strong></p><p>Incluir retroalimentación, autoevaluación y una corrección justificada.</p>',
      m5: '<p><strong>M5 · Proponer retos con datos y contextos reales.</strong></p><p>Usar problemas situados para conectar las competencias con necesidades concretas.</p>',
      m6: '<p><strong>M6 · Iniciar cada bloque con un microreto individual.</strong></p><p>Practicar primero y colaborar después para hacer visibles los aprendizajes de cada persona.</p>',
      m7: '<p><strong>M7 · Consultar condiciones de acceso sin exponer a nadie.</strong></p><p>Identificar barreras de conectividad, equipos, tiempo y competencias para ajustar la actividad.</p>',
      m8: '<p><strong>M8 · Construir acuerdos sobre IA y autoría.</strong></p><p>Definir ejemplos concretos de usos permitidos, declaración de apoyos y criterios de evaluación.</p>'
    };
    const top = nodes.filter(n => n.row === 'top'), middle = nodes.filter(n => n.row === 'middle'), lower = nodes.filter(n => n.row === 'lower'), bottom = nodes.filter(n => n.row === 'bottom'), central = nodes.find(n => n.row === 'central');
    const paths = [];
    top.forEach((n, i) => paths.push(`${vertical(n, 210)} ${downTo(middle[i], 210)}`));
    [[0, 1], [2, 3], [4, 5], [6, 7]].forEach(group => { const a = middle[group[0]], b = middle[group[1]], junction = (center(a) + center(b)) / 2; paths.push(`${vertical(a, 425)} H ${junction} ${vertical(b, 425)} H ${junction} V 450`); });
    paths.push(`M ${(center(middle[0]) + center(middle[1])) / 2} 450 H ${(center(middle[6]) + center(middle[7])) / 2} M ${center(central)} 450 V ${topPoint(central)}`);
    paths.push(`${vertical(central, 650)} M ${center(lower[0])} 650 H ${center(lower[7])}`);
    lower.forEach(n => paths.push(downTo(n, 650)));
    [[0, 1, 2, 3], [4, 5], [6, 7]].forEach((group, i) => { const groupNodes = group.map(index => lower[index]), first = groupNodes[0], last = groupNodes[groupNodes.length - 1], target = bottom[i], junction = center(target); paths.push(`${vertical(first, 855)} H ${junction} ${vertical(last, 855)} H ${junction} V ${topPoint(target)}`); groupNodes.slice(1, -1).forEach(n => paths.push(`${vertical(n, 855)} H ${junction}`)); });
    const renderedNodes = nodes.map(n => { const p = pos(n), box = size(n), lines = n.row === 'central' ? wrapMany(n.label, 38) : wrapMany(n.label, 20), cardId = getCard(n.id) ? n.id : ''; return `<g class="tree-node ${n.row === 'central' ? 'central' : ''}" tabindex="0" role="button" aria-label="${n.code}: ${n.label}" data-node-id="${n.id}" data-code="${n.code}" data-label="${n.label}" data-card-id="${cardId}" transform="translate(${p.x},${p.y})"><rect width="${box.w}" height="${box.h}" rx="0"/>${lines.map((line, j) => `<text x="${box.w / 2}" y="${(box.h - (lines.length - 1) * 22) / 2 + j * 22}" text-anchor="middle">${line}</text>`).join('')}</g>`; }).join('');
    const pathMarkup = paths.map(d => `<path class="tree-edge" d="${d}"/>`).join('');
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Árbol de soluciones interactivo"><g>${pathMarkup}</g><g>${renderedNodes}</g></svg>`;
    const dialog = document.createElement('dialog'); dialog.className = 'tree-dialog'; dialog.innerHTML = '<div class="tree-dialog-head"><h2 id="tree-dialog-title"></h2><button type="button" class="tree-dialog-close" aria-label="Cerrar ventana">Cerrar</button></div><div id="tree-dialog-body"></div>'; document.body.append(dialog);
    const open = node => { dialog.querySelector('#tree-dialog-title').textContent = `${node.dataset.code} · ${node.dataset.label}`; const body = dialog.querySelector('#tree-dialog-body'); const detail = node.dataset.cardId ? cardContent(node.dataset.cardId) : null; body.innerHTML = ''; if (detail) body.replaceChildren(...detail); else body.innerHTML = generatedDetails[node.dataset.nodeId] || '<p>Este elemento forma parte de la relación de objetivos y medidas del árbol de soluciones.</p>'; dialog.showModal(); };
    host.querySelectorAll('.tree-node').forEach(node => { node.addEventListener('click', () => open(node)); node.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(node); } }); });
    dialog.querySelector('.tree-dialog-close').addEventListener('click', () => dialog.close()); dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  }
  document.querySelectorAll('.tree-map').forEach(host => host.dataset.treeKind === 'solution' ? renderSolutionMap(host, solution) : renderProblemMap(host, problem));
})();
