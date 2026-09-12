const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const results = document.getElementById("results");
const status = document.getElementById("status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;
  searchBooks(query);
});

async function searchBooks(query) {
  status.textContent = `Searching for "${query}"…`;
  results.innerHTML = "";

  try {
    const [openLibrary, gutenberg] = await Promise.all([
      fetchOpenLibrary(query),
      fetchGutenberg(query),
    ]);

    const merged = dedupe([...gutenberg, ...openLibrary]);

    if (merged.length === 0) {
      status.textContent = `No free books found for "${query}". Try another search.`;
      return;
    }

    status.textContent = `Found ${merged.length} free book${
      merged.length === 1 ? "" : "s"
    } for "${query}"`;
    renderBooks(merged);
  } catch (err) {
    console.error(err);
    status.textContent = "Something went wrong. Please try again.";
  }
}

/* ---------- Open Library ---------- */
async function fetchOpenLibrary(query) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
    query
  )}&limit=24`;
  const res = await fetch(url);
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
    downloadUrl: null, // Open Library books usually need to be borrowed
  }));
}

/* ---------- Project Gutenberg ---------- */
async function fetchGutenberg(query) {
  const url = `https://gutendex.com/books?search=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();

  return (data.results || []).slice(0, 24).map((book) => {
    const author =
      book.authors && book.authors[0]
        ? book.authors[0].name
        : "Unknown author";

    // Pick the best downloadable format
    const formats = book.formats || {};
    const downloadUrl =
      formats["application/epub+zip"] ||
      formats["application/x-mobipocket-ebook"] ||
      formats["text/plain; charset=utf-8"] ||
      formats["text/plain"] ||
      null;

    const downloadLabel = formats["application/epub+zip"]
      ? "Download EPUB"
      : formats["application/x-mobipocket-ebook"]
      ? "Download MOBI"
      : downloadUrl
      ? "Download TXT"
      : null;

    return {
      title: book.title || "Untitled",
      author,
      year: "",
      cover: formats["image/jpeg"] || null,
      readUrl: `https://www.gutenberg.org/ebooks/${book.id}`,
      source: "Gutenberg",
      downloadUrl,
      downloadLabel,
    };
  });
}

/* ---------- Helpers ---------- */
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
  results.innerHTML = books
    .map((book) => {
      const coverHtml = book.cover
        ? `<img src="${book.cover}" alt="${escapeHtml(
            book.title
          )}" loading="lazy" onerror="this.parentElement.textContent='📖'" />`
        : "📖";

      // Build buttons: Read (always) + Download (only when available)
      const downloadBtn =
        book.downloadUrl && book.downloadLabel
          ? `<a href="${book.downloadUrl}" download class="secondary" target="_blank" rel="noopener">${book.downloadLabel}</a>`
          : "";

      return `
        <article class="card">
          <div class="cover">${coverHtml}</div>
          <div class="info">
            <h3>${escapeHtml(book.title)}</h3>
            <p class="author">${escapeHtml(book.author)}</p>
            <p class="year">${book.year ? book.year + " · " : ""}${
        book.source
      }</p>
            <div class="actions">
              <a href="${book.readUrl}" target="_blank" rel="noopener">Read free</a>
              ${downloadBtn}
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
