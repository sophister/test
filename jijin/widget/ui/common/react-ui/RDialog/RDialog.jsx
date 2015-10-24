//将 common 中的 Dialog  封装成 React component

var React = require('react');
var ReactDOM = require('react-dom');
// var $ = require('jquery');
// var Dialog = require('common:widget/ui/dialog/dialog.js');


var RDialog = React.createClass({

	getInitialState : function(){

		console.log('RDialog getInitialState', this.props );

		var props = this.props;
		return {
			showing : false
		};
	},

	getDefaultProps : function(){
		console.log( 'RDialog getDefaultProps' );
		return {
			showing : false,
			title : ''
		};
	},

	componentDidMount : function(){
		console.log('RDialog mount ');

		this.node = ReactDOM.findDOMNode(this);
		
		var a = 11;
	},

	componentWillReceiveProps : function(newProps){
		console.log( 'RDialog componentWillReceiveProps : ', newProps );

		this.setState({
			showing : newProps.showing
		});
	},

	componentDidUpdate : function(){
		console.log('RDialog componentDidUpdate');

		var node = ReactDOM.findDOMNode(this);

		if( this.node && this.node !== node ){
			debugger;
		}

		this.node = node;

		var xx = 1;
	},

	componentWillUnmount : function(){
		console.log('RDialog componentWillUnmount');
	},

	handleCloseClick : function(){
		console.log( this );

		if( typeof this.props.onClose === 'function' ){
			this.props.onClose();
		}else{
			this.setState({
				showing : false
			});
		}
	},

	render : function(){

		console.log( 'RDialog render');

		if( ! this.state.showing ){
			return null;
		}

		return (
				<div className="rui-dialog-con">
					<div className="rui-dialog-mask"></div>
					<div className="rui-dialog">
						<div className="rui-dialog-header">
							<h1 className="rui-dialog-title">{ this.props.title }</h1>
							<span className="rui-dialog-close-btn" onClick={this.handleCloseClick}>&times;</span>
						</div>
						<div className="rui-dialog-body">
							{ this.props.children }
						</div>
					</div>
				</div>
			);
	}

});


module.exports = RDialog;

