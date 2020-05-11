<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="@/assets/img/logo.jpeg" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 左侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          :collapse="isCollapse"
          unique-opened
          :collapse-transition="false"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409BFF"
          router
          default-active=2
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="(item) in menulist" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
              <!-- 二级菜单 -->
            </template>
            <el-menu-item
              :index="subItem.path"
              v-for="(subItem) in item.children"
              :key="subItem.id"
            >
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>{{subItem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // 左侧菜单数据
      menulist: [],
      iconsObj: {
        '125': 'el-icon-user-solid',
        '103': 'el-icon-s-operation',
        '101': 'el-icon-s-cooperation',
        '102': 'el-icon-s-order',
        '145': 'el-icon-s-data'
      },
      isCollapse: false,
      // 被激活的菜单地址
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')

  },
  methods: {
    logout() {
      // 清空token值 实现退出
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
    },
    // 菜单折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存导航的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;
  }
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
      img {
        width: 51px;
        height: 51px;
        border-radius: 50%;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    .el-menu {
      border-right: none;
    }
  }
  .toggle-button {
    background-color: #4a5064;
    text-align: center;
    font-size: 10px;
    line-height: 24px;
    color: #ffffff;
    letter-spacing: 0.3em;
    cursor: pointer;
  }
</style>