const contacts = [
    { name: "Contato 1", phone: "11919111071" }
  ];
  const contactList = document.getElementById("contactList");
  const searchInput = document.getElementById("searchInput");
  const addContactNav = document.getElementById("addContactNav");
  
  addContactNav.addEventListener("click", () => {
    const name = prompt("Nome do contato:");
    const phone = prompt("Telefone:");
    if (name && phone) {
      contacts.push({ name, phone });
      renderContacts();
    }
  });
  
  searchInput.addEventListener("input", renderContacts);
  
  function renderContacts() {
    const term = searchInput.value.toLowerCase();
    contactList.innerHTML = "";
  
    contacts
      .filter(c => c.name.toLowerCase().includes(term))
      .forEach((contact, index) => {
        const li = document.createElement("li");
        li.className = "contact-item";
        li.innerHTML = `
          <div class="contact-info">
            <strong>${contact.name}</strong>
            <small>${contact.phone}</small>
          </div>
          <div>
            <button class="menu-btn" data-index="${index}">&#x22EE;</button>
            <div class="menu-options" id="menu-${index}">
              <button onclick="editContact(${index})">Editar</button>
              <button onclick="deleteContact(${index})">Excluir</button>
            </div>
          </div>
        `;
        contactList.appendChild(li);
      });
  
    document.querySelectorAll(".menu-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const index = btn.getAttribute("data-index");
        toggleMenu(index);
      });
    });
  }
  
  function toggleMenu(index) {
    document.querySelectorAll(".menu-options").forEach(menu => {
      if (menu.id === `menu-${index}`) {
        menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
      } else {
        menu.style.display = "none";
      }
    });
  }
  
  window.addEventListener("click", () => {
    document.querySelectorAll(".menu-options").forEach(menu => {
      menu.style.display = "none";
    });
  });
  
  function editContact(index) {
    alert(`Chamar API para editar: ${contacts[index].name}`);
  }
  
  function deleteContact(index) {
    alert(`Chamar API para excluir: ${contacts[index].name}`);
  }
  
  renderContacts();
  
