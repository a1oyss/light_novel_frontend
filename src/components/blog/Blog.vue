<template>
  <div class="block">
    <el-timeline reverse="reverse">
      <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.date"
          placement="top">
        <el-card>
          <h4>{{activity.title}}</h4>
          <p>{{activity.content}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: "Blog",
  data(){
    return{
      activities:[]
    }
  },
  mounted() {
    this.loadBlogs();
  },
  methods:{
    loadBlogs(){
      this.$axios.get('/blogs').then(resp=>{
        if (resp&&resp.status===200){
          this.activities=resp.data
        }
      })
    }
  }
}
</script>

<style scoped>
  .block{
    margin: 40px 100px;
  }
</style>