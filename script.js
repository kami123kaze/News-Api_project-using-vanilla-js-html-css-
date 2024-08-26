const apiKey = '5a0873349e9e4274a9a5d2fae65de3b1';
const blogContainer = document.getElementById('blog-container');
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener("click",async ()=>{
    const query = searchField.value.trim();
    if(query !== ""){
        try{
            const article = await fetchNewsQuery(query);
            displayBlogs(article);
        }catch(error){
           console.error("Error fetching news by query",error);
        }
    }
})



async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?domains=wsj.com&pageSize=12&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news:", error);
        return [];
    }
}
async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news:", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach(article => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || 'https://via.placeholder.com/150';
        img.alt = article.title || "No title available"; // Fallback alt text

        const title = document.createElement("h2");
        const truncatedTitle = article.title ? 
            (article.title.length > 30 ? article.title.slice(0, 30) + "...." : article.title) : 
            "No title available";
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        const truncatedDescription = article.description ? 
            (article.description.length > 70 ? article.description.slice(0, 70) + "...." : article.description) : 
            "No description available";
        description.textContent = truncatedDescription;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click',()=>{
            window.open(article.url,"_blank ")
        })
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news:", error);
    }
})();
