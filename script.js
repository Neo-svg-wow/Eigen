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

    // Merge, dedupe by title + author
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

async function fetchOpenLibrary(query) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
    query
  )}&limit=24`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();

  return (data.docs || []).map((doc) => {
    const key = doc.key; // e.g. /works/OL123W
    return {
      title: doc.title || "Untitled",
      author: (doc.author_name && doc.author_name[0]) || "Unknown author",
      year: doc.first_publish_year || "",
      cover: doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
        : null,
      readUrl: `https://openlibrary.org${key}`,
      source: "Open Library",
    };
  });
}

async function fetchGutenberg(query) {
  const url = `https://gutendex.com/books?search=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();

  return (data.results || []).slice(0, 24).map((book) => {
    const author =
      book.authors && book.authors[0] ? book.authors[0].name : "Unknown author";
    return {
      title: book.title || "Untitled",
      author,
      year: "",
      cover:
        book.formats && book.formats["image/jpeg"]
          ? book.formats["image/jpeg"]
          : null,
      readUrl: `https://www.gutenberg.org/ebooks/${book.id}`,
      source: "Gutenberg",
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
  results.innerHTML = books
    .map((book) => {
      const coverHtml = book.cover
        ? `<img src="${book.cover}" alt="${escapeHtml(
            book.title
          )}" loading="lazy" onerror="this.parentElement.textContent='📖'" />`
        : "📖";

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
