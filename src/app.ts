import _ from 'lodash';
import 'reflect-metadata';

import { Project } from './project.model';
import { plainToClass } from 'class-transformer';

declare var GLOBAL: string;

console.log(_.shuffle([1, 2, 3, 4]));

console.log(GLOBAL);

const fetchProjects = [
  { title: 'Javascript', price: 13 },
  { title: 'Typescript', price: 29.9 },
];

// const projects = fetchProjects.map(
//   (project) => new Project(project.title, project.price)
// );

const projects = plainToClass(Project, fetchProjects);

projects.forEach((project) => console.log(project.getInformation()));

// const project = new Project('Javascript', 13);
// console.log(project.getInformation());
