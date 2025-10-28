import { fetchProducts } from "./fetchProducts.js";
import { addToWishlist } from "./Wishlist.js";

const container = document.getElementById("product-list");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const categoryFilter = document.getElementById("categoryFilter");

let products = [];

async function loadProducts() {
  container.innerHTML = "<p class='text-center'>Loading products...</p>";
  products = await fetchProducts();
  renderProducts(products);
}

function renderProducts(items) {
  container.innerHTML = "";
  if (items.length === 0) {
    container.innerHTML = "<p class='text-center text-red-500'>No results found 😢</p>";
    return;
  }

  items.forEach(p => {
    const card = document.createElement("div");
    card.className = "bg-white shadow rounded-lg p-4 text-center hover:shadow-lg transition";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" class="w-full h-48 object-cover rounded-md mb-3">
      <h4 class="text-lg font-bold">${p.title}</h4>
      <p class="text-gray-600 mb-2">$${p.price}</p>
      <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 add-btn">Add to Wishlist</button>
    `;
    container.appendChild(card);

    card.querySelector(".add-btn").addEventListener("click", () => {
      addToWishlist(p);
      alert(`${p.title} added to wishlist `);
    });
  });
}


function applyFilters() {
  const term = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  const filtered = products.filter(p => {
    const matchesTitle = p.title.toLowerCase().includes(term);
    const matchesCategory = category ? p.category === category : true;
    return matchesTitle && matchesCategory;
  });

  renderProducts(filtered);
}

searchBtn.addEventListener("click", applyFilters);
categoryFilter.addEventListener("change", applyFilters);

loadProducts();
