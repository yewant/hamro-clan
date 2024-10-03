document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('https://turbo-space-couscous-659xgq64774hr79w-3000.app.github.dev/clan-members');
        if (response.ok) {
            const data = await response.json();
            const clanMembersDiv = document.getElementById('clan-members');

            // Clear any existing content
            clanMembersDiv.innerHTML = '';

            // Build and insert the HTML content for the clan members
            let html = '<ul class="clan-list">';
            data.items.forEach(member => {
                html += `<li class="clan-member">
                    <strong>Name:</strong> ${member.name}<br>
                    <strong>Role:</strong> ${member.role}<br>
                    <strong>Level:</strong> ${member.expLevel}<br>
                    <strong>Trophies:</strong> ${member.trophies}
                </li>`;
            });
            html += '</ul>';

            clanMembersDiv.innerHTML = html;
            document.getElementById('clan-members-section').style.display = 'block';
        } else {
            document.getElementById('clan-members').innerHTML = 'Failed to load clan members.';
        }
    } catch (error) {
        console.error('Error fetching clan members:', error);
        document.getElementById('clan-members').innerHTML = 'An error occurred while fetching clan members data.';
    }
});
