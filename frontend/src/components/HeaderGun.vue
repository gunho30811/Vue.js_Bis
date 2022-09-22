<template>
  <header id="header">
    <div class="search-box">
        <select v-model="option">
          <option v-for="board in options" :key="board.option">{{board.option}}</option>
        </select>
        <input class="search-txt" type="text" placeholder="검색어 입력" v-model="searchkeyword"/>
        <button class="seatch-btn" type="submit" @click="search">검색</button>
    </div>
    <div class="table_wrap" v-show="guard_down">
      <table class="list">
        <thead>
            <th col-index = 1>Num</th>
            <th col-index = 2>Name</th>
            <th col-index = 3>Eng_Name</th>
            <th col-index = 4>Dep</th>
            <th col-index = 5>Team</th>
            <th col-index = 6>Email</th>
            <tr v-for="(tbl) in emp_tbl" :key="tbl.Num">
              <td>{{tbl.Num}}</td>
              <td>{{tbl.employee}}</td>
              <td>{{tbl.employeeenglish}}</td>
              <td>{{tbl.department}}</td>
              <td>{{tbl.team}}</td>
              <td>{{tbl.email}}</td>
            </tr>
        </thead>
      </table>
    </div>
    <div class="table_wrap" v-show="guard_up">
      <table class="list">
        <thead>
            <th col-index = 1>Num1</th>
            <th col-index = 2>Name</th>
            <th col-index = 3>Eng_Name</th>
            <th col-index = 4>Dep</th>
            <th col-index = 5>Team</th>
            <th col-index = 6>Email</th>
            <tr v-for="(tbl) in change_tbl" :key="tbl.Num">
              <td>{{tbl.Num}}</td>
              <td>{{tbl.employee}}</td>
              <td>{{tbl.employeeenglish}}</td>
              <td>{{tbl.department}}</td>
              <td>{{tbl.team}}</td>
              <td>{{tbl.email}}</td>
            </tr>
        </thead>
      </table>
    </div>
  </header>
</template>

<script>
import axios from 'axios'

export default {
  created () {
    axios.get('http://localhost:3000/users/')
      .then((res) => {
        console.log(res.data)
        this.emp_tbl = res.data
      })
  },
  methods: {
    search () {
      console.log(this.searchkeyword)
      if (this.searchkeyword === '') {
        alert('키워드가 없습니다.')
      } else {
        axios({
          url: 'http://localhost:3000/users/y',
          method: 'POST',
          data: {
            options: this.option,
            searchkeyword: this.searchkeyword
          }
        }).then((res) => {
          console.log('데이터 들어왔니?')
          this.change_tbl = res.data
          this.guard_down = !this.guard_down
          this.guard_up = !this.guard_up
        }).catch(err => {
          alert(err)
        })
      }
    }
  },
  data () {
    return {
      emp_tbl: [
        { Num: '', employee: '', employeeenglish: '', department: '', team: '', email: '' }
      ],
      change_tbl: [],
      guard_down: true,
      guard_up: false,
      searchkeyword: '',
      options: [
        { option: 'Name' },
        { option: 'Dep' },
        { option: 'Team' }
      ]
    }
  }
}

</script>
<style scoped>

.list{
  width: 100%;
  border: 1px solid #444444;
  background-color: white;
}

thead,td,th{
  border: 1px solid #444444;
}

th{
  margin:0;
  position: sticky;
}

.table_wrap{
  margin-top:10vh;
  overflow-y: scroll;
  overflow-x: scroll;
  height: fit-content;
  max-height: 70vh;
}

</style>
