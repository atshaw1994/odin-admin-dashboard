const notificationBtn = document.getElementById('btn-notifications');
const new_btn = document.querySelector('#btn-new');
const upload_btn = document.querySelector('#btn-upload');
const share_btn = document.querySelector('#btn-share');
const project_btns = document.querySelectorAll('.project-buttons');
const visibilityIcons = document.querySelectorAll('.project-btn.material-icons-outlined:nth-child(2)');

let notificationsOn = true;

notificationBtn.addEventListener('click', () => {
    notificationsOn = !notificationsOn;
    if (notificationsOn) {
        notificationBtn.querySelector('.material-icons-outlined').textContent = 'notifications_active';
    } else {
        notificationBtn.querySelector('.material-icons-outlined').textContent = 'notifications_off';
    }
});

visibilityIcons.forEach(icon => {
    // Initialize unread state
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