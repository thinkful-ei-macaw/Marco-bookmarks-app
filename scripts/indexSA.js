'use strict';

import api from "./apiSA.js"
import events from "./eventsSA.js"
import data from "./datumSA.js"








function handleBookmarks(){
events.render(),
events.bindEventListeners(),
events.getBookmarks(),
events.filterRatings()
}
 
$(handleBookmarks);