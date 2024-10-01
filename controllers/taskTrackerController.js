const express = require('express');
const Project = require('../models/Project');
const User = require('../models/User');
const TaskTracker = require('../models/Task-tracker');
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, CustomAPIError } = require('../errors');
const { exist } = require('joi');


const newTaskTracker = async function (req, res) {
    const project = await Project.find();
    const user = await User.find();

    return res.render("task-trackers/taskTrackerNew", {csrfToken: req.csrfToken(), project: project, user: user});
}

const createTaskTracker = async function (req, res) {
    const taskTracker = await TaskTracker.create(req.body);
    // return res.status(StatusCodes.CREATED).json({status: true, data: taskTracker});  
    res.writeHead(302, {
        'Location': '/api/v1/task-trackers'
      });
      res.end();
}

const getAllTaskTracker = async function (req, res) {

    const user = await User.find();
    let taskTracker; 
        taskTracker =  TaskTracker.find();

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    taskTracker = taskTracker.skip(skip).limit(limit);
    taskTracker = await taskTracker;

    return res.render("task-trackers/taskTrackerHome", {tasks: taskTracker, csrfToken: req.csrfToken()});

}

const getTaskTracker = async function (req, res) {
    const taskTracker = await TaskTracker.findById(req.params.id);
    
    return res.render("task-trackers/taskTrackerEdit", {csrfToken: req.csrfToken(), task: taskTracker });
}

const updateTaskTracker = async function (req, res) {
    const taskTrackerData = await TaskTracker.findById(req.params.id)
    .populate('projectId');

    const title = req.body.title || taskTrackerData.title;
    const description = req.body.description || taskTrackerData.description;
    const status = req.body.status || taskTrackerData.status;
    const proiority = req.body.proiority || taskTrackerData.proiority;
    const assignedTo = req.body.assignedTo || taskTrackerData.assignedTo;


    const taskTracker = await TaskTracker.findByIdAndUpdate(
        {_id: req.params.id}, 
        {status:status, 
            title: title, 
            description: description, 
            proiority:proiority, 
            assignedTo:assignedTo}, 
        { new: true, runValidators: true });

        res.writeHead(302, {
            'Location': '/api/v1/task-trackers'
          });
          res.end();
    // return res.status(StatusCodes.CREATED).json({status: true, data: taskTracker}); 
    
}

const deleteTaskTracker = async function (req, res) {
    const taskTrackerData = await TaskTracker.findById(req.params.id)
    .populate('projectId');
   
        const taskTracker = await TaskTracker.findByIdAndRemove(req.params.id);
        if (!taskTracker) {
            throw new NotFoundError(`No task found`);
          }
        //   res.status(StatusCodes.OK).json({status: true, msg: "Successfully deleted"});
          res.writeHead(302, {
            'Location': '/api/v1/task-trackers'
          });
          res.end();

}



module.exports = {
    createTaskTracker, 
    getAllTaskTracker, 
    getTaskTracker, 
    updateTaskTracker,
    deleteTaskTracker,
    newTaskTracker
}


