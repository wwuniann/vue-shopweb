<script setup>
import { getCheckout } from '@/apis/checkout';
import { onMounted, ref } from 'vue';
import { createOrderAPI } from '@/apis/checkout';
import { useRouter } from 'vue-router';
import { useAddCartStore } from '@/stores/cartStore';

const router = useRouter()
const cartStore = useAddCartStore()
//获取订单对象数据,筛选默认地址
const checkInfo = ref({})
const curAddress = ref({})
const getCheckInfo = async() =>{
    const res = await getCheckout()
    checkInfo.value = res.result
    const item = checkInfo.value.userAddresses.find(item =>item.isDefault === 0)
    curAddress.value = item
}
onMounted(() =>getCheckInfo())

//控制弹框打开
const showDialog = ref(false)
const addFlag = ref(false)

//获取当前点击的对象，并覆盖现有的默认地址
const activeAddress = ref({})
const selectAddress = (item) =>{
    activeAddress.value = item
}

const confirm = () =>{
    curAddress.value = activeAddress.value
    showDialog.value = false
}

//创建订单
const createOrder = async() =>{
  const res = await createOrderAPI({
    deliverTimeType :1,
    payType: 1,
    payChannel: 1,
    buyerMessage: '',
    goods:checkInfo.value.goods.map(item => {
      return{
        skuId: item.skuId,
        count: item.count
      }
    }),
    addressId: curAddress.value.id
  })
  const orderId = res.result.id
  router.push({
    path: '/pay',
    query: {
      id: orderId
    }
  })
  //更新购物车
  cartStore.updateNewList()
}

  //添加地址
  const newAddress = ref({
  receiver: '',
  contact: '',
  provinceCode: '',
  cityCode: '',
  countyCode: '',
  address: '',
  postalCode: '',
  addressTags: '',
  isDefault: 1,
  fullLocation: ''
})
const addAddress = () => {
  // 这里可以添加将新地址信息发送到后端的逻辑
  
  // 清空输入框
  newAddress.value = {
    receiver: '',
    contact: '',
    provinceCode: '',
    cityCode: '',
    countyCode: '',
    address: '',
    postalCode: '',
    addressTags: '',
    isDefault: 1,
    fullLocation: ''
  }
  addFlag.value = false
}

</script>

<template>
  <div class="jx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!curAddress">您需要先添加收货地址才可提交订单。</div>
              <ul v-else>
                <li><span>收<i />货<i />人：</span>{{ curAddress.receiver }}</li>
                <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                <li><span>收货地址：</span>{{ curAddress.fullLocation }} {{ curAddress.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="showDialog = true">切换地址</el-button>
              <el-button size="large" @click="addFlag = true">添加地址</el-button>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in checkInfo.goods" :key="i.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.picture" alt="">
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.price }}</td>
                <td>{{ i.count }}</td>
                <td>&yen;{{ i.totalPrice }}</td>
                <td>&yen;{{ i.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkInfo.summary?.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">{{ checkInfo.summary?.totalPayPrice.toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button @click="createOrder" type="primary" size="large" >提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址 -->
  <el-dialog v-model="showDialog" title="切换收货地址" width="30%" center>
    <div class="addressWrapper">
      <div class="text item" :class="{active: activeAddress.id ===item.id}" @click="selectAddress(item)" v-for="item in checkInfo.userAddresses"  :key="item.id">
        <ul>
        <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
        <li><span>联系方式：</span>{{ item.contact }}</li>
        <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
        </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 添加地址 -->
    <!-- 添加地址的弹框 -->
  <el-dialog v-model="addFlag" title="添加收货地址" width="30%" center>
    <div class="addressFormWrapper">
      <el-form :model="newAddress" label-width="120px">
        <!-- 收货人姓名输入框 -->
        <el-form-item label="收货人姓名" :rules="{ required: true, message: '收货人姓名不能为空', trigger: 'blur' }">
          <el-input v-model="newAddress.receiver"></el-input>
        </el-form-item>
        <!-- 收货人联系方式输入框 -->
        <el-form-item label="联系方式" :rules="{ required: true, message: '联系方式不能为空', trigger: 'blur' }">
          <el-input v-model="newAddress.contact"></el-input>
        </el-form-item>
        <!-- 省份编码输入框 -->
        <el-form-item label="省份编码" :rules="{ required: true, message: '省份编码不能为空', trigger: 'blur' }">
          <el-input v-model="newAddress.provinceCode"></el-input>
        </el-form-item>
        <!-- 城市编码输入框 -->
        <el-form-item label="城市编码" :rules="{ required: true, message: '城市编码不能为空', trigger: 'blur' }">
          <el-input v-model="newAddress.cityCode"></el-input>
        </el-form-item>
        <!-- 地区编码输入框 -->
        <el-form-item label="地区编码" :rules="{ required: true, message: '地区编码不能为空', trigger: 'blur' }">
          <el-input v-model="newAddress.countyCode"></el-input>
        </el-form-item>
        <!-- 详细地址输入框 -->
        <el-form-item label="详细地址" :rules="{ required: true, message: '详细地址不能为空', trigger: 'blur' }">
          <el-input v-model="newAddress.address"></el-input>
        </el-form-item>
        <!-- 邮政编码输入框 -->
        <el-form-item label="邮政编码" :rules="{ required: true, message: '邮政编码不能为空', trigger: 'blur' }">
          <el-input v-model="newAddress.postalCode"></el-input>
        </el-form-item>
        <!-- 地址标签输入框 -->
        <el-form-item label="地址标签" :rules="{ required: true, message: '地址标签不能为空', trigger: 'blur' }">
          <el-input v-model="newAddress.addressTags"></el-input>
        </el-form-item>
        <!-- 是否默认地址选择 -->
        <el-form-item label="是否默认地址">
          <el-radio-group v-model="newAddress.isDefault">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">不是</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 完整地址输入框 -->
        <el-form-item label="完整地址" :rules="{ required: true, message: '完整地址不能为空', trigger: 'blur' }">
          <el-input v-model="newAddress.fullLocation"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 弹框底部按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <!-- 取消按钮 -->
        <el-button @click="addFlag = false">取消</el-button>
        <!-- 确定按钮 -->
        <el-button type="primary" @click="addAddress">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

.jx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 30px;
      border-bottom: 1px solid #f5f5f5;
      background:linear-gradient(to right,rgb(54, 53, 53),#fff);
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $JxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $JxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 20px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $JxColor;
      background: color.scale($JxColor, $lightness: 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>