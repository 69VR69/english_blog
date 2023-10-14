import { getArticles, getComments } from './database.js';

// Import and render templates
var commentTemplate = importTemplateSync('comment-template');
var articleTemplate = importTemplateSync('article-template');
loadJSONData();

// Handle form submission for adding a comment
document.addEventListener('submit', function (event) {
    if (event.target && event.target.id === 'comment-form') {
        event.preventDefault();
        const articleId = event.target.dataset.articleId;
        const author = event.target.elements.author.value;
        const content = event.target.elements.content.value;
        addComment(articleId, author, content);
        event.target.reset(); // Clear the form
    }
});

console.log("test airtable", getArticles());

//--------------------------------------------------------------//

function renderComment(commentData) {
    const template = commentTemplate.getElementById("comment-template");
    const commentClone = document.importNode(template.content, true);
    commentClone.firstElementChild.id = commentData.id;
    commentClone.querySelector("h3").textContent = commentData.author;
    commentClone.querySelector("p").textContent = commentData.content;
    return commentClone;
}

function renderArticle(articleData) {
    const template = articleTemplate.getElementById("article-template");
    const articleClone = document.importNode(template.content, true);
    articleClone.firstElementChild.id = articleData.id;
    articleClone.querySelector(".title").textContent = articleData.title;
    articleClone.querySelector(".content p").textContent = articleData.content;

    const commentsSection = articleClone.querySelector(".comments");
    articleData.comments.forEach(commentData => {
        const comment = renderComment(commentData);
        commentsSection.appendChild(comment);
    });

    return articleClone;
}

function loadJSONData() {
    fetch('articles.json') // Replace with the actual JSON file path
        .then(response => response.json())
        .then(data => {
            const blogContainer = document.getElementById("blog");
            data.articles.forEach(articleData => {
                const article = renderArticle(articleData);
                blogContainer.appendChild(article);
            })
        })
        .catch(error => console.error('Error loading JSON data:', error));
}

function importTemplateSync(templateName) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `/templates/${templateName}.html`, false); // Synchronous request
    xhr.send();

    if (xhr.status === 200) {
        var template = document.createElement('template');
        template.innerHTML = xhr.responseText;
        return template.content;
    } else {
        console.error(`Error loading template ${templateName}`);
        return null;
    }
}

function addComment(articleId, author, content) {
    // Create a new comment object
    const newComment = {
        id: Date.now(), // Generate a unique ID (you may use a better method)
        refId: articleId,
        author,
        content,
        date: new Date().toLocaleString()
    };

    // Find the article by ID and append the new comment
    const articleElement = document.querySelector(`[id="${articleId}"]`);
    if (articleElement) {

        (async () => {
            const commentsSection = articleElement.querySelector(".comments");
            const comment = renderComment(newComment, commentTemplate);
            console.log(comment);
            console.log(commentsSection);
            commentsSection.appendChild(comment);
        })();
    }
}