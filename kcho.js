import { debitAccounts } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const debitSelect = document.getElementById('debitAccount');

    // Populate Debit Accounts
    debitAccounts.forEach(acc => {
        const option = document.createElement('option');
        option.value = acc.code;
        option.textContent = `${acc.code} - ${acc.name}`;
        debitSelect.appendChild(option);
    });

    // Initialize date
    document.getElementById('docDate').valueAsDate = new Date();

    // Amount to Text handler
    document.getElementById('amount').addEventListener('input', (e) => {
        const val = e.target.value;
        const textEl = document.getElementById('amountText');
        textEl.value = val ? `${val} so'm` : '';
    });
});
