let btnList = document.getElementsByClassName("btn");
for (let i = 0; i < btnList.length; i++) {
    btnList[i].addEventListener("click", function() {
        alert("疫情期间，暂停售票")
    }, false)
}