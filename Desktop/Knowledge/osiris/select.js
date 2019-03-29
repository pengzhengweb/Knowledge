import { Select,Form} from 'antd';

import React, { Component } from 'react';

import "./Select.css";

const Option = Select.Option;

 class SelectComponentForm extends Component {
  constructor(props){
      super(props);
     
      this.handleChange = this.handleChange.bind(this);
      //this.handleFoucs = this.handleFoucs.bind(this);
      //this.handleClear = this.handleClear.bind(this);
      this.handleReset = this.handleReset.bind(this);
  }
  handleChange(value){
    let self = this;
    self.props.handleReturn(value);
  }
  handleReset(){
    let self = this;
    self.props.form.resetFields();
  }

  render() {
    const {type,options,form} = this.props;
    const {getFieldDecorator} = form;


    return (
        <div className="titleStyle">
        <span>{type}</span>
        <Form style={{ "width": "100px","marginLeft": "8px","marginTop": "-5px"}}>
          {getFieldDecorator('value',
          {initialValue:"",
        })(
          <Select
          showSearch
          // allowClear={this.handleClear}
          placeholder="select"
          optionFilterProp="children"
          onChange={this.handleChange}
          // onFocus={this.handleFocus}
         
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
          {options.map(item=><Option key={item} value={item}>{item}</Option>)} 
          </Select>)}
        </Form>
       
       </div>
    );
  }
}
const SelectComponent = Form.create()(SelectComponentForm);

export default SelectComponent;
