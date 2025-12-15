const REPO = "zynomon/error";
const BRANCH = "web-side";
const ICONS = "icons/";
const ROOT = "";

function iconFor(name, type, path) {
  if (name === "..") return "dirback.png";
  if (type === "dir") return "dir.png";
  if (name.endsWith(".deb")) return "deb.png";
  if (name.includes("Packages")) return "pac.png";
  if (["Release", "InRelease", "Release.gpg", "error.gpg"].includes(name))
    return "key.png";
  if (path.includes("/i18n/") || name.includes("Translation"))
    return "lang.png";
  return "other.png";
}

(function injectRepoStyles() {
  const css = `
    #repo-viewer {
      font-family: "Courier New", monospace;
      padding: 16px;
    }

    #repo-controls {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 10px;
    }

    #darkToggle {
      font-family: "Courier New", monospace;
      font-size: 13px;
      padding: 4px 10px;
      border-radius: 4px;
      border: 1px solid #444;
      cursor: pointer;
      background: #f0f0f0;
      color: #222;
      transition: 0.15s ease;
    }

    body.dark #darkToggle {
      background: #222;
      color: #eee;
      border-color: #666;
    }

    #breadcrumbs {
      font-size: 13px;
      margin-bottom: 8px;
    }

    #breadcrumbs .crumb {
      cursor: pointer;
      color: #4da3ff;
    }

    #breadcrumbs .crumb:hover {
      text-decoration: underline;
    }

    #listing {
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: 13px;
    }

    #listing li {
      list-style: none;
      margin: 3px 0;
      padding: 3px 6px;
      display: flex;
      align-items: center;
      gap: 6px;
      border-bottom: 1px solid rgba(128, 128, 128, 0.2);
    }

    #listing li img {
      width: 16px;
      height: 16px;
    }

    #listing li a {
      color: inherit;
      text-decoration: none;
    }

    #listing li a:hover {
      text-decoration: underline;
    }

    #listing li .meta {
      margin-left: auto;
      opacity: 0.7;
      font-size: 11px;
    }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();

function initDark() {
  const btn = document.getElementById("darkToggle");
  if (!btn) return;
  btn.onclick = () => {
    document.body.classList.toggle("dark");
  };
}

function renderBreadcrumbs(path) {
  const bc = document.getElementById("breadcrumbs");
  if (!bc) return;
  bc.innerHTML = "";
  const parts = path === "" ? ["root"] : path.split("/");
  let cur = "";
  parts.forEach((p, i) => {
    if (p !== "root") {
      cur += (i ? "/" : "") + p;
    }
    const span = document.createElement("span");
    span.textContent = p;
    span.className = "crumb";
    span.onclick = () => list(cur === "" || p === "root" ? "" : cur);
    bc.appendChild(span);
    if (i < parts.length - 1) {
      bc.appendChild(document.createTextNode(" / "));
    }
  });
}

async function metaFor(item) {
  let modified = "unknown";
  if (item.download_url) {
    try {
      const head = await fetch(item.download_url, { method: "HEAD" });
      const last = head.headers.get("last-modified");
      if (last) {
        modified = new Date(last).toLocaleString();
      }
    } catch (_) {}
  }
  return { size: item.size, modified };
}

function fmtSize(bytes) {
  if (bytes === null || bytes === undefined) return "? B";
  if (bytes < 1024) return bytes + " B";
  const kb = bytes / 1024;
  if (kb < 1024) return kb.toFixed(1) + " KB";
  const mb = kb / 1024;
  return mb.toFixed(1) + " MB";
}

async function renderItem(item, path) {
  const li = document.createElement("li");
  const img = document.createElement("img");
  img.src = ICONS + iconFor(item.name, item.type, path);
  img.alt = "";
  li.appendChild(img);
  const a = document.createElement("a");
  a.textContent = item.name;
  if (item.type === "dir") {
    a.href = "#";
    a.onclick = (e) => {
      e.preventDefault();
      list(item.path);
    };
  } else {
    a.href = item.download_url || "#";
  }
  li.appendChild(a);
  if (item.type === "file") {
    const m = await metaFor(item);
    const span = document.createElement("span");
    span.className = "meta";
    span.textContent = `${fmtSize(m.size)} — ${m.modified}`;
    li.appendChild(span);
  }
  return li;
}

async function list(path) {
  renderBreadcrumbs(path);
  const ul = document.getElementById("listing");
  if (!ul) return;
  ul.innerHTML = "";
  const api = `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`;
  let data;
  try {
    const res = await fetch(api);
    data = await res.json();
    if (!Array.isArray(data)) throw new Error("not a directory");
  } catch (e) {
    ul.innerHTML = "<li>error loading directory</li>";
    return;
  }
  if (path !== "") {
    const parent = path.split("/").slice(0, -1).join("/");
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = ICONS + "dirback.png";
    img.width = 16;
    img.height = 16;
    const a = document.createElement("a");
    a.textContent = "..";
    a.href = "#";
    a.onclick = (e) => {
      e.preventDefault();
      list(parent);
    };
    li.appendChild(img);
    li.appendChild(a);
    ul.appendChild(li);
  }
  data.sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === "dir" ? -1 : 1;
  });
  for (const item of data) {
    ul.appendChild(await renderItem(item, path));
  }
}

(function init() {
  initDark();
  list(ROOT);
})();
