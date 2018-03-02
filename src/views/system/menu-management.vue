<style lang="less">
    @import '../../styles/common.less';
</style>

<template>
    <div>
        <Row>
            <Col span="3">
                <Row class-name="made-child-con-middle" type="flex" align="middle">
                    <tree :data="menuDatas" @on-select-change="onSelectChange"></tree>
                </Row>
            </Col>
            <Col span="21" style="padding-left:6px;">
                <Row>
                    <div>
                        <Table border stripe :columns="tableColumns" :data="meunTables"></Table>
                    </div>
                </Row>
            </Col>
        </Row>
    </div>
</template>
<script>
    import {treeMaintain, treeMaintainList} from './menu-management.js';
    export default {
        data () {
            return {
                menuDatas: [],
                meunTables: [],
                parentId: 0,
                tableColumns: [{
                    title: '序号',
                    type: 'index',
                    width: 65,
                    align: 'center'
                }, {
                    title: '菜单编码',
                    key: 'path'
                }, {
                    title: '菜单名称',
                    key: 'name'
                }, {
                    title: '菜单标题',
                    key: 'title'
                }, {
                    title: '菜单URL',
                    key: 'component'
                }, {
                    title: '菜单图标',
                    key: 'icon'
                }]
            };
        },
        methods: {
            gettreeMaintains () {
                treeMaintain().then(res => {
                    this.menuDatas = res.rows;
                });
            },
            gettreeMaintainList () {
                treeMaintainList(this.parentId).then(res => {
                    this.meunTables = res.rows;
                });
            },
            onSelectChange (val) {
                this.parentId = val[0].id;
                this.gettreeMaintainList();
            }
        },
        mounted () {
            this.gettreeMaintains();
            this.gettreeMaintainList();
        }
    };
</script>