import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { FormattedMessage } from 'umi-plugin-react/locale';
import {injectIntl } from 'react-intl';
import { Card, Typography, Alert,Row, Col,Button, Upload, Icon, Modal,Table,Tooltip,Input} from 'antd';
const { TextArea } = Input;
import styles from './Welcome.less';
import { getServerBySsoLogout } from '../services/getServerData';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
@connect(({ welcome}) => ({
  welcome
}))
class PicturesWall extends React.Component {
  state = {
    inputText:null,
    pageSize:10,
    currentPage:1,
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://6c69-little-king-0115-1300440877.tcb.qcloud.la/WechatIMG247.jpeg?sign=294afa93715c703d5b64055f88ea691f&t=1578735955',
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
  };

  componentDidMount() {
   this.seachDancer();
  }

  seachDancer=()=>{
    console.log('开始调的接口：');
    const { dispatch } = this.props;
    const { pageSize,currentPage } = this.state;
    dispatch({
      type: 'welcome/search',
      payload: {pageSize: pageSize, currentPage: currentPage },
    });
  }

  addInput=()=>{
    const { inputText } = this.state;
    if (!inputText) {
      console.log('请输入文本内容');
    } else {
      const params = {
       content:inputText,
        type:'TXT'
      };
      console.log('params----',params)
      const result = getServerBySsoLogout('/ads', params);
      result
        .then(res => {
          return res;
        })
        .then(json => {
          if (json) {
            console.log('新增的结果：',json)
          }
        })
        .finally(() => {

        });
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });
  inputBox= (e) =>this.setState({inputText:e.target.value});

  render() {
    console.log('welcome---',this.props.welcome);
    const { previewVisible, previewImage, fileList } = this.state;
    const dataSource = [
      {
        key: '1',
        name: '该活动的主要场景是出现在该活动的主要场景是出现在该活动的主要场景是出现在该活动的主要场景是出现在该活动的主要场景是出现在该活动的主要场景是出现在该活动的主要场景是出现在',
      },
      {
        key: '2',
        name: '天下何人不识君，天下何人不识君天下何人不识君天下何人不识君天下何人不识君天下何人不识君天下何人不识君天下何人不识君天下何人不识君天下何人不识君天下何人不识君',
      },
    ];

    const columns = [
      {
        title: '内容',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        dataIndex: 'age',
        render: ( record) => {
          return (
            <Fragment>
                <span>
                  <Tooltip title={<FormattedMessage id="编辑" />}>
                    <a>
                      编辑
                    </a>
                  </Tooltip>
                  <Tooltip title={<FormattedMessage id="删除" />}>
                    <a
                      onClick={() => {
                        const that = this;
                        Modal.confirm({
                          title: '确认删除该广告文本？',
                          okText: '确认',
                          cancelText: '取消',
                          onOk() {
                            console.log('点确认的按钮')
                          },
                          onCancel() {},
                        });
                      }}
                    >
                     删除
                    </a>
                  </Tooltip>
                </span>
            </Fragment>
          );
        },
      },
    ];
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const inputBox = (
      <div>
        <TextArea rows={4} onChange={this.inputBox}/>
      </div>
    );
    const extraAction = (
      <div>
        <Button
          style={{ marginRight: 10 }}
          type="primary"
          icon="plus-circle-o"
          onClick={()=>{
            const that=this;
            Modal.confirm({
              title: '请填写广告文本',
              content: inputBox,
              onOk() {
                // this.addInput
                console.log('ok');
                that.addInput();
              },
              onCancel() {
                console.log('Cancel');
              },
            });
          }}
        >
          新增
        </Button>
      </div>
    );
    return (
      <div className="clearfix">
        <Card>
           <Alert
                message="广告图片管理"
                type="success"
                showIcon
                banner
                style={{
                  margin: -12,
                  marginBottom: 24,
                }}
              />
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
            </Card>
        <Card  style={{
      marginTop: 24
    }} extra={extraAction}>
      <Alert
        message="广告文本管理"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
             <Table dataSource={dataSource} columns={columns} />
    </Card>
      </div>
    );
  }
}


export default injectIntl(PicturesWall);


