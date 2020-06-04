import React, {useState, useEffect, useRef} from 'react';
import {Form, Input, InputNumber} from 'antd';

import PicturesWall from '../../../components/PicturesWall'

const AddAndEditCategory = props => {

    const {
        currentData,
        operateType
    } = props;


    const [form] = Form.useForm();
    const [image, Setimage] = useState(undefined);
    const IconPW = useRef(null);


    useEffect(() => {
        const {getForm} = props;
        form.getImages = () => IconPW.current.getImgs();
        getForm(form);
        if (operateType === 1) {//编辑分类才回填数据
            form.setFieldsValue(currentData);
            Setimage(currentData.iconUrl);
        } else {
            Setimage(null);
        }
        return () => {
            form.resetFields();
            Setimage(null);
        }
    },[operateType]);


    const renderIconPicture = () => {
        if (operateType === 1 && image) {
           return <PicturesWall ref={IconPW} imgs={[image]} maxLength={1} />
        } else if (operateType === 2) {
            return <PicturesWall ref={IconPW} imgs={[]} maxLength={1} />
        }
    };

    return (
        <>
            <Form
                form={form}
                initialValues={{
                    sortOrder:0
                }}

            >
                {
                    operateType === 2 ?
                        <Form.Item label="上级分类"><span>{currentData.name}</span></Form.Item>
                        : null
                }
                <Form.Item
                    name={['name']}
                    label="品类名称"
                    rules={[
                        {
                            required: true,
                            message: '请输入品类名称'
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item label="图标">
                    {renderIconPicture()}
                </Form.Item>
                <Form.Item name={['sortOrder']} label="排序">
                    <InputNumber  min={0}/>
                </Form.Item>
            </Form>
        </>
    )
}


export default AddAndEditCategory;
