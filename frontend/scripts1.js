document.addEventListener('DOMContentLoaded', () => {
  // User Credentials
  const USER_CREDENTIALS = { username: 'user', password: 'p' };

  // Page Elements
  const loginContainer = document.getElementById('loginContainer');
  const contactContainer = document.getElementById('contactContainer');
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  const logoutBtn = document.getElementById('logoutBtn');
  const contactModal = document.getElementById('contactModal');
  const searchModal = document.getElementById('searchModal');
  const closeBtns = document.querySelectorAll('.close-btn');
  const contactForm = document.getElementById('contactForm');
  const contactTableBody = document.getElementById('contactTableBody');
  const noResultsMessage = document.getElementById('noResultsMessage');
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const searchResultsList = document.getElementById('searchResultsList');
  let editContactId = null;

    var contactsList;

    async function getData() {
        try {
            const response = await fetch('/contacts');

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            contactsList = await response.json();
            console.log('Data:');
            console.log(contactsList);
            populateTable();
        } catch (error) {
            console.error(error.message);
        }
    }

    async function populateTable() {
        contactTableBody.innerHTML = '';
        console.log("Removed innerhtml");
        contactsList.forEach(contact => {

        const newRow = document.createElement('tr');
        newRow.dataset.id = Date.now();
        newRow.innerHTML = `
              <td>${contact.name}</td>
              <td>${contact.email}</td>
              <td>${contact.phone}</td>
              <td class="action-btns">
                  <button onclick="editContact(${newRow.dataset.id})">Edit</button>
                  <button onclick="deleteContact(${newRow.dataset.id})">Delete</button>
              </td>
          `;
        contactTableBody.appendChild(newRow);
        });
    }



  // Handle Login
  loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      if (username === USER_CREDENTIALS.username && password === USER_CREDENTIALS.password) {
          loginContainer.style.display = 'none';
          contactContainer.style.display = 'block';
            getData();
      } else {
          loginError.textContent = 'Invalid username or password.';
      }
  });

  // Handle Logout
  logoutBtn.addEventListener('click', () => {
      loginContainer.style.display = 'block';
      contactContainer.style.display = 'none';
  });

  // Handle Contact Creation and Editing
 document.getElementById('createContactBtn').addEventListener('click', () => {
      document.getElementById('modalTitle').textContent = 'Create Contact';
      document.getElementById('contactForm').reset();
      editContactId = null;
      contactModal.style.display = 'block';
  });

  contactForm.addEventListener('submit', (e) => {
      //e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const formError = document.getElementById('formError');

      formError.textContent = '';

      if (!name || !email || !phone) {
          formError.textContent = 'All fields are required.';
          return;
      }

      if (!/^\d{10}$/.test(phone)) {
          formError.textContent = 'Phone number should be 10 digits.';
          return;
      }
        console.log("inserted");
        getData();
        console.log("viewable");

        contactsList.forEach(contact => {

        const newRow = document.createElement('tr');
        newRow.dataset.id = Date.now();
        newRow.innerHTML = `
              <td>${contact.name}</td>
              <td>${contact.email}</td>
              <td>${contact.phone}</td>
              <td class="action-btns">
                  <button onclick="editContact(${newRow.dataset.id})">Edit</button>
                  <button onclick="deleteContact(${newRow.dataset.id})">Delete</button>
              </td>
          `;
        contactTableBody.appendChild(newRow);
        });


      /*if (editContactId) {
          // Edit existing contact
          const row = document.querySelector(`tr[data-id="${editContactId}"]`);
          row.cells[0].textContent = name;
          row.cells[1].textContent = email;
          row.cells[2].textContent = phone;
      } else {
          // Add new contact
          const newRow = document.createElement('tr');
          newRow.dataset.id = Date.now();
          newRow.innerHTML = `
              <td>${name}</td>
              <td>${email}</td>
              <td>${phone}</td>
              <td class="action-btns">
                  <button onclick="editContact(${newRow.dataset.id})">Edit</button>
                  <button onclick="deleteContact(${newRow.dataset.id})">Delete</button>
              </td>
          `;
          contactTableBody.appendChild(newRow);
      }*/

      contactModal.style.display = 'none';
  });

  window.editContact = (id) => {
      const row = document.querySelector(`tr[data-id="${id}"]`);
      document.getElementById('name').value = row.cells[0].textContent;
      document.getElementById('email').value = row.cells[1].textContent;
      document.getElementById('phone').value = row.cells[2].textContent;
      document.getElementById('modalTitle').textContent = 'Edit Contact';
      document.getElementById('contactId').value = id;
      editContactId = id;
      contactModal.style.display = 'block';
  };

  window.deleteContact = (id) => {
      document.querySelector(`tr[data-id="${id}"]`).remove();
      if (!contactTableBody.rows.length) {
          noResultsMessage.style.display = 'block';
      }
  };

  // Handle Search
  searchBtn.addEventListener('click', () => {
      searchModal.style.display = 'block';
  });

  searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      searchResultsList.innerHTML = '';

      Array.from(contactTableBody.rows).forEach(row => {
          const name = row.cells[0].textContent.toLowerCase();
          const email = row.cells[1].textContent.toLowerCase();
          if (name.includes(query) || email.includes(query)) {
              const li = document.createElement('li');
              li.textContent = `Name: ${name}, Email: ${email}, Phone: ${row.cells[2].textContent}`;
              searchResultsList.appendChild(li);
          }
      });

      if (!searchResultsList.children.length) {
          const li = document.createElement('li');
          li.textContent = 'No contacts found.';
          searchResultsList.appendChild(li);
      }
  });

  // Close Modals
  closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
          contactModal.style.display = 'none';
          searchModal.style.display = 'none';
      });
  });
});
