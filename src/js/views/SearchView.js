import { elements } from './base';

export const getInput = () => {
    return elements.searchInput.value;
};

const renderRecipe = recipe => {
    const markup = `<li>
                    <a class="results__link" href = "#${recipe.recipe_id}" >
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                                    </figure>
                            <div class="results__data">
                                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                                <p class="results__author">${recipe.publisher}</p>
                            </div>
                    </a>
                    </li >`;
    elements.searchResultsList.insertAdjacentHTML('beforeend', markup);
};

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, curr) => {
            if (acc + curr.length <= limit)
                newTitle.push(curr);
            return acc + curr.length;
        }, 0);

        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const createButton = (page, type) => {
    const button = `<button class="btn-inline results__btn--${type}" data-goto = ${type === 'prev' ? page - 1 : page + 1}>
                        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
                        <svg class="search__icon">
                            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                        </svg>
                    </button>`;
    return button;
}

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if (page === 1 && pages > 1) {
        //Button to go to the next page
        button = createButton(page, 'next');
    }
    else if (page === pages && pages > 1) {
        //Buton to go to the previous page
        button = createButton(page, 'prev');
    }
    else {
        //Buttons to go to next and previous page
        button = `${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `;
    }

    elements.searchPagination.insertAdjacentHTML('afterbegin', button);
};

export const clearButtons = () => {
    elements.searchPagination.innerHTML = '';
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    var start = (page - 1) * resPerPage;
    var end = (page) * resPerPage;

    recipes.slice(start, end).forEach(el => renderRecipe(el));

    renderButtons(page, recipes.length, resPerPage);
};

export const clearResults = () => {
    elements.searchResultsList.innerHTML = '';
}

export const clearInput = () => {
    elements.searchInput.value = '';
};