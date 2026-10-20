# TeamWays Prototype — Setup Instructions (Non-Developer)

## What this is
A fully client-side web prototype. All data stays in your browser (localStorage). No server, no account, no AI API key required. Sample coaching text is pre-written.

## How to run
1. Download or copy the entire `teamways` folder.
2. Open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).
   - Double-click the file, or right-click → Open with → your browser.
   - (Works directly from the file; no server required for this prototype.)
3. Use the navigation to try the questionnaire, profile, comparison, conversation coach (sample responses), scenario practice, and team working agreement.
4. Toggle English / Español in the top navigation.
5. To clear all saved demo data, use the “Clear all saved demo data” button.

## Printing the agreement
On the agreement page, use the Print / Export button (browser print dialog). Print CSS hides navigation.

## Editing content
- Questions, scenarios, translations, sample coach text: `js/data.js`
- Scoring logic: `js/app.js`
- Styles: `css/styles.css`

## Limitations of this prototype
- Data is browser-local only (cleared if you clear site data or use another browser).
- Coaching responses are fixed samples, not live AI.
- No authentication, no multi-user real sharing, no server storage.
- English and Spanish UI only.

See also `docs/scoring.md` for questionnaire and scoring details.