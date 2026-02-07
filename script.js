function add_task(){
    const text = document.getElementById("taskName").value;
    numTask = +document.getElementById("taskCount").innerText;
    if(text == ""){
        alert("يرجى كتابة مهمة");
        return;
    }
    if(numTask == 0){
        document.getElementById("main_tasks").innerHTML =
         `
            <ul id="taskList">
                <li >
                    <input type="button" id="delete1task" onclick="delete_task(this.parentElement); saveTasks();" value="X">
                    <div>
                        <span>${text}</span>
                        <input type="checkbox" onclick="saveTasks();" name="" id="">
                    </div>
                </li>
            </ul>
        `;
        document.getElementById("taskCount").innerHTML = 1;
        document.getElementById("clear_all").classList.add("active-clear");
        document.getElementById("taskName").value="";
        
    }else{
        document.getElementById("taskList").innerHTML +=
         `
                <li>
                    <input type="button" id="delete1task" onclick="delete_task(this.parentElement)" value="X">
                    <div>
                    <span>${text}</span>
                    <input type="checkbox" name="" onclick="saveTasks();" id="">
                    </div>
                </li>
        `;
        document.getElementById("taskCount").innerHTML = numTask+1;
        document.getElementById("taskName").value = ""
    }
    saveTasks();
}
function clearAll(){
    numTask = +document.getElementById("taskCount").innerText;
    if(numTask == 0){
        return;
    }
    let agreement = confirm("هل أنت متأكد من حذف جميع المهام؟");
    if(agreement === true){
        document.getElementById("main_tasks").innerHTML = 
        `
            <div class="plus">+</div>
            <div class="nothing">لا توجد مهام حاليا</div>
        `;
        document.getElementById("taskCount").innerHTML = 0;
        document.getElementById("clear_all").classList.remove("active-clear");

    }
    clearAllTasksFromStorage();
}
function delete_task(li) {
    // btn هنا هو زر الـ X الذي ضغطت عليه
    li.remove();
    numTask = +document.getElementById("taskCount").innerText;
    document.getElementById("taskCount").innerHTML = numTask-1;
    if(numTask - 1 == 0){
        document.getElementById("main_tasks").innerHTML = `
            <div class="plus">+</div>
            <div class="nothing">لا توجد مهام حاليا</div>
         `;
        document.getElementById("clear_all").classList.remove("active-clear");
    }
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        const text = li.querySelector('span').innerText;  
        const isChecked = li.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: text, isChecked: isChecked });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearAllTasksFromStorage() {
    localStorage.removeItem('tasks');
}
function getArrayFromLocalStorage(key) {
    let storedData = localStorage.getItem(key);
    if (storedData) {
        return JSON.parse(storedData);  // تحويل البيانات من نص إلى مصفوفة
    }
    return [];  
}
window.onload = function() {
    let arr = getArrayFromLocalStorage("tasks")
    console.log(arr[0])
    if(arr.length == 0){
        return;
    }else{
        document.getElementById("taskCount").innerHTML = arr.length
        for (let i = 0; i < arr.length; i++) {
            if(i==0)
            {
                if(arr[i].isChecked)
                {
                    document.getElementById("main_tasks").innerHTML =
                        `
                        <ul id="taskList">
                            <li >
                                <input type="button" id="delete1task" onclick="delete_task(this.parentElement); saveTasks();" value="X">
                                <div>
                                    <span>${arr[i].text}</span>
                                    <input type="checkbox" checked onclick="saveTasks();" name="" id="">
                                </div>
                            </li>
                        </ul>
                        `;
                    document.getElementById("clear_all").classList.add("active-clear");
                }else{
                    document.getElementById("main_tasks").innerHTML =
                    `
                    <ul id="taskList">
                        <li >
                            <input type="button" id="delete1task" onclick="delete_task(this.parentElement); saveTasks();" value="X">
                            <div>
                                <span>${arr[i].text}</span>
                                <input type="checkbox" onclick="saveTasks();" name="" id="">
                            </div>
                        </li>
                    </ul>
                    `;
                    document.getElementById("clear_all").classList.add("active-clear");
                }
            }else
            {
                if(arr[i].isChecked){
                    document.getElementById("taskList").innerHTML +=
                    `
                            <li>
                                <input type="button" id="delete1task" onclick="delete_task(this.parentElement)" value="X">
                                <div>
                                <span>${arr[i].text}</span>
                                <input type="checkbox" checked name="" onclick="saveTasks();" id="">
                                </div>
                            </li>
                    `;

                }else{
                    document.getElementById("taskList").innerHTML +=
                    `
                            <li>
                                <input type="button" id="delete1task" onclick="delete_task(this.parentElement)" value="X">
                                <div>
                                <span>${arr[i].text}</span>
                                <input type="checkbox" name="" onclick="saveTasks();" id="">
                                </div>
                            </li>
                    `;
                }
                
            }
        }
    }
};



