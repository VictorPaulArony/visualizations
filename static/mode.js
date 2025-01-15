function toggleTheme() {
    const body = document.body;
    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
}
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.artist-preview').forEach(preview => {
        preview.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });
        preview.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});


//search query for the website
const searchInput = document.getElementById("search");
const suggestionsList = document.getElementById("suggestions");
const artistCards = document.querySelectorAll(".artist-card");

function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    suggestionsList.innerHTML = "";

    if (query.length === 0) {
        suggestionsList.style.display = "none";
        return;
    }

    suggestionsList.style.display = "block";
    const suggestions = new Set();

    artistCards.forEach((card) => {
        const artistName = card.querySelector(".artist-name").textContent.trim();
        const creationDate = card.querySelector(".creation-date").textContent.trim();
        const firstAlbum = card.querySelector(".first-album").textContent.trim();
        const artistLink = card.querySelector("a").getAttribute("href");
        const members = Array.from(card.querySelectorAll(".member")).map(member => member.textContent.trim());
        const locations = Array.from(card.querySelectorAll(".location")).map(location => location.textContent.trim())

        //search by location
        locations.forEach(location => {
            if (location.toLowerCase().includes(query)) {
                suggestions.add({
                    value: location,
                    type: "Location for ",
                    link: artistLink,
                    from: artistName,
                })
            }
        })

        // Search in artist name
        if (artistName.toLowerCase().includes(query)) {
            suggestions.add({
                value: artistName,
                type: "artist/band from ",
                link: artistLink,
                from:artistName
            });
        }

        // Search in members
        members.forEach(member => {
            if (member.toLowerCase().includes(query)) {
                suggestions.add({
                    value: member,
                    type: "member of ",
                    link: artistLink,
                    from: artistName
                });
            }
        });

        // Search in creation date
        if (creationDate.toLowerCase().includes(query)) {
            suggestions.add({
                value: creationDate.split(":")[1].trim(),
                type: "creation date for ",
                link: artistLink,
                from:artistName
            });
        }

        // Search in first album
        if (firstAlbum.toLowerCase().includes(query)) {
            suggestions.add({
                value: firstAlbum.split(":")[1].trim(),
                type: "first album for ",
                link: artistLink,
                from:artistName
            });
        }
    });

    // Create and display suggestions
    Array.from(suggestions).forEach((suggestion) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");

        link.href = suggestion.link;
        link.textContent = `${suggestion.value} - ${suggestion.type} ${suggestion.from}`;
        link.className = "suggestion-link";

        link.addEventListener("click", (e) => {
            searchInput.value = suggestion.value;
            suggestionsList.style.display = "none";
        });

        listItem.appendChild(link);
        suggestionsList.appendChild(listItem);
    });
}

// Close suggestions when clicking outside
document.addEventListener("click", function (e) {
    if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
        suggestionsList.style.display = "none";
    }
});

// Prevent suggestion box from closing when clicking inside it
suggestionsList.addEventListener("click", function (e) {
    e.stopPropagation();
});
