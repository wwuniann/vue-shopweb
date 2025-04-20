<script setup>
import router from '@/router';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const Router = useRouter()
const confirm = () =>{
  console.log('用户退出登录')
  //清除用户信息
  userStore.clearUserInfo()
  Router.push('/login')
}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="userStore.userInfo.token">
          <li><a href="javascript:;" @click="router.push('/User')"><i class="iconfont icon-yonghu"></i>用户留言</a></li>
          <li>
            <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;" @click="router.push('/member/userorder')">我的订单</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="router.push('/User')"><i class="iconfont icon-yonghu"></i>用户留言</a></li>
          <li><a href="javascript:;" @click="router.push('/login')">请先登录</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $JxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>