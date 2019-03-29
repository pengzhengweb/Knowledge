// 菜单授权
import { Row, Col, Tabs, Button, Table, Input, Popconfirm, message, Divider, Modal, Select,Icon,Checkbox} from 'antd';

import { $http } from '../../containers/config/https';

import React from 'react';

import '../../assets/css/menuAuthorization.css';
import MenuAuthorzationModel from './MenuAuthorzationModel'


const TabPane = Tabs.TabPane;
const Option = Select.Option;


export default class Menuauthorization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windowheight: window.innerHeight,
            id: '',
            visible: false,
            leftTabLoading: true,//加载中
            rightTabLoading: true,//加载中
            // data: this.data,
            datasource1: [],//获取科室表数据
            datasource: [], // 左侧table数据
            datasource2: [],//查出左侧select框里的数据
            AuthorizationList: [],//查询tab的数据
            activeKey: '1',
            //  menuData: [],//主菜单选中后当中的值
            menuDetailDate: [],//菜单明细选中后当中的值
            selectMenu: [],//获取下拉框的数据
            selectData: [],//获取科室下拉数据
            data: [],//右侧table表格数据
            selectrowLoc: "",//获取行菜单授权
            selectrow: "",//获取行
            // selectMent: "",//获取下拉主菜单
            selectLoc: "",//获取科室
            selectedRows: [],//增加菜单明细
            selectedRowKeys: [],
            // 菜单选中后当中的值
            menuKey: '',
            // 主菜单分页数据
            total: 0,
            page: 1,//当前页
            pageSize: 10,
            title: '',
            roleId: "",

            hidden:true,
        }
    }

    componentWillReceiveProps(nextProps) {
        // 当修改选择的数据后刷新数据
        if (nextProps.roleId !== '') {
            this.getDetailData(nextProps.roleId)
            this.getAuthorizationList(nextProps.roleId);
            this.setState({ roleId: nextProps.roleId })
            this.setState({ selectrow: "" })
            this.setState({ selectedRows: "" })
        } else {
            this.setState({ roleId: "" })

        }
    }

    componentDidMount() {
        // console.log(store.getState().tableHeight)
        if (this.props.roleId !== '') {
            this.getDetailData(this.props.roleId)
            // this.getDetailData();
            this.setState({ selectrow: "" })
            this.setState({ selectedRows: "" })
            this.getAuthorizationList(this.props.roleId);
            this.setState({ roleId: this.props.roleId })
        }

        // 初始化左侧table数据
        //this.handleQuery();
        //this.handleSelectC();
        this.handleSelectChange();//下拉框科室查到表格数据
    }

    // 获取主菜单下拉
    getDetailData = (roleId) => {
        let data = {//获取角色菜单明细授权所用到的信息
            params: [{
                GroupDr: roleId,
                Type: this.state.activeKey,
            }]
        }
        //debugger
        $http.post('urlS', this, {
            code: "2606",
            data: data,
            success: (res) => {
                if (+res.errorCode === 0) {
                    // message.success('保存成功');
                    //console.log(res)
                    this.setState({
                        menuDate: res.result && res.result.MainMenu,
                        datasource: res.result && res.result.MenuDetail,
                        datasource2: res.result && res.result.MenuDetail,
                        selectMent: res.result.GroupMainMenu,
                        leftTabLoading: false
                    })
                } else {
                    message.error('失败：' + res.errorMessage);
                }
            },
            error: (error) => {
                message.error('失败：' + error);
            }
        })
    }

    // 下拉框主菜单 
    handleChange = (k) => {
        this.setState({ menuKey: k })
    }
    // 下拉框菜单明细科室的
    handleChangeS = (k) => {
        this.setState({ id: k })
    }
    // 下拉框主科室获取 
    handleChangeSelect = (k) => {
        this.setState({ selectLoc: k })
    }

    // 下拉框科室查到表格数据
    handleSelectChange = () => {
        let user = window.sessionStorage.userData ? JSON.parse(window.sessionStorage.userData) : {};
        let data = {
            params: [{
                hospID: user.hospDr,
            }]
        }
        $http.post('urlS', this, {
            code: "1008",
            data: data,
            success: (res) => {
                //  console.log("123",res.hbLoc)
                //console.log(res.hbLoc && res.result.hbLoc|| [])
                res.hbLoc.map((item, index) => {
                    res.hbLoc[index].key = index;
                    return res.hbLoc;
                })
                if (+res.errorCode === 0) {
                    this.setState({
                        selectData: res.hbLoc
                    })
                }
            }
        })
    }
    //查询菜单授权查询科室权限信息
    handleSelectC = (id) => {
        //console.log(this.state.selectrow)
        let data = {
            params: [{
                MenuSubID: id
            }]
        }
        $http.post('urlS', this, {
            code: "2607",
            data: data,
            success: function (res) {
                if (+res.errorCode === 0) {
                    res.result.Data.map((item, index) => {
                        res.result.Data[index].key = index;
                        return res.result.Data;
                    })
                    //   console.log(res.result.Data)
                    this.setState({ datasource1: res.result.Data })
                    this.setState({ selectrow: id })
                }
            }
        })
    }
    //查询菜单明细 
    handleQuery = () => {
        let data = {
            params: [{
                Code: "",
                Descripts: ""

            }],
            pagination: [{
                pageSize: "",
                currentPage: "",
                sortColumn: "Code",
                sortOrder: "asc"
            }]
        }
        $http.post('urlS', this, {
            code: "2301",
            data: data,
            success: function (res) {
                if (+res.errorCode === 0) {
                    res.result.Data.map((item, index) => {
                        res.result.Data[index].key = index;
                        return res.result.Data;
                    })
                    //   console.log(res.result.Data)
                    this.setState({ datasource: res.result.Data })
                     console.log(res.result.Data)
                    // data: res.result.Data
                } else {
                    message.error('查询失败：' + res.errorMessage);
                }
            }
        })
    }
    mapDataToKey = arr => {
        const that = this
        return arr.map(item => {
            if (item.children && item.children.length > 0) {
                that.mapDataToKey(item.children)
            }
            return { ...item, key: item.ID }
        })
    }
    //查询授权菜单
    getAuthorizationList = (roleId) => {
        let { page, pageSize } = this.state;
        let data = {
            params: [{
                GroupDr: roleId,
                Type: this.state.activeKey,
            }],
            pagination: [{
                pageSize: pageSize,
                currentPage: page,
            }]
        }
        $http.post('urlS', this, {
            code: "2601",
            data: data,
            success: (res) => {
                if (+res.errorCode === 0) {
                    res.result.Data.map((item, index) => {
                        res.result.Data[index].key = index;
                        return res.result.Data;
                    })
                    this.setState({
                        data: this.mapDataToKey(res.result.Data),
                        // data: res.result.Data,
                        total: res.result.TotalCount,
                        rightTabLoading: false

                    })
                } else {
                    message.error('查询失败：' + res.errorMessage);
                }
            }
        })
    }
    // 新增角色菜单授权科室权限信息
    handelSave = () => {
        //console.log(this.state.selectrow)
        let user = window.sessionStorage.userData ? JSON.parse(window.sessionStorage.userData) : {};
        let data = {
            params: [{
                LocDr: this.state.id,
                MenuSubID: this.state.selectrow,
                UpdateUserDr: user.userId
            }]
        }
        $http.post('urlS', this, {
            code: "2608",
            data: data,
            success: (res) => {
                if (+res.errorCode === 0) {
                    message.success('新增成功');
                    //this.getAuthorizationList(this.props.roleId);
                    this.handleSelectC(this.state.selectrow)
                }
            }
        })
    }


    // 新增菜单明细授权信息
    handelAdd = () => {
       // debugger
        if (this.state.selectedRows.length > 0) {
            let user = window.sessionStorage.userData ? JSON.parse(window.sessionStorage.userData) : {};
            let data = {
                params: [{
                    GroupDr: this.state.roleId,
                    Type: this.state.activeKey,
                    MenuDetail: [],
                }]
            }
            this.state.selectedRows.map((item) => {
                return data.params[0].MenuDetail.push({
                    MenuDetailDr: item.id,
                    SeqNo: '',
                    LocDr: '',
                    PreMenuGroupDr: this.state.selectrow,
                    UpdateUserDr: user.userId
                });
            })
            $http.post('urlS', this, {
                code: "2602",
                data: data,
                success: (res) => {
                    if (+res.errorCode === 0) {
                        message.success('新增成功');
                        this.getAuthorizationList(this.props.roleId);
                        this.getDetailData(this.props.roleId);
                        this.setState({ selectedRowKeys: [] });
                        this.setState({selectrow:'' });
                        this.setState({selectedRows:'' });
                       
                      
                    } 
                },
                error: (error) => {
                    message.error('新增失败：' + error);
                }
            })
        } else {
            message.error("请勾选后再点击增加");
        }
    }
    //在行上获取子级
    onClickRow = (record) => {
        return {
            onClick: () => {
                if (this.state.selectrow === "") {
                    this.setState({
                        selectrow: record.ID
                    });
                } else {
                    if (this.state.selectrow !== record.ID) {
                        this.setState({
                            selectrow: record.ID
                        });
                    } else {
                        this.setState({
                            selectrow: "",
                        });
                    }
                }

            },
            onMouseEnter: () => {
                //debugger
            }
        }

    }
    setRowClassName = (record) => {
        return record.ID === this.state.selectrow ? 'clickRowStyl' : '';
    }
    // 删除
    handleDetele(record, index) {
        // console.log(record, index)
        let data = {

            params: [{
                ID: record.ID
            }]
        }
        $http.post('urlS', this, {
            code: '2604',
            data: data,
            success: function (res) {
                if (+res.errorCode === 0) {
                    message.success('删除成功');
                    this.getAuthorizationList(this.props.roleId);
                }
            },
            error: function (error) {
                message.error('删除失败：' + error);
            }
        })
    }
    // 删除角色菜单授权科室权限信息
    handleDel(record) {
        //console.log(record)
        let data = {
            params: [{
                ID: record.ID
            }]
        }
        $http.post('urlADS', this, {
            code: '2609',
            data: data,
            success: function (res) {
                //console.log(res)
                if (+res.errorCode === 0) {
                    message.success('删除成功');
                    // 刷新列表数据
                    this.handleSelectC(this.state.selectrow)
                }
            },
            error: function (error) {
                message.error('删除失败：' + error);
            }
        })
    }
    //弹出科室
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    showModal = (id) => {
       // console.log(this.state.selectrow)
        this.handleSelectC(id);
        this.setState({
            visible: true
        });

    }


    handleCancel = (e) => {
       // console.log(this.state.selectrow)
        this.setState({
            visible: false,
        });
    }

    onChangeTabs = (k) => {//主菜单下拉
        this.setState({
            activeKey: k
        }, () => {
            if (this.props.roleId !== '') {
                this.getAuthorizationList(this.props.roleId);
                this.getDetailData(this.props.roleId)
            }
        }
        )
    }

    // 页码改变的回调，参数是改变后的页码及每页条数
    onChange = (page, pageSize) => {
        this.setState({ page: page, pageSize: pageSize }, () => {
            // 重新调用查询方法
            this.getAuthorizationList(this.props.roleId);
        });
    }
    // 条数改变的回调
    onShowSizeChange = (current, size) => {
        this.setState({ page: current, pageSize: size }, () => {
            // 重新调用查询方法
            this.getAuthorizationList(this.props.roleId);
        });
    }

    //查询文本框
    handleSelectFilterItem = value => {
        this.setState({
            filterItem_select: value
        })
    }
    //查询文本框和下拉框
    filterDatasource = () => {
        const { datasource2, filterItem_input, filterItem_select } = this.state;
        const resData = datasource2.filter(item => {
            if (filterItem_input && filterItem_input !== '' && filterItem_input !== ' ') {
                if (filterItem_select === 'isMenu') {
                    return item.descripts && item.descripts.indexOf(filterItem_input) > -1 && item.MenuGroup === '是'
                } else if (filterItem_select === 'isFilterMenu') {
                    return item.descripts && item.descripts.indexOf(filterItem_input) > -1 && item.MenuGroup === ''
                }
                return item.descripts.indexOf(filterItem_input) > -1
            } else if (filterItem_select === 'isMenu') {
                return item.MenuGroup === '是'
            } else if (filterItem_select === 'isFilterMenu') {
                return item.MenuGroup === ''
            }
            return item
        })
        this.setState({
            datasource: resData
        })
    }

    renderPage = (key) => {
        let rThis = this
        const columns = [{
            title: '菜单名称',
            dataIndex: 'MenuDetailDrDesc',
            key: 'MenuDetailDrDesc',
            width: 100,
            align: 'left'
        }, {
            title: '权限名称',
            dataIndex: '',
            key: 'x',
            width: 100,
            align: "center",
            render: (text, record, index) => (
                <div>
                    <div>
                        {/* {
                            <Popconfirm title="删除不可恢复，你确定要删除吗?" onConfirm={rThis.handleDetele.bind(rThis, record, index)} >
                                <span className="span">删除</span>
                            </Popconfirm>
                        } */}
                        <span onClick={this.showModal.bind(this, record.ID)} className="span">设置</span>
                    </div>

                </div>
            )
        }, {
            title: '菜单组',
            dataIndex: 'MenuGroup',
            width: 80,
            key: "MenuGroup"
        }
        ];
        const colcolumns = [{
            title: '菜单名称',
            dataIndex: 'descripts',
            width: 100,
            key: "descripts"
        }, {
            title: '菜单组',
            dataIndex: 'MenuGroup',
            width: 100,
            key: "MenuGroup"
        }]
        const { selectedRowKeys } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRows, selectedRowKeys });
                if(selectedRowKeys.length === 0&&selectedRowKeys[0]===0){
                    this.setState({
                        hidden:false,
                    })
                }
            },
            onSelect: (record, selected, selectedRows) => {
                this.setState({ selectedRows });
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                this.setState({ selectedRows });
            }
        };
        return (
            <div key={key}>
                <div className={"flexBox"}>
                    <div className={"leftTbale"}>
                      <Row style={{ marginBottom: '1rem' }}>
                           <Col span={24}>
                              <span style={{color:'green'}}>待选菜单</span>
                           </Col>
                        </Row>
                        <Row style={{ marginBottom: '1rem' }}>
                            <Col span={9}>
                                <Input onChange={e => this.setState({ filterItem_input: e.target.value })} />
                            </Col>
                            <Col span={9} offset={1}>
                                <Select
                                    showSearch
                                    placeholder="请输入"
                                    optionFilterProp="children"
                                    style={{ width: '100px' }}
                                    onChange={this.handleSelectFilterItem}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="all">全部</Option>
                                    <Option value="isMenu">菜单组</Option>
                                    <Option value="isFilterMenu">非菜单组</Option>
                                </Select>
                            </Col>
                            <Col span={4}  offset={1}>
                                <Button type="primary" onClick={this.filterDatasource}>查询</Button>
                            </Col>
                        </Row>
                        <Row style={{marginBottom:'1rem'}}>
                           <Col span={12} offset={1}>
                               <Checkbox></Checkbox>
                              <span>仅显示失败</span>
                           </Col>
                        </Row>
                        <br />
                        <Table
                            style={{ height: this.state.windowheight - 380 + 'px'}}
                            bordered
                            loading={this.state.leftTabLoading}
                            components={this.components}
                            columns={colcolumns}
                            dataSource={this.state.datasource}
                            //onSelect={this.handleClickRow}
                            rowkey={row => row.key}
                            pagination={false}
                            scroll={{ x: 240, y: this.state.windowheight -380 - 40 }}
                            rowSelection={rowSelection}
                        />
                    </div>
                    < Icon type="right-circle" style={{ fontSize: '30px', display: 'flex', alignItems: 'center' }} size="small" onClick={this.handelAdd}/> 
                 <div className={"rightTbale"} style={{ overflow: 'hidden',padding:"20px",margintop:'4px'}}>
                    <Row style={{ marginBottom: '1rem' }}>
                                <Col span={24}>
                                    <span style={{color:'green', margintop: '1rem'}}>已选菜单</span>
                                </Col>
                    </Row>
                    <Row style={{ marginBottom: '1rem' }}>
                                <Col span={12}>
                                    <Input onChange={e => this.setState({ filterItem_input: e.target.value })} />
                                </Col>
                                <Col span={11} offset={1}>
                                   <span style={{color:'green'}}>从角色列表中复制菜单授权</span>
                                </Col>        
                    </Row>
                    {this.state.hidden === "true" ?null:
                        <Row style={{ marginBottom:'1rem'}}>
                            <Button size="small" type="primary" style={{marginRight: '10px'}}>上移</Button>
                            <Button size="small" type="ghost" style={{marginRight: '10px'}}>下移</Button>
                            <Button size="small" type="dashed"  style={{marginRight: '10px'}}>升级</Button>
                            <Button  size="small" type="danger" style={{marginRight: '10px'}}>删除</Button>
                            <Button size="small"  type="primary" style={{marginRight: '10px'}}>保存</Button>
                            
                        </Row>}
                        {/* <Col offset={1}>
                          <Button type="primary"  onClick={() => this.setState({ visible1: true})} >复制</Button>
                        </Col> */}
                        <Table
                            style={{ height: this.state.windowheight - 380 + 'px', padding: 14,marginTop:'1.18rem'}}
                            columns={columns}
                            bordered
                            loading={this.state.rightTabLoading}
                            indentSize={15}
                            dataSource={this.state.data}
                            rowkey={row => row.key}
                            rowClassName={this.setRowClassName}
                            onRow={this.onClickRow}
                            pagination={false}
                            rowSelection={rowSelection}
                            scroll={{ x: 440, y: this.state.windowheight -380- 40 }}
                        />

                    </div>
                </div>
            </div>
        )
    }

    render() {
        //let rThis = this;
        let { activeKey } = this.state
        const columnr = [{
            title: '科室',
            dataIndex: 'LocDrDesc',
            key: 'LocDrDesc',
            width: 150
        }, {
            title: '更新日期',
            dataIndex: 'UpdateDate',
            key: 'UpdateDate',
            width: 120
        }, {
            title: '时间',
            dataIndex: 'UpdateTime',
            key: 'UpdateTime',
            width: 120
        }, {
            title: '操作',
            dataIndex: '',
            key: 'y',
            width: 100,
            align: "center",
            render: (text, record) => (
                <div>
                    <div>
                        {
                            <Popconfirm title="删除不可恢复，你确定要删除吗?" onConfirm={() => this.handleDel(record)} >
                                <span className="span">删除</span>
                            </Popconfirm>
                        }
                    </div>

                </div>
            )
        }
        ];
        return (
            <div className='nav-container'>
                <Tabs onChange={this.onChangeTabs} activeKey={activeKey}>
                    <TabPane tab="头菜单" key="1">
                        {this.renderPage(1)}
                    </TabPane>
                    <TabPane tab="侧菜单" key="2">
                        {this.renderPage(2)}
                    </TabPane>
                    <TabPane tab="Tab菜单" key="3">
                        {this.renderPage(3)}
                    </TabPane>
                </Tabs>
                <Modal
                    title="科室"
                    visible={this.state.visible}
                    // onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width="50%"
                    height="600px"
                    footer={false}
                  >
                    <Select
                        showSearch
                        style={{ width: 330, marginBottom: '12px', display: 'inline-block' }}
                        placeholder="请输入"
                        optionFilterProp="children"
                        onSelect={this.handleChangeS}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {this.state.selectData.map(({ id, descripts }) => {
                            return (<Option key={id} value={id}>
                                {descripts}
                            </Option>)
                        })}
                    </Select>
                    <Button type="primary" onClick={this.handelSave} style={{marginBottom: '12px',marginLeft:'24px',display: 'inline-block' }}>增加</Button>
                    <Table
                        bordered
                        style={{ height: this.state.windowheight - 380 + 'px' }}
                        columns={columnr}
                        dataSource={this.state.datasource1}
                        rowkey={row => row.key}
                        onRow={this.onClickRow1}
                        // rowClassName={this.setRowClassName1}
                        pagination={false}
                        scroll={{ x: 660, y: this.state.windowheight - 380 - 30 }}
                    // rowSelection={this.rowSelection()}
                    />

                </Modal>
                <MenuAuthorzationModel
                    visible={this.state.visible1}
                    handleOk={() => this.setState({ visible1: false })}
                    handthis={this}
                />
            </div>
        )
    }
}



















