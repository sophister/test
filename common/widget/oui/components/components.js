define(function(require, exports, module) {
  
  var Components = {};
  
  Components.Header = require('components/header');
  Components.Footer = require('components/footer');
  Components.Sidebar = require('components/sidebar');
  Components.Calculator = require('components/calculator');
  Components.LatestPlan = require('components/latest-financial-plan');
  Components.PlanPerformance = require('components/plan-performance');
  Components.PlanQuitHandler = require('components/plan-quit-handler');
  Components.ListFactory = require('components/list-factory');
  Components.InvestmentTerminal = require('components/investment-terminal');
  Components.TransferConfirmation = require('components/transfer-confirmation');
  
  module.exports = Components;
});
