const getItems = function(){
    console.log('get items')
   return fetch(`${BASE_URL}/bookmarks`);
 
};


const createBookmarks = function (bookmark) {
    const newBookmark = JSON.stringify(bookmark); 
    return fetch(`${BASE_URL}/bookmarks`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: newBookmark
    });
  };





  
export default{
    createBookmarks,
    getItems,
    
}