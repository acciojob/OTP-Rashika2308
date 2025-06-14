document.addEventListener('DOMContentLoaded', () => {
    const codes = Array.from(document.querySelectorAll('.code'));
    
    // Focus the first input on page load
    codes[0].focus();
    
    codes.forEach((code, idx) => {
        // Handle number input
        code.addEventListener('input', (e) => {
            if (e.target.value.length > 1) {
                e.target.value = e.target.value.slice(0, 1);
            }
            
            if (e.target.value.length === 1 && idx < codes.length - 1) {
                codes[idx + 1].focus();
            }
        });
        
        // Handle backspace
        code.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                if (e.target.value.length === 0 && idx > 0) {
                    setTimeout(() => {
                        codes[idx - 1].focus();
                        codes[idx - 1].value = '';
                    }, 10);
                }
            }
            
            // Prevent non-numeric input
            if (e.key !== 'Backspace' && (e.key < '0' || e.key > '9')) {
                e.preventDefault();
            }
        });
        
        // Handle paste event for OTP
        code.addEventListener('paste', (e) => {
            e.preventDefault();
            const pasteData = e.clipboardData.getData('text').trim();
            if (/^\d{6}$/.test(pasteData)) {
                pasteData.split('').forEach((char, i) => {
                    if (codes[i]) {
                        codes[i].value = char;
                    }
                });
                codes[codes.length - 1].focus();
            }
        });
    });
});