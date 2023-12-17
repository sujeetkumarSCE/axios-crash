function submitForm() {
    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    // Do something with the form values (e.g., add to the list)
    var userList = document.getElementById('userList');
    var listItem = document.createElement('li');
    
    // Create delete button and attach event listener
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        deleteUser({ name, email, phone });
    });

    // Create edit button and attach event listener
    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function () {
        editUser({ name, email, phone });
    });

    // Display user details, delete button, and edit button
    listItem.textContent = 'Name: ' + name + ', Email: ' + email + ', Phone: ' + phone;
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    userList.appendChild(listItem);

    // Save user details to local storage
    saveToLocalStorage({ name, email, phone });

    // Clear the form fields using form ID
    document.getElementById('userForm').reset();
}

function saveToLocalStorage(user) {
    // Retrieve existing users from local storage
    var existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Add the new user to the array
    existingUsers.push(user);
  
// Saving data to global Storage
    axios.post("https://crudcrud.com/api/b328251f058f4da59725e309de2031cb/appoinmentdata",user)
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML +"<h4>Something went wrong</h4>";
      console.log(err);
    })



    // Save the updated array back to local storage
    //localStorage.setItem('users', JSON.stringify(existingUsers));
}

function displayUser(user) {
    // Display user details on the screen
    var userList = document.getElementById('userList');
    var listItem = document.createElement('li');
    
    // Create delete button and attach event listener
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        deleteUser(user);
    });

    // Create edit button and attach event listener
    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function () {
        editUser(user);
    });

    // Display user details, delete button, and edit button
    listItem.textContent = `Name: ${user.name}, Email: ${user.email}, Phone: ${user.phone}`;
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    userList.appendChild(listItem);
}

function deleteUser(user) {
    // Remove user from local storage
    var existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    var updatedUsers = existingUsers.filter(function (existingUser) {
        return existingUser.name !== user.name || existingUser.email !== user.email || existingUser.phone !== user.phone;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Remove user from UI
    var userList = document.getElementById('userList');
    var userItems = userList.getElementsByTagName('li');
    for (var i = 0; i < userItems.length; i++) {
        var itemText = userItems[i].textContent;
        if (itemText.includes(user.name) && itemText.includes(user.email) && itemText.includes(user.phone)) {
            userList.removeChild(userItems[i]);
            break;
        }
    }
}

function editUser(user) {
    // Remove user from UI
    var userList = document.getElementById('userList');
    var userItems = userList.getElementsByTagName('li');
    for (var i = 0; i < userItems.length; i++) {
        var itemText = userItems[i].textContent;
        if (itemText.includes(user.name) && itemText.includes(user.email) && itemText.includes(user.phone)) {
            userList.removeChild(userItems[i]);
            break;
        }
    }

    // Populate the form with user details for editing
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;
}
