import *  as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarks from './views/bookmarksView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.appHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
}

const controlPagination = function(gotoPage){
  // Render NEW Reults
  resultsView.render(model.getSearchResultsPage(gotoPage));
  // Render New Pagination buttons
  paginationView.render(model.state.search);
}

const controlRecipes = async function () {
  // Loading recipe
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if(!id) return;
    
    recipeView.renderSpinner();

    // Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage(model.state.search.page));
    bookmarks.update(model.state.bookmarks);
    
    // Loading Recipe
    await model.loadRecipe(id);

    // Rendering Recipe
    //console.log(model.state)
    recipeView.render(model.state.recipe);
  }
  catch (err) {
    alert(err);
    recipeView.renderError(`${err}`);
  }
}

// if(module.hot){
//   module.hot.accept();
// }

const controlSearchResults = async function(){
  try{
    //Reset page to 1
    model.state.search.page = 1;
    // Spinning Icon on results
    resultsView.renderSpinner();
    // Get Search Query
    const query = searchView.getQuery();
    if(!query) return;

    // Load Search results
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage(model.state.search.page));

    //Render initial pagination buttons
    paginationView.render(model.state.search);
  }
  catch(err){
    console.log(err)
  }
}

const controlServings = function(newServings){
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipe view
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function(){
  // Add or remove bookmarks
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else
    model.removeBookmark(model.state.recipe.id);
  //console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  //Render bookmarks
  bookmarks.render(model.state.bookmarks);
}

const controlRemoveBookmark = 
controlSearchResults();
init();
