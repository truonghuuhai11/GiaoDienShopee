// Handle quantity buttons
document.querySelectorAll('.quantity-control').forEach(control => {
    const input = control.querySelector('.quantity-input');
    const decrementBtn = control.querySelector('.quantity-btn:first-child');
    const incrementBtn = control.querySelector('.quantity-btn:last-child');

    decrementBtn.addEventListener('click', () => {
        if (input.value > 1) {
            input.value = parseInt(input.value) - 1;
            updateCartTotal();
        }
    });

    incrementBtn.addEventListener('click', () => {
        input.value = parseInt(input.value) + 1;
        updateCartTotal();
    });

    input.addEventListener('change', () => {
        if (input.value < 1) input.value = 1;
        updateCartTotal();
    });
});

// Handle checkboxes
const selectAllCheckbox = document.querySelector('.select-all-checkbox');
const itemCheckboxes = document.querySelectorAll('.cart-item-checkbox');

selectAllCheckbox.addEventListener('change', () => {
    itemCheckboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
    updateCartTotal();
});

itemCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const allChecked = Array.from(itemCheckboxes).every(cb => cb.checked);
        selectAllCheckbox.checked = allChecked;
        updateCartTotal();
    });
});

// Update cart total
function updateCartTotal() {
    let total = 0;
    document.querySelectorAll('.cart-item').forEach(item => {
        const checkbox = item.querySelector('.cart-item-checkbox');
        if (checkbox.checked) {
            const price = parseFloat(item.querySelector('.price').dataset.price);
            const quantity = parseInt(item.querySelector('.quantity-input').value);
            total += price * quantity;
        }
    });
    
    document.querySelector('.summary-total .price').textContent = `₫${total.toLocaleString()}`;
    
    // Update selected items count
    const selectedCount = Array.from(itemCheckboxes).filter(cb => cb.checked).length;
    document.querySelector('.selected-count').textContent = selectedCount;
}

// Voucher modal
const voucherButton = document.querySelector('.voucher-button');
const voucherModal = document.querySelector('.voucher-modal');
const closeVoucherModal = document.querySelector('.close-voucher-modal');

voucherButton.addEventListener('click', () => {
    voucherModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeVoucherModal.addEventListener('click', () => {
    voucherModal.classList.remove('active');
    document.body.style.overflow = '';
});

voucherModal.addEventListener('click', (e) => {
    if (e.target === voucherModal) {
        voucherModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Handle voucher selection
document.querySelectorAll('.voucher-item').forEach(item => {
    item.addEventListener('click', () => {
        const voucherCode = item.dataset.code;
        const voucherDiscount = parseFloat(item.dataset.discount);
        
        // Update selected voucher display
        document.querySelector('.selected-voucher').textContent = voucherCode;
        
        // Apply discount
        updateCartTotal();
        
        // Close modal
        voucherModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}); 