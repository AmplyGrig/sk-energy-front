import axios from 'axios'
import router from '@/router'

const state = {
	email: null,
	token: null,
};

const mutations = {
	authUser(state, userData) {
		state.email = userData.email;
		state.token = userData.token;
	},
	clearAuthData(state) {
		state.email = null;
		state.token = null;
	},
};

const getters = {
	isAuthenticated(state) {
		return state.token !== null;
	},
};

const actions = {
	login: ({commit}, authData) => {
		return new Promise((resolve, reject) => {
			axios.post('/auth', {
				email: authData.email,
				password: authData.password,
			}).then(response => {
				if (response.data.access_token) {
					commit('authUser', { email: authData.email, token: response.data.access_token });
					localStorage.setItem('token', response.data.access_token);
					localStorage.setItem('email', authData.email);
					router.replace('/adminpage');
					resolve(response)
				} 
				else {
					resolve(response);
				}
			}).catch(() => {
				reject();
			})
		})
	},
	autoLogin({commit}) {
		let token = localStorage.getItem('token');
		let email = localStorage.getItem('email');

		if (!token || !email) {
			return;
		}

		commit('authUser', { email: email, token: token });
	},
	logout: ({commit}) => {
		commit('clearAuthData');
		localStorage.removeItem('email');
		localStorage.removeItem('token');
		router.replace('sign_in');
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions,
}