function loadGroupings() {
  const groupingList = document.getElementById('grouping-list');
  groupingList.innerHTML = '';

  Object.keys(config.groupings).forEach(grouping => {
    const listItem = document.createElement('li');
    listItem.textContent = grouping;
    listItem.addEventListener('click', () => loadConversations(grouping));
    groupingList.appendChild(listItem);
  });
}

function loadConversations(grouping) {
  const conversationList = document.getElementById('conversation-list');
  conversationList.innerHTML = '';

  config.groupings[grouping].forEach(file => {
    const listItem = document.createElement('li');
    listItem.textContent = file;
    listItem.addEventListener('click', () => loadConversation(file));
    conversationList.appendChild(listItem);
  });

  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    Array.from(conversationList.children).forEach(item => {
      const fileName = item.textContent.toLowerCase();
      item.style.display = fileName.includes(searchTerm) ? 'block' : 'none';
    });
  });
}

function loadConversation(filename) {
  fetch(`${config.conversationsEndpoint}${filename}`)
    .then(response => response.json())
    .then(data => {
      const conversationDetail = document.getElementById('conversation-detail');
      conversationDetail.innerHTML = '';

      data.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(message.role);

        const contentElement = document.createElement('div');
        contentElement.innerHTML = message.content.replace(/```([\s\S]*?)```/g, (match, code) => {
          return `<pre><code>${hljs.highlightAuto(code.trim()).value}</code></pre>`;
        });

        messageElement.innerHTML = `<strong>${message.role}:</strong>`;
        messageElement.appendChild(contentElement);
        conversationDetail.appendChild(messageElement);
      });

      hljs.highlightAll();
    })
    .catch(error => {
      console.error('Error loading conversation:', error);
    });
}

loadGroupings();