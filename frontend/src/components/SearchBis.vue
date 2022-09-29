<template>
  <header id="header">
    <div class="search-box">
        <select v-model="option">
          <option v-for="board in options" :key="board.option">{{board.option}}</option>
        </select>
        <input class="search-txt" type="text" placeholder="검색어 입력" v-model="searchkeyword"/>
        <button class="seatch-btn" type="submit" @click="search">검색</button>
        <button class="seatch-btn" type="submit" @click="edit">수정</button>
        <button class="seatch-btn" type="submit" @click="add">추가</button>
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
            <th col-index = 1>Num</th>
            <th col-index = 2>Name</th>
            <th col-index = 3>Eng_Name</th>
            <th col-index = 4>Dep</th>
            <th col-index = 5>Team</th>
            <th col-index = 6>Email</th>
            <tr v-for="(tbl) in change_tbl" :key="tbl.Num">
              <td>{{tbl.Num}}</td>
              <td><input v-show="guard" class="search-txt" type="text" v-model="tbl.employee"/>{{tbl.employee}}</td>
              <td><input v-show="guard" class="search-txt" type="text" v-model="tbl.employeeenglish"/>{{tbl.employeeenglish}}</td>
              <td><input v-show="guard" class="search-txt" type="text" v-model="tbl.department"/>{{tbl.department}}</td>
              <td><input v-show="guard" class="search-txt" type="text" v-model="tbl.team"/>{{tbl.team}}</td>
              <td><input v-show="guard" class="search-txt" type="text" v-model="tbl.email"/>{{tbl.email}}</td>
              <button v-show="guard" class="seatch-btn" type="submit" @click="Delete">삭제</button>
              <button v-show="guard" class="seatch-btn" type="submit" @click="Update">업데이트</button>
            </tr>
        </thead>
      </table>
    </div>
    <div class="table_wrap" v-show="guard_add">
      <table class="list">
        <thead>
            <th col-index = 1>Num</th>
            <th col-index = 2>Name</th>
            <th col-index = 3>Eng_Name</th>
            <th col-index = 4>Dep</th>
            <th col-index = 5>Team</th>
            <th col-index = 6>Email</th>
            <tr id="tr_add" >
              <td><input v-model="add_Num" class="search-txt" type="text"/></td>
              <td><input v-model="add_Name" class="search-txt" type="text"/></td>
              <td><input v-model="add_Eng" class="search-txt" type="text"/></td>
              <td><input v-model="add_dep" class="search-txt" type="text"/></td>
              <td><input v-model="add_team" class="search-txt" type="text"/></td>
              <td><input v-model="add_email" class="search-txt" type="text"/></td>
              <button class="seatch-btn" type="submit" @click="add_emp">확인</button>
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
      this.guard = false
      if (this.searchkeyword === '') {
        alert('키워드가 없습니다.')
      } else {
        console.log('else로 들어오고')
        axios({
          url: 'http://localhost:3000/users/y',
          method: 'POST',
          data: {
            options: this.option,
            searchkeyword: this.searchkeyword
          }
        }).then((res) => {
          console.log('데이터 들어왔니?')
          this.guard_down = false
          this.guard_up = true
          this.change_tbl = res.data
        }).catch(err => {
          alert(err)
        })
      }
    },
    edit () {
      this.search()
      this.guard = true
    },
    Delete () {
      this.die = this.change_tbl.map(row => row.Num)
      alert('삭제를 시작합니다.')
      axios({
        url: 'http://localhost:3000/users/del',
        method: 'POST',
        data: {
          del_Num: this.die
        }
      })
    },
    Update () {
      this.emp_tbl = this.change_tbl
      if (this.tbl === '') {
        alert('칸이 비워져 있습니다.')
      } else {
        axios({
          url: 'http://localhost:3000/users/u',
          method: 'POST',
          data: {
            updating: this.emp_tbl
          }
        },
        console.log('업데이트 데이터는 보내졌다.')
        ).then((res) => {
          console.log('업데이트 데이터가 들어왔다.')
          this.emp_tbl = res.data
          alert('업데이트가 됬습니다.') // 원래 창about으로 돌아가는 기능이 있어야함
        }).catch(err => {
          alert(err)
        })
      }
    },
    add () {
      this.guard_add = true
      this.guard_down = false
    },
    add_emp () {
      alert('네 정보를 넘겨보죠.')
      axios({
        url: 'http://localhost:3000/users/add',
        method: 'POST',
        el: '#tr_add',
        data: {
          add_Num: this.add_Num,
          add_Name: this.add_Name,
          add_dep: this.add_dep,
          add_email: this.add_email,
          add_team: this.add_team,
          add_Eng: this.add_Eng
        }
      },
      console.log('추가된 테이블 데이터를 보냈다.')
      ).then((res) => {
        console.log('추가된 테이블을 잘 받았따.')
      })
    }
  },
  data () {
    return {
      emp_tbl: [
        { Num: '', employee: '', employeeenglish: '', department: '', team: '', email: '' }
      ],
      change_tbl: [],
      add_tbl: [],
      guard_down: true,
      guard_up: false,
      guard: false,
      guard_add: false,
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
  width: 85%;
  margin: auto;
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
  width: 80%;
  margin:auto;
  margin-top:3vh;
  overflow-y: scroll;
  height: fit-content;
  max-height: 80vh;
}

.search-txt{
  padding:0;
  width: fit-content;
}
.search-box{
  float:left;
  text-align: left;
  padding-left: 16vw;
}
</style>
