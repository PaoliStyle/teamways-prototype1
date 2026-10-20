// TeamWays - Original provisional reflection data
// All content is original. Not based on any proprietary assessment.

const TOPICS = [
  { id: 'clarity', en: 'Message clarity and checking understanding', es: 'Claridad del mensaje y verificar comprensión' },
  { id: 'feedback', en: 'Feedback delivery and timing', es: 'Entrega y momento de la retroalimentación' },
  { id: 'participation', en: 'Participation and decision ownership', es: 'Participación y propiedad de decisiones' },
  { id: 'relationships', en: 'Building working relationships', es: 'Construcción de relaciones de trabajo' },
  { id: 'disagreement', en: 'Raising disagreement and resolving tension', es: 'Plantear desacuerdos y resolver tensiones' },
  { id: 'planning', en: 'Planning, deadlines, and handling change', es: 'Planificación, plazos y manejo de cambios' }
];

// Scoring: each non-skip answer maps to a number: -1 (one pole), 0 (depends/neutral), +1 (other pole)
// Poles are provisional descriptive labels, not validated traits.
// Topic score = average of answered questions (min 2). Display as tendency text.
// Reverse-coded where noted in question metadata.

const QUESTIONS = [
  // Topic 1: clarity
  {
    id: 'c1', topic: 'clarity',
    en: 'When assigning a task, you usually...',
    es: 'Al asignar una tarea, normalmente...',
    options: [
      { value: 1, en: 'State the main requirements clearly and then ask if anything is unclear', es: 'Indicar los requisitos principales claramente y luego preguntar si algo no está claro' },
      { value: -1, en: 'Provide background context and invite questions as needed', es: 'Proporcionar contexto de fondo e invitar a preguntas según sea necesario' },
      { value: 0, en: 'It depends on the person and situation', es: 'Depende de la persona y la situación' },
      { value: null, en: 'Skip', es: 'Omitir' }
    ]
  },
  {
    id: 'c2', topic: 'clarity',
    en: 'After explaining something important, you prefer to...',
    es: 'Después de explicar algo importante, prefieres...',
    options: [
      { value: 1, en: 'Summarize the key points and confirm shared understanding', es: 'Resumir los puntos clave y confirmar comprensión compartida' },
      { value: -1, en: 'Assume they will ask if needed and move on', es: 'Asumir que preguntarán si es necesario y continuar' },
      { value: 0, en: 'It depends', es: 'Depende' },
      { value: null, en: 'Skip', es: 'Omitir' }
    ]
  },
  {
    id: 'c3', topic: 'clarity',
    en: 'When a message seems unclear to you, you typically...',
    es: 'Cuando un mensaje te parece poco claro, normalmente...',
    options: [
      { value: 1, en: 'Ask specific clarifying questions right away', es: 'Hacer preguntas específicas de aclaración de inmediato' },
      { value: -1, en: 'Wait to see if context emerges or ask later privately', es: 'Esperar a ver si surge contexto o preguntar después en privado' },
      { value: 0, en: 'It depends', es: 'Depende' },
      { value: null, en: 'Skip', es: 'Omitir' }
    ]
  },
  // Topic 2: feedback
  {
    id: 'f1', topic: 'feedback',
    en: 'When giving feedback on work, you tend to...',
    es: 'Al dar retroalimentación sobre el trabajo, tiendes a...',
    options: [
      { value: 1, en: 'Be direct and specific about what needs to change, soon after the event', es: 'Ser directo y específico sobre lo que necesita cambiar, poco después del evento' },
      { value: -1, en: 'Soften the message, focus on positives first, and choose a private moment', es: 'Suavizar el mensaje, enfocarse primero en lo positivo y elegir un momento privado' },
      { value: 0, en: 'It depends', es: 'Depende' },
      { value: null, en: 'Skip', es: 'Omitir' }
    ]
  },
  {
    id: 'f2', topic: 'feedback',
    en: 'You prefer to receive feedback...',
    es: 'Prefieres recibir retroalimentación...',
    options: [
      { value: 1, en: 'Directly and promptly, even if it is critical', es: 'De manera directa y pronta, incluso si es crítica' },
      { value: -1, en: 'In a supportive framing, with time to process', es: 'En un marco de apoyo, con tiempo para procesar' },
      { value: 0, en: 'It depends', es: 'Depende' },
      { value: null, en: 'Skip', es: 'Omitir' }
    ]
  },
  {
    id: 'f3', topic: 'feedback',
    en: 'Timing of feedback is best when...',
    es: 'El momento de la retroalimentación es mejor cuando...',
    options: [
      { value: 1, en: 'Given close to the event so details are fresh', es: 'Se da cerca del evento para que los detalles estén frescos' },
      { value: -1, en: 'Given after some reflection time, or in a scheduled review', es: 'Se da después de tiempo de reflexión, o en una revisión programada' },
      { value: 0, en: 'It depends', es: 'Depende' },
      { value: null, en: 'Skip', es: 'Omitir' }
    ]
  },
  // Topic 3: participation
  {
    id: 'p1', topic: 'participation',
    en: 'In team meetings, you usually...',
    es: 'En las reuniones de equipo, normalmente...',
    options: [
      { value: 1, en: 'Speak up with ideas early and expect others to do the same', es: 'Hablar con ideas temprano y esperar que otros hagan lo mismo' },
      { value: -1, en: 'Listen first and contribute when invited or when you have something substantial', es: 'Escuchar primero y contribuir cuando se invita o cuando tienes algo sustancial' },
      { value: 0, en: 'It depends', es: 'Depende' },
      { value: null, en: 'Skip', es: 'Omitir' }
    ]
  },
  {
    id: 'p2', topic: 'participation',
    en: 'When a decision needs to be made, you prefer...',
    es: 'Cuando se necesita tomar una decisión, prefieres...',
    options: [
      { value: 1, en: 'Clear ownership by one person after consulting the group', es: 'Propiedad clara por una persona después de consultar al grupo' },
      { value: -1, en: 'Consensus or broad agreement before moving forward', es: 'Consenso o acuerdo amplio antes de avanzar' },
      { value: 0, en: 'It depends', es: 'Depende' },
      { value: null, en: 'Skip', es: 'Omitir' }
    ]
  },
  {
    id: 'p3', topic: 'participation',
    en: 'If you disagree with a proposed decision, you typically...',
    es: 'Si no estás de acuerdo con una decisión propuesta, normalmente...',
    options: [
      { value: 1, en: 'State your view clearly in the meeting', es: 'Expresar tu punto de vista claramente en la reunión' },
      { value: -1, en: 'Share concerns privately with the decision owner first', es: 'Compartir preocupaciones en privado con el dueño de la decisión primero' },
      { value: 0, en: 'It depends', es: 'Depende' },
      { value: null, en: 'Skip', es: 'Omitir' }
    ]
  },
  // Topic 4: relationships
  {
    id: 'r1', topic: 'relationships',
    en: 'To build trust with a new colleague, you prefer to...',
    es: 'Para construir confianza con un nuevo colega, prefieres...',
    options: [
      { value: 1, en: 'Focus on shared work tasks and deliver results together', es: 'Enfocarte en tareas de trabajo compartidas y entregar resultados juntos' },
      { value: -1, en: 'Spend some time learning about each other personally as well as professionally', es: 'Dedicar algo de tiempo a conocerse personalmente además de profesionalmente' },
      { value: 0, en: 'It depends', es: 'Depende' },
      { value: null, en: 'Skip', es: 'Omitir' }
    ]
  },
  {
    id: 'r2', topic: 'relationships',
    en: 'Social conversation at the start of a meeting feels...',
    es: 'La conversación social al inicio de una reunión se siente...',
    options: [
      { value: -1, en: 'Helpful for connection and should be welcomed', es: 'Útil para la conexión y debe ser bienvenida' },
      { value: 1, en: 'Optional; better to start on the agenda promptly', es: 'Opcional; mejor empezar con la agenda pronto' },
      { value: 0, en: 'It depends', es: 'Depende' },
      { value: null, en: 'Skip', es: 'Omitir' }
    ],
    reverse: true
  },
  {
    id: 'r3', topic: 'relationships',
    en: 'When collaborating remotely, you value...',
    es: 'Al colaborar de forma remota, valoras...',
    options: [
      { value: 1, en: 'Clear task updates and reliable delivery', es: 'Actualizaciones claras de tareas y entrega confiable' },
      { value: -1, en: 'Occasional informal check-ins beyond tasks', es: 'Chequeos informales ocasionales más allá de las tareas' },
      { value: 0, en: 'It depends', es: 'Depende' },
      { value: null, en: 'Skip', es: 'Omitir' }
    ]
  },
  // Topic 5: disagreement
  {
    id: 'd1', topic: 'disagreement',
    en: 'When you notice tension with a colleague, you tend to...',
    es: 'Cuando notas tensión con un colega, tiendes a...',
    options: [
      { value: 1, en: 'Address it directly and soon', es: 'Abordarlo directamente y pronto' },
      { value: -1, en: 'Observe for a while and address only if it persists', es: 'Observar por un tiempo y abordar solo si persiste' },
      { value: 0, en: 'It depends', es: 'Depende' },
      { value: null, en: 'Skip', es: 'Omitir' }
    ]
  },
  {
    id: 'd2', topic: 'disagreement',
    en: 'In a disagreement, you prefer to...',
    es: 'En un desacuerdo, prefieres...',
    options: [
      { value: 1, en: 'Focus on the facts and the desired outcome', es: 'Enfocarte en los hechos y el resultado deseado' },
      { value: -1, en: 'Also attend to how the other person feels about the issue', es: 'Atender también a cómo se siente la otra persona sobre el tema' },
      { value: 0, en: 'It depends', es: 'Depende' },
      { value: null, en: 'Skip', es: 'Omitir' }
    ]
  },
  {
    id: 'd3', topic: 'disagreement',
    en: 'If a colleague raises a concern with you, you usually...',
    es: 'Si un colega plantea una preocupación contigo, normalmente...',
    options: [
      { value: 1, en: 'Respond with your perspective and look for a practical solution', es: 'Responder con tu perspectiva y buscar una solución práctica' },
      { value: -1, en: 'First acknowledge their view and explore it further', es: 'Primero reconocer su punto de vista y explorarlo más' },
      { value: 0, en: 'It depends', es: 'Depende' },
      { value: null, en: 'Skip', es: 'Omitir' }
    ]
  },
  // Topic 6: planning
  {
    id: 'pl1', topic: 'planning',
    en: 'When planning a project, you prefer...',
    es: 'Al planificar un proyecto, prefieres...',
    options: [
      { value: 1, en: 'Clear milestones and deadlines set early', es: 'Hitos y plazos claros establecidos temprano' },
      { value: -1, en: 'A flexible outline that can adapt as we learn', es: 'Un esquema flexible que pueda adaptarse a medida que aprendemos' },
      { value: 0, en: 'It depends', es: 'Depende' },
      { value: null, en: 'Skip', es: 'Omitir' }
    ]
  },
  {
    id: 'pl2', topic: 'planning',
    en: 'If a deadline is at risk, you typically...',
    es: 'Si un plazo está en riesgo, normalmente...',
    options: [
      { value: 1, en: 'Flag it early and propose adjusted dates or scope', es: 'Señalarlo temprano y proponer fechas o alcance ajustados' },
      { value: -1, en: 'Work to meet it and raise the issue only if unavoidable', es: 'Trabajar para cumplirlo y plantear el problema solo si es inevitable' },
      { value: 0, en: 'It depends', es: 'Depende' },
      { value: null, en: 'Skip', es: 'Omitir' }
    ]
  },
  {
    id: 'pl3', topic: 'planning',
    en: 'When plans change mid-project, you find it most helpful to...',
    es: 'Cuando los planes cambian a mitad de proyecto, encuentras más útil...',
    options: [
      { value: 1, en: 'Receive a clear updated plan and new expectations', es: 'Recibir un plan actualizado claro y nuevas expectativas' },
      { value: -1, en: 'Discuss the reasons and jointly adapt the approach', es: 'Discutir las razones y adaptar el enfoque conjuntamente' },
      { value: 0, en: 'It depends', es: 'Depende' },
      { value: null, en: 'Skip', es: 'Omitir' }
    ]
  }
];

const DEMO_PROFILE = {
  name: 'Alex Rivera (demo)',
  notes: 'Fictional colleague for demonstration. Preferences are sample self-reports.',
  scores: {
    clarity: 0.5,
    feedback: -0.3,
    participation: 0.7,
    relationships: -0.4,
    disagreement: 0.2,
    planning: 0.6
  },
  answers: {} // not needed for demo
};

const SCENARIOS = [
  {
    id: 's1',
    en: 'In your async Slack team, a colleague has not updated the shared task board for two days and the deadline is tomorrow. How do you follow up in the channel?',
    es: 'En tu equipo asíncrono de Slack, un colega no ha actualizado el tablero de tareas compartido en dos días y el plazo es mañana. ¿Cómo haces seguimiento en el canal?',
    image: 'images/chat.jpg',
    options: [
      { en: '“Hi @name — the board still shows this as in progress. Can you post a quick status and any blockers by end of day?”', es: '“Hola @nombre — el tablero sigue mostrando esto en progreso. ¿Puedes publicar un estado rápido y cualquier bloqueo para el final del día?”' },
      { en: '“Just checking in on the task — hope the week is going well. Any update when you have a moment?”', es: '“Solo verificando la tarea — espero que la semana vaya bien. ¿Alguna actualización cuando tengas un momento?”' },
      { en: 'Write your own response', es: 'Escribe tu propia respuesta' }
    ]
  },
  {
    id: 's2',
    en: 'During a Zoom meeting, a teammate in another time zone joins 10 minutes late and the group has already moved on. How do you include them without derailing the meeting?',
    es: 'Durante una reunión de Zoom, un compañero en otra zona horaria se une 10 minutos tarde y el grupo ya ha avanzado. ¿Cómo lo incluyes sin descarrilar la reunión?',
    image: 'images/video-call.jpg',
    options: [
      { en: 'Pause briefly: “Welcome — we just covered X. The next point is Y. Anything you want to add on X before we continue?”', es: 'Pausa breve: “Bienvenido — acabamos de cubrir X. El siguiente punto es Y. ¿Algo que quieras añadir sobre X antes de continuar?”' },
      { en: 'Continue and message them privately after with a short summary and the recording link.', es: 'Continuar y enviarles un mensaje privado después con un breve resumen y el enlace de la grabación.' },
      { en: 'Write your own response', es: 'Escribe tu propia respuesta' }
    ]
  },
  {
    id: 's3',
    en: 'In a shared Google Doc, two colleagues have left conflicting comments on the proposed approach. How do you help resolve it?',
    es: 'En un Google Doc compartido, dos colegas han dejado comentarios conflictivos sobre el enfoque propuesto. ¿Cómo ayudas a resolverlo?',
    image: 'images/collaboration.jpg',
    options: [
      { en: '“I see two different suggestions here. Can we clarify the main goal and decide which option best supports it?”', es: '“Veo dos sugerencias diferentes aquí. ¿Podemos aclarar el objetivo principal y decidir qué opción lo apoya mejor?”' },
      { en: 'Suggest a short async poll or a 15-minute call to align, and tag both people.', es: 'Sugerir una encuesta asíncrona corta o una llamada de 15 minutos para alinear, y etiquetar a ambas personas.' },
      { en: 'Write your own response', es: 'Escribe tu propia respuesta' }
    ]
  },
  {
    id: 's4',
    en: 'You need to give feedback on a colleague’s draft report. They are in a different time zone and the review is due soon. How do you start the message?',
    es: 'Necesitas dar retroalimentación sobre el borrador de un informe de un colega. Está en una zona horaria diferente y la revisión vence pronto. ¿Cómo empiezas el mensaje?',
    image: 'images/collaboration.jpg',
    options: [
      { en: '“Thanks for the draft. Two sections need clearer next steps before we send it — happy to suggest wording if useful.”', es: '“Gracias por el borrador. Dos secciones necesitan próximos pasos más claros antes de enviarlo — feliz de sugerir redacción si es útil.”' },
      { en: '“Can we schedule a quick call tomorrow morning your time to go through the draft together?”', es: '“¿Podemos programar una llamada rápida mañana por la mañana tu hora para revisar el borrador juntos?”' },
      { en: 'Write your own response', es: 'Escribe tu propia respuesta' }
    ]
  },
  {
    id: 's5',
    en: 'A decision about changing a project timeline was posted in the main channel, but not everyone who is affected was asked for input. How do you respond?',
    es: 'Se publicó una decisión sobre cambiar el cronograma del proyecto en el canal principal, pero no se pidió opinión a todos los afectados. ¿Cómo respondes?',
    image: 'images/chat.jpg',
    options: [
      { en: '“Thanks for the update. To make sure we capture all impacts, can those affected share any concerns or constraints by tomorrow?”', es: '“Gracias por la actualización. Para asegurarnos de capturar todos los impactos, ¿pueden los afectados compartir cualquier preocupación o restricción para mañana?”' },
      { en: 'Message the decision owner privately to ask how consultation was handled and whether a short check-in is still possible.', es: 'Enviar un mensaje privado al dueño de la decisión para preguntar cómo se manejó la consulta y si aún es posible un breve chequeo.' },
      { en: 'Write your own response', es: 'Escribe tu propia respuesta' }
    ]
  },
  {
    id: 's6',
    en: 'A new remote teammate has been quiet in meetings and channels for the first two weeks. How do you help them feel included?',
    es: 'Un nuevo compañero remoto ha estado callado en reuniones y canales durante las primeras dos semanas. ¿Cómo ayudas a que se sienta incluido?',
    image: 'images/video-call.jpg',
    options: [
      { en: 'Send a short personal message: “Welcome — is there anything that would make it easier to jump into discussions?”', es: 'Enviar un mensaje personal corto: “Bienvenido — ¿hay algo que haga más fácil unirte a las discusiones?”' },
      { en: 'In the next meeting, explicitly invite input from people who haven’t spoken yet and offer a written channel for comments.', es: 'En la próxima reunión, invitar explícitamente aportaciones de quienes no han hablado y ofrecer un canal escrito para comentarios.' },
      { en: 'Write your own response', es: 'Escribe tu propia respuesta' }
    ]
  }
];

const COACH_SAMPLES = {
  feedback: {
    en: {
      known: 'You want to give constructive feedback. Relationship and preferences are as entered.',
      uncertain: 'Exact emotional state of the other person and their preferred feedback style in this moment.',
      interpretations: ['They may expect directness', 'They may prefer private and softened delivery'],
      opening: '“I’d like to share some observations on the recent work so we can improve together.”',
      statement: 'The issue is [specific behaviour]. The desired outcome is [clear next action].',
      questions: ['How do you see the situation?', 'What support would help?'],
      alternatives: [
        { text: 'Direct version: specific fact + impact + request.', tradeoff: 'Clear but may feel abrupt if preference is softer.' },
        { text: 'Softer version: positive context + specific observation + invitation.', tradeoff: 'Easier to receive but risk of diluted message.' }
      ],
      next: 'Agree on one concrete next step and a check-in time.'
    },
    es: {
      known: 'Quieres dar retroalimentación constructiva. Relación y preferencias según lo ingresado.',
      uncertain: 'Estado emocional exacto de la otra persona y su estilo preferido de retroalimentación en este momento.',
      interpretations: ['Pueden esperar franqueza', 'Pueden preferir entrega privada y suavizada'],
      opening: '“Me gustaría compartir algunas observaciones sobre el trabajo reciente para mejorar juntos.”',
      statement: 'El tema es [comportamiento específico]. El resultado deseado es [acción clara siguiente].',
      questions: ['¿Cómo ves la situación?', '¿Qué apoyo ayudaría?'],
      alternatives: [
        { text: 'Versión directa: hecho específico + impacto + solicitud.', tradeoff: 'Clara pero puede sentirse abrupta si prefieren suavidad.' },
        { text: 'Versión suave: contexto positivo + observación específica + invitación.', tradeoff: 'Más fácil de recibir pero riesgo de mensaje diluido.' }
      ],
      next: 'Acordar un siguiente paso concreto y un momento de seguimiento.'
    }
  },
  // Similar abbreviated samples for other types - full in app.js for brevity here
  clarify: { en: { known: 'Ambiguous message needs clarification.', uncertain: 'Intent behind the original message.', interpretations: ['May have assumed shared context', 'May prefer high-context communication'], opening: '“To make sure I understand correctly...”', statement: 'The message about X leaves Y unclear. I need Z to proceed.', questions: ['Did you mean A or B?', 'What is the priority?'], alternatives: [{text:'Specific question list', tradeoff:'Efficient'}, {text:'Open check', tradeoff:'More collaborative'}], next: 'Confirm shared understanding in writing.' }, es: { known: 'Mensaje ambiguo necesita aclaración.', uncertain: 'Intención detrás del mensaje original.', interpretations: ['Puede haber asumido contexto compartido', 'Puede preferir comunicación de alto contexto'], opening: '“Para asegurarme de entender correctamente...”', statement: 'El mensaje sobre X deja Y poco claro. Necesito Z para proceder.', questions: ['¿Quisiste decir A o B?', '¿Cuál es la prioridad?'], alternatives: [{text:'Lista de preguntas específicas', tradeoff:'Eficiente'}, {text:'Verificación abierta', tradeoff:'Más colaborativo'}], next: 'Confirmar comprensión compartida por escrito.' } },
  disagree: { en: { known: 'You need to disagree.', uncertain: 'How open the other person is to challenge.', interpretations: ['May see direct challenge as disrespect', 'May welcome debate'], opening: '“I have a different view on this — can I share it?”', statement: 'My concern is [fact]. I suggest [alternative].', questions: ['What led to this proposal?', 'What risks do you see in the alternative?'], alternatives: [{text:'In-meeting direct', tradeoff:'Transparent but public'}, {text:'Private first', tradeoff:'Safer but slower'}], next: 'Propose a small experiment or next review point.' }, es: { known: 'Necesitas estar en desacuerdo.', uncertain: 'Qué tan abierto está la otra persona al desafío.', interpretations: ['Puede ver el desafío directo como falta de respeto', 'Puede dar la bienvenida al debate'], opening: '“Tengo una visión diferente sobre esto — ¿puedo compartirla?”', statement: 'Mi preocupación es [hecho]. Sugiero [alternativa].', questions: ['¿Qué llevó a esta propuesta?', '¿Qué riesgos ves en la alternativa?'], alternatives: [{text:'Directo en reunión', tradeoff:'Transparente pero público'}, {text:'Privado primero', tradeoff:'Más seguro pero más lento'}], next: 'Proponer un pequeño experimento o punto de revisión siguiente.' } },
  deadline: { en: { known: 'Missed deadline situation.', uncertain: 'Reason for the miss and their awareness.', interpretations: ['May have different sense of urgency', 'May have faced blockers not shared'], opening: '“I noticed the deadline passed — can we align on status?”', statement: 'The deliverable was due [date]. We need [outcome] by [new time].', questions: ['What got in the way?', 'What is realistic now?'], alternatives: [{text:'Status request + new date', tradeoff:'Direct accountability'}, {text:'Support offer first', tradeoff:'Relational but may delay clarity'}], next: 'Agree revised date and any support needed.' }, es: { known: 'Situación de plazo no cumplido.', uncertain: 'Razón del incumplimiento y su conciencia.', interpretations: ['Puede tener diferente sentido de urgencia', 'Puede haber enfrentado bloqueos no compartidos'], opening: '“Noté que el plazo pasó — ¿podemos alinear el estado?”', statement: 'El entregable vencía [fecha]. Necesitamos [resultado] para [nuevo tiempo].', questions: ['¿Qué se interpuso?', '¿Qué es realista ahora?'], alternatives: [{text:'Solicitud de estado + nueva fecha', tradeoff:'Responsabilidad directa'}, {text:'Oferta de apoyo primero', tradeoff:'Relacional pero puede retrasar claridad'}], next: 'Acordar fecha revisada y cualquier apoyo necesario.' } },
  meeting: { en: { known: 'Want inclusive meeting.', uncertain: 'Individual reasons for silence.', interpretations: ['May prefer to prepare in writing', 'May wait to be invited'], opening: '“I’d like to make sure everyone has a chance to contribute.”', statement: 'Goal is to hear diverse views before deciding.', questions: ['Would written input beforehand help?', 'Any concerns about speaking up?'], alternatives: [{text:'Round-robin invite', tradeoff:'Ensures airtime'}, {text:'Pre-work + optional speak', tradeoff:'Lower pressure'}], next: 'Decide one participation method for next meeting.' }, es: { known: 'Quieres reunión inclusiva.', uncertain: 'Razones individuales del silencio.', interpretations: ['Puede preferir preparar por escrito', 'Puede esperar a ser invitado'], opening: '“Me gustaría asegurarme de que todos tengan la oportunidad de contribuir.”', statement: 'El objetivo es escuchar diversas opiniones antes de decidir.', questions: ['¿Ayudaría aportación escrita de antemano?', '¿Alguna preocupación sobre hablar?'], alternatives: [{text:'Invitación round-robin', tradeoff:'Asegura tiempo de palabra'}, {text:'Pre-trabajo + hablar opcional', tradeoff:'Menor presión'}], next: 'Decidir un método de participación para la próxima reunión.' } },
  decision: { en: { known: 'Communicating a decision.', uncertain: 'How much consultation others expected.', interpretations: ['May have wanted more input', 'May prefer clear ownership'], opening: '“After considering the input, we are moving forward with...”', statement: 'Decision is X. Rationale is Y. Next steps are Z.', questions: ['Any implementation concerns?', 'What support do you need?'], alternatives: [{text:'Announce + rationale + close', tradeoff:'Clear ownership'}, {text:'Announce + open remaining concerns', tradeoff:'More inclusive but slower'}], next: 'Document the decision and owners.' }, es: { known: 'Comunicando una decisión.', uncertain: 'Cuánta consulta esperaban otros.', interpretations: ['Puede haber querido más aportación', 'Puede preferir propiedad clara'], opening: '“Después de considerar las aportaciones, avanzamos con...”', statement: 'La decisión es X. La razón es Y. Los próximos pasos son Z.', questions: ['¿Alguna preocupación de implementación?', '¿Qué apoyo necesitas?'], alternatives: [{text:'Anunciar + razón + cerrar', tradeoff:'Propiedad clara'}, {text:'Anunciar + abrir preocupaciones restantes', tradeoff:'Más inclusivo pero más lento'}], next: 'Documentar la decisión y responsables.' } }
};

const AGREEMENT_TEMPLATE = {
  en: {
    channels: 'Primary channels: Slack for quick questions, email for formal updates. Response expectation: within one business day unless marked urgent.',
    meetings: 'Meetings start on time. Agenda shared in advance. Everyone is invited to speak; silence is not assumed agreement.',
    decisions: 'Decision owner is named. Consultation happens before final call. Dissent can be recorded.',
    feedback: 'Feedback is specific, timely, and focused on work. Private by default unless team learning is useful.',
    concerns: 'Concerns can be raised in meeting or privately. We aim to address within one week.',
    deadlines: 'Deadlines are confirmed in writing. Changes are communicated as soon as known, with new date proposed.'
  },
  es: {
    channels: 'Canales principales: Slack para preguntas rápidas, email para actualizaciones formales. Expectativa de respuesta: dentro de un día hábil a menos que se marque urgente.',
    meetings: 'Las reuniones empiezan a tiempo. Agenda compartida con antelación. Todos están invitados a hablar; el silencio no se asume como acuerdo.',
    decisions: 'Se nombra al dueño de la decisión. La consulta ocurre antes de la decisión final. El desacuerdo puede registrarse.',
    feedback: 'La retroalimentación es específica, oportuna y enfocada en el trabajo. Privada por defecto a menos que el aprendizaje del equipo sea útil.',
    concerns: 'Las preocupaciones se pueden plantear en reunión o en privado. Apuntamos a abordarlas dentro de una semana.',
    deadlines: 'Los plazos se confirman por escrito. Los cambios se comunican tan pronto como se conocen, con nueva fecha propuesta.'
  }
};

const UI_STRINGS = {
  en: {
    title: 'TeamWays',
    tagline: 'Communicate better across differences — through reflection, not assumptions.',
    start: 'Try the demo',
    create: 'Create my profile',
    questionnaire: 'Working preferences questionnaire',
    profile: 'Your provisional profile',
    compare: 'Compare profiles',
    coach: 'Conversation coach',
    practice: 'Scenario practice',
    agreement: 'Team working agreement',
    clear: 'Clear all saved demo data',
    lang: 'Español',
    insufficient: 'Insufficient information (answer at least two questions in this topic)',
    provisional: 'Provisional self-reported preference — a reflection tool, not a validated assessment.',
    demoNote: 'Demo data stays in this browser only and can be cleared at any time.'
  },
  es: {
    title: 'TeamWays',
    tagline: 'Comunica mejor a través de diferencias — mediante reflexión, no suposiciones.',
    start: 'Probar la demo',
    create: 'Crear mi perfil',
    questionnaire: 'Cuestionario de preferencias de trabajo',
    profile: 'Tu perfil provisional',
    compare: 'Comparar perfiles',
    coach: 'Coach de conversación',
    practice: 'Práctica de escenarios',
    agreement: 'Acuerdo de trabajo en equipo',
    clear: 'Borrar todos los datos demo guardados',
    lang: 'English',
    insufficient: 'Información insuficiente (responde al menos dos preguntas en este tema)',
    provisional: 'Preferencia provisional autoinformada — herramienta de reflexión, no evaluación validada.',
    demoNote: 'Los datos demo permanecen solo en este navegador y se pueden borrar en cualquier momento.'
  }
};