const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const verificationForm = document.getElementById('verification-form');
const imageGrid = document.getElementById('image-grid');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const email = document.getElementById('register-email').value;

    const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
    });

    const data = await response.json();
    document.getElementById('register-message').textContent = data.message;
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    document.getElementById('login-message').textContent = data.message;

    if (data.message === 'Login successful!') {
        document.getElementById('verification-container').style.display = 'block';
    }
});

verificationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('verification-username').value;
    const code = document.getElementById('verification-code').value;

    const response = await fetch('http://localhost:5000/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, code }),
    });

    const data = await response.json();
    document.getElementById('verification-message').textContent = data.message;

    if (data.message === 'Email verified successfully!') {
        document.getElementById('graphical-password-container').style.display = 'block';
        loadImages();
    }
});

// Load images for the graphical password
function loadImages() {
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg', 'image6.jpg', 'image7.jpg', 'image8.jpg', 'image9.jpg', 'image10.jpg', 'image11.jpg', 'image12.jpg', 'image13.jpg', 'image14.jpg', 'image15.jpg', 'image16.jpg'];

    images.forEach((image, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = `images/${image}`;
        imgElement.alt = `Image ${index + 1}`;
        imgElement.addEventListener('click', () => {
            imgElement.classList.toggle('selected');
        });
        imageGrid.appendChild(imgElement);
    });
}
