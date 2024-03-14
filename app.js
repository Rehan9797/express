const express=require("express");
const morgan =require("morgan");


//initialization
const app= express();
app.use(morgan('dev'));
app.use(express.json());

let tasks=[];

app.get('/',(req,res)=>{
    res.json(tasks);
})

app.post('/tasks',(req,res)=>{
    const task = req.body
    tasks.push(task);
    res.send({message:"task Added",tasks}) 
})

app.get('/tasks/:id',(req,res)=>{
    const id=req.params.id;
    const task = tasks.find(task => task.id===id);
    if(!task){
        res.send("Task not Found");
    }else{
        res.json(task)
    }
})
app.listen(5000,(req,res)=>{
      console.log("Server Is Running!");
});
//update

app.put('/edit/:id',(req,res)=>{
    const id= req.params.id;
    const updatetask=req.body;
    const index =tasks.findIndex((task)=>task.id===id);
      if(index===-1){
         res.send('Not Found !')
         
      }else{
        tasks.splice(index,1,updatetask);
        //task[index]= updatetask
        res.json(tasks);
        
      }

      
})
//delete
app.delete('/tasks/:id',(req,res)=>{
    const id =req.params.id
    const index = tasks.findIndex((task)=>task.id===id)
      if(index=== -1){
        res.send("Not There!")

      }else{
        tasks.splice(index,1);
        res.send("Item Deleted");
        
      }
})