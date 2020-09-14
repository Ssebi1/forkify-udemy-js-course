import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }


    async getResult() {
        const searchData = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
        this.result = searchData.data.recipes;
    }

}
