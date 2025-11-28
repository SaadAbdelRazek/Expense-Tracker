     // Main application logic
      document.addEventListener("DOMContentLoaded", function () {
        // DOM Elements
        const expenseForm = document.getElementById("expenseForm");
        const expenseNameInput = document.getElementById("expenseName");
        const expenseAmountInput = document.getElementById("expenseAmount");
        const expenseCategorySelect =
          document.getElementById("expenseCategory");
        const submitBtn = document.getElementById("submitBtn");
        const expenseTableBody = document.getElementById("expenseTableBody");
        const totalAmountElement = document.getElementById("totalAmount");
        const emptyState = document.getElementById("emptyState");
        const filterButtons = document.querySelectorAll(".btn-filter");
        const expensesCountElement = document.getElementById("expensesCount");
        const averageExpenseElement = document.getElementById("averageExpense");
        const highestCategoryElement =
          document.getElementById("highestCategory");

        // Chart.js instance
        let expenseChart;

        // State variables
        let expenses = [];
        let isEditing = false;
        let currentEditId = null;
        let currentFilter = "all";

        // Initialize the application
        init();

        // Initialize the app - load data from localStorage
        function init() {
          loadExpensesFromStorage();
          renderExpenses();
          updateTotalAmount();
          updateAnalytics();
          setupEventListeners();
        }

        // Set up event listeners
        function setupEventListeners() {
          // Filter buttons
          filterButtons.forEach((button) => {
            button.addEventListener("click", function () {
              // Update active state
              filterButtons.forEach((btn) => btn.classList.remove("active"));
              this.classList.add("active");

              // Set current filter
              currentFilter = this.getAttribute("data-category");

              // Re-render expenses with filter
              renderExpenses();
            });
          });
        }

        // Load expenses from localStorage
        function loadExpensesFromStorage() {
          const storedExpenses = localStorage.getItem("expenses");
          if (storedExpenses) {
            expenses = JSON.parse(storedExpenses);
          }
        }

        // Save expenses to localStorage
        function saveExpensesToStorage() {
          localStorage.setItem("expenses", JSON.stringify(expenses));
        }

        // Form submission handler
        expenseForm.addEventListener("submit", function (e) {
          e.preventDefault();

          // Get form values
          const name = expenseNameInput.value.trim();
          const amount = parseFloat(expenseAmountInput.value);
          const category = expenseCategorySelect.value;

          // Validate inputs
          if (!name || !amount || amount <= 0 || !category) {
            alert("Please fill all fields with valid values");
            return;
          }

          if (isEditing) {
            // Update existing expense
            updateExpense(currentEditId, name, amount, category);
          } else {
            // Create new expense
            addExpense(name, amount, category);
          }

          // Reset form
          resetForm();
        });

        // CREATE: Add a new expense
        function addExpense(name, amount, category) {
          const newExpense = {
            id: Date.now(), // Simple ID generation
            name,
            amount,
            category,
            date: new Date().toISOString().split("T")[0], // YYYY-MM-DD format
          };

          expenses.push(newExpense);
          saveExpensesToStorage();
          renderExpenses();
          updateTotalAmount();
          updateAnalytics();
        }

        // READ: Render all expenses in the table (with filtering)
        function renderExpenses() {
          // Filter expenses based on current filter
          const filteredExpenses =
            currentFilter === "all"
              ? expenses
              : expenses.filter(
                  (expense) => expense.category === currentFilter
                );

          if (filteredExpenses.length === 0) {
            expenseTableBody.innerHTML = "";
            emptyState.style.display = "block";
            return;
          }

          emptyState.style.display = "none";

          expenseTableBody.innerHTML = filteredExpenses
            .map(
              (expense) => `
                    <tr>
                        <td>${expense.name}</td>
                        <td>
                            <span class="category-badge category-${expense.category.toLowerCase()}">
                                ${expense.category}
                            </span>
                        </td>
                        <td>$${expense.amount.toFixed(2)}</td>
                        <td>${formatDate(expense.date)}</td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-sm btn-edit" onclick="editExpense(${
                                  expense.id
                                })">
                                    <i class="fas fa-edit me-1"></i> Edit
                                </button>
                                <button class="btn btn-sm btn-delete" onclick="deleteExpense(${
                                  expense.id
                                })">
                                    <i class="fas fa-trash me-1"></i> Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                `
            )
            .join("");
        }

        // UPDATE: Prepare the form for editing an expense
        function editExpense(id) {
          // Find the expense to edit
          const expenseToEdit = expenses.find((expense) => expense.id === id);

          if (expenseToEdit) {
            // Fill the form with the expense data
            expenseNameInput.value = expenseToEdit.name;
            expenseAmountInput.value = expenseToEdit.amount;
            expenseCategorySelect.value = expenseToEdit.category;

            // Change the form to edit mode
            isEditing = true;
            currentEditId = id;
            submitBtn.innerHTML =
              '<i class="fas fa-save me-1"></i> Update Expense';
            submitBtn.classList.add("btn-update");

            // Scroll to the form
            expenseForm.scrollIntoView({ behavior: "smooth" });
          }
        }

        // UPDATE: Save the edited expense
        function updateExpense(id, name, amount, category) {
          // Find the index of the expense to update
          const expenseIndex = expenses.findIndex(
            (expense) => expense.id === id
          );

          if (expenseIndex !== -1) {
            // Update the expense
            expenses[expenseIndex] = {
              ...expenses[expenseIndex],
              name,
              amount,
              category,
            };

            // Save to localStorage and re-render
            saveExpensesToStorage();
            renderExpenses();
            updateTotalAmount();
            updateAnalytics();

            // Reset edit mode
            isEditing = false;
            currentEditId = null;
            submitBtn.innerHTML =
              '<i class="fas fa-plus me-1"></i> Add Expense';
            submitBtn.classList.remove("btn-update");
          }
        }

        // DELETE: Remove an expense
        function deleteExpense(id) {
          if (confirm("Are you sure you want to delete this expense?")) {
            // Filter out the expense to delete
            expenses = expenses.filter((expense) => expense.id !== id);

            // Save to localStorage and re-render
            saveExpensesToStorage();
            renderExpenses();
            updateTotalAmount();
            updateAnalytics();

            // If we were editing this expense, reset the form
            if (isEditing && currentEditId === id) {
              resetForm();
            }
          }
        }

        // Calculate and display the total amount
        function updateTotalAmount() {
          const total = expenses.reduce(
            (sum, expense) => sum + expense.amount,
            0
          );
          totalAmountElement.textContent = total.toFixed(2);
        }

        // Update analytics and charts
        function updateAnalytics() {
          // Update basic stats
          expensesCountElement.textContent = expenses.length;

          const average =
            expenses.length > 0
              ? expenses.reduce((sum, expense) => sum + expense.amount, 0) /
                expenses.length
              : 0;
          averageExpenseElement.textContent = average.toFixed(2);

          // Find highest spending category
          if (expenses.length > 0) {
            const categoryTotals = {};
            expenses.forEach((expense) => {
              categoryTotals[expense.category] =
                (categoryTotals[expense.category] || 0) + expense.amount;
            });

            const highestCategory = Object.keys(categoryTotals).reduce((a, b) =>
              categoryTotals[a] > categoryTotals[b] ? a : b
            );
            highestCategoryElement.textContent = highestCategory;
          } else {
            highestCategoryElement.textContent = "-";
          }

          updateChart();
        }

        function updateChart() {
          const ctx = document.getElementById("expenseChart").getContext("2d");

          const categories = ["Food", "Transport", "Entertainment", "Bills"];
          const categoryTotals = {};

          categories.forEach((category) => {
            categoryTotals[category] = expenses
              .filter((expense) => expense.category === category)
              .reduce((sum, expense) => sum + expense.amount, 0);
          });

          if (expenseChart) {
            expenseChart.destroy();
          }

          expenseChart = new Chart(ctx, {
            type: "doughnut",
            data: {
              labels: categories,
              datasets: [
                {
                  data: categories.map((category) => categoryTotals[category]),
                  backgroundColor: [
                    "rgba(40, 167, 69, 0.7)",
                    "rgba(23, 162, 184, 0.7)",
                    "rgba(255, 193, 7, 0.7)",
                    "rgba(220, 53, 69, 0.7)",
                  ],
                  borderColor: [
                    "rgba(40, 167, 69, 1)",
                    "rgba(23, 162, 184, 1)",
                    "rgba(255, 193, 7, 1)",
                    "rgba(220, 53, 69, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    color: "white",
                    font: {
                      size: 12,
                    },
                  },
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const label = context.label || "";
                      const value = context.raw || 0;
                      const total = context.dataset.data.reduce(
                        (a, b) => a + b,
                        0
                      );
                      const percentage =
                        total > 0 ? Math.round((value / total) * 100) : 0;
                      return `${label}: $${value.toFixed(2)} (${percentage}%)`;
                    },
                  },
                },
              },
            },
          });
        }

        function formatDate(dateString) {
          const options = { year: "numeric", month: "short", day: "numeric" };
          return new Date(dateString).toLocaleDateString(undefined, options);
        }

        function resetForm() {
          expenseForm.reset();
          isEditing = false;
          currentEditId = null;
          submitBtn.innerHTML = '<i class="fas fa-plus me-1"></i> Add Expense';
          submitBtn.classList.remove("btn-update");
        }

        window.editExpense = editExpense;
        window.deleteExpense = deleteExpense;
      });