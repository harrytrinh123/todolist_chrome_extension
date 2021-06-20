// Code button event create todo
document.querySelector('.create-todo').addEventListener('click', function () {
    document.querySelector('.create-todo').style.display = "none";
    document.querySelector('.divThem').style.display = "block";
    document.querySelector('#inputTodo').value = '';
    document.querySelector('#inputTodo').focus();
});

// Code button event Save todo
document.querySelector('#btnSave').addEventListener('click', function () {
    var itemName = document.querySelector('#inputTodo').value;
    if (itemName != '') {
        var itemsStorage = localStorage.getItem("todo-items");
        var itemsArr = JSON.parse(itemsStorage);
        itemsArr.push({ "item": itemName, "status": 0 });
        saveItems(itemsArr);
        fetchItems();
        document.querySelector('.create-todo').style.display = "block";
        document.querySelector('.divThem').style.display = "none";
    }
});

// Make event enter when create todo
document.querySelector('#inputTodo').addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector('#btnSave').click();
    }
});

// load list items to main
function fetchItems() {
    const itemList = document.querySelector('ul.todo-items');
    itemList.innerHTML = '';
    var newItemHTML = '';
    try {
        var items = localStorage.getItem('todo-items');
        var itemsArr = JSON.parse(items);
        for (var i = 0; i < itemsArr.length; i++) {
            var status = '';
            if (itemsArr[i].status == 1) {
                status = 'class="done"';
            }
            newItemHTML += `<li data-itemindex="${i}" ${status}>
            <span class="item">${itemsArr[i].item}</span> 
            <div><span class="itemComplete">☑️</span> <span class="itemDelete">❌</span></div> 
            </li>`

        }
        itemList.innerHTML = newItemHTML;

        var itemsListUL = document.querySelectorAll("ul li");
        for (var i = 0; i < itemsListUL.length; i++) {
            itemsListUL[i].querySelector('.item').addEventListener('dblclick', function () {
                var valTodo = this.innerHTML;
                this.innerHTML = `<input class="inputEdit" type="text" value="${valTodo}">`;
                this.querySelector('.inputEdit').focus();
                this.querySelector('.inputEdit').selectionStart = this.querySelector('.inputEdit').selectionEnd = this.querySelector('.inputEdit').value.length;
                this.querySelector('.inputEdit').addEventListener('keyup', function (e) {
                    if (e.keyCode === 13) {
                        var index = this.parentNode.parentNode.dataset.itemindex;
                        console.log(index);
                        itemUpdate(index);
                    }
                });

            });
        }

        for (var i = 0; i < itemsListUL.length; i++) {
            itemsListUL[i].querySelector('.itemComplete').addEventListener('click', function () {
                var index = this.parentNode.parentNode.dataset.itemindex;
                itemComplete(index);
            });
            itemsListUL[i].querySelector('.itemDelete').addEventListener('click', function () {
                var index = this.parentNode.parentNode.dataset.itemindex;
                itemDelete(index);
                fetchItems();
            });
        }
    } catch (error) {
        //error       
    }
}

function itemComplete(index) {
    var itemsStorage = localStorage.getItem("todo-items");
    var itemsArr = JSON.parse(itemsStorage);

    itemsArr[index].status = 1;
    saveItems(itemsArr);
    document.querySelector('ul.todo-items li[data-itemindex="' + index + '"]').className = "done";
}

function itemDelete(index) {
    var itemsStorage = localStorage.getItem("todo-items");
    var itemsArr = JSON.parse(itemsStorage);

    itemsArr.splice(index, 1);
    saveItems(itemsArr);
    document.querySelector('ul.todo-items li[data-itemindex="' + index + '"]').remove();
}

function itemUpdate(index) {
    var itemsStorage = localStorage.getItem("todo-items");
    var itemsArr = JSON.parse(itemsStorage);

    var itemval = document.querySelector('ul.todo-items li[data-itemindex="' + index + '"] .item input').value;
    itemsArr[index].item = itemval;
    saveItems(itemsArr);
    document.querySelector('ul.todo-items li[data-itemindex="' + index + '"] .item').innerHTML = itemval;
}

// save items array to localStorage
function saveItems(obj) {
    var string = JSON.stringify(obj);
    localStorage.setItem('todo-items', string);
}

fetchItems();

//today
n =  new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
document.getElementById("date").innerHTML = "Today: " + d + "/" + m + "/" + y;