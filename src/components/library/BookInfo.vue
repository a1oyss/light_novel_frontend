<template>
  <div class="info">
    <div class="meta-info">
      <div class="book-img">
        <img style="display: block;width: 100%;height: 100%;" :src="book.cover">
      </div>
      <div class="book-info">
        <div class="book-title">{{book.title}}</div>
        <div class="book-intro">{{book.abs}}</div>
        <div class="action">
          <el-button style="margin-right: 25px" type="primary" @click="showBook(book.id,1)">开始阅读</el-button>
          <el-button type="primary" plain>收藏</el-button>
        </div>
      </div>
    </div>
    <div class="directory">
      <span style="display:block;font-size: 24px;font-weight: bold;margin-bottom: 40px;text-align: center">目录</span>
      <el-row style="text-align: left">
          <el-button class="volume"
                     plain v-for="volume in volumes"
                     :key="volume.id"
                      @click="showBook(book.id,volume.id)">
            {{ volume.title }}
          </el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookInfo",
  data(){
    return{
      book:{},
      volumes:[]
    }
  },
  mounted() {
    this.getInfo()
  },
  methods:{
    getInfo(){
      let id = this.$route.params.id
      this.$axios.get('/book?id='+id).then(resp => {
        if (resp && resp.status === 200) {
          this.book = resp.data
        }
      })
      this.$axios.get('/volume?book_id='+id).then(resp=>{
        if (resp && resp.status === 200){
          this.volumes=resp.data
        }
      })
    },
    showBook(book_id,volume_id){
      this.$router.push({ path: '/showBook', query: { book_id:book_id,volume_id: volume_id}})
    }
  }
}
</script>

<style scoped>
.info{
  position: relative;
  width: 808px;
  min-height: 500px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px #e7e7fc;
  border-radius: 4px;
  margin: 40px auto;
  padding: 15px;
}
.meta-info{
  position: relative;
  padding-top: 25px;
  padding-left: 198px;
  min-height: 265px;
}
.meta-info .book-img{
  position: absolute;
  left: 15px;
  top: 15px;
  width: 167px;
  height: 251px;
  border: 1px solid #e7e7e7;
}
.meta-info .book-info .book-title{
  font-weight: 700;
  overflow: hidden;
  font-size: 26px;
  color: #333;
  text-align: left;
  display: block;
  word-wrap: break-word;
}
.meta-info .book-info .book-intro{
  margin-top: 20px;
  font-size: 16px;
  color: #333;
  text-align: left;
  text-indent: 2em;
}
.meta-info .book-info .action{
  position: absolute;
  bottom: 0;
  left: 198px;
  right: 25px;
  padding-right: 280px;
}
.directory{
  margin: 20px;
  padding: 20px;
  border-top: 1px solid #eee;
}
.el-button+.el-button {
  margin-left: 0px;
}
.volume{
  margin: 0 20px 20px 0;
}
</style>