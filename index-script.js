// ====== SELECTIONNER LES ELEMENTS ======
const products        = document.querySelectorAll(".product");
const cartCount       = document.getElementById("cart_count");
const categorySelect  = document.getElementById("categories_select");
const openCartBtn     = document.getElementById("open_cart_btn");
const closeCartBtn    = document.getElementById("cart_close_btn");
const cartOverlay     = document.getElementById("cart_overlay");
const cartPanel       = document.getElementById("cart_panel");
const cartItemsList   = document.getElementById("cart_items_list");
const cartTotalDisplay= document.getElementById("cart_total_display");
const clearCartBtn    = document.getElementById("clear_cart_btn");

// ====== PANIER (tableau d'objets) ======
// Chaque article : { uid, name, price, imgSrc }
let cart = JSON.parse(localStorage.getItem("gg_cart")) || [];

// ====== SAUVEGARDER LE PANIER ======
function saveCart() {
    localStorage.setItem("gg_cart", JSON.stringify(cart));
}

// ====== METTRE A JOUR LE COMPTEUR ======
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// ====== CALCULER LE TOTAL ======
function calculateTotal() {
    return cart.reduce((total, item) => total + item.price, 0);
}

// ====== AFFICHER LE TOTAL ======
function updateTotalDisplay() {
    cartTotalDisplay.textContent = calculateTotal() + " DT";
}

// ====== AFFICHER LES ARTICLES DU PANIER ======
// Fonction pour afficher les articles du panier
function renderCartItems() {
    cartItemsList.innerHTML = "";

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p class="cart_empty_msg">Votre panier est vide.</p>';
        updateTotalDisplay();
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart_item");

        cartItem.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}" class="cart_item_img">
            <div class="cart_item_info">
                <strong>${item.name}</strong>
                <span>${item.price} DT</span>
            </div>
            <button class="remove_item_btn" data-index="${index}">Supprimer</button>
        `;

        cartItemsList.appendChild(cartItem);
    });

    // Ajouter les evenements sur les boutons "Supprimer"
    document.querySelectorAll(".remove_item_btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = parseInt(btn.dataset.index);
            removeFromCart(index);
        });
    });

    updateTotalDisplay();
}

// ====== AJOUTER AU PANIER ======
function addToCart(product) {
    const name    = product.querySelector("h3").textContent;
    const priceText = product.querySelector("h5").textContent;
    const price   = parseFloat(priceText.replace(/[^\d.]/g, ""));
    const imgSrc  = product.querySelector(".product_img").src;

    const item = {
        uid: Date.now() + "_" + Math.random(),
        name,
        price,
        imgSrc
    };

    cart.push(item);
    saveCart();
    updateCartCount();
    renderCartItems();

    // Animation sur le bouton
    const btn = product.querySelector(".add_to_cart_btn");
    btn.textContent = "Ajouté ✓";
    btn.classList.add("added");
    setTimeout(() => {
        btn.textContent = "Add to cart";
        btn.classList.remove("added");
    }, 900);
}

// ====== SUPPRIMER DU PANIER ======
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    renderCartItems();
}

// ====== VIDER LE PANIER ======
function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
    renderCartItems();
}

// ====== OUVRIR / FERMER LE PANEL ======
function openCart() {
    cartOverlay.classList.add("open");
    cartPanel.classList.add("open");
}

function closeCart() {
    cartOverlay.classList.remove("open");
    cartPanel.classList.remove("open");
}

// ====== EVENEMENTS - PANIER ======
openCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
clearCartBtn.addEventListener("click", clearCart);

// ====== EVENEMENTS - BOUTONS "Add to cart" ======
products.forEach(product => {
    const btn = product.querySelector(".add_to_cart_btn");
    btn.addEventListener("click", () => {
        addToCart(product);
    });
});

// ====== FILTRER PAR CATEGORIE ======
categorySelect.addEventListener("change", () => {
    const selected = categorySelect.value.toLowerCase();

    products.forEach(product => {
        const category = product.dataset.category.toLowerCase();

        if (selected === "" || category === selected) {
            product.style.display = "flex";
        } else {
            product.style.display = "none";
        }
    });
});

// ====== INITIALISATION ======
updateCartCount();
renderCartItems();