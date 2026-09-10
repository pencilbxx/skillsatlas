# Prompt — Author the final BPMN in Camunda Desktop Modeler

> **Current scope, 10 Sep:** the final artefact is the **SkillsAtlas Interview Board**. WhatsApp is historical and must not appear in a newly generated active diagram. Strengthened wording requires a separate worker-confirmation step before downstream use.

Use this prompt when you want Cursor to produce the actual `.bpmn` deliverable, not just describe it.

```text
You are working in this repo on the SkillsAtlas Evidence Agent challenge build.

Task: create the final BPMN 2.0 process file for the project in Camunda Desktop Modeler and save it as a real `.bpmn` file in the repo.

Important context:
- Camunda Desktop Modeler is already installed on this machine.
- Local examples: if you have a Camunda Getting Started package or another local lab, inspect those first. There is no Camunda lab inside this repository.
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
  10) Fold answers into proposed enriched wording [AI]
  11) Worker confirms or rejects the enriched wording [HUMAN]
  12) Loop back for re-score, max 2 iterations
  13) Normalise skills to ESCO [AI+CODE]
  14) Retrieve candidate occupations [CODE]
  15) Score route reachability [CODE]
  16) Explain the bridge [AI]
  17) Worker inspects and chooses between two routes [HUMAN]
  18) Resolve gap-closing options [CODE]
  19) Assemble pathway plan [AI]
  20) Worker commits to one next step [HUMAN]
  21) Generate professional summary [AI]
  22) Assemble interview story and questions [AI]
  23) Never-invent traceability gate [CODE]
  24) Generate SkillsAtlas Interview Board PDF [CODE] — this is the close
  25) End: the worker leaves with the Interview Board

Modelling rules:
- Use BPMN task types that best match the step semantics:
  - serviceTask for deterministic system steps
  - userTask for human confirmation/inspection steps
  - businessRuleTask for rule/guardrail steps
  - sendTask or message events for external handoffs
- Add clear names with the [CODE] / [AI] / [HUMAN] / [EXT] markers preserved in the element names.
- Add documentation text to important tasks summarising implementation intent.
- Keep the diagram readable: left-to-right main flow, one questioning loop, and the SkillsAtlas Interview Board PDF as the last step of the happy path.
- Do not add WhatsApp, recruiter CRM search, candidate ranking, or the separate AI practice-helper task to this diagram.
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
   - which local Camunda examples you inspected, if any (no lab path is assumed on this machine)
   - any modelling choices you changed from the draft blueprint
   - confirmation that the file opens cleanly in Camunda Desktop Modeler

Do not stop at pseudocode or Mermaid. The required output is a valid `.bpmn` file.
```
