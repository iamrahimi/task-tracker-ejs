const express = require('express');
const router = express.Router();
const {
    createTaskTracker, 
    getAllTaskTracker, 
    updateTaskTracker,
    deleteTaskTracker,
    getTaskTracker, 
    newTaskTracker
} = require('../controllers/taskTrackerController');

router.route('/new/').get(newTaskTracker);
router.route('/').post(createTaskTracker).get(getAllTaskTracker);
router.route('/:id').get(getTaskTracker).post(updateTaskTracker);
router.route('/delete/:id').post(deleteTaskTracker);
router.route('/new/').get(newTaskTracker);


module.exports = router;