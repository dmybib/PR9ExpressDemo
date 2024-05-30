window.onload = function (event) {
    fillToDoList();

    function fillToDoList() {
        fetch('/api/toDoList')
            .then(res => {
                return res.json();
            })
            .then(data => {
                const container = document.querySelector('.toDoContainer');
                data.forEach(item => {
                    const newLiItem =
`<li>
<em>
${item.title} | 
</em>
<em>
task completed: ${item.completed}
</em>
<em>
<input type="button" value="Delete" onclick="deleteTask(${item.id})"></em>
</em>
<em>
<input type="button" value="Complete" onclick="completeTask(${item.id})">
</em>
</li>`;
                    container.insertAdjacentHTML('beforeend', newLiItem);
                })
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });
    }
}

function deleteTask(id) {
    const confirmResult = confirm("Do you want to delete task?");
    if (!confirmResult) {
        return;
    }

    fetch(`/api/toDoList/${id}`, {
        method: 'DELETE'
    })
        .then(document.location = "/toDoList")
        .catch(error => {
            console.log(error);
            alert(error);
        });
}
function completeTask(id){
    const newProductName = confirm("Do you want to complete task?");

    if(!newProductName){return;}

    fetch(`/api/toDoList/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ completed: "true"})
    })
        .then(document.location = "/toDoList")
        .catch(error => {
            console.log(error);
            alert(error);
        });
}