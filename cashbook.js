
document.addEventListener('DOMContentLoaded', () => {
    // Set today's date
    document.getElementById('reportDate').valueAsDate = new Date();

    const startBalanceInput = document.getElementById('startBalance');
    const tableBody = document.querySelector('#cashTable tbody');
    const addIncomeBtn = document.getElementById('addIncomeBtn');
    const addExpenseBtn = document.getElementById('addExpenseBtn');

    let rowCount = 0;

    function updateCalculations() {
        const startBalance = parseFloat(startBalanceInput.value) || 0;
        let totalIncome = 0;
        let totalExpense = 0;

        // Sum up inputs
        document.querySelectorAll('.income-input').forEach(input => {
            totalIncome += parseFloat(input.value) || 0;
        });
        document.querySelectorAll('.expense-input').forEach(input => {
            totalExpense += parseFloat(input.value) || 0;
        });

        // Update footer display
        document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
        document.getElementById('totalExpense').textContent = totalExpense.toFixed(2);

        const endBalance = startBalance + totalIncome - totalExpense;
        document.getElementById('endBalance').textContent = endBalance.toFixed(2);
    }

    function addRow(type) {
        rowCount++;
        const tr = document.createElement('tr');

        // Income or Expense input field logic
        const incomeField = type === 'income'
            ? `<input type="number" class="income-input" placeholder="0.00" oninput="this.dispatchEvent(new Event('change', {bubbles: true}))">`
            : '';
        const expenseField = type === 'expense'
            ? `<input type="number" class="expense-input" placeholder="0.00" oninput="this.dispatchEvent(new Event('change', {bubbles: true}))">`
            : '';

        tr.innerHTML = `
            <td>${rowCount}</td>
            <td><input type="text" style="width: 50px;" placeholder="№"></td>
            <td><input type="text" style="width: 100%;" placeholder="Izoh"></td>
            <td><input type="text" style="width: 50px;" placeholder="Schyot"></td>
            <td>${incomeField}</td>
            <td>${expenseField}</td>
            <td class="no-print"><button onclick="this.closest('tr').remove();" style="color: red; cursor:pointer;">x</button></td>
        `;

        tableBody.appendChild(tr);

        // Add event listeners to new inputs for calculation updates
        tr.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('input', updateCalculations);
            // Also trigger update immediately if we want empty 0s (but placeholders handle that visually)
        });

        // If removing row, we need to update calculations. 
        // The onclick handler above removes the element, but we need to hook into mutation or just add a global listener for removal?
        // Simpler: The button onclick is inline. Let's make it cleaner.
        const removeBtn = tr.querySelector('button');
        removeBtn.onclick = function () {
            tr.remove();
            updateCalculations();
        };
    }

    addIncomeBtn.addEventListener('click', () => addRow('income'));
    addExpenseBtn.addEventListener('click', () => addRow('expense'));
    startBalanceInput.addEventListener('input', updateCalculations);

    // Initial calculation
    updateCalculations();
});
