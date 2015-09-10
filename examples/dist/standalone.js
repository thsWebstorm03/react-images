(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Lightbox = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

module.exports = _react2['default'].createClass({
	displayName: 'Icon',
	propTypes: {
		type: _react2['default'].PropTypes.oneOf(Object.keys(_icons2['default']))
	},
	render: function render() {
		return _react2['default'].createElement('span', _extends({ dangerouslySetInnerHTML: { __html: _icons2['default'][this.props.type] } }, this.props));
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./icons":6}],2:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var BODY = document.getElementsByTagName('body')[0];

var Lightbox = _react2['default'].createClass({
	displayName: 'Lightbox',
	propTypes: {
		backdropClosesModal: _react2['default'].PropTypes.bool,
		className: _react2['default'].PropTypes.string,
		enableKeyboardInput: _react2['default'].PropTypes.bool,
		initialImage: _react2['default'].PropTypes.number,
		height: _react2['default'].PropTypes.number,
		images: _react2['default'].PropTypes.array,
		isOpen: _react2['default'].PropTypes.bool,
		onCancel: _react2['default'].PropTypes.func,
		showCloseButton: _react2['default'].PropTypes.bool,
		width: _react2['default'].PropTypes.number
	},
	getDefaultProps: function getDefaultProps() {
		return {
			backdropClosesModal: true,
			enableKeyboardInput: true,
			initialImage: 0,
			height: 600,
			width: 900
		};
	},
	getInitialState: function getInitialState() {
		return {
			currentImage: this.props.initialImage
		};
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		this.setState({
			currentImage: nextProps.initialImage
		});

		if (nextProps.isOpen && nextProps.enableKeyboardInput) {
			window.addEventListener('keydown', this.handleKeyboardInput);
		} else {
			window.removeEventListener('keydown', this.handleKeyboardInput);
		}

		if (nextProps.isOpen) {
			BODY.style.overflow = 'hidden';
		} else {
			BODY.style.overflow = null;
		}
	},

	handleKeyboardInput: function handleKeyboardInput(event) {
		if (event.keyCode === 37) {
			this.gotoPrevious();
		} else if (event.keyCode === 39) {
			this.gotoNext();
		} else if (event.keyCode === 27) {
			this.props.onCancel();
		} else {
			return false;
		}
	},
	gotoPrevious: function gotoPrevious() {
		if (this.state.currentImage === 0) return;

		this.setState({
			currentImage: this.state.currentImage - 1
		});
	},
	gotoNext: function gotoNext() {
		if (this.state.currentImage === this.props.images.length - 1) return;

		this.setState({
			currentImage: this.state.currentImage + 1
		});
	},

	renderArrowPrev: function renderArrowPrev() {
		if (this.state.currentImage === 0) return;
		// <Transition transitionName="react-transitiongroup-fade">
		// 	{(this.state.currentImage > 0) && <button type="button" style={Object.assign({}, styles.arrow, styles.arrowPrev)} onClick={this.gotoPrevious} className="octicon octicon-chevron-left" />}
		// </Transition>
		return _react2['default'].createElement(
			'button',
			{ type: 'button', style: _extends({}, styles.arrow, styles.arrowPrev), onClick: this.gotoPrevious },
			_react2['default'].createElement(_Icon2['default'], { type: 'arrowLeft' })
		);
	},
	renderArrowNext: function renderArrowNext() {
		if (this.state.currentImage === this.props.images.length - 1) return;
		// <Transition transitionName="react-transitiongroup-fade">
		// 	{(this.state.currentImage < (this.props.images.length - 1)) && <button type="button" style={Object.assign({}, styles.arrow, styles.arrowNext)} onClick={this.gotoNext} className="octicon octicon-chevron-right" />}
		// </Transition>
		return _react2['default'].createElement(
			'button',
			{ type: 'button', style: _extends({}, styles.arrow, styles.arrowNext), onClick: this.gotoNext, className: 'octicon octicon-chevron-right' },
			_react2['default'].createElement(_Icon2['default'], { type: 'arrowRight' })
		);
	},
	renderBackdrop: function renderBackdrop() {
		if (!this.props.isOpen) return;

		return _react2['default'].createElement('div', { key: 'backdrop', style: styles.backdrop, onClick: this.props.backdropClosesModal ? this.props.onCancel : null });
	},
	renderCloseButton: function renderCloseButton() {
		if (!this.props.showCloseButton) return;

		return _react2['default'].createElement(
			'button',
			{ key: 'close', style: styles.close, onClick: this.props.onCancel },
			'Close'
		);
	},
	renderDialog: function renderDialog() {
		if (!this.props.isOpen) return;

		return _react2['default'].createElement(
			'div',
			{ key: 'dialog', style: _extends({}, styles.dialog, { height: this.props.height, width: this.props.width }) },
			this.renderImages(),
			this.renderArrowPrev(),
			this.renderArrowNext(),
			this.renderCloseButton()
		);
	},
	renderImages: function renderImages() {
		var images = this.props.images;
		var currentImage = this.state.currentImage;

		if (!images || !images.length) return;

		// <Transition transitionName="react-transitiongroup-fade" style={styles.imageContainer} component="div">
		// 	<img key={'image' + currentImage} src={images[currentImage]} style={styles.image} />
		// </Transition>

		return _react2['default'].createElement('img', { key: 'image' + currentImage, src: images[currentImage], style: styles.image });
	},
	render: function render() {
		var props = (0, _blacklist2['default'])(this.props, 'backdropClosesModal', 'initialImage', 'height', 'images', 'isOpen', 'onCancel', 'showCloseButton', 'width');

		return _react2['default'].createElement(
			_Portal2['default'],
			props,
			this.renderDialog(),
			this.renderBackdrop()
		);
	}
});

var styles = {
	arrow: {
		background: 'none',
		border: 'none',
		bottom: 0,
		color: 'white',
		cursor: 'pointer',
		fontSize: 48,
		right: 0,
		outline: 'none',
		padding: '0 2%',
		position: 'absolute',
		top: 0,
		width: '10%',
		zIndex: 1002,

		// disable user select
		WebkitTouchCallout: 'none',
		WebkitUserSelect: 'none',
		MozUserSelect: 'none',
		msUserSelect: 'none',
		userSelect: 'none'
	},
	arrowNext: {
		right: 0
	},
	arrowPrev: {
		left: 0
	},
	backdrop: {
		backgroundColor: 'rgba(0,0,0,0.66)',
		bottom: 0,
		left: 0,
		position: 'fixed',
		right: 0,
		top: 0,
		zIndex: 1000
	},
	close: {
		background: 'none',
		border: 'none',
		bottom: -32,
		color: 'white',
		fontSize: 16,
		height: 32,
		left: 0,
		marginLeft: 'auto',
		marginRight: 'auto',
		outline: 'none',
		padding: 0,
		position: 'absolute',
		right: 0,
		textAlign: 'center',
		textTransform: 'uppercase',
		width: 100
	},
	dialog: {
		// backgroundColor: 'rgba(255,255,255,0.26)',
		left: 0,
		lineHeight: 1,
		marginLeft: 'auto',
		marginRight: 'auto',
		maxHeight: '100%',
		maxWidth: '100%',
		position: 'fixed',
		right: 0,
		top: '50%',
		zIndex: 1001,

		WebkitTransform: 'translateY(-50%)',
		MozTransform: 'translateY(-50%)',
		msTransform: 'translateY(-50%)',
		transform: 'translateY(-50%)'
	},
	image: {
		boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
		maxHeight: '100%',
		maxWidth: '80%',
		position: 'absolute',

		// center the image within the dialog
		left: '50%',
		top: '50%',
		WebkitTransform: 'translate(-50%, -50%)',
		MozTransform: 'translate(-50%, -50%)',
		msTransform: 'translate(-50%, -50%)',
		transform: 'translate(-50%, -50%)',

		// disable user select
		WebkitTouchCallout: 'none',
		WebkitUserSelect: 'none',
		MozUserSelect: 'none',
		msUserSelect: 'none',
		userSelect: 'none'

	}
};

module.exports = Lightbox;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Icon":1,"./Portal":3,"blacklist":undefined}],3:[function(require,module,exports){
(function (global){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

module.exports = _react2['default'].createClass({
	displayName: 'Portal',
	render: function render() {
		return null;
	},
	portalElement: null,
	componentDidMount: function componentDidMount() {
		var p = this.props.portalId && document.getElementById(this.props.portalId);
		if (!p) {
			var p = document.createElement('div');
			if (this.props.portalId) {
				p.id = this.props.portalId;
			}
			document.body.appendChild(p);
		}
		this.portalElement = p;
		this.componentDidUpdate();
	},
	componentWillUnmount: function componentWillUnmount() {
		document.body.removeChild(this.portalElement);
	},
	componentDidUpdate: function componentDidUpdate() {
		_react2['default'].render(_react2['default'].createElement(
			'div',
			this.props,
			this.props.children
		), this.portalElement);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
'use strict';

module.exports = '<svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xml:space="preserve">' + '<path d="M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z"/>' + '</svg>';

},{}],5:[function(require,module,exports){
'use strict';

module.exports = '<svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xml:space="preserve">' + '<path d="M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z"/>' + '</svg>';

},{}],6:[function(require,module,exports){
'use strict';

module.exports = {
	arrowLeft: require('./arrowLeft'),
	arrowRight: require('./arrowRight')
};

},{"./arrowLeft":4,"./arrowRight":5}]},{},[2])(2)
});