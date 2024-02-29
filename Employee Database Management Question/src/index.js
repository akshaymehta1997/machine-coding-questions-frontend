(async function (params) {
    const data = await fetch("./src/data.json");
    const resp = await data.json();
    let employees = resp;
    let selectedEmployeeId = employees[0].id;
    let selectedEmployee = employees[0];

    const empoloyeeList = document.querySelector(".employees__names--list");
    const empoloyeeInfo = document.querySelector(".employees__single--info");

    //TODO: Add EMployee logic
    const createEmployee = document.querySelector(".createEmployee");
    const addEmployeeModal = document.querySelector(".addEmployee");
    const addEmployeeForm = document.querySelector(".addEmployee__create");

    createEmployee.addEventListener("click", () => {
        addEmployeeModal.style.display = "flex";
    });

    addEmployeeModal.addEventListener("click", (e) => {
        if (e.target.className != "addEmployee") return;
        addEmployeeModal.style.display = "none";
    });

    const dobInput = document.querySelector(".addEmployee_create--dob");
    dobInput.max = `${new Date().getFullYear() - 18} -${new Date()
        .toISOString()
        .slice(5, 10)}`;

    addEmployeeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(addEmployeeForm);
        const values = [...formData.entries()];
        const empData = values.reduce((acc, [key, val]) => {
            acc[key] = val;
            return acc;
        }, {});
        empData.id = employees.at(-1).id + 1;
        empData.age =
            new Date().getFullYear() - parseInt(empData.dob.slice(0, 4));
        empData.imageUrl =
            empData.imageUrl ||
            "https://cdn-icons-png.flaticon.com/512/0/93.png";
        employees.push(empData);
        renderEmployees();
        addEmployeeForm.reset();
        addEmployeeModal.style.display = "none";
    });

    addEmployeeForm.addEventListener("formdata", (e) => {
        console.log("formdata fired");

        // modifies the form data
        const formData = e.formData;
        // formdata gets modified by the formdata event
        formData.set("address", "test");
    });
    //TODO: Select employee logic
    empoloyeeList.addEventListener("click", (e) => {
        if (e.target.tagName == "SPAN" && selectedEmployee !== e.target.id) {
            selectedEmployeeId = e.target.id;
        }
        if (e.target.tagName == "I") {
            employees = employees.filter(
                (emp) => String(emp.id) !== e.target.parentNode.id
            );
            if (String(selectedEmployeeId) == e.target.parentNode.id) {
                selectedEmployeeId = employees[0]?.id || -1;
            }
        }
        renderEmployees();
        renderSingleEmployee();
    });

    const renderEmployees = () => {
        empoloyeeList.innerHTML = "";
        employees.forEach((emp) => {
            const employee = document.createElement("span");
            employee.classList.add("employees__names--item");

            if (parseInt(selectedEmployeeId, 10) == emp.id) {
                employee.classList.add("selected");
                selectedEmployee = emp;
            }

            employee.setAttribute("id", emp.id);
            employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>`;

            empoloyeeList.append(employee);
        });
    };

    const renderSingleEmployee = () => {
        //deleteing Employee
        if (selectedEmployeeId == -1) {
            empoloyeeInfo.innerHTML = "";
            return;
        }
        empoloyeeInfo.innerHTML = `
            <img src="${selectedEmployee.imageUrl}"></img>
            <span class="employees__single--heading">${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})</span>
            <span>${selectedEmployee.address}</span>
            <span>${selectedEmployee.email}</span>
            <span>${selectedEmployee.contactNumber}</span>
            <span>${selectedEmployee.dob}</span>
        `;
    };

    renderEmployees();
    renderSingleEmployee();
})();

Array.prototype.myFlat = function (depth = 1) {
    const output = [];

    /**
     *
     * @param {Array} arr
     * @param {number} currentDepth
     */
    function flatten(arr, currentDepth) {
        for (const element of arr) {
            if (Array.isArray(element) && currentDepth < depth) {
                flatten(element, currentDepth + 1);
            } else {
                output.push(element);
            }
        }
    }
    flatten(this, 0);
    return output;
};
