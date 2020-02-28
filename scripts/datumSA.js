import events from './eventsSA.js'
import api from './eventsSA.js'

const bkmD = {
    bookmarks: [],
    adding: false,
    error: null, 
    filter: 0
  };

  const create = function (name) {
    return {
      
      name,
      expanded: false
    };
  };
// create , read and delete in api and store 


  const toggleAddingBookmark = function() {
    this.bkmD.adding = !this.bkmD.adding;
  };


  const addItem = function (newBookmark) {
    Object.assign(newBookmark, {expanded: false});
    bkmD.bookmarks.push(newBookmark);
  };
  const findById = function (id) {
    return bkmD.bookmarks.find(currentItem => currentItem.id === id);
  };

  const findAndDelete = function (id) {
    this.bkmD.bookmarks = this.bkmD.bookmarks.filter(currentItem => currentItem.id !== id);
    
  };


  export default {
    bkmD,
    toggleAddingBookmark,
    create,
    findById,
    addItem,
    findAndDelete
}
