const express        = require('express');
const router         = express.Router();
const Project       = require('./../../models/Project');

router.get('/', (req, res)=>{
    Project.find({}, (error, projects)=>{
        if(error){ 
            console.log(error)
        }else{
            res.json(projects);
        }
    })
});

//show project
router.get('/:id', (req, res)=>{
    let id = req.params.id;
    Project.findById(id, (error, foundProject)=>{
        if(error){
            res.json(error);
        }else{
            res.json(foundProject);
        }
    });
});

// Create new project
router.post('/add', (req, res)=>{
    let project = new Project(req.body);
    project.save()
        .then(project =>{
            res.status(200).json({'project': 'project added successfully'});
        })
        .catch(error =>{
            res.status(400).send('adding project failed');
        })
    ;
});

//update
router.post('/update/:id', (req, res)=>{
    let id = req.params.id;
    Project.findById(id, (error, foundProject)=>{
        if(!foundProject){
            res.status(error);
        }else{
            res.json(foundProject);
        }
    });
});


module.exports = router;