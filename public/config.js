function fetchJSONData() {
    fetch('./appsettings.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();  
    })
    .then(data => {
        localStorage.removeItem('VITE_APP_BASEURL');
        localStorage.removeItem('VITE_APP_APIKEY');
        localStorage.removeItem('COLORS_APP');
        localStorage.setItem('VITE_APP_BASEURL', data.VITE_APP_BASEURL || '');       
        localStorage.setItem('VITE_APP_APIKEY', data.VITE_APP_APIKEY || '');
        localStorage.setItem('COLORS_APP', JSON.stringify(data.COLORS_APP || {}));
        if (data.COLORS_APP && data.COLORS_APP.BACKGROUND_PAGE_COLOR) {
            document.body.style.setProperty('background-color', data.COLORS_APP.BACKGROUND_PAGE_COLOR, 'important');
        }
     })  
    .catch(error => console.error('Failed to fetch data:', error)); 
}