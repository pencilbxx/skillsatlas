const screens = [...document.querySelectorAll(".screen")];
    const navBtns = [...document.querySelectorAll("nav [data-go]")];
    const film = document.getElementById("film");
    const filmIdle = document.getElementById("film-idle");
    function syncFilmIdle() {
      if (!film || !filmIdle) return;
      const show = film.paused && film.currentTime < 0.25;
      filmIdle.hidden = !show;
    }
    if (film) {
      film.addEventListener("play", syncFilmIdle);
      film.addEventListener("pause", syncFilmIdle);
      film.addEventListener("ended", () => {
        film.currentTime = 0;
        syncFilmIdle();
      });
      film.addEventListener("error", () => {
        if (!filmIdle) return;
        const label = filmIdle.querySelector("span");
        if (label) label.textContent = "Skip below if the film does not load";
      });
    }
    let n = 0;

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
      if (film && i !== 0) film.pause();
      if (i === 1) resetEvidence();
      screens.forEach((s) => s.classList.toggle("on", s.id === "s" + i));
      navBtns.forEach((b) => {
        if (b.dataset.go === String(i)) b.setAttribute("aria-current", "true");
        else b.removeAttribute("aria-current");
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    document.querySelectorAll("[data-go]").forEach((b) => {
      b.addEventListener("click", () => go(Number(b.dataset.go)));
    });
    window.addEventListener("keydown", (e) => {
      if (["0","1","2","3","4"].includes(e.key)) go(Number(e.key));
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
      afterBody.textContent = "Confirm first. Then the agent asks. Rules already ran: no protected traits, no repeats, simple English.";
      document.querySelectorAll("[data-route]").forEach((c) => c.classList.remove("sel"));
    }

    function openQuestions() {
      confirmState.textContent = "Confirmed · matching may use this";
      confirmBtn.classList.remove("primary");
      confirmBtn.textContent = "Confirmed";
      showEl(qPanel);
      afterTitle.textContent = "Waiting on their words";
      afterBody.textContent = "Question is specific to the weak claim. They can skip.";
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

    function settingLabel() {
      const st = document.querySelector("#stage .opt.on");
      const wh = document.querySelector("#who .opt.on");
      return (st ? st.textContent : "") + " · " + (wh ? wh.textContent : "");
    }
    function pdfPlain(s) {
      return String(s || "")
        .replace(/[“”]/g, '"')
        .replace(/[‘’]/g, "'")
        .replace(/—/g, "-")
        .replace(/·/g, "-")
        .replace(/[^\x20-\x7E]/g, " ");
    }
    function pdfEscape(s) {
      return pdfPlain(s).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
    }
    function wrapWords(text, maxChars) {
      const words = pdfPlain(text).split(/\s+/).filter(Boolean);
      const rows = [];
      let cur = "";
      words.forEach((w) => {
        const next = cur ? cur + " " + w : w;
        if (next.length > maxChars && cur) {
          rows.push(cur);
          cur = w;
        } else cur = next;
      });
      if (cur) rows.push(cur);
      return rows.length ? rows : [""];
    }
    function buildBoardPdfBytes() {
      const lines = [];
      function add(text, size, rgb, maxChars) {
        wrapWords(text, maxChars || 88).forEach((row) => {
          lines.push({ text: row, size: size, rgb: rgb });
        });
      }
      add("SKILLSATLAS - REDEPLOYMATE - INTERVIEW BOARD", 10, [237, 106, 74], 70);
      lines.push({ spacer: 8 });
      add(document.getElementById("board-title").textContent, 18, [16, 43, 63], 42);
      lines.push({ spacer: 6 });
      add(settingLabel(), 11, [73, 96, 109], 88);
      lines.push({ spacer: 10 });
      add("This week's step", 10, [237, 106, 74], 70);
      add(document.getElementById("step-text").textContent, 12, [16, 43, 63], 78);
      lines.push({ spacer: 10 });
      add("STAR story - Action is the long part", 10, [237, 106, 74], 70);
      const starKids = [...document.querySelector("#board .star").children];
      for (let i = 0; i < starKids.length; i += 2) {
        lines.push({ spacer: 6 });
        add(starKids[i].textContent, 10, [237, 106, 74], 70);
        add(starKids[i + 1] ? starKids[i + 1].textContent : "", 11, [16, 43, 63], 82);
      }
      lines.push({ spacer: 12 });
      add("Question for this room", 10, [237, 106, 74], 70);
      add(document.getElementById("pq").textContent, 12, [16, 43, 63], 78);
      lines.push({ spacer: 14 });
      add("Only what they confirmed. Practice CV - not a live case file. We do not say they would be hired.", 9, [73, 96, 109], 88);

      const ops = [];
      let y = 800;
      lines.forEach((item) => {
        if (item.spacer) {
          y -= item.spacer;
          return;
        }
        const r = (item.rgb[0] / 255).toFixed(3);
        const g = (item.rgb[1] / 255).toFixed(3);
        const b = (item.rgb[2] / 255).toFixed(3);
        ops.push(r + " " + g + " " + b + " rg");
        ops.push("BT /F1 " + item.size + " Tf 48 " + y + " Td (" + pdfEscape(item.text) + ") Tj ET");
        y -= item.size + 6;
      });
      const stream = ops.join("\n");
      function obj(n, body) {
        return n + " 0 obj\n" + body + "\nendobj\n";
      }
      const chunks = [
        obj(1, "<< /Type /Catalog /Pages 2 0 R >>"),
        obj(2, "<< /Type /Pages /Kids [3 0 R] /Count 1 >>"),
        obj(3, "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>"),
        obj(4, "<< /Length " + stream.length + " >>\nstream\n" + stream + "\nendstream"),
        obj(5, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"),
      ];
      let pdf = "%PDF-1.4\n";
      const offsets = [0];
      chunks.forEach((chunk) => {
        offsets.push(pdf.length);
        pdf += chunk;
      });
      const xrefAt = pdf.length;
      let xref = "xref\n0 6\n0000000000 65535 f \n";
      for (let i = 1; i <= 5; i++) {
        xref += String(offsets[i]).padStart(10, "0") + " 00000 n \n";
      }
      pdf += xref;
      pdf += "trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n" + xrefAt + "\n%%EOF";
      const bytes = new Uint8Array(pdf.length);
      for (let i = 0; i < pdf.length; i++) bytes[i] = pdf.charCodeAt(i) & 0xff;
      return bytes;
    }
    function downloadPdf(filename, bytes) {
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    }
    const pdfBtn = document.getElementById("btn-pdf");
    const pdfState = document.getElementById("pdf-state");
    pdfBtn.addEventListener("click", () => {
      pdfBtn.disabled = true;
      pdfState.textContent = "Saving PDF…";
      try {
        const bytes = buildBoardPdfBytes();
        if (bytes.length < 400) throw new Error("empty pdf");
        downloadPdf("SkillsAtlas-interview-board.pdf", bytes);
        pdfState.textContent = "Saved to your downloads.";
      } catch (err) {
        pdfState.textContent = "Could not save the PDF. Try again.";
      } finally {
        pdfBtn.disabled = false;
      }
    });
