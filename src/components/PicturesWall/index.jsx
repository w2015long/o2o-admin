import React from 'react'
import { Upload, Modal ,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class PicturesWall extends React.Component {
    constructor(props) {
        super(props);
        let fileList = [];
        // 如果传入了imgs属性
        const {imgs} = this.props;
        if (imgs && imgs.length>0) {
            fileList = imgs.map((img, index) => ({
                uid: -index, // 每个file都有自己唯一的id
                name: img, // 图片文件名
                status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
                url:img
            }))
        }
        this.state = {
            isDelImage:false,
            previewVisible: false,// 标识是否显示大图预览Modal
            previewImage: '',// 大图的url
            fileList,
        }
    }

/*
    static getDerivedStateFromProps (props, state) {

        const propsHasImg = props.imgs && props.imgs.length > 0;
        const stateNotImg = state.fileList.length === 0;
        const {isDelImage} = state;
        //state上fileLis没有值 并且props上的fileList有值(save组件传过来的)
        console.log(state.fileList.length)
        let fileList = [];
        if (propsHasImg && !isDelImage) {
            console.log('---------88888888888------')

            fileList = props.imgs.map((img, index) => ({
                uid: -index, // 每个file都有自己唯一的id
                name: img, // 图片文件名
                status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
                url:img
            }));
            return {
                fileList
            }
        }
        return null
    }*/


    /*
    隐藏Modal
     */
    handleCancel = () => this.setState({ previewVisible: false });
    //预览大图
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    /*
        获取所有已上传图片文件名的数组
    */
    getImgs  = () => {
        return this.state.fileList.map(file => file.name)
    }

    /*
    file: 当前操作的图片文件(上传/删除)
    fileList: 所有已上传图片文件对象的数组
    */
    handleChange = async ({file, fileList}) => {
        //console.log(fileList, file);
        // 一旦上传成功, 将当前上传的file的信息修正(name, url)
        if(file.status==='done') {
            const result = file.response  // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
            if(result.code===200) {
                message.success('上传图片成功!')
                const {thumbnail, url} = result.data;
                file = fileList[fileList.length-1]
                file.name = thumbnail;
                file.url = url;
            } else {
                message.error('上传图片失败')
            }
        } else if (file.status==='removed') { // 删除图片
            message.success('删除图片成功!');
            this.setState({isDelImage:true});
            // const result = await reqDelImg(file.name);

            // if (result.status===0) {
            //     message.success('删除图片成功!')
            // } else {
            //     message.error('删除图片失败!')
            // }
        }
        // 在操作(上传/删除)过程中更新fileList状态
        this.setState({ fileList })
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const {maxLength} = this.props;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action="http://upload.520shq.com/upload" /*上传图片的接口地址*/
                    accept='image/*'  /*只接收图片格式*/
                    //name='image' /*请求参数名*/
                    listType="picture-card"  /*卡片样式*/
                    fileList={fileList}  /*所有已上传图片文件对象的数组*/
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= maxLength ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default PicturesWall;
