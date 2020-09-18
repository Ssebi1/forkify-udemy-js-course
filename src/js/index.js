import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/SearchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

// Global state of the app
// -Search object
// -Current recipe object
// -Shopping list object
// -Liked recipes

const state = {};

const controlSearch = async () => {
    // 1) Get the query from the view
    const query = searchView.getInput();

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for resuts
        searchView.clearResults();
        searchView.clearInput();
        renderLoader(elements.searchResults);

        try {
            // 4) Search for recipes
            await state.search.getResult();

            // 5) Remove loader
            clearLoader();

            // 6) Render results on the UI
            searchView.renderResults(state.search.result);
        } catch (err) {
            console.log(err);
            clearLoader();
        }

    }

}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})


elements.searchPagination.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const gotoPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.clearButtons();
        searchView.renderResults(state.search.result, gotoPage);
    }
})

const controlRecipe = async () => {
    //Get id from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        //Prepare ui for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Highlight selected search item
        if (state.search)
            searchView.highlightSelected(id);

        //Create new recipe object
        state.recipe = new Recipe(id);

        try {
            //Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //Calculate serving and time
            state.recipe.calcServing();
            state.recipe.calcTime();

            //Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (err) {
            console.log(err);
        }
    }
};
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
