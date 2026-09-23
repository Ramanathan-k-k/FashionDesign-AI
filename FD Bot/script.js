const chatForm = document.querySelector('#chatForm');
const chatInput = document.querySelector('#chatInput');
const chatMessages = document.querySelector('#chatMessages');
const occasionSelect = document.querySelector('#occasion');
const dressTypeSelect = document.querySelector('#dressType');
const conversation = document.querySelector('#conversation');

const styleNotes = {
    Everyday: 'Keep the base relaxed and let one refined detail do the work: a sculpted bag, an interesting shoe, or a beautiful texture.',
    Work: 'A clean, intentional silhouette will carry the look. Pair modern tailoring with one softer element so it still feels like you.',
    'Wedding guest': 'Choose movement and polish together: a soft tailored shape, a considered colour, and one memorable finishing detail.',
    'Night out': 'Start with one confident piece, then edit everything around it. The best evening looks have a little restraint.',
    Travel: 'Build around comfortable layers in a close palette. A strong outer layer can make the whole capsule feel designed.'
};

function addMessage(text, type) {
    const message = document.createElement('div');
    message.className = `chat-message ${type}`;
    message.innerHTML = type === 'bot'
        ? `<span class="message-avatar">FD</span><div><p>${text}</p><small>Fashion Design Bot · just now</small></div>`
        : `<div><p>${text}</p></div>`;
    chatMessages.appendChild(message);
    conversation.scrollTo({ top: conversation.scrollHeight, behavior: 'smooth' });
}

function createRequest(occasion, dressType, details = '') {
    const request = details || `I need a ${dressType.toLowerCase()} look for ${occasion.toLowerCase()}.`;
    addMessage(request, 'user');
    window.setTimeout(() => {
        const note = styleNotes[occasion] || 'Let’s keep the silhouette intentional and choose details that feel personal rather than predictable.';
        addMessage(`<strong>Let’s build it.</strong><br>${note}<br><br>For your ${dressType.toLowerCase()} direction, I’d begin with a strong base layer, add one piece with shape, and finish with a texture that catches the light. What colours are you drawn to?`, 'bot');
    }, 280);
}

chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const details = chatInput.value.trim();
    if (!details) return;
    createRequest(occasionSelect.value, dressTypeSelect.value, details);
    chatInput.value = '';
    chatInput.style.height = 'auto';
});

chatInput.addEventListener('input', () => {
    chatInput.style.height = 'auto';
    chatInput.style.height = `${Math.min(chatInput.scrollHeight, 130)}px`;
});

chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        chatForm.requestSubmit();
    }
});

document.querySelectorAll('.prompt-card').forEach((card) => {
    card.addEventListener('click', () => {
        occasionSelect.value = card.dataset.occasion;
        dressTypeSelect.value = card.dataset.dress;
        createRequest(card.dataset.occasion, card.dataset.dress);
        document.querySelector('.prompt-grid').classList.add('has-started');
    });
});

document.querySelector('#newChat').addEventListener('click', () => {
    chatMessages.innerHTML = '';
    document.querySelector('.prompt-grid').classList.remove('has-started');
    chatInput.value = '';
    conversation.scrollTo({ top: 0, behavior: 'smooth' });
});