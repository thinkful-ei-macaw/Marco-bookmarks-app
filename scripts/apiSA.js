import events from './eventsSA.js'
import data from "./datumSA.js"



const BASE_URL = 'https://thinkful-list-api.herokuapp.com/marco/bookmarks';


const getItems = function(){
    console.log('get items')
   return fetch(`${BASE_URL}`);
 
};


const createBookmarks = function (bookmark) {
    const newBookmark = JSON.stringify(bookmark); 
    
    
    console.log(data.bkmD.bookmarks);
    return fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: newBookmark
    });
    
  };

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                     GET ITEMS
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


function acquireBookmarks(){
  return fetch (`${BASE_URL}`)
   .then(response => {
      if (response.ok){
          return response.json();
      }
      //  throw new Error(response.statusText);

   })
  //.then(responseJson => displayFetchResults(responseJson))
    // .catch(err => {
    //   $('#js-error-message').text(`Something went wrong: ${err.message}`);

    // })
};



















export default{
    createBookmarks,
    getItems,
    acquireBookmarks,
    
  //  displayFetchResults
    
}