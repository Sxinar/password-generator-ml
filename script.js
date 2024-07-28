document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const flagToggle = document.getElementById('flagToggle');
    const copyIcon = document.getElementById('copyIcon');
    const lengthInput = document.getElementById('length');
    const themeStylesheet = document.getElementById('themeStylesheet');
    let currentLang = 'en';

    // Default length value and password display
    lengthInput.value = 0;
    updateLengthValue(0);
    document.getElementById('passwordDisplay').innerText = 'Your password will appear here';

    darkModeToggle.addEventListener('click', () => {
        if (themeStylesheet.getAttribute('href') === 'styles.css') {
            themeStylesheet.setAttribute('href', 'darkmode.css');
        } else {
            themeStylesheet.setAttribute('href', 'styles.css');
        }
    });

    flagToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'tr' : 'en';
        setLanguage(currentLang);
        updateFlagIcon(currentLang);
    });

    copyIcon.addEventListener('click', () => {
        const passwordDisplay = document.getElementById('passwordDisplay');
        const password = passwordDisplay.innerText;
        if (password) {
            navigator.clipboard.writeText(password)
                .then(() => {
                    alert('Password copied to clipboard!');
                })
                .catch(err => {
                    alert('Failed to copy password: ', err);
                });
        }
    });

    lengthInput.addEventListener('input', () => {
        updateLengthValue(lengthInput.value);
        generatePassword();
    });

    document.querySelectorAll('.options input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            generatePassword();
        });
    });
});

function generatePassword() {
    const uppercase = document.getElementById('uppercase').checked;
    const lowercase = document.getElementById('lowercase').checked;
    const numbers = document.getElementById('numbers').checked;
    const symbols = document.getElementById('symbols').checked;
    const length = parseInt(document.getElementById('length').value);
    
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let allChars = '';
    if (uppercase) allChars += upperChars;
    if (lowercase) allChars += lowerChars;
    if (numbers) allChars += numberChars;
    if (symbols) allChars += symbolChars;

    if (allChars === '') {
        document.getElementById('passwordDisplay').innerText = 'Please select at least one option.';
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    document.getElementById('passwordDisplay').innerText = password;
}

function updateLengthValue(value) {
    document.getElementById('lengthValue').innerText = value;
}

function setLanguage(lang) {
    const elements = {
        title: {
            en: 'Strong Password Generator',
            tr: 'Güçlü Şifre Oluşturucu'
        },
        uppercaseLabel: {
            en: 'Uppercase Letters (A-Z)',
            tr: 'Büyük Harfler (A-Z)'
        },
        lowercaseLabel: {
            en: 'Lowercase Letters (a-z)',
            tr: 'Küçük Harfler (a-z)'
        },
        numbersLabel: {
            en: 'Numbers (0-9)',
            tr: 'Sayılar (0-9)'
        },
        symbolsLabel: {
            en: 'Symbols (!@#$%^&*)',
            tr: 'Semboller (!@#$%^&*)'
        },
        lengthLabel: {
            en: 'Length:',
            tr: 'Uzunluk:'
        },
        generateButton: {
            en: 'Generate Password',
            tr: 'Şifre Oluştur'
        },
        passwordDisplay: {
            en: 'Your password will appear here',
            tr: 'Şifreniz burada görünecek'
        }
    };

    for (let id in elements) {
        document.getElementById(id).innerText = elements[id][lang];
    }
}

function updateFlagIcon(lang) {
    const flagIcon = document.getElementById('flagToggle').querySelector('img');
    flagIcon.src = lang === 'en' ? 'flag-en.png' : 'flag-tr.png';
    flagIcon.alt = lang === 'en' ? 'English' : 'Türkçe';
}
