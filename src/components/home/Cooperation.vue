<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <div class="wrap">
        <el-form-item>
          <el-input v-model="formInline.user" placeholder="供应商名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.user" placeholder="联系人"></el-input>
        </el-form-item>
         <el-form-item>
          <el-input v-model="formInline.user" placeholder="联系电话"></el-input>
        </el-form-item>
      </div>
      <div class="block">
        <el-form-item style="margin-left:10px;">
          <el-button type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">重置</el-button>
        </el-form-item>
      </div>
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
      formInline: {
        user: "",
        region: ""
      },
      list: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      payType: [
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
      ]
    };
  },
  created() {
      this.fetchData()
  },
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
    },
    //页码改变时触发
    handleCurrentChange(cPage) {
      console.log(cPage);
      this.currentPage = cPage;
      this.fetchData();
    },
    fetchData() {
      baer.solid(this.currentPage, this.pageSize).then(res => {
        console.log(res);
        this.list = res.data.data.rows;
        this.total = res.data.data.total;
        console.log(this.list);
      });
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
