/* ============================================================
   script.js — Toko Sayur Bu Linda
   Ditulis dengan Vanilla JavaScript (tanpa framework)
   Cocok untuk mahasiswa pemula — setiap bagian diberi komentar
   ============================================================ */


/* ============================================================
   1. EFEK LOADING RINGAN SAAT HALAMAN PERTAMA DIBUKA
   - Overlay hijau muncul sebentar lalu menghilang
   - Elemen di dalam body diberi kelas "loaded" agar bisa
     di-fade-in via CSS yang kita inject secara dinamis
   ============================================================ */

// Buat elemen overlay loading
const loadingOverlay = document.createElement("div");
loadingOverlay.id = "loading-overlay";
loadingOverlay.innerHTML = `
  <div class="loading-inner">
    <span class="loading-icon">🥬</span>
    <p>Menyiapkan sayuran segar…</p>
  </div>
`;

// Tambahkan style untuk overlay (tanpa mengubah file CSS)
const loadingStyle = document.createElement("style");
loadingStyle.textContent = `
  #loading-overlay {
    position: fixed;
    inset: 0;
    background: linear-gradient(135deg, #16a34a, #14532d);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.6s ease;
  }
  .loading-inner {
    text-align: center;
    color: #ffffff;
    animation: pulse-load 0.8s ease-in-out infinite alternate;
  }
  .loading-icon {
    font-size: 3.5rem;
    display: block;
    margin-bottom: 12px;
  }
  .loading-inner p {
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.05em;
  }
  @keyframes pulse-load {
    from { transform: scale(1);   opacity: 0.9; }
    to   { transform: scale(1.08); opacity: 1;  }
  }

  /* Body disembunyikan dulu, lalu muncul setelah loading */
  body { opacity: 0; transition: opacity 0.5s ease; }
  body.loaded { opacity: 1; }
`;
document.head.appendChild(loadingStyle);
document.body.prepend(loadingOverlay);

// Hapus overlay setelah 1.6 detik
window.addEventListener("load", () => {
  setTimeout(() => {
    loadingOverlay.style.opacity = "0";          // fade out overlay
    document.body.classList.add("loaded");        // fade in body
    setTimeout(() => loadingOverlay.remove(), 600); // hapus dari DOM
  }, 1600);
});


/* ============================================================
   2. DARK MODE TOGGLE
   - Tombol toggle di sudut kanan atas
   - Menyimpan preferensi ke localStorage agar diingat
   ============================================================ */

// Buat tombol dark mode
const darkBtn = document.createElement("button");
darkBtn.id = "dark-toggle";
darkBtn.setAttribute("aria-label", "Toggle dark mode");
darkBtn.textContent = "🌙";

// Style untuk tombol dark mode
const darkStyle = document.createElement("style");
darkStyle.textContent = `
  #dark-toggle {
    position: fixed;
    bottom: 80px;
    right: 22px;
    z-index: 500;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: none;
    background: #16a34a;
    color: #fff;
    font-size: 1.25rem;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(0,0,0,0.18);
    transition: transform 0.2s, background 0.3s;
  }
  #dark-toggle:hover { transform: scale(1.1); }

  /* Variabel warna untuk dark mode */
  body.dark-mode {
    background-color: #0f1a12 !important;
    color: #e2f5e9 !important;
  }
  body.dark-mode .navbar {
    background-color: #111f15 !important;
    border-color: #1e3a24 !important;
  }
  body.dark-mode .section-produk,
  body.dark-mode .section-kontak { background-color: #131f16 !important; }
  body.dark-mode .section-cara-pesan { background-color: #0e1a11 !important; }
  body.dark-mode table { box-shadow: 0 2px 12px rgba(0,0,0,0.4); }
  body.dark-mode td { border-color: #1e3a24 !important; color: #c9e8d2 !important; }
  body.dark-mode .langkah-list li { background-color: #1a2e1e !important; color: #c9e8d2; }
  body.dark-mode #form-kontak { background-color: #1a2e1e !important; }
  body.dark-mode .form-group input,
  body.dark-mode .form-group textarea {
    background-color: #0f1a12 !important;
    border-color: #2d5235 !important;
    color: #e2f5e9 !important;
  }
  body.dark-mode h2 { color: #bbf7d0 !important; }
  body.dark-mode .nav-links a { color: #c9e8d2 !important; }
  body.dark-mode .hero { background: linear-gradient(135deg, #0d1f10, #132b19) !important; }
  body.dark-mode .hero-teks h1 { color: #86efac !important; }
  body.dark-mode .hero-teks p { color: #a7f3d0 !important; }
  body.dark-mode .kontak-info li { color: #a7f3d0 !important; }
`;
document.head.appendChild(darkStyle);
document.body.appendChild(darkBtn);

// Cek preferensi tersimpan
if (localStorage.getItem("darkMode") === "on") {
  document.body.classList.add("dark-mode");
  darkBtn.textContent = "☀️";
}

// Klik toggle: aktifkan / matikan dark mode
darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  darkBtn.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("darkMode", isDark ? "on" : "off");
});


/* ============================================================
   3. NAVBAR — AKTIF SAAT DISCROLL (shadow bertambah)
   - Kelas "scrolled" ditambah ke .navbar saat halaman discroll
   ============================================================ */

const navbar = document.querySelector(".navbar");

const navScrollStyle = document.createElement("style");
navScrollStyle.textContent = `
  .navbar.scrolled {
    box-shadow: 0 2px 16px rgba(22, 163, 74, 0.13);
    background-color: rgba(255,255,255,0.96);
    backdrop-filter: blur(6px);
  }
  body.dark-mode .navbar.scrolled {
    background-color: rgba(17, 31, 21, 0.96) !important;
  }
`;
document.head.appendChild(navScrollStyle);

window.addEventListener("scroll", () => {
  // Jika posisi scroll lebih dari 40px, tambah kelas "scrolled"
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});


/* ============================================================
   4. SMOOTH SCROLLING — MENU NAVIGASI
   - Sudah ditangani oleh CSS (scroll-behavior: smooth)
   - Di sini kita tambahkan offset agar konten tidak tertutup navbar
   ============================================================ */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const navHeight = navbar.offsetHeight; // tinggi navbar (sticky)
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;

    window.scrollTo({ top: targetTop, behavior: "smooth" });
  });
});


/* ============================================================
   5. ANIMASI FADE-IN SAAT SECTION MUNCUL DI LAYAR
   - Menggunakan IntersectionObserver (API modern & ringan)
   - Setiap <section> akan fade + slide up saat terlihat
   ============================================================ */

const fadeStyle = document.createElement("style");
fadeStyle.textContent = `
  section, table, .langkah-list li, .kontak-wrap > * {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.6s ease, transform 0.6s ease;
    pointer-events: none; /* Cegah klik saat belum muncul */
  }
  section.visible, table.visible,
  .langkah-list li.visible, .kontak-wrap > *.visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto; /* Aktifkan klik setelah muncul */
  }
  /* Stagger antar item langkah */
  .langkah-list li:nth-child(2) { transition-delay: 0.1s; }
  .langkah-list li:nth-child(3) { transition-delay: 0.2s; }
  .langkah-list li:nth-child(4) { transition-delay: 0.3s; }
`;
document.head.appendChild(fadeStyle);

// Target yang akan dianimasi
const fadeTargets = document.querySelectorAll(
  "section, table, .langkah-list li, .kontak-wrap > *"
);

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target); // cukup sekali
      }
    });
  },
  { threshold: 0.12 } // muncul saat 12% elemen terlihat
);

fadeTargets.forEach((el) => fadeObserver.observe(el));


/* ============================================================
   6. ANIMASI HERO SECTION — teks muncul satu per satu
   - Judul, paragraf, dan tombol pada .hero-teks diberi delay berbeda
   ============================================================ */

const heroStyle = document.createElement("style");
heroStyle.textContent = `
  .hero-teks h1,
  .hero-teks p,
  .hero-teks .tombol,
  .hero-img {
    opacity: 0;
    transform: translateY(30px);
    animation: hero-appear 0.7s ease forwards;
  }
  .hero-teks h1      { animation-delay: 0.2s; }
  .hero-teks p       { animation-delay: 0.45s; }
  .hero-teks .tombol { animation-delay: 0.65s; animation-fill-mode: forwards; }
  .hero-img          { animation-delay: 0.35s; transform: scale(0.96); }

  /* Pastikan setelah animasi selesai, elemen bisa diklik */
  @keyframes hero-appear {
    0%   { opacity: 0; transform: translateY(30px); pointer-events: none; }
    99%  { pointer-events: none; }
    100% { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
  }

`;
document.head.appendChild(heroStyle);


/* ============================================================
   7. KERANJANG BELANJA — COUNTER & NOTIFIKASI
   - Tombol "+ Tambah" menambah counter di navbar
   - Muncul toast/notifikasi kecil di pojok kanan bawah
   ============================================================ */

// --- Buat ikon keranjang di navbar (bisa diklik) ---
const cartIcon = document.createElement("div");
cartIcon.id = "cart-icon";
cartIcon.setAttribute("aria-label", "Lihat keranjang belanja");
cartIcon.innerHTML = `
  🛒 <span id="cart-count">0</span>
  <!-- Dropdown popup isi keranjang -->
  <div id="cart-dropdown">
    <div id="cart-dropdown-header">
      <strong>🛒 Keranjang Belanja</strong>
      <button id="cart-clear">Kosongkan</button>
    </div>
    <ul id="cart-list">
      <li class="cart-empty">Keranjang masih kosong 🥲</li>
    </ul>
    <div id="cart-footer">
      <span>Total item: <strong id="cart-total-qty">0</strong></span>
      <a href="https://wa.me/6281234567890" id="cart-wa-btn" target="_blank">
        Pesan via WhatsApp 📲
      </a>
    </div>
  </div>
`;

const cartStyle = document.createElement("style");
cartStyle.textContent = `
  /* Wrapper ikon keranjang */
  #cart-icon {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 1rem;
    font-weight: 700;
    color: #16a34a;
    cursor: pointer;
    user-select: none;
    position: relative; /* Anchor untuk dropdown */
  }

  /* Bulatan angka */
  #cart-count {
    background: #16a34a;
    color: #fff;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
    transition: transform 0.2s;
  }
  #cart-count.bump { transform: scale(1.5); }

  /* ===== DROPDOWN POPUP ===== */
  #cart-dropdown {
    display: none;          /* Tersembunyi by default */
    position: absolute;
    top: calc(100% + 12px);
    right: 0;
    width: 300px;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.14);
    z-index: 9000;
    overflow: hidden;
    animation: dropdown-in 0.22s ease;
  }
  #cart-dropdown.open { display: block; }

  @keyframes dropdown-in {
    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
  }

  /* Header popup */
  #cart-dropdown-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px 10px;
    border-bottom: 1px solid #e5e7eb;
    font-size: 0.9rem;
    color: #1f2937;
  }

  /* Tombol kosongkan */
  #cart-clear {
    background: none;
    border: 1px solid #fca5a5;
    color: #ef4444;
    border-radius: 6px;
    padding: 3px 9px;
    font-size: 0.76rem;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.15s;
  }
  #cart-clear:hover { background: #fef2f2; }

  /* List item di keranjang */
  #cart-list {
    list-style: none;
    max-height: 240px;
    overflow-y: auto;
    padding: 8px 0;
  }
  #cart-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    font-size: 0.85rem;
    color: #374151;
    gap: 8px;
  }
  #cart-list li:not(.cart-empty):hover { background: #f0fdf4; }

  .cart-empty {
    justify-content: center !important;
    color: #9ca3af !important;
    font-style: italic;
    padding: 20px 16px !important;
  }

  /* Nama produk */
  .cart-item-name { flex: 1; font-weight: 500; }

  /* Kontrol qty: tombol - angka + */
  .cart-qty-ctrl {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .cart-qty-ctrl button {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    border: 1.5px solid #d1d5db;
    background: #fff;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    color: #374151;
    transition: background 0.15s;
    line-height: 1;
  }
  .cart-qty-ctrl button:hover { background: #f0fdf4; border-color: #16a34a; color: #16a34a; }
  .cart-qty-num { font-weight: 700; min-width: 18px; text-align: center; font-size: 0.88rem; }

  /* Tombol hapus item (×) */
  .cart-item-del {
    background: none;
    border: none;
    color: #d1d5db;
    font-size: 1rem;
    cursor: pointer;
    padding: 0 2px;
    transition: color 0.15s;
  }
  .cart-item-del:hover { color: #ef4444; }

  /* Footer popup */
  #cart-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-top: 1px solid #e5e7eb;
    font-size: 0.82rem;
    color: #6b7280;
    gap: 8px;
  }

  /* Tombol WhatsApp */
  #cart-wa-btn {
    background: #16a34a;
    color: #fff !important;
    padding: 7px 13px;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;
    transition: background 0.2s;
  }
  #cart-wa-btn:hover { background: #15803d; }

  /* Dark mode support */
  body.dark-mode #cart-dropdown { background: #1a2e1e; box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
  body.dark-mode #cart-dropdown-header { border-color: #2d5235; color: #e2f5e9; }
  body.dark-mode #cart-list li { color: #c9e8d2; }
  body.dark-mode #cart-list li:not(.cart-empty):hover { background: #22402a; }
  body.dark-mode .cart-qty-ctrl button { background: #132b19; border-color: #2d5235; color: #c9e8d2; }
  body.dark-mode #cart-footer { border-color: #2d5235; color: #86efac; }

  /* Toast notifikasi */
  .toast {
    position: fixed;
    bottom: 140px;
    right: 22px;
    background: #16a34a;
    color: #fff;
    padding: 10px 18px;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    z-index: 600;
    box-shadow: 0 4px 16px rgba(22,163,74,0.3);
    animation: toast-in 0.3s ease, toast-out 0.3s ease 2.2s forwards;
    pointer-events: none;
  }
  @keyframes toast-in {
    from { opacity: 0; transform: translateY(16px) scale(0.9); }
    to   { opacity: 1; transform: translateY(0)   scale(1); }
  }
  @keyframes toast-out {
    to   { opacity: 0; transform: translateY(-10px); }
  }
`;
document.head.appendChild(cartStyle);

// Tambahkan ikon keranjang ke dalam navbar (setelah .nav-links)
const navLinks = document.querySelector(".nav-links");
navbar.insertBefore(cartIcon, navLinks.nextSibling);

// ===== DATA KERANJANG =====
// Objek untuk menyimpan item: { "nama produk": { qty, satuan, harga } }
let cartItems = {};

// ===== FUNGSI RENDER ULANG ISI DROPDOWN =====
function renderCart() {
  const cartList = document.getElementById("cart-list");
  const cartTotalQty = document.getElementById("cart-total-qty");
  const keys = Object.keys(cartItems);

  // Hitung total qty
  const total = keys.reduce((sum, k) => sum + cartItems[k].qty, 0);
  document.getElementById("cart-count").textContent = total;
  cartTotalQty.textContent = total;

  if (keys.length === 0) {
    // Keranjang kosong
    cartList.innerHTML = `<li class="cart-empty">Keranjang masih kosong 🥲</li>`;
    return;
  }

  // Render setiap item
  cartList.innerHTML = keys.map((nama) => {
    const { qty, satuan } = cartItems[nama];
    return `
      <li data-nama="${nama}">
        <span class="cart-item-name">${nama}</span>
        <div class="cart-qty-ctrl">
          <button class="qty-minus">−</button>
          <span class="cart-qty-num">${qty}</span>
          <button class="qty-plus">+</button>
        </div>
        <span class="cart-item-satuan" style="font-size:0.75rem;color:#9ca3af">${satuan}</span>
        <button class="cart-item-del" title="Hapus">×</button>
      </li>
    `;
  }).join("");

  // Pasang event ke tombol − + × di setiap item
  cartList.querySelectorAll("li[data-nama]").forEach((li) => {
    const nama = li.dataset.nama;

    // Tombol kurang qty
    li.querySelector(".qty-minus").addEventListener("click", (e) => {
      e.stopPropagation();
      if (cartItems[nama].qty > 1) {
        cartItems[nama].qty--;
      } else {
        delete cartItems[nama]; // hapus jika qty jadi 0
      }
      renderCart();
      bumpCart();
    });

    // Tombol tambah qty
    li.querySelector(".qty-plus").addEventListener("click", (e) => {
      e.stopPropagation();
      cartItems[nama].qty++;
      renderCart();
      bumpCart();
    });

    // Tombol hapus item
    li.querySelector(".cart-item-del").addEventListener("click", (e) => {
      e.stopPropagation();
      delete cartItems[nama];
      renderCart();
      bumpCart();
    });
  });
}

// ===== BUKA / TUTUP DROPDOWN SAAT KLIK IKON KERANJANG =====
const cartDropdown = document.getElementById("cart-dropdown");

cartIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  cartDropdown.classList.toggle("open");
});

// Tutup dropdown saat klik di luar area keranjang
document.addEventListener("click", (e) => {
  if (!cartIcon.contains(e.target)) {
    cartDropdown.classList.remove("open");
  }
});

// Tombol "Kosongkan"
document.getElementById("cart-clear").addEventListener("click", (e) => {
  e.stopPropagation();
  cartItems = {};
  renderCart();
  bumpCart();
});

// ===== FUNGSI BUMP ANGKA KERANJANG (animasi bounce) =====
function bumpCart() {
  const countEl = document.getElementById("cart-count");
  countEl.classList.remove("bump");
  void countEl.offsetWidth; // reset animasi
  countEl.classList.add("bump");
  setTimeout(() => countEl.classList.remove("bump"), 250);
}

// ===== FUNGSI TOAST NOTIFIKASI =====
function showToast(produk) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = `✅ ${produk} ditambahkan ke keranjang!`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

// ===== PASANG EVENT KE TOMBOL "+ Tambah" =====
document.querySelectorAll(".btn-tambah").forEach((btn) => {
  btn.addEventListener("click", () => {
    const row        = btn.closest("tr");
    const namaProduk = row.querySelector("td:first-child").textContent.trim();
    const satuan     = row.querySelector("td:nth-child(2)").textContent.trim();

    // Kalau sudah ada di keranjang, tambah qty. Kalau belum, buat baru.
    if (cartItems[namaProduk]) {
      cartItems[namaProduk].qty++;
    } else {
      cartItems[namaProduk] = { qty: 1, satuan };
    }

    renderCart();
    bumpCart();
    showToast(namaProduk);
  });
});


/* ============================================================
   8. HOVER CARD PRODUK — efek baris tabel lebih interaktif
   - Baris tabel (<tr>) mendapat highlight & slight lift saat hover
   ============================================================ */

const hoverStyle = document.createElement("style");
hoverStyle.textContent = `
  tbody tr {
    transition: background-color 0.2s, box-shadow 0.2s, transform 0.15s;
    cursor: default;
  }
  tbody tr:hover {
    background-color: #f0fdf4;
    box-shadow: 0 2px 8px rgba(22,163,74,0.08);
    transform: scale(1.005);
    position: relative;
    z-index: 1;
  }
  body.dark-mode tbody tr:hover {
    background-color: #1a2e1e !important;
  }
`;
document.head.appendChild(hoverStyle);


/* ============================================================
   9. SEARCH BAR — CARI PRODUK SECARA REALTIME
   - Input pencarian muncul di atas tabel produk
   - Memfilter baris tabel sesuai teks yang diketik
   ============================================================ */

const sectionProduk = document.querySelector(".section-produk");
const tabel = sectionProduk.querySelector("table");

// Buat wrapper search bar
const searchWrapper = document.createElement("div");
searchWrapper.id = "search-wrapper";
searchWrapper.innerHTML = `
  <input
    type="search"
    id="search-produk"
    placeholder="🔍 Cari produk sayuran…"
    autocomplete="off"
  />
`;

const searchStyle = document.createElement("style");
searchStyle.textContent = `
  #search-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  }
  #search-produk {
    width: 100%;
    max-width: 420px;
    padding: 11px 18px;
    border: 1.8px solid #16a34a;
    border-radius: 50px;
    font-size: 0.92rem;
    outline: none;
    transition: box-shadow 0.2s, border-color 0.2s;
    font-family: inherit;
    background: #fff;
    color: #1f2937;
  }
  #search-produk:focus {
    box-shadow: 0 0 0 3px rgba(22,163,74,0.18);
  }
  body.dark-mode #search-produk {
    background: #1a2e1e;
    color: #e2f5e9;
    border-color: #2d5235;
  }
  .row-hidden { display: none; }
  .no-result {
    text-align: center;
    color: #6b7280;
    padding: 18px;
    font-size: 0.9rem;
  }
`;
document.head.appendChild(searchStyle);

// Sisipkan search bar sebelum tabel
sectionProduk.insertBefore(searchWrapper, tabel);

const searchInput = document.getElementById("search-produk");
const allRows = document.querySelectorAll("tbody tr");

// Elemen pesan "tidak ditemukan"
const noResult = document.createElement("p");
noResult.className = "no-result";
noResult.textContent = "😔 Produk tidak ditemukan.";
noResult.style.display = "none";
tabel.parentNode.insertBefore(noResult, tabel.nextSibling);

searchInput.addEventListener("input", () => {
  const kata = searchInput.value.toLowerCase().trim();
  let ada = false;

  allRows.forEach((row) => {
    // Ambil teks kolom nama produk (kolom pertama)
    const nama = row.querySelector("td:first-child").textContent.toLowerCase();
    if (nama.includes(kata)) {
      row.classList.remove("row-hidden");
      ada = true;
    } else {
      row.classList.add("row-hidden");
    }
  });

  // Tampilkan pesan jika tidak ada hasil
  noResult.style.display = ada ? "none" : "block";
});


/* ============================================================
   10. TOMBOL BACK TO TOP
   - Muncul saat scroll lebih dari 300px
   - Klik → kembali ke atas dengan smooth
   ============================================================ */

const backTopBtn = document.createElement("button");
backTopBtn.id = "back-top";
backTopBtn.setAttribute("aria-label", "Kembali ke atas");
backTopBtn.textContent = "↑";

const backTopStyle = document.createElement("style");
backTopStyle.textContent = `
  #back-top {
    position: fixed;
    bottom: 22px;
    right: 22px;
    z-index: 500;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: none;
    background: #14532d;
    color: #fff;
    font-size: 1.3rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(0,0,0,0.2);
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.3s, transform 0.3s, background 0.2s;
    pointer-events: none;
  }
  #back-top.show {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
  #back-top:hover { background: #16a34a; }
`;
document.head.appendChild(backTopStyle);
document.body.appendChild(backTopBtn);

window.addEventListener("scroll", () => {
  backTopBtn.classList.toggle("show", window.scrollY > 300);
});

backTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ============================================================
   11. FORM KONTAK — VALIDASI & PESAN SUKSES
   - Saat form dikirim, tampilkan #pesan-sukses dengan animasi
   - Terhubung dengan id="form-kontak" dan id="pesan-sukses" di HTML
   ============================================================ */

const formKontak = document.getElementById("form-kontak");
const pesanSukses = document.getElementById("pesan-sukses");

// Tambahkan transisi pada #pesan-sukses
const formStyle = document.createElement("style");
formStyle.textContent = `
  #pesan-sukses {
    transition: opacity 0.4s ease, transform 0.4s ease;
    transform: translateY(8px);
  }
  #pesan-sukses.tampil {
    display: block !important;
    opacity: 1 !important;
    transform: translateY(0);
  }
  .form-group input:focus,
  .form-group textarea:focus {
    border-color: #16a34a !important;
    box-shadow: 0 0 0 3px rgba(22,163,74,0.15);
  }
`;
document.head.appendChild(formStyle);

if (formKontak) {
  formKontak.addEventListener("submit", (e) => {
    e.preventDefault(); // Cegah reload halaman

    // Tampilkan pesan sukses
    pesanSukses.style.display = "block";
    setTimeout(() => pesanSukses.classList.add("tampil"), 10);

    // Reset form setelah 2.5 detik
    setTimeout(() => {
      formKontak.reset();
      pesanSukses.classList.remove("tampil");
      setTimeout(() => (pesanSukses.style.display = "none"), 400);
    }, 3000);
  });
}


/* ============================================================
   12. HIGHLIGHT LINK NAVIGASI AKTIF SAAT SCROLL
   - Link di navbar mendapat kelas "active" saat section-nya terlihat
   ============================================================ */

const navActiveStyle = document.createElement("style");
navActiveStyle.textContent = `
  .nav-links a.active {
    color: #16a34a !important;
    font-weight: 700;
    border-bottom: 2px solid #16a34a;
    padding-bottom: 2px;
  }
`;
document.head.appendChild(navActiveStyle);

const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => {
          a.classList.remove("active");
          if (a.getAttribute("href") === `#${entry.target.id}`) {
            a.classList.add("active");
          }
        });
      }
    });
  },
  {
    rootMargin: `-${navbar.offsetHeight + 10}px 0px -60% 0px`,
    threshold: 0,
  }
);

sections.forEach((sec) => sectionObserver.observe(sec));


/* ============================================================
   SELESAI 🎉
   Semua fitur sudah terpasang tanpa mengubah HTML/CSS asli.
   ============================================================ */