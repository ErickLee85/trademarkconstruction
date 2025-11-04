 gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

        // Hero animations on load with SplitText
        window.addEventListener('load', () => {
            // Split the tagline text
          
                const infoBtn = document.querySelector('.btn-secondary')
                let words = document.querySelectorAll(".trusted-logo")
                let smoother = ScrollSmoother.create({
                    wrapper:'#smooth-wrapper',
                    content:'#smooth-content',
                    smooth:2
                })

                infoBtn.addEventListener('click',(e) => {
                    smoother.scrollTo(".stats-section", true, "center center")
                })
                let split = SplitText.create([".hero-tagline"], { type: "words" });
                let split2 = SplitText.create(".hero-subtitle", {type:"words"})
                let split3 = SplitText.create(".hero-subtext",{type:"words"})
                let split4 = SplitText.create(".trusted-logo", {type:"words"})
                let split5 = SplitText.create(".stats-content h2", {type:"words"})
                let split6 = SplitText.create(".stats-content p",{type:"words"})
                
         
             gsap.fromTo(split.words, {opacity: 0,filter:'blur(10px)',},{opacity:1,filter:'blur(0px)',duration: 1,stagger: 0.1,delay:0.5,});
             gsap.fromTo(split2.words,{opacity:0,},{opacity:1,duration:1,stagger:0.1})
             gsap.fromTo(split3.words,{opacity:0},{opacity:1,duration:1,stagger:0.1,delay:1.2})
             gsap.from(split4.words,{opacity:0, stagger:0.2,
                scrollTrigger: {
                trigger: split4.words[0].parentElement,
                start: "top 85%", // adjust this value (higher % = triggers sooner)
                toggleActions: "play none none none", // only play once when entering
            }
             })
             gsap.fromTo(".hero-cta > a",{y:20,opacity:0},{y:0,opacity:1,duration:1,delay:1.5})
             
             // Stats animation with ScrollTrigger
             gsap.fromTo(".stat-item",
                {
                    x: -50,
                    opacity: 0,
                    filter: 'blur(10px)'
                },
                {
                    x: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    stagger: 0.2,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: ".stats-section",
                        start: "top 50%",
                        toggleActions: "play none none none",
                    }
                }
             )

             // Number counter animation
             document.querySelectorAll('.stat-number').forEach((statNumber) => {
                 const text = statNumber.textContent;
                 const number = parseInt(text.replace(/\D/g, ''));
                 const suffix = text.replace(/[0-9]/g, '');
                 
                 gsap.fromTo(statNumber, 
                     { textContent: 0 },
                     {
                         textContent: number,
                         duration: 2,
                         ease: 'power1.out',
                         snap: { textContent: 1 },
                         scrollTrigger: {
                             trigger: ".stats-section",
                             start: "top 50%",
                             toggleActions: "play none none none",
                         },
                         onUpdate: function() {
                             statNumber.textContent = Math.ceil(statNumber.textContent) + suffix;
                         }
                     }
                 );
             });
             
             gsap.fromTo(split5.words,{opacity:0,filter:'blur(5px)'},{opacity:1,filter:'blur(0px)',duration: 1,stagger: 0.1,delay:0.5,
                scrollTrigger: {
                        trigger: ".stats-section",
                        start: "top 50%",
                        toggleActions: "play none none none",
                }
             })
              gsap.fromTo(split6.words,{opacity:0},{opacity:1,duration:1,stagger:0.1,delay:1.2,
                scrollTrigger: {
                        trigger: ".stats-section",
                        start: "top 50%",
                        toggleActions: "play none none none",
                }
             })
            
            

        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    // Close mobile menu if open
                    const mobileMenu = document.querySelector('.mobile-menu');
                    const menuToggle = document.querySelector('.mobile-menu-toggle');
                    if (mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                    
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: target,
                        ease: 'power3.inOut'
                    });
                }
            });
        });

        let lastScrollY = 0;
        const navbar = document.querySelector('header'); // or whatever your navbar selector is

        ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
            const currentScrollY = self.scroll();
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down & past hero section
            gsap.to(navbar, {
                y: -100, // adjust based on your navbar height
                duration: 0.3,
            });
            } else if (currentScrollY < lastScrollY) {
            // Scrolling up
            gsap.to(navbar, {
                y: 0,
                duration: 0.3,
            });
            }
            
            lastScrollY = currentScrollY;
        }
        });

        // Mobile menu toggle
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu nav a');

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking a link
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Hero Image Slider
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.hero-slider-dots .dot');
        const prevBtn = document.querySelector('.hero-arrow-prev');
        const nextBtn = document.querySelector('.hero-arrow-next');
        let currentSlide = 0;
        let isAnimating = false;

        function goToSlide(index, direction) {
            if (isAnimating || index === currentSlide) return;
            isAnimating = true;

            const oldSlide = slides[currentSlide];
            const newSlide = slides[index];
            let slideClicked = null;

            

            // GSAP animation for smooth transition
            gsap.to(oldSlide, {
                transform:`${direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)'}`,
                ease: "power2.out",
                duration:0.2
            });

            gsap.fromTo(newSlide, 
                { transform:`${direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)'}` },
                { 
                    duration:0.2,
                    transform:'translateX(0)',
                    ease: "power2.out",
                    onComplete: () => {
                        oldSlide.classList.remove('active');
                        newSlide.classList.add('active');
                        isAnimating = false;
                    }
                }
            );

            // Update dots
            dots[currentSlide].classList.remove('active');
            dots[index].classList.add('active');

            currentSlide = index;
        }

        // Next button
        nextBtn.addEventListener('click', () => {
            const nextIndex = (currentSlide + 1) % slides.length;
            goToSlide(nextIndex, 'right');
            slideClicked = true;
        });

        // Previous button
        prevBtn.addEventListener('click', () => {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(prevIndex, 'left');
            slideClicked = true;
        });

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });

        // Auto-play (optional - every 5 seconds)
        setInterval(() => {
            if(slideClicked) {
                slideClicked = false
                return;
            }
            const nextIndex = (currentSlide + 1) % slides.length;
            goToSlide(nextIndex);
        }, 5000);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        });