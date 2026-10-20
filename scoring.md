# TeamWays — Questionnaire and Scoring Documentation

## Original Provisional Framework
TeamWays uses an original, provisional learning framework based on everyday workplace situations. It is a reflection tool, not a validated psychological assessment. No affiliation with any external model or site.

Topics (six provisional areas):
1. Message clarity and checking understanding
2. Feedback delivery and timing
3. Participation and decision ownership
4. Building working relationships
5. Raising disagreement and resolving tension
6. Planning, deadlines, and handling change

## Questionnaire
18 original scenario-based questions (three per topic). Options typically include two poles, “It depends”, and “Skip”.

Full questions are in `js/data.js` under `QUESTIONS`.

## Deterministic Scoring Method
- Each answered option maps to a number: +1 (more explicit / direct / structured pole), -1 (more contextual / relational / flexible pole), 0 (“It depends”), or null (Skip — ignored).
- One question (`r2`) is reverse-coded in the data so higher values still align with the explicit pole.
- For each topic, collect non-null answers.
- If fewer than two questions are answered for a topic → display “Insufficient information”. No fabricated score.
- Otherwise, topic score = arithmetic mean of the numeric answers (range -1 to +1).
- Display uses plain-language tendency:
  - Score > 0.4 → tends toward more direct / structured / explicit approaches.
  - Score < -0.4 → tends toward more contextual / relational / flexible approaches.
  - Otherwise → balanced or situation-dependent.
- No percentiles, no diagnostic labels, no scientific confidence claims.
- Users can review answers and add contextual notes per topic.
- All results labeled as provisional self-reported preferences.

Scoring code lives in `js/app.js` (`computeScores` and `tendencyText`).

## Demo Profile
Fictional “Alex Rivera” with fixed sample scores for comparison only. Never used for real decisions.