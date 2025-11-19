// Sample blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Getting Started with React Hooks",
        category: "Tech",
        description: "Learn how to use React Hooks to manage state and side effects in functional components.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
        date: "2025-11-15"
    },
    {
        id: 2,
        title: "Top 10 Travel Destinations for 2025",
        category: "Travel",
        description: "Discover the most breathtaking places to visit this year, from hidden gems to popular hotspots.",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop",
        date: "2025-11-12"
    },
    {
        id: 3,
        title: "The Perfect Homemade Pizza Recipe",
        category: "Food",
        description: "Master the art of making authentic Italian pizza at home with this simple recipe.",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=250&fit=crop",
        date: "2025-11-10"
    },
    {
        id: 4,
        title: "Understanding JavaScript Closures",
        category: "Tech",
        description: "Dive deep into one of JavaScript's most powerful features and learn how to use closures effectively.",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
        date: "2025-11-08"
    },
    {
        id: 5,
        title: "Backpacking Through Southeast Asia",
        category: "Travel",
        description: "A complete guide to exploring Thailand, Vietnam, and Cambodia on a budget.",
        image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=250&fit=crop",
        date: "2025-11-05"
    },
    {
        id: 6,
        title: "Healthy Meal Prep Ideas",
        category: "Food",
        description: "Save time and eat healthy with these delicious and easy meal prep recipes for the week.",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop",
        date: "2025-11-03"
    },
    {
        id: 7,
        title: "Building RESTful APIs with Node.js",
        category: "Tech",
        description: "Learn how to create scalable and efficient REST APIs using Node.js and Express.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
        date: "2025-11-01"
    },
    {
        id: 8,
        title: "Hidden Beaches in Greece",
        category: "Travel",
        description: "Escape the crowds and discover the most beautiful secluded beaches in the Greek islands.",
        image: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=400&h=250&fit=crop",
        date: "2025-10-28"
    },
    {
        id: 9,
        title: "Mastering French Pastries",
        category: "Food",
        description: "Step-by-step guide to creating classic French pastries like croissants and macarons.",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=250&fit=crop",
        date: "2025-10-25"
    },
    {
        id: 10,
        title: "Introduction to Machine Learning",
        category: "Tech",
        description: "Understand the basics of machine learning and how to build your first ML model.",
        image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=250&fit=crop",
        date: "2025-10-22"
    },
    {
        id: 11,
        title: "Road Trip Across Iceland",
        category: "Travel",
        description: "Experience the stunning landscapes of Iceland with this comprehensive road trip itinerary.",
        image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&h=250&fit=crop",
        date: "2025-10-20"
    },
    {
        id: 12,
        title: "The Art of Sushi Making",
        category: "Food",
        description: "Learn the traditional techniques for preparing authentic Japanese sushi at home.",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=250&fit=crop",
        date: "2025-10-18"
    }
];

// Configuration
const POSTS_PER_PAGE = 6;
let currentPage = 1;
let currentCategory = "All";
let searchQuery = "";

// Get DOM elements
const postsContainer = document.getElementById("postsContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

// Filter posts based on category and search
function getFilteredPosts() {
    return blogPosts.filter(post => {
        const matchesCategory = currentCategory === "All" || post.category === currentCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
}

// Create post card HTML
function createPostCard(post) {
    return `
        <div class="post-card">
            <img src="${post.image}" alt="${post.title}" class="post-image">
            <div class="post-content">
                <span class="post-category">${post.category}</span>
                <h3 class="post-title">${post.title}</h3>
                <p class="post-description">${post.description}</p>
                <p class="post-date">${formatDate(post.date)}</p>
            </div>
        </div>
    `;
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Render posts
function renderPosts() {
    const filteredPosts = getFilteredPosts();
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    
    // Adjust current page if needed
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    }
    
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);
    
    // Render posts
    if (postsToShow.length === 0) {
        postsContainer.innerHTML = '<div class="no-results">No posts found matching your criteria.</div>';
    } else {
        postsContainer.innerHTML = postsToShow.map(post => createPostCard(post)).join("");
    }
    
    // Update pagination
    updatePagination(totalPages);
}

// Update pagination controls
function updatePagination(totalPages) {
    const filteredPosts = getFilteredPosts();
    
    if (filteredPosts.length === 0) {
        pageInfo.textContent = "No posts";
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return;
    }
    
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Event listeners for pagination
prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderPosts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

nextBtn.addEventListener("click", () => {
    const filteredPosts = getFilteredPosts();
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    if (currentPage < totalPages) {
        currentPage++;
        renderPosts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Event listeners for category filter
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        
        // Update category and reset page
        currentCategory = button.dataset.category;
        currentPage = 1;
        renderPosts();
    });
});

// Event listener for search
searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    currentPage = 1;
    renderPosts();
});

// Initial render
renderPosts();