/* =========================================================
   EIGEN — All formats (PDF, EPUB, Kindle, TXT, HTML) + filter
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 1. Page HTML ---------- */
  document.getElementById("app").innerHTML = `
    <div class="bg" aria-hidden="true">
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
      <div class="glow glow-3"></div>
      <div class="book">
        <div class="book-inner">
          <div class="page page-left"></div>
          <div class="page page-right"></div>
          <div class="cover"></div>
        </div>
      </div>
    </div>

    <header class="hero">
      <div class="container">
        <h1>📚 Eigen</h1>
        <p class="tagline">Free books for students — every format, no sign-up.</p>
        <form id="search-form" class="search-bar">
          <input id="search-input" type="text"
            placeholder="Search by title, author, subject, or course code…"
            autocomplete="off" required />
          <button type="submit">Search</button>
        </form>
        <p class="hint">Try: "Things Fall Apart", "GST201", "WAEC Physics", or "Jane Austen"</p>
      </div>
    </header>

    <main class="container">
      <div id="filter-bar" class="filter-bar" hidden>
        <span class="filter-label">Format:</span>
        <button class="filter-chip active" data-format="all">All</button>
        <button class="filter-chip" data-format="PDF">PDF</button>
        <button class="filter-chip" data-format="EPUB">EPUB</button>
        <button class="filter-chip" data-format="Kindle">Kindle</button>
        <button class="filter-chip" data-format="TXT">TXT</button>
        <button class="filter-chip" data-format="HTML">HTML</button>
      </div>

      <div id="status" class="status"></div>
      <section id="results" class="results"></section>

      <section class="ng-resources">
        <h2>🇳🇬 Nigerian & Global Sources</h2>
        <p class="ng-intro">Trusted free educational resources. All free to access.</p>
        <div class="ng-grid">
          <a class="ng-card" href="https://nou.edu.ng/courseware/" target="_blank" rel="noopener">
            <span class="ng-tag">University</span>
            <h3>NOUN e-Courseware</h3>
            <p>Full university course materials — GST, Sciences, Arts, Management. PDF downloads.</p>
          </a>
          <a class="ng-card" href="https://flashlearners.com/" target="_blank" rel="noopener">
            <span class="ng-tag">Exams</span>
            <h3>Flash Learners</h3>
            <p>WAEC, JAMB, NECO, and BECE past questions, notes, and study guides.</p>
          </a>
          <a class="ng-card" href="https://www.africanstorybook.org/" target="_blank" rel="noopener">
            <span class="ng-tag">Primary</span>
            <h3>African Storybook</h3>
            <p>Free picture storybooks in Yoruba, Igbo, Hausa, and other African languages.</p>
          </a>
          <a class="ng-card" href="https://lagoshope.org/" target="_blank" rel="noopener">
            <span class="ng-tag">Primary / JSS</span>
            <h3>Lagos HOPE e-Learning</h3>
            <p>Free textbooks for Primary 1–6 and Junior Secondary students, by Lagos State.</p>
          </a>
          <a class="ng-card" href="https://www.gutenberg.org/" target="_blank" rel="noopener">
            <span class="ng-tag">Classics</span>
            <h3>Project Gutenberg</h3>
            <p>75,000+ public domain books — free EPUB, PDF, and Kindle downloads.</p>
          </a>
          <a class="ng-card" href="https://openlibrary.org/" target="_blank" rel="noopener">
            <span class="ng-tag">Global</span>
            <h3>Open Library</h3>
            <p>Millions of books. Read or borrow free from the Internet Archive.</p>
          </a>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>Built with <a href="https://openlibrary.org" target="_blank" rel="noopener">Open Library</a>,
      <a href="https://www.gutenberg.org" target="_blank" rel="noopener">Project Gutenberg</a>,
      and Nigerian educational sources. All books are free and legal to read.</p>
    </footer>
  `;

  /* ---------- 2. CSS ---------- */
  const style = document.createElement("style");
  style.textContent = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { height: 100%; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0a0c18; color: #f4f5ff; line-height: 1.55;
      min-height: 100vh; display: flex; flex-direction: column;
      overflow-x: hidden; -webkit-font-smoothing: antialiased;
    }
    #app { display: contents; }

    /* Background */
    .bg {
      position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none;
      background:
        radial-gradient(ellipse at 20% 10%, #171b38 0%, transparent 55%),
        radial-gradient(ellipse at 80% 90%, #1b1233 0%, transparent 55%),
        linear-gradient(180deg, #080a16 0%, #0a0c18 100%);
    }
    .glow { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.55;
      animation: floatGlow 18s ease-in-out infinite; }
    .glow-1 { width: 45vw; height: 45vw; max-width: 500px; max-height: 500px;
      background: radial-gradient(circle, #4a63ff, transparent 70%);
      top: -12%; left: -10%; }
    .glow-2 { width: 40vw; height: 40vw; max-width: 460px; max-height: 460px;
      background: radial-gradient(circle, #a05cff, transparent 70%);
      bottom: -15%; right: -10%; animation-delay: -6s; }
    .glow-3 { width: 30vw; height: 30vw; max-width: 340px; max-height: 340px;
      background: radial-gradient(circle, #2ec5ff, transparent 70%);
      top: 45%; left: 55%; animation-delay: -12s; opacity: 0.35; }
    @keyframes floatGlow {
      0%, 100% { transform: translate(0,0) scale(1); }
      50% { transform: translate(30px,-40px) scale(1.08); }
    }
    .book {
      position: absolute; top: 50%; left: 50%;
      width: 220px; height: 300px;
      transform: translate(-50%,-50%) rotateX(12deg) rotateY(-18deg);
      transform-style: preserve-3d; perspective: 1400px;
      animation: bookFloat 8s ease-in-out infinite; opacity: 0.55;
    }
    .book-inner { position: relative; width: 100%; height: 100%;
      transform-style: preserve-3d; animation: bookSway 12s ease-in-out infinite; }
    .book .page {
      position: absolute; top: 4%; height: 92%; width: 48%;
      background: linear-gradient(135deg, #f6f7ff 0%, #dfe3ff 100%);
      border-radius: 3px 8px 8px 3px;
      box-shadow: inset -6px 0 14px rgba(0,0,0,0.08), 0 10px 30px rgba(0,0,0,0.5);
      backface-visibility: hidden;
    }
    .page-left { left: 2%; transform-origin: right center;
      animation: flipLeft 6s ease-in-out infinite; }
    .page-right { right: 2%; transform-origin: left center;
      border-radius: 8px 3px 3px 8px; animation: flipRight 6s ease-in-out infinite;
      animation-delay: -3s; }
    .cover {
      position: absolute; inset: -3% -5%;
      background: linear-gradient(135deg, #2b3160 0%, #141731 100%);
      border-radius: 6px 12px 12px 6px;
      box-shadow: 0 30px 70px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,156,255,0.25),
        inset 0 0 40px rgba(124,156,255,0.15);
      z-index: -1;
    }
    @keyframes bookFloat {
      0%, 100% { transform: translate(-50%,-50%) rotateX(12deg) rotateY(-18deg) translateY(0); }
      50% { transform: translate(-50%,-50%) rotateX(12deg) rotateY(-18deg) translateY(-18px); }
    }
    @keyframes bookSway { 0%,100% { transform: rotateZ(0); } 50% { transform: rotateZ(-4deg); } }
    @keyframes flipLeft { 0%,60%,100% { transform: rotateY(0); } 75% { transform: rotateY(-22deg); } }
    @keyframes flipRight { 0%,60%,100% { transform: rotateY(0); } 75% { transform: rotateY(22deg); } }

    /* Layout */
    .container { width: 100%; max-width: 1120px; margin: 0 auto;
      padding: 0 1.25rem; position: relative; z-index: 1; }
    .hero { padding: 4.5rem 0 3rem; text-align: center; }
    .hero h1 {
      font-size: clamp(2.2rem, 6vw, 3.4rem); font-weight: 800;
      letter-spacing: -0.02em; margin-bottom: 0.6rem;
      background: linear-gradient(135deg, #fff 0%, #9db1ff 60%, #b58cff 100%);
      -webkit-background-clip: text; background-clip: text; color: transparent;
      filter: drop-shadow(0 6px 30px rgba(124,156,255,0.35));
    }
    .tagline { color: #a6adcf; margin-bottom: 2.25rem;
      font-size: clamp(0.95rem, 2.4vw, 1.1rem); }

    /* Search */
    .search-bar {
      display: flex; gap: 0.6rem; max-width: 640px; margin: 0 auto;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(124,156,255,0.18);
      border-radius: 16px; padding: 0.5rem;
      backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
      box-shadow: 0 20px 50px rgba(0,0,0,0.55);
    }
    .search-bar input {
      flex: 1; min-width: 0; padding: 0.85rem 1rem;
      font-size: 1rem; border-radius: 12px; border: none;
      background: transparent; color: #f4f5ff; outline: none;
    }
    .search-bar input::placeholder { color: #7a80a8; }
    .search-bar button {
      padding: 0.85rem 1.5rem; font-size: 0.98rem; font-weight: 700;
      border: none; border-radius: 12px;
      background: linear-gradient(135deg, #7c9cff 0%, #b58cff 100%);
      color: white; cursor: pointer; white-space: nowrap;
      transition: transform 0.15s, filter 0.2s;
      box-shadow: 0 8px 24px rgba(124,156,255,0.35);
    }
    .search-bar button:hover { transform: translateY(-1px); filter: brightness(1.1); }
    .hint { margin-top: 1rem; font-size: 0.88rem; color: #a6adcf; opacity: 0.85; }

    /* Format filter bar */
    .filter-bar {
      display: flex; flex-wrap: wrap; align-items: center;
      gap: 0.5rem; justify-content: center;
      padding: 1rem 0 1.25rem;
    }
    .filter-label {
      font-size: 0.85rem; color: #a6adcf;
      text-transform: uppercase; letter-spacing: 0.06em;
      font-weight: 700; margin-right: 0.25rem;
    }
    .filter-chip {
      padding: 0.4rem 0.9rem;
      font-size: 0.82rem; font-weight: 700;
      border-radius: 999px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(124,156,255,0.18);
      color: #c8cff0; cursor: pointer;
      transition: all 0.18s ease;
    }
    .filter-chip:hover {
      border-color: rgba(124,156,255,0.55);
      color: #fff;
    }
    .filter-chip.active {
      background: linear-gradient(135deg, #7c9cff 0%, #b58cff 100%);
      border-color: transparent;
      color: white;
      box-shadow: 0 6px 18px rgba(124,156,255,0.4);
    }

    /* Status */
    .status { text-align: center; padding: 1.25rem 0; color: #a6adcf; min-height: 1rem; }

    /* Results */
    .results {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 1.35rem; padding-bottom: 3rem;
    }
    .card {
      background: rgba(26,30,51,0.72);
      border: 1px solid rgba(124,156,255,0.18);
      border-radius: 16px; overflow: hidden;
      display: flex; flex-direction: column;
      backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.35);
      transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
    }
    .card:hover {
      transform: translateY(-6px);
      border-color: rgba(124,156,255,0.55);
      box-shadow: 0 20px 45px rgba(60,80,200,0.35);
    }
    .card .cover-img {
      aspect-ratio: 2/3; background: rgba(35,40,66,0.9);
      display: flex; align-items: center; justify-content: center;
      color: #a6adcf; font-size: 2rem; overflow: hidden;
    }
    .card .cover-img img { width: 100%; height: 100%; object-fit: cover;
      transition: transform 0.4s ease; }
    .card:hover .cover-img img { transform: scale(1.05); }
    .card .info { padding: 0.9rem 0.95rem 1rem;
      display: flex; flex-direction: column; flex: 1; }
    .card h3 {
      font-size: 0.98rem; margin-bottom: 0.3rem; line-height: 1.3; font-weight: 700;
      display: -webkit-box; -webkit-line-clamp: 2;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    .card .author {
      font-size: 0.85rem; color: #a6adcf; margin-bottom: 0.35rem;
      display: -webkit-box; -webkit-line-clamp: 1;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    .card .year {
      font-size: 0.78rem; color: #7c84b0; margin-bottom: 0.7rem;
      text-transform: uppercase; letter-spacing: 0.04em;
    }

    /* Format badges + action buttons */
    .card .formats {
      display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.7rem;
    }
    .card .fmt-badge {
      font-size: 0.68rem; font-weight: 800;
      padding: 0.18rem 0.5rem; border-radius: 6px;
      background: rgba(124,156,255,0.14);
      border: 1px solid rgba(124,156,255,0.3);
      color: #b7c4ff; letter-spacing: 0.05em;
    }
    .card .actions { margin-top: auto; display: flex; flex-direction: column; gap: 0.4rem; }
    .card .actions-row { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .card a, .card button {
      flex: 1 1 auto; min-width: 70px; text-align: center;
      padding: 0.5rem 0.55rem; font-size: 0.78rem; font-weight: 700;
      border-radius: 9px; text-decoration: none;
      background: linear-gradient(135deg, #7c9cff 0%, #b58cff 100%);
      color: white; white-space: nowrap;
      box-shadow: 0 5px 14px rgba(124,156,255,0.28);
      border: none; cursor: pointer;
      transition: transform 0.15s, filter 0.2s;
    }
    .card a:hover, .card button:hover { transform: translateY(-1px); filter: brightness(1.1); }
    .card a.secondary, .card button.secondary {
      background: transparent;
      border: 1px solid rgba(124,156,255,0.2);
      color: #e6e9ff; box-shadow: none;
    }
    .card a.secondary:hover, .card button.secondary:hover {
      border-color: #7c9cff;
      background: rgba(124,156,255,0.08);
    }

    /* Nigerian resources */
    .ng-resources {
      margin: 2rem 0 3rem; padding: 2rem 0 0;
      border-top: 1px solid rgba(124,156,255,0.18);
    }
    .ng-resources h2 {
      font-size: clamp(1.3rem, 3.5vw, 1.75rem); font-weight: 800;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #fff 0%, #9db1ff 100%);
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }
    .ng-intro { color: #a6adcf; margin-bottom: 1.75rem; font-size: 0.95rem; }
    .ng-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 1.1rem;
    }
    .ng-card {
      display: block; padding: 1.1rem 1.15rem 1.25rem;
      background: rgba(26,30,51,0.72);
      border: 1px solid rgba(124,156,255,0.18);
      border-radius: 14px; text-decoration: none; color: #f4f5ff;
      backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
      transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
    }
    .ng-card:hover {
      transform: translateY(-4px);
      border-color: rgba(124,156,255,0.55);
      box-shadow: 0 16px 40px rgba(60,80,200,0.3);
    }
    .ng-tag {
      display: inline-block; font-size: 0.7rem; font-weight: 700;
      letter-spacing: 0.06em; text-transform: uppercase;
      padding: 0.25rem 0.6rem; border-radius: 999px;
      background: linear-gradient(135deg, rgba(124,156,255,0.2), rgba(181,140,255,0.2));
      border: 1px solid rgba(124,156,255,0.35);
      color: #b7c4ff; margin-bottom: 0.65rem;
    }
    .ng-card h3 { font-size: 1.02rem; font-weight: 700; margin-bottom: 0.4rem; }
    .ng-card p { font-size: 0.86rem; color: #a6adcf; line-height: 1.45; }

    /* Footer */
    .footer {
      margin-top: auto; padding: 1.5rem 0; text-align: center;
      font-size: 0.85rem; color: #a6adcf;
      border-top: 1px solid rgba(124,156,255,0.18);
      backdrop-filter: blur(10px);
    }
    .footer a { color: #7c9cff; text-decoration: none; }
    .footer a:hover { text-decoration: underline; }

    /* Mobile */
    @media (max-width: 640px) {
      .hero { padding: 3rem 0 2rem; }
      .search-bar { flex-direction: column; padding: 0.6rem; }
      .search-bar button { width: 100%; }
      .filter-bar { padding: 0.5rem 0 1rem; }
      .filter-label { width: 100%; text-align: center; margin-bottom: 0.25rem; }
      .results { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem; }
      .ng-grid { grid-template-columns: 1fr; }
      .book { width: 170px; height: 240px; opacity: 0.42; }
    }
    @media (prefers-reduced-motion: reduce) {
      .book, .book-inner, .book .page, .glow { animation: none !important; }
    }
  `;
  document.head.appendChild(style);

  /* ---------- 3. State + wiring ---------- */
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  const results = document.getElementById("results");
  const status = document.getElementById("status");
  const filterBar = document.getElementById("filter-bar");

  let allBooks = [];          // full result set
  let activeFormat = "all";   // current filter

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    activeFormat = "all";
    setActiveChip("all");
    searchBooks(q);
  });

  filterBar.addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;
    const fmt = chip.dataset.format;
    activeFormat = fmt;
    setActiveChip(fmt);
    renderBooks(allBooks); // re-render with filter
  });

  function setActiveChip(fmt) {
    filterBar.querySelectorAll(".filter-chip").forEach((c) => {
      c.classList.toggle("active", c.dataset.format === fmt);
    });
  }

  /* ---------- 4. Search ---------- */
  async function searchBooks(query) {
    status.textContent = `Searching for "${query}"…`;
    results.innerHTML = "";
    filterBar.hidden = true;
    allBooks = [];

    try {
      const [ol, gut] = await Promise.allSettled([
        fetchOpenLibrary(query),
        fetchGutenberg(query),
      ]);

      const merged = dedupe([
        ...(gut.status === "fulfilled" ? gut.value : []),
        ...(ol.status === "fulfilled" ? ol.value : []),
      ]);

      if (merged.length === 0) {
        status.textContent = `No free books found for "${query}". Try another search or browse the Nigerian resources below.`;
        return;
      }

      allBooks = merged;
      filterBar.hidden = false;
      status.textContent = `Found ${merged.length} free book${merged.length === 1 ? "" : "s"} for "${query}"`;
      renderBooks(allBooks);
    } catch (err) {
      console.error(err);
      status.textContent = "Something went wrong. Please try again.";
    }
  }

  /* ---------- 5. Sources ---------- */
  async function fetchOpenLibrary(query) {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=24`
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.docs || []).map((doc) => ({
      title: doc.title || "Untitled",
      author: (doc.author_name && doc.author_name[0]) || "Unknown author",
      year: doc.first_publish_year || "",
      cover: doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
        : null,
      readUrl: `https://openlibrary.org${doc.key}`,
      source: "Open Library",
      downloads: [], // Open Library books are borrow-only
    }));
  }

  async function fetchGutenberg(query) {
    const res = await fetch(
      `https://gutendex.com/books?search=${encodeURIComponent(query)}`
    );
    if (!res.ok) return [];
    const data = await res.json();

    return (data.results || []).slice(0, 24).map((book) => {
      const f = book.formats || {};
      const downloads = [];

      // PDF
      if (f["application/pdf"]) {
        downloads.push({ url: f["application/pdf"], label: "PDF", type: "PDF" });
      }
      // EPUB
      if (f["application/epub+zip"]) {
        downloads.push({ url: f["application/epub+zip"], label: "EPUB", type: "EPUB" });
      }
      // Kindle (MOBI)
      if (f["application/x-mobipocket-ebook"]) {
        downloads.push({
          url: f["application/x-mobipocket-ebook"],
          label: "Kindle",
          type: "Kindle",
        });
      }
      // Plain text
      const txt = f["text/plain; charset=utf-8"] || f["text/plain"];
      if (txt) {
        downloads.push({ url: txt, label: "TXT", type: "TXT" });
      }
      // HTML
      const html =
        f["text/html; charset=utf-8"] ||
        f["text/html; charset=iso-8859-1"] ||
        f["text/html"];
      if (html) {
        downloads.push({ url: html, label: "HTML", type: "HTML" });
      }

      return {
        title: book.title || "Untitled",
        author: book.authors?.[0]?.name || "Unknown author",
        year: "",
        cover: f["image/jpeg"] || null,
        readUrl: `https://www.gutenberg.org/ebooks/${book.id}`,
        source: "Gutenberg",
        downloads,
      };
    });
  }

  /* ---------- 6. Helpers ---------- */
  function dedupe(books) {
    const seen = new Set();
    return books.filter((b) => {
      const key = `${b.title.toLowerCase()}|${b.author.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function bookMatchesFilter(book, fmt) {
    if (fmt === "all") return true;
    return (book.downloads || []).some((d) => d.type === fmt);
  }

  function renderBooks(books) {
    const filtered = books.filter((b) => bookMatchesFilter(b, activeFormat));

    if (filtered.length === 0) {
      results.innerHTML = "";
      status.textContent =
        activeFormat === "all"
          ? "No results."
          : `No books in "${activeFormat}" format. Try "All".`;
      return;
    }

    status.textContent = `Showing ${filtered.length} book${filtered.length === 1 ? "" : "s"}${
      activeFormat === "all" ? "" : ` in ${activeFormat}`
    }`;

    results.innerHTML = filtered
      .map((book) => {
        const coverHtml = book.cover
          ? `<img src="${book.cover}" alt="${escapeHtml(book.title)}" loading="lazy"
              onerror="this.parentElement.textContent='📖'" />`
          : "📖";

        // Format badges
        const badges = (book.downloads || [])
          .map((d) => `<span class="fmt-badge">${d.type}</span>`)
          .join("");

        // Download buttons
        const downloadButtons = (book.downloads || [])
          .map(
            (d) =>
              `<a href="${d.url}" download class="secondary" target="_blank" rel="noopener">⬇ ${d.label}</a>`
          )
          .join("");

        return `
          <article class="card">
            <div class="cover-img">${coverHtml}</div>
            <div class="info">
              <h3>${escapeHtml(book.title)}</h3>
              <p class="author">${escapeHtml(book.author)}</p>
              <p class="year">${book.year ? book.year + " · " : ""}${book.source}</p>
              ${badges ? `<div class="formats">${badges}</div>` : ""}
              <div class="actions">
                <div class="actions-row">
                  <a href="${book.readUrl}" target="_blank" rel="noopener">Read Free</a>
                </div>
                ${
                  downloadButtons
                    ? `<div class="actions-row">${downloadButtons}</div>`
                    : ""
                }
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
