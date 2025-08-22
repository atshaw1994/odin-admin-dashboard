const notificationBtn = document.getElementById('btn-notifications');
const new_btn = document.querySelector('#btn-new');
const upload_btn = document.querySelector('#btn-upload');
const share_btn = document.querySelector('#btn-share');

const contentContainer = document.querySelector('.content-container');

const cards = document.querySelectorAll('.card');
const card_btns = document.querySelectorAll('.card-buttons');
const visibility_btns = document.querySelectorAll('.card-btn.material-icons-outlined:nth-child(2)');
const favorite_btns = document.querySelectorAll('.card-btn.material-icons-outlined:nth-child(1)');

const searchbar = document.querySelector('#searchbar');
const searchbar_clear_icon = document.querySelector('.searchbar-clear');

const noResultsMsg = document.querySelector('#no-results-message');

let notificationsOn = true;

notificationBtn.addEventListener('click', () => {
    notificationsOn = !notificationsOn;
    if (notificationsOn) {
        notificationBtn.querySelector('.material-icons-outlined').textContent = 'notifications_active';
    } else {
        notificationBtn.querySelector('.material-icons-outlined').textContent = 'notifications_off';
    }
});

visibility_btns.forEach(icon => {
    icon.addEventListener('click', () => {
        const card = icon.closest('.card');
        // Toggle unread state
        card.dataset.unread = card.dataset.unread === "true" ? "false" : "true";
        if (card.dataset.unread == "true") {
            card.classList.add("card-unread");
        }
        else {
            card.classList.remove("card-unread");
        }
    });
});

favorite_btns.forEach(icon => {
    icon.addEventListener('click', () => {
        const card = icon.closest('.card');
        // Toggle isFavorite state
        card.dataset.isFavorite = card.dataset.isFavorite === "true" ? "false" : "true";
        if (card.dataset.isFavorite == "true") {
            card.classList.add("card-favorite");
            icon.style.color = "#ffcc00"
        }
        else {
            card.classList.remove("card-favorite");
            icon.style.color = "black"
        }
    });
});

cards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.card-btn') && card.dataset.unread == "true") {
            card.classList.remove("card-unread");
            card.dataset.unread = "false";
        }
    });
});

function toggleClearIcon() {
    if (searchbar.value.length > 0) {
        searchbar_clear_icon.classList.add('visible');
    } else {
        searchbar_clear_icon.classList.remove('visible');
    }
}

function searchForCard(searchTerm) {
    let anyVisible = false;
    cards.forEach(card => {
        const card_content = card.querySelector('.card-content').textContent.toLowerCase();
        if (card_content.includes(searchTerm)) {
            card.style.display = '';
            anyVisible = true;
        } else {
            card.style.display = 'none';
        }
    });
    return anyVisible;
}

searchbar.addEventListener('input', () => {
    const searchTerm = searchbar.value.toLowerCase();
    toggleClearIcon();
    let cardFound = searchForCard(searchTerm);
    if (!cardFound) {
        Array.from(contentContainer.children).forEach(child => {
            child.style.display = 'none';
        });
        noResultsMsg.style.opacity = '1';
    } else {
        Array.from(contentContainer.children).forEach(child => {
            child.style.display = '';
        });
        noResultsMsg.style.opacity = '0';
    }
});

searchbar_clear_icon.addEventListener('click', () => {
    searchbar.value = '';
    toggleClearIcon();
    searchbar.focus();
    searchbar.dispatchEvent(new Event('input'));
});
