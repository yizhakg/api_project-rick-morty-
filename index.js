let url = 'https://rickandmortyapi.com/api/character'
let data = [];
let charactorId;
window.onload = () => {
  enviorment();
  setTimeout(() => { getData() }, 1000)

}
function enviorment() {
  main.innerHTML += `<img id="openImg" src="https://media3.giphy.com/media/Q6x7wJ2vlP5E1MUn4E/source.gif" alt="">`
  main.innerHTML += `<div id="header"></div>`
  main.innerHTML += `<div id="searchBox"></div>`
  main.innerHTML += `<div id="container" class="container"></div>`
  header.innerHTML += `<h1 class="title">Rick and Morty Character</h1>`
  header.innerHTML += `<img class="title_img"
src="https://miro.medium.com/max/840/1*d5g31wvUpmILqzge216Fug.png"
alt="">`
  searchBox.innerHTML += `<form onsubmit="searchCharacter()" id="containBox" action="javascript:void(0)"></form>`
  containBox.innerHTML += `<input type="search" name="serch" id="search" placeholder="search..." minlength="3" onsearch="searchCharacter()">`
  containBox.innerHTML += `<button type="submit" id="searchButton"> &#x1F50D </button>`
  footer.innerHTML += `<img src="https://assets.stickpng.com/images/58f37720a4fa116215a9240f.png" alt="">`
}


function getApi(addedData) {
  console.log(url + "" + addedData);
  return fetch(url + "" + addedData)
    .then(res => res.json())
}

async function getData() {
  try {
    for (let i = 1; i <= 3; i++) {
      data = data.concat(await getApi("?page=" + i).then(res => res.results))
    }
    charactorId = await fetch("./index.json").then((res) => res.json());
  }
  catch (error) {
    console.log(error);
  }
  finally {
    document.getElementById("openImg").style.height = "100px";
    addCharacter(data);
  }
}
function addCharacter(charactorArray) {
  container.innerHTML = "";
  for (let i = 0; i < charactorArray.length; i++) {
    container.innerHTML += `
    <div class="item">
    <img class="itemImg" src="${charactorArray[i].image}" alt="">
    <div class="name">
    <h1>${charactorArray[i].name} </h1>
    </div>
  <div class="data">
  <h1>${charactorArray[i].name}</h1>
  <h3>${charactorArray[i].species}</h3>
  <h3>${charactorArray[i].gender}</h3>
  <h4>${charactorArray[i].location.name}</h4>
  <h3>${charactorArray[i].status}</h3>
    </div>
    </div>
    `
  }
}
async function getSearchData(addedData) {
  let searchData;
  try {
    searchData = await getApi(addedData);
    console.log(searchData);
  }
  catch (error) {
    console.log(error);
  }
  finally {
    document.getElementById("openImg").style.height = "100px";
    addCharacter(searchData);
  }
}

function searchCharacter() {
  searchValue = document.getElementById("search").value.toLowerCase().trim();
  if (searchValue == "") {
    addCharacter(data)
    return;
  }
  let resultString = ""
  for (const key in charactorId) {
    let name = charactorId[key].toLowerCase();
    if (name.indexOf(searchValue) != -1) {
      resultString += `${key},`
    }
  }
  resultString = "/" + resultString.substring(0, resultString.length - 1);
  getSearchData(resultString)
}
