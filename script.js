const navToggle = document.querySelector('.nav-toggle');
        const desktopNav = document.querySelector('#desktop-nav');
        const navLinks = document.querySelectorAll('a[href^="#"]');

        function scrollToSectionHash(hash) {
            if (!hash) return;
            const target = document.querySelector(hash);
            if (!target) return;
            const p1 = target.querySelector('.section-text-p1');
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;

            // If there's a .section-text-p1 element, scroll so it is visible below the header
            if (p1) {
                const rect = p1.getBoundingClientRect();
                const absoluteTop = window.pageYOffset + rect.top;
                const offset = Math.max(8, headerHeight + 8);
                window.scrollTo({ top: absoluteTop - offset, behavior: 'smooth' });
            } else {
                const rect = target.getBoundingClientRect();
                const absoluteTop = window.pageYOffset + rect.top;
                window.scrollTo({ top: absoluteTop - headerHeight, behavior: 'smooth' });
            }
        }

        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            desktopNav.classList.toggle('nav-open');
        });

        navLinks.forEach(link => {
            // Close drawer on nav clicks and then scroll to make .section-text-p1 visible
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    desktopNav.classList.remove('nav-open');
                    navToggle.setAttribute('aria-expanded', 'false');
                    // wait a tick for the drawer to close visually
                    setTimeout(() => scrollToSectionHash(href), 80);
                    // update URL hash without jumping
                    history.pushState(null, '', href);
                }
            });
        });

        // Handle direct link (page load with hash)
        window.addEventListener('DOMContentLoaded', () => {
            if (location.hash) {
                // slight delay to allow layout (sticky header) to settle
                setTimeout(() => scrollToSectionHash(location.hash), 60);
            }
        });