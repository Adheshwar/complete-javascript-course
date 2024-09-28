import icons from '../../img/icons.svg';
export default class View {
    _data;

    render(data, render = true) {
        //console.log("Error? " + (!data || (Array.isArray(data) && data.length === 0)))
        //console.log(Array.isArray(data))
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        //console.log("recipeView Data: " + JSON.stringify(this._data));
        const markUp = this._generateMarkup();

        if(!render) return markUp;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markUp);
    }

    update(data){
        this._data = data;
        //console.log("recipeView Data: " + JSON.stringify(this._data));
        const newMarkUp = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkUp);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        //console.log(newElements);
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));
        //console.log(curElements);
        
        newElements.forEach((newEl, i) => {
          const curEl = curElements[i];
          //console.log(curEl, newEl.isEqualNode(curEl));
          //Update changed text
          if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){
            curEl.textContent = newEl.textContent;
          }

          //Update changed Attribute
          if(!newEl.isEqualNode(curEl)){
            //console.log(newEl.attributes);
            Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
          }
        })
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