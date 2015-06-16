import React from 'react';
import CssTranshand from 'SRC/CssTranshand';
import assign from 'lodash/object/assign';

export default class App extends React.Component {

  constructor() {

    super();

    this.state = {
      currDomElem: undefined,
    };
  }

  componentDidMount() {
    window.addEventListener('click', this.handleSelectClick);
  }

  handleSelectClick = (e) => {
    var deTarget = this.elementFromPoint(e.clientX, e.clientY);

    if (deTarget && deTarget._handlerDemo) {
      this.setState({currDomElem: deTarget});
    }
    else {
      this.setState({currDomElem: undefined});
    }
  }

  elementFromPoint(x, y) {
    var deHandler = React.findDOMNode(this.refs.handler);
    var deTarget;
    var get = () => deTarget = document.elementFromPoint(x, y);

    if (deHandler) {
      let save = deHandler.style.display;
      deHandler.style.display = 'none';
      get();
      deHandler.style.display = save;
    }
    else {
      get();
    }

    return deTarget;
  }

  handleChange = (change) => {

    console.log('change event:', change);

    var { currDomElem } = this.state,
        params = currDomElem._handlerParams;

    assign(params, change);

    currDomElem.style.transform = this.generateCssTransform(params);
    currDomElem.style.transformOrigin = `${params.ox*100}% ${params.oy*100}%`;

    this.forceUpdate();
  }

  generateCssTransform(params) {

    var cssTransform = '';

    cssTransform += ' translateX(' + params.tx + 'px)';
    cssTransform += ' translateY(' + params.ty + 'px)';
    cssTransform += ' rotate(' + params.rz + 'rad)';
    cssTransform += ' scaleX(' + params.sx + ')';
    cssTransform += ' scaleY(' + params.sy + ')';

    return cssTransform;
  }

  render() {

    var {currDomElem} = this.state;

    if (currDomElem) {

      return <CssTranshand
        ref = 'handler'
        deTarget = {currDomElem}
        params = {currDomElem._handlerParams}
        onChange = {this.handleChange}
        onClick = {this.handleSelectClick}/>;
    }
    else {
      return <div hidden={true}/>;
    }
  }
}