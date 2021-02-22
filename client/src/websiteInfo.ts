export const websiteInfo = {
    serverUrl: process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000'
        : 'https://nikita-trello.herokuapp.com'
}