// Function to render a comment
function renderComment(commentData,commentTemplate) {
    const template = commentTemplate.getElementById("comment-template");
    const commentClone = document.importNode(template.content, true);
    commentClone.querySelector("h3").textContent = commentData.author;
    commentClone.querySelector("p").textContent = commentData.content;
    return commentClone;
}

// Function to render an article
function renderArticle(articleData,commentTemplate, articleTemplate) {
    const template = articleTemplate.getElementById("article-template");
    const articleClone = document.importNode(template.content, true);
    articleClone.querySelector(".title").textContent = articleData.title;
    articleClone.querySelector(".content p").textContent = articleData.content;

    const commentsSection = articleClone.querySelector(".comments");
    articleData.comments.forEach(commentData => {
        const comment = renderComment(commentData,commentTemplate);
        commentsSection.appendChild(comment);
    });

    return articleClone;
}

// Function to load and import an HTML template and return the content
async function importTemplate(templateName) {
    const response = await fetch(`${templateName}.html`); // Replace with the actual path to your template files
    const data = await response.text();
    const template = document.createElement('template');
    template.innerHTML = data;
    return template.content;
}

// Function to load JSON data using Fetch API
function loadJSONData(commentTemplate, articleTemplate) {
    fetch('articles.json') // Replace with the actual JSON file path
        .then(response => response.json())
        .then(data => {
            const blogContainer = document.getElementById("blog");
            data.articles.forEach(articleData => {
                const article = renderArticle(articleData,commentTemplate, articleTemplate);
                blogContainer.appendChild(article);
            })
        })
        .catch(error => console.error('Error loading JSON data:', error));
}

(async () => {
    const commentTemplate = await importTemplate('/templates/comment-template');
    const articleTemplate = await importTemplate('/templates/article-template');
    loadJSONData(commentTemplate,articleTemplate)
})();