<template>
  <header>
    <h1 id="logo">
      <a href="index.html"><img
          src="https://static.wixstatic.com/media/8b43f7_af678fecc303439e8df0c7b343e9054f~mv2.png/v1/fill/w_299,h_50,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/BISTelligence_Logo_EN_w600px.png"></a>
    </h1>
    <nav>
      <router-link to="/">메인</router-link> |
      <router-link to="/Search">직원 관리</router-link>
    </nav>
    <h2></h2>
  </header>
  <router-view />
</template>
<style>
body{margin:0}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
header{
    background: white;
    width: 100%;
}
nav {
  width: 30%;
  height: 5vh;
  padding: 30px;
  text-align: right;
  float:right;
}
h1{
  margin:0;
  width: calc(70% - 90px);
  float:left;
  padding:15px;
  text-align: left;
}

h2{
  background-color: #42b983;
  float:left;
  margin-top:-10px;
  height: 20px;
  width: 100%;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
