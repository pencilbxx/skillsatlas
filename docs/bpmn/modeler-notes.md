# Modeler notes — SkillsAtlas BPMN

Inspected: `C:\Users\IKARUS\Desktop\CURSOR PROJECTS\Camunda Test\processes\ravens-point-detailed.bpmn` (colours, yellow notes, groups).

Three files (do not merge them in Modeler and overwrite):

- `skillsatlas-4-screens.bpmn` — share this (pitch picture)
- `skillsatlas-evidence-agent.bpmn` — full map, still design-only
- `skillsatlas-runnable.bpmn` — the one you deploy to Camunda 8 Run. Real OpenAI + ESCO GET + Tasklist. Not the HTML demo.

## What changed from the draft

- Two tabs in one file. First tab is the 90-second spine (share this). Second tab is the full step map.
- Colours are the legend. Grey = [CODE], blue = [AI], green = [HUMAN], purple = [EXT], teal = [AI+CODE], amber diamonds = decisions.
- Groups on the full map: capture, questioning, two routes, plan+adviser, **they leave with the cheat-board**, WhatsApp as a bonus side box.
- Loop and “skip questions” stay inside / under the questioning band. They no longer cross the whole canvas.
- “Companion” renamed to **Accountability Partner** everywhere.
- 29 Aug 2026: WhatsApp is bonus. The closer is the cheat-board — the artefact they walk out holding.
- Event boxes are 36×36 (they were drawn as 130×80 tasks before).
- The two picture files stay design-only (`isExecutable="false"`). Deploy `skillsatlas-runnable.bpmn`.

## Run it (Camunda 8 Run is already started)

1. In Desktop Modeler: cog / cluster → **Camunda 8 Self-Managed**, URL `http://localhost:8080/v2`, auth **None**.
2. Open `docs/bpmn/skillsatlas-runnable.bpmn`. Rocket = deploy.
3. Play = start instance. Empty variables is fine (synthetic CV is loaded).
4. Green boxes: http://localhost:8080/tasklist login `demo` / `demo`. Complete each one.
5. Token: http://localhost:8080/operate login `demo` / `demo`.

Blue [AI] boxes call OpenAI. They need `OPENAI_API_KEY` in the same environment as C8 Run, then a restart of `c8run`. Without the key, Operate will show an incident on the first parse step. Do not paste the key into the BPMN.

## Open it

```
C:\camunda\starter\camunda-modeler-5.49.0-win-x64\Camunda Modeler.exe
```

Pictures: `docs/bpmn/skillsatlas-4-screens.bpmn` and `docs/bpmn/skillsatlas-evidence-agent.bpmn`

Deploy this: `docs/bpmn/skillsatlas-runnable.bpmn`
