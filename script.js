/**
 * UIUC NLP Website - JavaScript
 * Modern interactions and enhancements
 */

(function() {
	'use strict';

	// Wait for DOM to be ready
	document.addEventListener('DOMContentLoaded', function() {
		
		// Smooth scroll for anchor links
		initSmoothScroll();
		
		// Add active state to navigation on scroll
		initScrollSpy();
		
		// Add animation on scroll for content sections
		initScrollAnimations();
		
		// Mobile menu toggle (if needed in future)
		initMobileMenu();
		
	});

	/**
	 * Smooth scrolling for anchor links
	 */
	function initSmoothScroll() {
		const links = document.querySelectorAll('a[href^="#"]');
		
		links.forEach(link => {
			link.addEventListener('click', function(e) {
				const href = this.getAttribute('href');
				
				// Skip if it's just "#"
				if (href === '#') return;
				
				const targetId = href.substring(1);
				const targetElement = document.getElementById(targetId);
				
				if (targetElement) {
					e.preventDefault();
					
					// Get the navigation height for offset
					const nav = document.querySelector('.main-navigation');
					const navHeight = nav ? nav.offsetHeight : 0;
					
					// Calculate position with offset
					const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
					
					// Smooth scroll to target
					window.scrollTo({
						top: targetPosition,
						behavior: 'smooth'
					});
					
					// Update URL without jumping
					history.pushState(null, null, href);
				}
			});
		});
	}

	/**
	 * Scroll spy - highlight active section in navigation
	 */
	function initScrollSpy() {
		const sections = document.querySelectorAll('.content-section[id]');
		const navLinks = document.querySelectorAll('.main-navigation a[href^="#"]');
		
		if (sections.length === 0 || navLinks.length === 0) return;
		
		function updateActiveNav() {
			const scrollPos = window.scrollY + 150;
			
			sections.forEach(section => {
				const sectionTop = section.offsetTop;
				const sectionBottom = sectionTop + section.offsetHeight;
				const sectionId = section.getAttribute('id');
				
				if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
					// Remove active class from all links
					navLinks.forEach(link => {
						link.parentElement.classList.remove('current-menu-item');
					});
					
					// Add active class to current section link
					const activeLink = document.querySelector(`.main-navigation a[href="#${sectionId}"]`);
					if (activeLink) {
						activeLink.parentElement.classList.add('current-menu-item');
					}
				}
			});
		}
		
		// Throttle scroll event for performance
		let ticking = false;
		window.addEventListener('scroll', function() {
			if (!ticking) {
				window.requestAnimationFrame(function() {
					updateActiveNav();
					ticking = false;
				});
				ticking = true;
			}
		});
	}

	/**
	 * Fade in content sections on scroll
	 */
	function initScrollAnimations() {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.style.opacity = '1';
					entry.target.style.transform = 'translateY(0)';
				}
			});
		}, {
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		});

		// Set initial state and observe
		const animatedElements = document.querySelectorAll('.content-section, .event-item, .faculty-member, .group-item');
		animatedElements.forEach(el => {
			el.style.opacity = '0';
			el.style.transform = 'translateY(20px)';
			el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
			observer.observe(el);
		});
	}

	/**
	 * Mobile menu toggle (placeholder for future enhancement)
	 */
	function initMobileMenu() {
		// This can be expanded later if a hamburger menu is needed
		// For now, the CSS handles responsive layout
		
		const nav = document.querySelector('.main-navigation');
		if (!nav) return;
		
		// Add class when scrolling for sticky behavior enhancement
		let lastScroll = 0;
		window.addEventListener('scroll', function() {
			const currentScroll = window.pageYOffset;
			
			if (currentScroll <= 0) {
				nav.classList.remove('scroll-up');
				return;
			}
			
			if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
				// Scrolling down
				nav.classList.remove('scroll-up');
				nav.classList.add('scroll-down');
			} else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
				// Scrolling up
				nav.classList.remove('scroll-down');
				nav.classList.add('scroll-up');
			}
			lastScroll = currentScroll;
		});
	}

	/**
	 * External link handling - open in new tab
	 */
	const externalLinks = document.querySelectorAll('a[href^="http"]');
	externalLinks.forEach(link => {
		if (link.hostname !== window.location.hostname) {
			link.setAttribute('target', '_blank');
			link.setAttribute('rel', 'noopener noreferrer');
		}
	});

	/**
	 * Add loading class to body when page is loading
	 */
	window.addEventListener('load', function() {
		document.body.classList.add('loaded');
	});

})();

