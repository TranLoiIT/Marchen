export default function ({ store, redirect, parmas }) {
     if (!store.state.auth.user) {
          return redirect('/login');
     }
}
