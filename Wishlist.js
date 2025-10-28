export function getWishlist() {
  const data = localStorage.getItem("wishlist");
  return data ? JSON.parse(data) : [];
}

export function saveWishlist(items) {
  localStorage.setItem("wishlist", JSON.stringify(items));
}

export function addToWishlist(product) {
  const wishlist = getWishlist();
  if (!wishlist.find(p => p.id === product.id)) {
    wishlist.push(product);
    saveWishlist(wishlist);
  }
}

export function removeFromWishlist(id) {
  let wishlist = getWishlist();
  wishlist = wishlist.filter(p => p.id !== id);
  saveWishlist(wishlist);
}

export function renderWishlist(container) {
  const items = getWishlist();
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `<p class="text-center text-red-500">Your wishlist is empty 😢</p>`;
    return;
  }

  items.forEach(p => {
    const card = document.createElement("div");
    card.className = "bg-white shadow rounded-lg p-4 text-center hover:shadow-lg transition";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" class="w-full h-48 object-cover rounded-md mb-3">
      <h4 class="text-lg font-bold">${p.title}</h4>
      <p class="text-gray-600 mb-2">$${p.price}</p>
      <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 remove-btn">Remove</button>
    `;
    container.appendChild(card);

    card.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromWishlist(p.id);
      renderWishlist(container);
    });
  });
}
