<template>
  <div>
    <el-row style="height: 100%;">
      <SearchBar @onSearch="searchResult" ref="searchBar"></SearchBar>
      <el-tooltip effect="dark" placement="right"
                  v-for="item in books.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  :key="item.id">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{ item.title }}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{ item.author }}</span> /
          <span>{{ item.date }}</span> /
          <span>{{ item.press }}</span>
        </p>
        <p slot="content" class="abstract">{{ item.abs }}</p>
        <el-card style="width: 135px;margin-bottom: 20px;float: left;margin-right: 15px"
                 class="book"
                 bodyStyle="padding:10px"
                 shadow="hover"
                 @click.native="showBook(item.id)">
          <div class="cover">
            <img :src="item.cover" alt="封面">
          </div>
          <div class="info">
            <div class="title">
              <a href="">{{ item.title }}</a>
            </div>
          </div>
          <div class="author">{{ item.author }}</div>
        </el-card>
      </el-tooltip>
    </el-row>
    <el-row>
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="books.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import SearchBar from "./SearchBar";

export default {
  name: "Books",
  components: {
    SearchBar
  },
  data() {
    return {
      books: [],
      currentPage: 1,
      pageSize: 18
    }
  },
  mounted: function () {
    this.loadBooks()
  },
  methods: {
    loadBooks() {
      this.$axios.get('/books').then(resp => {
        if (resp && resp.status === 200) {
          this.books = resp.data
        }
      })
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
    },
    searchResult() {
      this.$axios.get('/search?keywords=' + this.$refs.searchBar.keywords, {}).then(resp => {
        if (resp && resp.status === 200) {
          this.books = resp.data
        }
      })
    },
    showBook(id){
      this.$router.push({path: `/book/${id}`});
    }
  }
}
</script>

<style scoped>
.cover {
  width: 115px;
  height: 172px;
  margin-bottom: 7px;
  overflow: hidden;
  cursor: pointer;
}

img {
  width: 115px;
  height: 172px;
}

.title {
  font-size: 14px;
  text-align: left;
}

.author {
  color: #333;
  width: 102px;
  font-size: 13px;
  margin-bottom: 6px;
  text-align: left;
}

.abstract {
  display:-webkit-box;
  line-height: 17px;
  width: 300px;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:3;
  overflow:hidden;
}

a {
  text-decoration: none;
}

a:link, a:visited, a:focus {
  color: #3377aa;
}

.el-icon-circle-plus-outline {
  margin: 50px 0 0 20px;
  font-size: 100px;
  float: left;
  cursor: pointer;
}
</style>