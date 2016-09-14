import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('reports');
  // this.route('search', function(){
  //    this.route( 'results', { path: '/:searchType', queryParams: ['email']})
  // });
  this.route('search', { queryParams: ['email']})
  this.route('report');
});

export default Router;
