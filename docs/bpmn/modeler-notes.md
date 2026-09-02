# Modeler notes — SkillsAtlas BPMN

Inspected: `C:\Users\IKARUS\Desktop\CURSOR PROJECTS\Camunda Test\processes\ravens-point-detailed.bpmn` (colours, yellow notes, groups).

Two files (do not merge them in Modeler and overwrite):

- `skillsatlas-4-screens.bpmn` — share this
- `skillsatlas-evidence-agent.bpmn` — full map, new order

## What changed from the draft

- Two tabs in one file. First tab is the 90-second spine (share this). Second tab is the full step map.
- Colours are the legend. Grey = [CODE], blue = [AI], green = [HUMAN], purple = [EXT], teal = [AI+CODE], amber diamonds = decisions.
- Groups on the full map: capture, questioning, two routes, plan+adviser, **they leave with the cheat-board**, WhatsApp as a bonus side box.
- Loop and “skip questions” stay inside / under the questioning band. They no longer cross the whole canvas.
- “Companion” renamed to **Accountability Partner** everywhere.
- 29 Aug 2026: WhatsApp is bonus. The closer is the cheat-board — the artefact they walk out holding.
- Event boxes are 36×36 (they were drawn as 130×80 tasks before).
- Still design-only. `isExecutable="false"`. No Camunda 8 deploy from this file.

## Open it

```
C:\camunda\starter\camunda-modeler-5.49.0-win-x64\Camunda Modeler.exe
```

File: `docs/bpmn/skillsatlas-evidence-agent.bpmn`

Share the first tab. Use the second tab when someone asks “what happens inside screen 2?”
