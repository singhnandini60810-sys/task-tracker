let tasks = JSON.parse(localStorage.getItem("tasks")) || []
let activeTask = null

function save(){
localStorage.setItem("tasks",JSON.stringify(tasks))
}

function addTask(){

let name=document.getElementById("taskInput").value
let repeat=document.getElementById("repeat").value
let reminder=document.getElementById("reminder").value

if(!name)return

tasks.push({
name:name,
repeat:repeat,
reminder:reminder,
days:Array(30).fill(false),
streak:0,
level:1
})

document.getElementById("taskInput").value=""

save()
renderTasks()
renderHeatmap()
}

function renderTasks(){

let list=document.getElementById("taskList")
list.innerHTML=""

tasks.forEach((t,i)=>{

let div=document.createElement("div")
div.className="task"

div.innerHTML=`
<span onclick="openTracker(${i})">${t.name}</span>

<div>
<button onclick="editTask(${i})">Edit</button>
<button onclick="deleteTask(${i})">Delete</button>
</div>
`

list.appendChild(div)

})

}

function deleteTask(i){

tasks.splice(i,1)

save()
renderTasks()
renderHeatmap()

}

function editTask(i){

let newName=prompt("Edit Task",tasks[i].name)

if(newName){
tasks[i].name=newName
save()
renderTasks()
}

}

function openTracker(i){

activeTask=i

let grid=document.createElement("div")
grid.className="grid"

tasks[i].days.forEach((d,day)=>{

let box=document.createElement("div")
box.className="day"

if(d)box.classList.add("done")

box.onclick=()=>toggleDay(day)

grid.appendChild(box)

})

let tracker=document.getElementById("tracker")
tracker.innerHTML=""
tracker.appendChild(grid)

}

function toggleDay(day){

let task=tasks[activeTask]

task.days[day]=!task.days[day]

updateStreak(task)

save()

openTracker(activeTask)

renderHeatmap()

}

function updateStreak(task){

let streak=0

for(let i=0;i<task.days.length;i++){

if(task.days[i])streak++
else streak=0

}

task.streak=streak

task.level=Math.floor(streak/5)+1

}

function renderHeatmap(){

let heat=document.getElementById("heatmap")

heat.innerHTML=""

for(let i=0;i<365;i++){

let box=document.createElement("div")
box.className="box"

let total=0

tasks.forEach(t=>{
if(i<t.days.length && t.days[i]) total++
})

let level=Math.min(total,12)

if(level>0)box.classList.add("c"+level)

heat.appendChild(box)

}

}

function renderWeekly(){

let w=document.getElementById("weekly")
w.innerHTML=""

let grid=document.createElement("div")
grid.className="grid"

for(let i=0;i<7;i++){

let box=document.createElement("div")
box.className="day"

grid.appendChild(box)

}

w.appendChild(grid)

}

function toggleDark(){

document.body.classList.toggle("dark")

}

renderTasks()
renderHeatmap()
renderWeekly()
