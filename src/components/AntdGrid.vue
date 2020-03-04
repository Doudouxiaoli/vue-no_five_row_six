/* eslint-disable vue/no-unused-vars */
<template>
    <div>
        <a-input-search placeholder="检索词" style="width: 300px" @search="onSearch"/>
        <br/><br/>
        <a-table
                bordered
                :rowKey="record => record.suPk"
                :columns="columns"
                :dataSource="data"
                @change="handleTableChange"
                :pagination="pagination"
                :loading="loading">
            <template slot="title">
                专辑列表
            </template>
            <span slot="action" slot-scope="record">
                <router-link :to="{ name: 'usDetail', params: { pk: record.suPk }}">查看</router-link>
                <a-divider type="vertical"/>
                <router-link :to="`/album/detail/${record.suPk}`">编辑</router-link>
                <a-divider type="vertical"/>
                <a href="javascript:;" style="color: red">删除</a>
            </span>
        </a-table>
    </div>
</template>

<script>
    /* eslint-disable no-console */
    const columns = [{
        title: '主键',
        dataIndex: 'suPk',
        sorter: true,
        width: '100px'
    }, {
        title: '姓名',
        dataIndex: 'suName',
        width: '200px'
    }, {
        title: '登录名',
        dataIndex: 'suLoginName'
    }, {
        title: '操作',
        key: 'action',
        scopedSlots: {customRender: 'action'}
    }];
    export default {
        name: "AntdGrid",
        mounted() {
            this.load();
        },
        data() {
            return {
                data: [],
                loading: false,
                pagination: {},
                columns
            }
        },
        methods: {
            onSearch(value) {
                console.log('value:', value);
                this.load({
                    keyword: value
                })
            },
            handleTableChange(pagination, filters, sorter) {
                console.log('翻页:', pagination);
                /*const pager = {...this.pagination};
                pager.current = pagination.current;
                this.pagination = pager;*/
                this.load({
                    size: pagination.pageSize,
                    current: pagination.current,
                    sortField: sorter.field,
                    sortOrder: sorter.order,
                    ...filters,
                });
            },
            load(params = {}) {
                console.log('params:', params);
                this.loading = true;
                this.$axios({
                    url: '/api/list',
                    method: 'get',
                    params: {
                        size: 2,
                        ...params
                    }
                }).then(res => {
                    this.loading = false;
                    console.log("data:", res.data);
                    this.data = res.data.records;
                    const pagination = {...this.pagination};
                    pagination.total = res.data.total;
                    pagination.current = res.data.current;
                    pagination.pageSize = res.data.size;
                    this.pagination = pagination;
                })
            }
        }
    }
</script>

<style scoped>

</style>
