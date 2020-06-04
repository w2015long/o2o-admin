import {LogoutOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import {Avatar, Menu, Spin} from 'antd';
import React from 'react';
import {history, connect} from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import memory from '@/utils/memory'
import styles from './index.less';

const defaultAvatar = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';

/*
*
        "UserInfo": {
            "userId": 1,
            "username": "admin",
            "email": "939961241@qq.com",
            "mobile": "15209831990",
            "status": 1,
            "createTime": "2016-11-11T11:11:11",
            "deptId": 1,
            "realName": "张三"
        }
   * */
class AvatarDropdown extends React.Component {
    onMenuClick = event => {
        const {key} = event;
        if (key === 'logout') {

            const {dispatch} = this.props;

            if (dispatch) {
                dispatch({
                    type: 'userAndlogin/logout',
                });
            }

        }

    };

    render() {

        let UserInfo;
        if (memory) {
            UserInfo = memory.UserInfo;
        }

        const menuHeaderDropdown = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
                <Menu.Item key="logout">
                    <LogoutOutlined/>
                    退出登录
                </Menu.Item>
            </Menu>
        );
        return UserInfo && UserInfo.realName ? (
            <HeaderDropdown overlay={menuHeaderDropdown}>
                <span className={`${styles.action} ${styles.account}`}>
                  <Avatar size="small" className={styles.avatar} src={ defaultAvatar } alt="avatar"/>
                  <span className={styles.name}>{UserInfo.realName}</span>
                </span>
            </HeaderDropdown>
        ) : (
            <span className={`${styles.action} ${styles.account}`}>
        <Spin
            size="small"
            style={{
                marginLeft: 8,
                marginRight: 8,
            }}
        />
      </span>
        );
    }
}

export default connect(({}) => ({
}))(AvatarDropdown);
