document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
        });
    }

    // Scroll effect for header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
            header.style.padding = '15px 0';
        }
    });
});

// Tab switching logic for Pricing Menu
window.openTab = function(evt, tabName) {
    let tabcontent = document.getElementsByClassName("pricing-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    let tablinks = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    let currentTab = document.getElementById(tabName);
    currentTab.style.display = "block";
    setTimeout(() => {
        currentTab.classList.add("active");
    }, 10);
    
    evt.currentTarget.classList.add("active");
}

// Booking Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const bookingModal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (bookingModal) {
        // Select all links that act as Book Now buttons
        const bookButtons = document.querySelectorAll('a[href="#book"], a[href="#contact"]');
        
        bookButtons.forEach(btn => {
            if (btn.textContent.toLowerCase().includes('book')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    bookingModal.classList.add('active');
                });
            }
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                bookingModal.classList.remove('active');
            });
        }

        // Close on clicking outside the modal content
        window.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                bookingModal.classList.remove('active');
            }
        });
        
        // Handle form submission (prevent default refresh for demo)
        const bookingForm = bookingModal.querySelector('.booking-form-modal');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you for booking! We will contact you shortly to confirm your appointment.');
                bookingModal.classList.remove('active');
                bookingForm.reset();
            });
        }
    }
});

// Promotional Popups Logic
document.addEventListener('DOMContentLoaded', () => {
    const popup1 = document.getElementById('promoPopup1');
    const popup2 = document.getElementById('promoPopup2');
    const closeBtns = document.querySelectorAll('.promo-close-btn');
    
    if (!popup1 || !popup2) return;

    // Helper to close popups
    const closePopup = (popupId) => {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.remove('active');
        }
    };

    // Close button event listeners
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const popupId = btn.getAttribute('data-close');
            closePopup(popupId);
        });
    });

    // Close on clicking outside modal
    document.querySelectorAll('.promo-popup-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closePopup(overlay.id);
            }
        });
    });

    // Close when clicking CTA links inside popup
    document.querySelectorAll('.promo-btn, .promo-btn-secondary').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const popupId = btn.getAttribute('data-close');
            if (popupId) {
                closePopup(popupId);
            }
        });
    });

    // Timer Logic for Popup 1
    setTimeout(() => {
        if (!popup2.classList.contains('active')) {
            popup1.classList.add('active');
        }
    }, 5000);

    // Scroll Logic for Popup 2
    const handleScrollForPopup = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        // Prevent divide by zero on very short pages
        if (scrollHeight <= 0) return;
        
        const scrollPercentage = (window.scrollY / scrollHeight) * 100;
        
        if (scrollPercentage >= 45) {
            // Show only if Popup 1 isn't currently open
            if (!popup1.classList.contains('active')) {
                popup2.classList.add('scroll-trigger');
                // Slight delay to allow CSS transitions
                setTimeout(() => {
                    popup2.classList.add('active');
                }, 50);
                window.removeEventListener('scroll', handleScrollForPopup);
            }
        }
    };

    window.addEventListener('scroll', handleScrollForPopup);
});

// ============================
// Shine Bros Chatbot Logic
// ============================
document.addEventListener('DOMContentLoaded', () => {
    const widget = document.getElementById('chatbotWidget');
    const toggle = document.getElementById('chatbotToggle');
    const closeBtn = document.getElementById('chatbotClose');
    const messagesEl = document.getElementById('chatbotMessages');
    const inputEl = document.getElementById('chatbotInput');
    const sendBtn = document.getElementById('chatbotSend');
    const quickBtns = document.querySelectorAll('#chatbotQuickActions button');

    if (!widget || !toggle) return;

    // Business Knowledge Base
    const BUSINESS = {
        name: 'Shine Bros Car Wash',
        tagline: 'Get Ready to Shine',
        phone: '8921844866',
        email: 'hello@shinebroscarwash.com',
        location: 'Shine Bros Auto Spa, Pallipadi, Choorakkode, Kerala 679336',
        mapLink: 'https://www.google.com/maps/dir//Shine+Bros+Auto+Spa,+Pallipadi,+Choorakkode,+Keralam+679336',
        hours: 'Monday – Sunday: 8:00 AM – 8:00 PM',
        whatsapp: 'https://wa.me/918921844866',
        instagram: 'https://www.instagram.com/shinebros.in',
        facebook: 'https://www.facebook.com/profile.php?id=61588641463879',
        pricing: {
            cars: [
                { name: 'Full Wash', desc: 'Complete interior + exterior deep clean', '5seat': '₹600', '8seat': '₹700' },
                { name: 'Half Wash', desc: 'Exterior wash + quick interior vacuum', '5seat': '₹450', '8seat': '₹600' },
                { name: 'Body Only', desc: 'Exterior foam wash and dry', '5seat': '₹300', '8seat': '₹400' }
            ],
            bikes: [
                { name: 'Bike Diesel (w/ chain)', price: '₹300' },
                { name: 'Bike Normal', price: '₹200' },
                { name: 'Scooty Normal', price: '₹150' }
            ],
            others: [
                { name: 'Pickup Full Wash', price: '₹600' },
                { name: 'Pickup Half Wash', price: '₹500' },
                { name: 'Thar Full Wash', price: '₹700' },
                { name: 'Engine Room Cleaning', price: '₹300' },
                { name: 'Under Foam Wash', price: '₹100' },
                { name: 'Under Chemical Wash', price: '₹200' }
            ]
        }
    };

    // Response templates
    const responses = {
        greeting: () => `👋 Hi there! Welcome to <strong>Shine Bros Car Wash</strong>! How can I help you today? You can ask me about our services, pricing, location, or anything else! ✨`,

        pricing: () => {
            let msg = `💰 <strong>Our Pricing:</strong><br><br>`;
            msg += `🚗 <strong>Cars (5/8 Seater):</strong><br>`;
            BUSINESS.pricing.cars.forEach(s => {
                msg += `• ${s.name}: ${s['5seat']} (5-seat) / ${s['8seat']} (8-seat)<br>`;
            });
            msg += `<br>🏍️ <strong>Two Wheelers:</strong><br>`;
            BUSINESS.pricing.bikes.forEach(s => {
                msg += `• ${s.name}: ${s.price}<br>`;
            });
            msg += `<br>🚙 <strong>Others & Add-ons:</strong><br>`;
            BUSINESS.pricing.others.forEach(s => {
                msg += `• ${s.name}: ${s.price}<br>`;
            });
            msg += `<div class="msg-link-row"><a href="#services">View All Services</a></div>`;
            return msg;
        },

        services: () => {
            let msg = `🚗 <strong>Our Services:</strong><br><br>`;
            msg += `✅ Full Wash (Interior + Exterior)<br>`;
            msg += `✅ Half Wash (Exterior + Quick Vacuum)<br>`;
            msg += `✅ Body Only Wash<br>`;
            msg += `✅ Bike & Scooty Wash<br>`;
            msg += `✅ Pickup / Thar Wash<br>`;
            msg += `✅ Engine Room Cleaning<br>`;
            msg += `✅ Under Foam Wash<br>`;
            msg += `✅ Under Chemical Wash<br>`;
            msg += `✅ Ceramic Coating<br>`;
            msg += `✅ Headlight Restoration<br><br>`;
            msg += `We use eco-friendly products and our trained professionals ensure a premium finish every time! 🌿`;
            msg += `<div class="msg-link-row"><a href="#services">View Pricing</a></div>`;
            return msg;
        },

        location: () => {
            let msg = `📍 <strong>Our Location:</strong><br><br>`;
            msg += `${BUSINESS.location}<br><br>`;
            msg += `🕐 <strong>Hours:</strong> ${BUSINESS.hours}`;
            msg += `<div class="msg-link-row"><a href="${BUSINESS.mapLink}" target="_blank"><i class="fa-solid fa-map-location-dot"></i> Get Directions</a></div>`;
            return msg;
        },

        contact: () => {
            let msg = `📞 <strong>Contact Us:</strong><br><br>`;
            msg += `📱 Phone: <a href="tel:+91${BUSINESS.phone}">${BUSINESS.phone}</a><br>`;
            msg += `✉️ Email: ${BUSINESS.email}<br><br>`;
            msg += `<strong>Follow us:</strong>`;
            msg += `<div class="msg-link-row">`;
            msg += `<a href="${BUSINESS.whatsapp}" target="_blank"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>`;
            msg += `<a href="${BUSINESS.instagram}" target="_blank"><i class="fa-brands fa-instagram"></i> Instagram</a>`;
            msg += `<a href="${BUSINESS.facebook}" target="_blank"><i class="fa-brands fa-facebook-f"></i> Facebook</a>`;
            msg += `</div>`;
            return msg;
        },

        hours: () => {
            return `🕐 <strong>Business Hours:</strong><br><br>We are open <strong>7 days a week!</strong><br>📅 ${BUSINESS.hours}<br><br>Walk-ins are welcome, or you can book in advance for priority service!`;
        },

        book: () => {
            let msg = `📅 <strong>Ready to Book?</strong><br><br>`;
            msg += `You can book your wash right here on our website, or reach out to us directly:<br><br>`;
            msg += `📱 Call/WhatsApp: <a href="tel:+91${BUSINESS.phone}">${BUSINESS.phone}</a>`;
            msg += `<div class="msg-link-row">`;
            msg += `<a href="#book">📅 Book Online</a>`;
            msg += `<a href="${BUSINESS.whatsapp}" target="_blank"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>`;
            msg += `</div>`;
            return msg;
        },

        carWash: () => {
            let msg = `🚗 <strong>Car Wash Pricing:</strong><br><br>`;
            BUSINESS.pricing.cars.forEach(s => {
                msg += `<strong>${s.name}</strong> – ${s.desc}<br>• 5-Seater: ${s['5seat']} | 8-Seater: ${s['8seat']}<br><br>`;
            });
            msg += `<div class="msg-link-row"><a href="#book">📅 Book Now</a></div>`;
            return msg;
        },

        bikeWash: () => {
            let msg = `🏍️ <strong>Bike & Scooty Wash:</strong><br><br>`;
            BUSINESS.pricing.bikes.forEach(s => {
                msg += `• <strong>${s.name}</strong>: ${s.price}<br>`;
            });
            msg += `<div class="msg-link-row"><a href="#book">📅 Book Now</a></div>`;
            return msg;
        },

        fallback: () => {
            return `I'm not sure I understand that. 😅 Here are some things I can help you with:<br><br>💰 <strong>Pricing</strong> – View our rates<br>🚗 <strong>Services</strong> – What we offer<br>📍 <strong>Location</strong> – How to find us<br>📞 <strong>Contact</strong> – Phone, WhatsApp, Social<br>📅 <strong>Book</strong> – Schedule a wash<br><br>Just type a keyword or tap one of the quick buttons below!`;
        }
    };

    // Keyword-to-response matching
    const matchResponse = (input) => {
        const q = input.toLowerCase().trim();

        if (/^(hi|hello|hey|hii|hola|yo|sup|namaste|hlo)/.test(q)) return responses.greeting();
        if (/price|pricing|cost|rate|charge|how much|kitna|paisa|rupee|₹/.test(q)) return responses.pricing();
        if (/service|offer|what do you|what you do|kya karte|wash type/.test(q)) return responses.services();
        if (/location|address|where|kaha|map|direction|find you|pallipadi|choorakkode/.test(q)) return responses.location();
        if (/contact|phone|call|number|email|mail|social|reach|connect/.test(q)) return responses.contact();
        if (/hour|time|open|close|timing|when|schedule|kab/.test(q)) return responses.hours();
        if (/book|appointment|reserve|slot|visit/.test(q)) return responses.book();
        if (/car|sedan|suv|hatchback|5.?seat|8.?seat|full wash|half wash|body only/.test(q)) return responses.carWash();
        if (/bike|scooty|motorcycle|two.?wheel|chain/.test(q)) return responses.bikeWash();
        if (/whatsapp|wa/.test(q)) return `💬 Chat with us on WhatsApp!<div class="msg-link-row"><a href="${BUSINESS.whatsapp}" target="_blank"><i class="fa-brands fa-whatsapp"></i> Open WhatsApp</a></div>`;
        if (/instagram|insta|ig/.test(q)) return `📸 Follow us on Instagram for updates and behind-the-scenes!<div class="msg-link-row"><a href="${BUSINESS.instagram}" target="_blank"><i class="fa-brands fa-instagram"></i> @shinebros.in</a></div>`;
        if (/facebook|fb/.test(q)) return `👍 Check out our Facebook page!<div class="msg-link-row"><a href="${BUSINESS.facebook}" target="_blank"><i class="fa-brands fa-facebook-f"></i> Shine Bros</a></div>`;
        if (/thar/.test(q)) return `🚙 <strong>Thar Full Wash:</strong> ₹700<br>Specialized deep cleaning for Mahindra Thar including tires and underbody.<div class="msg-link-row"><a href="#book">📅 Book Now</a></div>`;
        if (/pickup|pic.?up/.test(q)) return `🛻 <strong>Pickup Wash:</strong><br>• Full Wash: ₹600<br>• Half Wash: ₹500<div class="msg-link-row"><a href="#book">📅 Book Now</a></div>`;
        if (/engine/.test(q)) return `⚙️ <strong>Engine Room Cleaning:</strong> ₹300<br>Safe and thorough engine bay degreasing and detailing.<div class="msg-link-row"><a href="#book">📅 Book Now</a></div>`;
        if (/foam/.test(q)) return `🫧 <strong>Under Foam Wash:</strong> ₹100<br>Underbody cleaning with premium foam for corrosion prevention.<div class="msg-link-row"><a href="#book">📅 Book Now</a></div>`;
        if (/chemical/.test(q)) return `🧪 <strong>Under Chemical Wash:</strong> ₹200<br>Intensive underbody chemical treatment for anti-rust protection.<div class="msg-link-row"><a href="#book">📅 Book Now</a></div>`;
        if (/ceramic|coating|protect/.test(q)) return `✨ <strong>Ceramic Coating</strong> gives your car showroom-level shine and long-lasting protection! Contact us for a custom quote.<div class="msg-link-row"><a href="tel:+91${BUSINESS.phone}">📱 Call Us</a><a href="${BUSINESS.whatsapp}" target="_blank"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a></div>`;
        if (/eco|environment|green|safe/.test(q)) return `🌿 At Shine Bros, we use only <strong>eco-friendly, biodegradable products</strong> that are safe for your car and the planet. Our water recycling practices reduce waste and our trained team ensures a premium result every single time!`;
        if (/thank|thanks|thx|bye|ok/.test(q)) return `You're welcome! 😊 Have a great day! If you need anything else, just type away. We're always here for you! ✨🚗`;

        return responses.fallback();
    };

    // Add message to chat
    const addMessage = (html, type) => {
        const div = document.createElement('div');
        div.className = `chat-msg ${type}`;
        div.innerHTML = html;
        messagesEl.appendChild(div);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    };

    // Show typing indicator
    const showTyping = () => {
        const div = document.createElement('div');
        div.className = 'typing-indicator';
        div.id = 'typingIndicator';
        div.innerHTML = '<span></span><span></span><span></span>';
        messagesEl.appendChild(div);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    };

    const removeTyping = () => {
        const el = document.getElementById('typingIndicator');
        if (el) el.remove();
    };

    // Process user input
    const processInput = (text) => {
        if (!text.trim()) return;
        addMessage(text, 'user');
        inputEl.value = '';

        showTyping();
        const delay = 400 + Math.random() * 600;
        setTimeout(() => {
            removeTyping();
            const response = matchResponse(text);
            addMessage(response, 'bot');
        }, delay);
    };

    // Toggle chatbot
    toggle.addEventListener('click', () => {
        widget.classList.toggle('active');
        if (widget.classList.contains('active') && messagesEl.children.length === 0) {
            setTimeout(() => addMessage(responses.greeting(), 'bot'), 300);
        }
        inputEl.focus();
    });

    closeBtn.addEventListener('click', () => {
        widget.classList.remove('active');
    });

    // Send message
    sendBtn.addEventListener('click', () => processInput(inputEl.value));
    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') processInput(inputEl.value);
    });

    // Quick action buttons
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            processInput(query);
        });
    });
});
