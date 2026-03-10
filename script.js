document.addEventListener('DOMContentLoaded', () => {
    const ideaGrid = document.getElementById('ideaGrid');
    const ideaForm = document.getElementById('ideaForm');
    const modalOverlay = document.getElementById('modalOverlay');
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');

    let ideas = [
        { id: 1, title: "AI-Powered Task Manager", category: "Tech", desc: "A task manager that uses LLMs to prioritize your day based on deadlines and mood.", likes: 12, liked: false },
        { id: 2, title: "Sustainable Packaging Design", category: "Design", desc: "Eco-friendly packaging that decomposes in 30 days and doubles as plant fertilizer.", likes: 24, liked: false },
        { id: 3, title: "Local Farmers Market App", category: "Product", desc: "Connect local farmers directly with urban consumers for same-day delivery.", likes: 8, liked: false },
        { id: 4, title: "Virtual Reality Workspace", category: "Tech", desc: "An immersive 3D workspace for remote teams to collaborate as if in the same office.", likes: 15, liked: false }
    ];

    function renderIdeas(filter = 'all', search = '') {
        ideaGrid.innerHTML = '';
        
        const filteredIdeas = ideas.filter(idea => {
            const matchesFilter = filter === 'all' || idea.category === filter;
            const matchesSearch = idea.title.toLowerCase().includes(search.toLowerCase()) || 
                                 idea.desc.toLowerCase().includes(search.toLowerCase());
            return matchesFilter && matchesSearch;
        });

        filteredIdeas.forEach((idea, index) => {
            const card = document.createElement('div');
            card.className = 'idea-card';
            card.style.animationDelay = `${index * 0.1}s`;
            
            card.innerHTML = `
                <span class="card-tag tag-${idea.category}">${idea.category}</span>
                <h3>${idea.title}</h3>
                <p>${idea.desc}</p>
                <div class="card-footer">
                    <button class="btn-like ${idea.liked ? 'liked' : ''}" onclick="toggleLike(${idea.id})">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="${idea.liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span>${idea.likes}</span>
                    </button>
                </div>
            `;
            ideaGrid.appendChild(card);
        });
    }

    // Global like function
    window.toggleLike = (id) => {
        const idea = ideas.find(i => i.id === id);
        if (idea) {
            idea.liked = !idea.liked;
            idea.likes += idea.liked ? 1 : -1;
            renderIdeas(document.querySelector('.filter-btn.active').dataset.filter, searchInput.value);
        }
    };

    // Modal Handlers
    openModalBtn.addEventListener('click', () => modalOverlay.style.display = 'flex');
    closeModalBtn.addEventListener('click', () => modalOverlay.style.display = 'none');
    window.addEventListener('click', (e) => { if (e.target === modalOverlay) modalOverlay.style.display = 'none'; });

    // Form Submission
    ideaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newIdea = {
            id: Date.now(),
            title: document.getElementById('ideaTitle').value,
            category: document.getElementById('ideaCategory').value,
            desc: document.getElementById('ideaDesc').value,
            likes: 0,
            liked: false
        };
        ideas.unshift(newIdea);
        ideaForm.reset();
        modalOverlay.style.display = 'none';
        renderIdeas();
    });

    // Filtering
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderIdeas(btn.dataset.filter, searchInput.value);
        });
    });

    // Search
    searchInput.addEventListener('input', (e) => {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        renderIdeas(activeFilter, e.target.value);
    });

    renderIdeas();
});
