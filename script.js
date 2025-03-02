// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Network Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Create network visualization using D3.js
    const width = document.querySelector('.network-visualization').clientWidth;
    const height = 500;
    
    const svg = d3.select('#network-viz')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Sample data for network visualization
    const nodes = Array.from({length: 50}, (_, i) => ({
        id: i,
        group: Math.floor(Math.random() * 5)
    }));

    const links = Array.from({length: 80}, () => ({
        source: Math.floor(Math.random() * nodes.length),
        target: Math.floor(Math.random() * nodes.length)
    }));

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id))
        .force('charge', d3.forceManyBody().strength(-50))
        .force('center', d3.forceCenter(width / 2, height / 2));

    // Draw links
    const link = svg.append('g')
        .selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .style('stroke', '#999')
        .style('stroke-opacity', 0.6)
        .style('stroke-width', 1);

    // Draw nodes
    const node = svg.append('g')
        .selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', 5)
        .style('fill', d => d3.schemeCategory10[d.group]);

    // Update positions
    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Search functionality
const searchInput = document.querySelector('.search-container input');
if (searchInput) {
    searchInput.addEventListener('input', debounce(function(e) {
        // Here you would typically make an API call to your backend
        console.log('Searching for:', e.target.value);
    }, 300));
}

// Debounce function to limit API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'white';
        navbar.style.boxShadow = 'none';
    }
});

// Initialize tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

// Add loading animation for research grid
function loadResearchItems() {
    const grid = document.querySelector('.research-grid');
    if (!grid) return;

    // Sample research items
    const items = [
        {
            title: 'Machine Learning in Healthcare',
            author: 'Dr. Jane Smith',
            date: '2024-03-15',
            category: 'AI & Healthcare'
        },
        {
            title: 'Climate Change Impact Analysis',
            author: 'Prof. John Doe',
            date: '2024-03-14',
            category: 'Environmental Science'
        },
        {
            title: 'Quantum Computing Advances',
            author: 'Dr. Alice Johnson',
            date: '2024-03-13',
            category: 'Quantum Physics'
        }
    ];

    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'research-item';
        itemElement.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">By ${item.author}</p>
                    <span class="badge bg-primary">${item.category}</span>
                </div>
            </div>
        `;
        grid.appendChild(itemElement);
    });
}

// Load research items when page loads
loadResearchItems();