import angular from 'angular';
import 'angular-mocks';

import './sanji-core-ui';
import sjToken from './index';

describe('Container component', () => {
  let $rootScope;
  let $q;
  let controller;
  let sandbox;

  beforeEach(angular.mock.module(sjToken));

  beforeEach(angular.mock.inject(($componentController, _$rootScope_, _$q_, <%= serviceName %>) => {
    $rootScope = _$rootScope_;
    $q = _$q_;
    sandbox = sinon.sandbox.create();
    controller = $componentController('<%= containerComponentName %>', {
      service: <%= serviceName %>
    });
  }));

  afterEach(() => {
    sandbox.restore();
  });

  it('should have empty data before activation', () => {
    controller.data.should.exist;
  });

  it('should config data on init', () => {
    sandbox.stub(controller.service, 'get', () => $q.when());
    controller.$onInit();
    $rootScope.$apply();
    controller.service.get.should.be.calledOnce;
  });

  it('should refresh data', () => {
    sandbox.spy(controller.service, 'get');
    controller.refresh();
    controller.service.get.should.be.calledOnce;
  });
});
