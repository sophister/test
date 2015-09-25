define('common:widget/oui/components/components', ['require', 'exports', 'module', 'common:widget/oui/components/calculator', 'common:widget/oui/components/latest-financial-plan', 'common:widget/oui/components/plan-performance', 'common:widget/oui/components/plan-quit-handler', 'common:widget/oui/components/list-factory', 'common:widget/oui/components/investment-terminal', 'common:widget/oui/components/transfer-confirmation'],function(require, exports, module) {
  
  var Components = {};
  
  // Components.Header = require('components/header');
  // Components.Footer = require('components/footer');
  // Components.Sidebar = require('components/sidebar');
  Components.Calculator = require('common:widget/oui/components/calculator');
  Components.LatestPlan = require('common:widget/oui/components/latest-financial-plan');
  Components.PlanPerformance = require('common:widget/oui/components/plan-performance');
  Components.PlanQuitHandler = require('common:widget/oui/components/plan-quit-handler');
  Components.ListFactory = require('common:widget/oui/components/list-factory');
  Components.InvestmentTerminal = require('common:widget/oui/components/investment-terminal');
  Components.TransferConfirmation = require('common:widget/oui/components/transfer-confirmation');
  
  module.exports = Components;
});
