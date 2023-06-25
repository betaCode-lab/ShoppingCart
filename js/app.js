// Variables
const cart = document.querySelector('#carrito');
const listCourses = document.querySelector('#lista-cursos');
const cartContainer = document.querySelector('#lista-carrito tbody');
const btnCleanCart = document.querySelector('#vaciar-carrito');
let cartArticles = [];

loadEventListeners();
function loadEventListeners() {
    // Add a new course to the cart
    listCourses.addEventListener('click', addCourse);
    btnCleanCart.addEventListener('click', e => {
        e.preventDefault();
        cleanHtml(cartContainer);
    });
}

// Functions

// Add a new course
function addCourse(e) {
    
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        const courseSelected = e.target.parentElement.parentElement;
        readCourseData(courseSelected);
    }
}

// Extract the course info
function readCourseData(course) {

    const courseInfo = {
        id: Number(course.querySelector('a').getAttribute('data-id')),
        image: course.querySelector('img').src,
        name: course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        quantity: 1
    }

    // Check if an item alredy exists in the cart
    const exists = cartArticles.some(course => course.id === courseInfo.id);

    if(exists) {
        // Update quantity
        const courses = cartArticles.map(course => {
            if(course.id === courseInfo.id) {
                course.quantity++;
                return course;
            } else {
                return course;
            }
        });

        cartArticles = [...courses];

    } else {
        
        // Add items into the cart
        cartArticles = [...cartArticles, courseInfo];
    }

    cartHTML();
}

// Show the html cart
function cartHTML() {

    // Clean previous html
    cleanHtml(cartContainer);

    cartArticles.forEach(course => {

        const {id, image, name, price, quantity} = course;

        // Table rows
        const row = document.createElement('tr');

        // Table data
        const colImg = document.createElement('td');
        const img = document.createElement('img');
        img.width = '100';
        img.src = image;
        img.alt = name;

        const colName = document.createElement('td');
        const colPrice = document.createElement('td');
        const colQuantity = document.createElement('td');
        const colActions = document.createElement('td');

        // Buttons
        const btnDelete = document.createElement('a');
        btnDelete.href = "#";
        btnDelete.classList.add('borrar-curso');
        btnDelete.dataset.id = id;
        btnDelete.textContent = 'x';
        btnDelete.onclick = () => { deleteCourse(id); }

        // Assign data to table data
        colImg.appendChild(img);
        colName.textContent = name;
        colPrice.textContent = price;
        colQuantity.textContent = quantity;
        colActions.appendChild(btnDelete);

        // Add the html
        row.appendChild(colImg);
        row.appendChild(colName);
        row.appendChild(colPrice);
        row.appendChild(colQuantity);
        row.appendChild(colActions);

        cartContainer.appendChild(row);
    });
}

// Clean all previous HTML
function cleanHtml(container) {

    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function deleteCourse(id) {

    const courses = cartArticles.filter(course => {
        if(course.id === id) {
            // Less quantity if is more than one
            if(course.quantity > 1) {
                course.quantity--;
                return course;
            } else {
                return;
            }
        } else {
            return course;
        }
    });

    cartArticles = [...courses];
    cartHTML();
}