<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="<?= BASEURL; ?>/css/styles.css">
    <style>
        .toggle-password {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 18px;
    color: #555;
}

        body {
            font-family: Arial, sans-serif;
            background-color: #000;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .login-container {
            background: #fff;
            padding: 20px 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
        }

        .login-container h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-label {
            display: block;
            margin-bottom: 5px;
            color: #555;
        }

        .form-input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
        }

        .form-button {
            width: 100%;
            padding: 10px;
            background-color: #e07b39;
            border: none;
            border-radius: 5px;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
        }

        .form-button:hover {
            background-color: #ce5d12;
        }

        .form-link {
            display: block;
            text-align: center;
            margin-top: 10px;
            font-size: 14px;
            color: #ff6600;
            text-decoration: none;
        }

        .form-link:hover {
            text-decoration: underline;
        }

        .error-message {
            color: red;
            text-align: center;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>Register</h2>
        <?php if (isset($_SESSION['error'])): ?>
            <div class="error-message">
                <?= $_SESSION['error']; unset($_SESSION['error']); ?>
            </div>
        <?php endif; ?>
        <form action="<?= BASEURL; ?>/login/store" method="POST">
            <div class="form-group">
                <label for="username" class="form-label">Username</label>
                <input type="text" id="username" name="username" class="form-input" placeholder="Masukkan username" required>
            </div>
            <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" name="email" class="form-input" placeholder="Masukkan email" required>
            </div>
            <div class="form-group">
    <label for="password" class="form-label">Password</label>
    <div style="position: relative;">
        <input type="password" id="password" name="password" class="form-input" placeholder="Masukkan password" required>
        <span onclick="togglePassword('password')" class="toggle-password">👁️</span>
    </div>
</div>

            <button type="submit" class="form-button">Register</button>
        </form>
        <a href="<?= BASEURL; ?>/login" class="form-link">Sudah punya akun? Login di sini</a>
    </div>
</body>
</html>

    <script>
    function togglePassword(inputId) {
        var passwordInput = document.getElementById(inputId);
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    }
</script>

