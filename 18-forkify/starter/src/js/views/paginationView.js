import View from './view.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');
    _errorMessage = `No recipes found for your query! Please try again.`
    _message = '';

    addHandlerClick(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;

            const gotoPage = +btn.dataset.goto;
            //console.log("Go to page " + gotoPage);
            handler(gotoPage);
        })
    }

    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length/this._data.resultsPerPage);
        //console.log(numPages);
        //Page 1 and there are other pages
        if(curPage === 1 && numPages > 1){
            return this._generateNxtPageBt(curPage);
        }
       
        // Last page
        if(curPage === numPages && numPages>1){
            return this._generatePrvPageBt(curPage);
        }
        // Other Page
        if(curPage < numPages){
            return `${this._generatePrvPageBt(curPage)} + ${this._generateNxtPageBt(curPage)}`;
        }

         //Page 1 and there are NO pages
         return ``;
    }

    _generateNxtPageBt(curPage){
        return `<button data-goto="${curPage+1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
    }

    _generatePrvPageBt(curPage){
        return `<button data-goto="${curPage-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage-1}</span>
          </button>`;
    }
}

export default new PaginationView();