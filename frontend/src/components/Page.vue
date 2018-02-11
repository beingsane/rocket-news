 <template>
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">
          Rocket News</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <news v-for="article in results"
          :title="article.title"
          :source="'asdf'"
          :time="article.date"
        >

        </news>
      <!--  <news :title="'30 Amazing Vue.js Open Source Projects for the Past Year (v.2018).'"
              :source="'user'" :time="'6h'" :interest="'twitter'"></news>
            -->
      </md-app-content>
      <div>
        <md-button class="md-fab md-primary">
        <md-icon>add</md-icon>
      </md-button>
      </div>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
  .md-toolbar {
    background: #546e7a;
    color: white;
  }
  .md-app-drawer {
    background: white;
  }
  .md-icon-button {
    color: white;
  }
  .md-toolbar-row {
    color: white;
  }
  .md-app {
    background: #F5F5F6;
    // max-height: 400px;
  }
</style>

<script>
import News from './News';
import Database from '../database/database';

export default {
  name: 'page',
  data: () => ({
    menuVisible: false,
    results: [],
    subs: [],
  }),
  components: {
    News,
  },
  created: async() => {
    this.db = await Database();
    this.db.news
      .find()
      .sort('date')
      .limit(10)
      .$.subscribe(results => {
        console.dir(results.map(d => d.toJSON()));
        this.results = results;
      });
    /*
    this.subs.push(
    );
     */
  }
};
</script>
