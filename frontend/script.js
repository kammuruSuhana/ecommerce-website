let products = [];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productContainer =
  document.getElementById("products");

const cartCount =
  document.getElementById("cartCount");

const cartItems =
  document.getElementById("cartItems");

const totalPrice =
  document.getElementById("totalPrice");

updateCartCount();

displayCart();

fetch('https://fakestoreapi.com/products')

.then(res => res.json())

.then(data => {

  products = data;

  displayProducts(products);

});

function displayProducts(items) {

  productContainer.innerHTML = "";

  items.forEach(product => {

    productContainer.innerHTML += `

      <div class="card">

        <img src="${product.image}" alt="${product.title}">

        <h3>${product.title}</h3>

        <p>₹${Math.floor(product.price * 80)}</p>

        <button onclick='addToCart(${JSON.stringify(product)})'>

          Add to Cart

        </button>

      </div>

    `;
  });
}

function addToCart(product) {

  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  displayCart();

  alert("Product Added To Cart");
}

function displayCart() {

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {

    total += Math.floor(item.price * 80);

    cartItems.innerHTML += `

      <div class="cart-item">

        <img src="${item.image}">

        <div>

          <h4>${item.title}</h4>

          <p>₹${Math.floor(item.price * 80)}</p>

        </div>

        <button
          class="remove-btn"
          onclick="removeFromCart(${index})"
        >
          Remove
        </button>

      </div>

    `;
  });

  totalPrice.innerText = total;
}

function removeFromCart(index) {

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  displayCart();
}

function updateCartCount() {

  cartCount.innerText = cart.length;
}

function searchProducts() {

  const value =
    document.getElementById("search")
    .value
    .toLowerCase();

  const filtered = products.filter(product =>

    product.title.toLowerCase().includes(value)

  );

  displayProducts(filtered);
}

function filterCategory() {

  const category =
    document.getElementById("category").value;

  if (category === "all") {

    displayProducts(products);

  } else {

    const filtered = products.filter(

      product => product.category === category

    );

    displayProducts(filtered);
  }
}

function toggleDarkMode() {

  document.body.classList.toggle("dark");
}

function addAdminProduct() {

  const title =
    document.getElementById("productTitle").value;

  const price =
    document.getElementById("productPrice").value;

  const image =
    document.getElementById("productImage").value;

  const newProduct = {
    title,
    price,
    image,
    category: "custom"
  };

  products.push(newProduct);

  displayProducts(products);

  alert("Product Added Successfully");
}