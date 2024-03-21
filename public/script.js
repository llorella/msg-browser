function loadConversations() {
  fetch('/api/ll')
    .then(response => response.json())
    .then(data => {
      const conversationList = document.getElementById('conversation-list');
      conversationList.innerHTML = '';

      data.forEach(file => {
        const listItem = document.createElement('li');
        listItem.textContent = file;
        listItem.addEventListener('click', () => loadConversation(file));
        conversationList.appendChild(listItem);
      });

      // Add search functionality
      const searchInput = document.getElementById('search-input');
      searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        Array.from(conversationList.children).forEach(item => {
          const fileName = item.textContent.toLowerCase();
          item.style.display = fileName.includes(searchTerm) ? 'block' : 'none';
        });
      });
    })
    .catch(error => {
      console.error('Error loading conversations:', error);
    });
}

function loadConversation(filename) {
  fetch(`/api/ll/${filename}`)
    .then(response => response.json())
    .then(data => {
      const conversationDetail = document.getElementById('conversation-detail');
      conversationDetail.innerHTML = '';

      data.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(message.role);
        messageElement.innerHTML = `<strong>${message.role}:</strong> ${message.content}`;
        conversationDetail.appendChild(messageElement);
      });
    })
    .catch(error => {
      console.error('Error loading conversation:', error);
    });
}

// Load the list of conversations on page load
loadConversations();