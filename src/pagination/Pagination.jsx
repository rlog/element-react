import React from 'react';
import ReactDOM from 'react-dom';
import { Component, PropTypes } from '../../libs';
import Pager from './Pager';
import Select from '../select';
import locale from '../locale';

const Pre = (props) => {
  const disabled = props.internalCurrentPage <= 1 ? 'disabled' : '';
  return (
    <button className={`btn-prev ${disabled}`}
      onClick={ props.prev }>
      <i className="el-icon el-icon-arrow-left"></i>
    </button>
  );
}

const Next = (props) => {
  const disabled = props.internalCurrentPage === props.internalPageCount || props.internalPageCount === 0 ? 'disabled' : '';

  return (
    <button className={ `btn-next ${disabled}`}
      onClick={ props.next }>
      <i className="el-icon el-icon-arrow-right"></i>
    </button>
  );
}

class Sizes extends Component{
  render(){
    const { onSizeChange, internalPageSize } = this.props;

    return (
      <span className="el-pagination__sizes">
        <Select
          size="small"
          value={ internalPageSize }
          onChange={ onSizeChange }
          width={110}>
          {
            this.props.pageSizes.map((item, idx )=>{
              return <Select.Option
                  key={idx}
                  value={ item }
                  label={ item + ' ' + locale.t('el.pagination.pagesize') }>
                </Select.Option>
            })
          }
        </Select>
      </span>)
  }
};

const Total = (props) => {
  return (
    typeof props.total === 'number'
      ? <span className="el-pagination__total">{ locale.t('el.pagination.total', { total: props.total }) }</span>
      : ''
  );
};

class Jumper extends Component {
  handleChange({ target }) {
    const { jumper } = this.props;
    jumper(target.value);
  }

  handleFocus(){

  }

  render(){
    return (
      <span className="el-pagination__jump">
        { locale.t('el.pagination.goto') }
        <input
          className="el-pagination__editor"
          type="number"
          min={ 1 }
          max={ this.props.internalPageCount }
          defaultValue={ this.props.internalCurrentPage }
          onBlur={ this.handleChange.bind(this) }
          onKeyUp={ e => {if(e.keyCode == 13){this.handleChange(e)}}}
          onFocus={ this.handleFocus.bind(this) }
          style={{ width: '30px' }}/>
        { locale.t('el.pagination.pageClassifier') }
      </span>
    );
  }
}

export default class Pagination extends Component{
  constructor(props, context){
    super(props, context);

    const { currentPage, pageSizes,  pageSize} = this.props;
    let internalPageSize = 0;

    if (Array.isArray(pageSizes)) {
      internalPageSize = pageSizes.indexOf(pageSize) > -1 ? pageSize : pageSizes[0];
    }

    this.state = {
      internalPageSize: internalPageSize
    }
    this.state.internalCurrentPage =  currentPage ? this.getValidCurrentPage(currentPage) : 1
  }

  pre(){
    const oldPage = this.state.internalCurrentPage;
    const newVal = this.state.internalCurrentPage - 1;

    this.setState({
      internalCurrentPage: this.getValidCurrentPage(newVal)
    }, ()=>{
      if (this.state.internalCurrentPage !== oldPage) {
        const onCurrentChange = this.props.onCurrentChange;
        onCurrentChange && onCurrentChange(this.state.internalCurrentPage);
      }
    });
  }

  next(){
    const oldPage = this.state.internalCurrentPage;
    const newVal = this.state.internalCurrentPage + 1;
    
    this.setState({
      internalCurrentPage: this.getValidCurrentPage(newVal)
    }, ()=>{
      if (this.state.internalCurrentPage !== oldPage) {
        const onCurrentChange = this.props.onCurrentChange;
        onCurrentChange && onCurrentChange(this.state.internalCurrentPage);
      }
    });
  }

  getValidCurrentPage(value){
    value = parseInt(value, 10);

    let internalPageCount = this.internalPageCount();

    const havePageCount = typeof internalPageCount === 'number';

    let resetValue;
    if (!havePageCount) {
      if (isNaN(value) || value < 1) resetValue = 1;
    } else {
      if (value < 1) {
        resetValue = 1;
      } else if (value > internalPageCount) {
        resetValue = internalPageCount;
      }
    }

    if (resetValue === undefined && isNaN(value)) {
      resetValue = 1;
    } else if (resetValue === 0) {
      resetValue = 1;
    }

    return resetValue === undefined ? value : resetValue;
  }

  internalPageCount(){
    if (typeof this.props.total === 'number') {
      return Math.ceil(this.props.total / this.state.internalPageSize);
    } else if (typeof this.props.pageCount === 'number') {
      return this.props.pageCount;
    }
    return null;
  }

  jumperToPage(page){
    const oldPage = this.state.internalCurrentPage;
    this.setState({
      internalCurrentPage: this.getValidCurrentPage(page)
    }, ()=>{
      if (oldPage !== this.state.internalCurrentPage) {
        const onCurrentChange = this.props.onCurrentChange;
          onCurrentChange && onCurrentChange(this.state.internalCurrentPage);
      }
    });

    //this.oldValue = null;
  }

  handleCurrentChange(val){
    const oldPage = this.state.internalCurrentPage;
    this.setState({
      internalCurrentPage: this.getValidCurrentPage(val)
    }, ()=>{
      if (oldPage !== this.state.internalCurrentPage) {
        const onCurrentChange = this.props.onCurrentChange;
          onCurrentChange && onCurrentChange(this.state.internalCurrentPage);
      }
    });
  }

  onSizeChange(val){
    if (val !== this.state.internalPageSize) {
      val = parseInt(val, 10);
      this.setState({
        internalPageSize: val
      }, ()=>{
        const { onSizeChange } = this.props;
        onSizeChange(val);
      });
    }
  }

  render(){
    const { internalCurrentPage, internalPageSize } = this.state;

    const className = this.classNames({
      'el-pagination': true,
      'el-pagination__rightwrapper': false,
      'el-pagination--small': this.props.small
    });

    const children = [];
    const layout = this.props.layout || '';

    if (!layout) return null;

    const components = layout.split(',').map((item) => item.trim());
    const TEMPLATE_MAP = {
      prev:   <Pre key='pre' internalCurrentPage={ internalCurrentPage } prev={ this.pre.bind(this) }/>,
      jumper: <Jumper 
                key='jumper'
                jumper={ this.jumperToPage.bind(this) }
                internalPageCount={ this.internalPageCount() } 
                internalCurrentPage={ internalCurrentPage }/>,
      pager:  <Pager 
                key='pager'
                currentPage={ internalCurrentPage } 
                pageCount={ this.internalPageCount() } 
                onChange={ this.handleCurrentChange.bind(this) }/>,
      next:  <Next 
               key='next'
               internalCurrentPage={ internalCurrentPage } 
               internalPageCount={ this.internalPageCount() } 
               next={ this.next.bind(this) }/>,
      sizes: <Sizes 
              key='sizes'
              internalPageSize={ internalPageSize } 
              pageSizes={ this.props.pageSizes } 
              onSizeChange={ this.onSizeChange.bind(this) }/>,
      total: <Total key='total' total={ this.props.total }/>
    }

    components.forEach(compo => {
      if (compo !== '->') {
        children.push(TEMPLATE_MAP[compo]);
      }
    });

    return (
      <div className={className}>
        {children}
      </div>
    );
  }
}

Pagination.propTypes = {
  pageSize: PropTypes.number,
  small: PropTypes.bool,
  total: PropTypes.number,
  pageCount: PropTypes.number,
  currentPage: PropTypes.number,
  layout: PropTypes.string,
  pageSizes: PropTypes.array,
  small: PropTypes.bool,

  //Event
  onCurrentChange: PropTypes.func,
  onSizeChange: PropTypes.func
};

Pagination.defaultProps = {
  small: false,
  pageSize: 10,
  currentPage: 1,
  layout: 'prev, pager, next, jumper, ->, total',
  pageSizes: [10, 20, 30, 40, 50, 100]
};

