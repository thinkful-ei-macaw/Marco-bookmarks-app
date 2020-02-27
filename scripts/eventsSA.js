"use strict";
import api from "./apiSA.js";
import data from "./datumSA.js";

function render() {
    let html = "";
    html = renderStartPage();
    $("main").html(html);
    displayFetchResults();

  return;
}

function renderStartPage() {
  return `
    <div class = 'screen'>
    <h1>MY BOOKMARK LIST</h1>
        <div class='control'>
            <div class = "botones">
            <div class="addDiv">
                <button class='add'>Add New BookMark</button>
            </div>
            <div filterdiv>
                <button class='filter'>Filter Your Bookmarks</button>
                <select id="filter" value="Rating" class="dropdown">
                    <option value="1">Current filter: ${data.bkmD.filter}</option>
                        <option value="0">No filter</option>
                        <option value=5>★★★★★</option>
                        <option value=4>★★★★☆</option> 
                        <option value=3>★★★☆☆</option> 
                        <option value=2>★★☆☆☆</option> 
                        <option value=1>★☆☆☆☆</option>
                </select> 
            </div>
    </div>
    
    <h2>MY SAVED BOOKMARKS</h2>
    <ul id="results-list">
    </ul>
    </section>
    <h6>Made in NYC</h6>
    
    </form>
    
    </div>`;
}

const getItemIdFromElement = function(item) {
  return $(item)
    .closest("li")
    .data("item-id");
};


function generateBookmarkString(bookmark){


//filterRatings();


  
if(bookmark.expanded){

return`
    <li data-item-id="${bookmark.id}">
        <div class="containerforli">
            <h2>${bookmark.title}</h2>
            <p>Rating: ${bookmark.rating}/5</p>
         
            <button class="clickforexpanded">See Less</button>
            <button class="clicktodelete">Delete this bookmark</button>
            <div class="expandedview">
            <p>${bookmark.url}</p>
            <p>${bookmark.desc}</p>
         </div>
        
    </li>`   }
        
else {
return `
    <li data-item-id="${bookmark.id}">
        <div class="containerforli">
        <h2>${bookmark.title}</h2>
        <p>${bookmark.rating}</p>
        <button class="clickforexpanded">More</button>
    </li>`
         }

        };



function filterRatings(){
let newRating = parseInt($(".Rating").val())
  //newRatingList = data.bkmD.bookmarks.filter(line => data.bkmD.bookmarks.rating <= newRating);

console.log(newRating);
 }




function displayFetchResults() {
  console.log("Im showing data.bkmD.bookmarks");
  console.log(data.bkmD);
  let string = "";

  for (let i = 0; i < data.bkmD.bookmarks.length; i++) {
    let bk = data.bkmD.bookmarks[i];
    string += generateBookmarkString(bk)
  }
  $("#results-list").html(string);
}

function addingBookmark() {
  const newTitle = $(".bookmark-title-input").val();
  const newUrl = $(".bookmark-url").val();
  const newRating = parseInt($(".Rating").val());
  let newDesc = $(".addBookmarkDescription").val();

  $(".bookmark-title-input").val("");
  $(".bookmark-url").val("");
  $(".addBookmarkDescription").val("");

  const newBookmark = {
    title: newTitle,
    url: newUrl,
    rating: newRating,
    desc: newDesc
  };

  api.createBookmarks(newBookmark)
  .then(res => res.json())
  .then(newItem => {
    data.addItem(newItem);
    
    data.toggleAddingBookmark();
    render();
  });
  //.catch(error => {
  //data.setError(error.message);
  //render();
}

function addItemPage() {
  let html = `
  <div class = 'screen'>
  <h1>MY BOOKMARK LIST</h1>
          <div class="control">
              <div class = "botones">
                  <div class="addDiv">
                      <button class='add'>Add New BookMark</button>
                  </div>
                  <div filterdiv>
                      <button class='filter'>Filtr Your Bookmarks</button>
                  </div>
              </div>  
              <span id="js-error-message" class="error-message"></span>
              <form id="addbookmarkstostore">
                  <div class="bookmarkdata">
                      <legend>Adding New Bookmark</legend>
                      <div>
                          <label for="bookmark-title-input" class="addingNewBookmark">Title :</label>
                          <input type = "text" class="bookmark-title-input" name="bookmark-title-input" placeholder="Enter  title here" required/>
                      </div>
                      <div>
                          <label for="bookmark-url" class="addingNewBookmark">URL :</label>
                          <input type = "url" class="bookmark-url" name="bookmark-url" placeholder="https://www.google.com/" required/>
                      </div>
          
                      <div>
                          <label for= "Rating">Rating(s):</label>
                          <select class= "rating" name="rating" required>
                          <option selected disabled>Select Ratings</option>
                                  <option value=5>★★★★★</option>
                                  <option value=4>★★★★☆</option> 
                                  <option value=3>★★★☆☆</option> 
                                  <option value=2>★★☆☆☆</option> 
                                  <option value=1>★☆☆☆☆</option> 
                          </select>       
                      </div> 
                          <div class="AddBookmarkdesc">
                                  <label class="desc-label" for="addBookmarkDescription">Description</label>
                                  <textarea class="addBookmarkDescription" name = "addBookmarkDescription" rows = 3 ></textarea>
                          </div>
                          <div class = "clicktoadd">
                                  <button type="submit" id="addtodata">Create</button>
                                  <button type="reset" class="btn bookmark-btn-cancel" >Clear form</button>
                          </div>
                   </div>
              </form>
      <button type="submit" id="goback">Go back</button>
</div>`;


data.toggleAddingBookmark();
$("main").html(html);
}

// function renderdata(allbookmarks) {
//   const items = allbookmarks.map(item => createBookmarksList(item));

//   return items.join("");
//}

function getBookmarks() {
  api.acquireBookmarks().then(response => {
    response.forEach(element => data.addItem(element));
    console.log(data);
    render();
  });
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=
//                  EVENT LISTENERS
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function addBookmarkHandler() {
  $("main").on("click", ".add", function(event) {
    console.log("its listening to the add button");
    addItemPage();
  });
}

function filterClickHandler() {
  $("main").on("click", ".filter", function(event) {
    event.preventDefault();
    console.log("I see you want to filter your bookmarks");
  });
}

function creatingBookmarkHandler() {
  $("main").on("submit", "#addbookmarkstostore", event => {
    event.preventDefault();
    console.log("You're adding a bookmark");
    addingBookmark();
  });
}

function goingBacktoStart() {
    $("main").on("click", "#goback", event => {
      event.preventDefault();
      console.log("You want to go back!!");
      render();
    });
  }


function deleteButtonHandler(){
    $("main").on("click", ".clicktodelete", event => {
    let id = getItemIdFromElement(event.currentTarget);
    let idfordel = data.findById(id);
    
    console.log(idfordel)
    console.log('Do you want to deleteme???');
    data.findAndDelete(id);
    // render the updated shopping list
    render();
    })
}

function filterddvalue(){
      $("main").on("change", ".rating", event => {
        console.log('I see youre selecting a rating');
        }
      )
 };        

function expandedViewHandler() {
  $("main").on("click", ".clickforexpanded", event => {
    let id = getItemIdFromElement(event.currentTarget);

    let bookmark = data.findById(id);
    bookmark.expanded = !bookmark.expanded;
    render();
    console.log(bookmark);
  });
}

const bindEventListeners = function() {
  creatingBookmarkHandler(),
    filterClickHandler(),
    addBookmarkHandler(),
    expandedViewHandler(),
    goingBacktoStart(),
    deleteButtonHandler(),
    filterddvalue()
};

export default {
  render,
  bindEventListeners,
  addingBookmark,
  getBookmarks,
  filterRatings

};
