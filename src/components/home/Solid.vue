<template>
  <div>
    <el-form :inline="true" :model="searchMap" ref="ruleForm" class="demo-form-inline">
      <!-- <div class="wrap"> -->
      <el-form-item prop="cardNum">
        <el-input v-model="searchMap.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="会员名字"></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="searchMap.payType" placeholder="支付类型">
          <el-option
            v-for="(item,index) in payTypeValue"
            :key="index"
            :label="item.name"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- </div> -->
      <!-- <div class="block"> -->
      <el-form-item prop="birthday">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="searchMap.birthday"
          type="date"
          placeholder="出生日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="margin-left:10px;">
        <el-button type="primary" @click="onmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      <!-- </div> -->
    </el-form>
    <el-table :data="list" style="width: 100%" height="250">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
      <el-table-column prop="name" label="会员姓名"></el-table-column>
      <el-table-column prop="birthday" label="会员生日"></el-table-column>
      <el-table-column prop="phone" label="手机号码" width="110"></el-table-column>
      <el-table-column prop="integral" label="可用积分"></el-table-column>
      <el-table-column prop="money" label="开卡金额"></el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
          <span>{{scope.row.payType | pay}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" width="180"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import baer from "@/api/shu";
const payType = [
  {
    type: 1,
    name: "现金"
  },
  {
    type: 2,
    name: "微信"
  },
  {
    type: 3,
    name: "支付宝"
  },
  {
    type: 4,
    name: "银行卡"
  }
];
export default {
  data() {
    return {
      searchMap: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: ""
      },
      list: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      payTypeValue: payType
    };
  },
  created() {
    this.fetchData();
  },
  // 遍历付款方式
  filters: {
    pay(data) {
      let payValue = payType.find((item, index) => {
        return item.type == data;
      });
      return payValue.name;
    }
  },
  mounted() {},
  methods: {
    //条数改变时触发
    handleSizeChange(cSize) {
      console.log("条数");
      this.pageSize = cSize;
      this.fetchData();
      console.log(this.pageSize);
    },
    //页码改变时触发
    handleCurrentChange(cPage) {
      console.log(cPage);
      this.currentPage = cPage;
      this.fetchData();
      console.log(this.currentPage);
    },
    // 获取数据
    fetchData() {
      baer.solid(this.currentPage, this.pageSize, this.searchMap).then(res => {
        console.log(res);
        this.list = res.data.data.rows;
        this.total = res.data.data.total;
        // console.log(this.list);
      });
      // baer.solid(this.currentPage, this.pageSize, this.searchMap).then(res => {
      //   console.log(res);
      //   this.list = res.data;
      //   this.total = res.total;
      //   // console.log(this.list);
      // });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //查询
    onmit(e) {
      this.fetchData();
      console.log(e);
    }
  }
};
</script>

<style scoped lang="scss">
.wrap {
  float: left;
}
.block {
  float: left;
}
.demo-form-inline {
  margin-top: 20px;
}
/deep/.el-select {
  width: 110px;
}
</style>
