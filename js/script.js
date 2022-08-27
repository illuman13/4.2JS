
const searchWrapper = document.querySelector(".search-input");
const repo = document.querySelector('.repo');
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");



class GitAdd {
  constructor( name, owner, stars ) {
    this.name = document.createElement('p');
    this.name.textContent = `Name: ${name}`;

    this.owner = document.createElement('p');
    this.owner.textContent = `Owner: ${owner}`;

    this.stars = document.createElement('p');
    this.stars.textContent = `Stars: ${stars}`;

    this.elem = document.createElement('div');
    this.button = document.createElement('button')
    this.button.style.cssText = `
    position: absolute;
    border: none;
    width: 46px;
    height: 42px;
    background: url("data:image/svg+xml,%3Csvg width='46' height='42' viewBox='0 0 46 42' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M44 40.5L2 2' stroke='%23FF0000' stroke-width='4'/%3E%3Csvg width='46' height='42' viewBox='0 0 46 42' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 40.5L44 2' stroke='%23FF0000' stroke-width='4'/%3E%3C/svg%3E%3C/svg%3E");
    left: 85%;
    top: 15%;
    `

    this.elem.appendChild( this.button )
    this.elem.appendChild( this.name )
    this.elem.appendChild( this.owner )
    this.elem.appendChild( this.stars )
    this.elem.style.cssText = `
    position: relative;
    border: 2px solid black;
    width: 100%;
    max-height: 101px;
    background-color: #E27BEB;
    `
  }
  creatEl () {
    repo.appendChild( this.elem )
    this.button.addEventListener('click', () => this.elem.remove())
  }
}

function debounce( callback, delay ) {
  let timeout;
  return function() {
    clearTimeout( timeout );
    timeout = setTimeout( callback, delay );
  }
}
let arrayForJson = [];
async function serchUser( nameRepo ) {
  let response = await fetch(`https://api.github.com/search/repositories?q=${nameRepo}`)
  let responsePars = await response.json()
  await responsePars.items.forEach(item => {
    arrayForJson.push(item)
})
}
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDhiNThlM2NmNzA1MWIwMDgyOWUyNyIsInVzZXJuYW1lIjoiaWxsdW1hbjEzIiwiZXhwIjoxNjY2NzAwMDgyLCJpYXQiOjE2NjE1MTYwODJ9.79zXz0PgsmVyitokGKKl-hHIdwQGGBeegLX3QJz89Dw"


    inputBox.addEventListener('keyup', debounce(() => {
      if( inputBox.value ) {
        serchUser( inputBox.value )
          .then(() => {
            let userData = inputBox.value;
            let userInfoArray = [];
            if (userData) {
              userInfoArray = arrayForJson.filter(( {name: item} ) => {
                return item.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
              });
              userInfoArray = userInfoArray.map(( {name: item} ) => {
                return item = `<li>${item}</li>`;
              }).slice(0, 5);

              searchWrapper.classList.add( "active" );

              showSuggestions( userInfoArray );
              let allList = suggBox.querySelectorAll( "li" );
              for (let i = 0; i < allList.length; i++) {
                allList[i].setAttribute("onclick", "select(this)");
                console.log(allList[i])
              }
            } else {
              searchWrapper.classList.remove( "active" );
            }
          })
      }
    },400))

function showSuggestions( list ){
    let listData;
    if( !list.length ){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join( '' );
    }
    suggBox.innerHTML = listData;
}
function select( element ){
  let selectData = element.textContent;
  inputBox.value = '';
  let bol = true;
  arrayForJson.forEach( item => {
    if(item.name === selectData && bol) {
      new GitAdd( item.name, item.owner.login, item.stargazers_count ).creatEl()
      bol = false;
    }
  })
  searchWrapper.classList.remove( "active" );
}



