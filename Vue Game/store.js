Vue.use(Vuex);   // required to use Vuex with Vue

const store = new Vuex.Store({
    state: {
        gameConfig: {
            level: 1,
            speed: 3
        }
    },
    mutations: {
        SET_LEVEL(state, level) {
            state.gameConfig.level = level;
            switch(level) {
                case 1: state.gameConfig.speed = 3; break;
                case 2: state.gameConfig.speed = 6; break;
                case 3: state.gameConfig.speed = 9; break;
            }
        }
    },
    actions: {
        updateLevel({ commit }, level) {
            commit('SET_LEVEL', level);
        }
    },
    getters: {
        getSpeed: state => state.gameConfig.speed,
        getLevel: state => state.gameConfig.level
    }
});