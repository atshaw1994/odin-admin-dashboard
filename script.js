const notificationBtn = document.getElementById('btn-notifications');
const new_btn = document.querySelector('#btn-new');
const upload_btn = document.querySelector('#btn-upload');
const share_btn = document.querySelector('#btn-share');
const project_btns = document.querySelectorAll('.project-buttons');
const visibility_btns = document.querySelectorAll('.project-btn.material-icons-outlined:nth-child(2)');
const favorite_btns = document.querySelectorAll('.project-btn.material-icons-outlined:nth-child(1)');
const announcement_cards = document.querySelectorAll('.announcement-card');
const project_cards = document.querySelectorAll('.project-card');
const searchbar = document.querySelector('#searchbar');

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
        const card = icon.closest('.project-card');
        // Toggle unread state
        card.dataset.unread = card.dataset.unread === "true" ? "false" : "true";
        if (card.dataset.unread == "true") {
            card.classList.add("project-card-unread");
        }
        else {
            card.classList.remove("project-card-unread");
        }
    });
});

favorite_btns.forEach(icon => {
    icon.addEventListener('click', () => {
        const card = icon.closest('.project-card');
        // Toggle isFavorite state
        card.dataset.isFavorite = card.dataset.isFavorite === "true" ? "false" : "true";
        if (card.dataset.isFavorite == "true") {
            card.classList.add("project-card-favorite");
            icon.style.color = "#ffcc00"
        }
        else {
            card.classList.remove("project-card-favorite");
            icon.style.color = "black"
        }
    });
});

project_cards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.project-btn') && card.dataset.unread == "true") {
            card.classList.remove("project-card-unread");
            card.dataset.unread = "false";
        }
    });
});

announcement_cards.forEach(card => {
    card.addEventListener('click', () => {
        if (card.dataset.unread == "true") {
            card.classList.remove("announcement-card-unread");
            card.dataset.unread = "false";
        }
    });
});

searchbar.addEventListener('input', () => {
    const searchTerm = searchbar.value.toLowerCase();
    project_cards.forEach(card => {
        const title = card.querySelector('.project-content').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
});
