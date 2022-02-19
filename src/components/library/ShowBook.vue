<template>
  <div>
    <el-container>
      <el-aside>
        <el-menu
            class="chapters"
            :default-active="chapter_id.toString()"
            active-text-color="red">
          <el-menu-item v-for="chapter in chapters" :key="chapter.id" :index="chapter.id.toString()" @click="loadParagraph(chapter.id)">
            <span slot="title">{{chapter.title}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
        <div class="text">
          <div class="title">{{chapters[chapter_id-1].title}}</div>
          <div class="content">
            <p class="l" v-for="para in paragraphs" :key="para.id">
              {{para.content}}
            </p>
          </div>
        </div>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "ShowBook",
  data(){
    return{
      chapter_id:1,
      chapters:[],
      paragraphs:[]
    }
  },
  mounted() {
    this.loadText()
  },
  methods:{
    loadText(){
      let book_id=this.$route.query.book_id
      let volume_id=this.$route.query.volume_id
      let chapter_id=this.chapter_id
      this.$axios.get('/chapter?book_id='+book_id+'&volume_id='+volume_id).then(resp => {
        if (resp && resp.status === 200) {
          this.chapters = resp.data
        }
      })
      this.loadParagraph(chapter_id)
    },
    loadParagraph(chapter_id){
      this.chapter_id=chapter_id
      let book_id=this.$route.query.book_id
      let volume_id=this.$route.query.volume_id
      this.$axios.get('/paragraph?book_id='+book_id+'&volume_id='+volume_id+'&chapter_id='+chapter_id).then(resp => {
        if (resp && resp.status === 200) {
          this.paragraphs = resp.data
        }
      })
    }
  }
}
</script>

<style scoped>
.text{
  position: relative;
  margin: 0 auto;
  width: 720px;
  font-size: 18px;
  overflow: hidden;
  transition: opacity .4s;
}
.chapters {
  position: absolute;
  margin-left: 50%;
  left: -600px;
  top: 100px;
  width: 150px;
}
.text .title{
  color: #333;
  font-size: 24px;
  text-align: center;
  margin-top: 50px;
}
.text .l{
  position: relative;
  text-align: left;
  color: #111;
  text-indent: 35px;
  font-size: 16px;
  line-height: 25px;
  margin-top: 22px;
}
.text .content{
  min-height: 500px;
}
.footer{
  display: flex;
  justify-content: space-around;
  margin: 40px 0px;
}
</style>