// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Project details overlay
const projectDetailsOverlay = document.getElementById('projectDetailsOverlay');
const projectDetailsTitle = document.getElementById('projectDetailsTitle');
const projectDetailsContent = document.getElementById('projectDetailsContent');
const closeDetails = document.getElementById('closeDetails');

// Project data with GitHub links
const projectData = {
    ecoharmony: {
        title: "EcoHarmony - Sustainable Computing Platform",
        description: `<p>A comprehensive platform dedicated to promoting sustainable computing practices among technology professionals. The website educates users on reducing environmental impact through green coding, energy-efficient systems, and sustainable development practices.</p>
        <p>The platform includes interactive elements such as a weekly green computing challenge calendar with drag-and-drop functionality, statistics on tech industry environmental impact, and practical tips for implementing sustainable practices in software development and IT operations.</p>`,
        technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Font Awesome Icons"],
        githubLink: "https://github.com/1Xp3rt/EcoHarmony",
        screenshots: [
            "photo/eco.jpg"
        ]
    },
    compliance: {
        title: "AI-Powered Compliance System",
        description: `<p>A proactive GDPR and data protection monitoring system that uses AI to predict compliance violations before they occur. The system automates consent tracking and data access monitoring to ensure regulatory compliance.</p>
        <p>The application features a real-time dashboard showing compliance metrics, automated violation prediction, and proactive blocking of high-risk data accesses. It includes both frontend (React) and backend (Node.js/Express with MongoDB) components.</p>`,
        technologies: ["React", "Node.js", "Express", "MongoDB", "REST API", "Mongoose ODM"],
        githubLink: "https://github.com/1Xp3rt/Compliance-System",
        screenshots: [
            "photo/legal.jpg"
        ]
    },
    thinkmove: {
        title: "ThinkMove Educational Consultancy Website",
        description: `<p>A responsive website for an educational consultancy firm specializing in curriculum development, research assistance, and project management services. The design focuses on establishing credibility and showcasing expertise in the education sector.</p>
        <p>The website includes an interactive testimonial slider, service showcases, and a contact form. The design uses a professional color scheme and clean layout to appeal to educational institutions and corporate clients.</p>`,
        technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Font Awesome Icons"],
        githubLink: "https://github.com/1Xp3rt/ThinkMove",
        screenshots: [
            "photo/thinkmove.jpg"
        ]
    },
    iotcar: {
        title: "IoT Car Diagnostic Dashboard (C# WPF Application)",
        description: `<p>A C# WPF desktop application for processing and visualizing vehicle diagnostic data in real-time. The application connects to vehicle sensors to monitor performance metrics and identify potential issues.</p>
        <p>The dashboard displays real-time charts for speed, RPM, coolant temperature, and fuel level, along with diagnostic trouble code monitoring. It uses OxyPlot for data visualization and follows MVVM architecture patterns.</p>
        <p><strong>Note:</strong> This is a desktop application, not a website. You can view the source code on GitHub to see how it works.</p>`,
        technologies: ["C#", "WPF", "OxyPlot", "MVVM Architecture", ".NET Framework", "XAML", "LiveCharts"],
        githubLink: "https://github.com/1Xp3rt/CarDiagnosticDashboard",
        screenshots: [
            "photo/car.jpg"
        ]
    },
    bookshop: {
        title: "Personal Book Shop Web Application",
        description: `<p>A full-stack web application for managing a personal book inventory with user authentication and book management features. The application allows users to track their book collection, manage lending, and search through their library.</p>
        <p>The frontend is built with HTML/CSS/JavaScript while the backend uses MySQL for data storage. The application demonstrates full-stack development skills including database design, API creation, and user interface design.</p>`,
        technologies: ["JavaScript", "HTML/CSS", "MySQL", "PHP/Node.js", "REST API", "Database Design"],
        githubLink: "https://github.com/1Xp3rt/MyBookShop",
        screenshots: [
            "photo/book.jpg"
        ]
    }
};

// Open project details when clicking on "View Details & GitHub" buttons
document.querySelectorAll('.view-project').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = e.target.closest('.project-card').dataset.project;
        openProjectDetails(projectId);
    });
});

// Also allow clicking anywhere on the project card (except the button itself)
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't trigger if clicking directly on the button
        if (e.target.closest('.view-project')) {
            return;
        }
        const projectId = card.dataset.project;
        openProjectDetails(projectId);
    });
});

// Function to open project details with scrolling image container
function openProjectDetails(projectId) {
    const project = projectData[projectId];
    
    if (!project) return;
    
    projectDetailsTitle.textContent = project.title;
    
    // Build screenshots HTML - each image will be full width in the scrollable container
    let screenshotsHTML = '';
    if (project.screenshots && project.screenshots.length > 0) {
        screenshotsHTML = `
            <div class="project-screenshot-container">
                ${project.screenshots.map((screenshot, index) => `
                    <img src="${screenshot}" alt="${project.title} - Screenshot ${index + 1}" class="project-screenshot">
                `).join('')}
            </div>
            <div class="scroll-instruction">
                <i class="fas fa-mouse"></i>
                <span>Scroll to view full screenshots</span>
            </div>
        `;
    } else {
        screenshotsHTML = `
            <div class="project-screenshot-container" style="display: flex; align-items: center; justify-content: center; background-color: #f0f0f0;">
                <p style="color: #666; text-align: center; padding: 40px;">No screenshots available for this project</p>
            </div>
        `;
    }
    
    // Build the project details content
    projectDetailsContent.innerHTML = `
        <div class="project-details-info">
            <p>${project.description}</p>
            
            <h4>Technologies Used</h4>
            <div class="project-tech" style="margin: 15px 0;">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            
            ${screenshotsHTML}
            
            <div class="project-details-links">
                <a href="${project.githubLink}" target="_blank" class="github-link-large">
                    <i class="fab fa-github"></i> View on GitHub
                </a>
                <button class="close-project-btn">
                    <i class="fas fa-times"></i> Close Details
                </button>
            </div>
        </div>
    `;
    
    // Add event listener to close button inside the details
    document.querySelector('.close-project-btn').addEventListener('click', closeProjectDetails);
    
    // Show the overlay
    projectDetailsOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close project details
function closeProjectDetails() {
    projectDetailsOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close details when clicking close button or overlay
closeDetails.addEventListener('click', closeProjectDetails);
projectDetailsOverlay.addEventListener('click', (e) => {
    if (e.target === projectDetailsOverlay) {
        closeProjectDetails();
    }
});

// Close details with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectDetailsOverlay.classList.contains('active')) {
        closeProjectDetails();
    }
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        alert(`Thank you for your message, ${name}! I will get back to you soon at ${email}.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Set current year in footer
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.querySelector('.copyright');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = `© ${currentYear} Vlada Kosheleva. All rights reserved.`;
    }
});