<style lang="less">
    @import '../../styles/common.less';
</style>

<template>
    <div>
        <Table border stripe :columns="columns1" :data="userData"></Table>
        <Row class="margin-top-10">
            <Page :total="total" size="small" show-total show-elevator show-sizer
                  @on-change="handleCurrentChange" @on-page-size-change="handleSizeChange">
            </Page>
        </Row>
    </div>
</template>
<script>
    import {userlist} from './user.js';
    import global from '../../libs/globals';
    export default {
        data () {
            return {
                columns1: [{
                    title: '序号',
                    type: 'index',
                    width: 65,
                    align: 'center'
                }, {
                    title: '用户名',
                    key: 'username'
                }, {
                    title: '昵称',
                    key: 'nickName'
                }, {
                    title: '手机号码',
                    key: 'userTel'
                }, {
                    title: '邮箱',
                    key: 'userEmail'
                }, {
                    title: '性别',
                    key: 'sex'
                }],
                userData: [],
                total: 0
            };
        },
        methods: {
            handleSizeChange (val) {
                global.param.page.pageSize = val;
                this.getInfoList();
            },
            handleCurrentChange (val) {
                global.param.page.pageNo = val;
                this.getInfoList();
            },
            getInfoList () {
                userlist(global.param).then(res => {
                    this.total = res.total;
                    this.userData = res.rows;
                });
            }
        },
        mounted () {
            this.getInfoList();
        }
    };
</script>

