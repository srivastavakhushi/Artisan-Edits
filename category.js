/* ==========================================
   Artisan Edit - Category Page Logic
   With left sidebar showing all subcategories
   ========================================== */

// --- All sidebar categories ---
const sidebarGroups = [
    {
        label: "Home Furnishing",
        items: [
            { key: "bedsheet",  title: "Bedsheet / BedCover" },
            { key: "curtain",   title: "Curtains" },
            { key: "throw",     title: "Sofa Throws" },
            { key: "cushion",   title: "Cushion Covers" },
            { key: "quilt",     title: "Dohars & Quilts" },
            { key: "dining",    title: "Dining Mats & Runners" },
            { key: "carpet",    title: "Carpets & Rugs" }
        ]
    },
    {
        label: "Wearables & Accessories",
        items: [
            { key: "saree",       title: "Heritage Sarees" },
            { key: "suits",       title: "Dress Materials / Suits" },
            { key: "dresses",     title: "Women Dresses" },
            { key: "kids",        title: "Kids Wear" },
            { key: "mens",        title: "Men's Apparel" },
            { key: "jewellery",   title: "Artisanal Jewellery" },
            { key: "handbags",    title: "Handbags & Totes" },
            { key: "laptopbags",  title: "Laptop Bags & Sleeves" }
        ]
    }
];

// --- Category details (banner + description + techniques) ---
const categoryDataMap = {
    bedsheet:   { title: "Bedsheet / BedCover",       image: "assets/bedsheet_artwork.png",       description: "Transform your bedroom into a sanctuary with premium bedspreads and bedcovers. Each piece showcases heritage printing techniques passed down through generations, crafted with natural dyes on handwoven cotton.", techniques: ["Ajrakh", "Applique", "Hand Block", "Kids Print"] },
    curtain:    { title: "Curtain Collection",         image: "assets/curtain_artwork.png",         description: "Light-filtering and airy, our curated curtains bring natural elegance to your windows. Crafted from premium linen and cotton blends with authentic handcraft detailing.", techniques: ["Applique", "Hand Block", "Kids Print"] },
    throw:      { title: "Sofa Throw",                 image: "assets/home_furnishing_scene.png",   description: "Cozy layers of luxury. Our sofa throws add visual warmth, texture, and bohemian style to any room. Drape them over sofas, lounge chairs, or bed ends.", techniques: ["Handloom", "Hand Block", "Hand Tufted/Bohemian"] },
    cushion:    { title: "Cushion Cover",              image: "assets/home_furnishing_scene.png",   description: "Accentuate your comfort. Mix and match our artisanal cushion covers featuring diverse handcrafting techniques to create your own aesthetic story.", techniques: ["Applique", "Hand Block", "Hand Tufted / Bohemian"] },
    quilt:      { title: "Dohar / Quilt",              image: "assets/bedsheet_artwork.png",        description: "Experience ultimate comfort with lightweight dohars and cozy quilts. Filled with 100% carded organic cotton and hand-quilted by women artisans in Rajasthan.", techniques: ["Handblock/Jaipuri"] },
    dining:     { title: "Dining Mat & Runner",        image: "assets/bottle_artwork.png",          description: "Elevate your dining space with table mats, runners, and napkins crafted to make every meal a celebration of handcraft. Highly durable and machine-washable.", techniques: ["Applique", "Handblock"] },
    carpet:     { title: "Carpet & Mat",               image: "assets/home_furnishing_scene.png",   description: "Ground your spaces with artisanal floor textiles made of durable, organic wool and cotton fibers that feel comfortable and look premium.", techniques: ["Kilim", "Handloom Yoga Mat", "Kitchen Runner", "Handblock"] },
    saree:      { title: "Heritage Sarees",            image: "assets/wearables_scene.png",         description: "Timeless six-yard drapes handwoven by master weavers in traditional clusters. Finished with heritage dyes and printing techniques.", techniques: ["Indigo Block", "Chanderi Silk", "Handloom Cotton"] },
    suits:      { title: "Dress Materials / Suits",    image: "assets/suit_artwork.png",            description: "Express your custom style with our unstitched suit sets. Premium cotton, linen, and silk materials featuring authentic hand-crafted prints.", techniques: ["Ajrakh Set", "Handblock Cotton"] },
    dresses:    { title: "Women Dresses",              image: "assets/wearables_scene.png",         description: "Contemporary silhouettes designed for the modern woman. Comfortable, elegant, and crafted from hand-stamped fabrics.", techniques: ["Handblock A-Line", "Applique Maxi"] },
    kids:       { title: "Kids Collection",            image: "assets/wearables_scene.png",         description: "Playful, comfortable, and safe. Made from the softest organic cotton printed with non-toxic, child-safe natural dyes.", techniques: ["Kids Print"] },
    mens:       { title: "Men's Apparel",              image: "assets/wearables_scene.png",         description: "Classic styling meets traditional craft. Breathable shirts and short kurtas tailored to perfection from handcrafted textiles.", techniques: ["Handblock Shirt", "Handloom Kurta"] },
    jewellery:  { title: "Artisanal Jewellery",        image: "assets/wearables_scene.png",         description: "Handcrafted accessories that make a statement. Each piece is molded, painted, and assembled by hand using natural materials.", techniques: ["Terracotta Necklaces", "Brass Fusion"] },
    handbags:   { title: "Handbags & Totes",           image: "assets/wearables_scene.png",         description: "Functional daily companions. Handcrafted bags constructed with heavy cotton canvas, heritage prints, and premium eco-leather handles.", techniques: ["Applique Tote", "Handblock Duffle"] },
    laptopbags: { title: "Laptop Bags & Sleeves",      image: "assets/wearables_scene.png",         description: "Protect your tech with handcrafted aesthetics. Padded compartments, quality metal zippers, and beautiful artisan-made exteriors.", techniques: ["Handblock Sleeve", "Premium Tech Bag"] }
};

// --- Products Database ---
const mockProducts = [
    // Bedsheets
    { id: 1,   category: "Bedsheet / BedCover",    technique: "Ajrakh",                title: "Midnight Indigo Ajrakh Bedcover",         price: "₹2,499", img: "assets/suit_artwork.png" },
    { id: 2,   category: "Bedsheet / BedCover",    technique: "Applique",              title: "White Lily Applique Bedsheet Set",         price: "₹3,199", img: "assets/curtain_artwork.png" },
    { id: 3,   category: "Bedsheet / BedCover",    technique: "Hand Block",            title: "Jaipuri Marigold Hand Block Bedsheet",    price: "₹1,899", img: "assets/bedsheet_artwork.png" },
    { id: 4,   category: "Bedsheet / BedCover",    technique: "Kids Print",            title: "Playful Elephants Kids Print Sheet",      price: "₹1,499", img: "assets/bedsheet_artwork.png" },
    // Curtains
    { id: 5,   category: "Curtain Collection",     technique: "Applique",              title: "Linen Applique Cutwork Curtain",          price: "₹1,699", img: "assets/curtain_artwork.png" },
    { id: 6,   category: "Curtain Collection",     technique: "Hand Block",            title: "Mughal Boota Hand Block Curtain",         price: "₹1,299", img: "assets/curtain_artwork.png" },
    { id: 7,   category: "Curtain Collection",     technique: "Kids Print",            title: "Forest Animals Kids Print Curtain",       price: "₹1,199", img: "assets/curtain_artwork.png" },
    // Throws
    { id: 8,   category: "Sofa Throw",             technique: "Hand Tufted/Bohemian",  title: "Earthy Terracotta Tufted Sofa Throw",    price: "₹2,199", img: "assets/home_furnishing_scene.png" },
    { id: 9,   category: "Sofa Throw",             technique: "Handloom",              title: "Sage Green Handloom Woven Throw",         price: "₹1,799", img: "assets/home_furnishing_scene.png" },
    { id: 10,  category: "Sofa Throw",             technique: "Hand Block",            title: "Indigo Booti Block Print Throw",          price: "₹1,899", img: "assets/home_furnishing_scene.png" },
    // Cushions
    { id: 11,  category: "Cushion Cover",          technique: "Hand Tufted / Bohemian",title: "Boho Shag Loop Textured Cushion Cover",   price: "₹699",  img: "assets/home_furnishing_scene.png" },
    { id: 12,  category: "Cushion Cover",          technique: "Applique",              title: "Geometric Patchwork Applique Cushion",    price: "₹899",  img: "assets/curtain_artwork.png" },
    { id: 13,  category: "Cushion Cover",          technique: "Hand Block",            title: "Indigo Mughal Booti Cushion Cover",       price: "₹599",  img: "assets/suit_artwork.png" },
    // Quilts
    { id: 14,  category: "Dohar / Quilt",          technique: "Handblock/Jaipuri",     title: "Jaipuri Hand-Quilted Cotton Dohar",       price: "₹2,899", img: "assets/bedsheet_artwork.png" },
    // Dining
    { id: 15,  category: "Dining Mat & Runner",    technique: "Handblock",             title: "Indian Sage Block Printed Runner",        price: "₹799",  img: "assets/bottle_artwork.png" },
    { id: 16,  category: "Dining Mat & Runner",    technique: "Applique",              title: "Ivory Applique Linen Dining Placemats",   price: "₹999",  img: "assets/curtain_artwork.png" },
    // Carpets
    { id: 17,  category: "Carpet & Mat",           technique: "Kilim",                 title: "Geometrical Earth-Tones Kilim Rug",       price: "₹4,599", img: "assets/home_furnishing_scene.png" },
    { id: 18,  category: "Carpet & Mat",           technique: "Handloom Yoga Mat",     title: "Organic Cotton Handloom Yoga Mat",        price: "₹1,599", img: "assets/home_furnishing_scene.png" },
    { id: 19,  category: "Carpet & Mat",           technique: "Kitchen Runner",        title: "Rust Kilim Kitchen Runner",               price: "₹1,299", img: "assets/home_furnishing_scene.png" },
    // Sarees
    { id: 20,  category: "Heritage Sarees",        technique: "Indigo Block",          title: "Indigo Bagh Handblock Printed Saree",    price: "₹3,899", img: "assets/wearables_scene.png" },
    { id: 21,  category: "Heritage Sarees",        technique: "Chanderi Silk",         title: "Saffron Gold Zari Chanderi Saree",        price: "₹5,499", img: "assets/wearables_scene.png" },
    { id: 22,  category: "Heritage Sarees",        technique: "Handloom Cotton",       title: "Natural Dye Handloom Cotton Saree",       price: "₹2,799", img: "assets/wearables_scene.png" },
    // Suits
    { id: 23,  category: "Dress Materials / Suits",technique: "Ajrakh Set",            title: "Madder Red Ajrakh Silk Suit Material",   price: "₹2,999", img: "assets/suit_artwork.png" },
    { id: 24,  category: "Dress Materials / Suits",technique: "Handblock Cotton",      title: "Linen Handblock Unstitched Dress Material",price: "₹2,199",img: "assets/suit_artwork.png" },
    // Dresses
    { id: 25,  category: "Women Dresses",          technique: "Handblock A-Line",      title: "Earthy Block Print A-Line Dress",         price: "₹2,299", img: "assets/wearables_scene.png" },
    { id: 26,  category: "Women Dresses",          technique: "Applique Maxi",         title: "Tuscan Sun Linen Applique Maxi",          price: "₹2,899", img: "assets/curtain_artwork.png" },
    // Kids
    { id: 27,  category: "Kids Collection",        technique: "Kids Print",            title: "Rainbow Elephants Kids Kurta Set",        price: "₹999",  img: "assets/wearables_scene.png" },
    { id: 28,  category: "Kids Collection",        technique: "Kids Print",            title: "Jungle Friends Organic Cotton Dress",     price: "₹1,099", img: "assets/wearables_scene.png" },
    // Mens
    { id: 29,  category: "Men's Apparel",          technique: "Handblock Shirt",       title: "Terracotta Motif Block Print Shirt",      price: "₹1,699", img: "assets/wearables_scene.png" },
    { id: 30,  category: "Men's Apparel",          technique: "Handloom Kurta",        title: "Natural Handloom Cotton Short Kurta",     price: "₹1,499", img: "assets/wearables_scene.png" },
    // Jewellery
    { id: 31,  category: "Artisanal Jewellery",    technique: "Terracotta Necklaces",  title: "Hand-Painted Clay Terracotta Set",        price: "₹1,299", img: "assets/wearables_scene.png" },
    { id: 32,  category: "Artisanal Jewellery",    technique: "Brass Fusion",          title: "Tribal Brass Fusion Statement Earrings",  price: "₹899",  img: "assets/wearables_scene.png" },
    // Handbags
    { id: 33,  category: "Handbags & Totes",       technique: "Applique Tote",         title: "Applique Monstera Leaf Canvas Tote",      price: "₹1,499", img: "assets/wearables_scene.png" },
    { id: 34,  category: "Handbags & Totes",       technique: "Handblock Duffle",      title: "Indigo Block Print Weekend Duffle",       price: "₹2,199", img: "assets/wearables_scene.png" },
    // Laptop Bags
    { id: 35,  category: "Laptop Bags & Sleeves",  technique: "Handblock Sleeve",      title: "Indigo Block Print Padded Laptop Bag",    price: "₹1,899", img: "assets/wearables_scene.png" },
    { id: 36,  category: "Laptop Bags & Sleeves",  technique: "Premium Tech Bag",      title: "Heritage Print 15\" Laptop Carrier",      price: "₹2,499", img: "assets/wearables_scene.png" }
];

// ==========================================
// Count products per category key
// ==========================================
function countProducts(key) {
    var data = categoryDataMap[key];
    if (!data) return 0;
    return mockProducts.filter(function(p) {
        return p.category.toLowerCase() === data.title.toLowerCase();
    }).length;
}

// ==========================================
// Build the sidebar
// ==========================================
function buildSidebar(activeKey) {
    var sidebar = document.getElementById("category-sidebar");
    if (!sidebar) return;

    // Keep the back button (first child), then clear the rest
    var backBtn = sidebar.querySelector(".sidebar-back-btn");
    sidebar.innerHTML = "";
    if (backBtn) sidebar.appendChild(backBtn);

    sidebarGroups.forEach(function(group) {
        var label = document.createElement("span");
        label.className = "sidebar-group-label";
        label.textContent = group.label;
        sidebar.appendChild(label);

        group.items.forEach(function(item) {
            var link = document.createElement("a");
            link.className = "sidebar-nav-item" + (item.key === activeKey ? " active" : "");
            link.href = "category.html?type=" + item.key;
            link.textContent = item.title;

            // Product count badge
            var count = countProducts(item.key);
            if (count > 0) {
                var badge = document.createElement("span");
                badge.className = "item-count";
                badge.textContent = count;
                link.appendChild(badge);
            }

            sidebar.appendChild(link);
        });
    });
}

// ==========================================
// Render products
// ==========================================
function renderProducts(data, techniqueFilter) {
    var grid = document.getElementById("category-products-grid");
    grid.innerHTML = "";

    var list = mockProducts.filter(function(p) {
        return p.category.toLowerCase() === data.title.toLowerCase();
    });

    if (techniqueFilter) {
        list = list.filter(function(p) {
            return p.technique.toLowerCase() === techniqueFilter.toLowerCase() ||
                   p.technique.toLowerCase().includes(techniqueFilter.toLowerCase());
        });
    }

    if (list.length === 0) {
        grid.innerHTML =
            '<div class="empty-state">' +
            '<svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8l-2 4h12l-2-4z"/></svg>' +
            '<p style="font-size:1.05rem;margin-top:8px;">No products found for this filter.</p>' +
            '<p style="font-size:0.85rem;margin-top:6px;">More designs coming soon!</p>' +
            '</div>';
        return;
    }

    list.forEach(function(product) {
        var card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML =
            '<div class="product-image-container">' +
                '<img src="' + product.img + '" alt="' + product.title + '" loading="lazy">' +
                '<span class="product-badge technique">' + product.technique + '</span>' +
            '</div>' +
            '<div class="product-info">' +
                '<span class="product-category">' + product.category + '</span>' +
                '<h4 class="product-title">' + product.title + '</h4>' +
                '<div class="product-footer">' +
                    '<span class="product-price">' + product.price + '</span>' +
                    '<button class="add-to-cart-btn" aria-label="Add to cart">' +
                        '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>' +
                    '</button>' +
                '</div>' +
            '</div>';

        card.querySelector(".add-to-cart-btn").addEventListener("click", function(e) {
            e.stopPropagation();
            alert("Added \"" + product.title + "\" to cart!");
        });

        grid.appendChild(card);
    });
}

// ==========================================
// Build technique filter pills
// ==========================================
function buildFilters(data, onFilter) {
    var bar = document.getElementById("technique-filter-bar");
    bar.innerHTML = "";
    var activePill = null;

    var allPill = document.createElement("button");
    allPill.className = "filter-pill active";
    allPill.textContent = "All Designs";
    allPill.addEventListener("click", function() {
        setActive(allPill);
        onFilter(null);
    });
    bar.appendChild(allPill);
    activePill = allPill;

    data.techniques.forEach(function(tech) {
        var pill = document.createElement("button");
        pill.className = "filter-pill";
        pill.textContent = tech;
        pill.addEventListener("click", function() {
            setActive(pill);
            onFilter(tech);
        });
        bar.appendChild(pill);
    });

    function setActive(pill) {
        bar.querySelectorAll(".filter-pill").forEach(function(p) {
            p.classList.remove("active");
        });
        pill.classList.add("active");
    }
}

// ==========================================
// INIT
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    var urlParams = new URLSearchParams(window.location.search);
    var categoryKey = urlParams.get("type") || "bedsheet";

    var data = categoryDataMap[categoryKey];
    if (!data) {
        document.getElementById("category-title").textContent = "Category Not Found";
        document.getElementById("category-subtitle").textContent = "We could not find the category you requested.";
        buildSidebar(categoryKey);
        return;
    }

    // Populate banner
    document.title = data.title + " | Artisan Edit";
    document.getElementById("category-title").textContent = data.title;
    document.getElementById("category-subtitle").textContent = data.description;
    document.getElementById("category-banner-img").src = data.image;

    // Build sidebar
    buildSidebar(categoryKey);

    // Build filters + initial render
    buildFilters(data, function(tech) {
        renderProducts(data, tech);
    });

    renderProducts(data, null);
});
