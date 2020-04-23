import {ProjectAeModule} from '../../app/project-ae/project-ae.module';
import {StartpageOverviewComponent} from '../../app/startpage/startpage-overview/startpage-overview.component';
import {Ng2StateDeclaration} from '@uirouter/angular';


export let startState: Ng2StateDeclaration = {
  name: 'start', // 'start.**'
  component: StartpageOverviewComponent,
  url: '/startpage-overview.component',
};

export let projectState: Ng2StateDeclaration = {
  name: 'createProject',
  loadChildren: () => import('../../app/project-ae/project-ae.module').then(mod => mod.ProjectAeModule),
  url: '/createProject',
  // loadChildren: '../project-ae/project-ae.module#ProjectAeModule'
};
