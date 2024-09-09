import icons from '../../img/icons.svg';
export default class View {
    _data;

    render(data) {
        //console.log("Error? " + (!data || (Array.isArray(data) && data.length === 0)))
        //console.log(Array.isArray(data))
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        //console.log("recipeView Data: " + JSON.stringify(this._data));
        const markUp = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markUp);
    }

    renderSpinner = function () {
        const markup = `
          <div class="spinner">
                  <svg>
                    <use href="${icons}#icon-loader"></use>
                  </svg>
                </div>`;
        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderError(message = this._errorMessage) {
        console.log(this._parentElement + " Message: " + message)
        const markUp = `<div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>`;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markUp);
    }
}