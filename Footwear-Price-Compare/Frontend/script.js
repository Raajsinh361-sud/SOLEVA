/* =========================================
   SOLEVA
   MAIN JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       SHOE THEMES
       ========================================= */

    const shoeThemes = {

        1: {
            accent: "#B7FF4A",
            light: "#E6FFB8",
            glow: "rgba(95, 255, 80, 0.42)",
            glowSoft: "rgba(95, 255, 80, 0.10)"
        },

        2: {
            accent: "#FFFFFF",
            light: "#F5F5F5",
            glow: "rgba(255, 255, 255, 0.30)",
            glowSoft: "rgba(255, 255, 255, 0.08)"
        },

        3: {
            accent: "#FF5C6C",
            light: "#FFD0D5",
            glow: "rgba(210, 55, 110, 0.42)",
            glowSoft: "rgba(210, 55, 110, 0.10)"
        },

        4: {
            accent: "#FF8A3D",
            light: "#FFE0C2",
            glow: "rgba(255, 125, 35, 0.40)",
            glowSoft: "rgba(255, 125, 35, 0.10)"
        }

    };


    /* =========================================
       APPLY SHOE THEME
       ========================================= */

    function applyShoeTheme(number) {

        const theme = shoeThemes[number];

        if (!theme) return;

        document.documentElement.style.setProperty(
            "--theme-accent",
            theme.accent
        );

        document.documentElement.style.setProperty(
            "--theme-light",
            theme.light
        );

        document.documentElement.style.setProperty(
            "--theme-glow",
            theme.glow
        );

        document.documentElement.style.setProperty(
            "--theme-glow-soft",
            theme.glowSoft
        );

    }


    /* =========================================
       SHOE SELECTOR
       ========================================= */

    const shoeImage =
        document.getElementById("shoe-image");

    const shoeButtons =
        document.querySelectorAll(".shoe-select");


    shoeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const number =
                Number(button.dataset.shoe);

            const image =
                button.dataset.image;


            if (shoeImage) {

                shoeImage.style.opacity = "0";

                setTimeout(() => {

                    shoeImage.src =
                        `../Assets/images/${image}`;

                    shoeImage.style.opacity = "1";

                }, 180);

            }


            shoeButtons.forEach((item) => {

                item.classList.remove("active");

            });

            button.classList.add("active");

            applyShoeTheme(number);

        });

    });


    applyShoeTheme(1);


    /* =========================================
       SCROLL BUTTONS
       ========================================= */

    const scrollButtons =
        document.querySelectorAll("[data-scroll]");


    scrollButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const targetId =
                button.dataset.scroll;

            const target =
                document.getElementById(targetId);

            if (!target) return;

            target.scrollIntoView({
                behavior: "smooth"
            });

        });

    });


    /* =========================================
       PRODUCTS
       ========================================= */

    const products = [

        {
            id: 1,
            name: "Velocity Runner",
            category: "running",
            price: 2999,
            image: "../Assets/images/shoe.png",
            description:
                "Lightweight everyday running footwear."
        },

        {
            id: 2,
            name: "Urban Street",
            category: "sneakers",
            price: 3499,
            image: "../Assets/images/shoe2.png",
            description:
                "Clean streetwear style for everyday use."
           },
      

        {
            id: 3,
            name: "Shadow Sport",
            category: "sports",
            price: 4299,
            image: "../Assets/images/shoe3.png",
            description:
                "Sport-focused design with a bold look."
        },

        {
            id: 4,
            name: "Classic Motion",
            category: "casual",
            price: 3799,
            image: "../Assets/images/shoe4.png",
            description:
                "Minimal casual footwear with a premium feel."
        }

    ];


    /* =========================================
       PRODUCT ELEMENTS
       ========================================= */

    const productGrid =
        document.getElementById("products-grid");

    const searchInput =
        document.getElementById("product-search");

    const searchButton =
        document.getElementById("search-button");

    const filterButtons =
        document.querySelectorAll(".filter-button");


    /* CUSTOM DROPDOWNS */

    const categoryDropdown =
        document.getElementById("category-dropdown");

    const sortDropdown =
        document.getElementById("sort-dropdown");


    let currentCategory = "all";

    let currentSearch = "";

    let currentSort = "relevance";


    /* =========================================
       PRICE FORMAT
       ========================================= */

    function formatPrice(price) {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
            }
        ).format(price);

    }


    /* =========================================
       RENDER PRODUCTS
       ========================================= */

    function renderProducts() {

        if (!productGrid) {

            console.error(
                "SOLEVA ERROR: #products-grid not found."
            );

            return;

        }


        let filtered = [...products];


        /* SEARCH */

        if (currentSearch) {

            filtered = filtered.filter((product) => {

                const text =
                    `${product.name}
                    ${product.category}
                    ${product.description}`
                        .toLowerCase();

                return text.includes(currentSearch);

            });

        }


        /* CATEGORY */

        if (currentCategory !== "all") {

            filtered = filtered.filter(
                (product) =>
                    product.category === currentCategory
            );

        }


        /* SORT */

        if (currentSort === "price-low") {

            filtered.sort(
                (a, b) => a.price - b.price
            );

        }


        if (currentSort === "price-high") {

            filtered.sort(
                (a, b) => b.price - a.price
            );

        }


        /* EMPTY */

        if (!filtered.length) {

            productGrid.innerHTML = `

                <div class="products-empty">

                    <div class="empty-icon">
                        🔎
                    </div>

                    <h3>
                        No footwear found.
                    </h3>

                    <p>
                        Try another search or category.
                    </p>

                </div>

            `;

            return;

        }


        /* PRODUCT CARDS */

        productGrid.innerHTML = filtered.map(
            (product) => `

                <article class="product-card">

                    <div class="product-image-wrap">

                        <img
                            class="product-image"
                            src="${product.image}"
                            alt="${product.name}"
                        >

                    </div>


                    <div class="product-info">

                        <div class="product-category">
                            ${product.category}
                        </div>

                        <h3 class="product-name">
                            ${product.name}
                        </h3>

                        <p class="product-description">
                            ${product.description}
                        </p>


                        <div class="product-bottom">

                            <span class="product-price">
                                ${formatPrice(product.price)}
                            </span>

                            <button
                                class="product-view"
                                type="button"
                                data-product="${product.id}"
                            >
                                View
                            </button>

                        </div>

                    </div>

                </article>

            `
        ).join("");

    }


    /* =========================================
       SEARCH
       ========================================= */

    function performSearch() {

        if (!searchInput) return;

        currentSearch =
            searchInput.value
                .trim()
                .toLowerCase();

        renderProducts();

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            performSearch
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Enter") {

                    performSearch();

                }

            }
        );

    }


    /* =========================================
       FILTER BUTTONS
       ========================================= */

    filterButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                currentCategory =
                    button.dataset.category;


                filterButtons.forEach((item) => {

                    item.classList.remove("active");

                });


                button.classList.add("active");


                /* Update custom category text */

                if (categoryDropdown) {

                    const value =
                        categoryDropdown.querySelector(
                            ".dropdown-value"
                        );

                    const options =
                        categoryDropdown.querySelectorAll(
                            ".custom-option"
                        );


                    if (value) {

                        value.textContent =
                            button.textContent.trim();

                    }


                    options.forEach((option) => {

                        option.classList.toggle(
                            "active",
                            option.dataset.value ===
                            currentCategory
                        );

                    });

                }


                renderProducts();

            }
        );

    });


    /* =========================================
       CATEGORY CUSTOM DROPDOWN
       ========================================= */

    if (categoryDropdown) {

        const categoryButton =
            categoryDropdown.querySelector(
                ".custom-dropdown-button"
            );

        const categoryValue =
            categoryDropdown.querySelector(
                ".dropdown-value"
            );

        const categoryOptions =
            categoryDropdown.querySelectorAll(
                ".custom-option"
            );


        if (categoryButton) {

            categoryButton.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    categoryDropdown.classList.toggle(
                        "open"
                    );

                    if (sortDropdown) {

                        sortDropdown.classList.remove(
                            "open"
                        );

                    }

                }
            );

        }


        categoryOptions.forEach((option) => {

            option.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    currentCategory =
                        option.dataset.value;


                    if (categoryValue) {

                        categoryValue.textContent =
                            option.textContent.trim();

                    }


                    categoryOptions.forEach(
                        (item) => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    option.classList.add("active");


                    filterButtons.forEach(
                        (button) => {

                            button.classList.toggle(
                                "active",
                                button.dataset.category ===
                                currentCategory
                            );

                        }
                    );


                    categoryDropdown.classList.remove(
                        "open"
                    );


                    renderProducts();

                }
            );

        });

    }


    /* =========================================
       SORT CUSTOM DROPDOWN
       ========================================= */

    if (sortDropdown) {

        const sortButton =
            sortDropdown.querySelector(
                ".custom-dropdown-button"
            );

        const sortValue =
            sortDropdown.querySelector(
                ".dropdown-value"
            );

        const sortOptions =
            sortDropdown.querySelectorAll(
                ".custom-option"
            );


        if (sortButton) {

            sortButton.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    sortDropdown.classList.toggle(
                        "open"
                    );


                    if (categoryDropdown) {

                        categoryDropdown.classList.remove(
                            "open"
                        );

                    }

                }
            );

        }


        sortOptions.forEach((option) => {

            option.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    currentSort =
                        option.dataset.value;


                    if (sortValue) {

                        sortValue.textContent =
                            option.textContent.trim();

                    }


                    sortOptions.forEach(
                        (item) => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    option.classList.add("active");


                    sortDropdown.classList.remove(
                        "open"
                    );


                    renderProducts();

                }
            );

        });

    }


    /* =========================================
       CLOSE DROPDOWNS
       ========================================= */

    document.addEventListener(
        "click",
        () => {

            if (categoryDropdown) {

                categoryDropdown.classList.remove(
                    "open"
                );

            }

            if (sortDropdown) {

                sortDropdown.classList.remove(
                    "open"
                );

            }

        }
    );


   /* =========================================
   PRODUCT DETAILS MODAL
   ========================================= */

const productModal =
    document.getElementById(
        "product-modal"
    );

const productModalClose =
    document.getElementById(
        "product-modal-close"
    );

const productModalBackdrop =
    document.querySelector(
        ".product-modal-backdrop"
    );

const modalProductImage =
    document.getElementById(
        "modal-product-image"
    );

const modalProductCategory =
    document.getElementById(
        "modal-product-category"
    );

const modalProductName =
    document.getElementById(
        "modal-product-name"
    );

const modalProductDescription =
    document.getElementById(
        "modal-product-description"
    );

const modalProductPrice =
    document.getElementById(
        "modal-product-price"
    );


/* OPEN MODAL */

function openProductModal(product) {

    if (!productModal) return;

    modalProductImage.src =
        product.image;

    modalProductImage.alt =
        product.name;

    modalProductCategory.textContent =
        product.category;

    modalProductName.textContent =
        product.name;

    modalProductDescription.textContent =
        product.description;

    modalProductPrice.textContent =
        formatPrice(product.price);

    productModal.classList.add(
        "active"
    );

    productModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";

}


/* CLOSE MODAL */

function closeProductModal() {

    if (!productModal) return;

    productModal.classList.remove(
        "active"
    );

    productModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

}


/* VIEW BUTTON */

if (productGrid) {

    productGrid.addEventListener(
        "click",
        (event) => {

            const button =
                event.target.closest(
                    ".product-view"
                );

            if (!button) return;

            const productId =
                Number(
                    button.dataset.product
                );

            const product =
                products.find(
                    (item) =>
                        item.id ===
                        productId
                );

            if (!product) return;

            openProductModal(
                product
            );

        }
    );

}


/* CLOSE BUTTON */

if (productModalClose) {

    productModalClose.addEventListener(
        "click",
        closeProductModal
    );

}


/* BACKDROP CLICK */

if (productModalBackdrop) {

    productModalBackdrop.addEventListener(
        "click",
        closeProductModal
    );

}


/* ESC KEY */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            productModal &&
            productModal.classList.contains(
                "active"
            )
        ) {

            closeProductModal();

        }

    }
);


    /* =========================================
       INITIAL PRODUCTS
       ========================================= */

    renderProducts();

});


// ==========================================
// HERO SHOE AUTO SHOWCASE (2.5 SECONDS)
// ==========================================
const heroShoeImages = [
    "../Assets/images/shoe.png",
    "../Assets/images/shoe2.png",
    "../Assets/images/shoe3.png",
    "../Assets/images/shoe4.png"
];

let currentHeroIndex = 0;

function startHeroSlideshow() {
    const heroImageElement = document.querySelector('.hero-shoe-wrap img');
    
    if (!heroImageElement) return;

    setInterval(() => {
        heroImageElement.classList.add('fade-out');

        setTimeout(() => {
            currentHeroIndex = (currentHeroIndex + 1) % heroShoeImages.length;
            heroImageElement.src = heroShoeImages[currentHeroIndex];
            heroImageElement.classList.remove('fade-out');
        }, 500);
        
    }, 2500);
}

document.addEventListener('DOMContentLoaded', startHeroSlideshow);
