const Tasks = require('../models/TaskModel');

exports.CreateTask = (req,res) => {
    try{
        const {title, description, status} = req.body;
        const email = req.headers['email'];
        Tasks.create({title,description,status,email}, (err,data)=>{
            if(err){
                res.status(400).json({status:'fail',message:'Task create fail'});
            }else{
                res.status(200).json({status:'success',data:data});
            }
        });
    }catch (err) {
        res.status(400).json({error: 'Internal server error'});
    }
}

exports.DeleteTask = (req,res) => {
    try{
        const id = req.params.id;
        const Query = {_id:id};
        Tasks.remove(Query, (err,data)=>{
            if(err){
                res.status(400).json({status:'fail',message:'Task delete fail'});
            }else{
                res.status(200).json({status:'success',data:data});
            }
        });
    }catch (err) {
        res.status(400).json({error: 'Internal server error'});
    }
}
exports.UpdateTaskStatus = (req,res) => {
    try{
        const id = req.params.id;
        const Query = {_id:id};
        const reqBody = {status: req.params.status};
        Tasks.updateOne(Query, reqBody, (err,data)=>{
            if(err){
                res.status(400).json({status:'fail',message:'Task status update fail'});
            }else{
                res.status(200).json({status:'success',data:data});
            }
        });
    }catch (err) {
        res.status(400).json({error: 'Internal server error'});
    }
}
exports.listTaskByStatus = (req,res) => {
    try{
        const status = req.params.status;
        const email = req.headers['email'];
        Tasks.aggregate([
            {$match: {status:status,email:email}},
            {$project: {
                    _id:1,title:1,description:1,email:1,
                    createdAt: {
                        $dateToString: {
                            date: "$createdAt",
                            format: "%d-%m-%Y"
                        }
                    }
                }}
        ], (err,data)=>{
            if(err){
                res.status(400).json({status:'fail',message:'Task not found'});
            }else{
                res.status(200).json({status:'success',data:data});
            }
        });
    }catch (err) {
        res.status(400).json({error: 'Internal server error'});
    }
}
exports.TaskStatusCount = (req,res) => {
    try{
        const email = req.headers.email;
        Tasks.aggregate([
            {$match: {email:email}},
            {$group: {_id:"$status", sum:{$count:{}}}}
        ], (err,data)=>{
            if(err){
                res.status(400).json({status:'fail',message:'Task not found'});
            }else{
                res.status(200).json({status:'success',data:data});
            }
        });
    }catch (err) {
        res.status(400).json({error: 'Internal server error'});
    }
}