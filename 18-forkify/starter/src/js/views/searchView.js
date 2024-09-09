class SearchView{
    _parentElement = document.querySelector('.search');
    

    getQuery(){
        const query = this._parentElement.querySelector('.search__field').value;
        this._clearInput();
        
        return query;
    }

    appHandlerSearch(handler){
        //console.log(this._parentElement);
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault();
            handler();
        })
    }

    _clearInput(){
        this._parentElement.querySelector('.search__field').value = '';
    }
}

export default new SearchView();