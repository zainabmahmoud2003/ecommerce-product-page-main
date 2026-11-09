// Start Menu
const menuIcon = document.querySelector(".menu-icon");
const closeIcon = document.querySelector(".close-icon");
const navLinks = document.querySelector(".nav-links");
const backDrop = document.querySelector(".navOne .backdrop");


menuIcon.addEventListener("click", function () {
    navLinks.classList.add("active");
    backDrop.classList.add("active");
});

closeIcon.addEventListener("click", function () {
    navLinks.classList.remove("active");
    backDrop.classList.remove("active");
});

backDrop.addEventListener("click", function () {
    navLinks.classList.remove("active");
    backDrop.classList.remove("active");
});
// End Menu

// Start Gallery
const thumbnailImgs = document.querySelectorAll(".default .thumbnails div");
const mainImgs = document.querySelectorAll(".default .main-img img");


let currentIndex = 0;
const changeImg = (index, mainImgs, thumbnailImgs) => {
    mainImgs.forEach((img) => {
        img.classList.remove("active-img");
    });
    thumbnailImgs.forEach((thumbnail) => {
        thumbnail.classList.remove("active-img");
    });

    mainImgs[index].classList.add("active-img");
    thumbnailImgs[index].classList.add("active-img");
    currentIndex = index;
};

thumbnailImgs.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
        changeImg(index, mainImgs, thumbnailImgs);
    });
});
// End Gallery

// Start Lightbox

const lightBoxMainImgs = document.querySelectorAll(".lightbox .main-img img");
const lightBoxtThumbnails = document.querySelectorAll(".lightbox .thumbnails div");
const lightBox = document.querySelector(".lightbox");
const previousIcon = document.querySelector(".lightbox .previous-icon")
const nextIcon = document.querySelector(".lightbox .next-icon")
const closeIconLightbox = document.querySelector(".lightbox .gallery .main-img .close-icon")

lightBoxtThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
        changeImg(index, lightBoxMainImgs, lightBoxtThumbnails);
    });
});

mainImgs.forEach((img, index) => {
    img.addEventListener("click", () => {
        lightBox.classList.add("active-lightbox");
        changeImg(index, lightBoxMainImgs, lightBoxtThumbnails);
    })
})

previousIcon.addEventListener("click", () => {
    if (currentIndex <= 0) {
        changeImg(mainImgs.length - 1, lightBoxMainImgs, lightBoxtThumbnails);
    } else {
        changeImg(currentIndex - 1, lightBoxMainImgs, lightBoxtThumbnails);
    }
})

nextIcon.addEventListener("click", () => {
    if (currentIndex >= mainImgs.length - 1) {
        changeImg(0, lightBoxMainImgs, lightBoxtThumbnails);
    } else {
        changeImg(currentIndex + 1, lightBoxMainImgs, lightBoxtThumbnails);
    }
})

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        if (currentIndex <= 0) {
            changeImg(mainImgs.length - 1, lightBoxMainImgs, lightBoxtThumbnails);
        } else {
            changeImg(currentIndex - 1, lightBoxMainImgs, lightBoxtThumbnails);
        }
    }

    if (e.key === "ArrowRight") {
        if (currentIndex >= mainImgs.length - 1) {
            changeImg(0, lightBoxMainImgs, lightBoxtThumbnails);
        } else {
            changeImg(currentIndex + 1, lightBoxMainImgs, lightBoxtThumbnails);
        }
    }
})

closeIconLightbox.addEventListener("click", () => {
    lightBox.classList.remove("active-lightbox");
})

document.addEventListener("keydown", e => {
    if (e.key === "Escape") lightBox.classList.remove("active-lightbox");
});

// End Lightbox

// Start Cart

const minusBtn = document.querySelector(".add-to-cart-container .counter .minus");
const countEl = document.querySelector(".add-to-cart-container .counter .count");
const plusBtn = document.querySelector(".add-to-cart-container .counter .plus");
const cartIcon = document.querySelector(".navbar .navTwo .cart-icon");
const cartNavContainer = document.querySelector(".cart-nav-container");
const cartCount = document.querySelector(".cart-count");
const addToCartBtn = document.querySelector(".add-to-cart");
const cartItems = document.querySelector(".cart-items");
const checkOutBtn = document.querySelector(".checkout");

let count = 0;
let totalCartQty = 0;

const updateCount = (newCount) => {
    count = newCount;
    countEl.textContent = count;
};

minusBtn.addEventListener("click", () => {
    if (count > 0) {
        updateCount(count - 1);
    }
});

plusBtn.addEventListener("click", () => {
    updateCount(count + 1);
});

cartIcon.addEventListener("click", () => {
    cartNavContainer.classList.toggle("active-nav-container")
});

cartCount.addEventListener("click", () => {
    cartNavContainer.classList.toggle("active-nav-container")
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cartNavContainer.classList.remove("active-nav-container");
})

const updateTotalCartQty = () => {
    const cartItemsList = document.querySelectorAll(".cart-item");
    totalCartQty = 0;
    cartItemsList.forEach((item) => {
        totalCartQty += parseInt(item.dataset.quantity);
    });

    cartCount.innerHTML = `<span class="qty">${totalCartQty}</span>`

    if (totalCartQty === 0) {
        cartItems.classList.add("empty");
        checkOutBtn.classList.add("empty");
    } else if (totalCartQty > 0) {
        cartItems.classList.remove("empty");
        checkOutBtn.classList.remove("empty");
    }
};

const addItemtoCart = (name, price, imgSrc) => {

    const existingItem = [...cartItems.querySelectorAll(".cart-item")].find(item => {
        return item.querySelector(".name").textContent === name;
    });

    if (existingItem) {
        const oldQuantity = Number(existingItem.dataset.quantity);
        const newQuantity = oldQuantity + count;

        existingItem.dataset.quantity = newQuantity;

        existingItem.querySelector("p").innerHTML = `
            $${price.toFixed(2)} x ${newQuantity}
            <span class="total-price">$${(price * newQuantity).toFixed(2)}</span>
        `;

        updateTotalCartQty();
        return;
    }


    const totalPrice = price * count;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.dataset.quantity = count;
    cartItem.innerHTML = `
        <img src="${imgSrc}" alt="${name}"/>
        <div class="item-details">
            <div class="name">${name}</div>
            <div>
                <p>
                    $${price.toFixed(2)} x ${count}
                    <span class="total-price">$${totalPrice.toFixed(2)}</span>
                </p>
            </div>
        </div>
        <button class="delete-item">
            <svg width = "14"
            height = "16"
            xmlns = "http://www.w3.org/2000/svg"
            xmlns: xlink = "http://www.w3.org/1999/xlink"> <defs> <path d = "M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
            id = "a" /></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/> </svg>
        </button>
    `;

    cartItems.appendChild(cartItem);
    updateTotalCartQty();

    if (cartItems.classList.contains("empty")) {
        cartItem.classList.remove("empty");
        checkOutBtn.classList.remove("empty");
    }

    const deleteBtn = cartItem.querySelector(".delete-item");
    deleteBtn.addEventListener("click", (e) => {
        const cartItem = e.target.closest(".cart-item");
        removeItemFromCart(cartItem);
    });
};


addToCartBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (count === 0) return;

    const productName = document.querySelector(".text-content .product-name").textContent;
    const productPriceEl = document.querySelector(".text-content .price-info .current-price");
    const productPrice = parseFloat(productPriceEl.textContent.replace("$", ""));
    const productImg = document.querySelector(".default.gallery .main-img img").getAttribute("src");

    addItemtoCart(productName, productPrice, productImg);
    cartNavContainer.classList.add("active-nav-container");

    updateCount(0)
});

const removeItemFromCart = (cartItem) => {
    cartItem.remove();
    updateTotalCartQty();
};



// End Cart