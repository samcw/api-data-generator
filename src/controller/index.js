import db from '../database/database';

let projectController = {};

projectController.getProjectList = (event, arg) => {
  let projectList = db.get('projectList').value();
  console.log(projectList);
  event.returnValue = projectList;
}
projectController.addProject = (event, arg) => {
  try {
    db.get('projectList')
    .insert(arg)
    .write();
    event.returnValue = 200;
  } catch (error) {
    console.error(error);
    event.returnValue = 500;
  }

}

export default projectController;
