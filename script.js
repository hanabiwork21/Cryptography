function caesarCipher(str, shift) {
    return str.split('').map(char => {
        let code = char.charCodeAt(0);
        if (char.match(/[a-z]/i)) {
            let shiftBase = char >= 'a' ? 97 : 65;
            return String.fromCharCode(((code - shiftBase + shift) % 26 + 26) % 26 + shiftBase);
        }
        return char;
    }).join('');
}

// XOR Cipher
function xorCipher(str, key) {
    let keyIndex = 0;
    return str.split('').map(char => {
        let xorCode = char.charCodeAt(0) ^ key.charCodeAt(keyIndex % key.length);
        keyIndex++;
        return String.fromCharCode(xorCode);
    }).join('');
}

// Encrypt Function (Caesar → XOR)
function encrypt() {
    let text = document.getElementById("inputText").value;
    let shift = parseInt(document.getElementById("shiftKey").value);
    let xorKey = document.getElementById("xorKey").value;

    if (!xorKey) {
        alert("Please enter an XOR key.");
        return;
    }

    let caesarEncrypted = caesarCipher(text, shift);
    let finalEncrypted = xorCipher(caesarEncrypted, xorKey);

    document.getElementById("outputText").value = btoa(finalEncrypted);
}

// Decrypt Function (XOR → Caesar) with Secret Words Check
function decrypt() {
    let userSecretWords = prompt("Enter the secret words:");
    let correctSecretWords = "apple banana cherry dragon elephant fox grape";

    if (!userSecretWords || userSecretWords.trim() !== correctSecretWords) {
        alert("Incorrect secret words! Decryption aborted.");
        return;
    }

    let encryptedText = document.getElementById("outputText").value;

    try {
        let decodedText = atob(encryptedText);
        let shift = parseInt(document.getElementById("shiftKey").value);
        let xorKey = document.getElementById("xorKey").value;

        if (!xorKey) {
            alert("Please enter an XOR key.");
            return;
        }

        let xorDecrypted = xorCipher(decodedText, xorKey);
        let finalDecrypted = caesarCipher(xorDecrypted, -shift);

        document.getElementById("outputText").value = finalDecrypted;
        alert("Decryption successful!");
    } catch (error) {
        alert("Invalid encrypted text! Please ensure you have the correct input.");
    }
}
