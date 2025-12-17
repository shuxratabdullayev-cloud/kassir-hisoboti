import { creditAccounts } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const creditSelect = document.getElementById('creditAccount');

    // Populate Credit Accounts
    creditAccounts.forEach(acc => {
        const option = document.createElement('option');
        option.value = acc.code;
        option.textContent = `${acc.code} - ${acc.name}`;
        creditSelect.appendChild(option);
    });

    // Elements to bind
    const bindings = [
        { source: 'orderNum', target: 'receiptNumDisplay' },
        { source: 'docDate', target: 'receiptDateDisplay' },
        { source: 'payer', target: 'receiptPayer' },
        { source: 'basis', target: 'receiptBasis' },
        { source: 'amount', target: 'receiptAmount' }
    ];

    // Event Listeners for real-time update
    bindings.forEach(bind => {
        const sourceEl = document.getElementById(bind.source);
        const targetEl = document.getElementById(bind.target);

        if (sourceEl) {
            sourceEl.addEventListener('input', () => {
                targetEl.textContent = sourceEl.value;
                if (bind.source === 'amount') {
                    updateAmountText(sourceEl.value);
                }
            });
        }
    });

    // Initialize date
    document.getElementById('docDate').valueAsDate = new Date();
    document.getElementById('receiptDateDisplay').textContent = new Date().toLocaleDateString('uz-UZ');
});

function updateAmountText(value) {
    const amountTextEl = document.getElementById('amountText');
    if (!value) {
        amountTextEl.value = '';
        return;
    }
    // Simple mock function for number to words in Uzbek (Educational purpose)
    // In a full app, this would be a comprehensive function.
    amountTextEl.value = `${value} so'm`;
}
