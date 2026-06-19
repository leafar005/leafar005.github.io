/**
 * CONFIGURACIÓN
 * 
 * - title:   El título del proyecto.
 * - icon:    Abreviatura de 2 letras que aparecerá en el recuadro si no hay imagen.
 * - image:   Ruta de la imagen 2D.
 * - model:   Ruta del archivo 3D (.glb). Tiene prioridad sobre la imagen.
 * - desc:    Texto que aparecerá a la derecha simulando el reporte de diagnóstico.
 * - demoUrl: Enlace a la web o demo interactiva (aparece botón INSPECT).
 * - codeUrl: Enlace al código fuente (aparece botón USE).
 */

const portfolioProjects = [
    {
        title: "GAME RECOMMENDER",
        icon: "GR",
        image: "resources/mando.jpg",
        model: "resources/controller.glb",
        desc: "MODULE: ENTERTAINMENT SELECTION MATRIX\n\n[DIAGNOSTIC LOG]\nAlgorithmic analysis of user preferences to suggest optimal simulation experiences.\n\nSTATUS: SLOW SERVER\nNOTE: 80-100 seconds wait needed for the first request.",
        demoUrl: "https://leafar005.github.io/game_recommender/",
        codeUrl: "https://github.com/leafar005/game_recommender"
    },
    {
        title: "QUIZ ACL",
        icon: "QZ",
        image: "resources/formulario.jpg",
        model: "resources/graph.glb", 
        desc: "MODULE: DISPOSABLE KNOWLEDGE TESTER\n\n[DIAGNOSTIC LOG]\nA single-use, short-range knowledge testing application. Focuses on Quality Assurance.\n\nSTATUS: ONLINE",
        demoUrl: "https://leafar005.github.io/Quiz-ACL/",
        codeUrl: "https://github.com/leafar005/Quiz-ACL"
    },
        {
        title: "PROJECT_03",
        icon: "P3",
        image: "",
        model: "",
        desc: "MODULE: UNDEFINED\n\n[DIAGNOSTIC LOG]\nMemory sector unallocated. Awaiting data insertion.\n\nSTATUS: OFFLINE",
        demoUrl: "",
        codeUrl: ""
    },
    {
        title: "PROJECT_04",
        icon: "P4",
        image: "",
        model: "",
        desc: "MODULE: UNDEFINED\n\n[DIAGNOSTIC LOG]\nMemory sector unallocated. Awaiting data insertion.\n\nSTATUS: OFFLINE",
        demoUrl: "",
        codeUrl: ""
    }
];

const TOTAL_SLOTS = 5;


// BOOT SEQUENCE
const bootScreen = document.getElementById('boot');
const bootTextContainer = document.getElementById('boot-text');
const bootBarFill = document.getElementById('boot-bar-fill');

const bootMessages = [
    "INITIALIZING BIOS...",
    "MEMORY CHECK: 512MB OK",
    "LOADING KERNEL...",
    "MOUNTING VFS...",
    "STARTING SIGNALIS OS v1.0.2",
    "ESTABLISHING NEURAL LINK...",
    "WELCOME."
];

let bootIndex = 0;
function runBoot() {
    if (bootIndex < bootMessages.length) {
        const span = document.createElement('span');
        span.textContent = bootMessages[bootIndex];
        bootTextContainer.appendChild(span);
        
        const progress = ((bootIndex + 1) / bootMessages.length) * 100;
        bootBarFill.style.width = `${progress}%`;
        
        bootIndex++;
        setTimeout(runBoot, 150 + Math.random() * 250);
    } else {
        setTimeout(() => {
            bootScreen.classList.add('fade');
            setTimeout(() => bootScreen.style.display = 'none', 600);
        }, 400);
    }
}
runBoot();

document.addEventListener('DOMContentLoaded', () => {
    const slotContainer = document.getElementById('slot-container');
    const viewerContainer = document.getElementById('viewer-container');
    const viewerText = document.getElementById('viewer-text');
    const viewerImage = document.getElementById('viewer-image');
    const viewerModel = document.getElementById('viewer-model');
    const descTitle = document.getElementById('desc-title');
    const descText = document.getElementById('desc-text');
    const btnInspect = document.getElementById('btn-inspect');
    const btnUse = document.getElementById('btn-use');
    
    // Initialize Slots
    for (let i = 0; i < TOTAL_SLOTS; i++) {
        const slot = document.createElement('div');
        const project = portfolioProjects[i];
        
        if (project) {
            slot.className = 'slot item-slot';
            slot.innerHTML = `
                <div class="slot-title">${project.title}</div>
                <div class="slot-content">
                    <div class="slot-icon">${project.icon}</div>
                </div>
                <div class="slot-count">01</div>
            `;
            
            // Interaction
            slot.addEventListener('mouseenter', () => activateSlot(slot, project));
            slot.addEventListener('click', () => activateSlot(slot, project));
        } else {
            slot.className = 'slot empty';
            slot.innerHTML = `
                <div class="slot-title">EMPTY</div>
                <div class="slot-content"></div>
            `;
        }
        slotContainer.appendChild(slot);
    }
    
    function activateSlot(element, project) {
        // Reset active state
        document.querySelectorAll('.slot').forEach(s => s.classList.remove('active'));
        element.classList.add('active');
        
        // Update Viewer
        viewerText.style.display = 'none';
        viewerImage.style.display = 'none';
        viewerModel.style.display = 'none';
        
        if (project.model && project.model.trim() !== '') {
            viewerModel.src = project.model;
            viewerModel.style.display = 'block';
        } else if (project.image && project.image.trim() !== '') {
            viewerImage.src = project.image;
            viewerImage.style.display = 'block';
        } else {
            viewerText.textContent = project.icon;
            viewerText.style.display = 'block';
        }
        glitchElement(viewerContainer);
        
        // Update Right Panel
        descTitle.textContent = project.title;
        glitchElement(descTitle);
        
        // Typewriter effect for description
        typeWriterEffect(descText, project.desc, 15);
        
        const hasDemo = project.demoUrl && project.demoUrl !== '#' && project.demoUrl !== '';
        const hasCode = project.codeUrl && project.codeUrl !== '#' && project.codeUrl !== '';
        
        btnInspect.onclick = () => { if(hasDemo) window.open(project.demoUrl, '_blank'); };
        btnUse.onclick = () => { if(hasCode) window.open(project.codeUrl, '_blank'); };
        
        // Clickable viewer
        viewerContainer.onclick = () => { if(hasDemo) window.open(project.demoUrl, '_blank'); };
        viewerContainer.style.cursor = hasDemo ? 'pointer' : 'crosshair';
        
        // Buttons
        if (hasDemo) {
            btnInspect.style.display = 'block';
            btnInspect.href = project.demoUrl;
        } else {
            btnInspect.style.display = 'none';
        }
        
        if (hasCode) {
            btnUse.style.display = 'block';
            btnUse.href = project.codeUrl;
        } else {
            btnUse.style.display = 'none';
        }
    }

    function glitchElement(el) {
        el.classList.add('text-glitch');
        setTimeout(() => el.classList.remove('text-glitch'), 300);
    }

    let typeWriterTimeout;
    function typeWriterEffect(element, text, speed) {
        clearTimeout(typeWriterTimeout);
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                typeWriterTimeout = setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Auto-select first item
    const firstItem = document.querySelector('.item-slot');
    if (firstItem) {
        firstItem.dispatchEvent(new Event('mouseenter'));
    }
});
