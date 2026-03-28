document.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll & Transparency
    const headerNav = document.querySelector('.header-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            headerNav.classList.add('shadow-sm');
            headerNav.style.height = '70px';
        } else {
            headerNav.classList.remove('shadow-sm');
            headerNav.style.height = '80px';
        }
    });

    // Smooth Scroll for Navigation and Buttons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = headerNav.offsetHeight;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = target.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Interaction Observer for Premium Reveals
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Apply reveal to sections and specific cards
    const revealElements = document.querySelectorAll('.ps-card, .ind-card, .tool-card, .section-title, .hero-dashboard-stack');
    revealElements.forEach(el => {
        el.classList.add('reveal-init');
        revealOnScroll.observe(el);
    });

    // Simple Number Counter for "12,000+"
    const counters = document.querySelectorAll('.animate-number');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let count = 0;
                const speed = 2000 / target; // Total duration 2 seconds
                
                const updateCount = () => {
                    const increment = target / 100;
                    if (count < target) {
                        count += increment;
                        entry.target.innerText = Math.ceil(count).toLocaleString() + "+";
                        setTimeout(updateCount, 1);
                    } else {
                        entry.target.innerText = target.toLocaleString() + "+";
                    }
                };
                updateCount();
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 1 });

    counters.forEach(c => countObserver.observe(c));

    // System Section Tabs Logic
    const sysTabs = document.querySelectorAll('.sys-tab');
    const sysData = {
        pos: {
            img: 'assets/Hero.png',
            title: 'Point of Sale',
            desc: 'Lightning-fast checkout that handles queues without freezing. Our POS software processes transactions in seconds. Staff trained in minutes. Every sale updates inventory and accounts automatically.',
            features: ['Simplified Billing Process', 'Real-time Inventory Integration', 'Advanced Customer Insights']
        },
        inventory: {
            img: 'assets/Inventory Management.png',
            title: 'Inventory Management',
            desc: 'Track every single item from buy to sell. Our inventory management software handles thousands of SKUs without sweat. Get real-time stock alerts, automate reordering, and eliminate stockouts forever.',
            features: ['Master SKU Management', 'Auto-Reorder Alerts', 'Batch & Serial Tracking']
        },
        warehouse: {
            img: 'assets/Warehouse & WMS.png',
            title: 'Warehouse & WMS',
            desc: 'Organize your warehouse with surgical precision. Track bin locations, optimize picking routes, and handle multi-warehouse transfers effortlessly. Digital dispatch notes and barcode scanning built-in.',
            features: ['Bin Location Tracking', 'Picking Optimization', 'Mobile WMS Support']
        },
        omni: {
            img: 'assets/Omnichannel.png',
            title: 'Omni-channel Order',
            desc: 'One dashboard for all your sales. Sync orders from Amazon, eBay, Shopify, and your physical store instantly. Real-time inventory sync across all platforms means you never oversell again.',
            features: ['One-Click Marketplace Sync', 'Unified Order Processing', 'Global Stock Sync']
        },
        accounting: {
            img: 'assets/Accounting.png',
            title: 'Accounting',
            desc: 'Automate your bookkeeping and stay tax-compliant without lifting a finger. Real-time VAT reports, automated reconciliations, and instant P&L statements. British-designed for UK accounting rules.',
            features: ['Automated Bookkeeping', 'Tax Compliance', 'Real-time Financial Reporting']
        },
        crm: {
            img: 'assets/CRM.png',
            title: 'CRM',
            desc: 'Turn one-time buyers into lifelong fans. Track purchase history, reward loyalty, and run targeted marketing campaigns. Automated follow-ups and customer insights mean you always know what they want next.',
            features: ['Customer 360 View', 'Loyalty & Rewards', 'Marketing Automation']
        }
    };

    const allSysTabs = document.querySelectorAll('.sys-tab, .sys-tab-mobile');
    
    allSysTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            const content = sysData[target];

            // Update UI for both desktop and mobile tab elements
            allSysTabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll(`[data-tab="${target}"]`).forEach(t => t.classList.add('active'));

            const row = document.querySelector('#sys-content-row');
            row.style.opacity = '0';
            
            setTimeout(() => {
                document.querySelector('.sys-main-img').src = content.img;
                document.querySelector('.sys-main-title').innerText = content.title;
                document.querySelector('.sys-main-desc').innerText = content.desc;
                
                // Update features list
                const featureList = document.querySelector('.sys-feature-list');
                featureList.innerHTML = '';
                content.features.forEach(feat => {
                    const li = document.createElement('li');
                    li.className = 'mb-2 d-flex align-items-center';
                    li.innerHTML = `<i class="fa-solid fa-circle-check text-success me-2"></i> ${feat}`;
                    featureList.appendChild(li);
                });

                document.querySelector('.sys-main-link').innerHTML = `Explore ${content.title} Features <i class="fa-solid fa-arrow-right-long ms-2"></i>`;
                row.style.opacity = '1';
                
                // On mobile, scroll content into view if needed
                if(window.innerWidth < 768) {
                    row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 300);
        });
    });

    // Slider Buttons Active State logic
    document.querySelectorAll('.slider-row').forEach(row => {
        row.addEventListener('scroll', () => {
            const controls = row.nextElementSibling;
            if(controls && controls.classList.contains('slider-controls')) {
                const prev = controls.querySelector('.prev-btn');
                const next = controls.querySelector('.next-btn');
                
                if(row.scrollLeft > 10) {
                    prev.classList.add('active');
                } else {
                    prev.classList.remove('active');
                }
                
                if (Math.ceil(row.scrollLeft + row.clientWidth) >= row.scrollWidth - 10) {
                    next.classList.remove('active');
                } else {
                    next.classList.add('active');
                }
            }
        });
    });

});
