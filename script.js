//Validate Contact Me form
function validateForm() {
    const name = document.getElementById("name").value;
    
    if (!name) {
        alert("Name is required!");
        return false;
    }
   if (!email) {
    alert("Email Required")
   }
    return true;
}

//Allow image inspection on click
var images = document.querySelectorAll('.image-to-zoom');

var modal = document.getElementById("imageModal");

var modalImg = document.getElementById("modalImg");

var span = document.getElementsByClassName("close")[0];

images.forEach(function(image) {
    image.onclick = function() {
        modal.style.display = "block"; 
        modalImg.src = this.src;
    }
});

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Comment Section
function getComments() {
    const comments = localStorage.getItem('comments');
    return comments ? JSON.parse(comments) : [];
}

function saveComments(comments) {
    localStorage.setItem('comments', JSON.stringify(comments));
}

function renderComments() {
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = '';

    const comments = getComments();
    comments.forEach((comment, index) => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        
        const commentText = document.createElement('p');
        commentText.innerHTML = `<strong>${comment.name}</strong>: ${comment.text}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function() {
            deleteComment(index);
        };

        commentDiv.appendChild(commentText);
        commentDiv.appendChild(deleteBtn);

        commentsContainer.appendChild(commentDiv);
    });
}

document.getElementById('submit-comment').addEventListener('click', function() {
    const nameInput = document.getElementById('name-input');
    const commentInput = document.getElementById('comment-input');

    const name = nameInput.value.trim();
    const commentText = commentInput.value.trim();

    if (name && commentText) {
        const comments = getComments();
        comments.push({ name, text: commentText });
        saveComments(comments);

        nameInput.value = '';
        commentInput.value = '';

        renderComments();
    } else {
        alert('Please enter both your name and comment.');
    }
});

function deleteComment(index) {
    const comments = getComments();
    comments.splice(index, 1);
    saveComments(comments);
    renderComments();
}

renderComments();