
let lang = localStorage.getItem('teamways_lang') || 'en';
let darkMode = localStorage.getItem('teamways_dark') === 'true';
if (darkMode) document.body.classList.add('dark');
let currentView = 'landing';
let userAnswers = JSON.parse(localStorage.getItem('teamways_answers') || '{}');
let userNotes = JSON.parse(localStorage.getItem('teamways_notes') || '{}');
let agreement = (() => {
  try {
    const stored = localStorage.getItem('teamways_agreement');
    if (stored && stored !== 'null') {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch (e) {}
  const base = (typeof AGREEMENT_TEMPLATE !== 'undefined' && AGREEMENT_TEMPLATE[lang]) ? AGREEMENT_TEMPLATE[lang] : {};
  return { ...base, owner: '', reviewDate: '' };
})();
let userName = localStorage.getItem('teamways_name') || '';

function t(key) {
  return UI_STRINGS[lang][key] || key;
}

function saveState() {
  localStorage.setItem('teamways_answers', JSON.stringify(userAnswers));
  localStorage.setItem('teamways_notes', JSON.stringify(userNotes));
  localStorage.setItem('teamways_agreement', JSON.stringify(agreement));
  localStorage.setItem('teamways_name', userName);
  localStorage.setItem('teamways_lang', lang);
}

function clearAll() {
  if (confirm(lang === 'en' ? 'Clear all saved demo data in this browser?' : '¿Borrar todos los datos demo guardados en este navegador?')) {
    localStorage.removeItem('teamways_answers');
    localStorage.removeItem('teamways_notes');
    localStorage.removeItem('teamways_agreement');
    localStorage.removeItem('teamways_name');
    userAnswers = {};
    userNotes = {};
    agreement = { ...AGREEMENT_TEMPLATE[lang], owner: '', reviewDate: '' };
    userName = '';
    render();
  }
}

function computeScores() {
  const scores = {};
  TOPICS.forEach(topic => {
    const qs = QUESTIONS.filter(q => q.topic === topic.id);
    const answered = qs.map(q => userAnswers[q.id]).filter(v => v !== null && v !== undefined);
    if (answered.length < 2) {
      scores[topic.id] = null;
    } else {
      // Deterministic average. Values already -1/0/1. Reverse handled in data if needed.
      const avg = answered.reduce((a, b) => a + b, 0) / answered.length;
      scores[topic.id] = Math.round(avg * 100) / 100; // two decimals for display stability
    }
  });
  return scores;
}

function tendencyText(score) {
  if (score === null) return t('insufficient');
  if (score > 0.4) return lang === 'en' ? 'Tends toward more direct / structured / explicit approaches in this area.' : 'Tiende hacia enfoques más directos / estructurados / explícitos en esta área.';
  if (score < -0.4) return lang === 'en' ? 'Tends toward more contextual / relational / flexible approaches in this area.' : 'Tiende hacia enfoques más contextuales / relacionales / flexibles en esta área.';
  return lang === 'en' ? 'Balanced or situation-dependent in this area.' : 'Equilibrado o dependiente de la situación en esta área.';
}

function render() {
  const app = document.getElementById('app');
  const headerNav = `
    <button onclick="setView('landing')">${t('title')}</button>
    <button onclick="setView('questionnaire')">${t('questionnaire')}</button>
    <button onclick="setView('profile')">${t('profile')}</button>
    <button onclick="setView('compare')">${t('compare')}</button>
    <button onclick="setView('coach')">${t('coach')}</button>
    <button onclick="setView('practice')">${t('practice')}</button>
    <button onclick="setView('agreement')">${t('agreement')}</button>
    <button onclick="toggleLang()">${t('lang')}</button>
    <button onclick="toggleDark()">${darkMode ? (lang === 'en' ? '☀️ Light' : '☀️ Claro') : (lang === 'en' ? '🌙 Dark' : '🌙 Oscuro')}</button>
    <button class="btn-secondary" onclick="clearAll()">${t('clear')}</button>
  `;
  document.getElementById('nav').innerHTML = headerNav;

  if (currentView === 'landing') {
    app.innerHTML = `
      <div class="card hero">
        <h2>${t('title')}</h2>
        <p style="font-size:1.15rem; max-width:640px; margin:0 auto 1rem;">${t('tagline')}</p>
        <p class="note">${t('demoNote')}</p>
        <div style="margin:1.5rem 0;">
          <button class="btn btn-coral" onclick="setView('questionnaire')">${t('start')}</button>
          <button class="btn btn-secondary" onclick="setView('questionnaire')">${t('create')}</button>
        </div>
      </div>
      <div class="feature-grid">
        <div class="feature-card"><span>📝</span><strong>${lang === 'en' ? 'Reflect' : 'Reflexiona'}</strong><br>${lang === 'en' ? '18 short workplace scenarios' : '18 escenarios cortos de trabajo'}</div>
        <div class="feature-card"><span>👥</span><strong>${lang === 'en' ? 'Compare' : 'Compara'}</strong><br>${lang === 'en' ? 'See similarities & discussion points' : 'Ve similitudes y puntos de discusión'}</div>
        <div class="feature-card"><span>💬</span><strong>${lang === 'en' ? 'Practice' : 'Practica'}</strong><br>${lang === 'en' ? 'Coach & scenario practice' : 'Coach y práctica de escenarios'}</div>
        <div class="feature-card"><span>🤝</span><strong>${lang === 'en' ? 'Agree' : 'Acuerda'}</strong><br>${lang === 'en' ? 'Draft a team working agreement' : 'Redacta un acuerdo de equipo'}</div>
      </div>
      <div class="card">
        <h3>${lang === 'en' ? 'How it works' : 'Cómo funciona'}</h3>
        <ol>
          <li>${lang === 'en' ? 'Answer short scenario questions about everyday workplace situations.' : 'Responde preguntas cortas de escenarios sobre situaciones cotidianas de trabajo.'}</li>
          <li>${lang === 'en' ? 'See your provisional self-reported preferences (individual answers only — no national assumptions).' : 'Ve tus preferencias provisionales autoinformadas (solo respuestas individuales — sin suposiciones nacionales).'}</li>
          <li>${lang === 'en' ? 'Compare with a demo colleague, practice conversations, and draft a team agreement.' : 'Compara con un colega demo, practica conversaciones y redacta un acuerdo de equipo.'}</li>
        </ol>
        <p class="provisional">${t('provisional')}</p>
        <p class="note">${lang === 'en' ? 'Individual preferences take priority. Differences are discussion topics, not rankings. Not for hiring or performance decisions.' : 'Las preferencias individuales tienen prioridad. Las diferencias son temas de discusión, no rankings. No para decisiones de contratación o desempeño.'}</p>
      </div>
    `;
  } else if (currentView === 'questionnaire') {
    const answeredCount = Object.keys(userAnswers).length;
    const progress = Math.round((answeredCount / QUESTIONS.length) * 100);
    const topicIcons = { clarity: '💬', feedback: '📝', participation: '🗳️', relationships: '🤝', disagreement: '⚖️', planning: '📅' };
    let html = `<div class="card"><h2>${t('questionnaire')}</h2>
      <div class="progress-wrap"><div class="progress-bar" style="width:${progress}%"></div></div>
      <p class="note">${answeredCount} / ${QUESTIONS.length} ${lang === 'en' ? 'answered' : 'respondidas'} · ${lang === 'en' ? 'Answer at least two per topic for a result. “It depends” and Skip are valid.' : 'Responde al menos dos por tema para un resultado. “Depende” y Omitir son válidos.'}</p>
      ${progress === 100 ? `<div class="provisional">${lang === 'en' ? '🎉 Questionnaire complete! Review your provisional profile next.' : '🎉 ¡Cuestionario completo! Revisa tu perfil provisional a continuación.'}</div>` : ''}
      <label>${lang === 'en' ? 'Your name (optional, for demo)' : 'Tu nombre (opcional, para demo)'}</label>
      <input type="text" id="userName" value="${userName}" onchange="userName=this.value; saveState();">`;
    let lastTopic = '';
    QUESTIONS.forEach(q => {
      if (q.topic !== lastTopic) {
        const topic = TOPICS.find(t => t.id === q.topic);
        html += `<h3><span class="topic-icon">${topicIcons[q.topic] || '•'}</span>${topic[lang]}</h3>`;
        lastTopic = q.topic;
      }
      const qText = q[lang];
      html += `<div class="question"><p><strong>${qText}</strong></p>`;
      q.options.forEach(opt => {
        const checked = userAnswers[q.id] === opt.value ? 'checked' : '';
        html += `<label><input type="radio" name="${q.id}" value="${opt.value}" ${checked} onchange="saveAnswer('${q.id}', ${opt.value === null ? 'null' : opt.value}); render();"> ${opt[lang]}</label>`;
      });
      html += `</div>`;
    });
    html += `<button class="btn btn-coral" onclick="setView('profile')">${lang === 'en' ? 'See my profile' : 'Ver mi perfil'}</button></div>`;
    app.innerHTML = html;
  } else if (currentView === 'profile') {
    const scores = computeScores();
    const topicIcons = { clarity: '💬', feedback: '📝', participation: '🗳️', relationships: '🤝', disagreement: '⚖️', planning: '📅' };
    let html = `<div class="card"><h2>${t('profile')}</h2>
      <p class="provisional">${t('provisional')}</p>
      <p><strong>${lang === 'en' ? 'Name' : 'Nombre'}:</strong> ${userName || (lang === 'en' ? '(not set)' : '(no establecido)')}</p>`;
    TOPICS.forEach(topic => {
      const score = scores[topic.id];
      html += `<h3><span class="topic-icon">${topicIcons[topic.id] || '•'}</span>${topic[lang]}</h3>`;
      html += `<p>${tendencyText(score)}</p>`;
      if (score !== null) {
        const pos = ((score + 1) / 2) * 100;
        html += `<div class="bar-container"><span class="bar-label">${lang === 'en' ? 'Contextual' : 'Contextual'}</span>
          <div class="bar"><div class="bar-fill" style="width:${pos}%"></div><div class="bar-marker" style="left:${pos}%"></div></div>
          <span class="bar-label">${lang === 'en' ? 'Explicit' : 'Explícito'}</span></div>`;
      } else {
        html += `<p class="note">${t('insufficient')}</p>`;
      }
      html += `<label>${lang === 'en' ? 'Contextual note (optional)' : 'Nota contextual (opcional)'}</label>
        <textarea onchange="userNotes['${topic.id}']=this.value; saveState();" placeholder="${lang === 'en' ? 'How does context affect this for you?' : '¿Cómo afecta el contexto esto para ti?'}">${userNotes[topic.id] || ''}</textarea>`;
    });
    html += `<button class="btn btn-secondary" onclick="shareSummary()">${lang === 'en' ? 'Copy summary' : 'Copiar resumen'}</button>
      <button class="btn btn-coral" onclick="setView('compare')">${t('compare')}</button></div>`;
    app.innerHTML = html;
  } else if (currentView === 'compare') {
    const scores = computeScores();
    let html = `<div class="card"><h2>${t('compare')}</h2>
      <p>${lang === 'en' ? 'Comparing with fictional demo colleague Alex Rivera. Only compare with people who explicitly share their profile.' : 'Comparando con el colega demo ficticio Alex Rivera. Solo compara con personas que compartan explícitamente su perfil.'}</p>
      <p class="provisional">${t('provisional')}</p>`;
    TOPICS.forEach(topic => {
      const my = scores[topic.id];
      const their = DEMO_PROFILE.scores[topic.id];
      html += `<h3>${topic[lang]}</h3>`;
      if (my === null) {
        html += `<p class="error">${t('insufficient')}</p>`;
      } else {
        const myPos = ((my + 1) / 2) * 100;
        const theirPos = ((their + 1) / 2) * 100;
        html += `<div class="bar-container"><span class="bar-label">You</span>
          <div class="bar"><div class="bar-fill" style="width:${myPos}%; background:var(--teal)"></div><div class="bar-marker" style="left:${myPos}%"></div></div></div>
          <div class="bar-container"><span class="bar-label">Alex</span>
          <div class="bar"><div class="bar-fill" style="width:${theirPos}%; background:var(--coral)"></div><div class="bar-marker" style="left:${theirPos}%"></div></div></div>`;
        const diff = Math.abs(my - their);
        if (diff < 0.3) html += `<p>${lang === 'en' ? 'Area of similarity — good starting point for shared norms.' : 'Área de similitud — buen punto de partida para normas compartidas.'}</p>`;
        else html += `<p>${lang === 'en' ? 'Difference worth discussing — possible different assumptions about what “good” looks like here.' : 'Diferencia que vale la pena discutir — posibles supuestos diferentes sobre cómo se ve “bueno” aquí.'}</p>`;
      }
    });
    html += `<h3>${lang === 'en' ? 'Possible misunderstandings (hypotheses only)' : 'Posibles malentendidos (solo hipótesis)'}</h3>
      <ul>
        <li>${lang === 'en' ? 'One person may expect early clarification while the other assumes shared context.' : 'Una persona puede esperar aclaración temprana mientras la otra asume contexto compartido.'}</li>
        <li>${lang === 'en' ? 'Direct feedback may be read as helpful or as overly blunt depending on preference.' : 'La retroalimentación directa puede leerse como útil o como demasiado franca según la preferencia.'}</li>
      </ul>
      <h3>${lang === 'en' ? 'Questions to ask each other' : 'Preguntas para hacerse'}</h3>
      <ul>
        <li>${lang === 'en' ? 'What does a clear message look like to you in this team?' : '¿Cómo se ve un mensaje claro para ti en este equipo?'}</li>
        <li>${lang === 'en' ? 'How do you prefer to hear about something that needs improvement?' : '¿Cómo prefieres escuchar sobre algo que necesita mejora?'}</li>
      </ul>
      <h3>${lang === 'en' ? 'Three suggested working agreements (drafts)' : 'Tres acuerdos de trabajo sugeridos (borradores)'}</h3>
      <ul>
        <li>${lang === 'en' ? 'We confirm understanding of important messages with a short summary.' : 'Confirmamos la comprensión de mensajes importantes con un breve resumen.'}</li>
        <li>${lang === 'en' ? 'Feedback on work is specific and given within two days of the event when possible.' : 'La retroalimentación sobre el trabajo es específica y se da dentro de dos días del evento cuando es posible.'}</li>
        <li>${lang === 'en' ? 'Concerns about deadlines are raised as soon as a risk is known.' : 'Las preocupaciones sobre plazos se plantean tan pronto como se conoce un riesgo.'}</li>
      </ul>
      <button class="btn" onclick="setView('agreement')">${lang === 'en' ? 'Draft full agreement' : 'Redactar acuerdo completo'}</button>
    </div>`;
    app.innerHTML = html;
  } else if (currentView === 'coach') {
    const types = [
      { id: 'feedback', en: 'Giving constructive feedback', es: 'Dar retroalimentación constructiva' },
      { id: 'clarify', en: 'Clarifying an ambiguous message', es: 'Aclarar un mensaje ambiguo' },
      { id: 'disagree', en: 'Disagreeing with a colleague or manager', es: 'Estar en desacuerdo con un colega o gerente' },
      { id: 'deadline', en: 'Addressing a missed deadline', es: 'Abordar un plazo no cumplido' },
      { id: 'meeting', en: 'Running an inclusive meeting', es: 'Dirigir una reunión inclusiva' },
      { id: 'decision', en: 'Communicating a decision', es: 'Comunicar una decisión' }
    ];
    let html = `<div class="card"><h2>${t('coach')}</h2>
      <p class="note">${lang === 'en' ? 'Sample coaching responses (not live AI). Preserve facts and accountability.' : 'Respuestas de coaching de muestra (no IA en vivo). Preservar hechos y responsabilidad.'}</p>
      <label>${lang === 'en' ? 'Conversation type' : 'Tipo de conversación'}</label>
      <select id="coachType">
        ${types.map(ty => `<option value="${ty.id}">${ty[lang]}</option>`).join('')}
      </select>
      <label>${lang === 'en' ? 'Situation (facts only)' : 'Situación (solo hechos)'}</label>
      <textarea id="situation" rows="3" placeholder="${lang === 'en' ? 'What happened...' : 'Qué pasó...'}"></textarea>
      <label>${lang === 'en' ? 'Desired outcome' : 'Resultado deseado'}</label>
      <input type="text" id="outcome">
      <label>${lang === 'en' ? 'Relationship' : 'Relación'}</label>
      <input type="text" id="relationship" placeholder="${lang === 'en' ? 'Colleague, manager, etc. (no names required)' : 'Colega, gerente, etc. (no se requieren nombres)'}">
      <button class="btn" onclick="showCoach()">${lang === 'en' ? 'Generate sample guidance' : 'Generar guía de muestra'}</button>
      <div id="coachResult"></div>
    </div>`;
    app.innerHTML = html;
  } else if (currentView === 'practice') {
    let html = `<div class="card"><h2>${t('practice')}</h2>
      <p class="note">${lang === 'en' ? 'Choose a response or write your own. Feedback is supportive, not a single correct answer.' : 'Elige una respuesta o escribe la tuya. La retroalimentación es de apoyo, no una única respuesta correcta.'}</p>`;
    SCENARIOS.forEach(s => {
      html += `<div class="question">
        ${s.image ? `<img src="${s.image}" alt="" style="width:100%; max-height:220px; object-fit:cover; border-radius:12px; margin-bottom:0.75rem;">` : ''}
        <p><strong>${s[lang]}</strong></p>`;
      s.options.forEach((opt, i) => {
        html += `<button class="btn btn-secondary" style="margin:0.3rem 0.3rem 0.3rem 0; display:inline-block;" onclick="practiceFeedback('${s.id}', ${i})">${opt[lang]}</button>`;
      });
      html += `<div id="fb-${s.id}"></div></div>`;
    });
    html += `</div>`;
    app.innerHTML = html;
  } else if (currentView === 'agreement') {
    const tmpl = AGREEMENT_TEMPLATE[lang];
    if (!agreement.channels) agreement = { ...tmpl, owner: '', reviewDate: '' };
    let html = `<div class="card" id="agreementPrint">
      <h2>${t('agreement')}</h2>
      <p class="note">${lang === 'en' ? 'Suggestions remain drafts until people agree. Owner and review date recommended.' : 'Las sugerencias siguen siendo borradores hasta que la gente esté de acuerdo. Se recomienda dueño y fecha de revisión.'}</p>
      <label>${lang === 'en' ? 'Owner' : 'Responsable'}</label>
      <input type="text" id="owner" value="${agreement.owner || ''}" onchange="agreement.owner=this.value; saveState();">
      <label>${lang === 'en' ? 'Review date' : 'Fecha de revisión'}</label>
      <input type="date" id="reviewDate" value="${agreement.reviewDate || ''}" onchange="agreement.reviewDate=this.value; saveState();">
      <label>${lang === 'en' ? 'Communication channels and response expectations' : 'Canales de comunicación y expectativas de respuesta'}</label>
      <textarea id="channels" rows="3" onchange="agreement.channels=this.value; saveState();">${agreement.channels || tmpl.channels}</textarea>
      <label>${lang === 'en' ? 'Meeting participation' : 'Participación en reuniones'}</label>
      <textarea id="meetings" rows="3" onchange="agreement.meetings=this.value; saveState();">${agreement.meetings || tmpl.meetings}</textarea>
      <label>${lang === 'en' ? 'Decision ownership and consultation' : 'Propiedad de decisiones y consulta'}</label>
      <textarea id="decisions" rows="3" onchange="agreement.decisions=this.value; saveState();">${agreement.decisions || tmpl.decisions}</textarea>
      <label>${lang === 'en' ? 'Feedback preferences' : 'Preferencias de retroalimentación'}</label>
      <textarea id="feedback" rows="3" onchange="agreement.feedback=this.value; saveState();">${agreement.feedback || tmpl.feedback}</textarea>
      <label>${lang === 'en' ? 'Raising concerns and resolving disagreements' : 'Plantear preocupaciones y resolver desacuerdos'}</label>
      <textarea id="concerns" rows="3" onchange="agreement.concerns=this.value; saveState();">${agreement.concerns || tmpl.concerns}</textarea>
      <label>${lang === 'en' ? 'Deadlines and changes to plans' : 'Plazos y cambios a planes'}</label>
      <textarea id="deadlines" rows="3" onchange="agreement.deadlines=this.value; saveState();">${agreement.deadlines || tmpl.deadlines}</textarea>
      <button class="btn no-print" onclick="window.print()">${lang === 'en' ? 'Print / Export' : 'Imprimir / Exportar'}</button>
      <p class="success no-print">${lang === 'en' ? 'Saved locally in this browser.' : 'Guardado localmente en este navegador.'}</p>
    </div>`;
    app.innerHTML = html;
  }
}

function practiceExamples(topicId, score) {
  if (score === null) return '';
  const examples = {
    clarity: {
      en: score > 0.3 ? 'In practice: you might summarise key points and ask “Does that match what you heard?” before ending a message.' : 'In practice: you might share background first and invite questions when the other person is ready.',
      es: score > 0.3 ? 'En la práctica: podrías resumir puntos clave y preguntar “¿Coincide con lo que escuchaste?” antes de terminar un mensaje.' : 'En la práctica: podrías compartir contexto primero e invitar preguntas cuando la otra persona esté lista.'
    },
    feedback: {
      en: score > 0.3 ? 'In practice: you might give specific observations soon after the work is done.' : 'In practice: you might start with what went well and choose a private moment.',
      es: score > 0.3 ? 'En la práctica: podrías dar observaciones específicas poco después de que se haga el trabajo.' : 'En la práctica: podrías empezar con lo que salió bien y elegir un momento privado.'
    },
    participation: {
      en: score > 0.3 ? 'In practice: you might speak early in meetings and expect clear ownership of decisions.' : 'In practice: you might listen first and prefer consensus or private input before deciding.',
      es: score > 0.3 ? 'En la práctica: podrías hablar temprano en reuniones y esperar propiedad clara de las decisiones.' : 'En la práctica: podrías escuchar primero y preferir consenso o aportación privada antes de decidir.'
    },
    relationships: {
      en: score > 0.3 ? 'In practice: you might focus mainly on shared tasks and reliable delivery.' : 'In practice: you might also value occasional personal check-ins.',
      es: score > 0.3 ? 'En la práctica: podrías enfocarte principalmente en tareas compartidas y entrega confiable.' : 'En la práctica: también podrías valorar chequeos personales ocasionales.'
    },
    disagreement: {
      en: score > 0.3 ? 'In practice: you might raise concerns directly and focus on facts and next steps.' : 'In practice: you might first acknowledge the other view and explore feelings before solving.',
      es: score > 0.3 ? 'En la práctica: podrías plantear preocupaciones directamente y enfocarte en hechos y próximos pasos.' : 'En la práctica: podrías primero reconocer la otra visión y explorar sentimientos antes de resolver.'
    },
    planning: {
      en: score > 0.3 ? 'In practice: you might set clear milestones early and flag risks as soon as you see them.' : 'In practice: you might prefer a flexible outline and discuss changes together.',
      es: score > 0.3 ? 'En la práctica: podrías establecer hitos claros temprano y señalar riesgos tan pronto como los veas.' : 'En la práctica: podrías preferir un esquema flexible y discutir cambios juntos.'
    }
  };
  return examples[topicId] ? `<p class="note">${examples[topicId][lang]}</p>` : '';
}

function shareSummary() {
  const scores = computeScores();
  let text = lang === 'en' ? 'My TeamWays provisional preferences:\n' : 'Mis preferencias provisionales de TeamWays:\n';
  TOPICS.forEach(topic => {
    text += `\n${topic[lang]}: ${tendencyText(scores[topic.id])}`;
  });
  text += lang === 'en' ? '\n\n(Provisional self-reported reflection tool — not a validated assessment.)' : '\n\n(Herramienta de reflexión provisional autoinformada — no evaluación validada.)';
  navigator.clipboard.writeText(text).then(() => {
    alert(lang === 'en' ? 'Summary copied to clipboard!' : '¡Resumen copiado al portapapeles!');
  }).catch(() => {
    alert(lang === 'en' ? 'Could not copy — please select and copy the text manually.' : 'No se pudo copiar — por favor selecciona y copia el texto manualmente.');
  });
}

function saveAnswer(id, value) {
  userAnswers[id] = value;
  saveState();
}

function setView(view) {
  currentView = view;
  render();
}

function toggleLang() {
  lang = lang === 'en' ? 'es' : 'en';
  localStorage.setItem('teamways_lang', lang);
  render();
}

function toggleDark() {
  darkMode = !darkMode;
  document.body.classList.toggle('dark', darkMode);
  localStorage.setItem('teamways_dark', darkMode);
  render();
}

function showCoach() {
  const type = document.getElementById('coachType').value;
  const sample = COACH_SAMPLES[type][lang];
  const situation = document.getElementById('situation').value || (lang === 'en' ? '(no situation entered)' : '(sin situación)');
  const outcome = document.getElementById('outcome').value || (lang === 'en' ? '(no outcome entered)' : '(sin resultado)');
  document.getElementById('coachResult').innerHTML = `
    <div class="provisional">${lang === 'en' ? 'Sample guidance — not generated by live AI.' : 'Guía de muestra — no generada por IA en vivo.'}</div>
    <h3>1. ${lang === 'en' ? 'What is known and what remains uncertain' : 'Qué se conoce y qué permanece incierto'}</h3>
    <p>${sample.known} Situation: ${situation}. Desired: ${outcome}.</p>
    <p>${sample.uncertain}</p>
    <h3>2. ${lang === 'en' ? 'Possible interpretations to check' : 'Posibles interpretaciones a verificar'}</h3>
    <ul>${sample.interpretations.map(i => `<li>${i}</li>`).join('')}</ul>
    <h3>3. ${lang === 'en' ? 'Suggested opening' : 'Apertura sugerida'}</h3>
    <p>${sample.opening}</p>
    <h3>4. ${lang === 'en' ? 'Clear statement of the issue and desired outcome' : 'Declaración clara del tema y resultado deseado'}</h3>
    <p>${sample.statement}</p>
    <h3>5. ${lang === 'en' ? 'Questions to understand the other person’s perspective' : 'Preguntas para entender la perspectiva de la otra persona'}</h3>
    <ul>${sample.questions.map(q => `<li>${q}</li>`).join('')}</ul>
    <h3>6. ${lang === 'en' ? 'Two alternative phrasings and their tradeoffs' : 'Dos redacciones alternativas y sus compensaciones'}</h3>
    ${sample.alternatives.map(a => `<p><strong>${a.text}</strong><br><em>${a.tradeoff}</em></p>`).join('')}
    <h3>7. ${lang === 'en' ? 'Proposed next step' : 'Siguiente paso propuesto'}</h3>
    <p>${sample.next}</p>
  `;
}

function practiceFeedback(id, idx) {
  const s = SCENARIOS.find(sc => sc.id === id);
  const opt = s.options[idx];
  let fb = '';
  if (idx === 2) {
    fb = lang === 'en'
      ? 'Your own response: focus on clear facts, the desired outcome, and an open question. Consider how direct vs. relational framing might land.'
      : 'Tu propia respuesta: enfócate en hechos claros, el resultado deseado y una pregunta abierta. Considera cómo puede caer un marco directo vs. relacional.';
  } else {
    fb = lang === 'en'
      ? `This response communicates ${idx === 0 ? 'clarity and accountability' : 'care and openness'}. It might be interpreted as ${idx === 0 ? 'efficient or abrupt' : 'supportive or indirect'} depending on the other person’s preferences. A practical improvement: add one specific fact or one open question to balance both.`
      : `Esta respuesta comunica ${idx === 0 ? 'claridad y responsabilidad' : 'cuidado y apertura'}. Podría interpretarse como ${idx === 0 ? 'eficiente o abrupta' : 'de apoyo o indirecta'} según las preferencias de la otra persona. Una mejora práctica: añadir un hecho específico o una pregunta abierta para equilibrar ambos.`;
  }
  document.getElementById(`fb-${id}`).innerHTML = `<div class="provisional">${fb}</div>`;
}

// Expose to global for inline handlers
window.setView = setView;
window.toggleLang = toggleLang;
window.toggleDark = toggleDark;
window.clearAll = clearAll;
window.saveAnswer = saveAnswer;
window.showCoach = showCoach;
window.practiceFeedback = practiceFeedback;
window.shareSummary = shareSummary;
window.userName = userName; // for onchange

document.addEventListener('DOMContentLoaded', () => {
  try {
    render();
  } catch (err) {
    console.error(err);
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `<div class="card"><h2>Something went wrong</h2><p>Error: ${err.message}</p><p>Please refresh or clear site data and try again.</p><pre style="white-space:pre-wrap; font-size:0.85rem;">${err.stack || ''}</pre></div>`;
    }
  }
});