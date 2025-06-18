// Données des AE
const salesData = [
    {
        "id": 1,
        "nom": "Matthieu",
        "taille_deal": "1000+",
        "taille_deal_min": 1000,
        "taille_deal_max": 999999,
        "langues": ["FR", "EN"],
        "nombre_demos": 3,
        "points_specifiques": ""
    },
    {
        "id": 2,
        "nom": "Philippe",
        "taille_deal": "1000+",
        "taille_deal_min": 1000,
        "taille_deal_max": 999999,
        "langues": ["FR", "EN"],
        "nombre_demos": 3,
        "points_specifiques": ""
    },
    {
        "id": 3,
        "nom": "Martin",
        "taille_deal": "250 à 500+",
        "taille_deal_min": 250,
        "taille_deal_max": 500,
        "langues": ["FR", "EN"],
        "nombre_demos": 8,
        "points_specifiques": ""
    },
    {
        "id": 4,
        "nom": "Sophie",
        "taille_deal": "100 à 500",
        "taille_deal_min": 100,
        "taille_deal_max": 500,
        "langues": ["FR", "EN"],
        "nombre_demos": 8,
        "points_specifiques": ""
    },
    {
        "id": 5,
        "nom": "BK",
        "taille_deal": "100 à 500",
        "taille_deal_min": 100,
        "taille_deal_max": 500,
        "langues": ["FR", "EN"],
        "nombre_demos": 8,
        "points_specifiques": ""
    },
    {
        "id": 6,
        "nom": "Paul G.",
        "taille_deal": "5 à 100",
        "taille_deal_min": 5,
        "taille_deal_max": 100,
        "langues": ["FR", "EN"],
        "nombre_demos": 12,
        "points_specifiques": ""
    },
    {
        "id": 7,
        "nom": "Maria",
        "taille_deal": "5 à 100",
        "taille_deal_min": 5,
        "taille_deal_max": 100,
        "langues": ["FR", "EN", "ES"],
        "nombre_demos": 12,
        "points_specifiques": ""
    },
    {
        "id": 8,
        "nom": "PA",
        "taille_deal": "5 à 100",
        "taille_deal_min": 5,
        "taille_deal_max": 100,
        "langues": ["FR", "EN"],
        "nombre_demos": 12,
        "points_specifiques": ""
    },
    {
        "id": 9,
        "nom": "Christabel",
        "taille_deal": "1 à 100",
        "taille_deal_min": 1,
        "taille_deal_max": 100,
        "langues": ["EN"],
        "nombre_demos": 12,
        "points_specifiques": "Priorité deals EN (1-200)"
    },
    {
        "id": 10,
        "nom": "Julien",
        "taille_deal": "5 à 50",
        "taille_deal_min": 5,
        "taille_deal_max": 50,
        "langues": ["FR", "EN", "NL"],
        "nombre_demos": 12,
        "points_specifiques": "Priorité deals NL"
    },
    {
        "id": 11,
        "nom": "Louis",
        "taille_deal": "1 à 5",
        "taille_deal_min": 1,
        "taille_deal_max": 5,
        "langues": ["FR", "EN"],
        "nombre_demos": 12,
        "points_specifiques": "Temporaire"
    },
    {
        "id": 12,
        "nom": "Faustine",
        "taille_deal": "1 à 10",
        "taille_deal_min": 1,
        "taille_deal_max": 10,
        "langues": ["FR", "EN"],
        "nombre_demos": 5,
        "points_specifiques": "Matin"
    },
    {
        "id": 13,
        "nom": "Paul",
        "taille_deal": "1 à 5",
        "taille_deal_min": 1,
        "taille_deal_max": 5,
        "langues": ["FR", "EN"],
        "nombre_demos": 5,
        "points_specifiques": "Après-midi"
    },
    {
        "id": 14,
        "nom": "Clément",
        "taille_deal": "1 à 5",
        "taille_deal_min": 1,
        "taille_deal_max": 5,
        "langues": ["FR", "EN"],
        "nombre_demos": 5,
        "points_specifiques": "Après-midi"
    }
];

// Variables globales
let filteredData = [...salesData];
let currentSort = { column: null, direction: 'asc' };

// Éléments DOM
const tableBody = document.getElementById('tableBody');
const dealSizeFilter = document.getElementById('dealSizeFilter');
const nameSearch = document.getElementById('nameSearch');
const resultsCount = document.getElementById('resultsCount');
const resetFilters = document.getElementById('resetFilters');
const recommendation = document.getElementById('recommendation');
const recommendationText = document.getElementById('recommendationText');
const noResults = document.getElementById('noResults');

// Checkboxes pour les langues
const langCheckboxes = {
    FR: document.getElementById('lang-FR'),
    EN: document.getElementById('lang-EN'),
    ES: document.getElementById('lang-ES'),
    NL: document.getElementById('lang-NL')
};

// Fonction pour déterminer la catégorie d'un deal
function getDealCategory(dealMin, dealMax) {
    if (dealMax <= 5) return 'small';
    if (dealMax <= 100) return 'medium';
    if (dealMax <= 500) return 'large';
    return 'xlarge';
}

// Fonction pour créer les badges de langues
function createLanguageBadges(langues) {
    return langues.map(lang => 
        `<span class="language-badge">${lang}</span>`
    ).join('');
}

// Fonction pour créer les badges des points spécifiques
function createSpecialBadges(pointsSpecifiques) {
    if (!pointsSpecifiques) return '';
    
    let badgeClass = 'special-badge';
    
    if (pointsSpecifiques.toLowerCase().includes('temporaire')) {
        badgeClass += ' special-badge--temporaire';
    } else if (pointsSpecifiques.toLowerCase().includes('matin')) {
        badgeClass += ' special-badge--matin';
    } else if (pointsSpecifiques.toLowerCase().includes('après-midi')) {
        badgeClass += ' special-badge--apres-midi';
    } else if (pointsSpecifiques.toLowerCase().includes('priorité')) {
        badgeClass += ' special-badge--priorite';
    }
    
    return `<span class="${badgeClass}">${pointsSpecifiques}</span>`;
}

// Fonction pour surligner le texte de recherche
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Fonction pour rendre le tableau
function renderTable(data) {
    const searchTerm = nameSearch.value.toLowerCase();
    
    if (data.length === 0) {
        tableBody.innerHTML = '';
        noResults.classList.remove('hidden');
        recommendation.classList.add('hidden');
        return;
    }
    
    noResults.classList.add('hidden');
    
    const rows = data.map(ae => {
        const category = getDealCategory(ae.taille_deal_min, ae.taille_deal_max);
        const highlightedName = highlightSearchTerm(ae.nom, searchTerm);
        
        return `
            <tr data-deal-category="${category}" data-ae-id="${ae.id}">
                <td>${highlightedName}</td>
                <td>${ae.taille_deal}</td>
                <td>${createLanguageBadges(ae.langues)}</td>
                <td>${ae.nombre_demos}</td>
                <td>${createSpecialBadges(ae.points_specifiques)}</td>
            </tr>
        `;
    }).join('');
    
    tableBody.innerHTML = rows;
    
    // Animation fade-in
    tableBody.classList.add('fade-in');
    setTimeout(() => tableBody.classList.remove('fade-in'), 300);
}

// Fonction pour filtrer les données
function filterData() {
    const dealSize = dealSizeFilter.value;
    const searchTerm = nameSearch.value.toLowerCase();
    const selectedLanguages = Object.keys(langCheckboxes).filter(lang => 
        langCheckboxes[lang].checked
    );
    
    filteredData = salesData.filter(ae => {
        // Filtre par taille de deal
        let dealMatch = true;
        if (dealSize) {
            switch (dealSize) {
                case '1-5':
                    dealMatch = ae.taille_deal_max <= 5;
                    break;
                case '5-100':
                    dealMatch = ae.taille_deal_min >= 5 && ae.taille_deal_max <= 100;
                    break;
                case '100-500':
                    dealMatch = ae.taille_deal_min >= 100 && ae.taille_deal_max <= 500;
                    break;
                case '500+':
                    dealMatch = ae.taille_deal_min >= 500;
                    break;
            }
        }
        
        // Filtre par nom
        const nameMatch = ae.nom.toLowerCase().includes(searchTerm);
        
        // Filtre par langues
        let langMatch = true;
        if (selectedLanguages.length > 0) {
            langMatch = selectedLanguages.some(lang => ae.langues.includes(lang));
        }
        
        return dealMatch && nameMatch && langMatch;
    });
    
    // Appliquer le tri actuel
    if (currentSort.column) {
        sortData(currentSort.column, currentSort.direction);
    }
    
    renderTable(filteredData);
    updateResultsCount();
    generateRecommendation();
}

// Fonction pour trier les données
function sortData(column, direction) {
    filteredData.sort((a, b) => {
        let aVal, bVal;
        
        switch (column) {
            case 'nom':
                aVal = a.nom.toLowerCase();
                bVal = b.nom.toLowerCase();
                break;
            case 'taille_deal':
                aVal = a.taille_deal_min;
                bVal = b.taille_deal_min;
                break;
            case 'langues':
                aVal = a.langues.length;
                bVal = b.langues.length;
                break;
            case 'nombre_demos':
                aVal = a.nombre_demos;
                bVal = b.nombre_demos;
                break;
            default:
                return 0;
        }
        
        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
        return 0;
    });
}

// Fonction pour mettre à jour le compteur de résultats
function updateResultsCount() {
    const count = filteredData.length;
    resultsCount.textContent = `${count} résultat${count > 1 ? 's' : ''}`;
}

// Fonction pour générer une recommandation
function generateRecommendation() {
    const dealSize = dealSizeFilter.value;
    const selectedLanguages = Object.keys(langCheckboxes).filter(lang => 
        langCheckboxes[lang].checked
    );
    
    if (!dealSize && selectedLanguages.length === 0) {
        recommendation.classList.add('hidden');
        return;
    }
    
    // Logique de recommandation simple
    let bestAE = null;
    let recommendationMessage = '';
    
    if (filteredData.length > 0) {
        // Trouver l'AE avec le plus de démos dans la catégorie
        bestAE = filteredData.reduce((best, current) => {
            if (current.nombre_demos > best.nombre_demos) return current;
            if (current.nombre_demos === best.nombre_demos && current.langues.length > best.langues.length) return current;
            return best;
        });
        
        recommendationMessage = `Nous recommandons <strong>${bestAE.nom}</strong> qui a ${bestAE.nombre_demos} démo${bestAE.nombre_demos > 1 ? 's' : ''} et parle ${bestAE.langues.join(', ')}.`;
        
        if (bestAE.points_specifiques) {
            recommendationMessage += ` Point important : ${bestAE.points_specifiques}.`;
        }
    } else {
        recommendationMessage = 'Aucun AE ne correspond exactement à vos critères. Essayez d\'élargir les filtres.';
    }
    
    recommendationText.innerHTML = recommendationMessage;
    recommendation.classList.remove('hidden');
}

// Fonction pour réinitialiser les filtres
function resetAllFilters() {
    dealSizeFilter.value = '';
    nameSearch.value = '';
    Object.values(langCheckboxes).forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Réinitialiser le tri
    currentSort = { column: null, direction: 'asc' };
    document.querySelectorAll('.sortable').forEach(th => {
        th.classList.remove('asc', 'desc');
    });
    
    filteredData = [...salesData];
    renderTable(filteredData);
    updateResultsCount();
    recommendation.classList.add('hidden');
}

// Gestionnaire d'événements pour le tri des colonnes
function setupSortHandlers() {
    document.querySelectorAll('.sortable').forEach(th => {
        th.addEventListener('click', () => {
            const column = th.dataset.column;
            let direction = 'asc';
            
            // Si c'est la même colonne, inverser la direction
            if (currentSort.column === column) {
                direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
            }
            
            // Mettre à jour l'interface
            document.querySelectorAll('.sortable').forEach(header => {
                header.classList.remove('asc', 'desc');
            });
            th.classList.add(direction);
            
            // Sauvegarder l'état du tri
            currentSort = { column, direction };
            
            // Trier et afficher
            sortData(column, direction);
            renderTable(filteredData);
        });
    });
}

// Initialisation de l'application
function init() {
    // Rendre le tableau initial
    renderTable(salesData);
    updateResultsCount();
    
    // Configurer les gestionnaires d'événements
    setupSortHandlers();
    
    // Filtres
    dealSizeFilter.addEventListener('change', filterData);
    nameSearch.addEventListener('input', filterData);
    Object.values(langCheckboxes).forEach(checkbox => {
        checkbox.addEventListener('change', filterData);
    });
    
    // Bouton reset
    resetFilters.addEventListener('click', resetAllFilters);
    
    // Débounce pour la recherche par nom
    let searchTimeout;
    nameSearch.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterData, 300);
    });
}

// Démarrer l'application quand le DOM est chargé
document.addEventListener('DOMContentLoaded', init);
