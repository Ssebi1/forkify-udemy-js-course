import Search from './models/Search';
import * as searchView from './views/SearchView';
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

        // 4) Search for recipes
        await state.search.getResult();

        // 5) Remove loader
        clearLoader();

        // 6) Render results on the UI
        searchView.renderResults(state.search.result);

    }

}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

