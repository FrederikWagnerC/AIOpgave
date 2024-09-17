function displayCategories(sortedProducts) {
    // Opret containeren til kategorierne
    const container = document.createElement('div');
    container.classList.add('category-container');

    // Gå igennem sortedProducts ved hjælp af en simpel for-loop
    const categories = Object.keys(sortedProducts); // Få hovedkategorierne

    for (let i = 0; i < categories.length; i++) {
        const mainCategory = categories[i];
        const products = sortedProducts[mainCategory];

        // Opret et div-element til hver hovedkategori
        const mainCategoryDiv = document.createElement('div');
        mainCategoryDiv.classList.add('main-category');
        mainCategoryDiv.textContent = mainCategory;

        // Opret en ul-liste til produkterne (underkategorierne)
        const productList = document.createElement('ul');
        productList.classList.add('product-list');

        // Gennemgå produkterne og tilføj dem som listeelementer
        for (let j = 0; j < products.length; j++) {
            const product = products[j];
            const productItem = document.createElement('li');
            productItem.textContent = `${product.title} (${product.category})`;
            productList.appendChild(productItem);
        }

        // Tilføj produktlisten til hovedkategorien
        mainCategoryDiv.appendChild(productList);

        // Tilføj hovedkategori div'en til containeren
        container.appendChild(mainCategoryDiv);
    }

    // Tilføj containeren til body
    document.body.appendChild(container);
}

async function init() {
    // Hent produkter fra Model
    const products = await fetchProducts();

    // Sorter produkterne ved hjælp af Model
    const sortedProducts = sortProducts(products);

    // Vis dataen i View
    displayCategories(sortedProducts);
}

// Start applikationen
init();

function sortProducts(products) {
    let sortedProducts = {};

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        let found = false;

        // Find hovedkategori for hver produktkategori
        for (let category in mainCategories) {
            if (mainCategories[category].includes(product.category)) {
                if (!sortedProducts[category]) {
                    sortedProducts[category] = [];
                }
                sortedProducts[category].push(product);
                found = true;
                break;
            }
        }

        // Hvis produktet ikke matcher en kategori, tilføj det til "Other"
        if (!found) {
            if (!sortedProducts["Other"]) {
                sortedProducts["Other"] = [];
            }
            sortedProducts["Other"].push(product);
        }
    }

    return sortedProducts;
}

async fetchProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error("Fejl ved hentning af produkter:", error);
        return [];
    }
}