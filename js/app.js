const API_URL = "https://crudcrud.com/api/e42d2a99b5d445bd82f8e8e31ac45c98/Busbooking"; 

let editId = null;

// ================= CREATE & UPDATE =================
async function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const car = document.getElementById("car").value;

    const userObj = { name, email, phone, car };

    try {
        if (editId === null) {
            // CREATE (POST)
            await axios.post(API_URL, userObj);
        } else {
            // UPDATE (PUT)
            await axios.put(`${API_URL}/${editId}`, userObj);
            editId = null;
        }

        event.target.reset();
        fetchUsers();

    } catch (error) {
        console.log(error);
    }
}

// ================= READ =================
async function fetchUsers() {
    try {
        const res = await axios.get(API_URL);
        displayUsers(res.data);
    } catch (error) {
        console.log(error);
    }
}

// ================= DISPLAY =================
function displayUsers(users) {
    const userList = document.getElementById("userList");
    userList.innerHTML = "";

    users.forEach(user => {
        const li = document.createElement("li");
        li.id = "item";

        li.innerHTML = `
            ${user.name} | ${user.email} | ${user.phone} | ${user.car}
            <button onclick="editUser('${user._id}')" >Edit</button>
            <button onclick="deleteUser('${user._id}')">Delete</button>
        `;

        userList.appendChild(li);
    });
}

// ================= DELETE =================
async function deleteUser(id) {
    try {
        await axios.delete(`${API_URL}/${id}`);
        fetchUsers();
    } catch (error) {
        console.log(error);
    }
}

// ================= EDIT =================
async function editUser(id) {
    try {
        const res = await axios.get(`${API_URL}/${id}`);
        const user = res.data;

        document.getElementById("username").value = user.name;
        document.getElementById("email").value = user.email;
        document.getElementById("phone").value = user.phone;
        document.getElementById("car").value = user.car;

        editId = id;

    } catch (error) {
        console.log(error);
    }
}

// ================= FILTER =================
async function filterUsers() {
    try {
        const selectedBus = document.getElementById("filterBus").value;
        const res = await axios.get(API_URL);

        if (selectedBus === "All") {
            displayUsers(res.data);
        } else {
            const filtered = res.data.filter(user => user.car === selectedBus);
            displayUsers(filtered);
        }

    } catch (error) {
        console.log(error);
    }
}

// Page Load pe data fetch ho
window.onload = fetchUsers;
