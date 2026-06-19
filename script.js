/**
 * ── CONFIGURACION ──
 * 
 * 
 * - title:   El título del proyecto.
 * - icon:    Abreviatura de 2 letras que aparecerá en el recuadro si no hay imagen ni modelo 3D.
 * - image:   Ruta de la imagen plana.
 * - model:   Ruta del archivo 3D (.glb).
 * - desc:    Texto del reporte de diagnóstico (soporta saltos de línea con \n).
 * - demoUrl: Enlace a la web o demo interactiva (aparece el botón INSPECT).
 * - codeUrl: Enlace al repositorio de código fuente (aparece el botón USE / CODE).
 */

const projects = [
    {
        id: 'p1',
        title: "GAME RECOMMENDER",
        icon: "GR",
        image: "",
        model: "resources/controller.glb",
        desc: "MODULE: ENTERTAINMENT SELECTION MATRIX\n\n[DIAGNOSTIC LOG]\nAlgorithmic analysis of user preferences to suggest optimal simulation experiences.\n\nSTATUS: SLOW SERVER\nNOTE: 80-100 seconds wait needed for the first request.",
        demoUrl: "https://leafar005.github.io/game_recommender/",
        codeUrl: "https://github.com/leafar005/game_recommender"
    },
    {
        id: 'p2',
        title: "QUIZ ACL",
        icon: "QZ",
        image: "",
        model: "resources/graph.glb",
        desc: "MODULE: DISPOSABLE KNOWLEDGE TESTER\n\n[DIAGNOSTIC LOG]\nA single-use, short-range knowledge testing application. Focuses on Quality Assurance.\n\nSTATUS: ONLINE",
        demoUrl: "https://leafar005.github.io/Quiz-ACL/",
        codeUrl: "https://github.com/leafar005/Quiz-ACL"
    },
        {
        id: 'p4',
        title: "PROJECT_04",
        icon: "P4",
        image: "",
        model: "",
        desc: "MODULE: UNDEFINED\n\n[DIAGNOSTIC LOG]\nMemory sector unallocated. Awaiting data insertion.\n\nSTATUS: OFFLINE",
        demoUrl: "",
        codeUrl: ""
    },
    {
        id: 'p4',
        title: "PROJECT_04",
        icon: "P4",
        image: "",
        model: "",
        desc: "MODULE: UNDEFINED\n\n[DIAGNOSTIC LOG]\nMemory sector unallocated. Awaiting data insertion.\n\nSTATUS: OFFLINE",
        demoUrl: "",
        codeUrl: ""
    }
];

const TOTAL_SLOTS = 5; // Número total de recuadros en el inventario. Se rellenarán con "EMPTY".


document.addEventListener('DOMContentLoaded', () => {
    // ── BOOT SEQUENCE LOGIC ──
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    
    if (bootScreen && bootText) {
        const bootLines = [
            "BIOS DATE 08/21/2084 14:22:15 VER 1.05",
            "CPU: AEON PROCESSOR 800 MHz",
            "Memory Test:  4096K OK",
            "",
            "Initializing Replika OS...",
            "Loading Kernel modules............... [OK]",
            "Mounting File Systems................ [OK]",
            "Checking LSTR Neural Pathways........ [OK]",
            "Establishing Link with Penrose-512... [OK]",
            "",
            "SYSTEM READY."
        ];

        let lineIdx = 0;
        
        function typeBootLine() {
            if (lineIdx < bootLines.length) {
                bootText.textContent += bootLines[lineIdx] + "\n";
                lineIdx++;
                setTimeout(typeBootLine, Math.random() * 100 + 50); // Velocidad variable retro
            } else {
                // Finalizó, esperar 1 segundo y quitar la pantalla automáticamente
                setTimeout(endBoot, 1000);
            }
        }
        
        // Iniciar secuencia de boot tras un pequeño retraso
        setTimeout(typeBootLine, 400);

        function endBoot() {
            bootScreen.style.opacity = '0';
            setTimeout(() => bootScreen.remove(), 500);
        }
    }

    // ── MAIN UI LOGIC ──
    const slotContainer = document.getElementById('slot-container');
    const viewerContainer = document.getElementById('viewer-container');
    const viewerText = document.getElementById('viewer-text');
    const viewerImage = document.getElementById('viewer-image');
    const viewerModel = document.getElementById('viewer-model');
    
    const descTitle = document.getElementById('desc-title');
    const descText = document.getElementById('desc-text');
    const btnInspect = document.getElementById('btn-inspect');
    const btnUse = document.getElementById('btn-use');

    const modalOverlay = document.getElementById('data-modal');
    const modTitle = document.getElementById('mod-title');
    const modDesc = document.getElementById('mod-desc');
    const modBtnInspect = document.getElementById('mod-btn-inspect');
    const modBtnUse = document.getElementById('mod-btn-use');
    const closeModalBtn = document.getElementById('close-modal');

    let currentProject = null;

    // Inicializar Slots
    for (let i = 0; i < TOTAL_SLOTS; i++) {
        const slot = document.createElement('div');
        const project = projects[i];
        
        if (project) {
            slot.className = 'slot item-slot';
            // El título del proyecto es un enlace que va directo a su URL
            const targetUrl = project.demoUrl && project.demoUrl !== '#' ? project.demoUrl : (project.codeUrl || '#');
            
            slot.innerHTML = `
                <a href="${targetUrl}" target="_blank" class="slot-title">${project.title}</a>
                <div class="slot-content">
                    <div class="slot-icon">${project.icon}</div>
                </div>
                <div class="slot-count">01</div>
            `;
            
            // Al tocar el cuerpo del slot (icono), se selecciona el proyecto para verlo en el centro
            const slotContent = slot.querySelector('.slot-content');
            slotContent.addEventListener('mouseenter', () => activateSlot(slot, project));
            slotContent.addEventListener('click', () => activateSlot(slot, project));
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
        currentProject = project;
        document.querySelectorAll('.slot').forEach(s => s.classList.remove('active'));
        element.classList.add('active');
        
        // Actualizar Visor Central
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
        
        // Actualizar Panel Derecho (Desktop)
        descTitle.textContent = project.title;
        glitchElement(descTitle);
        typeWriterEffect(descText, project.desc, 15);
        
        const hasDemo = project.demoUrl && project.demoUrl !== '#' && project.demoUrl !== '';
        const hasCode = project.codeUrl && project.codeUrl !== '#' && project.codeUrl !== '';
        
        btnInspect.style.display = hasDemo ? 'block' : 'none';
        if(hasDemo) btnInspect.href = project.demoUrl;
        
        btnUse.style.display = hasCode ? 'block' : 'none';
        if(hasCode) btnUse.href = project.codeUrl;
    }

    // Comportamiento del Visor Central al hacer clic
    viewerContainer.onclick = () => {
        if (!currentProject) return;
        // Abrir la Terminal de Datos (Modal) de forma universal para todos los tamaños
        openModal(currentProject);
    };
    viewerContainer.style.cursor = 'pointer';

    // Modal Logic
    function openModal(proj) {
        modTitle.textContent = proj.title;
        modDesc.textContent = proj.desc;
        
        const hasDemo = proj.demoUrl && proj.demoUrl !== '#' && proj.demoUrl !== '';
        const hasCode = proj.codeUrl && proj.codeUrl !== '#' && proj.codeUrl !== '';

        modBtnInspect.style.display = hasDemo ? 'block' : 'none';
        if(hasDemo) modBtnInspect.href = proj.demoUrl;

        modBtnUse.style.display = hasCode ? 'block' : 'none';
        if(hasCode) modBtnUse.href = proj.codeUrl;

        modalOverlay.classList.add('active');
    }

    closeModalBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });

    // Utilidades Gráficas
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
    
    // Auto-seleccionar primer elemento
    const firstItem = document.querySelector('.item-slot .slot-content');
    if (firstItem) firstItem.dispatchEvent(new Event('mouseenter'));
});
