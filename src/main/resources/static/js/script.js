document.addEventListener("DOMContentLoaded", () => {
    const formContainer = document.getElementById("form-container");
    const supplierForm = document.getElementById("supplier-form");
    const supplierList = document.getElementById("supplier-list");
    const newButton = document.getElementById("new");
    const editButton = document.getElementById("edit");
    const deleteButton = document.getElementById("delete");
    const cancelButton = document.getElementById("cancel");
    const addPhoneButton = document.getElementById("add-phone");
    const closeModalButton = document.getElementById("close-modal");
    const phoneSection = document.getElementById("phone-section");

    let selectedSupplierId = null;
    let isEditing = false; // Flag para indicar se estamos editando um fornecedor

    function fetchSuppliers() {
        fetch("desafio/api/suppliers")
            .then(response => response.json())
            .then(data => {
                supplierList.innerHTML = "";
                data.forEach(supplier => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td><input type="checkbox" class="select-supplier" data-id="${supplier.id}"></td>
                        <td>${supplier.name}</td>
                        <td>${supplier.email}</td>
                        <td>${supplier.phones.join(", ")}</td>
                        <td>${supplier.type}</td>
                        <td>${supplier.observation}</td>
                        <td><button class="favorite-btn" data-id="${supplier.id}">${supplier.favorite ? "★" : "☆"}</button></td>
                    `;
                    supplierList.appendChild(row);
                });
                updateButtonsState();
            });
    }

    function resetForm() {
        supplierForm.reset();
        selectedSupplierId = null;
        isEditing = false;
        document.querySelectorAll(".phone").forEach((el, index) => {
            if (index !== 0) el.remove();
        });
    }

    function openFormModal() {
        formContainer.style.display = "block";
    }

    function closeFormModal() {
        formContainer.style.display = "none";
        resetForm();
        updateButtonsState();
    }

    function updateButtonsState() {
        const checkboxes = document.querySelectorAll(".select-supplier");
        const selectedCheckboxes = Array.from(checkboxes).filter(cb => cb.checked);

        editButton.disabled = selectedCheckboxes.length !== 1;
        deleteButton.disabled = selectedCheckboxes.length === 0;
    }

    newButton.addEventListener("click", () => {
        openFormModal();
        isEditing = false;
    });

    editButton.addEventListener("click", () => {
        if (selectedSupplierId) {
            fetch(`desafio/api/suppliers/${selectedSupplierId}`)
                .then(response => response.json())
                .then(supplier => {
                    document.getElementById("name").value = supplier.name;
                    document.getElementById("email").value = supplier.email;
                    document.getElementById("type").value = supplier.type;
                    document.getElementById("observation").value = supplier.observation;
                    const phoneFields = document.querySelectorAll(".phone");
                    phoneFields[0].value = supplier.phones[0];
                    for (let i = 1; i < supplier.phones.length; i++) {
                        const newPhoneField = phoneFields[0].cloneNode(true);
                        newPhoneField.value = supplier.phones[i];
                        phoneFields[0].parentNode.insertBefore(newPhoneField, addPhoneButton);
                    }
                    openFormModal();
                    isEditing = true;
                });
        }
    });

    deleteButton.addEventListener("click", () => {
        const selectedIds = Array.from(document.querySelectorAll(".select-supplier:checked")).map(cb => cb.getAttribute("data-id"));
        if (selectedIds.length > 0) {
            fetch("desafio/api/suppliers", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(selectedIds)
            }).then(() => {
                fetchSuppliers();
                resetForm();
                updateButtonsState();
            });
        }
    });

    closeModalButton.addEventListener('click', () => {
        closeFormModal();
    });

    cancelButton.addEventListener("click", () => {
        closeFormModal();
    });

    // Event listener para adicionar telefone
    phoneSection.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-phone")) {
            const lastPhoneEntry = phoneSection.lastElementChild;

            // Cria uma nova entrada de telefone
            const newPhoneEntry = document.createElement("div");
            newPhoneEntry.classList.add("phone-entry");
            newPhoneEntry.innerHTML = `
                <input type="tel" class="phone" required>
                <button type="button" class="add-phone button">+</button>
                <button type="button" class="remove-phone button">-</button>
            `;

            // Adiciona a nova entrada de telefone ao final da seção de telefones
            phoneSection.appendChild(newPhoneEntry);
        }

        // Event listener para remover telefone
        if (event.target.classList.contains("remove-phone")) {
            const phoneEntry = event.target.closest(".phone-entry");

            // Remove apenas se houver mais de um telefone visível
            const phoneEntries = phoneSection.querySelectorAll(".phone-entry");
            if (phoneEntries.length > 1) {
                phoneEntry.remove();

                // Mostra ou esconde o botão de remover conforme necessário
                if (phoneEntries.length === 1) {
                    phoneEntries[0].querySelector(".remove-phone").style.display = "none";
                }
            }
        }
    });

    supplierForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const id = selectedSupplierId;
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phones = Array.from(document.querySelectorAll(".phone")).map(el => el.value);
        const type = document.getElementById("type").value;
        const observation = document.getElementById("observation").value;
        let favorite = false;

        // Se estivermos editando, preservamos o status de favorito existente
        if (isEditing) {
            const favoriteBtn = document.querySelector(`.favorite-btn[data-id="${id}"]`);
            favorite = favoriteBtn.textContent.trim() === "★"; // Verifica se é favorito ou não
        }

        const formData = {
            id,
            name,
            email,
            phones,
            type,
            observation,
            favorite
        };

        let method, url;
        if (isEditing) {
            method = "PUT";
            url = `desafio/api/suppliers/${id}`;
        } else {
            method = "POST";
            url = "desafio/api/suppliers";
        }

        fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(() => {
                fetchSuppliers();
                closeFormModal();
                updateButtonsState();
            })
            .catch(error => console.error("Erro ao salvar fornecedor:", error));
    });

    supplierList.addEventListener("click", (event) => {
        if (event.target.classList.contains("select-supplier")) {
            updateButtonsState();
            const checkboxes = document.querySelectorAll(".select-supplier");
            const selectedCheckboxes = Array.from(checkboxes).filter(cb => cb.checked);
            if (selectedCheckboxes.length === 1) {
                selectedSupplierId = event.target.dataset.id;
            } else {
                selectedSupplierId = null;
            }
        }

        if (event.target.classList.contains("favorite-btn")) {
            const supplierId = event.target.dataset.id;
            fetch(`desafio/api/suppliers/${supplierId}`)
                .then(response => response.json())
                .then(supplier => {
                    supplier.favorite = !supplier.favorite;
                    return fetch(`desafio/api/suppliers/${supplierId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(supplier),
                    });
                })
                .then(() => fetchSuppliers())
                .catch(error => console.error("Erro ao favoritar fornecedor:", error));
        }
    });

    fetchSuppliers();
});

