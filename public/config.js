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
        localStorage.setItem('VITE_APP_BASEURL', data.VITE_APP_BASEURL || '');       
        localStorage.setItem('VITE_APP_APIKEY', data.VITE_APP_APIKEY || '');
     })  
    .catch(error => console.error('Failed to fetch data:', error)); 
}