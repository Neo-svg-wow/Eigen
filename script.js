/* =========================================================
   EIGEN — Working JavaScript (Updated Resource Panel)
   ========================================================= */

(function () {
  "use strict";

  // 1. Inject the page HTML
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
        <p class="tagline">Free books for students — Nigerian textbooks, past questions, and global classics.</p>
        <form id="search-form" class="search-bar">
          <input id="search-input" type="text" placeholder="Search by title, author, or subject…" autocomplete="off" required />
          <button type="submit">Search</button>
        </form>
        <p class="hint">Try: "Things Fall Apart", "GST201", or "Jane Austen"</p>
      </div>
    </header>

    <main class="container">
      <div id="status" class="status"></div>
      <section id="results" class="results"></section>

      <section class="ng-resources">
        <h2>📚 More Free Book Sources</h2>
        <p class="ng-intro">Direct links to trusted free book libraries and Nigerian educational resources.</p>
        <div class="ng-grid">
          <a class="ng-card" href="https://nou.edu.ng/courseware/" target="_blank" rel="noopener">
            <span class="ng-tag">Nigeria</span>
            <h3>NOUN e-Courseware</h3>
            <p>Full university course materials — GST, Sciences, Arts, Management. PDF downloads.</p>
          </a>
          <a class="ng-card" href="http://www.oer.unn.edu.ng/" target="_blank" rel="noopener">
            <span class="ng-tag">Nigeria</span>
            <h3>UNN Open Educational Resources</h3>
            <p>Over 22,000 free and open educational resources from the University of Nigeria, Nsukka.</p>
          </a>
          <a class="ng-card" href="https://flashlearners.com/" target="_blank" rel="noopener">
            <span class="ng-tag">Exams</span>
            <h3>Flash Learners</h3>
            <p>WAEC, JAMB, NECO, and BECE past questions, notes, and study guides.</p>
          </a>
          <a class="ng-card" href="https://www.gutenberg.org/" target="_blank" rel="noopener">
            <span class="ng-tag">Classics</span>
            <h3>Project Gutenberg</h3>
            <p>75,000+ public domain books — free EPUB, PDF, and Kindle downloads.</p>
          </a>
          <a class="ng-card" href="https://openlibrary.org/" target="_blank" rel="noopener">
            <span class="ng-tag">Library</span>
            <h3>Open Library</h3>
            <p>Millions of books. Read or borrow free from the Internet Archive.</p>
          </a>
          <a class="ng-card" href="https://archive.org/details/texts" target="_blank" rel="noopener">
            <span class="ng-tag">Archive</span>
            <h3>Internet Archive</h3>
            <p>Millions of free digitized texts, books, and historical documents.</p>
          </a>
          <a class="ng-card" href="https://manybooks.net/" target="_blank" rel="noopener">
            <span class="ng-tag">E-Books</span>
            <h3>ManyBooks</h3>
            <p>Over 50,000 free e-books across every genre, in EPUB, PDF, and Kindle formats.</p>
          </a>
          <a class="ng-card" href="https://www.pdfdrive.com/" target="_blank" rel="noopener">
            <span class="ng-tag">PDF Search</span>
            <h3>PDF Drive</h3>
            <p>A search engine for finding PDF files. The closest experience to OceanofPDF, but use with caution.</p>
          </a>
          <a class="ng-card" href="https://www.nap.edu/" target="_blank" rel="noopener">
            <span class="ng-tag">Academic</span>
            <h3>National Academies Press</h3>
            <p>Free downloads of PDFs in education, science, medicine, and engineering.</p>
          </a>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>Built with <a href="https://openlibrary.org" target="_blank" rel="noopener">Open Library</a> and <a href="https://www.gutenberg.org" target="_blank" rel="noopener">Project Gutenberg</a>. All books are free and legal to read.</p>
    </footer>
  `;

  // 2. Inject the CSS (unchanged from your working version)
  const style = document.createElement("style");
  style.textContent = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { height: 100%; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0a0c18; color: #f4f5ff; line-height: 1.55; min-height: 100vh; display: flex; flex-direction: column; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
    #app { display: contents; }
    .bg { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; background: radial-gradient(ellipse at 20% 10%, #171b38 0%, transparent 55%), radial-gradient(ellipse at 80% 90%, #1b1233 0%, transparent 55%), linear-gradient(180deg, #080a16 0%, #0a0c18 100%); }
    .glow { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.55; animation: floatGlow 18s ease-in-out infinite; }
    .glow-1 { width: 45vw; height: 45vw; max-width: 500px; max-height: 500px; background: radial-gradient(circle, #4a63ff, transparent 70%); top: -12%; left: -10%; }
    .glow-2 { width: 40vw; height: 40vw; max-width: 460px; max-height: 460px; background: radial-gradient(circle, #a05cff, transparent 70%); bottom: -15%; right: -10%; animation-delay: -6s; }
    .glow-3 { width: 30vw; height: 30vw; max-width: 340px; max-height: 340px; background: radial-gradient(circle, #2ec5ff, transparent 70%); top: 45%; left: 55%; animation-delay: -12s; opacity: 0.35; }
    @keyframes floatGlow { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-40px) scale(1.08); } }
    .book { position: absolute; top: 50%; left: 50%; width: 220px; height: 300px; transform: translate(-50%,-50%) rotateX(12deg) rotateY(-18deg); transform-style: preserve-3d; perspective: 1400px; animation: bookFloat 8s ease-in-out infinite; opacity: 0.55; }
    .book-inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; animation: bookSway 12s ease-in-out infinite; }
    .book .page { position: absolute; top: 4%; height: 92%; width: 48%; background: linear-gradient(135deg, #f6f7ff 0%, #dfe3ff 100%); border-radius: 3px 8px 8px 3px; box-shadow: inset -6px 0 14px rgba(0,0,0,0.08), 0 10px 30px rgba(0,0,0,0.5); backface-visibility: hidden; }
    .page-left { left: 2%; transform-origin: right center; animation: flipLeft 6s ease-in-out infinite; }
    .page-right { right: 2%; transform-origin: left center; border-radius: 8px 3px 3px 8px; animation: flipRight 6s ease-in-out infinite; animation-delay: -3s; }
    .cover { position: absolute; inset: -3% -5%; background: linear-gradient(135deg, #2b3160 0%, #141731 100%); border-radius: 6px 12px 12px 6px; box-shadow: 0 30px 70px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,156,255,0.25), inset 0 0 40px rgba(124,156,255,0.15); z-index: -1; }
    @keyframes bookFloat { 0%, 100% { transform: translate(-50%,-50%) rotateX(12deg) rotateY(-18deg) translateY(0); } 50% { transform: translate(-50%,-50%) rotateX(12deg) rotateY(-18deg) translateY(-18px); } }
    @keyframes bookSway { 0%, 100% { transform: rotateZ(0deg); } 50% { transform: rotateZ(-4deg); } }
    @keyframes flipLeft { 0%, 60%, 100% { transform: rotateY(0deg); } 75% { transform: rotateY(-22deg); } }
    @keyframes flipRight { 0%, 60%, 100% { transform: rotateY(0deg); } 75% { transform: rotateY(22deg); } }
    .container { width: 100%; max-width: 1120px; margin: 0 auto; padding: 0 1.25rem; position: relative; z-index: 1; }
    .hero { padding: 4.5rem 0 3rem; text-align: center; }
    .hero h1 { font-size: clamp(2.2rem, 6vw, 3.4rem); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.6rem; background: linear-gradient(135deg, #fff 0%, #9db1ff 60%, #b58cff 100%); -webkit-background-clip: text; background-clip: text; color: transparent; filter: drop-shadow(0 6px 30px rgba(124,156,255,0.35)); }
    .tagline { color: #a6adcf; margin-bottom: 2.25rem; font-size: clamp(0.95rem, 2.4vw, 1.1rem); }
    .search-bar { display: flex; gap: 0.6rem; max-width: 640px; margin: 0 auto; background: rgba(255,255,255,0.04); border: 1px solid rgba(124,156,255,0.18); border-radius: 16px; padding: 0.5rem; backdrop-filter: blur(14px); box-shadow: 0 20px 50px rgba(0,0,0,0.55); }
    .search-bar input { flex: 1; min-width: 0; padding: 0.85rem 1rem; font-size: 1rem; border-radius: 12px; border: none; background: transparent; color: #f4f5ff; outline: none; }
    .search-bar button { padding: 0.85rem 1.5rem; font-size: 0.98rem; font-weight: 700; border: none; border-radius: 12px; background: linear-gradient(135deg, #7c9cff 0%, #b58cff 100%); color: white; cursor: pointer; transition: transform 0.15s, filter 0.2s; box-shadow: 0 8px 24px rgba(124,156,255,0.35); white-space: nowrap; }
    .search-bar button:hover { transform: translateY(-1px); filter: brightness(1.1); }
    .hint { margin-top: 1rem; font-size: 0.88rem; color: #a6adcf; opacity: 0.85; }
    .status { text-align: center; padding: 1.5rem 0; color: #a6adcf; min-height: 1rem; }
    .results { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1.35rem; padding-bottom: 3rem; }
    .card { background: rgba(26,30,51,0.72); border: 1px solid rgba(124,156,255,0.18); border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; backdrop-filter: blur(14px); box-shadow: 0 10px 30px rgba(0,0,0,0.35); transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s; }
    .card:hover { transform: translateY(-6px); border-color: rgba(124,156,255,0.55); box-shadow: 0 20px 45px rgba(60,80,200,0.35); }
    .card .cover-img { aspect-ratio: 2/3; background: rgba(35,40,66,0.9); display: flex; align-items: center; justify-content: center; color: #a6adcf; font-size: 2rem; overflow: hidden; }
    .card .cover-img img { width: 100%; height: 100%; object-fit: cover; }
    .card .info { padding: 0.9rem 0.95rem 1rem; display: flex; flex-direction: column; flex: 1; }
    .card h3 { font-size: 0.98rem; margin-bottom: 0.3rem; line-height: 1.3; font-weight: 700; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .card .author { font-size: 0.85rem; color: #a6adcf; margin-bottom: 0.35rem; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
    .card .year { font-size: 0.78rem; color: #7c84b0; margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 0.04em; }
    .card .actions { margin-top: auto; display: flex; flex-wrap: wrap; gap: 0.45rem; }
    .card a, .card button { flex: 1 1 auto; min-width: 84px; text-align: center; padding: 0.55rem 0.6rem; font-size: 0.82rem; font-weight: 700; border-radius: 10px; text-decoration: none; background: linear-gradient(135deg, #7c9cff 0%, #b58cff 100%); color: white; white-space: nowrap; box-shadow: 0 6px 16px rgba(124,156,255,0.28); border: none; cursor: pointer; }
    .card button.secondary { background: transparent; border: 1px solid rgba(124,156,255,0.18); color: #f4f5ff; box-shadow: none; }
    .card button.secondary:hover { border-color: #7c9cff; background: rgba(124,156,255,0.08); }
    .ng-resources { margin: 2rem 0 3rem; padding: 2rem 0 0; border-top: 1px solid rgba(124,156,255,0.18); }
    .ng-resources h2 { font-size: clamp(1.3rem, 3.5vw, 1.75rem); font-weight: 800; margin-bottom: 0.5rem; background: linear-gradient(135deg, #fff 0%, #9db1ff 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
    .ng-intro { color: #a6adcf; margin-bottom: 1.75rem; font-size: 0.95rem; }
    .ng-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.1rem; }
    .ng-card { display: block; padding: 1.1rem 1.15rem 1.25rem; background: rgba(26,30,51,0.72); border: 1px solid rgba(124,156,255,0.18); border-radius: 14px; text-decoration: none; color: #f4f5ff; backdrop-filter: blur(14px); transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s; }
    .ng-card:hover { transform: translateY(-4px); border-color: rgba(124,156,255,0.55); box-shadow: 0 16px 40px rgba(60,80,200,0.3); }
    .ng-tag { display: inline-block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 0.25rem 0.6rem; border-radius: 999px; background: linear-gradient(135deg, rgba(124,156,255,0.2), rgba(181,140,255,0.2)); border: 1px solid rgba(124,156,255,0.35); color: #b7c4ff; margin-bottom: 0.65rem; }
    .ng-card h3 { font-size: 1.02rem; font-weight: 700; margin-bottom: 0.4rem; }
    .ng-card p { font-size: 0.86rem; color: #a6adcf; line-height: 1.45; }
    .footer { margin-top: auto; padding: 1.5rem 0; text-align: center; font-size: 0.85rem; color: #a6adcf; border-top: 1px solid rgba(124,156,255,0.18); backdrop-filter: blur(10px); }
    .footer a { color: #7c9cff; text-decoration: none; }
    .footer a:hover { text-decoration: underline; }
    @media (max-width: 640px) { .hero { padding: 3rem 0 2rem; } .search-bar { flex-direction: column; padding: 0.6rem; } .search-bar button { width: 100%; } .results { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem; } .ng-grid { grid-template-columns: 1fr; } .book { width: 170px; height: 240px; opacity: 0.42; } }
    @media (prefers-reduced-motion: reduce) { .book, .book-inner, .book .page, .glow { animation: none !important; } }
  `;
  document.head.appendChild(style);

  // 3. Logic & Search Functions
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  const results = document.getElementById("results");
  const status = document.getElementById("status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    searchBooks(q);
  });

  async function searchBooks(query) {
    status.textContent = `Searching for "${query}"…`;
    results.innerHTML = "";

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
        status.textContent = `No free books found for "${query}". Try another search or browse the resources below.`;
        return;
      }
      status.textContent = `Found ${merged.length} results for "${query}"`;
      renderBooks(merged);
    } catch (err) {
      console.error(err);
      status.textContent = "Something went wrong. Please try again.";
    }
  }

  async function fetchOpenLibrary(query) {
    const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=24`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.docs || []).map((doc) => ({
      title: doc.title || "Untitled",
      author: (doc.author_name && doc.author_name[0]) || "Unknown author",
      year: doc.first_publish_year || "",
      cover: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null,
      readUrl: `https://openlibrary.org${doc.key}`,
      source: "Open Library",
      downloadUrl: null
    }));
  }

  async function fetchGutenberg(query) {
    const res = await fetch(`https://gutendex.com/books?search=${encodeURIComponent(query)}`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).slice(0, 24).map((book) => {
      const formats = book.formats || {};
      const downloadUrl = formats["application/pdf"] || formats["application/epub+zip"] || formats["text/plain; charset=utf-8"] || formats["text/plain"] || null;
      const downloadLabel = formats["application/pdf"] ? "Download PDF" : formats["application/epub+zip"] ? "Download EPUB" : downloadUrl ? "Download TXT" : null;
      return {
        title: book.title || "Untitled",
        author: book.authors?.[0]?.name || "Unknown author",
        year: "",
        cover: formats["image/jpeg"] || null,
        readUrl: `https://www.gutenberg.org/ebooks/${book.id}`,
        source: "Gutenberg",
        downloadUrl,
        downloadLabel
      };
    });
  }

  function dedupe(books) {
    const seen = new Set();
    return books.filter((b) => {
      const key = `${b.title.toLowerCase()}|${b.author.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function renderBooks(books) {
    results.innerHTML = books.map((book) => {
      const coverHtml = book.cover ? `<img src="${book.cover}" alt="${escapeHtml(book.title)}" loading="lazy" onerror="this.parentElement.textContent='📖'" />` : "📖";
      
      let actionButtons = `<a href="${book.readUrl}" target="_blank" rel="noopener">Read Free</a>`;
      
      if (book.downloadUrl) {
        // For Gutenberg, use a direct link. The browser will handle the download.
        actionButtons += `<a href="${book.downloadUrl}" download class="secondary" target="_blank" rel="noopener">${book.downloadLabel}</a>`;
      }

      return `
        <article class="card">
          <div class="cover-img">${coverHtml}</div>
          <div class="info">
            <h3>${escapeHtml(book.title)}</h3>
            <p class="author">${escapeHtml(book.author)}</p>
            <p class="year">${book.year ? book.year + " · " : ""}${book.source}</p>
            <div class="actions">
              ${actionButtons}
            </div>
          </div>
        </article>
      `;
    }).join("");
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
