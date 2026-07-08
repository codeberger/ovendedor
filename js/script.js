document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    function handleScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        var sections = document.querySelectorAll('section[id]');
        var scrollPos = window.scrollY + 150;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var bottom = top + section.offsetHeight;
            var id = section.getAttribute('id');

            navLinks.forEach(function (link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    if (scrollPos >= top && scrollPos < bottom) {
                        link.classList.add('active');
                    }
                }
            });
        });
    }

    window.addEventListener('scroll', handleScroll);

    function animateCounters() {
        var counters = document.querySelectorAll('.stat-number');
        var animated = false;

        function startCounters() {
            if (animated) return;
            var triggerBottom = window.innerHeight * 0.85;

            counters.forEach(function (counter) {
                var rect = counter.getBoundingClientRect();
                if (rect.top < triggerBottom) {
                    animated = true;
                    var target = parseInt(counter.getAttribute('data-count'));
                    var suffix = counter.closest('.stat-item').querySelector('.stat-label');
                    var isMil = suffix && suffix.textContent.includes('Mil');
                    var isSeguidores = suffix && suffix.textContent.includes('Seguidores');
                    var current = 0;
                    var increment = target / 60;
                    var maxVal = target;

                    if (isMil) {
                        maxVal = target * 1000;
                        increment = maxVal / 60;
                    }
                    if (isSeguidores) {
                        maxVal = target * 1000;
                        increment = maxVal / 60;
                    }

                    function updateCounter() {
                        current += increment;
                        if (current < maxVal) {
                            if (isMil || isSeguidores) {
                                counter.textContent = Math.floor(current).toLocaleString('pt-BR');
                            } else {
                                counter.textContent = Math.floor(current);
                            }
                            requestAnimationFrame(updateCounter);
                        } else {
                            if (isMil) {
                                counter.textContent = target + 'mil';
                            } else if (isSeguidores) {
                                counter.textContent = target + 'mil';
                            } else {
                                counter.textContent = target + '+';
                            }
                        }
                    }
                    updateCounter();
                }
            });
        }

        window.addEventListener('scroll', startCounters);
        startCounters();
    }

    animateCounters();

    function revealOnScroll() {
        var elements = document.querySelectorAll('.section:not(.hero)');
        elements.forEach(function (el) {
            el.classList.add('reveal');
        });

        function checkReveal() {
            elements.forEach(function (el) {
                var rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.85) {
                    el.classList.add('visible');
                }
            });
        }

        window.addEventListener('scroll', checkReveal);
        checkReveal();
    }

    revealOnScroll();
});
