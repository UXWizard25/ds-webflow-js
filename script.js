document.addEventListener('DOMContentLoaded', function() {
    // Automatisches Publikationsdatum
    const lastModified = new Date(document.lastModified);
    const now = new Date();
    const diffInSeconds = Math.floor((now - lastModified) / 1000);
    let timeAgo;

    if (diffInSeconds < 60) {
        timeAgo = "updated 1 minute ago";
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        timeAgo = `updated ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        timeAgo = `updated ${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
        const days = Math.floor(diffInSeconds / 86400);
        timeAgo = `updated ${days} day${days > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 31536000) {
        const months = Math.floor(diffInSeconds / 2592000);
        timeAgo = `updated ${months} month${months > 1 ? 's' : ''} ago`;
    } else {
        const years = Math.floor(diffInSeconds / 31536000);
        timeAgo = `updated ${years} year${years > 1 ? 's' : ''} ago`;
    }

    document.getElementById('last-published-date').textContent = timeAgo;
});

// Inhaltsverzeichnis (ToC) generieren
document.addEventListener("DOMContentLoaded", function () {
    const headings = document.querySelectorAll('.main-content h2');
    const tocContainer = document.querySelector('.toc-container');
    
    if (headings.length && tocContainer) {
        const tocList = document.createElement('ul');
        tocList.classList.add('toc-list');

        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.setAttribute('id', id);

            const listItem = document.createElement('li');
            listItem.classList.add('toc-item');

            const link = document.createElement('a');
            link.setAttribute('href', `#${id}`);
            link.classList.add('toc-link');
            link.textContent = heading.textContent;

            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });

        tocContainer.appendChild(tocList);
    }
});

// Light-/Darkmode Umschaltung
const toggleContainer = document.getElementById('toggle-container');
toggleContainer.addEventListener('click', () => {
    const body = document.body;
    body.classList.toggle('is-dark');
    localStorage.setItem('theme', body.classList.contains('is-dark') ? 'dark' : 'light');
});

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('is-dark');
    }
});

// Automatische Link-Kopierfunktion
function createIdFromText(text) {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.zwischenueberschrift-container').forEach(container => {
        const headingText = container.querySelector('h2');
        const copyIcon = container.querySelector('.copy-icon');
        if (headingText) {
            const id = createIdFromText(headingText.textContent || headingText.innerText);
            container.id = id;
            if (copyIcon) {
                copyIcon.addEventListener('click', () => {
                    const link = `${window.location.href.split("#")[0]}#${id}`;
                    navigator.clipboard.writeText(link).then(() => {
                        console.log("Link kopiert: " + link);
                    });
                });
            }
        }
    });
});

// Codeblock Link-Kopierfunktion
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        let copyIcon = button.querySelector('.icon_copy');
        let checkmarkIcon = button.querySelector('.icon_checkmark');

        copyIcon.style.display = 'none';
        checkmarkIcon.style.display = 'block';
        checkmarkIcon.classList.add('fade-out');

        setTimeout(() => {
            checkmarkIcon.classList.remove('fade-out');
            checkmarkIcon.style.display = 'none';
            copyIcon.style.display = 'block';
        }, 1000);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.code_copy').forEach(button => {
        button.addEventListener('click', function() {
            let codeContainer = this.closest('.code_container');
            let codeElement = codeContainer.querySelector('pre code').cloneNode(true);
            codeElement.querySelectorAll('.linenumber').forEach(comment => {
                comment.textContent = '';
            });
            copyToClipboard(codeElement.textContent, this);
        });
    });
});
