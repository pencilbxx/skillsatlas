# Prompt — Author the final BPMN in Camunda Desktop Modeler

Use this prompt when you want Cursor to produce the actual `.bpmn` deliverable, not just describe it.

```text
You are working in this repo on the SkillsAtlas Evidence Agent challenge build.

Task: create the final BPMN 2.0 process file for the project in Camunda Desktop Modeler and save it as a real `.bpmn` file in the repo.

Important context:
- Camunda Desktop Modeler is already installed on this machine.
- Local examples are available here:
  C:\Users\IKARUS\Desktop\CURSOR PROJECTS\Camunda Test
- Inspect those examples first and follow their structure, naming, and diagram conventions where appropriate.
- Do NOT invent a different process from scratch. Use the repo’s process blueprint docs as the source of truth:
  - docs/bpmn/README.md
  - any existing draft .bpmn files in docs/bpmn/
- The final file must be valid BPMN 2.0 and open cleanly in Camunda Desktop Modeler.

Process requirements:
- Model the main Evidence Agent flow end to end:
  1) CV/case file received
  2) Parse CV into structured profile [AI]
  3) Validate profile completeness [CODE]
  4) Worker confirms profile [HUMAN]
  5) Store confirmed evidence [CODE]
  6) Score evidence strength [CODE]
  7) If weak load-bearing claims exist, generate contextual questions [AI]
  8) Guardrail-check generated questions [CODE]
  9) Worker answers or skips [HUMAN]
  10) Fold answers into evidence [AI]
  11) Loop back for re-score, max 2 iterations
  12) Normalise skills to ESCO [AI+CODE]
  13) Retrieve candidate occupations [CODE]
  14) Score route reachability [CODE]
  15) Explain the bridge [AI]
  16) Worker inspects routes [HUMAN]
  17) Resolve gap-closing options [CODE]
  18) Assemble pathway plan [AI]
  19) Worker commits to one next step [HUMAN]
  20) Generate adviser summary [AI]
  21) Assemble interview evidence pack [AI]
  22) Never-invent traceability gate [CODE]
  23) Generate cheat-board [EXT] — this is the close; they leave the room with it
  24) End: they leave with the board
  Bonus (does not block the close): hand off to WhatsApp accountability partner [EXT] + partner ack

Modelling rules:
- Use BPMN task types that best match the step semantics:
  - serviceTask for deterministic system steps
  - userTask for human confirmation/inspection steps
  - businessRuleTask for rule/guardrail steps
  - sendTask or message events for external handoffs
- Add clear names with the [CODE] / [AI] / [HUMAN] / [EXT] markers preserved in the element names.
- Add documentation text to important tasks summarising implementation intent.
- Keep the diagram readable: left-to-right main flow, one questioning loop, the cheat-board as the last step of the happy path, WhatsApp as a bonus side path.
- Name the external participant "Accountability Partner (existing WhatsApp system)" — not "companion" and never anything suggesting a mental-health service.
- If a subprocess improves readability, use it, but only if it still opens cleanly in Desktop Modeler.

Validation requirements:
- Open the resulting file in Camunda Desktop Modeler.
- Fix any XML/BPMN/DI issues until it opens without errors.
- Ensure all sequence flows have valid source/target refs.
- Ensure the diagram has proper BPMNDI layout bounds/waypoints so it is visually usable, not just syntactically valid.
- Reconcile the diagram against the built demo before slides freeze: walk the four screens and confirm every step in the diagram exists in the app (or is explicitly marked as a production-path step not in the demo). A technical judge may open this file.
- Save the final file to:
  docs/bpmn/skillsatlas-evidence-agent.bpmn
- If you create any helper/export notes, put them in:
  docs/bpmn/modeler-notes.md

Deliverables:
1. The final `.bpmn` file.
2. A short note in `docs/bpmn/modeler-notes.md` stating:
   - which local example files you inspected under C:\Users\IKARUS\Desktop\CURSOR PROJECTS\Camunda Test
   - any modelling choices you changed from the draft blueprint
   - confirmation that the file opens cleanly in Camunda Desktop Modeler

Do not stop at pseudocode or Mermaid. The required output is a valid `.bpmn` file.
```
