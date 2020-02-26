import store from './datumSA.js'




function renderStartPage(){
    let form = ``;
    store.bkmD.filter = 0;

  let items = [...store.bookmarksDatum.bookmarks];

  if (store.bkmD.adding){

form = ` 
<div class = 'screen'>
<h1>MY BOOKMARK LIST</h1>
    <div class='control'>
        <div class = "botones">
        <div class="addDiv">
            <button class='add'>Add New BookMark</button>
        </div>
        <div filterdiv>
            <button class='filter'>Filtr Your Bookmarks</button>
        </div>
</div>




</form>

</div>`;
}
$('main').html(form);

  }


function render(){
    let html = '';
    html = renderStartPage();
   // html += renderAllBookmarks();
    $('main').html(html);
    
    return;
    };



export default {

    render, 
}