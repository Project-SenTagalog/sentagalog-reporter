<template>
    <div class="topbar">
        <div class="container">
          <div class="row">
            <div class="column column-20">
              <h1>Sentagalog Reporter</h1>
            </div> 
            <div class="column column-80" align="right">
              <ul class="nav">
                <li><router-link to="/"><a class="link">Home</a></router-link></li>
              </ul>
            </div>
          </div>
        </div>
    </div>
</template>

<style lang="scss">
   .topbar {
    top: 0;
    position: fixed;
    background-color: rgb(50,70,80);
    color: white;
    width: 100%;
    height: 50px;
  }

  .topbar .container {
    width: 960px;
    margin: 0 auto;
    margin-top: 12px;
  }

  .topbar h1 {
    font-size: 20px;
  }

  ul.nav {
    list-style: none;
  }

  ul.nav li {
    display: inline;
  }

  .link {
    color: white;
  }

  .link:hover {
    color: yellow;
  }

</style>