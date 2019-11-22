function newElement() {

    function printError(elemId, hintMsg) {
      document.getElementById(elemId).innerHTML = hintMsg;
    }
  
      const li = document.createElement('li');
      const inputValue = document.getElementById('textField').value.replace(/\s/g, '');
      const t = document.createTextNode(inputValue);
      li.appendChild(t);
  
      let emailErr = true;
      
      if(inputValue == "") {
        printError("emailErr", "Field can`t be empty");
      } 
      else {
        const regex = /^[a-zA-Zа-яА-Я0-9]+=[a-zA-Zа-яА-Я0-9]+(?:\[a-zA-Zа-яА-Я0-9-]+)*$/;
        if(regex.test(inputValue) === false) {
            printError("emailErr", "Write your text with alphanumeric characters (Name=Value)");
        } else {
            printError("emailErr", "");
            emailErr = false;
            document.getElementById('list').appendChild(li);
        }
      }
      
      document.getElementById('textField').value = "";
  } 
  
  function parseElements() {
    const myList = document.getElementById('list');
    const serializer = new XMLSerializer(); 
    const xmlString = serializer.serializeToString(myList);
  
    myList.innerHTML = xmlString;
    
    alert(xmlString);
  }
  
  function clearElements() {
    const ul = document.getElementById('list');
      ul.innerHTML = "";
      localStorage.removeItem('list-wrapper', ul.innerHTML);
  }
  
  function sortListName() {
    let list, i, switching, b, shouldSwitch, dir, switchcount = 0;
    list = document.getElementById('list');
    switching = true;
  
    dir = "asc"; 
  
    while (switching) {
      switching = false;
      b = list.getElementsByTagName("LI");
      for (i = 0; i < (b.length - 1); i++) {
        shouldSwitch = false;
  
        if (dir == "asc") {
          if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
            shouldSwitch= true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
  
  function sortListValue() {
    let list, i, switching, b, shouldSwitch;
    list = document.getElementById("list");
    switching = true;
  
    while (switching) {
      switching = false;
      b = list.getElementsByTagName("LI");
      for (i = 0; i < (b.length - 1); i++) {
        shouldSwitch = false;
        const leftPart = b[i].innerHTML.toLowerCase().split( '=' ).reverse();
        const rightPart = b[i + 1].innerHTML.toLowerCase().split( '=' ).reverse();
        if (leftPart > rightPart) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      }
    }
  }
  