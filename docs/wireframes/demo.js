const screens = [...document.querySelectorAll(".screen")];
    const navBtns = [...document.querySelectorAll("nav [data-go]")];
    const say = document.getElementById("say-line");
    const sayBar = document.getElementById("say-bar");
    const sayToggle = document.getElementById("say-toggle");
    let n = 1;

    function collapseSay() {
      sayBar.classList.remove("open");
      sayToggle.setAttribute("aria-expanded", "false");
      sayToggle.textContent = "More";
    }
    sayToggle.addEventListener("click", () => {
      const open = sayBar.classList.toggle("open");
      sayToggle.setAttribute("aria-expanded", String(open));
      sayToggle.textContent = open ? "Less" : "More";
    });

    function showEl(el) {
      if (!el) return;
      el.hidden = false;
      el.removeAttribute("hidden");
    }
    function hideEl(el) {
      if (!el) return;
      el.hidden = true;
      el.setAttribute("hidden", "");
    }
    function go(i) {
      n = i;
      if (i === 1) resetEvidence();
      screens.forEach((s, idx) => s.classList.toggle("on", idx === i - 1));
      navBtns.forEach((b) => {
        if (b.dataset.go === String(i)) b.setAttribute("aria-current", "true");
        else b.removeAttribute("aria-current");
      });
      const el = document.getElementById("s" + i);
      say.textContent = el.dataset.say;
      collapseSay();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    document.querySelectorAll("[data-go]").forEach((b) => {
      b.addEventListener("click", () => go(Number(b.dataset.go)));
    });
    window.addEventListener("keydown", (e) => {
      if (["1","2","3","4"].includes(e.key)) go(Number(e.key));
    });

    const confirmBtn = document.getElementById("btn-confirm");
    const confirmState = document.getElementById("confirm-state");
    const qPanel = document.getElementById("q-panel");
    const afterTitle = document.getElementById("after-title");
    const afterBody = document.getElementById("after-body");
    const stockScore = document.getElementById("stock-score");
    const stockClaim = document.getElementById("c-stock");
    const claims = [...document.querySelectorAll("#s2 .claim")];
    const stockStrong = document.querySelector("#c-stock strong");
    const origStockText = stockStrong.textContent;
    const qTiny = document.querySelector("#q-panel .tiny");
    const qText = document.getElementById("q-text");
    const qWhy = document.getElementById("q-why");
    const btnAnswer = document.getElementById("btn-answer");
    const btnSkip = document.getElementById("btn-skip");
    const btnToRoutes = document.getElementById("btn-to-routes");
    let q = 1;

    function resetEvidence() {
      q = 1;
      claims.forEach((el) => {
        el.setAttribute("aria-pressed", "false");
        el.classList.remove("strong");
      });
      stockClaim.classList.add("weak");
      stockScore.textContent = "Score 1 · weak · load-bearing";
      stockScore.className = "chip chip-rep";
      stockStrong.textContent = origStockText;
      confirmState.textContent = "Not confirmed yet · tap a line or this button";
      confirmBtn.classList.add("primary");
      confirmBtn.textContent = "Confirm these lines";
      hideEl(qPanel);
      qTiny.textContent = "Question 1 of 2 · skip is always fine";
      qText.innerHTML = "<strong>When you managed stock, roughly how many product lines — and did you use any system?</strong>";
      qWhy.textContent = "Why it matters: a number and a system turn a duty into something an employer can check.";
      showEl(btnAnswer);
      showEl(btnSkip);
      hideEl(btnToRoutes);
      afterTitle.textContent = "Still a keyword";
      afterBody.textContent = "Confirm first. Then the agent asks. The guardrail already ran: no protected traits, no repeats, simple English.";
      document.querySelectorAll("[data-route]").forEach((c) => c.classList.remove("sel"));
    }

    function openQuestions() {
      confirmState.textContent = "Confirmed · matching may use this";
      confirmBtn.classList.remove("primary");
      confirmBtn.textContent = "Confirmed";
      showEl(qPanel);
      afterTitle.textContent = "Waiting on their words";
      afterBody.textContent = "Guardrail passed. Question is specific to the weak claim. They can skip.";
      qPanel.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    function confirmClaim(el) {
      el.setAttribute("aria-pressed", "true");
    }
    function confirmAll() {
      claims.forEach(confirmClaim);
      openQuestions();
    }
    confirmBtn.addEventListener("click", confirmAll);
    claims.forEach((el) => {
      el.addEventListener("click", () => {
        confirmClaim(el);
        const allOn = claims.every((c) => c.getAttribute("aria-pressed") === "true");
        if (allOn) confirmAll();
        else confirmState.textContent = "One line confirmed. Tap the other, or Confirm these lines.";
      });
    });
    function doneQuestions() {
      qTiny.textContent = "Done · skip was allowed on both";
      hideEl(btnAnswer);
      hideEl(btnSkip);
      showEl(btnToRoutes);
    }
    function strengthen() {
      stockClaim.classList.remove("weak");
      stockClaim.classList.add("strong");
      stockScore.textContent = "Score 3 · confirmed";
      stockScore.className = "chip chip-obs";
      document.querySelector("#c-stock strong").textContent =
        "Managed about 2,400 product lines in SAP, monthly cycle counts, 2019–2024";
      afterTitle.textContent = "That is evidence";
      afterBody.textContent = "Number, system, date. Not a keyword. Ready for two routes.";
      document.getElementById("q-text").innerHTML = "<strong>Done — 2 of 2. Skip was allowed on both.</strong>";
      document.getElementById("q-why").textContent = "Now it is evidence. The person still chooses the route.";
      doneQuestions();
    }
    document.getElementById("btn-answer").addEventListener("click", () => {
      if (q === 1) {
        q = 2;
        document.querySelector("#q-panel .tiny").textContent = "Question 2 of 2 · skip is always fine";
        document.getElementById("q-text").innerHTML =
          "<strong>When did that start — and were the cycle counts on a schedule?</strong>";
        document.getElementById("q-why").textContent = "A date stops this looking like a slogan.";
      } else strengthen();
    });
    document.getElementById("btn-skip").addEventListener("click", () => {
      afterTitle.textContent = "Skipped · no penalty";
      afterBody.textContent = "We still match on what they confirmed. Evidence could be stronger — they can answer later.";
      if (q === 1) {
        q = 2;
        document.querySelector("#q-panel .tiny").textContent = "Question 2 of 2 · skip is always fine";
        document.getElementById("q-text").innerHTML = "<strong>Any system name at all — even a spreadsheet?</strong>";
      } else {
        document.getElementById("q-text").innerHTML = "<strong>Skipped the rest. Confirmed lines still stand.</strong>";
        document.getElementById("q-why").textContent = "We match on what they confirmed. They can answer later.";
        doneQuestions();
      }
    });

    const routeCopy = {
      a: {
        title: "Interview board · inventory / stock controller",
        step: "Book the Skillnet WMS intro for Thursday (example).",
      },
      b: {
        title: "Interview board · warehouse team lead",
        step: "Ask the ETB about the Skills to Advance supervisory place (example).",
      },
    };
    function pickRoute(pick, ev) {
      if (ev) ev.stopPropagation();
      document.querySelectorAll("[data-route]").forEach((c) => c.classList.remove("sel"));
      document.querySelector("[data-route='" + pick + "']").classList.add("sel");
      document.getElementById("board-title").textContent = routeCopy[pick].title;
      document.getElementById("step-text").textContent = routeCopy[pick].step;
      go(4);
    }
    document.querySelectorAll("[data-pick]").forEach((b) => {
      b.addEventListener("click", (ev) => pickRoute(b.dataset.pick, ev));
    });
    document.querySelectorAll("[data-route]").forEach((card) => {
      card.addEventListener("click", () => pickRoute(card.dataset.route));
    });

    const qs = {
      "screen-recruiter": "Have you used a stock system, even a simple one? Hook: stock claim.",
      "screen-hm": "In one minute: how did you keep counts honest on your shift?",
      "first-recruiter": "Tell me about a time a count was wrong. What did you do?",
      "first-hm": "Walk me through monthly cycle counts — your words, not a slogan.",
      "panel-recruiter": "How would you explain this stock story to a panel who has never seen a warehouse?",
      "panel-hm": "If we asked you to train someone on counts next month, what would you show them first?",
    };
    function syncQ() {
      const st = document.querySelector("#stage .opt.on").dataset.val;
      const wh = document.querySelector("#who .opt.on").dataset.val;
      const key = st + "-" + (wh === "hm" ? "hm" : "recruiter");
      document.getElementById("pq").innerHTML = "<strong>" + qs[key] + "</strong>";
    }
    function bindGroup(id) {
      document.querySelectorAll("#" + id + " .opt").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll("#" + id + " .opt").forEach((x) => x.classList.remove("on"));
          btn.classList.add("on");
          syncQ();
        });
      });
    }
    bindGroup("stage");
    bindGroup("who");
