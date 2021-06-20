
document.querySelector('.create-todo').addEventListener('click', function () {
    document.querySelector('.create-todo').style.display = "none";
    document.querySelector('.divThem').style.display = "block";
    document.querySelector('#inputTodo').value = '';
    document.querySelector('#inputTodo').focus();
});

document.querySelector('#btnSave').addEventListener('click', function () {
    var itemName = document.querySelector('#inputTodo').value;
    if (itemName != '') {
        var itemsStorage = localStorage.getItem("todo-items");
        var itemsArr = JSON.parse(itemsStorage);
        itemsArr.push({ "item": itemName, "status": 0});
        saveItems(itemsArr);
        fetchItems();
        document.querySelector('.create-todo').style.display = "block";
        document.querySelector('.divThem').style.display = "none";
    }
}); 

document.querySelector('#inputTodo').addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector('#btnSave').click();
    }
});

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
            itemsListUL[i].querySelector('.itemComplete').addEventListener('click', function () {
                var index = this.parentNode.parentNode.dataset.itemindex;
                itemComplete(index);
            });
            itemsListUL[i].querySelector('.itemDelete').addEventListener('click', function () {
                var index = this.parentNode.parentNode.dataset.itemindex;
                itemDelete(index);
                fetchItems();
                var itemsStorage = localStorage.getItem("todo-items");
                var Arr = JSON.parse(itemsStorage);
                console.log(index);
                console.log(Arr);
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


function saveItems(obj) {
    var string = JSON.stringify(obj);
    localStorage.setItem('todo-items', string);
}

fetchItems();