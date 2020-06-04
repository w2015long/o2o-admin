import { reqMenuRoutes } from '@/services/menu';
import React from "react";
import * as allIcons from '@ant-design/icons/es';



const formatter = (data) => {
  return data.map(elem => {
    const item = Object.assign({},elem)
    if (item.icon) {
      const { icon } = item;
      const v4IconName = icon[0].toUpperCase()
      const NewIcon = allIcons[icon] || allIcons[''.concat(v4IconName, 'Outlined')];
      if (NewIcon) {
        try {
          // eslint-disable-next-line no-param-reassign
          item.icon = React.createElement(NewIcon);
        } catch (error) {
          console.log(error);
        }
      }
    }

    if (item.routes || item.children) {
      const routes = formatter(item.routes || item.children); // Reduce memory usage
      item.routes = routes;
    }
    return {
      ...item,
    }
  });

};



const MenuModel = {
  namespace: 'menu',
  state: {
    menuRoutes:[],
  },
  effects: {
    *fetchRoutes(_, { call, put }) {
      const response = yield call(reqMenuRoutes);
      // console.log(response);
      let menus = []
      if (response.code === 200) {
        menus = formatter(response.data)
      }

      yield put({
        type: 'saveRoutes',
        payload: menus,
      });
    },

  },
  reducers: {

    saveRoutes(state,action) {
      return {...state, menuRoutes: action.payload || []}
    }
  },
};
export default MenuModel;
