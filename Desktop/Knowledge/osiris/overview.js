import { Layout,Card,AutoComplete,Form,Table,message,Select,Modal, Button,notification,Icon,Popconfirm} from 'antd';

import React, { Component } from 'react';

import {Link} from "react-router-dom";

import globalVar from '../../utils/global';

import './Overview.css';
import SelectComponent from './Select';

//import PropTypes from 'prop-types';
const {Header,Footer,Content} = Layout;
const openNotification = (type,message) => {
  notification.open({
    message: message,
    
    icon:<Icon type={type} style={{color:'#108ee9'}}/>,
  });
};

class AppFrom extends Component {
  constructor(props) {
    super(props);
  
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);

    this.handlePrdlinesReturn = this.handlePrdlinesReturn.bind(this);
    this.handleTechlogyReturn = this.handleTechlogyReturn.bind(this);
    this.handleTypeReturn = this.handleTypeReturn.bind(this);
    this.handleSubscription = this.handleSubscription.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleUnSubscription = this.handleUnSubscription.bind(this);
    this.handlePopCancel = this.handlePopCancel.bind(this);
  
    this.selectValue = [];
    this.searchValue = '';
    
    this.state = {
      allApplications:[],
      applicationSelect:[],
      allApplicationSelect:[],
      apps: [],
      current: '',
      open: '',
 
      data:[{
        key: '1',
        appName: 'osiris',
        prdlines: "devops",
        tech_stack: "golang",
        type:'web',
        status:'good',
      }, {
        key: '2',
        appName: 'servergo',
        prdlines: "osiris",
        tech_stack: "js",
        type:'internet',
        status:'better',
      }, {
        key: '3',
        appName: 'fulishe',
        prdlines: "fulishe",
        tech_stack: "html",
        type:'hot',
        status:'best',
      }, {
        key: '4',
        appName: 'red',
        prdlines: "red",
        tech_stack: "css",
        type:'cold',
        status:'fun',
      },{
        key: '5',
        appName: 'falconalarm',
        prdlines: "osiris",
        tech_stack: "js",
        type:'hot',
        status:'good',
      }, {
        key: '6',
        appName: 'platform',
        prdlines: "red",
        tech_stack: "html",
        type:'hot',
        status:'better',
      }, {
        key: '7',
        appName: 'netdetect',
        prdlines: "fulishe",
        tech_stack: "css",
        type:'cold',
        status:'best',
      }, {
        key: '8',
        appName: 'devopssupport',
        prdlines: "devops",
        tech_stack: "js",
        type:'web',
        status:'fun',
      },{
        key: '9',
        appName: 'nocfront',
        prdlines: "devops",
        tech_stack: "html",
        type:'web',
        status:'good',
      }, {
        key: '10',
        appName: 'lusu',
        prdlines: "devops",
        tech_stack: "js",
        type:'cold',
        status:'better',
      }, {
        key: '11',
        appName: 'devopsrpc',
        prdlines: "red",
        tech_stack: "golang",
        type:'internet',
        status:'best',
      }, {
        key: '12',
        appName: 'kibana6',
        prdlines: "devops",
        tech_stack: "html",
        type:'cold',
        status:'fun',
        record:{},
      }],

     
      prdlineOptions:["devops","osiris","fulishe","red"],
      typeOptions:["web","internet","hot","cold"],
      techStackOptions:["golang","js","html","css"],

      buttonType:"primary",
      visible: false,
      appName:'',
      subscription:{},
      rowData:{},
    };
    this.data = [...this.state.data];
  
  }
  componentDidMount(){
      let self = this;

      const record_tmp ={};
         const {data} = this.state;
         data.forEach((item)=>{
         const {appName,key} = item;
         record_tmp[appName] = "primary";
         record_tmp[key] = "订阅";
         });
         self.setState({
          subscription:record_tmp,
         });
         
      self.fetchAllApplications();
      return fetch(globalVar.generateUrl('/devops/osiris/v1/applications'), {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        credentials: 'same-origin',
      }).then(res => {
        return res.json();
      }).then(res => {
        if (!res) {
          message.error(`获取应用列表失败, 请刷新一下`);
          return;
        }
        res = res.map(r => {
          r.name = r.name.String;
          return r;
        });
        this.originApps = res;
        if (res.length === 0) {
          this.setState({
            apps: res,
          });
          return;
        }
        if (!this.props.appname) {
          this.setState({
            apps: res,
            current: res[0].name,
            open: res[0].prdline_name,
          });
       
        } else {
          let prdline_name = '';
          for (let app of res) {
            if (app.name === this.props.appname) {
              prdline_name = app.prdline_name;
              break;
            }
          }
          this.setState({
            apps: res,
            current: this.props.appname,
            open: prdline_name,
          });
        }
      }).catch(error => {
        message.error(`fetch applications failed: ${error.message}`);
      });
  }

  fetchAllApplications = () => {
    fetch(globalVar.generateUrl('/devops/osiris/v1/applications'), {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      credentials: 'same-origin',
    }).then(res => {
      return res.json();
    }).catch(error => {
      message.error(`fetch applications failed: ${error.message}`);
    }).then(res => {
      const applicationSelect = [];
      for (let item of res) {
        applicationSelect.push(
          <Select.Option value={item.name.String} key={item.name.String}>{item.name.String}</Select.Option>
        );
      }
      this.setState({
        allApplications:res,
        applicationSelect,
        allApplicationSelect:applicationSelect,
      });
    });
  }

  onCloneSourceSelect = (value) => {
    const allApplicationsTmp = this.state.allApplications;
    const result = allApplicationsTmp.filter(item =>item.name.String === value);
    //console.log(result[0]);
    this.setState({
      cloneParams: result[0],
    });
  }

  handleAutoCompleteChange = (value) => {
    const applicationSelectTmp = this.state.allApplicationSelect;
    const result = applicationSelectTmp.filter(item => item.props.value.indexOf(value)!== -1);
    this.setState({
      applicationSelect: result,
    });
   }

   handleSelectChange(value) {
    this.selectValue = value;
    this._filterAndSearch(this.searchValue, this.selectValue);
  }

  handleSearchChange(ev) {
    this.searchValue = ev.target.value.trim();
    this._filterAndSearch(this.searchValue, this.selectValue);
  }

  _filterAndSearch(search, select) {
    let apps = this.originApps;
    let techArray = [];
    let typeArray = [];

    if (select.length !== 0){
      let tech = select[0];
      switch (tech) {
        case 'java':
          techArray.push(select[0] + "_" + select[1]);
          typeArray.push(select[2]);
          break;
        case 'python':
          techArray.push(tech);
          typeArray.push(select[1]);
          break;
        case 'nodejs':
          if(select[1] === "cache"){
            techArray.push(tech + '_cache');
          } else {
            techArray.push(tech);
          }
          typeArray.push(select[2]);
          break;
        case 'golang':
        case 'freestyle':
          techArray.push(tech);
          typeArray.push(select[1]);
          break;
      }
    }

    let r1 = apps.filter(app => {
      if (0 !== techArray.length && 0 !== typeArray.length) {
        return techArray.indexOf(app.tech_stack) >= 0 && typeArray.indexOf(app.type) >= 0;
      } else {
        return true;
      }
    });

    if (0 === search.length) {
      this.setState({
        apps: r1,
      });
      return;
    }

    let r = r1.filter(app => {
      let name = '' === app.name ? app.parent + '-' + app.child_name : app.name;
      return name.indexOf(search) >= 0;
    });

    this.setState({
      apps: r,
    });
    return;
  }

  handlePrdlinesReturn(value){
    let self = this;
    //debugger
    self.setState({
      data:self.state.data.filter(item=>value == item.prdlines),
    });
  }
  handleTechlogyReturn(value){
    let self = this;
    self.setState({
      data:self.state.data.filter(item=>value === item['tech_stack']),
    });
  }
  handleTypeReturn(value){
    let self = this;
    self.setState({
      data:self.state.data.filter(item=>value === item['type']),
    });
  }
  handleSubscription(e,record){
    e.stopPropagation();
    //const timeout = 2000;
    const self = this;
    const subscription_tmp = {...self.state.subscription};
    const {appName,key} = record;
    subscription_tmp[appName] = "default";
    subscription_tmp[key] = "取消订阅";
    self.setState({
      subscription:subscription_tmp,
    });
   if("订阅" === self.state.subscription[record.key]){
    openNotification("smile",`您成功订阅${appName}应用`);
    // setTimeout(()=>{
    //   window.location.href = `/app`;
    // },timeout);
   }
  }
  handleUnSubscription(e,record){
    e.stopPropagation();
    const self = this;
    const subscription_tmp = {...self.state.subscription};
    const {appName,key} = record;
    subscription_tmp[appName] = "primary";
    subscription_tmp[key] = "订阅";
    self.setState({
      subscription:subscription_tmp,
    });
    openNotification('meh',`您已经取消订阅${appName}应用了...`);
  }
  handleRowClick(record){
    let self = this;
    self.setState({
      visible: true,
      appName:record.appName,
      rowData:record,
    });
  }
  handleOk = () => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  handlePopCancel(e){
    e.stopPropagation();
  }
  handleReset(){
    const self = this;
    self.prdlinesForm.handleReset();
    self.techStackForm.handleReset();
    self.typeForm.handleReset();
    self.setState({
      data:self.data,
    });
  }
  render() {
    //const {getFieldDecorator} = this.props.form;
    let {applicationSelect,subscription,appName,data,prdlineOptions,techStackOptions,typeOptions,rowData} = this.state;

    const prdlinesTitle = <SelectComponent  wrappedComponentRef={(form) => this.prdlinesForm = form} type="业务线"  options={prdlineOptions}  handleReturn={this.handlePrdlinesReturn}/>;
    const techStackTitle = <SelectComponent  wrappedComponentRef={(form) => this.techStackForm = form} type="技术栈"  options={techStackOptions} handleReturn={this.handleTechlogyReturn}/>;
    const typeTitle = <SelectComponent  wrappedComponentRef={(form) => this.typeForm = form} type="类型"  options={typeOptions} handleReturn={this.handleTypeReturn}/>;

    const columns = [{
        title: '应用名称',
        dataIndex: 'appName',
        key: 'appName',
        width:'11%', 
       
      }, {
        title: prdlinesTitle,
        dataIndex: 'prdlines',
        key: 'prdlines',
        width:'23%',
      }, {
        title: techStackTitle,
        dataIndex: 'tech_stack',
        key: 'tech_stack',
        width:'23%',
      }, {
        title: typeTitle,
        dataIndex: 'type',
        key: 'type',
        width:'22%',
      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width:'7%',
      }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        width:'7%',
        render: (text, record) => subscription[record.appName] === "primary" ?<Button type={subscription[record.appName]}  
                                                                                      onClick={(e)=>this.handleSubscription(e,record)} >{subscription[record.key]}
                                                                              </Button>:
                                                                              <Popconfirm title="Are you sure?" 
                                                                                      onConfirm={e=>this.handleUnSubscription(e,record)} 
                                                                                      onCancel={e=>this.handlePopCancel(e,record)}   
                                                                                      okText="OK" cancelText="cancel" >
                                                                                  <Button type={subscription[record.appName]}  
                                                                                      onClick={(e)=>this.handleSubscription(e,record)} >{subscription[record.key]}
                                                                                  </Button>
                                                                              </Popconfirm> ,
        }];
    
    return (
      
      <Layout >
        <Header className="overviewHeader">        
         <div className="osirisApplication">Osiris应用管理平台</div>
         <div className="applicationNumWrapper">
           <div className="applicationNum">应用数</div>
           <div className="appnum">300</div>
        </div>
        <div className="routeWrapper">
           <div className="overviewRoute">路由</div>
           <div className="routenum">100</div>
        </div>
       </Header>
        <Content>
         <div style={{"display":"flex","marginTop":"10px"}}>
            <Card  className="searchCard">
            <p className="searchCardFont">应用查询</p>
            <label>名称:</label>
                <AutoComplete
                  style={{ width: 200 ,margin:20}}
                  dataSource={applicationSelect}
                  onSelect={this.onCloneSourceSelect}
                  onChange={this.handleAutoCompleteChange}
                />
            <div className="chartTop">
              <p className="applicationChartFont">应用列表</p>
              <Button onClick={this.handleReset} type="primary">重置</Button>
            </div>
            <Table columns={columns} dataSource={data} 
                   onRow={(record) => ({
                    onClick: ()=>this.handleRowClick(record),
                  })}  />
            <Modal
              title={`${appName}应用详情`}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[]}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
          
              {JSON.stringify(rowData) === "{}"?null:(subscription[appName] === "primary" ?<Button type={subscription[appName]}  
                                                                      onClick={(e)=>this.handleSubscription(e,rowData)} >{subscription[rowData.key]}
                                                                </Button>:
                                                              <Popconfirm title="Are you sure?" 
                                                                      onConfirm={e=>this.handleUnSubscription(e,rowData)} 
                                                                      onCancel={e=>this.handlePopCancel(e,rowData)}   
                                                                      okText="OK" cancelText="cancel" >
                                                                  <Button type={subscription[appName]}  
                                                                      onClick={(e)=>this.handleSubscription(e,rowData)} >{subscription[rowData.key]}
                                                                  </Button>
                                                              </Popconfirm>)}
            </Modal>
            </Card>
           
          <div className="rightCard">
            <div style={{"display":"flex","flexDirection":"column"}}>
                <Card title="快速创建应用" style={{ width: 300 }} >
                  <div className="links">
                    <Link to={`/app`}>跳转个人页</Link>
                    <Link to={`/creationApplication` }>创建应用</Link>
                    <Link to={`/router`}>路由快速查看</Link>
                 </div>
                </Card>
                <Card title="动态" style={{ "width": "300px","marginTop":"10px" }}>
                    <p>暂无动态</p>
                </Card>
            </div>
          </div>
         </div>
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
}

AppFrom.propTypes = {
  
};

const App = Form.create()(AppFrom);

export default App;
