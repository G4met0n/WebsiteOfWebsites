// script.js
const websites = {
  shopping: [
    { name: "Amazon", url: "https://www.amazon.com" },
    { name: "eBay", url: "https://www.ebay.com" },
    { name: "Etsy", url: "https://www.etsy.com" },
  ],
  news: [
    { name: "BBC News", url: "https://www.bbc.com/news" },
    { name: "CNN", url: "https://www.cnn.com" },
    { name: "Reuters", url: "https://www.reuters.com" },
  ],
  entertainment: [
    { name: "YouTube", url: "https://www.youtube.com" },
    { name: "Netflix", url: "https://www.netflix.com" },
    { name: "Spotify", url: "https://www.spotify.com" },
  ],
  education: [
    { name: "Coursera", url: "https://www.coursera.org" },
    { name: "Khan Academy", url: "https://www.khanacademy.org" },
    { name: "edX", url: "https://www.edx.org" },
  ],
  random: [
    { name: "Reddit", url: "https://www.reddit.com" },
    { name: "Wikipedia", url: "https://www.wikipedia.org" },
    { name: "GitHub", url: "https://www.github.com" },
  ],
};

// Sort websites alphabetically
for (const category in websites) {
  websites[category].sort((a, b) => a.name.localeCompare(b.name));
}

const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const categoryButtons = document.querySelectorAll(".categories button");

// Display websites based on category
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    if (category === "all") {
      // Combine all websites into one array
      const allWebsites = Object.values(websites).flat();
      displayWebsites(allWebsites);
    } else {
      displayWebsites(websites[category]);
    }
  });
});

// Display websites based on search input
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const allWebsites = Object.values(websites).flat();
  const filteredWebsites = allWebsites.filter((site) =>
    site.name.toLowerCase().includes(query)
  );

  // Sort results: prioritize websites that start with the query
  const sortedWebsites = filteredWebsites.sort((a, b) => {
    const aStartsWith = a.name.toLowerCase().startsWith(query);
    const bStartsWith = b.name.toLowerCase().startsWith(query);

    if (aStartsWith && !bStartsWith) return -1; // a comes first
    if (!aStartsWith && bStartsWith) return 1; // b comes first
    return a.name.localeCompare(b.name); // alphabetically if both start with query
  });

  displayWebsites(sortedWebsites);
});

// Function to display websites
function displayWebsites(websites) {
  resultsDiv.innerHTML = "";
  websites.forEach((site) => {
    const item = document.createElement("div");
    item.className = "result-item";
    item.textContent = site.name;
    item.addEventListener("click", () => {
      window.location.href = site.url;
    });
    resultsDiv.appendChild(item);
  });
}

// Add this to your existing JavaScript
const themeToggle = document.getElementById("themeToggle");

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.classList.add(savedTheme);
  updateThemeIcon(savedTheme);
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const isDarkTheme = document.body.classList.contains("dark-theme");
  localStorage.setItem("theme", isDarkTheme ? "dark-theme" : "");
  updateThemeIcon(isDarkTheme ? "dark-theme" : "");
});

// Update the theme icon
function updateThemeIcon(theme) {
  themeToggle.textContent = theme === "dark-theme" ? "☀️" : "🌙";
}