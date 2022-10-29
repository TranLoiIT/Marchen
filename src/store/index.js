import jwtDecode from "jwt-decode";

export const actions = {
     // Comment nuxtClientInit if using SSR or comment nuxtServerInit if using CSR
     async nuxtClientInit({ commit }) {
          try {
               const token = this.$cookies.get('token');
               const decodedHeader = jwtDecode(token);
               if (decodedHeader.id) {
                    commit('auth/set', {id: decodedHeader.id, username: decodedHeader.username})
               }
          } catch (error) {
               commit('auth/set', null);
          }
     },
};
