define(function(require, exports, module) {
  
  var Components = {};
  
  // Components.Header = require('components/header');
  // Components.Footer = require('components/footer');
  // Components.Sidebar = require('components/sidebar');
  Components.Calculator = require('./calculator');
  Components.LatestPlan = require('./latest-financial-plan');
  Components.PlanPerformance = require('./plan-performance');
  Components.PlanQuitHandler = require('./plan-quit-handler');
  Components.ListFactory = require('./list-factory');
  Components.InvestmentTerminal = require('./investment-terminal');
  Components.TransferConfirmation = require('./transfer-confirmation');
  
  module.exports = Components;
});
