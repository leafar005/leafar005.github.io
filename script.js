document.addEventListener('DOMContentLoaded', () => {
    const slotContainer = document.getElementById('slot-container');
    const viewerIcon = document.getElementById('viewer-icon');
    const descTitle = document.getElementById('desc-title');
    const descText = document.getElementById('desc-text');
    const descLink = document.getElementById('desc-link');
    
    // --- CONFIGURE YOUR PROJECTS HERE ---
    // You can add or remove projects from this list. 
    // The UI will automatically generate the slots.
    const projects = [
        {
            title: "GAME RECOMMENDER",
            icon: "GR",
            desc: "ENTERTAINMENT SELECTION MATRIX\n\nAlgorithmic analysis of user preferences to suggest optimal simulation experiences.\n\nSTATUS: SLOW SERVER (80-100 seconds wait needed for the first request",
            url: "https://leafar005.github.io/game_recommender/"                                                                                                  
        },
        {
            title: "QUIZ ACL",
            icon: "QZ",
            desc: "DISPOSABLE KNOWLEDGE TESTER\n\nA single-use, short-range knowledge testing application.\n\nFocuses on Quality Assurance.\n\nSTATUS: ONLINE",
            url: "https://leafar005.github.io/Quiz-ACL/"
        },
        {
            title: "PROJECT_03",
            icon: "P3",
            desc: "UNDEFINED MODULE\n\nMemory sector unallocated. Awaiting data insertion.\n\nSTATUS: OFFLINE",
            url: "#"
        }
    ];

    const TOTAL_SLOTS = 5; // Total boxes to show in inventory
    
    // Render slots
    for (let i = 0; i < TOTAL_SLOTS; i++) {
        const slot = document.createElement('a');
        const project = projects[i];
        
        if (project) {
            // It's a real project
            slot.className = 'slot item-slot';
            slot.href = project.url; 
            slot.innerHTML = `
                <div class="slot-title">${project.title}</div>
                <div class="slot-content">
                    <div class="slot-icon">${project.icon}</div>
                </div>
                <div class="slot-count">1</div>
            `;
            
            // Handle hover to update UI
            slot.addEventListener('mouseenter', () => {
                // Remove active class from all slots
                document.querySelectorAll('.slot').forEach(s => s.classList.remove('active'));
                // Add active class to hovered slot
                slot.classList.add('active');
                
                // Update Central Viewer and Right Panel
                viewerIcon.textContent = project.icon;
                
                // Add a glitch effect to text when changing
                glitchText(descTitle, project.title);
                descText.textContent = project.desc;
                
                if (project.url && project.url !== "#") {
                    descLink.style.display = 'inline-block';
                    descLink.href = project.url;
                } else {
                    descLink.style.display = 'none';
                }
            });
            
        } else {
            // It's an empty slot
            slot.className = 'slot empty';
            slot.innerHTML = `
                <div class="slot-title">EMPTY SLOT</div>
                <div class="slot-content"></div>
            `;
        }
        
        slotContainer.appendChild(slot);
    }
    
    // Select the first item by default on load
    const firstItem = document.querySelector('.item-slot');
    if (firstItem) {
        firstItem.dispatchEvent(new Event('mouseenter'));
    }

    // Function to create a small text glitch effect
    function glitchText(element, newText) {
        element.textContent = newText;
        element.style.textShadow = '2px 0 red, -2px 0 cyan';
        
        setTimeout(() => {
            element.style.textShadow = 'none';
        }, 150);
    }
});
