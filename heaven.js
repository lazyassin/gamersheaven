document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const popularList = document.getElementById('popular-list');

    // Navigation functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const page = this.getAttribute('data-page');

            pages.forEach(p => {
                p.style.display = 'none';
            });

            document.getElementById(`${page}-page`).style.display = 'block';
        });
    });

    // Add dummy posts to popular page
    const dummyPosts = [
        { text: "Check out this amazing game!", likes: 5 },
        { text: "Who else is excited for the new release?", likes: 8 },
        { text: "Best gaming laptop under $1000?", likes: 3 },
    ];

    dummyPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('comment');

        const postContent = document.createElement('div');
        postContent.classList.add('comment-content');

        const postTextElement = document.createElement('p');
        postTextElement.textContent = post.text;
        postContent.appendChild(postTextElement);

        const likeButton = document.createElement('button');
        likeButton.textContent = 'Like';
        likeButton.classList.add('btn-like');
        likeButton.addEventListener('click', function() {
            const likeCount = likeButton.nextElementSibling;
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
        });

        const likeCount = document.createElement('span');
        likeCount.textContent = post.likes;
        likeCount.classList.add('like-count');

        postElement.appendChild(postContent);
        postElement.appendChild(likeButton);
        postElement.appendChild(likeCount);

        popularList.appendChild(postElement);
    });

    // Comment form submission
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const commentText = document.getElementById('comment-text').value;
        const commentImage = document.getElementById('comment-image').files[0];

        if (commentText || commentImage) {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');

            const commentContent = document.createElement('div');
            commentContent.classList.add('comment-content');

            const commentTextElement = document.createElement('p');
            commentTextElement.textContent = commentText;
            commentContent.appendChild(commentTextElement);

            if (commentImage) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const commentImageElement = document.createElement('img');
                    commentImageElement.src = e.target.result;
                    commentImageElement.classList.add('comment-image');
                    commentContent.appendChild(commentImageElement);
                };
                reader.readAsDataURL(commentImage);
            }

            const likeButton = document.createElement('button');
            likeButton.textContent = 'Like';
            likeButton.classList.add('btn-like');
            likeButton.addEventListener('click', function() {
                const likeCount = likeButton.nextElementSibling;
                likeCount.textContent = parseInt(likeCount.textContent) + 1;
            });

            const likeCount = document.createElement('span');
            likeCount.textContent = '0';
            likeCount.classList.add('like-count');

            commentElement.appendChild(commentContent);
            commentElement.appendChild(likeButton);
            commentElement.appendChild(likeCount);

            commentsList.appendChild(commentElement);

            commentForm.reset();
        }
    });
});
