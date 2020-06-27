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
projectController.getProjectDetail = (event, arg) => {
  try {
    let data = db.get('projectList')
      .find({id: arg})
      .value()
    event.returnValue = data;
  } catch (error) {
    console.log(error);
    event.returnValue = 500;
  }
}
projectController.addNewProjectItem = (event, arg) => {
  arg.request = arg.request ? arg.request : {};
  arg.response = arg.response ? arg.response : {};
  const parameterList = db.get('projectList')
  .find({id: arg.projectId})
  .value();
  console.log(arg, parameterList);
}

export default projectController;
