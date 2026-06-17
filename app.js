/* ==========================================
   Artisan Edit - Interactive Logic (FULLY FIXED)
   ========================================== */

// --- Wearables popover data ---
const wearablesPopoverData = {
    kids: { title: "Kids Wear", techniques: ["Kids Print"], categoryKey: "kids" },
    laptopbags: { title: "Laptop Bags & Sleeves", techniques: ["Handblock Sleeve", "Premium Tech Bag"], categoryKey: "laptopbags" },
    mens: { title: "Men's Apparel", techniques: ["Handblock Shirt", "Handloom Kurta"], categoryKey: "mens" },
    saree: { title: "Heritage Sarees", techniques: ["Indigo Block", "Chanderi Silk", "Handloom Cotton"], categoryKey: "saree" },
    jewellery: { title: "Artisanal Jewellery", techniques: ["Terracotta Necklaces", "Brass Fusion"], categoryKey: "jewellery" },
    dresses: { title: "Women Dresses", techniques: ["Handblock A-Line", "Applique Maxi"], categoryKey: "dresses" },
    suits: { title: "Dress Materials / Suits", techniques: ["Ajrakh Set", "Handblock Cotton"], categoryKey: "suits" },
    handbags: { title: "Handbags & Totes", techniques: ["Applique Tote", "Handblock Duffle"], categoryKey: "handbags" }
};

document.addEventListener("DOMContentLoaded", function() {

    // ==========================================
    // 1. HERO SLIDER
    // ==========================================
    const heroSlides = document.querySelectorAll(".hero-slide");
    const circleMenuItems = document.querySelectorAll(".menu-circle-item");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const sliderDotsContainer = document.querySelector(".slider-dots");
    
    let currentHeroSlide = 0;
    const totalHeroSlides = heroSlides.length;
    let heroAutoplayTimer;

    // Create dots
    if (sliderDotsContainer && totalHeroSlides > 0) {
        sliderDotsContainer.innerHTML = "";
        for (let i = 0; i < totalHeroSlides; i++) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", function() {
                goToHeroSlide(i);
                resetHeroAutoplay();
            });
            sliderDotsContainer.appendChild(dot);
        }
    }
    const dots = document.querySelectorAll(".dot");

    function updateHeroSliderUI() {
        heroSlides.forEach(function(slide, idx) {
            slide.classList.toggle("active", idx === currentHeroSlide);
        });
        circleMenuItems.forEach(function(item, idx) {
            item.classList.toggle("active", idx === currentHeroSlide);
        });
        dots.forEach(function(dot, idx) {
            dot.classList.toggle("active", idx === currentHeroSlide);
        });
    }

    function goToHeroSlide(index) {
        currentHeroSlide = (index + totalHeroSlides) % totalHeroSlides;
        updateHeroSliderUI();
    }

    function nextHeroSlide() {
        goToHeroSlide(currentHeroSlide + 1);
    }

    function prevHeroSlide() {
        goToHeroSlide(currentHeroSlide - 1);
    }

    function startHeroAutoplay() {
        heroAutoplayTimer = setInterval(nextHeroSlide, 6000);
    }

    function resetHeroAutoplay() {
        clearInterval(heroAutoplayTimer);
        startHeroAutoplay();
    }

    if (prevBtn) prevBtn.addEventListener("click", function() { prevHeroSlide(); resetHeroAutoplay(); });
    if (nextBtn) nextBtn.addEventListener("click", function() { nextHeroSlide(); resetHeroAutoplay(); });

    // Circular menu redirects
    const categoryKeys = ["suits", "curtain", "bedsheet", "dining"];
    circleMenuItems.forEach(function(item, idx) {
        item.addEventListener("click", function() {
            window.location.href = "category.html?type=" + categoryKeys[idx];
        });
    });

    startHeroAutoplay();

    // ==========================================
    // 2. CLICKPOINTS SLIDER (12 second delay)
    // ==========================================
    const clickpointSliderInner = document.querySelector(".clickpoints-slider-inner");
    let currentClickpointSlide = 0;
    const totalClickpointSlides = 2;
    let clickpointAutoplayTimer;

    function goToClickpointSlide(slideIndex) {
        currentClickpointSlide = slideIndex;
        if (clickpointSliderInner) {
            clickpointSliderInner.style.transform = "translateX(-" + (slideIndex * 100) + "%)";
        }
        // Close all popovers
        document.querySelectorAll(".hotspot-wrapper.active").forEach(function(w) {
            w.classList.remove("active");
        });
    }

    function nextClickpointSlide() {
        var nextIndex = (currentClickpointSlide + 1) % totalClickpointSlides;
        goToClickpointSlide(nextIndex);
    }

    function startClickpointAutoplay() {
        clickpointAutoplayTimer = setInterval(nextClickpointSlide, 12000);
    }

    function resetClickpointAutoplay() {
        clearInterval(clickpointAutoplayTimer);
        startClickpointAutoplay();
    }

    var clickpointContainer = document.querySelector(".clickpoints-slider-container");
    if (clickpointContainer) {
        clickpointContainer.addEventListener("mouseenter", function() {
            clearInterval(clickpointAutoplayTimer);
        });
        clickpointContainer.addEventListener("mouseleave", function() {
            startClickpointAutoplay();
        });
    }

    // Initialize
    goToClickpointSlide(0);
    startClickpointAutoplay();

    // ==========================================
    // 3. HOTSPOT POPOVERS
    // ==========================================
    var hotspotWrappers = document.querySelectorAll(".hotspot-wrapper");

    hotspotWrappers.forEach(function(wrapper) {
        var btn = wrapper.querySelector(".hotspot");
        
        if (btn) {
            btn.addEventListener("click", function(e) {
                e.stopPropagation();
                var isActive = wrapper.classList.contains("active");
                hotspotWrappers.forEach(function(w) { w.classList.remove("active"); });
                if (!isActive) {
                    wrapper.classList.add("active");
                }
                resetClickpointAutoplay();
            });
        }

        var popover = wrapper.querySelector(".hotspot-popover");
        if (popover) {
            popover.addEventListener("click", function(e) {
                e.stopPropagation();
            });
            var shopBtn = popover.querySelector(".popover-btn");
            if (shopBtn) {
                shopBtn.addEventListener("click", function(e) {
                    e.stopPropagation();
                    window.location.href = this.getAttribute("href");
                });
            }
        }
    });

    // Close popovers on outside click
    document.addEventListener("click", function() {
        hotspotWrappers.forEach(function(w) { w.classList.remove("active"); });
    });

    // ==========================================
    // 4. WEARABLES HOTSPOTS WITH POPOVERS
    // ==========================================
    var wearablesSlide = document.querySelector(".clickpoint-slide:nth-child(2)");
    if (wearablesSlide) {
        var wearableHotspots = wearablesSlide.querySelectorAll(".hotspot");
        
        wearableHotspots.forEach(function(hotspot) {
            var key = hotspot.getAttribute("data-hotspot");
            var data = wearablesPopoverData[key];
            
            if (data) {
                var wrapper = document.createElement("div");
                wrapper.className = "hotspot-wrapper";
                wrapper.style.position = "absolute";
                wrapper.style.top = hotspot.style.top;
                wrapper.style.left = hotspot.style.left;
                wrapper.style.width = "32px";
                wrapper.style.height = "32px";
                wrapper.style.zIndex = "50";
                
                var hotspotClone = hotspot.cloneNode(true);
                
                var popover = document.createElement("div");
                popover.className = "hotspot-popover";
                popover.innerHTML = 
                    '<h4 class="popover-title">' + data.title + '</h4>' +
                    '<p class="popover-desc">Artisan Techniques</p>' +
                    '<div class="popover-techniques">' +
                        data.techniques.map(function(tech) { 
                            return '<span class="popover-tech-badge">' + tech + '</span>'; 
                        }).join('') +
                    '</div>' +
                    '<a href="category.html?type=' + data.categoryKey + '" class="popover-btn">Shop Now</a>';
                
                wrapper.appendChild(hotspotClone);
                wrapper.appendChild(popover);
                hotspot.replaceWith(wrapper);
                
                wrapper.addEventListener("click", function(e) {
                    e.stopPropagation();
                    document.querySelectorAll(".hotspot-wrapper.active").forEach(function(w) {
                        if (w !== wrapper) w.classList.remove("active");
                    });
                    wrapper.classList.toggle("active");
                    resetClickpointAutoplay();
                });
                
                popover.addEventListener("click", function(e) {
                    e.stopPropagation();
                });
                
                var shopBtn = popover.querySelector(".popover-btn");
                if (shopBtn) {
                    shopBtn.addEventListener("click", function(e) {
                        e.stopPropagation();
                        window.location.href = this.getAttribute("href");
                    });
                }
            }
        });
    }

    // ==========================================
    // 5. UPDATE PROGRESS BAR TO 12 SECONDS
    // ==========================================
    var styleSheet = document.createElement("style");
    styleSheet.textContent = 
        '.clickpoints-slider-container::after { animation-duration: 12s !important; }';
    document.head.appendChild(styleSheet);

});