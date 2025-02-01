// automatisches Publikationsdatum
  document.addEventListener('DOMContentLoaded', function() {
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


  // toc-generation sidbar rechts
  document.addEventListener("DOMContentLoaded", function () {
    // Alle <h2> im .main-content Container holen
    const headings = document.querySelectorAll('.main-content h2');
    const tocContainer = document.querySelector('.toc-container');

    // Prüfen, ob headings und tocContainer existieren
    if (headings.length && tocContainer) {
      // Liste für die ToC erstellen
      const tocList = document.createElement('ul');
      tocList.classList.add('toc-list'); // Klasse für die Liste hinzufügen

      headings.forEach((heading, index) => {
        // ID für das Heading generieren
        const id = `heading-${index}`;
        heading.setAttribute('id', id);

        // Listeneintrag und Link für die ToC erstellen
        const listItem = document.createElement('li');
        listItem.classList.add('toc-item'); // Klasse für das Listenelement hinzufügen

        const link = document.createElement('a');
        link.setAttribute('href', `#${id}`);
        link.classList.add('toc-link'); // Klasse für den Link hinzufügen
        link.textContent = heading.textContent; // Text aus dem Heading übernehmen

        // Link in das Listenelement einfügen
        listItem.appendChild(link);

        // Listenelement in die Liste einfügen
        tocList.appendChild(listItem);
      });

      // Die erstellte Liste in den toc-container einfügen
      tocContainer.appendChild(tocList);
    }
  });


  // light-/darkmode-switch
  const toggleContainer = document.getElementById('toggle-container');
  
  // Füge einen Klick-Event-Listener hinzu
  toggleContainer.addEventListener('click', () => {
    // Hole das Body-Element
    const body = document.body;
    
    // Toggle die Klasse 'is-dark'
    body.classList.toggle('is-dark');
    
    // Speichere den aktuellen Zustand im localStorage
    const isDarkMode = body.classList.contains('is-dark');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  });
  
  // Überprüfe beim Laden der Seite, welchen Modus der Benutzer zuletzt verwendet hat
  document.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('theme');
    
    if (savedMode === 'dark') {
      // Wenn der gespeicherte Modus "dark" ist, füge die Klasse "is-dark" hinzu
      document.body.classList.add('is-dark');
    } else {
      // Andernfalls füge die Klasse "is-light" hinzu
      document.body.classList.remove('is-dark');
    }
  });


// automatische Link-kopier-funktion
function createIdFromText(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

document.addEventListener("DOMContentLoaded", function() {
  const headingContainers = document.querySelectorAll('.zwischenueberschrift-container');
  headingContainers.forEach(function(container) {
    const headingText = container.querySelector('h2');
    const copyIcon = container.querySelector('.copy-icon');
    if (headingText) {
      const textContent = headingText.textContent || headingText.innerText;
      const id = createIdFromText(textContent);
      container.id = id;
      if (copyIcon) {
        copyIcon.addEventListener('click', function() {
          const link = window.location.href.split("#")[0] + "#" + id;
          navigator.clipboard.writeText(link).then(() => {
            console.log("Link wurde kopiert: " + link);
          }).catch(err => {
            console.error("Fehler beim Kopieren des Links: ", err);
          });
        });
      }
    }
  });
});

<style>
.icon_checkmark {
    transition: all 0.6s ease;
    transform:scale(0);
}
.fade-out {
    opacity: 1;
    transform:scale(1);
}
</style>

// automatische Codeblock Link-kopier-funktion
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('[class*="language-"]').forEach(el => {
      const lang = el.className.match(/language-(\w+)/)[1];
      const codeBlockLang = el.closest('.code_wrapper').querySelector('.code_block-lang');
      if (codeBlockLang) {
          codeBlockLang.textContent = lang;
      }
  });
    document.querySelectorAll('.code_copy').forEach(button => {
    button.addEventListener('click', function() {
        let codeContainer = this.closest('.code_container');
        let codeElement = codeContainer.querySelector('pre code').cloneNode(true); // Clone the code element

        // Remove text content of all .comment elements within span tags
        codeElement.querySelectorAll('.linenumber').forEach(comment => {
            comment.textContent = '';
        });

        let code = codeElement.textContent; // Get the text content of the modified code element
        copyToClipboard(code, this);
    });
});

});

function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        let copyIcon = button.querySelector('.icon_copy');
        let checkmarkIcon = button.querySelector('.icon_checkmark');

        // Hide copy icon and show checkmark icon
        copyIcon.style.display = 'none';
        checkmarkIcon.style.display = 'block';
        checkmarkIcon.classList.add('fade-out');

        // After a short delay, switch back
        setTimeout(() => {
            checkmarkIcon.classList.remove('fade-out');
            checkmarkIcon.style.display = 'none';
            copyIcon.style.display = 'block';
        }, 1000); // Adjust the time as needed
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}


  // automatische Navigationsstruktur-Sidebar
document.addEventListener("DOMContentLoaded", function () {
    console.log("Script gestartet");

    const currentURL = window.location.pathname;
    console.log("Aktuelle URL:", currentURL);

    // Hauptseite aus URL extrahieren (alles nach dem ersten Slash wird ignoriert)
    const mainPageMatch = currentURL.match(/^\/([^\/]+)/);
    if (!mainPageMatch) {
        console.log("Keine Hauptseite erkannt");
        return;
    }

    const mainPage = "/" + mainPageMatch[1]; // Beispiel: "/hauptseite-1"
    console.log("Hauptseite erkannt:", mainPage);

    // Sitemap abrufen
    fetch("/sitemap.xml")
        .then(response => response.text())
        .then(xmlText => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "text/xml");

            // Alle <loc>-Einträge in der Sitemap sammeln
            const urls = [...xmlDoc.querySelectorAll("url > loc")].map(loc => new URL(loc.textContent).pathname);
            console.log("Alle Seiten aus Sitemap:", urls);

            // Unterseiten der aktuellen Hauptseite herausfiltern
            const sidebarLinks = urls.filter(url => url.startsWith(mainPage + "/"));
            console.log("Gefilterte Unterseiten-Links:", sidebarLinks);

            // Array für die Titel und URLs der Unterseiten
            const pageTitles = [];

            // Seiteninhalte laden und Titel extrahieren
            const promises = sidebarLinks.map(url => {
                return fetch(url)
                    .then(response => response.text())
                    .then(pageText => {
                        const pageParser = new DOMParser();
                        const pageDoc = pageParser.parseFromString(pageText, "text/html");

                        const pageTitle = pageDoc.querySelector("title").textContent;
                        pageTitles.push({ url: url, title: pageTitle });
                    })
                    .catch(error => console.error("Fehler beim Abrufen der Seite:", error));
            });

            // Nachdem alle Seiten geladen wurden, Links sortieren und in Sidebar einfügen
            Promise.all(promises).then(() => {
                // Links alphabetisch nach Titel sortieren
                pageTitles.sort((a, b) => a.title.localeCompare(b.title));
                console.log("Alphabetisch sortierte Links:", pageTitles);

                // Sidebar befüllen
                let sidebar = document.querySelector(".sidebar");
                if (!sidebar) {
                    console.log("Sidebar nicht gefunden");
                    return;
                }

                sidebar.innerHTML = ""; // Alte Inhalte löschen

                // Hauptseite-Link als "Overview" immer an erster Stelle hinzufügen
                let overviewLink = document.createElement("a");
                overviewLink.href = mainPage;
                overviewLink.textContent = "Overview"; // Text für die Hauptseite
                overviewLink.classList.add("side-nav-link");

                // Wenn der Link zur aktuellen Seite passt, aktive Klasse hinzufügen
                if (currentURL === mainPage) {
                    overviewLink.classList.add("w--current");
                }

                sidebar.appendChild(overviewLink);

                // Die anderen Links alphabetisch sortieren und hinzufügen
                pageTitles.forEach(page => {
                    let link = document.createElement("a");
                    link.href = page.url;
                    link.textContent = page.title; // Verwende den Titel der Seite
                    link.classList.add("side-nav-link");

                    // Wenn der Link zur aktuellen Seite passt, aktive Klasse hinzufügen
                    if (currentURL === page.url) {
                        link.classList.add("w--current");
                    }

                    sidebar.appendChild(link);
                });

                console.log("Sidebar erfolgreich aktualisiert");

                // Füge die aktive Klasse auch für die Hauptnavigation hinzu
                const mainNavLink = document.querySelector(`.nav-link[href="${mainPage}"]`);
                if (mainNavLink && currentURL !== mainPage) {
                    mainNavLink.classList.add("w--current");
                }

            });
        })
        .catch(error => console.error("Fehler beim Abrufen der Sitemap:", error));
});


  // Dieses Skript sorgt dafür, dass sowohl die horizontale Hauptnavigation als auch die Sidebar zur korrekten Position scrollen.
  // Falls eine Unterseite aktiv ist, wird die dazugehörige Hauptseite erkannt und ausgerichtet.

  document.addEventListener("DOMContentLoaded", function () {
    const navContainer = document.querySelector(".pagelinks-wrapper");
    const sidebarContainer = document.querySelector(".sidebar"); // Sidebar hinzufügen

    // Funktion, um den aktiven Hauptlink zu ermitteln
    function getActiveMainLink() {
        let activeSubLink = document.querySelector(".sidebar .nav-link.w--current");
        
        if (activeSubLink) {
            let parentMainLink = activeSubLink.closest(".sidebar").getAttribute("data-main-link");
            if (parentMainLink) {
                return document.querySelector(`.pagelinks-wrapper .nav-link[href="${parentMainLink}"]`);
            }
        }
        
        return document.querySelector(".pagelinks-wrapper .nav-link.w--current");
    }

    // Funktion, um die Scroll-Position für einen Container (Navigation oder Sidebar) zu setzen
    function scrollToActiveLink(container) {
        let activeLink = getActiveMainLink();
        if (!activeLink || !container) return;

        const containerRect = container.getBoundingClientRect();
        const activeLinkRect = activeLink.getBoundingClientRect();
        const currentScrollPosition = container.scrollLeft;

        const targetScrollPosition = activeLinkRect.left - containerRect.left - (containerRect.width / 2) + (activeLinkRect.width / 2);
        const distanceToScroll = targetScrollPosition - currentScrollPosition;
        const duration = 500;
        let startTime = null;

        function easeOut(t) {
            return t * (2 - t);
        }

        function animateScroll(time) {
            if (!startTime) startTime = time;
            const progress = (time - startTime) / duration;
            const easedProgress = Math.min(easeOut(progress), 1);
            container.scrollLeft = currentScrollPosition + (distanceToScroll * easedProgress);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    }

    // Beobachtet Änderungen in der Sidebar und scrollt ggf. zur Hauptseite
    const observer = new MutationObserver(() => {
        setTimeout(() => {
            scrollToActiveLink(navContainer); // Scrollen der Hauptnavigation
            scrollToActiveLink(sidebarContainer); // Scrollen der Sidebar
        }, 100); // Kleiner Delay für Sicherheit
    });

    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
        observer.observe(sidebar, { childList: true, subtree: true });
    }

    // Initial scrollen beim Laden der Seite
    setTimeout(() => {
        scrollToActiveLink(navContainer); // Scrollen der Hauptnavigation
        scrollToActiveLink(sidebarContainer); // Scrollen der Sidebar
    }, 200);

    // Eventlistener für Klicks auf die Navigationselemente
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("nav-link")) {
            scrollToActiveLink(navContainer); // Scrollen der Hauptnavigation
            scrollToActiveLink(sidebarContainer); // Scrollen der Sidebar
        }
    });
  });


// icon im button per link laden
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".icon-container").forEach((container) => {
      let iconLink = container.getAttribute("data-icon");

      if (iconLink) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", iconLink, true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            container.innerHTML = xhr.responseText; // SVG einfügen
          }
        };
        xhr.send();
      }
    });
  });


  // sticky-header component site
  window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".component-stage-header");

    if (navbar) {
      if (window.scrollY > 50) {
        navbar.style.setProperty("padding-top", "var(--_bildsemantictokens---semanticspace--gridspacedesktopconstant)");
        navbar.style.setProperty("padding-bottom", "var(--_bildsemantictokens---semanticspace--gridspacedesktopconstant)");
      } else {
        navbar.style.setProperty("padding-top", "var(--_bildsemantictokens---semanticspace--subsectionspace)");
        navbar.style.setProperty("padding-bottom", "var(--_bildsemantictokens---semanticspace--subsectionspace)");
      }
    }
  });

<style>
  .component-stage-header {
    transition: padding-top 0.3s ease, padding-bottom 0.3s ease;
  }
</style>


  // automatischer Component-Header-Title
document.addEventListener("DOMContentLoaded", function() {
    const headlineElement = document.querySelector(".component-header-dynamic-headline");
    if (headlineElement) {
        headlineElement.textContent = document.title;
    }
});
