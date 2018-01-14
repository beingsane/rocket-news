<template>
  <div>
    <md-card>
      <md-ripple>
        <md-card-header>
          <div class="content">

          <div class="news-icon" :class="'news-'+interest">
            <div v-if="interest==='google-news'">
              <i class="fa fa-newspaper-o"></i>
            </div>
            <div v-if="interest==='twitter'">
              <i class="fa fa-twitter"></i>
            </div>
          </div>
            <div class="main">
              <div class="md-title">{{title}}</div>

              <div class="md-subhead">
                <span class="source"><span v-if="interest==='twitter'">@</span>{{source}}</span>
                <span>{{time}}</span>
              </div>
            </div>
          </div>
        </md-card-header>
        <md-card-content>
        </md-card-content>
      </md-ripple>
    </md-card>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  .news-google-news {
    background: #4A5BB9;
    .fa {
      color: white;
    }
  }
  .news-twitter {
    background: #28AAE1;
    .fa {
      color: white;
    }
  }
  .news-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: relative;
    margin-right: 10px;
    .fa {
      position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    }
  }
  .main {
    flex: 1;
  }
}
  .md-card {
    background: white;
    cursor: pointer;
    margin: 0;
    .md-card-content {
      padding: 0;
    }
    .md-title {
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
    }
    .md-subhead .source::after {
      content: "\0000b7";
      margin-left: 8px;
      margin-right: 5px;
    }
  }
</style>

<script>

export default {
  props: ['title', 'source', 'time', 'interest'],
  name: 'news',
};
</script>
