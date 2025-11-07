// ================== ORIGINAL CRUDS ELEMENTS ==================
let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let adds = document.getElementById("adds");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let table = document.querySelector("tbody");
let search = document.getElementById("search");
let sCategory = document.getElementById("sCategory");
let tCategory = document.getElementById("tCategory"); 

// ================== NEW FEATURE ELEMENTS ==================
// Login & Create Account (Elements must exist in index.html)
const loginContainer = document.getElementById("login-container");
const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("login-error");
const showCreateAccount = document.getElementById("show-create-account");

const createAccountContainer = document.getElementById("create-account-container");
const createAccountForm = document.getElementById("create-account-form");
const newUsernameInput = document.getElementById("new-username");
const newPasswordInput = document.getElementById("new-password");
const confirmPasswordInput = document.getElementById("confirm-password");
const createAccountError = document.getElementById("create-account-error");
const showLogin = document.getElementById("show-login");

// Main App & Navbar (Elements must exist in index.html)
const mainContainer = document.querySelector(".container");
const themeToggle = document.getElementById("theme-toggle");
const langToggle = document.getElementById("lang-toggle");
const logoutButton = document.getElementById("logout-button");
const welcomeMessage = document.getElementById("welcome-message");
const imageInput = document.getElementById("image");
const imgPreview = document.getElementById("img-preview");
const printButton = document.getElementById("print-button");

// ================== APP STATE ==================
let mode = "create"; 
let searchMode = "title";
let tmp; 
let currentUser = null; // <-- Stores the currently logged-in user's name

// --- START CHANGE 1: New Product Storage Structure ---
let allProductsData = localStorage.getItem("allProductsData") 
    ? JSON.parse(localStorage.getItem("allProductsData")) 
    : {};

// 'products' now only holds the list for the current user
let products = [];
// --- END CHANGE 1 ---

let users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : []; // <-- New array for storing registered users

// ================== TRANSLATIONS (English and Arabic Only) ==================
const translations = {
    en: {
        "nav-brand": "CRUD App",
        "welcome-user": "Welcome,",
        "ph-username": "Username",
        "ph-password": "Password",
        "ph-confirm-password": "Confirm Password",
        "login-title": "Login",
        "login-btn": "Login",
        "login-error-msg": "Invalid username or password",
        "show-create-account": "Don't have an account? Create one",
        "create-account-title": "Create Account",
        "create-account-btn": "Create Account",
        "show-login": "Already have an account? Login",
        "error-password-match": "Passwords do not match",
        "error-username-taken": "Username is already taken",
        "success-account-created": "Account created! Please log in.",
        "crud-title": "Your products management system",
        "print-button": "Print Table",
        "logout-btn": "Logout",
        "btn-upload-image": "<i class='fa-solid fa-upload'></i> Upload Image",
        "ph-name": "Name",
        "ph-price": "Price",
        "ph-tax": "Tax",
        "ph-adds": "Adds",
        "ph-discount": "Discount",
        "ph-count": "Count",
        "ph-category": "Category",
        "btn-create": "Create",
        "btn-update": "Update",
        "ph-search": "Search",
        "ph-search-title": "Search by Name",
        "ph-search-category": "Search by Category",
        "btn-s-category": "Search by Category",
        "btn-s-title": "Search by Name",
        "btn-delete-all": "Delete All",
        "th-id": "ID",
        "th-image": "Image",
        "th-title": "Title",
        "th-price": "Price",
        "th-tax": "Tax",
        "th-adds": "Adds",
        "th-discount": "Discount",
        "th-total": "Total",
        "th-category": "Category",
        "th-update": "Update",
        "th-delete": "Delete",
        "theme-toggle-light": "☀️",
        "theme-toggle-dark": "🌙",
        "lang-toggle-en": "العربية", 
        "lang-toggle-ar": "English", 
        "alert-success": "Operation successful 🎉",
        "alert-danger": "An error occurred ❌",
        "alert-warning": "Please check the data ⚠️",
        "alert-info": "This is just information ℹ️",
        "alert-confirm-delete-all": "Are you sure you want to delete all products?",
        "alert-validation-fail": "Please fill all fields and check count (1-100)",
        "no-products-to-print": "No products to print"
    },
    ar: { 
        "nav-brand": "تطبيق CRUD",
        "welcome-user": "أهلاً وسهلاً،",
        "ph-username": "اسم المستخدم",
        "ph-password": "كلمة المرور",
        "ph-confirm-password": "تأكيد كلمة المرور",
        "login-title": "تسجيل الدخول",
        "login-btn": "دخول",
        "print-button": "طباعة الجدول",
        "login-error-msg": "اسم المستخدم أو كلمة المرور غير صحيحة",
        "show-create-account": "ليس لديك حساب؟ قم بإنشاء حساب",
        "create-account-title": "إنشاء حساب",
        "create-account-btn": "إنشاء حساب",
        "show-login": "هل لديك حساب بالفعل؟ تسجيل الدخول",
        "error-password-match": "كلمتا المرور غير متطابقتين",
        "error-username-taken": "اسم المستخدم محجوز بالفعل",
        "success-account-created": "تم إنشاء الحساب! يرجى تسجيل الدخول.",
        "crud-title": "نظام إدارة المنتجات الخاص بك",
        "crud-subtitle": "إنشاء قراءة تحديث حذف",
        "logout-btn": "تسجيل الخروج",
        "btn-upload-image": "<i class='fa-solid fa-upload'></i> تحميل صورة",
        "ph-name": "الاسم",
        "ph-price": "السعر",
        "ph-tax": "الضرائب",
        "ph-adds": "الإضافات",
        "ph-discount": "الخصم",
        "ph-count": "الكمية",
        "ph-category": "الفئة",
        "btn-create": "إنشاء",
        "btn-update": "تحديث",
        "ph-search": "بحث",
        "ph-search-title": "البحث بالاسم",
        "ph-search-category": "البحث بالفئة",
        "btn-s-category": "البحث بالفئة",
        "btn-s-title": "البحث بالاسم",
        "btn-delete-all": "حذف الكل",
        "th-id": "المعرّف",
        "th-image": "صورة",
        "th-title": "الاسم",
        "th-price": "السعر",
        "th-tax": "الضرائب",
        "th-adds": "الإضافات",
        "th-discount": "الخصم",
        "th-total": "الإجمالي",
        "th-category": "الفئة",
        "th-update": "تحديث",
        "th-delete": "حذف",
        "theme-toggle-light": "☀️",
        "theme-toggle-dark": "🌙",
        "lang-toggle-en": "الإنجليزية", 
        "lang-toggle-ar": "العربية", 
        "alert-success": "تمت العملية بنجاح 🎉",
        "alert-danger": "حدث خطأ ❌",
        "alert-warning": "يرجى مراجعة البيانات ⚠️",
        "alert-info": "هذه مجرد معلومات ℹ️",
        "alert-confirm-delete-all": "هل أنت متأكد من حذف جميع المنتجات؟",
        "alert-validation-fail": "يرجى ملء جميع الحقول والتحقق من الكمية (1-100)",
        "no-products-to-print": "لا توجد منتجات للطباعة"
    }
};

// ================== LANGUAGE AND THEME STATE (from localStorage) ==================
let currentLang = localStorage.getItem("language") || "en";
let currentTheme = localStorage.getItem("theme") || "dark";

// ================== ALERT FUNCTION (for user feedback) ==================
function showAlert(type, messageKey) {
    const container = document.getElementById('alertsContainer');
    if (!container) return; 

    const alert = document.createElement('div');
    alert.classList.add('alert' , type , 'show');

    let icon = '';
    // Ensure the message is translated, fallback to key if not found
    let message = translations[currentLang][messageKey] || messageKey; 

    switch(type) {
        case 'success':
            icon = '<i class="fa-solid fa-check"></i>';
            if (!messageKey || !translations.en[messageKey]) message = translations[currentLang]["alert-success"];
            break;
        case 'danger':
            icon = '<i class="fa-solid fa-xmark"></i>';
            if (!messageKey || !translations.en[messageKey]) message = translations[currentLang]["alert-danger"];
            break;
        case 'warning':
            icon = '<i class="fa-solid fa-triangle-exclamation"></i>';
            if (!messageKey || !translations.en[messageKey]) message = translations[currentLang]["alert-warning"];
            break;
        case 'info':
            icon = '<i class="fa-solid fa-circle-info"></i>';
            if (!messageKey || !translations.en[messageKey]) message = translations[currentLang]["alert-info"];
            break;
    }
    
    // Check if the message is a translation key for better fallback handling
    if (messageKey && translations[currentLang][messageKey]) {
        message = translations[currentLang][messageKey];
    }


    alert.innerHTML = `
        <div class="sign">${icon}</div>
        <div class="msg">${message}</div>
        <div class="closeIcon"><i class="fa-solid fa-xmark"></i></div>
    `;

    container.appendChild(alert);

    // Auto-close after 4 seconds
    const timer = setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 500);
    }, 4000);

    // Manual close
    alert.querySelector('.closeIcon').addEventListener('click', () => {
        clearTimeout(timer); 
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 500);
    });
}


// ================== LOGIN / CREATE ACCOUNT LOGIC ==================

// Toggle forms
if (showCreateAccount && showLogin) {
    showCreateAccount.addEventListener("click", (e) => {
        e.preventDefault();
        loginContainer.style.display = "none";
        createAccountContainer.style.display = "block";
        loginError.textContent = ""; // Clear errors when switching
        setLanguage(currentLang); 
    });

    showLogin.addEventListener("click", (e) => {
        e.preventDefault();
        createAccountContainer.style.display = "none";
        loginContainer.style.display = "block";
        createAccountError.textContent = ""; // Clear errors when switching
        setLanguage(currentLang); 
    });
}

// Create Account Logic
if (createAccountForm) {
    createAccountForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = newUsernameInput.value.trim();
        const password = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        createAccountError.textContent = "";

        if (!username || !password || !confirmPassword) {
            createAccountError.textContent = translations[currentLang]["alert-validation-fail"];
            showAlert('warning', 'alert-validation-fail');
            return;
        }

        if (password !== confirmPassword) {
            createAccountError.textContent = translations[currentLang]["error-password-match"];
            showAlert('danger', 'error-password-match');
            return;
        }
        
        const userExists = users.find(user => user.username.toLowerCase() === username.toLowerCase());
        if (userExists) {
            createAccountError.textContent = translations[currentLang]["error-username-taken"];
            showAlert('danger', 'error-username-taken');
            return;
        }

        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));

        showAlert('success', 'success-account-created');
        newUsernameInput.value = "";
        newPasswordInput.value = "";
        confirmPasswordInput.value = "";
        
        // Switch to login form and pre-fill username
        createAccountContainer.style.display = "none";
        loginContainer.style.display = "block";
        usernameInput.value = username; 
        passwordInput.value = "";
        setLanguage(currentLang);
    });
}

// Login Logic
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        loginError.textContent = "";

        if (!username || !password) {
            loginError.textContent = translations[currentLang]["alert-validation-fail"];
            showAlert('warning', 'alert-validation-fail');
            return;
        }

        // Default Admin Account (for initial testing)
        const isAdmin = (username.toLowerCase() === "admin" && password === "123");
        // Check stored users (case-insensitive username check)
        const validUser = users.find(user => user.username.toLowerCase() === username.toLowerCase() && user.password === password);

        if (isAdmin || validUser) {
            currentUser = username; // Store the user's name
            
            // --- START CHANGE 2: Load User-Specific Products on Login ---
            if (!allProductsData[currentUser]) {
                allProductsData[currentUser] = []; // Initialize empty array if it's the first login
            }
            products = allProductsData[currentUser]; // Set the current products array to the user's data
            // --- END CHANGE 2 ---

            loginContainer.style.display = "none";
            createAccountContainer.style.display = "none";
            mainContainer.style.display = "block";
            loginError.textContent = "";
            usernameInput.value = "";
            passwordInput.value = "";
            initializeApp(); // Initialize the main app after successful login
            showAlert('success', 'alert-success');
        } else {
            loginError.textContent = translations[currentLang]["login-error-msg"];
            showAlert('danger', 'login-error-msg');
        }
    });
}

// Logout Logic
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        mainContainer.style.display = "none";
        loginContainer.style.display = "block";
        loginError.textContent = "";
        currentUser = null; // Clear the user
        products = []; // Clear the current products array
        // Ensure inputs are reset
        clearData();
        // Re-apply language/theme for the login screen
        applyTheme(currentTheme); 
        setLanguage(currentLang);
    });
}

// ================== APP INITIALIZATION ==================
function initializeApp() {
    // Check if user is logged in before setting up the main app components
    if (currentUser) {
        applyTheme(currentTheme);
        setLanguage(currentLang); // Sets welcome message and all text
        addData(); // Redraw table
        // Hide image preview initially if no image is present for update
        if (imgPreview) imgPreview.style.display = "none";
    }
}


// ================== THEME TOGGLE LOGIC ==================
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        currentTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
        applyTheme(currentTheme);
        // Ensure language-dependent theme toggle text is updated
        setLanguage(currentLang); 
    });
}

function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("theme", theme);
}

// ================== LANGUAGE TOGGLE LOGIC ==================
if (langToggle) {
    langToggle.addEventListener("click", () => {
        // Toggle between 'en' and 'ar'
        currentLang = (currentLang === "en") ? "ar" : "en";
        localStorage.setItem("language", currentLang);
        setLanguage(currentLang);
    });
}


function setLanguage(lang) {
    // 1. Set language direction for Arabic RTL support
    document.body.dir = (lang === 'ar') ? 'rtl' : 'ltr'; 

    // 2. Update text content
    document.querySelectorAll("[data-lang-key]").forEach(el => {
        const key = el.getAttribute("data-lang-key");
        const translation = translations[lang][key];
        if (translation) {
            if (el.placeholder !== undefined) {
                el.placeholder = translation;
            } else {
                el.innerHTML = translation;
            }
        }
    });

    // --- Update dynamic elements ---

    // 1. Welcome Message
    if (welcomeMessage && currentUser) {
        welcomeMessage.textContent = `${translations[lang]["welcome-user"]} ${currentUser}`;
    }

    // 2. Create/Update button
    if (create) {
        const createKey = (mode === "create") ? "btn-create" : "btn-update";
        create.innerHTML = translations[lang][createKey];
        create.setAttribute("data-lang-key", createKey);
    }
    
    // 3. Search placeholder
    if (search && search.placeholder !== undefined) {
        const searchKey = (searchMode === "title") ? "ph-search-title" : "ph-search-category";
        search.placeholder = translations[lang][searchKey];
    }
    
    // 4. Lang toggle button - uses the opposite language text
    if (langToggle) {
        // 'lang-toggle-en' is the text to show when current lang is EN (i.e., 'العربية')
        // 'lang-toggle-ar' is the text to show when current lang is AR (i.e., 'English')
        langToggle.innerHTML = (lang === 'en') ? translations['en']["lang-toggle-en"] : translations['ar']["lang-toggle-en"];
    }

    // 5. Theme toggle button
    const themeKey = (document.body.classList.contains("dark-mode")) ? "theme-toggle-light" : "theme-toggle-dark";
    if (themeToggle) themeToggle.textContent = translations[lang][themeKey];

    // 6. Redraw table for button text
    addData();
}


// ================== IMAGE PREVIEW & CONVERSION ==================
if (imageInput) {
    imageInput.addEventListener("change", () => {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                imgPreview.src = reader.result;
                imgPreview.style.display = "block"; // Show preview when image is selected
            };
            reader.readAsDataURL(file);
        } else {
            imgPreview.src = "";
            imgPreview.style.display = "none";
        }
    });
}


// ================== ORIGINAL CRUDS FUNCTIONS (Modified) ==================

function getTotal(){
    // Ensure all values are treated as numbers, defaulting to 0 if empty
    // Using unary plus (+) for conversion.
    const p = +price.value || 0;
    const t = +tax.value || 0;
    const a = +adds.value || 0;
    const d = +discount.value || 0;
    
    if(p > 0){
        let result = (p + t + a) - d;
        total.innerText = result.toFixed(2); // Display with 2 decimal places
    } else {
        total.innerText = 0;
    }
}

// Attach listeners safely
if (price) price.addEventListener('keyup', getTotal);
if (tax) tax.addEventListener('keyup', getTotal);
if (adds) adds.addEventListener('keyup', getTotal);
if (discount) discount.addEventListener('keyup', getTotal);
if (price) price.addEventListener('mouseup', getTotal);
if (tax) tax.addEventListener('mouseup', getTotal);
if (adds) adds.addEventListener('mouseup', getTotal);
if (discount) discount.addEventListener('mouseup', getTotal);


function clearData(){
    title.value = "";
    price.value = "";
    tax.value = "";
    adds.value = "";
    discount.value = "";
    category.value = "";
    total.innerText = 0;
    count.value = 1;
    count.style.display = "block";
    if (imageInput) imageInput.value = null; // Clear file input
    if (imgPreview) {
        imgPreview.src = "";
        imgPreview.style.display = "none"; // Hide preview after clearing
    }
}


if (create) {
    create.addEventListener("click", () => {
        
        // Basic validation check with trim()
        if(title.value.trim() === "" || price.value.trim() === "" || category.value.trim() === "" || +count.value < 1 || +count.value > 100){
            showAlert('warning', 'alert-validation-fail');
            return;
        }

        let newProduct = {
            title: title.value.trim(),
            price: price.value,
            tax: tax.value,
            adds: adds.value,
            discount: discount.value,
            total: total.textContent,
            count: count.value,
            category: category.value.trim(),
            image: imgPreview ? imgPreview.src : ""
        };
        
        if(mode === "create"){
            if (+newProduct.count > 1) {
                // Create multiple copies, but remove count property from the stored object
                const productToStore = {...newProduct};
                delete productToStore.count; 
                for (let x = 0; x < +newProduct.count; x++) {
                    products.push(productToStore);
                }
            } else {
                delete newProduct.count; // Single product
                products.push(newProduct);
            }
            showAlert('success', 'alert-success');
        } else { 
            delete newProduct.count; // Remove count property for update
            products[tmp] = newProduct;
            mode = "create";
            // Ensure button text and data-lang-key are reset
            create.innerHTML = translations[currentLang]["btn-create"];
            create.setAttribute("data-lang-key", "btn-create");
            count.style.display = "block";
            showAlert('success', 'alert-success');
        }
        clearData();
        
        // --- START CHANGE 3: Save User-Specific Products ---
        allProductsData[currentUser] = products; 
        localStorage.setItem("allProductsData", JSON.stringify(allProductsData));
        // --- END CHANGE 3 ---
        
        addData();
    });
}


function addData(){
    let tableElements = "";
    const updateText = translations[currentLang]["th-update"] || "Update";
    const deleteText = translations[currentLang]["th-delete"] || "Delete";

    for (let i = 0; i < products.length; i++) {
        // Use a 1x1 transparent image for placeholder if no image
        const imgSrc = products[i].image || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        
        tableElements += `
        <tr>
            <th>${i+1}</th>
            <th><img src="${imgSrc}" alt="Product"></th>
            <th>${products[i].title}</th>
            <th>${products[i].price}</th>
            <th>${products[i].tax}</th>
            <th>${products[i].adds}</th>
            <th>${products[i].discount}</th>
            <th>${products[i].total}</th>
            <th>${products[i].category}</th>
            <th><button onclick="updateData(${i})">${updateText}</button></th>
            <th><button onclick="deleteProduct(${i})">${deleteText}</button></th>
        </tr>
        `;
    }
    table.innerHTML = tableElements;

    let btn_delete = document.getElementById("delete_all");
    if (products.length > 0) {
        const deleteAllText = translations[currentLang]["btn-delete-all"] || "Delete All";
        // Ensure the button is only created once
        btn_delete.innerHTML = `<button onclick="delete_all()">${deleteAllText} (${products.length})</button>`;
    } else {
        btn_delete.innerHTML = "";
    }
}


function deleteProduct(i){
    products.splice(i, 1);
    
    // --- START CHANGE 4: Save User-Specific Products after Delete ---
    allProductsData[currentUser] = products; 
    localStorage.setItem("allProductsData", JSON.stringify(allProductsData));
    // --- END CHANGE 4 ---
    
    addData();
    showAlert('success');
}


function delete_all(){
    if (confirm(translations[currentLang]["alert-confirm-delete-all"])) {
        products = [];
        
        // --- START CHANGE 5: Save User-Specific Products after Delete All ---
        allProductsData[currentUser] = [];
        localStorage.setItem("allProductsData", JSON.stringify(allProductsData));
        // --- END CHANGE 5 ---
        
        addData();
        showAlert('success');
    }
}


function updateData(i){
    title.value = products[i].title;
    price.value = products[i].price;
    tax.value = products[i].tax;
    adds.value = products[i].adds;
    discount.value = products[i].discount;
    getTotal();
    count.style.display = "none";
    category.value = products[i].category;
    
    // Handle image preview for update
    if (imgPreview) {
        imgPreview.src = products[i].image || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        imgPreview.style.display = products[i].image ? "block" : "none";
    }

    // Set 'Update' mode text
    create.innerHTML = translations[currentLang]["btn-update"];
    create.setAttribute("data-lang-key", "btn-update");
    mode = "update";
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    });
}

function getSearch(id) {
    if (id === "sTitle") {
        searchMode = "title";
    } else {
        searchMode = "category";
    }
    search.removeAttribute("disabled");
    search.focus();
    
    // Update placeholder text for the current language
    const searchKey = (searchMode === "title") ? "ph-search-title" : "ph-search-category";
    search.placeholder = translations[currentLang][searchKey];
    search.value = "";
    addData(); // Display all products initially
}

function searchData(value) {
    let tableElements = ""; 
    let searchValue = value.toLowerCase(); 
    
    const updateText = translations[currentLang]["th-update"] || "Update";
    const deleteText = translations[currentLang]["th-delete"] || "Delete";
    
    const renderRow = (product, i) => {
        // Use a 1x1 transparent image for placeholder if no image
        const imgSrc = product.image || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        return `
            <tr>
                <th>${i + 1}</th>
                <th><img src="${imgSrc}" alt="Product"></th>
                <th>${product.title}</th>
                <th>${product.price}</th>
                <th>${product.tax}</th>
                <th>${product.adds}</th>
                <th>${product.discount}</th>
                <th>${product.total}</th>
                <th>${product.category}</th>
                <th><button onclick="updateData(${i})">${updateText}</button></th>
                <th><button onclick="deleteProduct(${i})">${deleteText}</button></th>
            </tr>
        `;
    };

    if (searchMode === "title") {
        for (let i = 0; i < products.length; i++) {
            if (products[i].title.toLowerCase().includes(searchValue)) { 
                // We must use the original index 'i' to correctly update/delete the product
                tableElements += renderRow(products[i], i);
            }
        }
    } else { // searchMode === "category"
        for (let i = 0; i < products.length; i++) {
            if (products[i].category.toLowerCase().includes(searchValue)) { 
                 // We must use the original index 'i' to correctly update/delete the product
                tableElements += renderRow(products[i], i);
            }
        }
    }
    table.innerHTML = tableElements;
}

// ================== INITIAL SETUP ==================
function initialSetup() {
    if (mainContainer) mainContainer.style.display = "none";
    if (createAccountContainer) createAccountContainer.style.display = "none";
    if (loginContainer) loginContainer.style.display = "block";
    applyTheme(currentTheme); 
    setLanguage(currentLang);
    // Hide image preview initially
    if (imgPreview) imgPreview.style.display = "none";
}

initialSetup();
// ================== PRINT TABLE FUNCTION ==================
if (printButton) {
    printButton.addEventListener("click", printTable);
}

function printTable() {
    if (products.length === 0) {
        showAlert("info", "no-products-to-print");
        return;
    }

    // إنشاء صفحة جديدة للطباعة
    let printWindow = window.open("", "_blank");
    let lang = currentLang;
    let dir = lang === "ar" ? "rtl" : "ltr";
    let themeBg = document.body.classList.contains("dark-mode") ? "#121212" : "#fff";
    let themeText = document.body.classList.contains("dark-mode") ? "#fff" : "#000";
    let borderColor = document.body.classList.contains("dark-mode") ? "#333" : "#ccc";

    // بناء محتوى الصفحة للطباعة
    let html = `
    <!DOCTYPE html>
    <html lang="${lang}" dir="${dir}">
    <head>
        <meta charset="UTF-8">
        <title>${translations[lang]["crud-title"]}</title>
        <style>
            body {
                background: ${themeBg};
                color: ${themeText};
                font-family: 'Segoe UI', Tahoma, sans-serif;
                text-align: center;
                padding: 20px;
            }
            h2 {
                margin-bottom: 20px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
            }
            th, td {
                border: 1px solid ${borderColor};
                padding: 8px;
                font-size: 14px;
            }
            th {
                background: ${document.body.classList.contains("dark-mode") ? "#222" : "#eee"};
            }
            img {
                width: 50px;
                height: 50px;
                object-fit: cover;
                border-radius: 8px;
            }
        </style>
    </head>
    <body>
        <h2>${translations[lang]["crud-title"]}</h2>
        <h4>${translations[lang]["welcome-user"]} ${currentUser}</h4>
        <table>
            <thead>
                <tr>
                    <th>${translations[lang]["th-id"]}</th>
                    <th>${translations[lang]["th-image"]}</th>
                    <th>${translations[lang]["th-title"]}</th>
                    <th>${translations[lang]["th-price"]}</th>
                    <th>${translations[lang]["th-tax"]}</th>
                    <th>${translations[lang]["th-adds"]}</th>
                    <th>${translations[lang]["th-discount"]}</th>
                    <th>${translations[lang]["th-total"]}</th>
                    <th>${translations[lang]["th-category"]}</th>
                </tr>
            </thead>
            <tbody>
                ${products.map((p, i) => `
                    <tr>
                        <td>${i + 1}</td>
                        <td><img src="${p.image || ''}" alt=""></td>
                        <td>${p.title}</td>
                        <td>${p.price}</td>
                        <td>${p.tax}</td>
                        <td>${p.adds}</td>
                        <td>${p.discount}</td>
                        <td>${p.total}</td>
                        <td>${p.category}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
        <script>
            window.print();
            window.onafterprint = () => window.close();
        </script>
    </body>
    </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
}