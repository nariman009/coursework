const API_ENDPOINT = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-AM/events";

const state = {
    events: [],
}

async function fetchEvents() {
    try {
        const response = await fetch(API_ENDPOINT);
        const json = await response.json();
        // console.log("API Response:", events);  // Log the response
        state.events = json.data;
        renderEvents();
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

function renderEvents() {
    const eventsContainer = document.getElementById("events-container");
    const html = state.events.map(event => `
        <div class="event">
            <h2 class="event-name" data-event-id="${event.id}">${event.name}</h2>
            <p>Date: ${event.date}</p>
            <p>Time: ${event.time}</p>
            <p>Location: ${event.location}</p>
            <p class="event-description" id="description-${event.id}" style="display: none;">${event.description}</p>
            <button class="delete-btn" data-event-id="${event.id}">Delete</button>
        </div>
    `).join('');
    eventsContainer.innerHTML = html;
}

    // // Attach event listeners to event names
    // document.querySelectorAll('.event-name').forEach(name => {
    //     name.addEventListener('click', toggleDescription);
    // });

    document.getElementById('events-container').addEventListener('click', function(event) {
        if (event.target.classList.contains('event-name')) {
            const eventId = event.target.dataset.eventId;
            console.log("Event Name clicked for event ID:", eventId);
            toggleDescription(eventId);
        }
    });
    

    function toggleDescription(eventId) {
        const descriptionElement = document.getElementById(`description-${eventId}`);
        if (descriptionElement) {
            descriptionElement.style.display = descriptionElement.style.display === 'none' ? 'block' : 'none';
        }
    }
    
    // // Attach event listeners to the delete buttons
    // document.querySelectorAll('.delete-btn').forEach(button => {
    //     button.addEventListener('click', deleteEvent);
    // });

    document.getElementById('events-container').addEventListener('click', function(event) {
        // Check if the clicked element is a delete button
        if (event.target.classList.contains('delete-btn')) {
            const eventId = event.target.dataset.eventId;
            console.log("Delete button clicked for event ID:", eventId);
            // Call the deleteEvent function or handle deletion here
            deleteEvent(eventId);
        }
    });

fetchEvents();

document.getElementById('party-form').addEventListener('submit', postParty);

async function postParty(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const newParty = {
        name: document.getElementById('party-name').value,
        date: document.getElementById('party-date').value,
        description: document.getElementById('party-description').value,
        location: document.getElementById('party-location').value,
        cohortId: 2
    };
    console.log(newParty)

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newParty),  // Convert the object to a JSON string
        });

        if (response.ok) {
            // If the post request was successful, fetch and display the updated list of events
            fetchEvents();
        } else {
            console.error('Failed to post new event');
        }
    } catch (error) {
        console.error('Error posting new event:', error);
    }
}

async function deleteEvent(eventId) {
    console.log('hello');

    // const eventId = event.target.dataset.eventId;
    console.log(eventId);

    try {
        const response = await fetch(`${API_ENDPOINT}/${eventId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // If the delete request was successful, fetch and display the updated list of events
            fetchEvents();
        } else {
            console.error('Failed to delete event');
        }
    } catch (error) {
        console.error('Error deleting event:', error);
    }
}

