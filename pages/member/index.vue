<script>

export default {
    layout: 'default',
    async asyncData({store, $axios}) {

        return {

        }
    },
    head() {

    },
    data() {
        return {

        }
    },
    methods: {
        
    },
    computed: {
        currentLang() {
            const code = this.$store.getters['head/head-top/currentLangCode']
            const lang = this.$store.getters['head/head-top/languages']
            return lang.find(l => l.code === code)
        },
    },
}
</script>

<template>
    <main class="main">
        <div class="page-header breadcrumb-wrap">
            <div class="container">
                <div class="breadcrumb">
                    <nuxt-link :to="`/${currentLang.code}`" rel="nofollow">
                        {{ $t('home') }}
                    </nuxt-link>
                    <span></span> 會員中心 <span></span> 帳號管理
                </div>
            </div>
        </div>
        <section class="pt-150 pb-150">
            <div class="container">
                <div class="row">
                    <div class="col-lg-10 m-auto">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="dashboard-menu">
                                    <ul class="nav flex-column" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="dashboard-tab" data-bs-toggle="tab" href="#dashboard" role="tab" aria-controls="dashboard" aria-selected="false">
                                                <i class="fa fa-atom mr-15"></i>控制台
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="orders-tab" data-bs-toggle="tab" href="#orders" role="tab" aria-controls="orders" aria-selected="false">
                                                <i class="fa fa-shopping-basket mr-15"></i>訂單管理
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="address-tab" data-bs-toggle="tab" href="#address" role="tab" aria-controls="address" aria-selected="true">
                                                <i class="fa fa-map-marked mr-15"></i>收貨與帳單地址
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="account-detail-tab" data-bs-toggle="tab" href="#account-detail" role="tab" aria-controls="account-detail" aria-selected="true"
                                                ><i class="fa fa-user-edit mr-15"></i>會員資料變更
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#">
                                                <i class="fa fa-lock mr-15"></i>登出
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="tab-content dashboard-content">
                                    <div class="tab-pane fade active show" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                                        <div class="card">
                                            <div class="card-header">
                                                <h5 class="mb-0">會</h5>
                                            </div>
                                            <div class="card-body">
                                                <p>
                                                    從您的帳戶控制台，您可以輕鬆查看與檢視您的 
                                                    <a href="#">最近訂單</a>、管理您的 
                                                    <a href="#">收貨與帳單地址</a>，以及 
                                                    <a href="#">編輯您的密碼與帳戶資料</a>。
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="orders" role="tabpanel" aria-labelledby="orders-tab">
                                        <div class="card">
                                            <div class="card-header">
                                                <h5 class="mb-0">訂單紀錄</h5>
                                            </div>
                                            <div class="card-body">
                                                <div class="table-responsive">
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th>訂單編號</th>
                                                                <th>日期</th>
                                                                <th>狀態</th>
                                                                <th>總金額</th>
                                                                <th>操作</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>#1357</td>
                                                                <td>2020 年 3 月 45 日</td>
                                                                <td>處理中</td>
                                                                <td>$4360（共 2 件商品）</td>
                                                                <td>
                                                                    <a href="#" class="btn-small d-block">查看</a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>#2468</td>
                                                                <td>2020 年 6 月 29 日</td>
                                                                <td>已完成</td>
                                                                <td>$1500（共 5 件商品）</td>
                                                                <td>
                                                                    <a href="#" class="btn-small d-block">查看</a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>#2366</td>
                                                                <td>2020 年 8 月 2 日</td>
                                                                <td>已完成</td>
                                                                <td>$28000（共 3 件商品）</td>
                                                                <td>
                                                                    <a href="#" class="btn-small d-block">查看</a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="address" role="tabpanel" aria-labelledby="address-tab">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="card mb-3 mb-lg-0">
                                                    <div class="card-header">
                                                        <h5 class="mb-0">帳單地址</h5>
                                                    </div>
                                                    <div class="card-body">
                                                        <address>
                                                            242 新北市新莊區<br />
                                                            思源路330號<br />
                                                        </address>
                                                        <p>台灣</p>
                                                        <a href="#" class="btn-small">編輯</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="card">
                                                    <div class="card-header">
                                                        <h5 class="mb-0">收貨地址</h5>
                                                    </div>
                                                    <div class="card-body">
                                                        <address>
                                                            242 新北市新莊區<br />
                                                            思源路330號<br />
                                                        </address>
                                                        <p>台灣</p>
                                                        <a href="#" class="btn-small">編輯</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="account-detail" role="tabpanel" aria-labelledby="account-detail-tab">
                                        <div class="card">
                                            <div class="card-header">
                                                <h5>帳戶詳細資訊</h5>
                                            </div>
                                            <div class="card-body">
                                                <form method="post" name="enq">
                                                    <div class="row">
                                                        <div class="form-group col-md-6">
                                                            <label>名字 <span class="required">*</span></label>
                                                            <input required="" class="form-control square" name="name" type="text" />
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <label>姓氏 <span class="required">*</span></label>
                                                            <input required="" class="form-control square" name="phone" />
                                                        </div>
                                                        <div class="form-group col-md-12">
                                                            <label>顯示名稱 <span class="required">*</span></label>
                                                            <input required="" class="form-control square" name="dname" type="text" />
                                                        </div>
                                                        <div class="form-group col-md-12">
                                                            <label>電子郵件地址 <span class="required">*</span></label>
                                                            <input required="" class="form-control square" name="email" type="email" />
                                                        </div>
                                                        <div class="form-group col-md-12">
                                                            <label>目前密碼 <span class="required">*</span></label>
                                                            <input required="" class="form-control square" name="password" type="password" />
                                                        </div>
                                                        <div class="form-group col-md-12">
                                                            <label>新密碼 <span class="required">*</span></label>
                                                            <input required="" class="form-control square" name="npassword" type="password" />
                                                        </div>
                                                        <div class="form-group col-md-12">
                                                            <label>確認新密碼 <span class="required">*</span></label>
                                                            <input required="" class="form-control square" name="cpassword" type="password" />
                                                        </div>
                                                        <div class="col-md-12">
                                                            <button type="submit" class="btn btn-fill-out submit" name="submit" value="Submit">儲存</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>

</style>
