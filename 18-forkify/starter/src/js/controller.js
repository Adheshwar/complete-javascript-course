import *  as model from './model.js';
import recipeView from './views/recipeView.js'
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const init = function(){
  recipeView.addHandlerRender(controlRecipes);
}

const controlRecipes = async function () {
  // Loading recipe
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if(!id) return;
    
    recipeView.renderSpinner();
    
    await model.loadRecipe(id);

    // Rendering Recipe
    //console.log(model.state)
    recipeView.render(model.state.recipe);
  }
  catch (err) {
    alert(err);
  }
}

init();