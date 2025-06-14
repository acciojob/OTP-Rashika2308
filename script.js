document.addEventListener('DOMContentLoaded', () => {
    const codes = document.querySelectorAll('.code');
    
    codes[0].focus();
    
    codes.forEach((code, idx) => {
        code.addEventListener('input', (e) => {
            if (e.target.value.length === 1) {
                if (idx < codes.length - 1) {
                    setTimeout(() => codes[idx + 1].focus(), 10);
                }
            }
        });
        
        code.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                if (e.target.value.length === 0) {
                    // Move to previous field if current is empty
                    if (idx > 0) {
                        setTimeout(() => {
                            codes[idx - 1].focus();
                            codes[idx - 1].value = '';
                        }, 10);
                    }
                } else {
                    e.target.value = '';
                }
            }
            
            if (e.key !== 'Backspace' && (e.key < '0' || e.key > '9')) {
                e.preventDefault();
            }
        });
        
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
